import { AllCountriesResponseModel, CountriesDropDownData, CountriesDropDownDataResponseModel, CountriesResponseModel, CountryDto, CountryRequest } from '@project-management-system/shared-models';
import axios from 'axios';
import { CommonAxiosService } from '../common-axios-service-prs';

export class CountryService extends CommonAxiosService{
URL = '/countries';

  async createCountry(country: CountryDto): Promise<CountriesResponseModel> {
      return this.axiosPostCall(this.URL + '/createCountry',country)
  }
  async  updateCountry(country: CountryDto): Promise<CountriesResponseModel> {
    return this.axiosPostCall(this.URL + '/updateCountry', country)
}
  async getAllCountries(): Promise<AllCountriesResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllCountries')
    // return new AllCountriesResponseModel(true,123,"successful",[new CountryDto(1,"Japan",true)]);
}
async  ActivatedeActivateCountry(countryDto: CountryDto): Promise<CountriesResponseModel> {
    //   console.log(State.stateCode);
      return this.axiosPostCall(this.URL + '/activateOrDeactivateCountry', countryDto)
  }
async  getCountryById(countryRequest: CountryRequest): Promise<CountriesResponseModel> {
    //   console.log(State.stateCode);
      return this.axiosPostCall(this.URL + '/getCountryById', countryRequest)
  }
  async  getAllActiveCountries(): Promise<AllCountriesResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveCountries')
}
// async getActiveCountriesCount(): Promise<CountryStatusWiseResponseModel> {
//   return this.axiosPostCall(this.URL + '/getActiveCountryCount').then(res => {
//       return res.data
//   });
// }
async getActiveCountries(){
    //   alert('hai')
      return new CountriesDropDownDataResponseModel(true,11,'countriesData retrived successfully',[new CountriesDropDownData(1,'country1'),new CountriesDropDownData(2,'country2')])
  }

}