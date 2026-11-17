import { RouteLink } from "../router.jsx";
import { discordUrl } from "../data.js";

const DISCIPLINES = [
  {
    name: "Games",
    text: "Roblox worlds built to be played with friends, not walked through once.",
  },
  {
    name: "Bots",
    text: "Discord tools that take real work off moderators and staff teams. Seshy is the first of them.",
    href: "/projects/seshy",
  },
  {
    name: "Tools",
    text: "The machinery that makes the rest faster — dashboards, automations, whatever the job needs.",
  },
];

const PRINCIPLES = [
  {
    title: "Ship small",
    text: "Short builds, real users early. A first version should be embarrassing, not overdue.",
  },
  {
    title: "Watch, then fix",
    text: "We sit in the support channels ourselves. The next release comes from what actually broke.",
  },
  {
    title: "Own the whole thing",
    text: "Design, build and run. No handoff, nobody standing between us and the people using it.",
  },
];

export default function Studio() {
  return (
    <main className="studio" id="studio">
      <header className="studio__hero">
        <h1 className="studio__title">
          Games, bots and tools <em className="studio__accent">worth keeping</em>.
        </h1>
        <p className="studio__lead">
          Unknown Studios is a small team building for Roblox and Discord. One
          thing done properly beats ten nobody opens.
        </p>

        <div className="studio__actions">
          <RouteLink href="/projects" className="studio__action studio__action--primary">
            See projects
          </RouteLink>
          <a
            className="studio__action"
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Discord
          </a>
        </div>
      </header>

      <section className="studio__section">
        <h2 className="studio__section-title">What we build</h2>

        <ul className="studio__list">
          {DISCIPLINES.map((item) => {
            const Row = item.href ? RouteLink : "div";
            return (
              <li key={item.name}>
                <Row
                  {...(item.href ? { href: item.href } : {})}
                  className={`studio__row${item.href ? " studio__row--link" : ""}`}
                >
                  <span className="studio__row-name">{item.name}</span>
                  <span className="studio__row-text">{item.text}</span>
                  {item.href ? (
                    <span className="studio__row-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </Row>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="studio__section">
        <h2 className="studio__section-title">How we work</h2>

        <ol className="studio__principles">
          {PRINCIPLES.map((principle, index) => (
            <li key={principle.title} className="studio__principle">
              <span className="studio__principle-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="studio__principle-title">{principle.title}</h3>
              <p className="studio__principle-text">{principle.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <aside className="studio__cta">
        <div className="studio__cta-copy">
          <h2 className="studio__cta-title">Something should exist and doesn't?</h2>
          <p className="studio__cta-text">
            Tell us about it in the Discord. That's where everything we've built
            started.
          </p>
        </div>
        <a
          className="studio__action studio__action--primary"
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the Discord
        </a>
      </aside>
    </main>
  );
}
