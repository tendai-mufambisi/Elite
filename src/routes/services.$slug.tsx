import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  Eyebrow,
  GutterProfiles,
  FaqList,
  Media,
  PageIntro,
  QuoteBand,
  SectionHead,
  VideoSlot,
} from "@/components/site/site";
import { WindowGuardDrawing } from "@/components/site/illustrations";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/data/content";
import { getVideo } from "@/data/images";
import { breadcrumb, faqSchema, pageHead, serviceSchema } from "@/data/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(
          loaderData.metaTitle,
          loaderData.intro.split(". ").slice(0, 2).join(". ").replace(/\.?$/, "."),
          `/services/${loaderData.slug}`,
          [
            serviceSchema(loaderData),
            faqSchema(loaderData.faqs),
            breadcrumb([loaderData.title, `/services/${loaderData.slug}`]),
          ],
          loaderData.image ?? "og-default",
        )
      : {},
  component: ServicePage,
});

function ServicePage() {
  const s = Route.useLoaderData();
  const index = services.findIndex((item) => item.slug === s.slug);
  // The next three services in menu order, wrapping around.
  const related = [1, 2, 3].map((n) => services[(index + n) % services.length]!);

  return (
    <>
      <PageIntro
        eyebrow="Our services"
        title={s.title}
        text={s.short}
        slot={"banner" in s ? s.banner : s.image}
        crumbs={[{ label: s.title }]}
      />

      <section className="section">
        <div className="container content-split">
          <div>
            <Eyebrow>{s.metaTitle}</Eyebrow>
            <h2>{s.short}</h2>
            <p>{s.intro}</p>
            <h3 className="sub-heading">Key benefits</h3>
            <ul className="check-list">
              {s.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="sub-heading">Available finishes</h3>
            <ul className="chip-list">
              {s.finishes.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {s.image ? <Media slot={s.image} /> : <WindowGuardDrawing className="split-drawing" />}
        </div>
      </section>

      {s.gallery.length > 0 && (
        <section className="section section-soft">
          <div className="container">
            <Reveal>
              <SectionHead eyebrow="Gallery" title="The finished look." />
            </Reveal>
            <div className="gallery-grid">
              {s.gallery.map((slot) => (
                <Media key={slot} slot={slot} />
              ))}
            </div>
            {"video" in s && s.video && (
              <div className="video-feature">
                <div>
                  <Eyebrow>Project video</Eyebrow>
                  <h3>{getVideo(s.video).title}</h3>
                </div>
                <VideoSlot slot={s.video} />
              </div>
            )}
          </div>
        </section>
      )}

      {s.slug === "seamless-gutters" && <GutterProfiles />}

      <section className="section">
        <div className="container faq-layout">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2>{s.title}: questions answered.</h2>
          </div>
          <FaqList faqs={s.faqs} />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHead eyebrow="Related services" title="Complete the look." />
          <div className="related-links">
            {related.map((item) => (
              <Link key={item.slug} to="/services/$slug" params={{ slug: item.slug }}>
                {item.title}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        title={`Get a quote for ${s.title.toLowerCase()}.`}
        text="Send us your details and a few photos. We will come back to you with a free quote."
      />
    </>
  );
}
