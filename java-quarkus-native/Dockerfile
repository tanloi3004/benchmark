# Step 1: Build the application using GraalVM
FROM vegardit/graalvm-maven:latest-java17 AS build

WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Install dependencies and build the native image
RUN mvn clean package -Dnative

FROM debian:bookworm-slim
WORKDIR /work/
RUN chown 1001 /work \
    && chmod "g+rwX" /work \
    && chown 1001:root /work
COPY --from=build --chown=1001:root /app/target/*-runner /work/application

EXPOSE 3000
USER 1001

ENTRYPOINT ["./application", "-Dquarkus.http.host=0.0.0.0"]
