import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const transform = function (doc, { questionsIds, _id, ...ret }, options) {

    return { ...ret, questions: questionsIds, id: _id };
}

export const SubgroupSchema = new mongoose.Schema({
    questionsIds: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }]
    }
}, { toJSON: { transform } });
