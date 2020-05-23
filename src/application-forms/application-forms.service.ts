import { Injectable } from '@nestjs/common';
import * as template from './template.json'
export type Template = any;

@Injectable()
export class ApplicationFormsService {
    private readonly template: Template;
    constructor() {
        this.template = template
    }
    async createForm(): Promise<null | undefined> {
        return null;
    }
    async getTemplate(): Promise<Template | undefined> {
        return this.template;
    }
}
