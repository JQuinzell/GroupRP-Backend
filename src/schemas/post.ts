import { gql } from 'apollo-server'

export default gql`
type Post {
    _id: String 
    body: String
    room: Room
}

input PostInput {
    body: String
    room: String
}
`