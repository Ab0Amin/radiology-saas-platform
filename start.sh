#!/bin/bash

# Create necessary directories
mkdir -p ./packages/backend/uploads/dicom

# Start Docker daemon if not running
if ! docker info > /dev/null 2>&1; then
  echo "Starting Docker daemon..."
  sudo dockerd > /tmp/docker.log 2>&1 &
  sleep 5
fi

# Build and start the containers
echo "Building and starting containers..."
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 15

echo "Radiology SaaS Platform is now running!"
echo "Frontend: http://localhost:56440"
echo "Backend API: http://localhost:3000/api"
echo "Admin credentials: admin@radiology.com / password123"
echo "Doctor credentials: doctor@radiology.com / password123"
echo "Receptionist credentials: receptionist@radiology.com / password123"

# Show logs
echo "Showing logs (press Ctrl+C to exit)..."
docker-compose logs -f