# Wamage Project Assets

This repository contains static files used across multiple Wamage services.

## Overview
- Serves static assets for web applications

## Key Features
- Serves all necessary frontend static files
- Supports multiple deployment targets

## Setup & Usage

### Requirements
- Docker installed locally

### Running Service
1. Build Docker image:
   ```bash
   docker build -t wamage-assets .
   ```
2. Start service:
   ```bash
   docker run -p 3001:80 -d --name assets-service wamage-assets
   ```

### Accessing Assets
The server can be accessed at `http://localhost:3001`

### Updating Assets
1. Modify files in `public/` directory
2. Recreate container with updated assets:
   ```bash
   docker-compose up -d --force-recreate
   ```

## Production Deployment
For production environments, deploy using your preferred container orchestration system.

## File Structure
```
web/
└── assets/
    ├── Dockerfile
    ├── public/            <-- Static files
    └── README.md          <-- This file
```

## Runtime Configuration
-port: 3001 (default)

## License
MIT