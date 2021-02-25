const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const compression = require('compression')
//const cors = require('cors')
const app = express()

const swaggerUI = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
  },
  apis: ['./routes/index.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))


const morgan = require('morgan')
const routes = require('./routes')
const config = require('./config')
const passport = require('passport')
require('./config/passport')

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(cors()) //TODO: Cors settings
app.use(cookieParser())
app.use(morgan('dev'))
app.use(passport.initialize())

app.use('/api', routes)

 // error handler
 app.use((error, req, res, next) => {
   res.status(error.status || 500).send({
    error: {
    status: error.status || 500,
    message: error.message || 'Internal Server Error',
   },
  });
 })

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))
