import { ItemGroupResponseModel,ItemgroupDropDownResponse } from "@project-management-system/shared-models";
import { AllItemGroupResponseModel } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ItemGroupService } from "./item-group.service";
import { ItemGroupRequest } from "./dto/item-group.request";
import { ItemGroupDto } from "./dto/item-group.dto";@ApiTags('size')
@Controller('itemGroup')
export class ItemGroupController{
    constructor(private iteGroupService: ItemGroupService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/getAllItemGroup')
        async getAllItemGroup(): Promise<AllItemGroupResponseModel> {
          try {
            return await this.iteGroupService.getAllItemGroup();
          } catch (error) {
            // return errorHandler(AllSizeResponseModel, error);
            return this.applicationExceptionHandler.returnException(AllItemGroupResponseModel, error);
          }
        }
    }