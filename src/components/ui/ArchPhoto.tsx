type Props = {
  src: string;
  alt: string;
  tag?: string;
  className?: string;
  height?: string; // tailwind height class, e.g. 'h-[420px]'
};

// Rectangular framed image with thin gold border + optional caption tag.
export default function ArchPhoto({ src, alt, tag, className = '', height = 'h-[420px]' }: Props) {
  return (
    <figure
      className={`relative overflow-hidden rounded-xl border border-gold/30 ${height} ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-[center_25%]" />
      {tag && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/85 to-transparent px-4 pb-3.5 pt-10 font-display text-[15px] text-bone">
          {tag}
        </figcaption>
      )}
    </figure>
  );
}
