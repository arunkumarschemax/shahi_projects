import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EmployeeDetailsService } from './employee-details.service';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { AllEmployeeDetailsResponseModel } from "@project-management-system/shared-models";
import { EmployeeIdReq } from "./dto/employee-id-req";
import { EmployeeDetailsResponse } from "./dto/employee-details-request";


@ApiTags('employee-details')
@Controller('employee-details')
export class EmployeeDetailsController {
  constructor(private readonly EmployeeDetailsService: EmployeeDetailsService,  
    private readonly applicationExceptionHandler: ApplicationExceptionHandler

  ) {}

  @Post('/createEmployee')
  async createEmployee(@Body() dto:any,isUpdate:boolean=false): Promise<AllEmployeeDetailsResponseModel> {
  try {
    console.log(dto,'dtoooo')
      return await this.EmployeeDetailsService.createEmployee(dto, false);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllEmployeeDetailsResponseModel, error);
    }
  }
  @Post('/updateEmployee')
  async updateCurrency(@Body() dto: any,@Req() request:Request): Promise<AllEmployeeDetailsResponseModel> {
    try {
      return await this.EmployeeDetailsService.createEmployee(dto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllEmployeeDetailsResponseModel, error);
    }
  }

  @Post('/getAllEmploee')
  async getAllCurrencies(): Promise<AllEmployeeDetailsResponseModel> {
    try {
      return await this.EmployeeDetailsService.getAllEmploee();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllEmployeeDetailsResponseModel, error);
    }
  }
  @Post('/ActivateOrDeactivateEmployee')
  async ActivateOrDeactivateEmployee(@Body() request: any): Promise<AllEmployeeDetailsResponseModel> {
      try {
          return await this.EmployeeDetailsService.ActivateOrDeactivateEmployee(request);
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllEmployeeDetailsResponseModel, error)
      }
  }
  @Post('/getAllActiveEmploee')
  async getAllActiveEmploee(): Promise<AllEmployeeDetailsResponseModel> {
    try {
      return await this.EmployeeDetailsService.getAllActiveEmploee();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllEmployeeDetailsResponseModel, error);
    }
  }
}