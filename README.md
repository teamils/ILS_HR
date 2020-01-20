# ILS_HR (SpringBoot+Angular)

StartProject
===============================
Maven

> mvnw spring-boot:run

Angular

> npm install

> ng serve


BuildingProject
===============================
Maven

> mvnw clean install package

Angular

> ng build --prod --base-href=/yourNameProject/

> ng build --prod --base-href=/Frontend/

> ng build --prod --base-href=/


DATABASE
===============================
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName= <<--your DB Name

spring.datasource.username= <<-- Your Username

spring.datasource.password= <<-- Your Password

### Microsoft sql server

> spring.datasource.driverClassName=com.microsoft.sqlserver.jdbc.SQLServerDriver

> spring.datasource.url=jdbc:sqlserver://192.168.1.47:1433;databaseName=ILS_HR

> spring.datasource.username=sa

> spring.datasource.password=1234

> spring.jpa.properties.hibernate.format_sql = true

> pring.jpa.properties.hibernate.dialect = org.hibernate.dialect.SQLServer2012Dialect

> spring.jpa.hibernate.ddl-auto = update

> #server.port=8000

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
