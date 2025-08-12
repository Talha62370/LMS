import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controller/webhooks.js'

const app = express()

// Connect to database
connectDB().catch(err => console.error('DB connection error:', err));

// Middleware
app.use(cors())
app.use(express.json()) // Add this for all routes

// Routes
app.get('/', (req, res) => res.send("API working"))
app.post('/clerk', clerkWebhooks) // express.json() is now applied globally

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))