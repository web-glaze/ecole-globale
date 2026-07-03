import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ButtonBlock({ block }: any) {
  const alignment: any = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={cn("flex", alignment[block.alignment])}>
      <Button asChild variant={block.variant} size={block.size} className={block.className}>
        <Link href={block.url} target={block.newTab ? "_blank" : undefined} rel={block.newTab ? "noopener noreferrer" : undefined}>
          {block.label}
        </Link>
      </Button>
    </div>
  );
}
