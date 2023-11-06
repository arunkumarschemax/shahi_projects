import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GroupTechClassService } from './group-tech-class.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { AllGroupTechClassResponse, BuyerIdReq, CommonResponseModel,  GroupTechClassResponse } from '@project-management-system/shared-models';
import { GroupTechClassRequest } from './dto/group-tech-class.request';
import { GroupTechClassDto } from './dto/group-tech-class.dto';

@ApiTags('group-tech-class')
@Controller('group-tech-class')
export class GroupTechClassController {
    constructor(
        private groupTechClassService: GroupTechClassService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/createGroupTechClass')
      @ApiBody({type:GroupTechClassDto})
      async createGroupTechClass(@Body() Dto:any, isUpdate:boolean=false): Promise<GroupTechClassResponse> {
      try {
          return await this.groupTechClassService.createGroupTechClass(Dto, false);
        } catch (error) {
          return this.applicationExceptionHandler.returnException(GroupTechClassResponse, error);
        }
      }
  
      @Post('/updateGroupTechClass')
      @ApiBody({type:GroupTechClassDto})
      async updateGroupTechClass(@Body() Dto:any): Promise<GroupTechClassResponse> {
        console.log(Dto,"controll")
      try {
          return await this.groupTechClassService.createGroupTechClass(Dto, true);
        } catch (error) {
          return this.applicationExceptionHandler.returnException(GroupTechClassResponse, error);
        }
      }

      @Post('/getAllGroupTechClass')
      @ApiBody({type:BuyerIdReq})
      async getAllGroupTechClass(@Body() req?:any): Promise<AllGroupTechClassResponse> {
          try {
              return await this.groupTechClassService.getAllGroupTechClass(req);
          } catch (error) {
             return this.applicationExceptionHandler.returnException(AllGroupTechClassResponse, error);
          }
      }

        
      @Post('/getAllActiveGroupTechClass')
      async getAllActiveGroupTechClass(): Promise<AllGroupTechClassResponse> {
          try {
              return await this.groupTechClassService.getAllActiveGroupTechClass();
          } catch (error) {
             return this.applicationExceptionHandler.returnException(AllGroupTechClassResponse, error);
          }
      }

      @Post('/getActivegetGroupTechClassById')
      @ApiBody({type:GroupTechClassRequest})
      async getActivegetGroupTechClassById(@Body() Req: any ): Promise<AllGroupTechClassResponse> {
          try {
              return await this.groupTechClassService.getActivegetGroupTechClassById(Req);
          } catch (err) {
            return this.applicationExceptionHandler.returnException(AllGroupTechClassResponse, err)
          }
      }


      @Post('/activateOrDeactivateGroupTechClass')
      @ApiBody({type:GroupTechClassRequest})
      async activateOrDeactivateGroupTechClass(@Body() Req: any): Promise<AllGroupTechClassResponse> {
          try {
              return await this.groupTechClassService.activateOrDeactivateGroupTechClass(Req);
          } catch (err) {
              return this.applicationExceptionHandler.returnException(AllGroupTechClassResponse, err);
          }
      }
    
     
    
}
