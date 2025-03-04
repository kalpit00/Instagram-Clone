# Frontend

This directory contains the frontend implementation of the Instagram Clone application, built with Next.js and React.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Layout.js       # Main layout wrapper
│   ├── Navbar.js       # Navigation bar
│   └── PostCard.js     # Post display component
├── pages/              # Application pages/routes
│   ├── _app.js         # Next.js App component
│   ├── activity.js     # Activity/notifications page
│   ├── create.js       # Create new post page
│   ├── index.js        # Home/feed page
│   ├── post/           # Post-related pages
│   └── profile.js      # User profile page
├── styles/             # Global styles
└── utils/              # Utility functions
```

## Components

### Core Components

- **Layout**: Provides consistent layout structure across pages
- **Navbar**: Navigation bar with links to main sections
- **PostCard**: Displays post content, likes, and comments

### Pages

- **Home (/)**: Main feed showing posts from followed users
- **Create (/create)**: Interface for creating new posts
- **Profile (/profile)**: User profile showing their posts and info
- **Activity (/activity)**: Shows notifications and recent activity
- **Post (/post/[id])**: Detailed view of a specific post

## Technologies

- **Next.js**: React framework for server-side rendering and routing
- **React**: UI component library
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Install dependencies:

```
npm install
# or
yarn install
```

2. Run the development server:

```
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000.

## Features

### User Interface

- **Responsive Design**: Optimized for both desktop and mobile
- **Image Optimization**: Efficient loading and display of images
- **Form Validation**: Client-side validation for all forms

### User Experience

- Feed of posts from other users
- Create and share new posts
- Like and comment on posts
- View user profiles
- Responsive design for mobile and desktop

## API Integration

The frontend communicates with the backend API using Axios. API calls are organized in the following categories:

- **User API**: Authentication, profile management
- **Post API**: Creating, reading, updating, and deleting posts
- **Comment API**: Adding and managing comments
- **Like API**: Liking and unliking posts

## Build

Create a production build with:

```
npm run build
# or
yarn build
```

## Configuration

Environment variables can be configured in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```
