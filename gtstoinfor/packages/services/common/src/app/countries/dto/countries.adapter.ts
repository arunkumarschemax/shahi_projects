import { Injectable } from '@nestjs/common';
import {CountriesDTO} from './countries.dto';
import {Countries} from '../countries.entity';

@Injectable()
export class CountriesAdapter {
  
  public convertDtoToEntity(countriesDTO: CountriesDTO,  isUpdate: boolean = false ): Countries {
    const countries = new Countries();
    countries.countryId=countriesDTO.countryId;
    countries.countryName=countriesDTO.countryName;
    // company.isActive = statesDto.isActive == undefined ? true : statesDto.isActive;
    countries.isActive=countriesDTO.isActive==undefined?true:countriesDTO.isActive;
    if (isUpdate) {
        countries.updatedUser = countriesDTO.updatedUser;
    } else {
        countries.isActive = true;
        countries.createdUser = countriesDTO.createdUser;
    }
   return countries;
  }
  public convertEntityToDto(countriesObject: Countries): CountriesDTO {
    const countriesDto= new CountriesDTO;
    countriesDto.countryId=countriesObject.countryId;
    countriesDto.countryName=countriesObject.countryName;
    countriesDto.isActive = countriesObject.isActive;
    countriesDto.createdAt = countriesObject.createdAt;
    countriesDto.updatedAt = countriesObject.updatedAt;
    countriesDto.createdUser = countriesObject.createdUser;
    countriesDto.updatedUser = countriesObject.updatedUser;
    countriesDto.versionFlag = countriesObject.versionFlag;
    return countriesDto;
  }
}
