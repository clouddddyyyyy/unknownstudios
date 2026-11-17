/**
 * Fixed blue-silk backdrop for the home page. Mounted only there, so the
 * project pages get a flat surface to read on.
 */
export default function PageBackdrop() {
  return (
    <div className="page-bg" aria-hidden="true">
      <img className="page-bg__img" src="/hero-silk.png" alt="" draggable="false" />
      <div className="page-bg__tint" />
      <div className="page-bg__grain" />
    </div>
  );
}
