import { createFileRoute } from "@tanstack/react-router";
import {
  Eyebrow,
  FounderSection,
  Media,
  PageIntro,
  QuoteBand,
  SectionHead,
} from "@/components/site/site";
import { Reveal } from "@/components/site/Reveal";
import { Stats } from "@/components/site/stats";
import { aboutPage as page } from "@/data/content";
import { useLive } from "@/data/live";
import { breadcrumb, pageHead } from "@/data/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("About Us", page.metaDescription, "/about", breadcrumb(["About", "/about"])),
  component: About,
});

function About() {
  const { stats, photo } = useLive();
  return (
    <>
      <PageIntro {...page.intro} slot={photo("about-banner")} crumbs={[{ label: "About" }]} />

      <section className="section">
        <div className="container content-split">
          <div>
            <Eyebrow>{page.story.eyebrow}</Eyebrow>
            <h2>{page.story.title}</h2>
            {page.story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Stats items={stats} />
          </div>
          <Media slot={photo("about-photo")} />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="What we stand for" title="The way we work." />
          </Reveal>
          <ol className="number-list number-list-3">
            {page.values.map((v, i) => (
              <li key={v.title}>
                <span aria-hidden="true">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead eyebrow="Our process" title="From first call to aftercare." />
          </Reveal>
          <ol className="process">
            {page.process.map((step, i) => (
              <li key={step.title}>
                <span aria-hidden="true">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FounderSection />

      <QuoteBand />
    </>
  );
}
