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
3. Create a .env file in the /server directory with the following variables set to the values applying to your setup. If you don't plan on deploying then you can disable the variables related to deployed URLs.

DB_USER (your db username)
DB_PASSWORD (your db password)
DB_HOST=localhost
DB_PORT (postgres port, such as 5432)
DB_DATABASE (your database name)

JWT_KEY (random string, secret key used to verify JWT)

GOOGLE_CLIENT_ID (for Google OAuth - obtain from Google)
GOOGLE_CLIENT_SECRET (for Google OAuth - obtain from Google)
GOOGLE_CALLBACK_URL (deployed Google OAuth redirect URL for server)
GOOGLE_FRONT_END_REDIRECT_URL (deployed Google OAuth redirect URL for front-end)

CORS_ORIGIN (deployed URL for front-end using https)

STRIPE_KEY (for Stripe payments - obtain from Stripe)
PORT (I set this to 5000)

4. Create a .env file in the /client directory with the following variables (adjusted for your setup - dev environment or deployment). You can either remove the deployed URLs from the code or adjust them with your own deployed URL.

REACT_APP_SERVER_URL=http://localhost:5000/api
REACT_APP_DEV_URL=http://localhost:5000
REACT_APP_GOOGLE_URL=http://locahost:5000/api/auth/google

5. Run yarn (or npm install) in the server-directory and client-directory

The /api/auth/signup end-point signs up a user and creates a user entry in the database.
The /api/auth/login end-point takes an email/password combo and issues a JWT in a http-only cookie which is needed to access the other end-points.
The /api/auth/google end-point redirects to Google for OAuth login. You will need to create Stripe and Google Developer accounts in order to obtaint the credentials needed.

6. If you have concurrently installed then in the client directory, enter "yarn run dev". This will start both server and client with one command. As another option, start the server and client separately.

#### TODO:
Password reset, tests, email notifications, ability to edit user information.
