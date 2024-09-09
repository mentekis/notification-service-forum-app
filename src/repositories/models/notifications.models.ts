import { model, Schema } from 'mongoose';

const schema = new Schema({
    event: String,
    user: { type: Schema.Types.String, ref: "Users" },
    thread: { type: Schema.Types.String, ref: "Threads" },
});

export const entity = model("Notifications", schema);