import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards, Req } from '@nestjs/common';
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { DestinationDTO } from './dto/destination.dto';
import { DestinationService } from './destination.service';
import { DestinationRequest } from './dto/destination.request';

import { AllDestinationResponseModel, DestinationDropDownResponse, DestinationResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from './dto/user-log-dto';

@ApiTags('destination')
@Controller('destination')
export class DestinationController {
  constructor(
    private Service: DestinationService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler
  ) { }
  @Post('/createDestination')
  async createDestination(@Body() Destination: DestinationDTO, isUpdate: boolean = false): Promise<DestinationResponseModel> {
    try {
      console.log('createDestination', Destination)
      return await this.Service.createDestination(Destination, false);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(DestinationResponseModel, error);
    }
  }
  @Post('/updateDestination')
  async updateDestination(@Body() Destination: DestinationDTO, @Req() request: Request): Promise<DestinationResponseModel> {
    try {
      console.log('update Destination');
      console.log(request);
      return await this.Service.createDestination(Destination, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(DestinationResponseModel, error);
    }
  }
  @Post('/getAllDestination')
  // @UseGuards(AuthGuard('jwt'))
  async getAllDestination(@Body() req?: UserRequestDto): Promise<AllDestinationResponseModel> {
    try {
      return await this.Service.getAllDestination(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllDestinationResponseModel, error);
    }
  }
  @Post('/getAllActiveDestination')
  async getAllActiveDestination(@Req() request: Request): Promise<AllDestinationResponseModel> {
    try {
      return await this.Service.getAllActiveDestination();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllDestinationResponseModel, error)
    }
  }
  @Post('/activateOrDeactivateDestination')
  async activateOrDeactivateDestination(@Body() req: any): Promise<DestinationResponseModel> {
    try {
      return await this.Service.activateOrDeactivateDestination(req);
    } catch (err) {
      return this.applicationExceptionHandler.returnException(DestinationResponseModel, err);
    }
  }
  @Post('/getDestinationById')
  async getDestinationById(@Body() req: DestinationRequest): Promise<DestinationResponseModel> {
    try {
      return await this.Service.getActiveDestinationById(req);
    } catch (err) {
      return this.applicationExceptionHandler.returnException(DestinationResponseModel, err);
    }
  }
  @Post('/getColourforDivisionDropDown')
async getDestinationforDivisionDropDown(@Body() req:any): Promise<DestinationDropDownResponse> {
    try {
     return await this.Service.getDestinationForDivisionDropDown(req);
   } catch (error) {
        return this.applicationExceptionHandler.returnException(DestinationDropDownResponse, error);
   }
 }
}
