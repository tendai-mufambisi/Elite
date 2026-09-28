import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLink,
  Eyebrow,
  FaqList,
  GutterProfiles,
  Media,
  PageIntro,
  QuoteBand,
  SectionHead,
} from "@/components/site/site";
import { Reveal } from "@/components/site/Reveal";
import { benefitsPage as page, whyPage } from "@/data/content";
import { breadcrumb, faqSchema, pageHead } from "@/data/seo";

export const Route = createFileRoute("/benefits-of-seamless-gutters")({
  head: () =>
    pageHead(
      page.metaTitle,
      page.metaDescription,
      "/benefits-of-seamless-gutters",
      [
        breadcrumb(["Benefits of Seamless Gutters", "/benefits-of-seamless-gutters"]),
        faqSchema(page.faqs),
      ],
      "fascia-bronze-double-storey",
    ),
  component: BenefitsPage,
});

function BenefitsPage() {
  return (
    <>
      <PageIntro
        {...page.intro}
        slot="fascia-bronze-double-storey"
        crumbs={[{ label: "Benefits of Seamless Gutters" }]}
      />

      <section className="section">
        <div className="container content-split">
          <div>
            <Eyebrow>{page.what.eyebrow}</Eyebrow>
            <h2>{page.what.title}</h2>
            {page.what.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ArrowLink to="/contact">Get a free gutter quote</ArrowLink>
          </div>
          <figure className="spotlight-media">
            <Media slot="gutter-closeup-illustration" />
            <figcaption className="illus-tag">Illustration</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section-soft" id="benefits">
        <div className="container">
          <Reveal>
            <SectionHead {...page.benefitsHead} />
          </Reveal>
          <ol className="number-list benefit-list">
            {page.benefits.map((b, i) => (
              <li key={b.title}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Seamless vs sectional" title="Side by side." />
          </Reveal>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Seamless vs sectional gutters comparison"
          >
            <table className="comparison">
              <caption className="sr-only">
                Seamless gutters compared with sectional gutters
              </caption>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Seamless gutters</th>
                  <th scope="col">Sectional gutters</th>
                </tr>
              </thead>
              <tbody>
                {whyPage.comparison.map(([feature, seamless, sectional]) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    <td className="win">{seamless}</td>
                    <td>{sectional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow={page.install.eyebrow} title={page.install.title} />
          </Reveal>
          <ol className="process process-4">
            {page.install.steps.map((step, i) => (
              <li key={step.title}>
                <span aria-hidden="true">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <GutterProfiles />

      <section className="stainless">
        <div className="container content-split">
          <div>
            <Eyebrow>{page.maintenance.eyebrow}</Eyebrow>
            <h2>{page.maintenance.title}</h2>
            <ul className="check-list check-list-light">
              {page.maintenance.points.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <Media slot="gutters-charcoal-fascia-double-storey" />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container faq-layout">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2>Seamless gutter questions.</h2>
            <ArrowLink to="/why-seamless-gutters">Why seamless gutters?</ArrowLink>
          </div>
          <FaqList faqs={page.faqs} />
        </div>
      </section>

      <QuoteBand
        title="Ready for seamless gutters?"
        text="Send us a few photos of your roofline and we will come back to you with a free quote."
      />
    </>
  );
}
