import {Schema, model, Document} from 'mongoose'
import {PostModel} from './posts'

export interface RoomModel extends Document {
    name: string
}

const RoomSchema = new Schema({
    name: String,
    group: { type: Schema.Types.ObjectId, ref: 'Group'}
})

export default model<RoomModel>('Room', RoomSchema)