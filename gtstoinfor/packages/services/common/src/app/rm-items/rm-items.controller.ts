import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { RmCreationservice } from './rm-item.service';
import { CommonResponseModel, RMCreFilterRequest } from '@project-management-system/shared-models';
import { RmCreationDto } from './dto/rm-item.dto';
import { productGroupDto } from './dto/product-group-filter';

@Controller('rm-creat')
@ApiTags('rm-creat')
export class RmCreationController{
    constructor(
        private rmCreationService: RmCreationservice,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){} 

    @Post('/createRm')
    async createRm(@Body() rmDto:any,isUpdate:boolean=false,@Req() request:Request): Promise<CommonResponseModel> {
        try {
            // console.log(rmDto,"000000000000");
            return await this.rmCreationService.CreateRm(rmDto, false);
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/getAllRMItems')
    @ApiBody({type:RMCreFilterRequest})
    async getAllRMItems(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.getAllRMItems(req);
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getRmItemsData')
    async getRmItemsData(): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.getRmItemsData();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getRmItemsDatabyProductGroupId')
    @ApiBody({type:productGroupDto})
    async getRmItemsDatabyProductGroupId(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.getRmItemsDatabyProductGroupId(req);
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getRmItemsDatabyProductGroupId1')
    @ApiBody({type:productGroupDto})
    async getRmItemsDatabyProductGroupId1(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.getRmItemsDatabyProductGroupId1(req);
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/CurrencyDropdown')
    async CurrencyDropdown(): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.CurrencyDropdown();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/itemGroupDropdown')
    async itemGroupDropdown(): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.itemGroupDropdown();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/ProductGroupDropdown')
    async ProductGroupDropdown(): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.ProductGroupDropdown();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/itemTypeDropdown')
    async itemTypeDropdown(): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.itemTypeDropdown();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/ProcurementGroupDropdown')
    async ProcurementGroupDropdown(): Promise<CommonResponseModel> {
        try {
            return await this.rmCreationService.ProcurementGroupDropdown();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
}