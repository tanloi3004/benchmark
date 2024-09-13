# Benchmark Repository

This repository contains two different services for benchmarking purposes: a `java-native` service and a `node-express` service. We are comparing the performance of a Java native application and a Node.js Express server using `ApacheBench` (ab) for load testing.

## Project Structure

```
├── java-native
│   ├── Dockerfile
│   ├── pom.xml
│   ├── README.md
│   ├── src
│   └── target
├── node-express
|   ├── Dockerfile
|   ├── index.js
|   ├── node_modules
|   ├── package.json
|   ├── package-lock.json
|   └── README.md
├──http-server-rust
    ├── Cargo.lock
    ├── Cargo.toml
    ├── Dockerfile
    └── src

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

- `--cpus="1.5"` limits the container to 1.5 CPUs. You can adjust the value depending on your performance testing needs.
- **Node.js**: Keep in mind that Node.js applications typically run on a single thread and will only utilize 1 CPU unless using a multi-threaded approach.

### Benchmarking with ApacheBench

You can benchmark the services using `ApacheBench` to simulate load:

```bash
ab -c 100 -n 100000 http://localhost:3002/
ab -c 100 -n 100000 http://localhost:3001/
```

- `-c 100`: This flag sets the concurrency level to 100.
- `-n 100000`: This flag sets the total number of requests to 100,000.

### Sample Results

#### Test Environment:
- **CPU Model**: 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz
- **Threads per Core**: 2
- **Cores per Socket**: 4
- **CPU Max Frequency**: 4700 MHz
- **CPU Min Frequency**: 400 MHz

#### 1 CPU Benchmark

1. **Node.js Service** (`http://localhost:3001`):
   - **Requests per second**: 5506.24 [#/sec]
   - **Average time per request**: 18.161 ms
   - **Transfer rate**: 1134.59 KBytes/sec

2. **Java-Native Service** (`http://localhost:3002`):
   - **Requests per second**: 4566.26 [#/sec]
   - **Average time per request**: 21.900 ms
   - **Transfer rate**: 477.14 KBytes/sec

#### 2 CPUs Benchmark

1. **Node.js Service** (`http://localhost:3001`):
   - **Requests per second**: 5929.64 [#/sec]
   - **Average time per request**: 16.864 ms
   - **Transfer rate**: 1221.83 KBytes/sec

2. **Java-Native Service** (`http://localhost:3002`):
   - **Requests per second**: 16154.66 [#/sec]
   - **Average time per request**: 6.190 ms
   - **Transfer rate**: 1688.04 KBytes/sec

### Summary

- **Node.js Performance**:
  - On 1 CPU, Node.js handled approximately 5506 requests per second.
  - On 2 CPUs, Node.js showed a slight improvement, handling around 5929 requests per second.
  - Since Node.js is primarily single-threaded, the performance gains with additional CPUs are minimal unless the application leverages multi-threading.

- **Java-Native Performance**:
  - Java-native demonstrated significantly better performance with 16154 requests per second on 2 CPUs, compared to 4566 requests per second on 1 CPU.
  - The Java-native application takes advantage of multi-threading and scales more efficiently with additional CPUs.

## Notes

- Ensure that Docker is installed and running before executing the above commands.
- The `ApacheBench` tool (`ab`) is typically available in the `apache2-utils` package. You can install it on Ubuntu-based systems with:

```bash
sudo apt-get install apache2-utils
```

Feel free to tweak the benchmark settings and experiment with different concurrency levels and request counts for more comprehensive testing.