import {Schema, model, Document} from 'mongoose'
import {PostModel} from './posts'

export interface RoomModel extends Document {
    name: string
    posts: PostModel[]
}

const RoomSchema = new Schema({
    name: String
})

export default model<RoomModel>('Room', RoomSchema)