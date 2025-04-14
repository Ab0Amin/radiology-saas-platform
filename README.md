# Radiology SaaS Platform

A fully-featured multi-tenant SaaS platform for radiology centers and hospitals. Each registered clinic or radiology center has its own isolated data (using PostgreSQL schemas), but all under one centralized and scalable infrastructure.

## Features

- **Multi-tenant Architecture**: Isolated data per clinic using PostgreSQL schemas
- **Role-based Access Control**: Support for receptionists, technicians, radiologists, and administrators
- **3D DICOM Viewer**: View scans from 3 planes (Axial, Sagittal, Coronal) with 3D reconstruction
- **Measuring Tools**: Built-in tools for radiologists to analyze images
- **Patient Management**: Add and manage patient records
- **Scan Management**: Track and organize different scan types (MRI, CT, X-ray)
- **Report Generation**: Write and save medical reports based on scan findings
- **Analytics Dashboard**: View statistics and scan data

## Tech Stack

- **Frontend**: Next.js with Material-UI
- **Backend**: NestJS
- **Database**: PostgreSQL (multi-tenant using schemas)
- **Containerization**: Docker
- **Authentication**: JWT-based with role-based access control
- **Monorepo**: NX workspace for managing both frontend and backend

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd radiology-saas
   ```

2. Start the application using Docker Compose:
   ```bash
   ./start.sh
   ```

3. Access the application:
   - Frontend: http://localhost:56440
   - Backend API: http://localhost:3000/api

### Development

#### Frontend (Next.js)

```bash
cd packages/frontend
npm install
npm run dev
```

#### Backend (NestJS)

```bash
cd packages/backend
npm install
npm run start:dev
```

## Project Structure

```
radiology-saas/
├── packages/
│   ├── frontend/            # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/         # Next.js App Router
│   │   │   │   ├── components/ # Reusable components
│   │   │   │   ├── theme/   # MUI theme configuration
│   │   │   │   └── ...      # Pages and routes
│   │   │   └── ...
│   │   └── ...
│   ├── backend/             # NestJS backend application
│   │   ├── src/
│   │   │   ├── tenants/     # Multi-tenant functionality
│   │   │   ├── users/       # User management
│   │   │   ├── patients/    # Patient records
│   │   │   ├── scans/       # Scan management
│   │   │   ├── reports/     # Report generation
│   │   │   └── ...
│   │   └── ...
├── docker-compose.yml       # Docker Compose configuration
└── start.sh                 # Startup script
```

## Security & Compliance

- All patient data is encrypted at rest and in transit
- Passwords are hashed using industry standards (bcrypt)
- JWT-based authentication with refresh tokens
- Strict RBAC to ensure users only access permitted resources

## License

[MIT License](LICENSE)
