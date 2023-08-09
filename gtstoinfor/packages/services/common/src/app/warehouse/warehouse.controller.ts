import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { WarehouseDTO } from './dto/warehouse.dto';
import { WarehouseService } from './warehouse.service';
// import { WarehouseResponseModel, AllCurrencyResponseModel } from '@gtpl/shared-models/masters';
import { WarehouseRequest } from './dto/warehouse.request';
import { UserRequestDto } from './dto/user-log-dto';
import { AllWarehouseResponseModel, WarehouseResponseModel } from '@project-management-system/shared-models';

@ApiTags('warehouse')
@Controller('warehouse')
export class WarehouseController{
    constructor(
        private warehouseService: WarehouseService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
    @Post('/createWarehouse')
    async createWarehouse(@Body() Dto:WarehouseDTO,isUpdate:boolean=false): Promise<WarehouseResponseModel> {
    try {
      console.log('createWarehouse',Dto)
        return await this.warehouseService.createWarehouse(Dto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(WarehouseResponseModel, error);
      }
    }
    @Post('/updateWarehouse')
  async updateWarehouse(@Body() dto: WarehouseDTO,@Req() request:Request): Promise<WarehouseResponseModel> {
    try {
      console.log(request);
      return await this.warehouseService.createWarehouse(dto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(WarehouseResponseModel, error);
    }
  }
  @Post('/getAllWarehouse')
  // @UseGuards(AuthGuard('jwt'))
  async getAllWarehouse(@Body() req?:UserRequestDto): Promise<AllWarehouseResponseModel> {
    try {
      return await this.warehouseService.getAllWarehouse(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllWarehouseResponseModel, error);
    }
  }
  @Post('/getAllActiveWarehouse')
  async getAllActiveWarehouse(@Req() request: Request): Promise<AllWarehouseResponseModel> {
      try {
          return await this.warehouseService.getAllActiveWarehouse();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllWarehouseResponseModel, error)
      }
  }
  @Post('/activateOrDeactivateWarehouse')
  async activateOrDeactivateWarehouse(@Body() req: any): Promise<WarehouseResponseModel> {
      try {
          return await this.warehouseService.activateOrDeactivateWarehouse(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(WarehouseResponseModel, err);
      }
  }
  @Post('/getWarehouseById')
  async getWarehouseById(@Body() req: WarehouseRequest): Promise<WarehouseResponseModel> {
      try {
          return await this.warehouseService.getActiveWarehouseById(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(WarehouseResponseModel, err);
      }
  }
}
