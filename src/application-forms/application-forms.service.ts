import * as mongoose from 'mongoose';

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/users/users.service';

export type Template = any;
export type ApplicationForm = any;
export type Question = any;
export type QuestionApplicationForm = any;

@Injectable()
export class ApplicationFormsService {
    constructor(
        @InjectModel('Templates') private templateModel: Model<Template>,
        @InjectModel('ApplicationForms') private applicationFormModel: Model<ApplicationForm>,
        @InjectModel('Questions') private questionModel: Model<Question>,
        @InjectModel('QuestionsApplicationForms') private questionApplicationFormModel: Model<QuestionApplicationForm>,
        @InjectModel('Users') private userModel: Model<User>
    ) { }

    async createForm({ userId, questionsIds }): Promise<ApplicationForm | undefined> {
        const { _id: applicationFormId } = await this.applicationFormModel.create({
            userId
        });

        await this.questionApplicationFormModel.insertMany(Object.entries(questionsIds)
            .map(([questionId, answer]) => ({ applicationFormId, questionId, answer })));

        await this.questionApplicationFormModel
            .find()
            .populate({
                path: 'applicationFormId',
                match: {
                    userId
                }
            })
            .populate({
                path: 'questionId'
            })
            .exec()

        const [{ rating }] = await this.questionApplicationFormModel
            .aggregate()
            .lookup({
                from: 'questions',
                localField: 'questionId',
                foreignField: '_id',
                as: 'question'
            })
            .lookup({
                from: 'applicationforms',
                localField: 'applicationFormId',
                foreignField: '_id',
                as: 'applicationForm'
            })
            .unwind("question")
            .unwind("applicationForm")
            .addFields({
                title: '$question.title',
                ratio: '$question.ratio',
                userId: '$applicationForm.userId'
            })
            .project({
                questionId: 0,
                question: 0,
                applicationForm: 0
            })
            .match({ userId: mongoose.Types.ObjectId(userId) })
            .group({
                _id: "$applicationFormId",
                sum: {
                    $sum: { $multiply: ['$answer', '$ratio'] }
                },
            })
            .group({
                _id: null,
                sum: {
                    $sum: '$sum'
                },
                count: {
                    $sum: 1
                },
            })
            .addFields({
                rating: { $divide: ["$sum", "$count"] }
            })
            .exec();

        await this.userModel.findOneAndUpdate({ _id: userId }, { rating })

        return null;
    }
    async getTemplate(): Promise<Template | undefined> {
        return this.templateModel
            .findOne()
            .populate({
                path: 'groupsIds',
                populate: {
                    path: 'subgroupsIds',
                    populate: {
                        path: 'questionsIds'
                    }
                }
            })
            .exec()
    }
}
