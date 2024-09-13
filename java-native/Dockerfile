# Step 1: Build the application using GraalVM
FROM vegardit/graalvm-maven:latest-java17 AS build

WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Install dependencies and build the native image
RUN mvn clean package

# Step 2: Build the final lightweight image
FROM debian:bookworm-slim

WORKDIR /app

# Copy the native executable from the previous step
COPY --from=build /app/target/native-hello-world /app/native-hello-world

# Expose port 3000
EXPOSE 3000

# Run the native executable
CMD ["./native-hello-world"]
