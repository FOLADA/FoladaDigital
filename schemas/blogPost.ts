export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ka', type: 'string', title: 'Georgian'},
        {name: 'ru', type: 'string', title: 'Russian'},
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en', // Use English title as source for slug
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'ka', type: 'text', title: 'Georgian'},
        {name: 'ru', type: 'text', title: 'Russian'},
      ],
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'ka', type: 'text', title: 'Georgian'},
        {name: 'ru', type: 'text', title: 'Russian'},
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],

  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage',
    },
  },
}