import { useState } from "react";
import SocialIcon, { SOCIALS } from "./SocialIcon.jsx";
import { discordUrl } from "../data.js";
import { RouteLink } from "../router.jsx";

const COLUMNS = [
  {
    title: "Studio",
    links: [
      { name: "Projects", href: "/projects" },
      { name: "About", href: "/studio" },
      { name: "Contact", href: discordUrl },
    ],
  },
  {
    title: "Projects",
    links: [
      { name: "Seshy", href: "/projects/seshy" },
      { name: "Roblox Games", href: "/projects" },
      { name: "Custom Tools", href: "/projects" },
      { name: "Changelog", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Docs", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Support", href: discordUrl },
      { name: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms", href: "#" },
      { name: "Privacy", href: "#" },
      { name: "Refunds", href: "#" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    setEmail("");
  }

  return (
    <footer className="footer">
      <div className="footer-cards">
        {/* White card: brand, socials, copyright */}
        <div className="footer-card footer-card-left">
          <RouteLink href="/" className="footer-logo" aria-label="Unknown Studios home">
            <img src="/icon-white.svg" alt="" />
            <span>unknown studios</span>
          </RouteLink>

          <p className="footer-tagline">Make things people actually use.</p>

          <div className="footer-brand-bottom">
            <a
              className="footer-cta"
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start a project <span aria-hidden="true">→</span>
            </a>

            <div className="footer-social-icons">
              {SOCIALS.map((social) => (
                <SocialIcon
                  key={social.id}
                  id={social.id}
                  name={social.name}
                  href={social.href}
                  className="footer-social-link"
                />
              ))}
            </div>

            <p className="footer-copyright">
              © 2026 Unknown Studios. All rights reserved.
            </p>
          </div>
        </div>

        {/* Dark card: link columns + newsletter */}
        <div className="footer-card footer-card-right">
          <div className="footer-cols">
            {COLUMNS.map((col) => (
              <div key={col.title} className="footer-col">
                <h4 className="footer-col-title">{col.title}</h4>
                {col.links.map((link) => {
                  const Link = link.href.startsWith("/") ? RouteLink : "a";
                  const external = link.href.startsWith("http");

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="footer-col-link"
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-newsletter-title">Newsletter</h4>

            <form className="footer-newsletter-form" onSubmit={handleSubmit}>
              <label htmlFor="footer-email" className="visually-hidden">
                Enter your email
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit">{sent ? "Subscribed" : "Subscribe"}</button>
            </form>

            <p className="footer-newsletter-note">
              Occasional updates on new games, bots and tools. No spam.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
