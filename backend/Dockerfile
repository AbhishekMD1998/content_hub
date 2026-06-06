# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY mvnw .mvn* pom.xml ./
RUN chmod +x mvnw
COPY src ./src
RUN ./mvnw clean package -DskipTests -q

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/content-hub-api-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
