import { ImageIcon, ImagesIcon, TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { CategoriesEnum } from "../../src/@types/categories.enum";
import { categoryMap } from "../../src/constants/tabs-map";
import { PreviewImage } from "../components/PreviewImage";

export default defineType({
  name: "products",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
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
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true;

          const client = context.getClient({ apiVersion: "2023-01-01" });
          const id = context?.document?._id.replace(/^drafts\./, "");

          const existing = await client.fetch(
            `*[_type == "products" && article == $value && !(_id in [$id, "drafts." + $id])][0]._id`,
            { value, id },
          );

          return existing ? "Article must be unique" : true;
        }),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 1,
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
          title: categoryMap[cat],
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
      description: "in euro",
      type: "number",
      fieldset: "pricingGroup",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "oldPrice",
      title: "Old Price",
      description: "in uah",
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
      name: "mainImage",
      title: "Main Image",
      type: "image",
      icon: ImageIcon,
      fieldset: "mediaGroup",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sliderImages",
      title: "Image Gallery",
      type: "array",
      icon: ImagesIcon,
      fieldset: "mediaGroup",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required(),
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
          preview: {
            select: {
              title: "name",
              subtitle: "value",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "productDescription",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discontinued",
      title: "Discontinued",
      description: "Знято з виробництва",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "configRate",
      title: "Config Rate",
      description: "This is setting, not change!",
      type: "reference",
      to: [{ type: "config" }],
      initialValue: { _ref: "config" },
      readOnly: true,
    }),
  ],
  fieldsets: [
    {
      name: "pricingGroup",
      title: "Pricing",
      options: { columns: 2 },
    },
    {
      name: "mediaGroup",
      title: "Images",
    },
  ],
  preview: {
    select: {
      title: "title",
      mainImage: "mainImage",
      price: "price",
      article: "article",
      rate: "configRate.rates.rate",
    },
    prepare(selection) {
      const { title, mainImage, price, article, rate } = selection;
      const media = mainImage ? (
        <PreviewImage value={mainImage} objectFit="contain" />
      ) : null;

      return {
        title,
        media,
        subtitle: `${article ?? ""} | €${price?.toLocaleString() || ""} | ₴${rate ? (Math.floor((price * rate) / 10) * 10).toLocaleString() : "-"}`,
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
