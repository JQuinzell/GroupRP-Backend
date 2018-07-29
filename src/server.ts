import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import initializeDatabase from 'database'
import Room from 'models/rooms'
import Post from 'models/posts'
import Group from 'models/Group'

const db = initializeDatabase()

const typeDefs = `
type Query {
    groups: [Group]
    group(id: String): Group
    posts(room: String): [Post]
}

type Group {
    _id: String
    name: String
    description: String
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
        groups: () => Group.find({}),
        group: (_, args) => Group.findOne({ _id: args.id }),
        posts: (_, args) => Post.find({ room: args.room })
    },

    Room: {
        posts: (room) => Post.find({ room: room._id})
    },

    Group: {
        rooms: (group) => Room.find({ group: group._id })
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express()

app.use(cors())

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(3000, () => console.log('listening'))

db.once('open', () => console.log('db connected'))