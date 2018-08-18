import {gql} from 'apollo-server'

export default gql`
type Mutation {
    post(input: PostInput): Post
}
`