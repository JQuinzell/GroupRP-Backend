import {Schema, model} from 'mongoose'

const RoomSchema = new Schema({
    name: String
})

export default model('Room', RoomSchema)