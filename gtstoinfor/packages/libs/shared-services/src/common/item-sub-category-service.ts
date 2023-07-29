import axios from "axios";
import { from } from "rxjs";
import { CommonAxiosService } from "../common-axios-service-prs";
import { ItemSubCategoriesDto, ItemSubCategoryResponse, AllItemSubCategoryResponse, ItemCategoryRequest, ItemSubCategoriesDropDownResponse, ItemSubCategoryRequest, ItemSubCategoryDropDownDto, SubCatReqForCategoryId } from "@project-management-system/shared-models";

export class ItemSubCategoryService extends CommonAxiosService{
    URL = '/item-sub-categories';

    async create(dto: ItemSubCategoriesDto): Promise<ItemSubCategoryResponse>{
        return this.axiosPostCall(this.URL + '/createItemSubCategory', dto)
    }   
    
    async update(dto: ItemSubCategoriesDto): Promise<ItemSubCategoryResponse>{
        return this.axiosPostCall(this.URL + '/updateItemSubCategory', dto)
    } 

    async activeOrDeactivate(dto: ItemSubCategoriesDto): Promise<ItemSubCategoryResponse>{
        return this.axiosPostCall(this.URL + '/activeOrDeactivateCategory', dto)
    } 

    async getAll(): Promise<AllItemSubCategoryResponse> {
        return this.axiosPostCall(this.URL + '/getAllItemSubCategories')

    }

    async getItemSubCategoriesForCategoryDropDown(req:ItemCategoryRequest): Promise<ItemSubCategoriesDropDownResponse> {
        return this.axiosPostCall(this.URL + '/getItemSubCategoriesForCategoryDropDown',req)
  
    }

    async getItemSubCategoryForId(req:ItemSubCategoryRequest): Promise<ItemSubCategoryDropDownDto> {
        return this.axiosPostCall(this.URL + '/getItemSubCategoryForId',req)
   
    }

    async getSubCategoryByCategoryId(itemCatId :SubCatReqForCategoryId): Promise<AllItemSubCategoryResponse> {
        
        return this.axiosPostCall(this.URL + '/getSubCategoryByCategoryId', itemCatId)
      
    }

    async activateOrDeactivateItemSubCategory(Dto: ItemSubCategoriesDto): Promise<ItemSubCategoryResponse> {
        
        return this.axiosPostCall(this.URL + '/activateOrDeactivateItemSubCategory', Dto)
  
    }

    
}