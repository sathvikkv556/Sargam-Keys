# Copilot Instructions - Raagakeys Piano Notes Platform

## Project Overview

Raagakeys is a production-ready Next.js 15 piano notes and music theory learning platform. It provides comprehensive resources for learning piano scales, chords, progressions, techniques, and music theory.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with dark mode support
- **Database**: MongoDB with Mongoose ODM
- **Theme**: next-themes for automatic dark mode
- **Code Quality**: ESLint

## Project Architecture

### Frontend Structure
- **`app/`** - Next.js App Router pages and API routes
- **`src/components/`** - Reusable React components organized by type
  - `common/` - Shared utilities (ErrorBoundary, Skeleton)
  - `layout/` - Layout components (Header, Footer)
  - `cards/` - Card components (NoteCard)
- **`src/lib/`** - Utility functions and helpers
  - `api.ts` - API client functions
  - `db.ts` - MongoDB connection management
  - `seo.ts` - SEO metadata helpers
  - `utils.ts` - General utilities
- **`src/types/`** - TypeScript type definitions
- **`src/models/`** - Mongoose schemas and models

### Key Components

#### Layout Components
- **Header** - Navigation with theme toggle
- **Footer** - Site footer with links
- **ClientThemeProvider** - Dark mode support wrapper

#### Page Components
- **Home Page** - Hero section with features and CTA
- **Notes Page** - Browsable list of piano notes with filters
- **Categories Page** - Learning categories
- **About Page** - Platform information

#### Reusable Components
- **NoteCard** - Displays individual piano notes
- **ErrorBoundary** - Error handling wrapper
- **Skeleton/Loading States** - Loading placeholders

## Development Guidelines

### Code Standards

1. **TypeScript**
   - Use strict mode
   - Type all props and return values
   - Avoid `any` type

2. **React Components**
   - Prefer functional components
   - Use hooks for state management
   - Separate UI logic from business logic
   - Create reusable, composable components

3. **Styling**
   - Use TailwindCSS classes
   - Support dark mode with `dark:` prefix
   - Follow mobile-first responsive design
   - Use consistent spacing and colors

4. **API Design**
   - RESTful conventions
   - Proper HTTP status codes
   - Consistent response format
   - Error handling and validation

### Folder Organization

- Keep components focused and single-responsibility
- Group related utilities in the same file
- Use index.ts for clean exports
- Follow Next.js conventions for routing

### Naming Conventions

- **Components**: PascalCase (e.g., `NoteCard.tsx`)
- **Files/Folders**: kebab-case (e.g., `note-card.tsx`)
- **Functions**: camelCase (e.g., `fetchNotes()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_NOTES`)
- **Types**: PascalCase (e.g., `Note`, `APIResponse`)

## API Routes

### Health Check
```
GET /api/health
```
Returns API and database status.

### Notes Management
```
GET /api/notes - List all notes (paginated, filterable)
POST /api/notes - Create new note
GET /api/notes/[id] - Get single note
PUT /api/notes/[id] - Update note
DELETE /api/notes/[id] - Delete note
```

## Database

### MongoDB Collections

**Notes Collection**
- `_id`: ObjectId
- `title`: string (required, max 200 chars)
- `description`: string (required, max 500 chars)
- `content`: string (required)
- `category`: enum (scales, chords, progressions, techniques, music-theory)
- `difficulty`: enum (beginner, intermediate, advanced)
- `createdAt`: Date (auto)
- `updatedAt`: Date (auto)

### Indexes
- Compound index on `category` and `difficulty` for query optimization

## SEO Best Practices

1. All pages have proper metadata
2. Use semantic HTML elements
3. Optimize images with next/image
4. Implement Open Graph tags
5. Create XML sitemaps when needed
6. Use canonical URLs

## Dark Mode Implementation

- Implemented with `next-themes`
- Configured in TailwindCSS
- System preference detection
- User preference persistence
- Smooth theme transitions

## Performance Optimization

1. **Code Splitting**: Automatic with Next.js
2. **Image Optimization**: Use next/image component
3. **Lazy Loading**: Use dynamic imports for components
4. **Database**: Proper indexing on frequently queried fields
5. **Caching**: Leverage Next.js ISR when applicable

## Environment Variables

```env
MONGODB_URI=<MongoDB connection string>
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

## Development Workflow

1. **Create features in feature branches**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Follow component structure**
   - Create in appropriate folder
   - Export from index.ts
   - Add TypeScript types

3. **Write API routes**
   - Follow RESTful conventions
   - Include proper error handling
   - Validate input data
   - Return consistent response format

4. **Test before committing**
   ```bash
   npm run lint
   npm run dev  # Test locally
   ```

## Common Tasks

### Adding a New Page
1. Create folder in `app/`
2. Add `page.tsx`
3. Add metadata for SEO
4. Use layout components (Header/Footer via root layout)

### Adding a New Component
1. Create in `src/components/[category]/`
2. Define TypeScript props interface
3. Export from component folder
4. Add to index.ts if needed

### Adding a New API Route
1. Create in `app/api/[route]/`
2. Export handler functions (GET, POST, etc.)
3. Include error handling
4. Test with curl or API client

### Connecting to MongoDB
1. Models are in `src/models/`
2. Use `connectDB()` in API routes
3. Models auto-connect on import
4. Handle connection pooling

## Deployment Checklist

- [ ] Set production MongoDB URI
- [ ] Update NEXT_PUBLIC_API_URL
- [ ] Run `npm run build` successfully
- [ ] Test API endpoints
- [ ] Verify dark mode functionality
- [ ] Check SEO metadata
- [ ] Test on mobile devices
- [ ] Monitor error logs

## Useful Commands

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm start             # Start production server
npm run lint          # Check code quality
npm install           # Install dependencies
npm audit             # Check for vulnerabilities
```

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [React Docs](https://react.dev)

## Troubleshooting

### MongoDB Connection Issues
- Verify MONGODB_URI format
- Check network access in MongoDB Atlas
- Ensure credentials are correct
- Check connection pooling settings

### Theme Not Working
- Ensure ThemeProvider wraps app
- Check for suppressHydrationWarning on html tag
- Clear browser cache
- Verify next-themes installation

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

## Notes for Future Development

- Consider adding authentication for user-specific features
- Implement search functionality across notes
- Add user bookmarks/favorites
- Create admin panel for content management
- Implement analytics tracking
- Add related notes suggestions
- Create mobile app with React Native
