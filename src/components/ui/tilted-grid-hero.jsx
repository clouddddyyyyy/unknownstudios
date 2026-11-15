import { useEffect, useId, useRef, useState } from "react";

// Each tile is sliced into this many strips so it can bend along the arc.
const FRAME_COUNT = 16;
// How deep the arc bows toward the viewer.
const ARC_DEPTH = 1.6;
// Hard ceiling on tile height, as a share of the container width.
const MAX_TILE_HEIGHT = 55;

/** Radius of the arc, in container widths, for a given curve angle. */
function arcRadius(angleRad, depth = ARC_DEPTH) {
  return (
    (depth - 1 + Math.cos(angleRad)) / (2 * depth * Math.sin(angleRad))
  );
}

/** How many columns fit across the arc, and how far each one travels. */
function measure(width, height, tileHeight, aspectRatio, gap, angleRad, depth) {
  const maxColumnWidth = Math.min(
    (tileHeight / 100) * height,
    (MAX_TILE_HEIGHT / 100) * (width / aspectRatio)
  );
  const radius = width * arcRadius(angleRad, depth);

  if (!(maxColumnWidth > 0) || !(radius > 0)) {
    return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  }

  const unit = (maxColumnWidth / radius) * (180 / Math.PI);
  const pitch = (aspectRatio + gap / 100) * unit;
  const halfSpan = (angleRad * 180) / Math.PI + (aspectRatio * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * halfSpan) / pitch)));
  const sweep = Number(((columns * pitch) / 2).toFixed(4));

  return {
    columns,
    sweep,
    unit: Number(unit.toFixed(4)),
    limit: Number(Math.min(sweep, halfSpan).toFixed(4)),
  };
}

/**
 * TiltedGridHero
 *
 * Image tiles ride around a shallow cylinder: they come in from one edge,
 * flatten out at the centre, then bend away and fade out round the other.
 * Each tile is sliced into strips and rotated along the arc so the bend is
 * smooth rather than a single skewed panel.
 */
export function TiltedGridHero({
  images = [],
  speed = 4,
  tileHeight = 38,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 50,
  curve = 80,
  depth = 1.6,
  fade = 12,
  className = "",
  style,
  children,
}) {
  const stageRef = useRef(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const animationName = `tgh-spin-${uid}`;
  const columnClass = `tgh-column-${uid}`;

  const [metrics, setMetrics] = useState(null);
  const [seeds, setSeeds] = useState({});

  const curveRad = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;
  const radius = arcRadius(curveRad, depth);

  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof ResizeObserver === "undefined") return undefined;

    const read = (width, height) => {
      const next = measure(
        width,
        height,
        tileHeight,
        aspectRatio,
        gap,
        curveRad,
        depth
      );
      setMetrics((prev) =>
        prev &&
        prev.columns === next.columns &&
        prev.sweep === next.sweep &&
        prev.unit === next.unit
          ? prev
          : next
      );
    };

    const rect = node.getBoundingClientRect();
    read(rect.width, rect.height);

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      read(width, height);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [tileHeight, aspectRatio, gap, curveRad, depth]);

  // Warm the cache so a strip never appears blank as it swings into view.
  useEffect(() => {
    if (typeof Image === "undefined") return;
    images.forEach((image) => {
      const preload = new Image();
      preload.src = image.src;
    });
  }, [images]);

  const { columns, sweep, unit, limit } =
    metrics || measure(1200, 560, tileHeight, aspectRatio, gap, curveRad, depth);

  const perUnit = `min(${tileHeight}cqh, ${Number(
    (MAX_TILE_HEIGHT / aspectRatio).toFixed(4)
  )}cqw)`;
  const len = (n) => `calc(${Number(n.toFixed(4))} * ${perUnit})`;

  const radiusCqw = `${Number((100 * radius).toFixed(3))}cqw`;
  const place = (deg) =>
    `translateZ(${radiusCqw}) rotateY(${Number(
      deg.toFixed(4)
    )}deg) translateZ(-${radiusCqw})`;

  const hidden = Number(
    (((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4)
  );
  const duration = columns * speed;
  const frameWidth = aspectRatio / FRAME_COUNT;
  const mask = `linear-gradient(90deg, transparent, #000 ${fade}%, #000 ${
    100 - fade
  }%, transparent)`;

  const keyframes =
    `@keyframes ${animationName}{` +
    `from{transform:${place(-sweep)}}` +
    `to{transform:${place(sweep)}}` +
    `0%,${hidden}%,${100 - hidden}%,100%{visibility:hidden}` +
    `${hidden + 0.001}%,${100 - hidden - 0.001}%{visibility:visible}}` +
    `@media (prefers-reduced-motion:reduce){.${columnClass}{animation-play-state:paused}}`;

  return (
    <section className={`tilted-grid ${className}`.trim()} style={style}>
      <style>{keyframes}</style>

      <div
        ref={stageRef}
        className="tilted-grid__stage"
        aria-hidden="true"
        style={{
          perspective: `${Number((100 * radius * depth).toFixed(3))}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: columns }, (_, index) => {
          const reversed = columns - 1 - index;
          const image = images.length
            ? images[(seeds[index] ?? reversed) % images.length]
            : null;

          return (
            <div
              key={index}
              className={`tilted-grid__column ${columnClass}`}
              style={{
                left: `calc(50% - ${len(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${len(0.5)})`,
                width: len(aspectRatio),
                height: len(1),
                animation: `${animationName} ${duration}s linear ${
                  -index * speed
                }s infinite`,
              }}
              onAnimationIteration={(event) => {
                const loops = Math.round(event.elapsedTime / duration);
                setSeeds((prev) => {
                  const next = loops * columns + reversed;
                  return prev[index] === next
                    ? prev
                    : { ...prev, [index]: next };
                });
              }}
            >
              {Array.from({ length: FRAME_COUNT }, (_, frame) => (
                <div
                  key={frame}
                  className="tilted-grid__frame"
                  style={{
                    left: len((aspectRatio - frameWidth) / 2),
                    width:
                      frame === FRAME_COUNT - 1
                        ? len(frameWidth)
                        : `calc(${len(frameWidth)} + 1px)`,
                    height: len(1),
                    transform: place(
                      (aspectRatio / 2 - (frame + 0.5) * frameWidth) * unit
                    ),
                  }}
                >
                  {image ? (
                    <img
                      src={image.src}
                      alt={frame === 0 ? image.alt || "" : ""}
                      draggable="false"
                      loading="eager"
                      decoding="async"
                      style={{
                        left: len(-frame * frameWidth),
                        width: len(aspectRatio),
                        height: len(1),
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div
        className="tilted-grid__content"
        style={{ "--tile-band": `${tileHeight}cqh` }}
      >
        {children}
      </div>
    </section>
  );
}

export default TiltedGridHero;
