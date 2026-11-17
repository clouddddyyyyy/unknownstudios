import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PageBackdrop from "./components/PageBackdrop.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Studio from "./pages/Studio.jsx";
import { getProject } from "./projects.js";
import { usePathname } from "./router.jsx";

export default function App() {
  // Trailing slashes are route noise: /studio/ and /studio are the same page.
  const path = usePathname().replace(/(.+)\/$/, "$1");

  const detailMatch = path.match(/^\/projects\/([\w-]+)$/);
  const project = detailMatch ? getProject(detailMatch[1]) : null;

  let route = "home";
  if (project) route = "project";
  else if (path === "/projects" || detailMatch) route = "projects";
  else if (path === "/studio") route = "studio";

  let page = <Home />;
  if (route === "project") page = <ProjectDetail project={project} />;
  else if (route === "projects") page = <Projects />;
  else if (route === "studio") page = <Studio />;

  // The silk artwork belongs to the home page; every other route reads on flat dark.
  const isHome = route === "home";

  return (
    <div className={`page${isHome ? "" : " page--solid"}`}>
      <Navbar />
      {isHome ? <PageBackdrop /> : null}
      {page}
      <Footer />
    </div>
  );
}
