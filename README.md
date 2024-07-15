# MERN Stack Application

This repository contains a MERN stack application with a Node.js and Express backend, a MongoDB database, and a React frontend. The application is containerized using Docker and Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Docker
- Docker Compose

Find the download URL here: 
https://docs.docker.com/compose/install/

Once downloaded, start the docker software.

## Environment Variables

Go into the project directory

For both the projects find the *env.example* file and rename it to *.env*

Change your environment variables to production URLs

For example:
```
REACT_APP_API_URL=http://localhost:5000

MONGO_URI=mongodb://mongo:27017/adminportal

JWT_SECRET="your_jwt_secret"

FRONTEND_URL=http://localhost:3000

SUPERADMIN_USERNAME='superadmin'

SUPERADMIN_PASSWORD='password'
```
These are example values. Switch them with your production values.

## Finalizing

Finally, once everything is setup.
Run the following command in the terminal:

```
docker-compose up --build
```

