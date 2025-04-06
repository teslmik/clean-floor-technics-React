import { LinkIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";

export default defineType({
  title: "Product Description",
  name: "productDescription",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "internalLink",
            type: "object",
            title: "Product link",
            icon: LinkIcon,
            fields: [
              {
                name: "reference",
                type: "reference",
                to: [{ type: "products" }],
                title: "Product",
              },
            ],
          },
        ],
      },
    }),
  ],
});
