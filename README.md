# A simple e-commerce web-app using the PERN stack (Postgres, Express, React, Node.js)
This project is developed as an assignment for the Codecademy Full Stack Engineering Path.

## Status
This project is deployed at https://treasurespace.netlify.app

### Technologies used
Back-end uses Postgres, Express, React and Node.js. Passport, jsonwebtoken, and bcrypt, are used for authentication/authorization.

Front-end uses React, Redux, React Router, and Tailwinds CSS.

### Installation instructions:
1. Clone repo
2. Create and start up a local postgres database and populate it with tables found in the following file: server/db/e-commerce.sql. You can use the file products.sql to add some products to the db.
3. Create a .env file in the /server directory with the following variables set to the values applying to your setup:

DB_USER (your db username)
DB_PASSWORD (your db password)
DB_HOST=localhost
DB_PORT (postgres port, such as 5432)
DB_DATABASE (your database name)
JWT_KEY (random string, secret key used to verify JWT)
GOOGLE_CLIENT_ID (for Google OAuth)
GOOGLE_CLIENT_SECRET (for Google OAuth)
STRIPE_KEY (for Stripe payments)
PORT (for example 5000)

4. Create a .env file in the /client directory with the following variables (adjusted for your setup - dev environment or deployment). Change the deployed URL values to your local server URLs.

REACT_APP_SERVER_URL=https://e-market-api.herokuapp.com/api
REACT_APP_DEV_URL=http://localhost:5000
REACT_APP_GOOGLE_URL=https://e-market-api.herokuapp.com/api/auth/google

5. Run yarn (or npm install) in the server-directory and client-directory

The /api/auth/signup end-point signs up a user and creates a user entry in the database.
The /api/auth/login end-point takes an email/password combo and issues a JWT in a http-only cookie which is needed to access the other end-points.
The /api/auth/google end-point redirects to Google for OAuth login.

6. If you have concurrently installed then in the client directory, enter "yarn run dev". As another option, start the server and client separately.

#### TODO:
Password reset, tests, email notifications, ability to edit user information.
