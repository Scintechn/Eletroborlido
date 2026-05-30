import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { business } from "@/lib/business";
import type { Locale } from "@/lib/i18n";

export function CtaBand({
  locale,
  title,
  subtitle,
  button,
  phonePrefix,
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  button: string;
  phonePrefix?: string;
}) {
  return (
    <section className="bg-yellow-500 py-16 md:py-20">
      <Container className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-navy-900/80">{subtitle}</p>
          <div className="mt-8 flex justify-center">
            <Button href={`/${locale}/contact`} variant="navy" size="lg">
              {button}
            </Button>
          </div>
          {phonePrefix && (
            <p className="mt-4 text-sm font-medium text-navy-900/70">
              {phonePrefix}{" "}
              <a
                href={business.phone.landline.href}
                className="font-semibold underline decoration-navy-900/30 underline-offset-2 hover:decoration-navy-900"
              >
                {business.phone.landline.display}
              </a>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
