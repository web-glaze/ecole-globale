import { Block } from "payload";

export const TeamBlock: Block = {
  slug: "team",
  labels: {
    singular: "Team",
    plural: "Team",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "heading",
              type: "text",
              defaultValue: "Our Team",
            },
            {
              name: "description",
              type: "textarea",
            },
            {
              name: "members",
              type: "array",
              minRows: 1,
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "name",
                  type: "text",
                  required: true,
                },
                {
                  name: "designation",
                  type: "text",
                },
                {
                  name: "bio",
                  type: "textarea",
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "linkType",
                      label: "Link Type",
                      type: "radio",
                      defaultValue: "page",
                      admin: {
                        layout: "horizontal",
                        width: "30%",
                      },
                      options: [
                        {
                          label: "Internal Page",
                          value: "page",
                        },
                        {
                          label: "External URL",
                          value: "url",
                        },
                      ],
                    },
                    {
                      name: "page",
                      label: "Page",
                      type: "relationship",
                      relationTo: "pages",
                      admin: {
                        width: "35%",
                        condition: (_, siblingData) => siblingData?.linkType === "page",
                      },
                    },
                    {
                      name: "url",
                      label: "External URL",
                      type: "text",
                      admin: {
                        width: "35%",
                        condition: (_, siblingData) => siblingData?.linkType === "url",
                      },
                    },
                  ],
                },
              ],
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
                  type: "select",
                  defaultValue: "4",
                  admin: {
                    width: "33%",
                  },
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
                  type: "select",
                  defaultValue: "2",
                  admin: {
                    width: "33%",
                  },
                  options: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                  ],
                },
                {
                  name: "mobileColumns",
                  type: "select",
                  defaultValue: "1",
                  admin: {
                    width: "33%",
                  },
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
              defaultValue: "6",
              options: [
                { label: "Small", value: "4" },
                { label: "Medium", value: "6" },
                { label: "Large", value: "8" },
              ],
            },
          ],
        },

        {
          label: "Style",
          fields: [
            {
              name: "imageShape",
              type: "select",
              defaultValue: "circle",
              options: [
                {
                  label: "Circle",
                  value: "circle",
                },
                {
                  label: "Rounded",
                  value: "rounded",
                },
                {
                  label: "Square",
                  value: "square",
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "shadow",
                  type: "checkbox",
                  defaultValue: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "showBio",
                  type: "checkbox",
                  defaultValue: false,
                  admin: {
                    width: "50%",
                  },
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
