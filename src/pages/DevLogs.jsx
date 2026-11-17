import { RouteLink } from "../router.jsx";
import { discordUrl, githubUrl } from "../data.js";

const EXTERNAL = new Set([discordUrl, githubUrl]);

const LOGS = [
  {
    date: "Nov 12, 2026",
    title: "Seshy: Ares anti-nuke lands",
    excerpt:
      "Quarantine, lockdown, raid shield, and a shared blacklist. Ares watches the audit log and moves first on compromised admins.",
    href: "/projects/seshy",
    label: "View project",
  },
  {
    date: "Oct 29, 2026",
    title: "New staff dashboard for Seshy",
    excerpt:
      "One place to clock on, review moderation cases, and triage priority requests. Everything applies to the server immediately.",
    href: "/projects/seshy",
    label: "View project",
  },
  {
    date: "Oct 11, 2026",
    title: "Orion pre-alpha playtest",
    excerpt:
      "First closed playtest of our Roblox game went live. Feedback so far: movement feels right, the loop needs tightening.",
    href: discordUrl,
    label: "Join Discord",
  },
  {
    date: "Sep 26, 2026",
    title: "Seshy hits 600 servers",
    excerpt:
      "Thank you to every community running Seshy. Sessions, moderation, staff tools, and Ares — no other bots needed.",
    href: githubUrl,
    label: "View repo",
  },
];

export default function DevLogs() {
  return (
    <main className="devlogs" id="devlogs">
      <header className="devlogs__hero">
        <h1 className="devlogs__title">
          Dev logs <em className="devlogs__accent">from the studio</em>
        </h1>
        <p className="devlogs__lead">
          What we’re building, what broke, and what we shipped. Raw notes from
          the team, not a press release.
        </p>
      </header>

      <section className="devlogs__section">
        <div className="devlogs__container">
          <ul className="devlogs__list">
            {LOGS.map((log) => {
              const isExternal = EXTERNAL.has(log.href);
              const Link = isExternal ? "a" : RouteLink;
              const linkProps = isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <li key={log.date} className="devlogs__entry">
                  <Link
                    href={log.href}
                    className="devlogs__entry-link"
                    {...linkProps}
                  >
                    <span className="devlogs__entry-date">{log.date}</span>
                    <div className="devlogs__entry-copy">
                      <h2 className="devlogs__entry-title">{log.title}</h2>
                      <p className="devlogs__entry-text">{log.excerpt}</p>
                    </div>
                    <span className="devlogs__entry-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="devlogs__cta-wrap">
        <div className="devlogs__cta">
          <div className="devlogs__cta-copy">
            <h2 className="devlogs__cta-title">Missed something?</h2>
            <p className="devlogs__cta-text">
              Head to the Discord for the full conversation, or browse the
              projects we’re working on.
            </p>
          </div>
          <div className="devlogs__cta-actions">
            <a
              className="devlogs__cta-link devlogs__cta-link--primary"
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Discord <span aria-hidden="true">→</span>
            </a>
            <RouteLink href="/projects" className="devlogs__cta-link">
              See projects <span aria-hidden="true">→</span>
            </RouteLink>
          </div>
        </div>
      </div>
    </main>
  );
}
