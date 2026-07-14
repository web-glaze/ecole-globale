"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TeamBlock({ block }: any) {
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
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  const imageShape: any = {
    circle: "rounded-full aspect-square",
    rounded: "rounded-2xl aspect-square",
    square: "rounded-none aspect-square",
  };

  return (
    <section className={cn("", block.className)}>
      {(block.heading || block.description) && (
        <div className="mx-auto mb-12 max-w-3xl text-center">
          {block.heading && <h2 className="text-3xl font-bold md:text-4xl">{block.heading}</h2>}

          {block.description && <p className="mt-4 text-muted-foreground">{block.description}</p>}
        </div>
      )}

      <div className={cn("grid", mobileCols[block.mobileColumns], tabletCols[block.tabletColumns], desktopCols[block.desktopColumns], gapClass[block.gap])}>
        {block.members?.map((member: any) => {
          const href = member.linkType === "page" ? (member.page?.slug ? `/${member.page.slug}` : undefined) : member.url || undefined;

          const card = (
            <div
              className={cn("h-full text-center transition ", block.shadow && " border bg-background p-6 shadow hover:shadow-lg", href && "cursor-pointer hover:-translate-y-1")}
            >
              <img src={member.image?.cloudinary?.secure_url || member.image?.url} alt={member.name} className={cn("mx-auto object-cover", imageShape[block.imageShape])} />

              <h3 className="mt-5 text-xl font-semibold">{member.name}</h3>

              {member.designation && <p className="mt-1 font-medium">{member.designation}</p>}

              {block.showBio && member.bio && <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>}
            </div>
          );

          if (!href) {
            return <div key={member.id}>{card}</div>;
          }

          return (
            <Link
              key={member.id}
              href={href}
              target={member.linkType === "url" ? "_blank" : undefined}
              rel={member.linkType === "url" ? "noopener noreferrer" : undefined}
              className="block"
            >
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
