import { gql } from 'apollo-server'

export default gql`
    type Query {
        groups: [Group]
        group(id: String): Group
        room(id: String): Room
        rooms(ids: [String]): [Room]
        posts(room: String): [Post]
    }
`
