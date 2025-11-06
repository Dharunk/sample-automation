#!/bin/bash
# create dir for jenkins home
mkdir -p ./jenkins_home
echo "Building and starting containers..."
docker-compose up --build -d  
echo "- Jenkins: http://localhost:8085"
echo "- Sample App: http://localhost:3005"
echo "- Nginx (proxy): http://localhost:85"
echo "Setup completed."
