import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ItemCreationService } from './item_creation.service';
import { CommonResponseModel, FgItemCreIdRequest, ItemCreFilterRequest } from '@project-management-system/shared-models';
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
            console.log(itemCreationDto,"uuuuuuuuuuuuu");
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

    @Post('/getAllFgItems')
    @ApiBody({type:ItemCreFilterRequest})
    async getAllFgItems(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.itemCreationService.getAllFgItems(req);
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/cancelOrder')
    @ApiBody({type:FgItemCreIdRequest})
    async cancelOrder(@Body() req:any):Promise<CommonResponseModel>{
        
        try{
            return await this.itemCreationService.cancelOrder(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }
    
    @Post('/getAll')
    // @ApiBody({type:ItemCreFilterRequest})
    async getAll(): Promise<CommonResponseModel> {
        try {
            return await this.itemCreationService.getAll();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
}
