import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { DivisionDTO } from './dto/division.dto';
import { DivisionService } from './division.service';
import { DivisionRequest } from './dto/division.request';
import { AllDivisionResponseModel, DivisionResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';

@ApiTags('division')
@Controller('division')
export class DivisionController {
    constructor(
        private divisionService: DivisionService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
    @Post('/createDivision')
    @ApiBody({type:DivisionDTO})
    async createDivision(@Body() divisionDto:any,isUpdate:boolean=false): Promise<DivisionResponseModel> {
    try {
      console.log('createDivision',divisionDto)
        return await this.divisionService.createDivision(divisionDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(DivisionResponseModel, error);
      }
    }
    @Post('/updateDivision')
    @ApiBody({type:DivisionDTO})
  async updateDivision(@Body() divisionDto: any,@Req() request:Request): Promise<DivisionResponseModel> {
    try {
      console.log('update Division');
      console.log(request);
      return await this.divisionService.createDivision(divisionDto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(DivisionResponseModel, error);
    }
  }
  // @Post('/getAllDivision')
  // // @UseGuards(AuthGuard('jwt'))
  // async getAllDivision(@Body() req?:UserRequestDto): Promise<AllDivisionResponseModel> {
  //   try {
  //     return await this.divisionService.getAlldivision(req);
  //   } catch (error) {
  //     return this.applicationExceptionHandler.returnException(AllDivisionResponseModel, error);
  //   }
  // }
  @Post('/getAllActiveDivision')
  async getAllActiveDivision(@Req() request: Request): Promise<AllDivisionResponseModel> {
      try {
          return await this.divisionService.getAllActivedivision();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllDivisionResponseModel, error)
      }
  }
  @Post('/activateOrDeactivateDivision')
  @ApiBody({type:DivisionRequest})
  async activateOrDeactivateDivision(@Body() divisionreq: any): Promise<DivisionResponseModel> {
      try {
          return await this.divisionService.activateOrDeactivatedivision(divisionreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(DivisionResponseModel, err);
      }
  }
  @Post('/getDivisionById')
  async getDivisionById(@Body() divisionreq: DivisionRequest): Promise<DivisionResponseModel> {
      try {
          return await this.divisionService.getActivedivisionById(divisionreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(DivisionResponseModel, err);
      }
  }

    @Post('/getAllDivision')
  // @UseGuards(AuthGuard('jwt'))
  async getAllDivision(): Promise<AllDivisionResponseModel> {
    try {
      return await this.divisionService.getAlldivision();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllDivisionResponseModel, error);
    }
  }
}
