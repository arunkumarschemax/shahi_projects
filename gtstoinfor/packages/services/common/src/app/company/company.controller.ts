import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { CompanyDTO } from './dto/company.dto';
import { CompanyService } from './company.service';
// import { CurrencyResponseModel, AllCurrencyResponseModel } from '@gtpl/shared-models/masters';
import { CompanyRequest } from './dto/company.request';
import { AllCompanyResponseModel, CompanyResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
    @Post('/createCompany')
    async createCompany(@Body() companyDto:CompanyDTO,isUpdate:boolean=false): Promise<CompanyResponseModel> {
    try {
      console.log('createCompany',companyDto)
        return await this.companyService.createCompany(companyDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CompanyResponseModel, error);
      }
    }
    @Post('/updateCompany')
  async updateCompany(@Body() companyDto: CompanyDTO,@Req() request:Request): Promise<CompanyResponseModel> {
    try {
      console.log('update Company');
      console.log(request);
      return await this.companyService.createCompany(companyDto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CompanyResponseModel, error);
    }
  }
  @Post('/getAllCompany')
  // @UseGuards(AuthGuard('jwt'))
  async getAllCompany(@Body() req?:UserRequestDto): Promise<AllCompanyResponseModel> {
    try {
      return await this.companyService.getAllCompany(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllCompanyResponseModel, error);
    }
  }
  @Post('/getAllActiveCompany')
  async getAllActiveCompany(@Req() request: Request): Promise<AllCompanyResponseModel> {
      try {
          return await this.companyService.getAllActiveCompany();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllCompanyResponseModel, error)
      }
  }
  @Post('/activateOrDeactivateCompany')
  async activateOrDeactivateCompany(@Body() companyreq: CompanyRequest): Promise<CompanyResponseModel> {
      try {
          return await this.companyService.activateOrDeactivateCompany(companyreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(CompanyResponseModel, err);
      }
  }
  @Post('/getCompanyById')
  async getCompanyById(@Body() companyreq: CompanyRequest): Promise<CompanyResponseModel> {
      try {
          return await this.companyService.getActiveCompanyById(companyreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(CompanyResponseModel, err);
      }
  }
}
