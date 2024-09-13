# Express.js Server

This is a simple Express.js server that responds with "Hello world!" on the root route.

## How to Run Locally

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone the repository and navigate to the project directory.
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open a browser and navigate to `http://localhost:3000`.

## Docker Instructions

### Build the Docker Image

To build the Docker image, run the following command:

```
docker build -t node-express .
```

### Run the Docker Container

To run the Docker container, use:

```
docker run -p 3000:3000 node-express
```

Now, your Express server should be available at `http://localhost:3000`.

## Project Structure

- `index.js`: The main server file.
- `Dockerfile`: Configuration to build the Docker image.
- `.gitignore`: Files ignored by Git.
- `.dockerignore`: Files ignored in the Docker build context.
