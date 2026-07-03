"use client";

import { cn } from "@/lib/utils";

function getEmbedURL(url: string) {
  if (!url) return "";

  // YouTube
  if (url.includes("youtube.com/watch")) {
    return url.replace("watch?v=", "embed/");
  }

  if (url.includes("youtu.be/")) {
    return `https://www.youtube.com/embed/${url.split("/").pop()}`;
  }

  // Vimeo
  if (url.includes("vimeo.com")) {
    return `https://player.vimeo.com/video/${url.split("/").pop()}`;
  }

  return url;
}

export default function VideoBlock({ block }: any) {
  const aspect: any = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[9/16]",
  };

  return (
    <section className={cn(block.className)}>
      <div className={aspect[block.aspectRatio]}>
        {block.source === "embed" ? (
          <iframe
            src={getEmbedURL(block.embedURL)}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className={cn("h-full w-full", block.rounded && "rounded-xl")}
          />
        ) : (
          <video
            className={cn("h-full w-full object-cover", block.rounded && "rounded-xl")}
            controls={block.controls}
            autoPlay={block.autoplay}
            muted={block.muted}
            loop={block.loop}
            playsInline={block.playsInline}
            poster={block.poster?.cloudinary?.secure_url ?? block.poster?.url}
          >
            <source src={block.video?.cloudinary?.secure_url ?? block.video?.url} />
          </video>
        )}
      </div>

      {block.caption && <p className="mt-3 text-center text-sm text-muted-foreground">{block.caption}</p>}
    </section>
  );
}
