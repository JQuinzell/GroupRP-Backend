import { Schema, model, Document } from 'mongoose'
import { RoomModel } from './rooms'

export interface GroupModel extends Document {
    name: string,
    description: string
}

const GroupSchema = new Schema({
    name: String,
    description: String
})

export default model<GroupModel>('Group', GroupSchema)