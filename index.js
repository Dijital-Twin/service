const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')
const errorHandler = require('./src/middleware/errorhandler.middleware')
const developer = require('./src/routes/developer.route')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(errorHandler)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: 'cross-origin',
        },
    })
)

app.use('/', developer)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app