import { useState } from "react";
import { Layers, Ghost, Newspaper, Users } from "lucide-react";
import SocialIcon, { SOCIALS } from "./SocialIcon.jsx";
import { RouteLink, usePathname } from "../router.jsx";

const LINKS = [
  { name: "Projects", href: "/projects", Icon: Layers },
  { name: "Studio", href: "/studio", Icon: Ghost },
  { name: "Devlog", href: "#devlog", Icon: Newspaper },
  { name: "Careers", href: "#careers", Icon: Users },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const isActive = (href) =>
    href === "/projects" ? path.startsWith("/projects") : path === href;

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main navigation">
        <RouteLink href="/" className="navbar-avatar" aria-label="Unknown Studios home">
          <img src="/icon-white.svg" alt="" />
        </RouteLink>

        <div className={`navbar-links${isOpen ? " open" : ""}`} id="navbar-menu">
          {LINKS.map(({ name, href, Icon }) => {
            const Link = href.startsWith("/") ? RouteLink : "a";
            const active = isActive(href);

            return (
              <Link
                key={name}
                href={href}
                className={`navbar-link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} strokeWidth={1.75} className="navbar-link-icon" />
                <span>{name}</span>
              </Link>
            );
          })}
        </div>

        <span className="navbar-divider" aria-hidden="true" />

        <div className="navbar-socials">
          {SOCIALS.map((social) => (
            <SocialIcon
              key={social.id}
              id={social.id}
              name={social.name}
              href={social.href}
              className="navbar-social-link"
            />
          ))}
        </div>

        <button
          type="button"
          className="navbar-menu-button"
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={`menu-bars${isOpen ? " is-open" : ""}`} aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}
