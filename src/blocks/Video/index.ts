import { Block } from "payload";

export const VideoBlock: Block = {
  slug: "video",

  labels: {
    singular: "Video",
    plural: "Videos",
  },

  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "source",
              type: "radio",
              defaultValue: "upload",
              options: [
                {
                  label: "Upload",
                  value: "upload",
                },
                {
                  label: "Embed URL",
                  value: "embed",
                },
              ],
            },

            {
              name: "video",
              type: "upload",
              relationTo: "media",
              admin: {
                condition: (_, data) => data.source === "upload",
              },
            },

            {
              name: "embedURL",
              type: "text",
              admin: {
                description: "YouTube or Vimeo URL",
                condition: (_, data) => data.source === "embed",
              },
            },

            {
              name: "poster",
              type: "upload",
              relationTo: "media",
              admin: {
                condition: (_, data) => data.source === "upload",
              },
            },

            {
              name: "caption",
              type: "text",
            },
          ],
        },

        {
          label: "Settings",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "controls",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "autoplay",
                  type: "checkbox",
                },
                {
                  name: "loop",
                  type: "checkbox",
                },
              ],
            },

            {
              type: "row",
              fields: [
                {
                  name: "muted",
                  type: "checkbox",
                },
                {
                  name: "playsInline",
                  type: "checkbox",
                  defaultValue: true,
                },
                {
                  name: "rounded",
                  type: "checkbox",
                  defaultValue: true,
                },
              ],
            },

            {
              name: "aspectRatio",
              type: "select",
              defaultValue: "video",
              options: [
                {
                  label: "16:9",
                  value: "video",
                },
                {
                  label: "Square",
                  value: "square",
                },
                {
                  label: "Portrait",
                  value: "portrait",
                },
              ],
            },

            {
              name: "className",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
