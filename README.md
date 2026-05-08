# Raagakeys - Piano Notes & Music Theory Learning Platform

A production-ready Next.js 15 web application for learning piano notes, scales, chords, and music theory. Built with TypeScript, TailwindCSS, App Router, and MongoDB.

## 🎵 Features

- **Comprehensive Learning Resources**
  - Piano notes and scales
  - Chord progressions and voicings
  - Music theory fundamentals
  - Piano techniques and practices

- **User Experience**
  - Beautiful, responsive design
  - Dark mode support with automatic theme detection
  - Smooth animations and transitions
  - Mobile-friendly interface

- **Content Organization**
  - Categorized learning materials (Scales, Chords, Progressions, Techniques, Theory)
  - Difficulty levels (Beginner, Intermediate, Advanced)
  - Filterable and searchable content

- **Performance & SEO**
  - Server-side rendering with Next.js
  - SEO optimization with metadata
  - Fast page loads with modern tooling
  - Mobile-optimized

## 🛠 Technology Stack

- **Frontend**
  - Next.js 15 with App Router
  - React 19
  - TypeScript
  - TailwindCSS with dark mode
  - next-themes for theme management

- **Backend**
  - Node.js with Next.js API Routes
  - MongoDB with Mongoose ODM
  - RESTful API design

- **Development**
  - ESLint for code quality
  - Modern build tools
  - Hot module reloading

## 📁 Project Structure

```
raagakeys/
├── app/                           # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── health/              # Health check endpoint
│   │   └── notes/               # Notes CRUD endpoints
│   ├── notes/                    # Notes listing and detail pages
│   ├── categories/               # Categories page
│   ├── about/                    # About page
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   └── globals.css              # Global styles
├── src/
│   ├── components/               # Reusable React components
│   │   ├── common/              # Common components (ErrorBoundary, Skeleton)
│   │   ├── layout/              # Layout components (Header, Footer)
│   │   ├── cards/               # Card components (NoteCard)
│   │   └── ClientThemeProvider.tsx
│   ├── lib/                      # Utility functions
│   │   ├── api.ts               # API client helpers
│   │   ├── db.ts                # MongoDB connection
│   │   ├── seo.ts               # SEO utilities
│   │   └── utils.ts             # General utilities
│   ├── models/                   # Mongoose schemas and models
│   │   └── Note.ts              # Note model
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts             # Type exports
│   └── styles/                   # Additional stylesheets
├── public/                        # Static assets
├── .env.example                   # Environment variables example
├── .env.local                     # Local environment variables
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn package manager
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd raagakeys
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update `MONGODB_URI` with your MongoDB connection string
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Production
npm run build            # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint to check code quality

# Package Management
npm install             # Install dependencies
npm audit               # Check for security vulnerabilities
npm audit fix           # Fix minor vulnerabilities
```

## 🔌 API Endpoints

### Health Check
- **GET** `/api/health` - Check API and database status

### Notes
- **GET** `/api/notes` - Get all notes (with pagination and filtering)
  - Query params: `category`, `difficulty`, `limit`, `page`
- **POST** `/api/notes` - Create a new note
- **GET** `/api/notes/[id]` - Get a specific note
- **PUT** `/api/notes/[id]` - Update a note
- **DELETE** `/api/notes/[id]` - Delete a note

## 🎨 Dark Mode

The application automatically detects system theme preference and allows manual theme switching. Dark mode is fully supported using:
- TailwindCSS dark mode classes
- next-themes for theme persistence
- System preference detection

Toggle theme using the button in the header.

## 🌐 SEO Features

- Metadata optimization for all pages
- Open Graph support for social sharing
- Twitter card support
- Semantic HTML structure
- Mobile-friendly viewport configuration
- Structured data support

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/raagakeys?retryWrites=true&w=majority

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## 📝 Database Models

### Note
```typescript
{
  _id: ObjectId
  title: string (required, max 200 chars)
  description: string (required, max 500 chars)
  content: string (required)
  category: string (enum: scales, chords, progressions, techniques, music-theory)
  difficulty: string (enum: beginner, intermediate, advanced)
  createdAt: Date
  updatedAt: Date
}
```

## 🧩 Component Architecture

### Layout Components
- **Header** - Navigation and theme toggle
- **Footer** - Site footer with links

### Card Components
- **NoteCard** - Displays a piano note with metadata

### Common Components
- **ErrorBoundary** - Error handling for React errors
- **Skeleton** - Loading placeholders
- **ClientThemeProvider** - Theme context provider

## 🎯 Best Practices

1. **TypeScript**: All files use TypeScript for type safety
2. **Code Organization**: Clear separation of concerns
3. **Reusable Components**: DRY principle with composable components
4. **SEO**: Proper metadata and structured data
5. **Performance**: Optimized images, code splitting, and caching
6. **Accessibility**: Semantic HTML and ARIA labels
7. **Error Handling**: Comprehensive error boundaries and validation

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup for Production
1. Update `NEXT_PUBLIC_API_URL` to your production domain
2. Ensure `MONGODB_URI` points to production MongoDB instance
3. Set `NODE_ENV=production`
4. Enable security headers and CORS as needed

## 📊 Performance Metrics

- **Lighthouse Scores**: Target 90+ for all metrics
- **Core Web Vitals**: Optimized for fast page loads
- **Bundle Size**: Minimal with tree-shaking
- **Database Queries**: Indexed for performance

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Support

For questions or issues:
- Create an issue on GitHub
- Email: contact@raagakeys.com
- Documentation: Check docs folder

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

**Built with ❤️ for piano learners everywhere**
