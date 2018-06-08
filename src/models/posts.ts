import { Schema, model, Document } from 'mongoose'
import {RoomModel} from './rooms'

export interface PostModel extends Document {
    body: string
    room: RoomModel
}

const PostSchema = new Schema({
    body: String,
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
})

export default model<PostModel>('Post', PostSchema)