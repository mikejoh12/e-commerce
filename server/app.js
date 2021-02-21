const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const routes = require('./routes')
const config = require('./config')
const passport = require('passport')
require('./config/passport')

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(passport.initialize())

app.get('/', (req, res) => res.send('App is working'))

app.use('/api', routes)

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}`))
