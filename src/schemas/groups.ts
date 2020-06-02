import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


const transform = function (doc, { subgroupsIds, _id, ...ret }, options) {

    return { ...ret, subgroups: subgroupsIds, id: _id };
}

export const GroupSchema = new mongoose.Schema({
    subgroupsIds: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Subgroup'
        }]
    }
}, { toJSON: { transform } });
