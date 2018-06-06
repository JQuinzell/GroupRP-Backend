import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const url = `mongodb://${user}:${password}@ds263408.mlab.com:63408/group-rp`
mongoose.connect(url)

