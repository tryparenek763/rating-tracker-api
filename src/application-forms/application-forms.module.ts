import { Module } from '@nestjs/common';
import { ApplicationFormsService } from './application-forms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from 'src/schemas/templates';
import { GroupSchema } from 'src/schemas/groups';
import { SubgroupSchema } from 'src/schemas/subgroups';
import { PositionSchema } from 'src/schemas/positions';
import { QuestionSchema } from 'src/schemas/questions';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Template', schema: TemplateSchema }]),
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: 'Subgroup', schema: SubgroupSchema }]),
    MongooseModule.forFeature([{ name: 'Position', schema: PositionSchema }]),
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }])
  ],
  providers: [ApplicationFormsService],
  exports: [ApplicationFormsService]
})
export class ApplicationFormsModule { }
