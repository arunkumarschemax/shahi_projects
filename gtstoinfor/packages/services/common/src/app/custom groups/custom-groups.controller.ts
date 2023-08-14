import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { CustomGroupsDTO } from './dto/custom-groups.dto';
import { CustomGroupsService } from './custom-groups.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllCustomGroupsResponseModel, CustomGroupsResponseModel } from '@project-management-system/shared-models';
import { CustomGroupsRequest } from './dto/custom-groups.request';


@ApiTags('custom-groups')
@Controller('custom-groups')
export class CustomGroupsController {
    constructor(private customGroupsService: CustomGroupsService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createCustomGroup')
    @ApiBody({type:CustomGroupsDTO})
    async createCustomGroup(@Body() req:any): Promise<CustomGroupsResponseModel> {
    try {
        return await this.customGroupsService.createCustomGroup(req, false);
    } catch (error) {
        return this.applicationExceptionHandler.returnException(CustomGroupsResponseModel, error);
    }
    }
  
    @Post('/updateCustomGroup')
    @ApiBody({type: CustomGroupsDTO})
    async updateCustomGroup(@Body() customGroupDTO: any): Promise<CustomGroupsResponseModel> {
      try {
        return await this.customGroupsService.createCustomGroup(customGroupDTO, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CustomGroupsResponseModel, error);
      }
    }


  @Post('/getAllCustomGroups')
  async getAllCustomGroups(): Promise<AllCustomGroupsResponseModel> {
    try {
      return await this.customGroupsService.getAllCustomGroups();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllCustomGroupsResponseModel, error);
    }
  }

  @Post('/getAllActiveCustomGroups')
  async getAllActiveCustomGroups(): Promise<AllCustomGroupsResponseModel> {
    try {
      return await this.customGroupsService.getAllActiveCustomGroups();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllCustomGroupsResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateCustomGroup')
  @ApiBody({type: CustomGroupsRequest})
  async activateOrDeactivateCustomGroup(@Body() req: any): Promise<CustomGroupsResponseModel> {
    try {
      return await this.customGroupsService.activateOrDeactivateCustomGroup(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CustomGroupsResponseModel, error);
    }
  }

  @Post('/getActiveCustomGroupById')
  async getActiveCustomGroupById(@Body() req: CustomGroupsRequest ): Promise<CustomGroupsResponseModel> {
      try {
          return await this.customGroupsService.getActiveCustomGroupById(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(CustomGroupsResponseModel, err);
      }
  }
}
