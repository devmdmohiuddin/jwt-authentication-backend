const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv');

const connectDB = require('./config/db')

const userRoutes = require('./routers/userRoute')


const app = express();
dotenv.config()
connectDB()

app.use(express.json())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Api is running...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})