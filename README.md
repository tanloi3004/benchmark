# Benchmark Repository

This repository contains two different services for benchmarking purposes: a `java-native` service and a `node-express` service. We are comparing the performance of a Java native application and a Node.js Express server using `ApacheBench` (ab) for load testing.

## Project Structure

```
├── java-native
│   ├── Dockerfile
│   ├── native-hello-world
│   ├── pom.xml
│   ├── README.md
│   ├── src
│   └── target
└── node-express
    ├── Dockerfile
    ├── index.js
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    └── README.md
```

### Java-Native Service

The `java-native` service is a Java application designed to run natively using GraalVM or a similar setup.

### Node-Express Service

The `node-express` service is a simple Node.js application built using the Express framework.

**Note:** Node.js will only run on 1 CPU. By default, Node.js applications are single-threaded, meaning it will only use one CPU core unless explicitly configured otherwise. This affects performance and should be considered when comparing results.

## Usage

### Build the Docker images

To build the Docker images for both services, run the following commands:

```bash
docker build -t node-express node-express
docker build -t java-native java-native
```

### Running the Containers

After building the images, you can run the containers on different ports:

```bash
docker run --rm -p 3002:3000 -d --name java-native java-native
docker run --rm -p 3001:3000 -d --name node-express node-express
```

- The `java-native` service will be accessible on port `3002`.
- The `node-express` service will be accessible on port `3001`.

### Limiting CPU Usage
> NodeJS only running on 1 CPU, 
You can limit the number of CPUs the containers use by using the `--cpus` flag. For example, to limit the containers to 1 CPUs:

```bash
docker run --rm -p 3002:3000 -d --name java-native --cpus="1" java-native
docker run --rm -p 3001:3000 -d --name node-express --cpus="1" node-express
```


- `--cpus="1"` limits the container to 1 CPUs. You can adjust the value depending on your performance testing needs.

### Benchmarking with ApacheBench

You can benchmark the services using `ApacheBench` to simulate load:

```bash
ab -c 100 -n 1000000 http://localhost:3002/
ab -c 100 -n 1000000 http://localhost:3001/
```

- `-c 100`: This flag sets the concurrency level to 100.
- `-n 1000000`: This flag sets the total number of requests to 1,000,000.

### Results

After running the benchmark, you can compare the performance results of the two services based on response time, requests per second, and other metrics provided by `ApacheBench`.

## Notes

- Ensure that Docker is installed and running before executing the above commands.
- The `ApacheBench` tool (`ab`) is typically available in the `apache2-utils` package. You can install it on Ubuntu-based systems with:

```bash
sudo apt-get install apache2-utils
```

Feel free to tweak the benchmark settings and experiment with different concurrency levels and request counts for more comprehensive testing.
