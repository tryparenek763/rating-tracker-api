import { Module } from '@nestjs/common';
import { ApplicationFormsService } from './application-forms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from 'src/schemas/templates';
import { GroupSchema } from 'src/schemas/groups';
import { SubgroupSchema } from 'src/schemas/subgroups';
import { PositionSchema } from 'src/schemas/positions';
import { QuestionSchema } from 'src/schemas/questions';
import { ApplicationFormSchema } from 'src/schemas/application-forms';
import { QuestionApplicationFormSchema } from 'src/schemas/questions_application-forms';
import { UserSchema } from 'src/schemas/users';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Templates', schema: TemplateSchema }]),
    MongooseModule.forFeature([{ name: 'Groups', schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: 'Subgroups', schema: SubgroupSchema }]),
    MongooseModule.forFeature([{ name: 'Positions', schema: PositionSchema }]),
    MongooseModule.forFeature([{ name: 'Questions', schema: QuestionSchema }]),
    MongooseModule.forFeature([{ name: 'ApplicationForms', schema: ApplicationFormSchema }]),
    MongooseModule.forFeature([{ name: 'QuestionsApplicationForms', schema: QuestionApplicationFormSchema }])
  ],
  providers: [ApplicationFormsService],
  exports: [ApplicationFormsService]
})
export class ApplicationFormsModule { }
