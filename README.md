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
You can limit the number of CPUs the containers use by using the `--cpus` flag. For example, to limit the containers to 0.5 CPU:

```bash
docker run --rm -p 3002:3000 -d --name java-native --cpus="0.5" java-native
docker run --rm -p 3001:3000 -d --name node-express --cpus="0.5" node-express
```


- `--cpus="0.5"` limits the container to 1 CPUs. You can adjust the value depending on your performance testing needs.

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

Here is the updated summary report for the Node.js service (`http://localhost:3001`) and Java-Native service (`http://localhost:3002`) with the results from running on 0.5, 1, and 2 CPUs:

### 0.5 CPUs Benchmark
#### Node.js Service
```
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        12 bytes

Concurrency Level:      100
Time taken for tests:   34.004 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      12800000 bytes
HTML transferred:       1200000 bytes
Requests per second:    2940.83 [#/sec] (mean)
Time per request:       34.004 [ms] (mean)
Time per request:       0.340 [ms] (mean, across all concurrent requests)
Transfer rate:          367.60 [Kbytes/sec] received
```

#### Java-Native Service
```
Server Hostname:        localhost
Server Port:            3002

Document Path:          /
Document Length:        12 bytes

Concurrency Level:      100
Time taken for tests:   42.065 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      10700000 bytes
HTML transferred:       1200000 bytes
Requests per second:    2377.26 [#/sec] (mean)
Time per request:       42.065 [ms] (mean)
Time per request:       0.421 [ms] (mean, across all concurrent requests)
Transfer rate:          248.40 [Kbytes/sec] received
```

### 1 CPU Benchmark
#### Node.js Service
```
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        12 bytes

Concurrency Level:      100
Time taken for tests:   17.349 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      12800000 bytes
HTML transferred:       1200000 bytes
Requests per second:    5763.92 [#/sec] (mean)
Time per request:       17.349 [ms] (mean)
Time per request:       0.173 [ms] (mean, across all concurrent requests)
Transfer rate:          720.49 [Kbytes/sec] received
```

#### Java-Native Service
```
Server Hostname:        localhost
Server Port:            3002

Document Path:          /
Document Length:        12 bytes

Concurrency Level:      100
Time taken for tests:   18.120 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      10700000 bytes
HTML transferred:       1200000 bytes
Requests per second:    5518.76 [#/sec] (mean)
Time per request:       18.120 [ms] (mean)
Time per request:       0.181 [ms] (mean, across all concurrent requests)
Transfer rate:          576.67 [Kbytes/sec] received
```

### 2 CPUs Benchmark
#### Node.js Service
```
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        12 bytes

Concurrency Level:      100
Time taken for tests:   16.272 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      12800000 bytes
HTML transferred:       1200000 bytes
Requests per second:    6145.40 [#/sec] (mean)
Time per request:       16.272 [ms] (mean)
Time per request:       0.163 [ms] (mean, across all concurrent requests)
Transfer rate:          768.17 [Kbytes/sec] received
```

#### Java-Native Service
```
Server Hostname:        localhost
Server Port:            3002

Document Path:          /
Document Length:        12 bytes

Concurrency Level:      100
Time taken for tests:   6.309 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      10700000 bytes
HTML transferred:       1200000 bytes
Requests per second:    15850.14 [#/sec] (mean)
Time per request:       6.309 [ms] (mean)
Time per request:       0.063 [ms] (mean, across all concurrent requests)
Transfer rate:          1656.22 [Kbytes/sec] received
```

### Summary Table (Node.js vs. Java-Native Performance on 0.5, 1, and 2 CPUs)
```
+---------------------+------------------------------+------------------------------+------------------------------+
| Metric              | 0.5 CPUs                     | 1 CPU                       | 2 CPUs                       |
+---------------------+------------------------------+------------------------------+------------------------------+
| Requests per second | Node.js: 2940.83             | Node.js: 5763.92            | Node.js: 6145.40             |
|                     | Java-Native: 2377.26         | Java-Native: 5518.76        | Java-Native: 15850.14        |
+---------------------+------------------------------+------------------------------+------------------------------+
| Avg. time per req   | Node.js: 34.004 ms           | Node.js: 17.349 ms          | Node.js: 16.272 ms           |
|                     | Java-Native: 42.065 ms       | Java-Native: 18.120 ms      | Java-Native: 6.309 ms        |
+---------------------+------------------------------+------------------------------+------------------------------+
| Transfer rate       | Node.js: 367.60 KB/s         | Node.js: 720.49 KB/s        | Node.js: 768.17 KB/s         |
|                     | Java-Native: 248.40 KB/s     | Java-Native: 576.67 KB/s    | Java-Native: 1656.22 KB/s    |
+---------------------+------------------------------+------------------------------+------------------------------+
```

This table now includes a comparison of the Node.js and Java-Native services running on 0.5, 1, and 2 CPUs. The results show how both services' performance improves as more CPU resources are allocated, with Java-Native showing a significant gain in requests per second and transfer rates at higher CPU allocations.

## Notes

- Ensure that Docker is installed and running before executing the above commands.
- The `ApacheBench` tool (`ab`) is typically available in the `apache2-utils` package. You can install it on Ubuntu-based systems with:

```bash
sudo apt-get install apache2-utils
```

Feel free to tweak the benchmark settings and experiment with different concurrency levels and request counts for more comprehensive testing.