import { UserIcon } from "lucide-react";
import { defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineType({
      name: 'id',
      type: 'number'
    }),
    defineType({
      name: 'name',
      type: 'string'
    }),
    defineType({
      name: 'username',
      type: 'string'
    }),
    defineType({
      name: 'email',
      type: 'string'
    }),
    defineType({
      name: 'image',
      type: 'url'
    }),
    defineType({
      name: 'bio',
      type: 'text'
    }),
  ],
  preview: {
    select: {
      title: "name"
    }
  }
})