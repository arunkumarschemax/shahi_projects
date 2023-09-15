import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {Vendors} from './vendors.entity';
import {VendorsDTO} from './dto/vendors.dto';
import { VendorsService } from './vendors.service';
import { VendorRequest } from './dto/vendors.request';
import { AllVendorsResponseModel, VendorsDropDownResponseModel, VendorsResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { VendorFilterRequest } from './dto/vendor-filter.req';

@ApiTags('Vendors')
@Controller('Vendors')
export class VendorsController {
    constructor(
        private vendorService: VendorsService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
    @Post('/createVendor')
    async createVendor(@Body() vendorDto:any): Promise<VendorsResponseModel> {
    try {
        return await this.vendorService.createVendor(vendorDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(VendorsResponseModel, error);
      }
    }
    @Post('/updateVendor')
  async updateVendor(@Body() vendorDto: any,@Req() request:Request): Promise<VendorsResponseModel> {
    try {
      return await this.vendorService.createVendor(vendorDto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(VendorsResponseModel, error);
    }
  }
  @Post('/getAllVendors')
  // @UseGuards(AuthGuard('jwt'))
  async getAllVendors(@Body() req:any): Promise<AllVendorsResponseModel> {

    try {
      return await this.vendorService.getAllVendors(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllVendorsResponseModel, error);
    }
  }
  @Post('/getAllActiveVendors')
  async getAllActiveVendors(@Req() request: Request): Promise<AllVendorsResponseModel> {
      try {
          return await this.vendorService.getAllActiveVendors();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllVendorsResponseModel, error)
      }
  }
  @Post('/activateOrDeactivateVendor')
  async activateOrDeactivateVendor(@Body() Vendorreq: any): Promise<VendorsResponseModel> {
      try {
          return await this.vendorService.activateOrDeactivateVendor(Vendorreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(VendorsResponseModel, err);
      }
  }

  @Post('/getVendorDataById')
  async getVendorDataById(@Body() vendorRequest:VendorRequest): Promise<VendorsResponseModel> {
    try {
        return await this.vendorService.getVendorDataById(vendorRequest);
    } catch (error) {
       throw error;
    }
  }

  @Post('/getVendorsDropDownData')
  async getVendorsDropDownData(): Promise<VendorsDropDownResponseModel> {
    try {
        return await this.vendorService.getVendorsDropDownData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(VendorsDropDownResponseModel, error);
    }
  }
  @Post('/getCurrenciesByVendorId')
  async getCurrenciesByVendorId(@Body() vendorRequest:VendorRequest): Promise<AllVendorsResponseModel> {
    try {
        return await this.vendorService.getCurrenciesByVendorId(vendorRequest);
    } catch (error) {
       throw error;
    }
  }

  @Post('/getVendorCodeDropdown')
  // @UseGuards(AuthGuard('jwt'))
  async getVendorCodeDropdown(): Promise<AllVendorsResponseModel> {

    try {
      return await this.vendorService.getVendorCodeDropdown();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllVendorsResponseModel, error);
    }
  }

  @Post('/getVendorContactDropdown')
  // @UseGuards(AuthGuard('jwt'))
  async getVendorContactDropdown(): Promise<AllVendorsResponseModel> {

    try {
      return await this.vendorService.getVendorContactDropdown();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllVendorsResponseModel, error);
    }
  }

  @Post('/getVendorCityDropdown')
  // @UseGuards(AuthGuard('jwt'))
  async getVendorCityDropdown(): Promise<AllVendorsResponseModel> {

    try {
      return await this.vendorService.getVendorCityDropdown();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllVendorsResponseModel, error);
    }
  }

}
