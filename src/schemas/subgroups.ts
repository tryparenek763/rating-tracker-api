import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const SubgroupSchema = new mongoose.Schema({
    title: String,
    questionsIds: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});
