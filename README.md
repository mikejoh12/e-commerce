# A simple e-commerce web-application using the PERN stack (Postgres, Express, React, Node.js)

## Status
This project is under development and not complete

### Installation instructions:
1. Clone repo
2. Create a postgres database and populate it with tables in server/db/e-commerce.sql
3. Create a .env file in the /server directory with the following variables set to the values applying to your setup:
DB_USER (your db username), DB_PASSWORD (your db password), DB_HOST=localhost, DB_PORT (postgres port, such as 5432), DB_DATABASE (your database name),
JWT_KEY (random string, secret key used to verify JWT), PORT (port used, such as 3000)
4. Run npm install in the /server directory
