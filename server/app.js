const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const compression = require('compression')
const YAML = require('yamljs')
const app = express()

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = YAML.load('./openapi.yaml')

const morgan = require('morgan')
const routes = require('./routes')
const config = require('./config')
const passport = require('passport')
require('./config/passport')

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//TODO: Cors settings

app.use(cookieParser())
app.use(morgan('dev'))
app.use(passport.initialize())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api', routes)

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
  error: {
  status: error.status || 500,
  message: error.message || 'Internal Server Error',
  },
});
})

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))
