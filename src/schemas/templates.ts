import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

export const TemplateSchema = new mongoose.Schema({
    groupsIds: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
});
