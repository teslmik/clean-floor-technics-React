import { defineField, defineType } from "sanity";

const partnersSlider = defineType({
  name: "partnerSlider",
  type: "object",
  title: "Partners Slider",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altText",
      type: "string",
      title: "Alt Text",
      description: "Alternative text for accessibility",
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Partner URL",
      description: "Link to partner's website",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
});

export default partnersSlider;
