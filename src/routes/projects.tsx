import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Media, PageIntro, QuoteBand, SectionHead, VideoSlot } from "@/components/site/site";
import { projectCategories, projects, projectsPage as page } from "@/data/content";
import { getVideo } from "@/data/images";
import { breadcrumb, pageHead } from "@/data/seo";

export const Route = createFileRoute("/projects")({
  head: () =>
    pageHead(
      page.metaTitle,
      page.metaDescription,
      "/projects",
      breadcrumb(["Projects", "/projects"]),
      "og-default",
    ),
  component: Projects,
});

function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const visible = projects.filter((item) => filter === "All" || item.category === filter);
  const active = activeIndex === null ? null : visible[activeIndex];

  const close = () => {
    setActiveIndex(null);
    opener.current?.focus();
  };
  const step = (dir: 1 | -1) =>
    setActiveIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length));

  useEffect(() => {
    if (activeIndex === null) return;
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex === null]);

  return (
    <>
      <PageIntro
        {...page.intro}
        slot="aluminium-commercial-complex"
        crumbs={[{ label: "Projects" }]}
      />
      <section className="section">
        <div className="container">
          <SectionHead {...page.head} />
          <div className="filters" role="group" aria-label="Filter projects by product">
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                className="filter-chip"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {visible.length} items shown
          </p>
          <ul className="project-grid">
            {visible.map((item, i) => (
              <li key={`${item.category}-${item.slot}`}>
                <button
                  type="button"
                  className="project-item"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setActiveIndex(i);
                  }}
                  aria-label={`Open ${item.video ? "video" : "image"}: ${item.caption}`}
                >
                  <span className="project-thumb">
                    {item.video ? (
                      <img
                        src={getVideo(item.slot).poster}
                        alt=""
                        width={getVideo(item.slot).width}
                        height={getVideo(item.slot).height}
                        loading="lazy"
                        data-slot={item.slot}
                      />
                    ) : (
                      <Media slot={item.slot} />
                    )}
                    {item.video && (
                      <span className="project-play" aria-hidden="true">
                        <Play size={22} fill="currentColor" />
                      </span>
                    )}
                  </span>
                  <strong>{item.caption}</strong>
                  <small>
                    {item.category}
                    {item.video ? " · Video" : ""}
                  </small>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button
            ref={closeButton}
            type="button"
            className="lightbox-btn lightbox-close"
            onClick={close}
            aria-label="Close"
          >
            <X />
          </button>
          <button
            type="button"
            className="lightbox-btn lightbox-prev"
            onClick={() => step(-1)}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <figure>
            {active.video ? (
              <VideoSlot slot={active.slot} className="lightbox-video" />
            ) : (
              <Media slot={active.slot} priority />
            )}
            <figcaption>
              {active.caption} · {active.category}{" "}
              <span>
                {(activeIndex ?? 0) + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-btn lightbox-next"
            onClick={() => step(1)}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <QuoteBand
        title="Like what you see?"
        text="Tell us which finish caught your eye and we will quote for your building."
      />
    </>
  );
}
