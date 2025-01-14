# Web API Project Assignment Nestjs

## Project Overview

This project implements a User Management System with JWT Authentication using NestJS.
It includes features such as user registration, login, and CRUD operations on user profiles.
The API is secured with JWT authentication and provides role-based access control.

## Step to set up and run the project

```bash
yarn install
```

Create `.env` file from `.env.example` and set environment variables before you run the service.

```bash
# Develop on frontend
yarn develop:frontend

# Develop on backend
yarn develop:backend

# watch mode
yarn develop
```

## Assumptions and Limitations

# Assumptions:

- Database: The project assumes the use of a relational database management system (RDBMS) such as PostgreSQL, MySQL, or SQLite. TypeORM is utilized as the Object-Relational Mapper (ORM) for database interactions.
- Frontend Development: This project focuses on the backend API development using NestJS. Integration with a frontend application is not included error handling for frontend responses from the API is not implemented.
- Security: The project prioritizes essential security measures, including password hashing with bcrypt and JWT authentication.

# Limitations:

- Time Constraints: Due to time limitations and learning new framework technology, the project may not encompass all potential features or functionalities such as refresh token and handle authentication on frontend
- Testing Coverage: While the project encourages unit testing of services and controllers using Jest, the extent of testing coverage may vary.
