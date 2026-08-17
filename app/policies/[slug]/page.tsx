import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { policies, faqs } from "@/lib/policies";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["privacy-policy", "terms-and-conditions", "cancellation-policy", "faq"].map(
    (slug) => ({ slug })
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const policy = policies[params.slug];
  return {
    title: params.slug === "faq" ? "FAQ" : policy?.title,
    description: params.slug === "faq" ? "Frequently asked questions" : policy?.intro,
  };
}

const otherPages: Record<string, { slug: string; label: string }[]> = {
  "privacy-policy": [
    { slug: "terms-and-conditions", label: "Terms & Conditions" },
    { slug: "cancellation-policy", label: "Cancellation Policy" },
    { slug: "faq", label: "FAQ" },
  ],
  "terms-and-conditions": [
    { slug: "privacy-policy", label: "Privacy Policy" },
    { slug: "cancellation-policy", label: "Cancellation Policy" },
    { slug: "faq", label: "FAQ" },
  ],
  "cancellation-policy": [
    { slug: "privacy-policy", label: "Privacy Policy" },
    { slug: "terms-and-conditions", label: "Terms & Conditions" },
    { slug: "faq", label: "FAQ" },
  ],
  faq: [
    { slug: "privacy-policy", label: "Privacy Policy" },
    { slug: "terms-and-conditions", label: "Terms & Conditions" },
    { slug: "cancellation-policy", label: "Cancellation Policy" },
  ],
};

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const policy = policies[slug];

  if (slug === "faq") {
    return (
      <PageShell title="Frequently Asked Questions" updated="August 2026" slug="faq">
        <div className="max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-border-warm bg-cream-warm px-6 py-5 open:border-gold/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-linen">
                {faq.question}
                <span className="text-gold-light transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-bark/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </PageShell>
    );
  }

  if (!policy) notFound();

  return (
    <PageShell title={policy.title} updated={policy.updated} slug={slug}>
      <p className="leading-relaxed text-bark/80">{policy.intro}</p>
      <div className="space-y-10">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 font-serif text-2xl text-gold-light">
              {section.heading}
            </h2>
            {section.body.map((para) => (
              <p key={para} className="mb-3 leading-relaxed text-bark/80">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function PageShell({
  title,
  updated,
  slug,
  children,
}: {
  title: string;
  updated: string;
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-gold/15 bg-forest-deep/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="font-serif text-xl font-semibold tracking-wide text-linen"
          >
            Tipeshwar <span className="text-gold-light">Forest Retreat</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gold-light underline-offset-4 hover:underline"
          >
            ← Back to site
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-px w-10 bg-gold/60" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-light">
            {updated}
          </span>
        </div>
        <h1 className="mb-8 font-serif text-4xl md:text-5xl text-linen">{title}</h1>
        {children}
      </div>
      <footer className="border-t border-gold/15 bg-forest-deep/80">
        <nav className="mx-auto flex max-w-4xl flex-wrap gap-x-8 gap-y-3 px-6 py-8 text-sm text-bark/70">
          {otherPages[slug]?.map((page) => (
              <Link
                key={page.slug}
                href={`/policies/${page.slug}`}
                className="hover:text-gold-light"
              >
                {page.label}
              </Link>
            )
          )}
        </nav>
      </footer>
    </main>
  );
}