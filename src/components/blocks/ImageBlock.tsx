import { cn } from "@/lib/utils";

interface ImageBlockProps {
  block: {
    image: any;
    caption?: string;
    className?: string;
    alignment?: "left" | "center" | "right";
    url?: string;
    newTab?: boolean;
    width?: number;
    height?: number;
  };
}

export default function ImageBlock({ block }: ImageBlockProps) {
  const { image, caption, className, alignment = "center", url, newTab, width, height } = block;

  if (!image) return null;

  const src = image.cloudinary?.secure_url || image.url;

  const img = <img src={src} alt={image.alt || ""} className={cn(className)} width={width} height={height} />;

  return (
    <figure
      className={cn({
        "text-left": alignment === "left",
        "text-center": alignment === "center",
        "text-right": alignment === "right",
      })}
    >
      {url ? (
        <a href={url} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}>
          {img}
        </a>
      ) : (
        img
      )}

      {caption && <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
