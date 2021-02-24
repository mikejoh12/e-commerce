# A simple e-commerce web-application using the PERN stack (Postgres, Express, React, Node.js)
This project is being developed as an assignment for the Codecademy Full Stack Engineering Path.

## Status
This project is under development and not complete

### Technologies used
Back-end uses Postgres, Express, React and Node.js. Passport, jsonwebtoken, and bcrypt, are used for authentication/authorization.

### Installation instructions:
1. Clone repo
2. Create a postgres database and populate it with tables found in the following file: server/db/e-commerce.sql
3. Create a .env file in the /server directory with the following variables set to the values applying to your setup:
DB_USER (your db username), DB_PASSWORD (your db password), DB_HOST=localhost, DB_PORT (postgres port, such as 5432), DB_DATABASE (your database name),
JWT_KEY (random string, secret key used to verify JWT), PORT (port used, such as 3000)
4. Run npm install in the /server directory

The /api/auth/signup end-point signs up a user and creates a user entry in the database.
The /api/auth/login end-point takes an email/password combo and issues a JWT in a http-only cookie which is valid for 1hr and needed to access the other end-points.
