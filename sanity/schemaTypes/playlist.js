
import { defineType } from "sanity";

export const playlist = defineType({
  name: "playlist",
  title: 'Playlists',
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
      name: 'select',
      type: 'array',
      of: [{type: 'reference', to: [{type: "startup"}]}]
    }),
  ],
})