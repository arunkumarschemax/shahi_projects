import { AllCurrencyResponseModel, CurrencyDto, CurrencyRequest, CurrencyResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class CurrencyService extends CommonAxiosService{
  URL = "/currencies";

  async createCurrency(currency: CurrencyDto): Promise<CurrencyResponseModel> {
    // console.log('testss',currency)
    return this.axiosPostCall(this.URL + "/createCurrency", currency)
}

  async updateCurrency(currency: CurrencyDto): Promise<CurrencyResponseModel> {
    return this.axiosPostCall(this.URL + "/updateCurrency", currency)
  }
  async getAllCurrencies(req?:any): Promise<AllCurrencyResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllCurrencies',req)
  }

  async ActivatedeActivateCurrency(
    currencyDto: CurrencyDto
  ): Promise<CurrencyResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateCurrency', currencyDto)

  }
  async getAllActiveCurrencys(): Promise<AllCurrencyResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveCurrencies')
  }
  async getCurrencyById(currencyRequest:CurrencyRequest): Promise<CurrencyResponseModel> {
    return this.axiosPostCall(this.URL + '/getCurrencyById',currencyRequest)
  }
  async getActiveCurrencysCount(): Promise<AllCurrencyResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveCurrencyCount')
  }
}
