import * as mongoose from 'mongoose';

const transform = function (doc, { _id, ...ret }, options) {

    return { ...ret, id: _id };
}

export const QuestionSchema = new mongoose.Schema({
    title: String,
    description: String
}, { toJSON: { transform } });
