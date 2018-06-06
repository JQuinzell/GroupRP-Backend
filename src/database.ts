import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'

export default function initializeDatabase() {
    dotenv.config()
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const url = `mongodb://${user}:${password}@ds263408.mlab.com:63408/group-rp`
    mongoose.connect(url)
    return mongoose.connection
}
