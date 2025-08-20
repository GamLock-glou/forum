# Forum App

A modern React-based forum application built with TypeScript and Vite.

🌐 **Live Demo**: [https://forum-2ikh.vercel.app/](https://forum-2ikh.vercel.app/)

## Features

- **User Authentication**: Login system with user sessions
- **Post Management**: Create, view, and interact with forum posts
- **Comments System**: Add comments to posts
- **User Profiles**: View and edit user profiles
- **Favorites**: Save and manage favorite posts
- **Admin Panel**: Administrative tools for user and post management
- **Responsive Design**: Optimized for desktop and mobile devices
- **Virtualized Lists**: Performance-optimized rendering for large datasets

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: Zustand
- **HTTP Client**: Axios
- **UI Components**: Custom components with CSS Modules
- **Icons**: Lucide React
- **Virtualization**: React Window

## Project Structure

```
src/
├── app/           # Application setup and routing
├── entities/      # Business entities (user, post, comment)
├── features/      # Feature-specific components
├── pages/         # Page components
├── shared/        # Shared utilities and components
└── widgets/       # Complex UI widgets
```

## Getting Started

### Prerequisites

- Node.js (latest LTS version)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd forum
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run preview` - Preview production build

## Pages

- **Home** (`/`) - Main forum page with post listings
- **Post** (`/post/:id`) - Individual post view with comments
- **Profile** (`/profile`) - User profile management
- **Favorites** (`/favorites`) - User's favorite posts
- **Admin** (`/admin`) - Administrative panel (admin users only)

## Architecture

The application follows Feature-Sliced Design principles with clear separation of concerns:

- **Entities**: Core business logic and data models
- **Features**: Reusable feature components
- **Shared**: Common utilities, API clients, and UI components
- **Pages**: Route-level components
- **Widgets**: Complex composite components

## Deployment

The application is deployed on Vercel and automatically deploys from the main branch.

## License

This project is private and not licensed for public use.
