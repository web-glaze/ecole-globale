import { Block } from "payload";

export const AccordionBlock: Block = {
  slug: "accordion",
  labels: {
    singular: "Accordion",
    plural: "Accordions",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "items",
              type: "array",
              required: true,
              minRows: 1,
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "defaultOpen",
                  type: "checkbox",
                  defaultValue: false,
                },
                {
                  name: "content",
                  type: "richText",
                },
              ],
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
                  name: "type",
                  label: "Accordion Type",
                  type: "select",
                  defaultValue: "single",
                  admin: {
                    width: "50%",
                  },
                  options: [
                    {
                      label: "Single Open",
                      value: "single",
                    },
                    {
                      label: "Multiple Open",
                      value: "multiple",
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
    },
  ],
};
