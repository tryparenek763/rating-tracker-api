import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transform = function (doc, { positionId, _id, ...ret }, options) {

    return { ...ret, position: positionId, id: _id };
}

export const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    positionId: {
        type: Schema.Types.ObjectId,
        ref: 'Position'
    },
    rating: Number,
    username: String

}, { toJSON: { transform }, toObject: { transform } });
