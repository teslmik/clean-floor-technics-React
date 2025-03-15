import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
    // defineField({
    //   name: "author",
    //   title: "Author",
    //   type: "reference",
    //   to: { type: "author" },
    // }),
    defineField({
      name: "media",
      title: "Main Media",
      type: "object",
      icon: ImageIcon,
      fields: [
        {
          name: "type",
          title: "Media Type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video Upload", value: "video" },
              { title: "Video Link (YouTube)", value: "videoLink" },
            ],
            layout: "radio",
          },
          initialValue: "image",
        },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.type !== "image",
        },
        {
          name: "video",
          title: "Video File",
          type: "file",
          options: { accept: "video/*" },
          hidden: ({ parent }) => parent?.type !== "video",
        },
        {
          name: "videoLink",
          title: "Video URL",
          type: "url",
          hidden: ({ parent }) => parent?.type !== "videoLink",
        },
      ],
    }),
    // defineField({
    //   name: "categories",
    //   title: "Categories",
    //   type: "array",
    //   of: [{ type: "reference", to: { type: "category" } }],
    // }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "blockContent",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "media.image",
    },
  },
});
