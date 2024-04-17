#!/bin/bash

# Change directory to /var/www/html/automation/gtstoinfor
cd /var/www/html/automation/gtstoinfor

# Pull changes from Git
git pull

# Install npm dependencies
npm install

# Reset Nx workspace
nx reset

# Build services-common
nx run services-common:build

#Restart pm2 auto
pm2 restart auto

# Optional: Display a message indicating successful execution
echo "Deployment script completed successfully."
