import * as express from 'express'
import * as bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import initializeDatabase from 'database'
import Room from 'models/rooms'
import Post from 'models/posts'

const db = initializeDatabase()

const typeDefs = `
type Query {
    rooms: [Room]
}

type Room {
    _id: String
    name: String
    posts: [Post]
}

type Post {
    _id: String
    body: String
    room: Room
}
`

const resolvers = {
    Query: {
        rooms: () => Room.find({})
    },

    Room: {
        posts: (room: any) => Post.find({ room: room._id})
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000, () => console.log('listening'))

db.once('open', () => console.log('db connected'))