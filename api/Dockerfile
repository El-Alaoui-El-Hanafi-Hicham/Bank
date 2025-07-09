# Stage 1: Build the application with layers
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Extract layers from the layered JAR
RUN mkdir extracted
RUN java -Djarmode=layertools -jar target/*.jar extract --destination extracted

# Stage 2: Build the runtime image
FROM eclipse-temurin:17-jre
WORKDIR /application
COPY --from=builder /build/extracted/dependencies/ ./
COPY --from=builder /build/extracted/spring-boot-loader/ ./
COPY --from=builder /build/extracted/snapshot-dependencies/ ./
COPY --from=builder /build/extracted/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]