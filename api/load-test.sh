#!/bin/bash

# Step 1: Check if the docker image test-api exists
if [[ "$(docker images -q test-api 2> /dev/null)" == "" ]]; then
  echo "Image does not exist. Building..."
  docker build -t test-api .
else
  echo "Image exists. Proceeding to next step..."
fi

if [[ "$(docker images -q test-api 2> /dev/null)" != "" ]]; then

  # Step 2: Check if the docker network test exists
  if [[ "$docker network inspect test 2> /dev/null" == "" ]]; then
    echo "Network does not exist. Creating..."
    docker network create test
  else
    echo "Network exists. Proceeding to next step..."
  fi

  if [[ "$docker network inspect test 2> /dev/null" != "" ]]; then

    # Step 3: Stop and remove existing test-api container if it's running
    if [[ "$docker ps -q -f name=test-api 2>/dev/null" != "" ]]; then
        echo "Stopping and removing existing test-api container..."
        docker stop test-api
    fi

    # Step 4: Run the test-api container
    echo "Running test-api container..."
    if [ "$1" = "cluster" ]; then
        docker run --rm -p 8080:8080 -d --name test-api --network test --env-file ./.env.dev test-api -i max
    else
        docker run --rm -p 8080:8080 -d --name test-api --network test --env-file ./.env.dev test-api
    fi

    # Step 5: Wait for 5 seconds
    echo "Waiting for 5 seconds..."
    sleep 5

    # Step 6: Run the test-k6 container
    echo "Running test-k6 container..."
    docker run --rm -i --network test --name test-k6 grafana/k6 run -<script.js
  
  else
    echo "Network does not exist. Please create the network first."
  fi

else
  echo "Image does not exist. Please build the image first."
fi


