# Blog Implementation with Sanity CMS

This document explains how to set up and use the blog functionality with Sanity CMS in the Folada Agency website.

## Sanity Setup

1. **Create a Sanity project:**
   - Go to [sanity.io](https://www.sanity.io/) and create an account
   - Create a new project for your blog
   - Note down your Project ID and Dataset name

2. **Configure environment variables:**
   Create a `.env` file in the root of your project with the following variables:
   ```
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   VITE_SANITY_TOKEN=your-token (optional, only needed for write operations)
   ```

3. **Deploy the schema:**
   - Copy the schema files from `/schemas` to your Sanity project
   - Deploy the schema using the Sanity CLI or Studio

## Blog Post Structure

Each blog post in Sanity has the following fields with multilingual support:

- **Title**: Object with `en`, `ka`, and `ru` fields
- **Slug**: Auto-generated from the English title
- **Description**: Object with `en`, `ka`, and `ru` fields
- **Main Image**: Image asset
- **Body**: Object with `en`, `ka`, and `ru` fields
- **Published At**: DateTime field

## Language Switching

The blog fully supports the existing language switching functionality:
- Content is displayed in the currently selected language
- When the language is changed, the content updates automatically
- If content is not available in the selected language, it falls back to English

## Components

1. **BlogPage (`/src/components/blog/BlogPage.tsx`)**:
   - Displays a list of blog posts
   - Shows featured image, title, description, and publish date
   - Includes "Read More" button for each post

2. **BlogDetailPage (`/src/components/blog/BlogDetailPage.tsx`)**:
   - Displays the full content of a single blog post
   - Shows the featured image, title, description, and full body
   - Includes navigation back to the blog listing

3. **Sanity Client (`/src/lib/sanity.ts`)**:
   - Configures the connection to Sanity
   - Provides helper functions for querying data and handling images

## Routes

- `/blog` - Blog listing page
- `/blog/:slug` - Individual blog post page
- `/blog-test` - Test page for multilingual functionality (development only)

## Testing

To test the multilingual functionality:
1. Navigate to `/blog-test`
2. Use the language buttons to switch between English, Georgian, and Russian
3. Observe how the content changes according to the selected language

## Adding New Blog Posts

To add new blog posts:
1. Go to your Sanity Studio
2. Create a new "Blog Post" document
3. Fill in the content for each language
4. Publish the document
5. The new post will automatically appear on the website

## Customization

To customize the blog:
1. Modify the components in `/src/components/blog/`
2. Update the styling in the Tailwind classes
3. Adjust the queries in the components to fetch additional data
4. Modify the schema in `/schemas/blogPost.ts` to add new fields