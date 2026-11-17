import { RouteLink } from "../router.jsx";

export default function ProjectDetail({ project }) {
  const primary = project.links ? project.links[0] : null;

  return (
    <main className="project" id="project">
      <RouteLink href="/projects" className="project__back">
        <span aria-hidden="true">←</span> All projects
      </RouteLink>

      <header className="project__hero">
        <h1 className="project__title">{project.name}</h1>
        <p className="project__summary">{project.summary}</p>

        {project.links ? (
          <div className="project__links">
            {project.links.map((link) => (
              <a
                key={link.label}
                className={`project__link${
                  link.primary ? " project__link--primary" : ""
                }`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

        {project.stats ? (
          <ul className="project__stats">
            {project.stats.map((stat) => (
              <li key={stat.label} className="project__stat">
                <span className="project__stat-value">{stat.value}</span>
                <span className="project__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <figure className="project__cover">
        <img
          className="project__cover-img"
          src={project.image}
          alt={`${project.name} artwork`}
          draggable="false"
        />
      </figure>

      <section className="project__section">
        <h2 className="project__section-title">Overview</h2>
        <p className="project__text">{project.overview}</p>
      </section>

      {project.modules ? (
        <section className="project__section">
          <h2 className="project__section-title">Modules</h2>
          <ol className="project__modules">
            {project.modules.map((module, index) => (
              <li key={module.name} className="project__module">
                <span className="project__module-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="project__module-body">
                  <h3 className="project__module-name">{module.name}</h3>
                  <p className="project__module-text">{module.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.features ? (
        <section className="project__section">
          <h2 className="project__section-title">Includes</h2>
          <ul className="project__features">
            {project.features.map((feature) => (
              <li key={feature} className="project__feature">
                {feature}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {primary ? (
        <div className="project__cta-wrap">
          <a
            className="project__cta project__cta--primary"
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {primary.label} <span aria-hidden="true">→</span>
          </a>
        </div>
      ) : null}
    </main>
  );
}
