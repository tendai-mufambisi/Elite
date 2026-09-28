import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Eyebrow, Media, PageIntro, QuoteBand, SectionHead } from "@/components/site/site";
import { colourPage as page, colours } from "@/data/content";
import { breadcrumb, pageHead } from "@/data/seo";

export const Route = createFileRoute("/colour-range")({
  head: () =>
    pageHead(
      "Colour Range for Gutters & Fascia Boards",
      page.metaDescription,
      "/colour-range",
      breadcrumb(["Colour Range", "/colour-range"]),
      "colour-range-chart",
    ),
  component: ColourRange,
});

function ColourRange() {
  return (
    <>
      <PageIntro
        {...page.intro}
        slot="fascia-bronze-double-storey"
        crumbs={[{ label: "Colour Range" }]}
      />

      <section className="section">
        <div className="container">
          <SectionHead {...page.swatchHead} />
          <ul className="swatch-grid">
            {colours.map(([name, hex]) => (
              <li className="swatch" key={name}>
                <div
                  className="swatch-color"
                  style={{ "--swatch": hex } as CSSProperties}
                  aria-hidden="true"
                />
                <p>{name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container content-split">
          <Media slot="colour-range-chart" />
          <div>
            <Eyebrow>{page.explain.eyebrow}</Eyebrow>
            <h2>{page.explain.title}</h2>
            {page.explain.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        title="Have a colour in mind?"
        text="Tell us the colour you like and we will confirm availability for your gutters and fascia boards."
      />
    </>
  );
}
