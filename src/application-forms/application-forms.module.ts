import { Module } from '@nestjs/common';
import { ApplicationFormsService } from './application-forms.service';

@Module({
  providers: [ApplicationFormsService],
  exports: [ApplicationFormsService]
})
export class ApplicationFormsModule { }
