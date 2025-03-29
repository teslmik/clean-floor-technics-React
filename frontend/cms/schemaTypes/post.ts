import { defineField, defineType } from "sanity";
import { DocumentTextIcon, ImageIcon } from "@sanity/icons";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
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
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, media, publishedAt } = selection;
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "No date";
      return {
        title,
        media,
        subtitle: `Public: ${date}`,
      };
    },
  },
  orderings: [
    {
      title: "Most recent",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
