import { GarmentCategoryDto,GarmentCategoryResponse,AllGarmentCategoryResponse,GarmentCategoryReq,GarmentCategoryRequest,GarmentCategoryDropDownDto ,GarmentCategoryNameRequest} from "@project-management-system/shared-models";
import axios, { AxiosRequestConfig } from 'axios';
import { CommonAxiosService } from '../common-axios-service-prs';

export class GarmentCategoryService extends CommonAxiosService{
    URL = '/garment-categories';

    async createGarmentCategories(dto: GarmentCategoryDto): Promise<GarmentCategoryResponse> {
        console.log(dto,'00000000')

        return this.axiosPostCall(this.URL + '/createGarmentCategory',dto)
    }

    async  updateGarmentCaregories(dto: GarmentCategoryDto): Promise<GarmentCategoryResponse> {
        return this.axiosPostCall(this.URL+ '/updateGarmentCategory', dto)

    }


    async  activateDeActivateGarmentCategory(Dto: GarmentCategoryDto): Promise<GarmentCategoryResponse> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateGarmentCategory', Dto)
    
    }



    async getAllGarmentCategories(): Promise<AllGarmentCategoryResponse> {
        return this.axiosPostCall(this.URL + '/getAllGarmentCategories')
      
    }

    async getActiveGarmentCategories(): Promise<AllGarmentCategoryResponse> {
        return this.axiosPostCall(this.URL + '/getAllActiveGarmentCategories')
 
    }

    /**
     * item category details
     * @param req 
     * @returns 
     */
    async getGarmentCategoryById(req:GarmentCategoryReq): Promise<GarmentCategoryResponse> {
        // console.log(req +'Main Service Call');
        return this.axiosPostCall(this.URL + '/getGarmentCategoryById', req)
       
    }

      async getGarmentCategoryByName(itemcategoryreq: GarmentCategoryNameRequest): Promise<GarmentCategoryDropDownDto> {
        return this.axiosPostCall(this.URL + '/getGarmentCategoryByName',itemcategoryreq).then((res) => {
          return res.data;
        });
      }


}
