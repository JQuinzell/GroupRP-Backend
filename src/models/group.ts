import { Schema, model, Document } from 'mongoose'
import { RoomModel } from './rooms'

export interface GroupModel extends Document {
    name: string
}

const GroupSchema = new Schema({
    name: String,
})

export default model<GroupModel>('Group', GroupSchema)