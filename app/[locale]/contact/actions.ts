"use server";

// Possible subject values. Must stay in sync with the `value`s used in the
// PT/EN subject dropdown options (lib/i18n/{pt,en}.ts).
const VALID_SUBJECTS = [
  "electrical",
  "security",
  "ev_charging",
  "automation",
  "appliances",
  "other",
] as const;
type Subject = (typeof VALID_SUBJECTS)[number];

// PT labels used in the Telegram notification (which is always in PT, since
// it's read by the business). Decoupled from i18n on purpose: the labels here
// describe internal categorisation, not user-facing copy.
const SUBJECT_LABELS_PT: Record<Subject, string> = {
  electrical: "Instalações Elétricas",
  security: "Sistemas de Segurança e Automatismos de Portões",
  ev_charging: "Carregamento de Veículos Elétricos",
  automation: "Domótica e Casa Inteligente",
  appliances: "Venda e Reparação de Eletrodomésticos",
  other: "Outro",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubmitContactInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  locale: "pt" | "en";
};

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: "validation" | "config" | "delivery" };

export async function submitContactForm(
  input: SubmitContactInput
): Promise<SubmitContactResult> {
  // Re-validate every field server-side. The client validation is for UX —
  // never trust it on the server.
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const subject = (input.subject ?? "").trim();
  const message = (input.message ?? "").trim();
  const locale = input.locale === "en" ? "en" : "pt";

  const lengthsOk =
    name.length > 0 &&
    name.length <= 200 &&
    email.length <= 200 &&
    phone.length <= 50 &&
    message.length >= 10 &&
    message.length <= 5000;

  const subjectOk =
    subject === "" || (VALID_SUBJECTS as readonly string[]).includes(subject);

  if (!lengthsOk || !EMAIL_RE.test(email) || !subjectOk) {
    return { ok: false, error: "validation" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error(
      "[contact] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env var"
    );
    return { ok: false, error: "config" };
  }

  const subjectLabel =
    subject === ""
      ? "(não especificado)"
      : SUBJECT_LABELS_PT[subject as Subject];

  const lines = [
    "🔔 <b>Novo pedido — Eletroborlido</b>",
    "",
    `👤 <b>Nome:</b> ${escapeHtml(name)}`,
    `📧 <b>Email:</b> ${escapeHtml(email)}`,
    phone ? `📞 <b>Telefone:</b> ${escapeHtml(phone)}` : null,
    `📋 <b>Assunto:</b> ${escapeHtml(subjectLabel)}`,
    `🌐 <b>Idioma do site:</b> ${locale}`,
    "",
    "💬 <b>Mensagem:</b>",
    escapeHtml(message),
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "<no body>");
      console.error(
        `[contact] Telegram sendMessage failed: ${res.status} ${detail}`
      );
      return { ok: false, error: "delivery" };
    }
  } catch (err) {
    console.error("[contact] Telegram fetch threw:", err);
    return { ok: false, error: "delivery" };
  }

  return { ok: true };
}

// Telegram interprets a small set of HTML tags when parse_mode=HTML, so we
// escape the three characters it cares about. Anything else (emoji, accents)
// is passed through unchanged.
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
