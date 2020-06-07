import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const QuestionApplicationFormSchema = new mongoose.Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    applicationFormId: {
        type: Schema.Types.ObjectId,
        ref: 'ApplicationForms'
    },
    answer: Number
});
