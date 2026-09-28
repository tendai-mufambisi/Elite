import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLink,
  Eyebrow,
  FaqList,
  Media,
  PageIntro,
  QuoteBand,
  SectionHead,
} from "@/components/site/site";
import { Reveal } from "@/components/site/Reveal";
import { whyPage } from "@/data/content";
import { breadcrumb, faqSchema, pageHead } from "@/data/seo";

export const Route = createFileRoute("/why-seamless-gutters")({
  head: () =>
    pageHead(
      whyPage.metaTitle,
      whyPage.metaDescription,
      "/why-seamless-gutters",
      [breadcrumb(["Why Seamless Gutters", "/why-seamless-gutters"]), faqSchema(whyPage.faqs)],
      "og-default",
    ),
  component: WhyPage,
});

function WhyPage() {
  return (
    <>
      <PageIntro
        {...whyPage.intro}
        slot="pillar-stainless-fascia-two-garage-doors"
        crumbs={[{ label: "Why Seamless Gutters" }]}
      />

      <section className="section">
        <div className="container content-split">
          <Media slot="fascia-bronze-double-storey" />
          <div>
            <Eyebrow>{whyPage.what.eyebrow}</Eyebrow>
            <h2>{whyPage.what.title}</h2>
            {whyPage.what.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ArrowLink to="/benefits-of-seamless-gutters">
              All the benefits of seamless gutters
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="section section-soft">
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

      {/* CLIENT CONTENT: the advantages list is edited in whyPage.advantages in src/data/content.ts */}
      <section className="section" id="advantages">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Advantages" title="Advantages of seamless gutters." />
          </Reveal>
          <ol className="number-list">
            {whyPage.advantages.map((a, i) => (
              <li key={a.title}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="stainless">
        <div className="container content-split">
          <div>
            <Eyebrow>{whyPage.stainless.eyebrow}</Eyebrow>
            <h2>{whyPage.stainless.title}</h2>
            {whyPage.stainless.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Media slot="pillar-stainless-veranda" />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container faq-layout">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2>Seamless gutter questions.</h2>
          </div>
          <FaqList faqs={whyPage.faqs} />
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
