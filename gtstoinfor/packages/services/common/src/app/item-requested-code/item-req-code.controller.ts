import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { FabricRequestCodeDto } from './dtos/fabric-request-code.dto';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { FabricReqCodeService } from './fabric-request-code.service';
import { TrimReqCodeService } from './trim-req-code.service';
import { TrimRequestCodeDto } from './dtos/trim-request-code.dto';

@ApiTags('item-req-code')
@Controller('item-req-code')
export class ItemReqCodeController {
    constructor(
        private fabReqService: FabricReqCodeService,
        private trimReqService : TrimReqCodeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      /**
     * creates  a Item Category
     * @param ItemCategory Item Category DTO
     * @returns Item CategoryResponse
     */
    @Post('/createFabricRequestedCode')
    @ApiBody({type: FabricRequestCodeDto})
    async createFabricRequestedCode(@Body() req?:any): Promise<CommonResponseModel> {
        try {
         return await this.fabReqService.createFabricRequestedCode(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
       }
     }

    @Post('/getAllFabrics')
    async getAllFabrics(): Promise<CommonResponseModel> {
        try {
         return await this.fabReqService.getAllFabrics();
       } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
       }
     }
    
    @Post('/createTrimRequestedCode')
    @ApiBody({type: TrimRequestCodeDto})
    async createTrimRequestedCode(@Body() req?:any): Promise<CommonResponseModel> {
        try {
         return await this.trimReqService.createTrimRequestedCode(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
       }
     }

    @Post('/getAllTrims')
    async getAllTrims(): Promise<CommonResponseModel> {
        try {
         return await this.trimReqService.getAllTrims();
       } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
       }
     }

}
