import RichTextBlock from "./RichTextBlock";
import ImageBlock from "./ImageBlock";
import GalleryBlock from "./GalleryBlock";
import VideoBlock from "./VideoBlock";
import AccordionBlock from "./AccordionBlock";
import ButtonBlock from "./ButtonBlock";
import HTMLBlock from "./HTMLBlock";
import TeamBlock from "./TeamBlock";

export default function BlockRenderer({ layout }: { layout: any[] }) {
  if (!layout?.length) return null;

  return (
    <>
      {layout.map((block, index) => {
        switch (block.blockType) {
          case "richText":
            return <RichTextBlock key={index} block={block} />;

          case "image":
            return <ImageBlock key={index} block={block} />;

          case "gallery":
            return <GalleryBlock key={index} block={block} />;

          case "video":
            return <VideoBlock key={index} block={block} />;

          case "accordion":
            return <AccordionBlock key={index} block={block} />;

          case "button":
            return <ButtonBlock key={index} block={block} />;

          case "html":
            return <HTMLBlock key={index} block={block} />;

          case "team":
            return <TeamBlock key={index} block={block} />;

          default:
            return null;
        }
      })}
    </>
  );
}
