import initializeDatabase from 'database'

const db = initializeDatabase()

db.once('open', () => console.log('db connected'))