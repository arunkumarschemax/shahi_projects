import { Body, Controller, Post, Req } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import {FactoryResponseModel} from '../../../../../libs/shared-models/src/common/factory/factory-response-objects'
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { AllFactoriesResponseModel } from '@project-management-system/shared-models';
import { ApiBody } from '@nestjs/swagger';
import { FactoryDto } from './dto/factory.dto';

@Controller('/factories')
export class FactoriesController {
    constructor(
        private factoriesService: FactoriesService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
        ) { }

    @Post('/createFactory')
    async createFactory(@Body() factoryDto:any): Promise<FactoryResponseModel>{
        try{
            return await this.factoriesService.createFactory(factoryDto,false)
        }catch(error){
            return this.applicationExceptionhandler.returnException(FactoryResponseModel, error)
        }
    }

    @Post('/updateFactories')
    @ApiBody({type:FactoryDto})
  async updateSuppliers(@Body()request:any): Promise<FactoryResponseModel> {
    try {
       
      return await this.factoriesService.createFactory(request, true);
    } catch (error) {
      return this.applicationExceptionhandler.returnException(FactoryResponseModel, error);
    }
  }

    @Post('/getFactories')
    async getFactories(): Promise<AllFactoriesResponseModel>{
        try{
            return await this.factoriesService.getFactories()
        }catch(error){
            return this.applicationExceptionhandler.returnException(AllFactoriesResponseModel, error)
        }
    }

    @Post('/getActiveFactories')
    async getActiveFactories() : Promise<AllFactoriesResponseModel>{
        try{
            return await this.factoriesService.getActiveFactories()
        }catch(error){
            return this.applicationExceptionhandler.returnException(AllFactoriesResponseModel, error);
        }
    }

    @Post("/activateOrDeactivate")
  async activateOrDeactivate(@Body() activateDeactivateReq:any) : Promise<AllFactoriesResponseModel>{
    return await this.factoriesService.ActivateOrDeactivate(activateDeactivateReq)
    }
    
}
