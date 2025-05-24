FROM openjdk:21

EXPOSE 8080

COPY build/libs/EmojiFinder-*.jar /EmojiFinder.jar

CMD ["java", "-jar", "/EmojiFinder.jar"]