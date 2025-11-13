# CONTINUE.md - Project Guide

## Project Overview
**Project Name:** Wamage

**Description:** Wamage is a sophisticated, enterprise-ready platform designed to streamline business communication and automate complex workflows. Built on a scalable and resilient event-driven microservices architecture, this project demonstrates a polyglot approach to technology.

**Key Technologies:**
- **Backend:** .NET/C#, Node.js, TypeScript
- **Databases:** PostgreSQL, MongoDB
- **Messaging & Cache:** Apache Kafka, Redis, Socket.io
- **Frontend:** React
- **DevOps:** Docker

**Architecture:** This platform is divided into distinct microservices that handle specific business domains, utilizing asynchronous communication via a central message bus (Apache Kafka).

## Getting Started
**Prerequisites:**
- Node.js
- Docker
- .NET SDK

**Installation Instructions:**
1. Clone the repository.
2. Navigate to each microservice directory and install dependencies (e.g., using `npm install` for Node.js services, etc.).
3. Build and run using Docker.

**Basic Usage Examples:**
- Access the web app on `http://localhost:3000`.

**Running Tests:**
- Use the test command for each microservice to run unit tests.

## Project Structure
- **web/**: Contains the frontend React application.
- **services/**: Contains all microservices (chat, workflow, realtime, message).
- **shared/**: Contains shared code, contracts, and UI components.

## Development Workflow
- Follow coding standards outlined in [rules.md](.cline/rules.md).
- Use feature branches for development.
- Submit pull requests for code review.

## Key Concepts
- **Domain-Driven Design (DDD):** Each microservice is built following the DDD principles.
- **Event-Driven Architecture:** Services communicate through events to ensure scalability.

## Common Tasks
- Starting the backend and frontend services.
- Adding a new feature in one of the microservices.

## Troubleshooting
- Common issues with dependency installation can often be resolved by clearing the cache or reinstalling node modules.

## References
- [Official Documentation of Frameworks](https://frameworks-docs-link)
- [Architecture Diagram](./path-to-diagram)