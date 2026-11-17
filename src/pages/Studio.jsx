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
          Games, bots and tools <em className="studio__accent">worth keeping</em>
        </h1>
        <p className="studio__lead">
          Unknown Studios is a small team building for Roblox and Discord. One
          thing done properly beats ten nobody opens.
        </p>

        <div className="studio__actions">
          <RouteLink
            href="/projects"
            className="studio__action studio__action--primary"
          >
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
            const Link = item.href ? RouteLink : "div";
            return (
              <li key={item.name} className="studio__discipline">
                <Link
                  {...(item.href ? { href: item.href } : {})}
                  className={`studio__discipline-link${
                    item.href ? " studio__discipline--link" : ""
                  }`}
                >
                  <span className="studio__discipline-name">{item.name}</span>
                  <span className="studio__discipline-text">{item.text}</span>
                </Link>
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
              <div className="studio__principle-body">
                <h3 className="studio__principle-title">{principle.title}</h3>
                <p className="studio__principle-text">{principle.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
