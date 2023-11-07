import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {Countries} from './countries.entity';
import {CountriesDTO} from './dto/countries.dto';
import {CountriesService} from './countries.service';
import { CountryRequest } from './dto/countries.request';
import { UserRequestDto } from './dto/user-request-dto';
import { AllCountriesResponseModel, CountriesResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {

    constructor(
      private countriesService: CountriesService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
    @Post('/createCountry')
    async createCountry(@Body() countriesDto:CountriesDTO,isUpdate:boolean=false): Promise<CountriesResponseModel> {
    try {
        return await this.countriesService.createCountry(countriesDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CountriesResponseModel, error);
      }
    }
    @Post('/updateCountry')
  async updateGrade(@Body() countriesDto: CountriesDTO,@Req() request:Request): Promise<CountriesResponseModel> {
    try {
    //  console.log('update Country');countriesDto
    //  console.log(request);
      return await this.countriesService.createCountry(countriesDto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CountriesResponseModel, error);
    }
  }
  @Post('/getAllCountries')
  // @UseGuards(AuthGuard('jwt'))
  async getAllCountries(@Body() req?:UserRequestDto): Promise<AllCountriesResponseModel> {
    try {
      return await this.countriesService.getAllCountries(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllCountriesResponseModel, error);
    }
  }
  @Post('/activateOrDeactivateCountry')
  async activateOrDeactivateCountry(@Body() countryreq: CountryRequest): Promise<CountriesResponseModel> {
      try {
          return await this.countriesService.activateOrDeactivateCountry(countryreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(CountriesResponseModel, err);
      }
  }
  @Post('/getAllActiveCountries')
  async getAllActiveCountries(@Req() request: Request): Promise<AllCountriesResponseModel> {
      try {
          return await this.countriesService.getAllActiveCountries();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllCountriesResponseModel, error)
      }
  }
  @Post('/getCountryById')
  async getCountryById(@Body() countryreq: CountryRequest): Promise<CountriesResponseModel> {
      try {
          return await this.countriesService.getActiveCountryById(countryreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(CountriesResponseModel, err);
      }
  }
}
