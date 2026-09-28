import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CloudRain } from "lucide-react";
import { Eyebrow, Media, PageIntro, QuoteBand, SectionHead } from "@/components/site/site";
import { Reveal } from "@/components/site/Reveal";
import { commercialPage as page } from "@/data/content";
import { breadcrumb, pageHead } from "@/data/seo";

export const Route = createFileRoute("/commercial-industrial")({
  head: () =>
    pageHead(
      page.metaTitle,
      page.metaDescription,
      "/commercial-industrial",
      breadcrumb(["Commercial & Industrial", "/commercial-industrial"]),
      "commercial-hero",
    ),
  component: Commercial,
});

function Commercial() {
  return (
    <>
      <PageIntro
        {...page.intro}
        slot="commercial-hero"
        crumbs={[{ label: "Commercial & Industrial" }]}
      />

      <section className="section">
        <div className="container content-split">
          <div>
            <Eyebrow>{page.key.eyebrow}</Eyebrow>
            <h2>{page.key.title}</h2>
            <p>{page.key.text}</p>
            <ul className="check-list">
              {page.key.points.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <Media slot="commercial-key-01" />
        </div>
        <div className="container">
          <aside className="callout" aria-label={page.callout.title}>
            <span className="callout-icon" aria-hidden="true">
              <CloudRain size={30} />
            </span>
            <p>
              <strong>{page.callout.title}:</strong> {page.callout.text}
            </p>
            <Link
              to="/services/$slug"
              params={{ slug: "seamless-gutters" }}
              hash="gutter-profiles"
              className="callout-link"
            >
              {page.callout.link} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <SectionHead {...page.sectorsHead} />
          </Reveal>
          <ol className="number-list number-list-4">
            {page.sectors.map((s, i) => (
              <li key={s.title}>
                <span aria-hidden="true">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead {...page.benefitsHead} />
          </Reveal>
          <div className="benefits-grid">
            {page.benefits.map((b) => (
              <article className="benefit" key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <SectionHead {...page.galleryHead} />
          </Reveal>
          <div className="gallery-grid">
            {page.gallery.map((slot) => (
              <Media key={slot} slot={slot} />
            ))}
          </div>
        </div>
      </section>

      <QuoteBand {...page.cta} />
    </>
  );
}
