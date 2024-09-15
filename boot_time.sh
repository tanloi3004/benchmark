#!/bin/bash

# Arguments
IMAGE_NAME=$1
CONTAINER_NAME=${2:-test}
HOST_PORT=${3:-3000}

# Check if image name is provided
if [ -z "$IMAGE_NAME" ]; then
  echo "Usage: $0 <image_name> [container_name] [host_port]"
  exit 1
fi

# Get the start time
start_time=$(date +%s%3N)

# Run the Docker container
docker run -d --rm -p ${HOST_PORT}:3000 --name $CONTAINER_NAME --cpus=$CPU $IMAGE_NAME

# Wait until the service is available
until $(curl --output /dev/null --silent --head --fail http://localhost:${HOST_PORT}); do
    sleep 0.01
done

# Get the end time
end_time=$(date +%s%3N)

# Calculate and display the startup time
echo "Startup time: $((end_time - start_time)) milliseconds"

# Stop the Docker container
docker stop --time=30 $CONTAINER_NAME
