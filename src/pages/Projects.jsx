import { PROJECTS } from "../projects.js";
import { RouteLink } from "../router.jsx";

export default function Projects() {
  return (
    <main className="projects" id="projects">
      <header className="projects__head">
        <h1 className="projects__title">Projects</h1>
        <p className="projects__intro">Every project we've built, in one place.</p>
      </header>

      <div className="projects__grid">
        {PROJECTS.map((project) => (
          <RouteLink
            key={project.id}
            href={`/projects/${project.id}`}
            className="project-card"
          >
            <img
              className="project-card__img"
              src={project.image}
              alt={project.name}
              draggable="false"
            />
          </RouteLink>
        ))}
      </div>
    </main>
  );
}
