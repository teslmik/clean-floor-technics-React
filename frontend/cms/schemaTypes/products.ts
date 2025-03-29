import { defineField, defineType } from "sanity";
import { ImageIcon, ImagesIcon } from "@sanity/icons";

import { CategoriesEnum } from "../../src/@types/categories.enum";

export default defineType({
  name: "products",
  title: "Products",
  type: "document",
  groups: [
    {
      name: "pricing",
      title: "Pricing",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "article",
      title: "Article",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: Object.values(CategoriesEnum).map((cat) => ({
          title: cat,
          value: cat,
        })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "boolean",
      description: "У наявності",
      initialValue: true,
      options: { layout: "checkbox" },
    }),
    defineField({
      name: "installments",
      title: "Installments",
      description: "Розстрочка",
      type: "boolean",
      initialValue: false,
      options: { layout: "checkbox" },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      fieldset: "pricingGroup",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "oldPrice",
      title: "Old Price",
      type: "number",
      fieldset: "pricingGroup",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "label",
      title: "Labels",
      type: "object",
      options: { columns: 3 },
      fields: [
        {
          name: "promo",
          title: "Promo",
          type: "boolean",
          initialValue: false,
          options: { layout: "checkbox" },
        },
        {
          name: "popular",
          title: "Popular",
          type: "boolean",
          initialValue: false,
          options: { layout: "checkbox" },
        },
        {
          name: "new",
          title: "New",
          type: "boolean",
          initialValue: false,
          options: { layout: "checkbox" },
        },
      ],
    }),
    defineField({
      name: "media",
      title: "Main Image",
      type: "image",
      icon: ImageIcon,
    }),
    defineField({
      name: "sliderImages",
      title: "Image Gallery",
      type: "array",
      icon: ImagesIcon,
      of: [{ type: "image" }],
    }),
    defineField({
      name: "specification",
      title: "Specification",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "productDescription",
    }),
    defineField({
      name: "discontinued",
      title: "Discontinued",
      description: "Знято з виробництва",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 1,
      hidden: true,
    }),
  ],
  fieldsets: [
    {
      name: "pricingGroup",
      title: "Pricing",
      options: { columns: 2 },
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "media.image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Most recent",
      name: "publishedAtDesc",
      by: [{ field: "title", direction: "desc" }],
    },
  ],
});
