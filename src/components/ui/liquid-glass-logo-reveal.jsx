import { useEffect, useId, useState } from "react";

/**
 * GlassReveal21st
 *
 * A liquid-glass logo reveal that plays once on mount: a turbulence-displaced
 * ghost of the mark swirls in, then settles into the crisp logo on a frosted
 * pane.
 *
 * The logo is visible by default and only animates once `.is-playing` is set,
 * so the mark still shows if animations never run (hidden tab, reduced motion,
 * headless render).
 */
export function GlassReveal21st({
  className = "",
  logoSrc = "/icon-white.svg",
  alt = "Unknown Studios",
  size = "clamp(150px, 20vw, 240px)",
}) {
  const rawId = useId();
  const filterId = `glass-liquid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPlaying(true));
    const settle = window.setTimeout(() => setDone(true), 2400);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, []);

  const stateClass = done ? "is-done" : playing ? "is-playing" : "";

  return (
    <div
      className={`glass-reveal ${stateClass} ${className}`.trim()}
      style={{ "--glass-logo-size": size }}
    >
      <svg className="glass-reveal__defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="-35%" y="-35%" width="170%" height="170%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.011"
              numOctaves="2"
              seed="9"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                from="0.004 0.008"
                to="0.016 0.026"
                dur="1.9s"
                fill="freeze"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="95"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                from="95"
                to="0"
                dur="1.9s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.18 0.72 0.14 1"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <span className="glass-reveal__pane" aria-hidden="true" />
      <img
        className="glass-reveal__ghost"
        src={logoSrc}
        alt=""
        aria-hidden="true"
        style={{ filter: `url(#${filterId}) blur(4px)` }}
      />
      <img className="glass-reveal__logo" src={logoSrc} alt={alt} />
      <span className="glass-reveal__sheen" aria-hidden="true" />
    </div>
  );
}

export default GlassReveal21st;
