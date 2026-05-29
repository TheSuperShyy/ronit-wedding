import { cn } from "../../lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

// Ivory + gold adaptation of the kokonutd bento grid. status/tags/cta are
// optional and only render when provided (no English placeholder defaults).
function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative overflow-hidden rounded-2xl p-5 transition-all duration-300",
            "border border-line bg-white/70",
            "hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_18px_50px_rgba(58,50,42,0.12)] will-change-transform",
            item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
            item.hasPersistentHover && "-translate-y-0.5 shadow-[0_18px_50px_rgba(58,50,42,0.12)]"
          )}
        >
          {/* subtle gold dot texture on hover */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,164,92,0.08)_1px,transparent_1px)] bg-[length:6px_6px]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-champagne text-gold-deep transition-colors duration-300 group-hover:border-gold/40">
                {item.icon}
              </div>
              {item.status && (
                <span className="rounded-lg bg-champagne px-2 py-1 text-xs font-medium text-gold-deep">
                  {item.status}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                {item.title}
                {item.meta && (
                  <span className="ms-2 text-xs font-normal text-ink-soft">{item.meta}</span>
                )}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">{item.description}</p>
            </div>

            {(item.tags || item.cta) && (
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-ink-soft">
                  {item.tags?.map((tag, i) => (
                    <span key={i} className="rounded-md border border-line bg-linen px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                {item.cta && (
                  <span className="text-xs text-gold-deep opacity-0 transition-opacity group-hover:opacity-100">
                    {item.cta}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* gold hairline frame on hover */}
          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-transparent via-gold/15 to-transparent p-px transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          />
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
