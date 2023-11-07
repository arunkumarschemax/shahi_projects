import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { CompanyDTO } from './dto/company.dto';
import { CompanyService } from './company.service';
import { CompanyRequest } from './dto/company.request';
import { AllCompanyResponseModel, CompanyResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from './dto/userlog';

@ApiTags('company')
@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
    @Post('/createCompany')
    @ApiBody({type:CompanyDTO})
    async createCompany(@Body() companyDto:any,isUpdate:boolean=false,@Req() request:CompanyRequest): Promise<CompanyResponseModel> {
    try {
      // console.log('createCompany',companyDto)
        return await this.companyService.createCompany(companyDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CompanyResponseModel, error);
      }
    }
    @Post('/updateCompany')
  async updateCompany(@Body() companyDto: CompanyDTO,@Req() request:Request): Promise<CompanyResponseModel> {
    try {
    //  console.log('update Company');
     // console.log(request);
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
  @ApiBody({type:CompanyRequest})
  async activateOrDeactivateCompany(@Body() companyreq: any): Promise<CompanyResponseModel> {
      try {
          return await this.companyService.activateOrDeactivateCompany(companyreq);
      } catch (error) {
          return this.applicationExceptionHandler.returnException(CompanyResponseModel,error);
      }
  }
  @Post('/getCompanyById')
  async getCompanyById(@Body() companyreq: CompanyRequest): Promise<CompanyResponseModel> {
      try {
          return await this.companyService.getActiveCompanyById(companyreq);
      } catch (error) {
          return this.applicationExceptionHandler.returnException(CompanyResponseModel, error);
      }
  }
  @Get()
  async getCompanyDataFromM3() {
    try {
        return await this.companyService.getCompanyDataFromM3();
    } catch (error) {
        return this.applicationExceptionHandler.returnException(CompanyResponseModel, error);
    }
}
}
