import { RouteLink } from "../router.jsx";
import { email, discordUrl, githubUrl } from "../data.js";

const ROLES = [
  {
    name: "Discord Bot Developer",
    type: "Contract · Remote",
    text: "Build and maintain moderation, economy, and session bots like Seshy. Comfortable with discord.js, slash commands, and PostgreSQL.",
  },
  {
    name: "Roblox Game Developer",
    type: "Contract · Remote",
    text: "Script gameplay systems and UI in Luau for Roblox experiences. Clean code, polished UI, ship-small mindset.",
  },
  {
    name: "Tools Engineer",
    type: "Contract · Remote",
    text: "Internal dashboards, automations, and bespoke integrations that keep the studio and our partners moving.",
  },
  {
    name: "Community Manager",
    type: "Part-time · Remote",
    text: "Run our Discord and social presence. Support members, moderate, and turn feedback into the next build.",
  },
];

export default function Careers() {
  return (
    <main className="careers" id="careers">
      <header className="careers__hero">
        <h1 className="careers__title">
          Careers <em className="careers__accent">at Unknown Studios</em>
        </h1>
        <p className="careers__lead">
          We’re a small team building Roblox games, Discord bots, and tools
          people actually use. No hand-offs, no endless process — just build,
          ship, and support what we make.
        </p>
      </header>

      <section className="careers__section">
        <div className="careers__container">
          <div className="careers__header">
            <h2 className="careers__section-title">Open roles</h2>
            <p className="careers__section-lead">
              Tell us what you’ve built and how to reach you.
            </p>
          </div>

          <ul className="careers__list">
            {ROLES.map((role) => (
              <li key={role.name} className="careers__role">
                <div className="careers__role-head">
                  <span className="careers__role-name">{role.name}</span>
                  <span className="careers__role-type">{role.type}</span>
                </div>
                <p className="careers__role-text">{role.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="careers__section careers__section--apply">
        <div className="careers__container">
          <div className="careers__header">
            <h2 className="careers__section-title">How to apply</h2>
            <p className="careers__section-lead">
              No formal application — just send us a note.
            </p>
          </div>

          <ul className="careers__contact">
            <li className="careers__contact-item">
              <span className="careers__contact-label">Email</span>
              <a
                className="careers__contact-value"
                href={`mailto:${email}`}
                rel="noopener noreferrer"
              >
                {email}
              </a>
            </li>
            <li className="careers__contact-item">
              <span className="careers__contact-label">Discord</span>
              <a
                className="careers__contact-value"
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the server
              </a>
            </li>
            <li className="careers__contact-item">
              <span className="careers__contact-label">GitHub</span>
              <a
                className="careers__contact-value"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View our repos
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="careers__cta-wrap">
        <RouteLink
          href="/projects"
          className="careers__cta careers__cta--primary"
        >
          See projects <span aria-hidden="true">→</span>
        </RouteLink>
      </div>
    </main>
  );
}
