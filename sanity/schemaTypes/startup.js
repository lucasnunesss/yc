
import { defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: 'Startup',
  type: 'document',
  fields: [
    defineType({
      name: 'title',
      type: 'string'
    }),
    defineType({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    }),
    defineType({
      name: 'author',
      type: 'reference',
      to: {type: 'author'}
    }),
    defineType({
      name: 'views',
      type: 'number'
    }),
    defineType({
      name: 'description',
      type: 'text'
    }),
    defineType({
      name: 'category',
      type: 'string',
      validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category")
    }),
    defineType({
      name: 'image',
      type: 'url',
      validation: (Rule) => Rule.required()
    }),
  
    defineType({
      name: 'pitch',
      type: 'markdown'
    }),
  ],
})