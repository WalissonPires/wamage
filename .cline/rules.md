# Cline Agent Rules - Project Standards

## General Principles

### Clean Code
- Write code that is self-documenting with clear variable and function names
- Follow SOLID principles in all implementations
- Keep functions small and focused on a single responsibility
- Avoid code duplication - apply DRY (Don't Repeat Yourself)
- Write meaningful comments only when necessary to explain "why", not "what"
- Maintain consistent code formatting throughout the project
- Keep cyclomatic complexity low - refactor complex functions
- Use meaningful naming conventions that reveal intent

### Testing
- Write unit tests for all business logic
- Maintain minimum 80% code coverage for critical paths
- Follow the AAA pattern (Arrange, Act, Assert) in tests
- Mock external dependencies appropriately
- Write integration tests for API endpoints and database operations

## Domain-Driven Design (DDD) Patterns

### Project Structure
Each service should follow DDD layered architecture:
```
service/
├── Domain/           # Core business logic, entities, value objects, domain events
├── Application/      # Use cases, application services, DTOs, interfaces
├── Infrastructure/   # External concerns (database, messaging, external APIs)
└── Presentation/     # API controllers, view models, endpoints
```

### Domain Layer
- **Entities**: Objects with unique identity that persist over time
- **Value Objects**: Immutable objects without identity (e.g., Money, Address)
- **Aggregates**: Cluster of entities and value objects with a root entity
- **Domain Events**: Represent significant events in the domain
- **Domain Services**: Operations that don't naturally fit within entities
- Keep domain layer pure - no infrastructure dependencies

### Application Layer
- **Use Cases/Command Handlers**: Orchestrate domain operations
- **Query Handlers**: Handle read operations (CQRS pattern)
- **Application Services**: Coordinate between domain and infrastructure
- **DTOs**: Data transfer objects for external communication
- **Interfaces**: Define contracts for infrastructure dependencies

### Infrastructure Layer
- **Repositories**: Implement data persistence abstraction
- **External Services**: Integration with third-party APIs
- **Message Brokers**: Event publishing and subscription
- **ORM Configuration**: Database mapping and configuration

### Presentation Layer
- **Controllers/Endpoints**: HTTP API surface
- **View Models**: Response structures for API consumers
- **Request Validation**: Input validation and sanitization
- **Authentication/Authorization**: Security implementations

### DDD Best Practices
- Always protect aggregate invariants
- Use domain events to communicate between aggregates
- Implement eventual consistency when appropriate
- Keep transactions within aggregate boundaries
- Use ubiquitous language consistently across code and documentation
- Design rich domain models, avoid anemic models
- Apply strategic patterns (Bounded Context, Context Map)

## Language-Specific Conventions

### .NET/C# Services
- Follow Microsoft's C# Coding Conventions
- Use PascalCase for public members, camelCase for private
- Implement async/await for I/O operations
- Use dependency injection via constructor injection
- Apply nullable reference types consistently
- Use records for immutable DTOs and value objects
- Implement IDisposable pattern when managing resources
- Use Entity Framework Core for data access
- Follow RESTful API conventions with versioning

### TypeScript/Node.js Services
- Follow Airbnb JavaScript Style Guide or StandardJS
- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Prefer `const` over `let`, avoid `var`
- Use async/await over promises chains
- Apply strict TypeScript mode
- Use interfaces for contracts, types for unions/intersections
- Implement dependency injection with InversifyJS or similar
- Use TypeORM or Prisma for database operations
- Structure code with modules and barrel exports

### Python Services
- Follow PEP 8 style guide
- Use snake_case for functions and variables
- Use PascalCase for classes
- Type hint all function signatures (PEP 484)
- Use dataclasses for DTOs and value objects
- Implement dependency injection with dependency-injector or similar
- Use SQLAlchemy for ORM operations
- Apply async/await with asyncio for async operations
- Structure with packages and modules
- Document with docstrings (Google or NumPy style)

### Go Services
- Follow Effective Go guidelines
- Use camelCase for unexported, PascalCase for exported
- Keep interfaces small and focused
- Handle errors explicitly, never ignore them
- Use context for cancellation and timeouts
- Implement dependency injection via struct composition
- Use GORM or sqlx for database operations
- Apply goroutines and channels for concurrency
- Structure with packages by domain, not layer
- Document exported symbols with comments

## API Design

### RESTful Principles
- Use proper HTTP verbs (GET, POST, PUT, PATCH, DELETE)
- Return appropriate HTTP status codes
- Version APIs (e.g., /api/v1/resource)
- Use plural nouns for resource endpoints
- Implement HATEOAS when beneficial
- Support pagination for collection endpoints
- Provide filtering and sorting capabilities
- Use proper content negotiation

### Request/Response Format
- Use JSON as default content type
- Follow consistent naming conventions (camelCase or snake_case)
- Include metadata in responses (pagination, timestamps)
- Implement proper error responses with details
- Use ISO 8601 for dates and times
- Support compression (gzip)

### Security
- Implement authentication (JWT, OAuth2)
- Apply authorization at endpoint and domain level
- Validate all inputs
- Sanitize outputs to prevent XSS
- Use HTTPS for all communications
- Implement rate limiting
- Apply CORS policies appropriately
- Log security events

## Database Design

### General Principles
- Normalize to 3NF, denormalize only when necessary
- Use appropriate indexes for query optimization
- Implement soft deletes for audit trails
- Use UUIDs for distributed systems
- Apply database migrations with version control
- Implement proper transaction boundaries
- Use connection pooling
- Apply read replicas for read-heavy workloads

### Naming Conventions
- Use snake_case for table and column names
- Prefix junction tables with both entity names
- Use singular names for tables (debatable, but consistent)
- Name foreign keys as `{referenced_table}_id`
- Use descriptive constraint names

## Microservices Patterns

### Communication
- Use asynchronous messaging for inter-service communication
- Implement event-driven architecture where appropriate
- Use synchronous REST/gRPC only when necessary
- Apply circuit breaker pattern for resilience
- Implement retry logic with exponential backoff
- Use correlation IDs for distributed tracing

### Data Management
- Each service owns its database (no shared databases)
- Implement Saga pattern for distributed transactions
- Use event sourcing when audit history is critical
- Apply CQRS for complex read/write scenarios
- Implement eventual consistency between services

### Observability
- Log structured logs with correlation IDs
- Implement distributed tracing (OpenTelemetry)
- Expose metrics endpoints (Prometheus format)
- Implement health checks for each service
- Monitor and alert on SLOs/SLIs

## Code Review Guidelines

### Before Submitting
- Run all tests locally
- Fix all linter warnings
- Update documentation as needed
- Ensure code coverage meets requirements
- Test manually when applicable

### Review Checklist
- Does code follow SOLID principles?
- Are DDD patterns applied correctly?
- Is error handling comprehensive?
- Are security concerns addressed?
- Is performance acceptable?
- Are tests adequate?
- Is code readable and maintainable?

## Documentation

### Code Documentation
- Document public APIs with clear examples
- Explain complex algorithms with comments
- Maintain up-to-date README files
- Document architectural decisions (ADRs)
- Keep API documentation synchronized with code

### Architecture Documentation
- Maintain C4 diagrams for system architecture
- Document bounded contexts and their relationships
- Keep deployment diagrams updated
- Document integration patterns
- Maintain runbooks for operations

## Performance

### General Guidelines
- Profile before optimizing
- Cache appropriately (avoid premature caching)
- Optimize database queries (use EXPLAIN)
- Implement pagination for large datasets
- Use asynchronous processing for heavy operations
- Apply proper indexing strategies
- Monitor and measure performance metrics

## Git Workflow

### Commit Messages
- Use conventional commits (feat:, fix:, docs:, etc.)
- Write clear, concise commit messages
- Keep commits atomic and focused
- Reference issue numbers when applicable

### Branching Strategy
- Use feature branches for new work
- Keep main/master branch deployable
- Delete branches after merging
- Use semantic versioning for releases

## Error Handling

### Best Practices
- Use custom exception types for domain errors
- Log errors with appropriate context
- Return meaningful error messages to clients
- Distinguish between technical and business errors
- Implement global exception handlers
- Never expose stack traces to end users
- Use error codes for client-side handling

## Configuration Management

- Use environment variables for configuration
- Never commit secrets to version control
- Use configuration management tools (dotenv, etc.)
- Implement configuration validation on startup
- Support multiple environments (dev, staging, production)
- Document all configuration options

---

**Remember**: These rules are guidelines to ensure consistent, maintainable, and high-quality code across all services. Adapt them as needed for specific contexts, but maintain the core principles of clean code, DDD, and best practices for each language.
