import { defineType } from "sanity";
import { InstagramIcon } from "./icons/InstagramIcon";

export default defineType({
  title: "Instagram Post",
  name: "instagramPost",
  type: "object",
  icon: InstagramIcon,
  fields: [
    {
      title: "Post URL",
      name: "url",
      type: "url",
      description: "URL of the Instagram post",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    prepare({ url }) {
      return {
        title: "Instagram Post",
        subtitle: url,
      };
    },
  },
});
