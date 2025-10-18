# Sanity Studio Setup Guide

This guide will help you set up Sanity Studio for managing your blog content.

## Prerequisites

1. Node.js installed on your machine
2. A Sanity account (sign up at [sanity.io](https://www.sanity.io/))

## Setting up Sanity Studio

1. **Install the Sanity CLI:**
   ```bash
   npm install -g @sanity/cli
   ```

2. **Create a new Sanity project:**
   ```bash
   sanity init
   ```
   Follow the prompts to:
   - Create a new project
   - Select the "Blog" schema template or start fresh
   - Choose your preferred dataset (typically "production")
   - Select your project location

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Copy the schema files:**
   Copy the files from your project's `/schemas` directory to the Sanity Studio's `/schemas` directory.

5. **Update the schema configuration:**
   In your Sanity Studio's `sanity.config.ts` file, make sure to import and use your schema types:
   ```typescript
   import { defineConfig } from 'sanity'
   import { structureTool } from 'sanity/structure'
   import { visionTool } from '@sanity/vision'
   import { schemaTypes } from './schemas'

   export default defineConfig({
     name: 'default',
     title: 'Folada Blog',
     projectId: process.env.SANITY_PROJECT_ID,
     dataset: process.env.SANITY_DATASET,
     plugins: [structureTool(), visionTool()],
     schema: {
       types: schemaTypes,
     },
   })
   ```

6. **Start the Studio:**
   ```bash
   sanity start
   ```

7. **Deploy the Studio:**
   When you're ready to deploy:
   ```bash
   sanity deploy
   ```

## Environment Variables

Create a `.env` file in your Sanity Studio project with:
```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

## Managing Content

1. Visit your Sanity Studio URL (typically `http://localhost:3333` when running locally)
2. Log in with your Sanity account
3. Create new "Blog Post" documents
4. Fill in content for each language field
5. Publish your posts

The content will automatically be available in your React application through the Sanity client.