export function HighlightNumberCard({
  highlight = "",
  description = ""
}: {
  highlight?: string | number;
  description?: string | number;
}) {
  return (
    <div className="rounded-lg border border-[#3D4D5C] flex flex-col items-center justify-center p-3">
      <span className="text-3xl font-bold text-foreground">{highlight}</span>
      <span className="text-sm text-[#9EADBF]">{description}</span>
    </div>
  );
}
