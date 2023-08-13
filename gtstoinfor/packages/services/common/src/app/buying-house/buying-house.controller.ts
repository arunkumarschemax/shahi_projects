import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { BuyingHouseDTO } from './dto/buying-house.dto';
import { BuyingHouseService } from './buying-house.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllBuyingHouseResponseModel, BuyingHouseResponseModel } from '@project-management-system/shared-models';
import { BuyingHouseRequest } from './dto/buying-house.request';


@ApiTags('buying-house')
@Controller('buying-house')
export class BuyingHouseController {
    constructor(private buyingHouseService: BuyingHouseService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createBuyingHouse')
    @ApiBody({type:BuyingHouseDTO})
    async createBuyingHouse(@Body() req:any): Promise<BuyingHouseResponseModel> {
    try {
        return await this.buyingHouseService.createBuyingHouse(req, false);
    } catch (error) {
        return this.applicationExceptionHandler.returnException(BuyingHouseResponseModel, error);
    }
    }
  
    @Post('/updateBuyingHouse')
    @ApiBody({type: BuyingHouseDTO})
    async updateBuyingHouse(@Body() dto: any): Promise<BuyingHouseResponseModel> {
      try {
        return await this.buyingHouseService.createBuyingHouse(dto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(BuyingHouseResponseModel, error);
      }
    }


  @Post('/getAllBuyingHouse')
  async getAllBuyingHouse(): Promise<AllBuyingHouseResponseModel> {
    try {
      return await this.buyingHouseService.getAllBuyingHouse();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllBuyingHouseResponseModel, error);
    }
  }

  @Post('/getAllActiveBuyingHouse')
  async getAllActiveBuyingHouse(): Promise<AllBuyingHouseResponseModel> {
    try {
      return await this.buyingHouseService.getAllActiveBuyingHouse();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllBuyingHouseResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateBuyingHouse')
  @ApiBody({type: BuyingHouseRequest})
  async activateOrDeactivateBuyingHouse(@Body() req: any): Promise<BuyingHouseResponseModel> {
    try {
      return await this.buyingHouseService.activateOrDeactivateBuyingHouse(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(BuyingHouseResponseModel, error);
    }
  }

  @Post('/getActiveBuyingHouseById')
  async getActiveBuyingHouseById(@Body() req: BuyingHouseRequest ): Promise<BuyingHouseResponseModel> {
      try {
          return await this.buyingHouseService.getActiveBuyingHouseById(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(BuyingHouseResponseModel, err);
      }
  }
}
