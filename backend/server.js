const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
const PORT = 5000;

dotenv.config()

const postRoutes = require('./routes/postRoutes')

app.use(cors())
app.use(express.json())
app.use('/api/posts', postRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log(`DB Connected Successfully ${process.env.MONGODB_URI}`);
        app.listen(PORT, ()=>{
            console.log(`Server running on ${PORT}`)
        })
    })
    .catch(err => console.log(err))