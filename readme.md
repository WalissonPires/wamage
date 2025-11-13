# Wamage: A Microservices-Based Communication & Automation Platform

## 🚀 Project Overview

Wamage is a sophisticated, enterprise-ready platform designed to streamline business communication and automate complex workflows. Built on a scalable and resilient event-driven microservices architecture, this project demonstrates a polyglot approach to technology, selecting the best tools for each specific business domain.

The core business proposition is to provide a unified hub where businesses can manage multi-channel customer interactions (via WhatsApp, Telegram, etc.), facilitate real-time internal collaboration, and automate repetitive tasks through a powerful workflow engine.

## ✨ Core Business Domains & Features

This platform is divided into distinct business domains, each handled by a specialized microservice, showcasing a deep understanding of Domain-Driven Design (DDD) principles.

- **Unified Multi-Channel Communication**: Integrates with external messaging APIs like WhatsApp and Telegram, allowing businesses to manage all customer conversations from a single interface.
- **Real-Time Internal Chat**: Provides a seamless, real-time chat solution for internal team collaboration, ensuring quick and efficient communication.
- **Powerful Workflow Automation**: Enables the creation and execution of complex, automated workflows, reducing manual effort and increasing operational efficiency.
- **Scalable & Resilient by Design**: The microservices architecture ensures that each component can be scaled, updated, and deployed independently, providing high availability and fault tolerance.

## 🏛️ System Architecture

The system is designed as a collection of loosely coupled, independently deployable services that communicate asynchronously via a central message bus (Apache Kafka). This event-driven approach enhances scalability and resilience. Redis is utilized for caching and managing real-time session data, ensuring high-performance operations.

This architecture demonstrates proficiency in:
- **Domain-Driven Design (DDD)**: Bounded contexts are clearly defined for each service.
- **Event-Driven Architecture**: Services communicate through events, promoting decoupling and scalability.
- **Polyglot Persistence**: Each service uses a database technology best suited to its needs (e.g., PostgreSQL for relational data, MongoDB for flexible document storage).
- **CQRS (Command Query Responsibility Segregation)** principles can be readily applied within this structure.

## 💻 Technology Stack

| Category              | Technologies                                       |
| --------------------- | -------------------------------------------------- |
| **Backend**           | .NET/C#, Node.js, TypeScript                       |
| **Databases**         | PostgreSQL, MongoDB                                |
| **Messaging & Cache** | Apache Kafka, Redis, Socket.io                     |
| **Frontend**          | React (UI components are structured for this)      |
| **DevOps**            | Docker (containerization-ready)                    |

---

## 🛠️ Services Deep Dive

### 🌐 WebApp
- **Business Logic**: The primary user-facing application. It serves as the client portal for sending/receiving messages, managing contacts, and designing automation workflows.
- **Technology**: React, TypeScript.

### ⚙️ Workflow Service
- **Business Logic**: The core engine for managing and executing automated business processes. It interprets user-defined workflows, schedules tasks, and ensures reliable execution.
- **Technology**: .NET/C#, PostgreSQL.

### 💬 Chat Service
- **Business Logic**: Manages all real-time chat interactions between internal users of the platform. It handles user presence, message history, and chat rooms.
- **Technology**: Node.js/TypeScript, MongoDB.

### 📤 Message Service
- **Business Logic**: Acts as a gateway to external messaging providers. It abstracts the complexities of different APIs (WhatsApp, Telegram), providing a unified interface for sending and receiving messages.
- **Technology**: Node.js.

### ⚡ Realtime Service
- **Business Logic**: Pushes real-time updates to the WebApp using WebSockets. This ensures a dynamic and responsive user experience for live chats and notifications.
- **Technology**: Node.js, Socket.io.

### 🔗 Shared Infrastructure
- **Business Logic**: These are the cross-cutting concerns that support the entire ecosystem.
- **Technology**:
    - **Apache Kafka**: Serves as the event bus for asynchronous inter-service communication.
    - **Redis**: Used for caching, session management, and real-time data handling.
