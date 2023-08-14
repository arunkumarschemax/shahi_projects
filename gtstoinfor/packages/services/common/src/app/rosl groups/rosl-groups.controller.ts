import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ROSLGroupsDTO } from './dto/rosl-groups.dto';
import { ROSLGroupsService } from './rosl-groups.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllROSLGroupsResponseModel, ROSLGroupsResponseModel } from '@project-management-system/shared-models';
import { ROSLGroupsRequest } from './dto/rosl-groups.request';


@ApiTags('rosl-groups')
@Controller('rosl-groups')
export class ROSLGroupsController {
    constructor(private roslGroupsService: ROSLGroupsService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createROSLGroup')
    @ApiBody({type:ROSLGroupsDTO})
    async createROSLGroup(@Body() req:any): Promise<ROSLGroupsResponseModel> {
    try {
        return await this.roslGroupsService.createROSLGroup(req, false);
    } catch (error) {
        return this.applicationExceptionHandler.returnException(ROSLGroupsResponseModel, error);
    }
    }
  
    @Post('/updateROSLGroup')
    @ApiBody({type: ROSLGroupsDTO})
    async updateROSLGroup(@Body() dto: any): Promise<ROSLGroupsResponseModel> {
      try {
        return await this.roslGroupsService.createROSLGroup(dto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(ROSLGroupsResponseModel, error);
      }
    }


  @Post('/getAllROSLGroups')
  async getAllROSLGroups(): Promise<AllROSLGroupsResponseModel> {
    try {
      return await this.roslGroupsService.getAllROSLGroups();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllROSLGroupsResponseModel, error);
    }
  }

  @Post('/getAllActiveROSLGroups')
  async getAllActiveROSLGroups(): Promise<AllROSLGroupsResponseModel> {
    try {
      return await this.roslGroupsService.getAllActiveROSLGroups();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllROSLGroupsResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateROSLGroup')
  @ApiBody({type: ROSLGroupsRequest})
  async activateOrDeactivateROSLGroup(@Body() req: any): Promise<ROSLGroupsResponseModel> {
    try {
      return await this.roslGroupsService.activateOrDeactivateROSLGroup(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(ROSLGroupsResponseModel, error);
    }
  }

  @Post('/getActiveROSLGroupById')
  async getActiveROSLGroupById(@Body() req: ROSLGroupsRequest ): Promise<ROSLGroupsResponseModel> {
      try {
          return await this.roslGroupsService.getActiveROSLGroupById(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(ROSLGroupsResponseModel, err);
      }
  }
}
