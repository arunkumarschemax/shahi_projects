import { Injectable } from '@nestjs/common';
import { CurrenciesDTO } from './currencies.dto';
import { Currencies } from '../currencies.entity';

@Injectable()
export class CurrenciesAdapter {
  /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  currenciesDto: CurrenciesDTO,  isUpdate: boolean = false ): Currencies {
    const currencies = new Currencies();
    currencies.currencyId=currenciesDto.currencyId;
    currencies.currencyName=currenciesDto.currencyName;
    // company.isActive = statesDto.isActive == undefined ? true : statesDto.isActive;
    currencies.isActive=currenciesDto.isActive==undefined?true:currenciesDto.isActive;
    if (isUpdate) {
        currencies.updatedUser = currenciesDto.updatedUser;
    } else {
        currencies.isActive = true;
        currencies.createdUser = currenciesDto.createdUser;
    }
   return currencies;
  }
  public convertEntityToDto(currenciesObject: Currencies): CurrenciesDTO {
    const currenciesDto= new CurrenciesDTO;
    currenciesDto.currencyId=currenciesObject.currencyId;
    currenciesDto.currencyName=currenciesObject.currencyName;
    currenciesDto.isActive = currenciesObject.isActive;
    currenciesDto.createdAt = currenciesObject.createdAt;
    currenciesDto.updatedAt = currenciesObject.updatedAt;
    currenciesDto.createdUser = currenciesObject.createdUser;
    currenciesDto.updatedUser = currenciesObject.updatedUser;
    currenciesDto.versionFlag = currenciesObject.versionFlag;
    return currenciesDto;
  }
}
