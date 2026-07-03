import { RichText, defaultJSXConverters } from "@payloadcms/richtext-lexical/react";

export default function RichTextBlock({ block }: any) {
  return (
    <RichText
      className="richtext"
      data={block.content}
      converters={{
        ...defaultJSXConverters,
        upload: ({ node }) => {
          const media = node.value as any;

          return <img src={media?.cloudinary?.secure_url ?? media?.url} alt={media?.alt ?? ""} />;
        },
      }}
    />
  );
}
