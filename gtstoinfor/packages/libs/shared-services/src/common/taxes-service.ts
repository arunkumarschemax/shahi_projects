import axios from 'axios';
import {TaxesDto,TaxesResponseModel,AllTaxesResponseModel, TaxIdRequest, TaxDropDownDto, TaxDropDownResponse}  from '@project-management-system/shared-models' ;
import { UserRequestDto } from '../user-request';
import { CommonAxiosService } from '../common-axios-service-prs';

export class TaxesService  extends CommonAxiosService{
URL ='/taxes';

      async createTax(req?:TaxesDto): Promise<AllTaxesResponseModel> {
        return this.axiosPostCall(this.URL + '/createTax',req)   
      }
    async updateTax(req?:TaxesDto): Promise<AllTaxesResponseModel> {
      return this.axiosPostCall(this.URL + '/updateTax',req)   
    }
      async getAllTaxes(req?:UserRequestDto): Promise<AllTaxesResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllTaxes',req)   
    }


    async ActivateOrDeactivateTax(req:TaxesDto): Promise<AllTaxesResponseModel> {
      return this.axiosPostCall(this.URL + '/activateOrDeactivateTax',req)   
  }
  
  async getAllActiveTaxes(): Promise<AllTaxesResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveTaxes')   
  }

  async getActiveTaxDropDown(): Promise<TaxDropDownResponse> {
    return this.axiosPostCall(this.URL + '/getActiveTaxDropDown')
            
  }
  
  async getTaxForId(req:TaxIdRequest): Promise<TaxDropDownDto> {
    return this.axiosPostCall(this.URL + '/getTaxForId', req)  
  }

  async getTaxForNoTax(): Promise<TaxDropDownDto> {
    return this.axiosPostCall(this.URL + '/getTaxForNoTax')   
  }
  async getDefaultTaxForPO(): Promise<TaxDropDownDto> {
    return this.axiosPostCall(this.URL + '/getDefaultTaxForPO')     
  }
}


