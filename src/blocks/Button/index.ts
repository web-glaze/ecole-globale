import { Block } from "payload";

export const ButtonBlock: Block = {
  slug: "button",
  labels: {
    singular: "Button",
    plural: "Buttons",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
            {
              name: "newTab",
              label: "Open in New Tab",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
        {
          label: "Style",
          fields: [
            {
              name: "variant",
              type: "select",
              defaultValue: "default",
              options: [
                { label: "Primary", value: "default" },
                { label: "Secondary", value: "secondary" },
                { label: "Outline", value: "outline" },
                { label: "Ghost", value: "ghost" },
                { label: "Destructive", value: "destructive" },
                { label: "Link", value: "link" },
              ],
            },
            {
              name: "size",
              type: "select",
              defaultValue: "default",
              options: [
                { label: "Small", value: "sm" },
                { label: "Default", value: "default" },
                { label: "Large", value: "lg" },
                { label: "Icon", value: "icon" },
              ],
            },
            {
              name: "alignment",
              type: "select",
              defaultValue: "left",
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
            },
            {
              name: "className",
              label: "Extra CSS Classes",
              type: "text",
              admin: {
                placeholder: "mt-6 w-full rounded-xl",
              },
            },
          ],
        },
      ],
    },
  ],
};
