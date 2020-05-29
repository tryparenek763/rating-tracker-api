import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export type Template = any;

@Injectable()
export class ApplicationFormsService {
    constructor(@InjectModel('Template') private templateModel: Model<Template>) { }

    async createForm(): Promise<null | undefined> {
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
            .then(template => ({ ...template, groups: template.groupsIds }));
    }
}
