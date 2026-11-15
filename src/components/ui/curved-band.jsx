import { useEffect, useRef } from "react";

const DEG = Math.PI / 180;

/**
 * Featured artwork in a curved, rounded frame.
 *
 * The image is drawn once into a <canvas>: each 1px column samples the source
 * where the cylinder projects to, so the surface is continuous — no strip
 * seams or gaps. A gentle falloff at both ends lets the panel roll off.
 *
 * Underneath sits the same image as a heavily blurred, dimmed glow, which
 * lifts the card off the black page, and a plain <img> fallback so the
 * artwork still shows if the canvas never paints.
 */
export default function CurvedBand({
  src,
  alt = "",
  curve = 96,
  className = "",
}) {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return undefined;

    const image = new Image();
    image.decoding = "async";

    let ready = false;
    let disposed = false;

    const paint = () => {
      const cssW = Math.round(frame.clientWidth);
      const cssH = Math.round(frame.clientHeight);
      if (!cssW || !cssH || !ready) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pxW = Math.round(cssW * dpr);
      const pxH = Math.round(cssH * dpr);

      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW;
        canvas.height = pxH;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const total = Math.max(1, curve) * DEG;
      const half = Math.sin(total / 2);

      // Arc length of the visible half-cylinder = the image's flat width.
      const flatW = (cssW * total) / (2 * half);

      const iw = image.naturalWidth;
      const ih = image.naturalHeight;
      const scale = Math.max(flatW / iw, cssH / ih);
      const srcW = flatW / scale;
      const srcH = cssH / scale;
      const sx0 = (iw - srcW) / 2;
      const sy0 = (ih - srcH) / 2;

      // Screen x -> flat-surface x -> source x, through the cylinder's asin.
      const sourceAt = (x) => {
        const p = Math.min(1, Math.max(-1, (2 * x) / cssW - 1));
        const theta = Math.asin(p * half);
        return Math.min(iw, Math.max(0, sx0 + flatW * (theta / total + 0.5) / scale));
      };

      for (let x = 0; x < cssW; x += 1) {
        const a = sourceAt(x);
        const b = sourceAt(x + 1);
        const sw = Math.max(b - a, 0.02);
        ctx.drawImage(image, a, sy0, Math.min(sw, iw - a), srcH, x, 0, 1, cssH);
      }

      // Let the ends roll away into shadow. Kept quiet on purpose: on flat
      // artwork anything stronger reads as a light leak, not curvature.
      const falloff = 1 - Math.cos(total / 2);
      const alpha = Math.min(0.5, falloff * 1.5);
      const shade = ctx.createLinearGradient(0, 0, cssW, 0);
      shade.addColorStop(0, `rgba(0,0,0,${alpha})`);
      shade.addColorStop(0.14, `rgba(0,0,0,${alpha * 0.45})`);
      shade.addColorStop(0.42, "rgba(0,0,0,0)");
      shade.addColorStop(0.58, "rgba(0,0,0,0)");
      shade.addColorStop(0.86, `rgba(0,0,0,${alpha * 0.45})`);
      shade.addColorStop(1, `rgba(0,0,0,${alpha})`);
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, cssW, cssH);
    };

    // Painted synchronously: never depend on a frame tick to show the artwork.
    const schedule = () => {
      if (disposed) return;
      paint();
    };

    image.onload = () => {
      if (disposed) return;
      ready = true;
      schedule();
    };
    image.src = src;

    if (image.complete && image.naturalWidth) {
      ready = true;
      schedule();
    }

    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(schedule);
    if (observer) observer.observe(frame);
    window.addEventListener("resize", schedule);

    return () => {
      disposed = true;
      if (observer) observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [src, curve]);

  return (
    <figure className={`curved ${className}`.trim()}>
      <img
        className="curved__glow"
        src={src}
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <div ref={frameRef} className="curved__frame" role="img" aria-label={alt}>
        <img
          className="curved__fallback"
          src={src}
          alt=""
          aria-hidden="true"
          draggable="false"
        />
        <canvas ref={canvasRef} className="curved__canvas" aria-hidden="true" />
      </div>
    </figure>
  );
}
