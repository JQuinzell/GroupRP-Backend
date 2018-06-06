import {Schema, model} from 'mongoose'

const RoomSchema = new Schema({
    name: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

export default model('Room', RoomSchema)