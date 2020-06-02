import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export type Template = any;
export type ApplicationForm = any;
export type Question = any;

@Injectable()
export class ApplicationFormsService {
    constructor(
        @InjectModel('Template') private templateModel: Model<Template>,
        @InjectModel('ApplicationForm') private applicationFormModel: Model<ApplicationForm>,
        @InjectModel('Question') private questionModel: Model<Question>
    ) { }

    async createForm({ questionsIds, ...form }): Promise<ApplicationForm | undefined> {
        await this.applicationFormModel.create({
            ...form,
            questionsIds: Object
                .entries(questionsIds)
                .map(([questionId, value]) => ({ questionId, value }))
        });

        const forms = (
            await this.applicationFormModel
                .find({ userId: form.userId })
                .populate({
                    path: 'questionId',
                })
                .exec()
        );

        debugger

        return null;
    }
    async getTemplate(): Promise<Template | undefined> {
        return this.templateModel.findOne().populate({
            path: 'groupsIds',
            populate: {
                path: 'subgroupsIds',
                populate: {
                    path: 'questionsIds'
                }
            }
        }).exec()
    }
}
