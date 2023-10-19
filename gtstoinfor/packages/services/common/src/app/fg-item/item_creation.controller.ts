import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ItemCreationService } from './item_creation.service';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { ItemCreationDto } from './dto/item-creation.dto';

@Controller('fg-item')
@ApiTags('fg-item')
export class ItemCreationController {
    constructor(
        private itemCreationService: ItemCreationService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}

    @Post('/createItem')
    async createItem(@Body() itemCreationDto:any,isUpdate:boolean=false,@Req() request:Request): Promise<CommonResponseModel> {
        try {
            console.log(itemCreationDto);
            return await this.itemCreationService.createItem(itemCreationDto, false);
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getFgItemsDropdown')
    async getFgItemsDropdown(): Promise<CommonResponseModel> {
        try {
            return await this.itemCreationService.getFgItemsDropdown();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
}
