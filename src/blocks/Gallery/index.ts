import { Block } from "payload";

export const GalleryBlock: Block = {
  slug: "gallery",
  labels: {
    singular: "Gallery",
    plural: "Galleries",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "images",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              required: true,
            },
          ],
        },

        {
          label: "Layout",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "desktopColumns",
                  label: "Desktop",
                  type: "select",
                  defaultValue: "3",
                  admin: { width: "33%" },
                  options: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6", value: "6" },
                  ],
                },
                {
                  name: "tabletColumns",
                  label: "Tablet",
                  type: "select",
                  defaultValue: "2",
                  admin: { width: "33%" },
                  options: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                  ],
                },
                {
                  name: "mobileColumns",
                  label: "Mobile",
                  type: "select",
                  defaultValue: "1",
                  admin: { width: "33%" },
                  options: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                  ],
                },
              ],
            },

            {
              name: "gap",
              type: "select",
              defaultValue: "4",
              options: [
                { label: "None", value: "0" },
                { label: "Small", value: "2" },
                { label: "Medium", value: "4" },
                { label: "Large", value: "6" },
                { label: "Extra Large", value: "8" },
              ],
            },
          ],
        },

        {
          label: "Style",
          fields: [
            {
              name: "aspectRatio",
              type: "select",
              defaultValue: "square",
              options: [
                { label: "Original", value: "auto" },
                { label: "Square", value: "square" },
                { label: "Landscape (4:3)", value: "landscape" },
                { label: "Video (16:9)", value: "video" },
                { label: "Portrait (3:4)", value: "portrait" },
              ],
            },

            {
              type: "row",
              fields: [
                {
                  name: "rounded",
                  type: "checkbox",
                  defaultValue: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "shadow",
                  type: "checkbox",
                  defaultValue: false,
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },

            {
              type: "row",
              fields: [
                {
                  name: "lightbox",
                  label: "Enable Lightbox",
                  type: "checkbox",
                  defaultValue: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "zoomCursor",
                  label: "Zoom Cursor",
                  type: "checkbox",
                  defaultValue: true,
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },

            {
              name: "className",
              label: "Extra CSS Classes",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
