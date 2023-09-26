import { Body, Controller, Post, Put } from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { AllFactoriesResponseModel, CommonResponseModel, NewFilterDto, PriceListDto, PriceListResponseModel } from '@project-management-system/shared-models';
import { priceListService } from './pricelist.service';
import { ApiBody } from '@nestjs/swagger';
import { priceListDto } from './dto/pricelist.dto';
import { PriceListEntity } from './entities/pricelist.entity';

@Controller('/priceList')
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
      
        @Post('/updatePriceList')
        @ApiBody({ type: PriceListDto })
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
    @ApiBody({ type: NewFilterDto })
    async getAllPriceList(@Body ()req:any): Promise<PriceListResponseModel> {
        try {
            return await this.priceService.getAllPriceList(req);
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

  @Post('/getAllPriceListStyles')
    async getAllPriceListStyles(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListStyles();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getAllPriceListDestination')
    async getAllPriceListDestination(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListDestination();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllPriceListYear')
    async getAllPriceListYear(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListYear();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllPriceListCurrency')
    async getAllPriceListCurrency(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListCurrency();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllPriceListSeasonCode')
    async getAllPriceListSeasonCode(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListSeasonCode();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }



    
}
