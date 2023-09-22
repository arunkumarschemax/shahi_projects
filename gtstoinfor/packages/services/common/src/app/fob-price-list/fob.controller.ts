import { Body, Controller, Post, Req } from '@nestjs/common';
import {FactoryResponseModel} from '../../../../../libs/shared-models/src/common/factory/factory-response-objects'
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { AllFactoriesResponseModel, AllFobResponseModel, FobResponseModel } from '@project-management-system/shared-models';
import { ApiBody } from '@nestjs/swagger';
import { FobService } from './fob.service';
import { FobDto } from './dto/fob.dto';

@Controller('/fobPriceList')
export class FobController {
    constructor(
        private fobService: FobService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
        ) { }

    @Post('/createFobplist')
    @ApiBody({type:FobDto})
    async createFobplist(@Body() Dto:any): Promise<FobResponseModel>{
        try{
            return await this.fobService.createFobplist(Dto,false)
        }catch(error){
            return this.applicationExceptionhandler.returnException(FobResponseModel, error)
        }
    }

   @Post('/updateFobplist')
   @ApiBody({type:FobDto})
  async updateFobplist(@Body()request:any): Promise<FobResponseModel> {
    try {
       
      return await this.fobService.createFobplist(request, true);
    } catch (error) {
      return this.applicationExceptionhandler.returnException(FobResponseModel, error);
    }
  }

    @Post('/getFobPrice')
    async getFobPrice(): Promise<FobResponseModel>{
        try{
            return await this.fobService.getFobPrice()
        }catch(error){
            return this.applicationExceptionhandler.returnException(FobResponseModel, error)
        }
    }

    @Post('/getActiveFob')
    async getActiveFob() : Promise<FobResponseModel>{
        try{
            return await this.fobService.getActiveFob()
        }catch(error){
            return this.applicationExceptionhandler.returnException(FobResponseModel, error);
        }
    }

    @Post("/activateOrDeactivate")
  async activateOrDeactivate(@Body() activateDeactivateReq:any) : Promise<AllFobResponseModel>{
    return await this.fobService.ActivateOrDeactivate(activateDeactivateReq)
    }
    
}
