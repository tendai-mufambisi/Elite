import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, FacebookIcon, PageIntro } from "@/components/site/site";
import { contactPage as page, services, site, whatsappLink } from "@/data/content";
import { breadcrumb, pageHead } from "@/data/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(page.metaTitle, page.metaDescription, "/contact", breadcrumb(["Contact", "/contact"])),
  component: Contact,
});

function Contact() {
  const [photoName, setPhotoName] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const selected = data.getAll("service").join(", ");
    const details = [
      `Name: ${field("name")}`,
      `Phone: ${field("phone")}`,
      field("email") && `Email: ${field("email")}`,
      `Property type: ${field("property")}`,
      selected && `Services: ${selected}`,
      field("message") && `Message: ${field("message")}`,
      photoName && `Photo: I'll attach ${photoName} in this chat.`,
    ].filter(Boolean);
    const message = [site.quoteText, "", ...details].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <PageIntro
        {...page.intro}
        slot="aluminium-windows-glass-balustrades"
        crumbs={[{ label: "Contact" }]}
      />
      <section className="section section-soft">
        <div className="container contact-grid">
          <div>
            <Eyebrow>{page.aside.eyebrow}</Eyebrow>
            <h2>{page.aside.title}</h2>
            <p>{page.aside.text}</p>
            <div className="contact-method">
              <small>
                <Phone size={13} aria-hidden="true" /> Call
              </small>
              <a href={site.phoneHref}>{site.phone}</a>
            </div>
            <div className="contact-method">
              <small>
                <MessageCircle size={13} aria-hidden="true" /> WhatsApp
              </small>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp ↗
              </a>
            </div>
            <div className="contact-method">
              <small>
                <Mail size={13} aria-hidden="true" /> Email
              </small>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="contact-method">
              <small>
                <FacebookIcon size={13} /> Facebook
              </small>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                Find us on Facebook ↗
              </a>
            </div>
          </div>

          <form className="quote-form" onSubmit={submit}>
            <h2>Request a quote</h2>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name *</label>
                <input id="name" name="name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="property">Property type *</label>
                <select id="property" name="property" required defaultValue="">
                  <option value="" disabled>
                    Select property type
                  </option>
                  {page.propertyTypes.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset className="field">
              <legend>Services needed</legend>
              <div className="checkbox-grid">
                {services.map((s) => (
                  <label key={s.slug}>
                    <input type="checkbox" name="service" value={s.title} />
                    {s.title}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your project"
              />
            </div>
            <div className="field">
              <label htmlFor="photo">Photo (optional)</label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? "")}
                aria-describedby="form-note"
              />
            </div>
            <p className="form-note" id="form-note">
              {page.formNote}
            </p>
            <Button variant="brand" size="large" type="submit">
              Send via WhatsApp <ArrowUpRight />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
