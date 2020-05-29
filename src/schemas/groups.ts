import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const GroupSchema = new mongoose.Schema({
    title: String,
    subgroupsIds: [{ type: Schema.Types.ObjectId, ref: 'Subgroup' }]
});
GroupSchema.method('transform', function () {
    const obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});
