# Java Native Hello World Application

This is a simple example of building a Java HTTP server and packaging it into a lightweight Docker image using GraalVM's Native Image feature. The application starts an HTTP server that listens on port 3000 and returns "Hello world!" when accessed.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Docker
- Maven
- GraalVM 17

## Project Structure

```
.
├── Dockerfile
├── pom.xml
├── src
│   └── main
│       └── java
│           └── org
│               └── example
│                   └── Main.java
└── README.md
```

### Files:

- **Dockerfile**: Multi-stage Dockerfile that first builds the native image using GraalVM and Maven, and then packages it into a lightweight Debian-based image.
- **pom.xml**: Maven configuration file, which includes dependencies and plugins for building a GraalVM native image.
- **Main.java**: A simple HTTP server that responds with "Hello world!" when accessed on port 3000.

## Building the Application

To build the application, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Build the Docker image:

    ```bash
    docker build -t java-native-hello-world .
    ```

This will build the application using GraalVM and create a native image packaged inside a Debian-based image.

## Running the Application

Once the Docker image is built, you can run the application using the following command:

```bash
docker run -p 3000:3000 java-native-hello-world
```

This starts the server, which will listen on port 3000. You can access the server by navigating to `http://localhost:3000` in your web browser or by using `curl`:

```bash
curl http://localhost:3000
```

The expected output will be:

```
Hello world!
```

## Code Explanation

- **Main.java**: This file contains the main logic for the HTTP server.
    - The `HttpServer` is created to listen on port 3000.
    - The server responds with "Hello world!" to any request made to the root URL (`/`).
    - The server uses a cached thread pool for handling multiple requests.

- **pom.xml**: The Maven file includes:
    - The `maven-compiler-plugin` to set Java 17 as the source and target version.
    - The `native-image-maven-plugin`, which creates the native executable during the build process.
    - The native image's main class is specified as `org.example.Main`.

- **Dockerfile**: This is a multi-stage build Dockerfile:
    1. **Step 1**: It uses the `vegardit/graalvm-maven:latest-java17` base image to build the project with Maven and GraalVM.
    2. **Step 2**: It creates a minimal Docker image based on Debian Slim (`bullseye-slim`) with the native executable copied from the build step.

## Exposing the Application

The application exposes port 3000. Make sure that your Docker container allows access to port 3000 by binding it to your host machine's port 3000, as shown in the `docker run` command.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
