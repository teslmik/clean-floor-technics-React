import { defineField, defineType } from "sanity";

const mainSliderImage = defineType({
  name: "mainSliderImage",
  type: "object",
  title: "Main Slider Image",
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
  ],
});

export default mainSliderImage;
