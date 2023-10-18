import { Body, Controller, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import {  AllFabricContentResponseModel, CommonResponseModel, FabricContentResponseModel, FobResponseModel } from '@project-management-system/shared-models';
import { ApiBody } from '@nestjs/swagger';
import { FabricContentService } from './fabric-content.service';
import { FabricContentDto } from './fabri-content-dto/fabric-dto';


@Controller('/fabricContent')
export class FabricContentController {
    constructor(
        private fobService: FabricContentService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
        ) { }

    @Post('/createFabricContentplist')
    @ApiBody({type:FabricContentDto})
    async createFabricContentplist(@Body() Dto:any): Promise<FabricContentResponseModel>{
        try{
            return await this.fobService.createFabricContentplist(Dto,false)
        }catch(error){
            return this.applicationExceptionhandler.returnException(FabricContentResponseModel, error)
        }
    }

   @Post('/updateFabricContent')
   @ApiBody({type:FabricContentDto})
  async updateFabricContent(@Body()request:any): Promise<FabricContentResponseModel> {
    try {
       
      return await this.fobService.createFabricContentplist(request, true);
    } catch (error) {
      return this.applicationExceptionhandler.returnException(FabricContentResponseModel, error);
    }
  }

    @Post('/getFabricContent')
    async getFabricContent(): Promise<FabricContentResponseModel>{
        try{
            return await this.fobService.getFabricContent()
        }catch(error){
            return this.applicationExceptionhandler.returnException(FabricContentResponseModel, error)
        }
    }

    @Post('/getActiveFabricContent')
    async getActiveFabricContent() : Promise<FabricContentResponseModel>{
        try{
            return await this.fobService.getActiveFabricContent()
        }catch(error){
            return this.applicationExceptionhandler.returnException(FabricContentResponseModel, error);
        }
    }

    @Post("/activateOrDeactivate")
  async activateOrDeactivate(@Body() activateDeactivateReq:any) : Promise<AllFabricContentResponseModel>{
    return await this.fobService.ActivateOrDeactivate(activateDeactivateReq)
    }

    @Post('/uploadFabricContent')
    async uploadFabricContent(@Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.fobService.uploadFabricContent(data);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

   
    
}
