import { Schema, model } from 'mongoose'

const PostSchema = new Schema({
    body: String,
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
})

export default model('Post', PostSchema)