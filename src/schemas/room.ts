import { gql } from 'apollo-server'

export default gql`
type Room {
    _id: String
    name: String
    posts: [Post]
}
`