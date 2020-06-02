import * as mongoose from 'mongoose';

const transform = function (doc, { _id, ...ret }, options) {

    return { ...ret, id: _id };
}

export const PositionSchema = new mongoose.Schema({
    name: String,

}, { toJSON: { transform }, toObject: { transform } });

