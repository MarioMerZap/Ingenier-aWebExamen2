const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 9999
const MONGO_URI= process.env.MONGO_URI || "mongodb://admin:admin@localhost:27017/laWiki?authSource=admin"

const ColaboradorRouter = require('./src/routes/ColaboradorRouter')
const TareaRouter = require('./src/routes/TareaRouter')
const seedingRouter = require('./src/routes/seedingRouter')

app.use('/colaboradores', ColaboradorRouter)
app.use('/tareas', TareaRouter)

app.use('/seedings', seedingRouter)

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`App listening on http://localhost:${PORT}`)
        })
    }
)