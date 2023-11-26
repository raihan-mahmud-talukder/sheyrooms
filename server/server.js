const express = require('express')

const app = express()

const cors = require('cors')

app.use(express.urlencoded({ extended: true }))

const dbConfig = require('./db')

const roomsRoute = require('./routes/roomsRoute')

app.use(express.json())

app.use(cors())

app.use('/api/rooms', roomsRoute)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))