import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userId: Number,
    username: String,
    password: String,
    name: String,
    surname: String,
    position: String,
    type: String,
    level: String,
    rating: Number
});
