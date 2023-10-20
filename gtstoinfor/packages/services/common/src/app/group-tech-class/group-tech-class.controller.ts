import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GroupTechClassService } from './group-tech-class.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { AllGroupTechClassResponse, CommonResponseModel } from '@project-management-system/shared-models';

@ApiTags('group-tech-class')
@Controller('group-tech-class')
export class GroupTechClassController {
    constructor(
        private groupTechClassService: GroupTechClassService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

        
      @Post('/getAllActiveGroupTechClass')
      async getAllActiveGroupTechClass(): Promise<CommonResponseModel> {
          try {
              return await this.groupTechClassService.getAllActiveGroupTechClass();
          } catch (error) {
             return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
          }
      }

     
    
}
