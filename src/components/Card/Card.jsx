export default function Card({
  className,
  borderLeftColor = "#F59432",
  children,
}) {
  return (
    <>
      <div
        style={{ borderLeftColor: borderLeftColor }}
        className={`card card-border-left ${className || ""}`}
      >
        {children}
      </div>
    </>
  );
}
