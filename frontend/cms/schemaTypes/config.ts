import { CogIcon } from "@sanity/icons";
import { defineType } from "sanity";

const Config = defineType({
  name: "config",
  title: "Config",
  type: "document",
  icon: CogIcon,
  fields: [
    {
      name: "mainSliderImages",
      type: "array",
      title: "Main Slider Images",
      description: "Images for the main slider with customizable order",
      of: [{ type: "mainSliderImage" }],
      options: {
        sortable: true,
      },
    },
  ],
  preview: {
    prepare() {
      return { title: "Config" };
    },
  },
});

export const mainSliderImage = defineType({
  name: "mainSliderImage",
  type: "object",
  title: "Main Slider Image",
  fields: [
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "altText",
      type: "string",
      title: "Alt Text",
      description: "Alternative text for accessibility",
      validation: (Rule) => Rule.required().min(3).max(100),
    },
  ],
});

export default Config;
