import { model, Schema } from 'mongoose';

const schema = new Schema({
    _id: String,
    title: String,
}, { _id: false })

export const entity = model("Threads", schema);