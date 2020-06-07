import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;




export const ApplicationFormSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});
