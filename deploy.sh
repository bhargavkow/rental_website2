#!/bin/bash
# Deployment script for Render

echo "Starting deployment process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the server
echo "Starting server..."
npm start
