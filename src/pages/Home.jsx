import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CurvedBand from "../components/ui/curved-band.jsx";
import { discordUrl } from "../data.js";

// Project artwork for the band. Add more entries as projects ship.
const PROJECT = {
  src: "/projects/seshy/seshy.png",
  alt: "Seshy project artwork",
};

export default function Home() {
  // `.reveal` starts hidden; without this nothing below the hero ever shows.
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const showAll = () => nodes.forEach((node) => node.classList.add("visible"));

    if (!("IntersectionObserver" in window)) {
      showAll();
      return undefined;
    }

    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));

    // Safety net: never leave content invisible if the observer never fires.
    const failsafe = window.setTimeout(showAll, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
      root.classList.remove("js-reveal");
    };
  }, []);

  return (
    <div className="page">
      <Navbar />

      <section className="hero" id="hero" aria-label="Hero">
        <div className="hero-logo-wrap">
          <img
            src="/logo-stacked-white.svg"
            alt="Unknown Studios"
            className="hero-logo"
          />
        </div>

        <p className="hero-p">
          Unknown Studios is a small game studio building{" "}
          <span className="italic-accent">bold</span> games, bots, and tools
          people actually use.
        </p>

        <div className="hero-links">
          <a
            href={discordUrl}
            className="hero-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord <span className="arrow">→</span>
          </a>
          <a href="#work" className="hero-link">
            Work <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <section className="work-band" aria-labelledby="work-band-title">
        <header className="work-band__head">
          <span className="work-band__eyebrow">Selected work</span>
          <h2 className="work-band__title" id="work-band-title">
            Made in the
            <br />
            unknown.
          </h2>
        </header>

        <CurvedBand src={PROJECT.src} alt={PROJECT.alt} />
      </section>

      <main>
        <section className="work-section" id="work">
          <div className="section-header reveal">
            <h2>Work</h2>
          </div>
          <div className="section-content reveal reveal-delay-1">
            <p>
              We build games, bots, and web tools people actually use. From
              indie game projects to custom productivity tools, everything is
              crafted with clean design and modern technologies.
            </p>
            <ul className="section-tags">
              <li>Games</li>
              <li>Bots</li>
              <li>Web Tools</li>
            </ul>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-header reveal">
            <h2>Services</h2>
          </div>
          <div className="section-content reveal reveal-delay-1">
            <p>
              We offer design systems, frontend development, and UI/UX strategy
              for startups and established teams. Turn your idea into a polished,
              user-friendly product.
            </p>
            <ul className="section-tags">
              <li>Design Systems</li>
              <li>Frontend Development</li>
              <li>UI/UX Strategy</li>
            </ul>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-header reveal">
            <h2>About</h2>
          </div>
          <div className="section-content reveal reveal-delay-1">
            <p>
              Unknown Studios is a small game studio building bold games, bots,
              and tools people actually use. We focus on creating experiences that
              are both functional and beautiful, with a minimal aesthetic that
              puts content first.
            </p>
            <p>Founded in 2026, we're a remote team passionate about good design
              and great software.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}