import { Block } from "payload";

export const ImageBlock: Block = {
  slug: "image",
  labels: {
    singular: "Image",
    plural: "Images",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "caption",
              type: "text",
            },
            {
              name: "url",
              label: "Link URL",
              type: "text",
              admin: {
                placeholder: "https://example.com",
              },
            },
            {
              name: "newTab",
              label: "Open in New Tab",
              type: "checkbox",
              defaultValue: false,
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.url),
              },
            },
          ],
        },
        {
          label: "Style",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "width",
                  label: "Width (px)",
                  type: "number",
                  admin: {
                    width: "50%",
                    placeholder: "800",
                  },
                },
                {
                  name: "height",
                  label: "Height (px)",
                  type: "number",
                  admin: {
                    width: "50%",
                    placeholder: "600",
                  },
                },
              ],
            },
            {
              name: "alignment",
              type: "select",
              defaultValue: "center",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
            },
            {
              name: "className",
              label: "CSS Classes",
              type: "text",
              admin: {
                placeholder: "rounded-xl shadow-lg",
                description: "Additional Tailwind/CSS classes for the image wrapper.",
              },
            },
          ],
        },
      ],
    },
  ],
};
