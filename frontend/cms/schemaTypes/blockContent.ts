import { defineType, defineArrayMember } from "sanity";
import { MobileDeviceIcon, EnvelopeIcon } from "@sanity/icons";

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
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
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "Type",
                name: "type",
                type: "string",
                options: {
                  list: [
                    { title: "Relative", value: "relative" },
                    { title: "Absolute", value: "absolute" },
                  ],
                  layout: "radio",
                },
                initialValue: "relative",
              },
              {
                title: "URL",
                name: "href",
                type: "string",
                hidden: ({ parent }) =>
                  parent?.type && parent?.type === "absolute",
                validation: (Rule) =>
                  Rule.custom((value: string, context: any) => {
                    if (context?.parent?.type === "relative") {
                      if (!value) return "Relative URL is required";
                      if (!value.startsWith("/"))
                        return "Relative URL must start with /";
                    }
                    return true;
                  }),
              },
              {
                title: "Absolute URL",
                name: "absoluteHref",
                type: "url",
                hidden: ({ parent }) =>
                  parent?.type && parent?.type === "relative",
                validation: (Rule) =>
                  Rule.custom((value: string, context: any) => {
                    if (context?.parent?.type === "absolute" && !value) {
                      return "Absolute URL is required";
                    }
                    return true;
                  }),
              },
            ],
          },
          {
            title: "Phone",
            name: "phone",
            type: "object",
            icon: MobileDeviceIcon,
            fields: [
              {
                title: "Phone number",
                name: "href",
                type: "string",
                description:
                  "Enter the phone number with the format tel:+123456789",
              },
            ],
          },
          {
            title: "Email",
            name: "email",
            type: "object",
            icon: EnvelopeIcon,
            fields: [
              {
                title: "Email address",
                name: "href",
                type: "string",
                description: "Enter the email address",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
