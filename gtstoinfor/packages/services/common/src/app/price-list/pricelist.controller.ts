import { Body, Controller, Post, Put } from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { AllFactoriesResponseModel, PriceListResponseModel } from '@project-management-system/shared-models';
import { priceListService } from './pricelist.service';
import { ApiBody } from '@nestjs/swagger';
import { priceListDto } from './dto/pricelist.dto';
import { PriceListEntity } from './entities/pricelist.entity';

@Controller('/PriceList')
export class PriceListController {
    constructor(
        private priceService: priceListService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
        ) { }

        @Post('/createPriceList')
        @ApiBody({ type: priceListDto })
        async createPriceList(@Body() Dto: any): Promise<PriceListResponseModel> {
          try {
            return await this.priceService.createPriceList(Dto, false);
          } catch (error) {
            return this.applicationExceptionhandler.returnException(
              PriceListResponseModel,
              error
            );
          }
        }
      
        @Put('/updatePriceList')
        @ApiBody({ type: priceListDto })
        async updatePriceList(@Body() Dto: any): Promise<PriceListResponseModel> {
          try {
            return await this.priceService.createPriceList(Dto, true);
          } catch (error) {
            return this.applicationExceptionhandler.returnException(
              PriceListResponseModel,
              error
            );
          }
        }
    

    @Post('/getAllPriceList')
    async getAllPriceList(): Promise<PriceListResponseModel> {
        try {
            return await this.priceService.getAllPriceList();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(PriceListResponseModel, error);
        }
    }
    

    @Post('/getAllActivePriceList')
    async getAllActivePriceList() : Promise<PriceListResponseModel>{
        try{
            return await this.priceService.getAllActivePriceList()
        }catch(error){
            return this.applicationExceptionhandler.returnException(PriceListResponseModel, error);
        }
    }

    @Post("/ActivateOrDeactivatePriceList")
    @ApiBody({type : priceListDto})
    async ActivateOrDeactivatePriceList(@Body() req:any) : Promise<PriceListResponseModel>{
    try{
        await this.priceService.ActivateOrDeactivatePriceList(req)
    }catch(error){
        return this.applicationExceptionhandler.returnException(PriceListResponseModel,error)
    }
  }




    
}
