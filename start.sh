#!/bin/bash

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
sleep 10

echo "Radiology SaaS Platform is now running!"
echo "Frontend: http://localhost:56440"
echo "Backend API: http://localhost:3000/api"