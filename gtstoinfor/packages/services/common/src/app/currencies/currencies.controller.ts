import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { CurrenciesDTO } from './dto/currencies.dto';
import { CurrenciesService } from './currencies.service';
// import { CurrencyResponseModel, AllCurrencyResponseModel } from '@gtpl/shared-models/masters';
import { CurrencyRequest } from './dto/currencies.request';
import { UserRequestDto } from './dto/user-logs-dto';
import { AllCurrencyResponseModel, CurrencyResponseModel } from '@project-management-system/shared-models';

@ApiTags('currencies')
@Controller('currencies')
export class CurrenciesController {
    constructor(
        private currenciesService: CurrenciesService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
    @Post('/createCurrency')
    async createCurrency(@Body() currenciesDto:CurrenciesDTO,isUpdate:boolean=false): Promise<CurrencyResponseModel> {
    try {
        return await this.currenciesService.createCurrency(currenciesDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CurrencyResponseModel, error);
      }
    }
    @Post('/updateCurrency')
  async updateCurrency(@Body() currenciesDto: CurrenciesDTO,@Req() request:Request): Promise<CurrencyResponseModel> {
    try {
      console.log('update Currency');
      console.log(request);
      return await this.currenciesService.createCurrency(currenciesDto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CurrencyResponseModel, error);
    }
  }
  @Post('/getAllCurrencies')
  // @UseGuards(AuthGuard('jwt'))
  async getAllCurrencies(@Body() req?:UserRequestDto): Promise<AllCurrencyResponseModel> {
    try {
      return await this.currenciesService.getAllCurrencies(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllCurrencyResponseModel, error);
    }
  }
  @Post('/getAllActiveCurrencies')
  async getAllActiveCurrencies(@Req() request: Request): Promise<AllCurrencyResponseModel> {
      try {
          return await this.currenciesService.getAllActiveCurrencies();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllCurrencyResponseModel, error)
      }
  }
  @Post('/activateOrDeactivateCurrency')
  async activateOrDeactivateCurrency(@Body() currencyreq: CurrencyRequest): Promise<CurrencyResponseModel> {
      try {
          return await this.currenciesService.activateOrDeactivateCurrency(currencyreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(CurrencyResponseModel, err);
      }
  }
  @Post('/getCurrencyById')
  async getCurrencyById(@Body() currencyreq: CurrencyRequest): Promise<CurrencyResponseModel> {
      try {
          return await this.currenciesService.getActiveCurrencyById(currencyreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(CurrencyResponseModel, err);
      }
  }
}
