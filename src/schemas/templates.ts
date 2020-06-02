import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transform = function (doc, { groupsIds, _id, ...ret }, options) {

    return { ...ret, groups: groupsIds, id: _id };
}

export const TemplateSchema = new mongoose.Schema({
    groupsIds: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }]
    }
}, { toJSON: { transform } });
