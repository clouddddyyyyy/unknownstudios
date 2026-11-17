import { useEffect, useState } from "react";

const NAVIGATE_EVENT = "app:navigate";

/** Push a new path without reloading, then let every listener re-render. */
export function navigate(to) {
  if (window.location.pathname === to) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    window.addEventListener(NAVIGATE_EVENT, update);

    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);

  return path;
}

/** Internal link: keeps modifier-clicks and middle-clicks behaving natively. */
export function RouteLink({ href, className, children, onClick, ...rest }) {
  function handleClick(event) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(href);
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
