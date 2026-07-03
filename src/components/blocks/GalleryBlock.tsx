"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GalleryBlock({ block }: any) {
  const [index, setIndex] = useState(-1);

  const mobileCols: any = {
    1: "grid-cols-1",
    2: "grid-cols-2",
  };

  const tabletCols: any = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  const desktopCols: any = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  };

  const gapClass: any = {
    "0": "gap-0",
    "2": "gap-2",
    "4": "gap-4",
    "6": "gap-6",
    "8": "gap-8",
  };

  const aspectClass: any = {
    auto: "",
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    video: "aspect-video",
  };

  const gridClass = cn(
    "grid",
    gapClass[block.gap] || "gap-4",
    mobileCols[block.mobileColumns],
    tabletCols[block.tabletColumns],
    desktopCols[block.desktopColumns],
    block.className
  );

  const slides =
    block.images?.map((img: any) => ({
      src: img.cloudinary?.secure_url || img.url,
    })) || [];

  return (
    <>
      <div className={gridClass}>
        {block.images?.map((image: any, i: number) => (
          <div
            key={image.id}
            onClick={() => block.lightbox && setIndex(i)}
            className={cn("overflow-hidden", aspectClass[block.aspectRatio], block.rounded && "rounded-xl", block.shadow && "shadow-lg", block.lightbox && "cursor-zoom-in")}
          >
            <img
              src={image.cloudinary?.secure_url || image.url}
              alt={image.alt || ""}
              loading="lazy"
              className={cn("h-full w-full object-cover transition duration-300", block.lightbox && "hover:scale-105")}
            />
          </div>
        ))}
      </div>

      {block.lightbox && <Lightbox open={index >= 0} close={() => setIndex(-1)} index={index} slides={slides} />}
    </>
  );
}
