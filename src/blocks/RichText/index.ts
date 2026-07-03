import { Block } from "payload";

export const RichTextBlock: Block = {
  slug: "richText",

  labels: {
    singular: "Rich Text",
    plural: "Rich Text",
  },

  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};
