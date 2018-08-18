import { gql } from 'apollo-server'

export default gql`
type Group {
    _id: String
    name: String
    description: String
    rooms: [Room]
}
`