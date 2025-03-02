# Instagram Clone

A full-stack Instagram clone built with Spring Boot and NextJS.

## Features

- View feed of posts
- Create new posts
- Like and comment on posts
- View user profiles
- Responsive design

## Tech Stack

### Backend
- Java Spring Boot
- Spring Data JPA
- H2 Database (for development)
- RESTful API

### Frontend
- NextJS
- React
- Tailwind CSS
- Axios for API calls

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- npm or yarn

### Running the Backend

1. Navigate to the backend directory:
```
cd instagram-clone/backend
```

2. Build and run the Spring Boot application:
```
./mvnw spring-boot:run
```

The backend server will start on http://localhost:8080.

### Running the Frontend

1. Navigate to the frontend directory:
```
cd instagram-clone/frontend
```

2. Install dependencies:
```
npm install
# or
yarn install
```

3. Run the development server:
```
npm run dev
# or
yarn dev
```

The frontend application will be available at http://localhost:3000.

## API Endpoints

### Users
- GET /api/users - Get all users
- GET /api/users/{id} - Get user by ID
- GET /api/users/username/{username} - Get user by username
- POST /api/users - Create a new user
- PUT /api/users/{id} - Update a user
- DELETE /api/users/{id} - Delete a user

### Posts
- GET /api/posts - Get all posts
- GET /api/posts/{id} - Get post by ID
- GET /api/posts/user/{userId} - Get posts by user ID
- POST /api/posts - Create a new post
- PUT /api/posts/{id} - Update a post
- DELETE /api/posts/{id} - Delete a post

### Comments
- GET /api/comments/post/{postId} - Get comments for a post
- POST /api/comments/post/{postId} - Add a comment to a post
- PUT /api/comments/{commentId} - Update a comment
- DELETE /api/comments/{commentId} - Delete a comment

### Likes
- GET /api/likes/post/{postId} - Get likes info for a post
- POST /api/likes/post/{postId}/like - Like a post
- DELETE /api/likes/post/{postId}/unlike - Unlike a post
