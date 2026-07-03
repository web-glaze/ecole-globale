import { Block } from "payload";

export const HTMLBlock: Block = {
  slug: "html",
  fields: [
    {
      name: "html",
      type: "code",
      admin: {
        language: "html",
      },
    },
  ],
};
