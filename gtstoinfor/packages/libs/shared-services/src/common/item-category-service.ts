import { ItemCategoriesDto, ItemCategoryResponse, AllItemCategoryResponse, ItemCategoryReq, ItemCategoryRequest, ItemCategoryDropDownDto, ItemCategoryNameRequest } from '@project-management-system/shared-models';
import axios, { AxiosRequestConfig } from 'axios';
import { CommonAxiosService } from '../common-axios-service-prs';

export class ItemCategoryService extends CommonAxiosService{
    URL =  '/item-categories';


    async create(dto: ItemCategoriesDto): Promise<ItemCategoryResponse> {
        return this.axiosPostCall(this.URL + '/createItemCategory',dto)
    }


    async  update(dto: ItemCategoriesDto): Promise<ItemCategoryResponse> {
        return this.axiosPostCall(this.URL+ '/updateItemCategory', dto)

    }


    async  activatedeActivate(Dto: ItemCategoriesDto): Promise<ItemCategoryResponse> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateItemCategory', Dto)
    
    }



    async getAll(): Promise<AllItemCategoryResponse> {
        return this.axiosPostCall(this.URL + '/getAllItemCategories')
      
    }

    async getActiveItemCategories(): Promise<AllItemCategoryResponse> {
        return this.axiosPostCall(this.URL + '/getAllItemCategoriesDropDown')
 
    }

    /**
     * item category details
     * @param req 
     * @returns 
     */
    async getItemCategoryForId(req:ItemCategoryReq): Promise<ItemCategoryResponse> {
        // console.log(req +'Main Service Call');
        return this.axiosPostCall(this.URL + '/getItemCategoryForId', req)
       
    }

    async getItemCategoryById(itemCategoryRequest:ItemCategoryRequest): Promise<ItemCategoryDropDownDto> {
        return this.axiosPostCall(this.URL + '/getItemCategoryById',itemCategoryRequest).then((res) => {
          return res.data;
        });
      }

      async getItemCategoryByName(itemcategoryreq: ItemCategoryNameRequest): Promise<ItemCategoryDropDownDto> {
        return this.axiosPostCall(this.URL + '/getItemCategoryByName',itemcategoryreq).then((res) => {
          return res.data;
        });
      }

}