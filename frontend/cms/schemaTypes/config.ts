import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const Config = defineType({
  name: "config",
  title: "Config",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "rates",
      type: "object",
      title: "Rates",
      options: { columns: 2 },
      fields: [
        {
          name: "rate",
          type: "number",
          title: "Your Euro Rate",
        },
        {
          name: "bankRate",
          type: "string",
          title: "Monobank Euro Rate",
          readOnly: true,
        },
      ],
    }),
    defineField({
      name: "mainSliderImages",
      type: "array",
      title: "Main Slider Images",
      description: "Images for the main slider with customizable order",
      of: [{ type: "mainSliderImage" }],
      options: { sortable: true },
    }),
    defineField({
      name: "priceList",
      title: "Price List (PDF)",
      type: "file",
      description: "Upload the latest price list in PDF format",
      options: { accept: "application/pdf" },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Config" };
    },
  },
});

export default Config;
