# Folada Agency Website

This is the official website for Folada Agency, built with React, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design
- Multilingual support (English, Georgian, Russian)
- Blog functionality with Sanity CMS integration
- Interactive UI components
- SEO optimized

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **CMS**: Sanity.io
- **Routing**: React Router
- **State Management**: React Query
- **UI Components**: shadcn/ui, Radix UI
- **Internationalization**: i18next

## Blog Implementation

The website includes a fully functional blog with multilingual support:

- Blog listing page with featured images, titles, and descriptions
- Individual blog post pages with full content
- Language switching that works seamlessly with blog content
- Sanity CMS integration for content management

### Blog Components

1. **Blog Listing** (`/blog`) - Displays all blog posts in a grid layout
2. **Blog Detail** (`/blog/:slug`) - Shows the full content of individual posts
3. **Language Support** - All blog content is available in English, Georgian, and Russian

### Sanity CMS Integration

Blog content is managed through Sanity CMS:

- Multilingual content structure (English, Georgian, Russian)
- Rich text content with images
- Automatic slug generation
- Publish date tracking

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with your Sanity project credentials:
   ```
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom hooks
├── lib/            # Utility functions and Sanity client
├── pages/          # Page components
├── App.tsx         # Main application component
├── i18n.ts         # Internationalization setup
└── main.tsx        # Application entry point

public/
├── locales/        # Translation files
└── robots.txt      # SEO robots file

schemas/            # Sanity schema definitions
```

## Documentation

- [Blog Implementation Details](BLOG_DOCUMENTATION.md)
- [Sanity Setup Guide](SANITY_SETUP.md)

## Deployment

The website can be deployed to any static hosting service (Vercel, Netlify, etc.) or traditional web server.