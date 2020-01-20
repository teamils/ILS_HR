# ILS_HR (SpringBoot+Angular)

StartProject
===============================
Maven
mvnw spring-boot:run

Angular
npm i

ng s


BuildingProject
===============================
Maven

!mvnw clean install package

Angular

ng build --prod --base-href=/yourNameProject/

ng build --prod --base-href=/Frontend/


DATABASE
===============================
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName= <<--your DB Name

spring.datasource.username= <<-- Your Username

spring.datasource.password= <<-- Your Password


JPA / HIBERNATE
===============================
spring.jpa.show-sql=true

spring.jpa.hibernate.ddl-auto=update

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServer2012Dialect


Dependency
===============================
spring-boot-starter-actuator

spring-boot-starter-data-jpa

spring-boot-starter-data-rest

spring-boot-starter-web

jackson-datatype-jsr310

line-bot-spring-boot

joda-time

h2

mssql-jdbc

lombok

spring-boot-starter-test

annotations

===============================
