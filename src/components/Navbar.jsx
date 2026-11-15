import { useState } from "react";
import { Briefcase, User, Settings, CreditCard, Mail } from "lucide-react";
import SocialIcon, { SOCIALS } from "./SocialIcon.jsx";

const LINKS = [
  { name: "Work", href: "#work", Icon: Briefcase },
  { name: "About", href: "#about", Icon: User },
  { name: "Services", href: "#services", Icon: Settings },
  { name: "Pricing", href: "#pricing", Icon: CreditCard },
  { name: "Contact", href: "#contact", Icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main navigation">
        <a href="/" className="navbar-avatar" aria-label="Unknown Studios home">
          <img src="/icon-white.svg" alt="" />
        </a>

        <div className={`navbar-links${isOpen ? " open" : ""}`} id="navbar-menu">
          {LINKS.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              className="navbar-link"
              onClick={() => setIsOpen(false)}
            >
              <Icon size={18} strokeWidth={1.75} className="navbar-link-icon" />
              <span>{name}</span>
            </a>
          ))}
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
