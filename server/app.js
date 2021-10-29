const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const env = require('dotenv')
const PORT = process.env.PORT || 3001
const app = express()
env.config()

app.use(express.json())
app.use(cors())

// Code Here

//Testing code
app.get('/', (req, res) => {
    res.send('Hello world! Every thing is working fine')
})

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})