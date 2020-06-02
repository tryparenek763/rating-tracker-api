import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


export const QuestionFormSchema = new mongoose.Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    value: Number
});

export const ApplicationFormSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionsIds: [QuestionFormSchema]
});
