import { ApolloServer, gql} from 'apollo-server'
import initializeDatabase from 'database'
import Room from 'models/rooms'
import Post from 'models/posts'
import Group from 'models/Group'
import typeDefs from './schemas'

const db = initializeDatabase()

const resolvers = {
    Query: {
        groups: () => Group.find({}),
        group: (_, args) => Group.findOne({ _id: args.id }),
        room: (_, args) => Room.findOne({ _id: args.id }),
        posts: (_, args) => Post.find({ room: args.room })
    },

    Mutation: {
        post: (_, {input}) => {
            return Post.create(input)
        }
    },

    Room: {
        posts: (room) => Post.find({ room: room._id})
    },

    Group: {
        rooms: (group) => Room.find({ group: group._id })
    }
}

const server = new ApolloServer({ typeDefs, resolvers})

server.listen()
    .then(({url}) => console.log('listening at', url))

db.once('open', () => console.log('db connected'))