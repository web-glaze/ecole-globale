"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils";

export default function AccordionBlock({ block }: any) {
  const defaultValue =
    block.type === "single"
      ? block.items?.find((i: any) => i.defaultOpen)
        ? `item-${block.items.findIndex((i: any) => i.defaultOpen)}`
        : undefined
      : block.items?.map((i: any, index: number) => (i.defaultOpen ? `item-${index}` : null)).filter(Boolean);

  return (
    <section className={cn(`space-y-8 ec-accordion-${block.id}`, block.className)}>
      <Accordion type={block.type === "multiple" ? "multiple" : "single"} collapsible defaultValue={defaultValue} className="rounded-md">
        {block.items?.map((item: any, index: number) => (
          <AccordionItem key={index} value={`item-${index}`} className={`border-b px-4 last:border-b-0 ec-accordian-item-${index}`}>
            <AccordionTrigger className={cn("font-semibold")}>{item.title}</AccordionTrigger>
            <AccordionContent>
              <RichText data={item.content} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
