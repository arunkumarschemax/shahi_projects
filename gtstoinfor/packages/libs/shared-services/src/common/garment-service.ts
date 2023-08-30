import axios from "axios";
import { from } from "rxjs";
import { CommonAxiosService } from "../common-axios-service-prs";
import { GarmentsDto, GarmentResponse, AllGarmentsResponse, GarmentsCategoryRequest } from "@project-management-system/shared-models";

export class GarmentService extends CommonAxiosService{
    URL = '/garments';

    async createGarment(dto: GarmentsDto): Promise<GarmentResponse>{
        return this.axiosPostCall(this.URL + '/createGarment', dto)
    }   
    
    async updateGarment(dto: GarmentsDto): Promise<GarmentResponse>{
        return this.axiosPostCall(this.URL + '/updateGarment', dto)
    } 

    async activateOrDeactivateGarment(dto: GarmentsDto): Promise<GarmentResponse>{
        return this.axiosPostCall(this.URL + '/activateOrDeactivateGarment', dto)
    } 

    async getAllGarments(): Promise<AllGarmentsResponse> {
        return this.axiosPostCall(this.URL + '/getAllGarments')

    }

    async getByGarmentCategory(req : GarmentsCategoryRequest): Promise<AllGarmentsResponse> {
        return this.axiosPostCall(this.URL + '/getByGarmentCategory')

    }

    // async getItemSubCategoriesForCategoryDropDown(req:ItemCategoryRequest): Promise<ItemSubCategoriesDropDownResponse> {
    //     return this.axiosPostCall(this.URL + '/getItemSubCategoriesForCategoryDropDown',req)
  
    // }

    // async getItemSubCategoryForId(req:ItemSubCategoryRequest): Promise<ItemSubCategoryDropDownDto> {
    //     return this.axiosPostCall(this.URL + '/getItemSubCategoryForId',req)
   
    // }

    // async getSubCategoryByCategoryId(itemCatId :SubCatReqForCategoryId): Promise<AllItemSubCategoryResponse> {
        
    //     return this.axiosPostCall(this.URL + '/getSubCategoryByCategoryId', itemCatId)
      
    // }

    // async activateOrDeactivateItemSubCategory(Dto: ItemSubCategoriesDto): Promise<ItemSubCategoryResponse> {
        
    //     return this.axiosPostCall(this.URL + '/activateOrDeactivateItemSubCategory', Dto)
  
    // }

    
}