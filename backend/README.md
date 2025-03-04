# Backend

This directory contains the backend implementation of the Instagram Clone application, built with Spring Boot.

## Architecture

The backend follows a layered architecture pattern:

```
com.example.instagramclone/
├── config/              # Configuration classes
├── controller/          # REST API endpoints
├── dto/                 # Data Transfer Objects
├── model/               # Entity models
├── repository/          # Data access layer
└── service/             # Business logic
```

## Key Components

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic and orchestrate operations
- **Repositories**: Interface with the database
- **Models**: Define data structures and relationships
- **DTOs**: Transfer data between layers and to the client

## Technologies

- **Spring Boot**: Framework for building Java applications
- **Spring Data JPA**: Simplifies data access layer implementation
- **H2 Database**: In-memory database for development
- **Maven**: Dependency management and build tool
- **Lombok**: Reduces boilerplate code
- **Jackson**: JSON serialization/deserialization

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Running the Application

1. Build the application:

```
mvn clean install
```

2. Run the application:

```
mvn spring-boot:run
```

The server will start on http://localhost:8080.

## API Documentation

### Users API

| Method | Endpoint                       | Description          |
| ------ | ------------------------------ | -------------------- |
| GET    | /api/users                     | Get all users        |
| GET    | /api/users/{id}                | Get user by ID       |
| GET    | /api/users/username/{username} | Get user by username |
| POST   | /api/users                     | Create a new user    |
| PUT    | /api/users/{id}                | Update a user        |
| DELETE | /api/users/{id}                | Delete a user        |

### Posts API

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | /api/posts               | Get all posts        |
| GET    | /api/posts/{id}          | Get post by ID       |
| GET    | /api/posts/user/{userId} | Get posts by user ID |
| POST   | /api/posts               | Create a new post    |
| PUT    | /api/posts/{id}          | Update a post        |
| DELETE | /api/posts/{id}          | Delete a post        |

### Comments API

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| GET    | /api/comments/post/{postId} | Get comments for a post |
| POST   | /api/comments/post/{postId} | Add a comment to a post |
| PUT    | /api/comments/{commentId}   | Update a comment        |
| DELETE | /api/comments/{commentId}   | Delete a comment        |

### Likes API

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| GET    | /api/likes/post/{postId}        | Get likes info for a post |
| POST   | /api/likes/post/{postId}/like   | Like a post               |
| DELETE | /api/likes/post/{postId}/unlike | Unlike a post             |

## Database Schema

The application uses the following entity relationships:

- **User**: Represents a user account
- **Post**: Content created by users
- **Comment**: User comments on posts
- **Like**: User likes on posts

## Configuration

The application can be configured via `application.properties` or environment variables:

- `spring.datasource.url`: Database connection URL
- `spring.datasource.username`: Database username
- `spring.datasource.password`: Database password
- `server.port`: Server port (default: 8080)
