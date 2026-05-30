import { Container } from "./ui/Container";

type LegalDoc = {
  title: string;
  updated: string;
  placeholderDate: string;
  intro: string;
  sections: ReadonlyArray<{ heading: string; body: string }>;
};

export function LegalArticle({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className="bg-gradient-to-b from-navy-800 to-navy-900 pt-32 pb-12 md:pt-40 md:pb-16">
        <Container>
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {doc.updated}: {doc.placeholderDate}
          </p>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <Container className="max-w-3xl">
          <p className="text-base leading-relaxed text-slate-600">{doc.intro}</p>
          <div className="mt-8 space-y-8">
            {doc.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-lg font-bold text-navy-900">{s.heading}</h2>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
