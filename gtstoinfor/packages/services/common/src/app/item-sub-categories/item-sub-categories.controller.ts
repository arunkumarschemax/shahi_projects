import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ItemSubCategoryDto } from './dto/item-sub-category.dto';
import { ItemSubCategoriesService } from './item-sub-categories.service';
import { ItemSubCategoryRequest } from './dto/item-sub-category.request';
import { ItemCategoryRequest } from '../item-categories/dto/item-categories.request';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ItemSubCategoryResponse, AllItemSubCategoryResponse, ItemSubCategoriesDropDownResponse, ItemSubCategoryDropDownDto } from '@project-management-system/shared-models';



@Controller('item-sub-categories')
@ApiTags('item-sub-categories')
export class ItemSubCategoriesController {
    constructor(
        private itemCategoryService: ItemSubCategoriesService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}

      /**
     * creates  a Item SubCategory
     * @param ItemSubCategory Item SubCategory DTO
     * @returns Item SubCategoryResponse
     */
       @Post('/createItemSubCategory')
       @ApiBody({type:ItemSubCategoryDto})
       async createItemSubCategory(@Body() itemCatDto:any,isUpdate:boolean=false,@Req() request:Request): Promise<ItemSubCategoryResponse> {
           try {
            return await this.itemCategoryService.createItemSubCategory(itemCatDto,false);
          } catch (error) {
               return this.applicationExceptionHandler.returnException(ItemSubCategoryResponse, error);
          }
        }

           /**
     * gets all the Value Item sub Categories
     * @returns AllIte,CategoryResponseModel which returns all the Value Item sub Categories  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
     */

    @Post('/getAllItemSubCategories')
    async getAllItemSubCategories(): Promise<AllItemSubCategoryResponse> {
        try {
            return await this.itemCategoryService.getAllItemSubCategories();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(AllItemSubCategoryResponse, error);
        }
    }

    /**
     *  updates a  value Item Subcategory
     * @param ItemSubCategory ItemSubCategory DTO
     * @returns ItemSubCategoryResponse
     */
     @Post('/updateItemSubCategory')
     @ApiBody({type:ItemSubCategoryDto})
     async updateItemSubCategory(@Body() itemSubCatDto:any,isUpdate:boolean=true,@Req() request:Request): Promise<ItemSubCategoryResponse> {
         try {
          return await this.itemCategoryService.createItemSubCategory(itemSubCatDto,true);
        } catch (error) {
             return this.applicationExceptionHandler.returnException(ItemSubCategoryResponse, error);
        }
      }

        /**
     *  get all active sub categories 
     * @param ItemCategory ItemSubCategory DTO
     * @returns ItemSubCategoryResponse
     */
    @Post('/getAllItemSubCategoriesDropDown')
    async getAllItemSubCategoriesDropDown(): Promise<ItemSubCategoriesDropDownResponse> {
        try {
         return await this.itemCategoryService.getAllItemSubCategoriesDropDown();
       } catch (error) {
            return this.applicationExceptionHandler.returnException(ItemSubCategoriesDropDownResponse, error);
       }
     }


     @Post('/getItemSubCategoriesForCategoryDropDown')
    async getItemSubCategoriesForCategoryDropDown(@Body() req:any): Promise<ItemSubCategoriesDropDownResponse> {
        try {
         return await this.itemCategoryService.getItemSubCategoriesForCategoryDropDown(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(ItemSubCategoriesDropDownResponse, error);
       }
     }

     @Post('/getItemSubCategoryForId')
     async getItemSubCategoryForId(@Body() req:ItemSubCategoryRequest): Promise<ItemSubCategoryDropDownDto> {
         try {
          return await this.itemCategoryService.getItemSubCategoryForId(req.itemSubCategoryId);
        } catch (error) {
             return error;
        }
      }

      @Post('/activateOrDeactivateItemSubCategory')
      @ApiBody({type:ItemSubCategoryRequest})
      async activateOrDeactivateItemSubCategory(@Body()itemReq: any): Promise<ItemSubCategoryResponse> {
          try {
           return await this.itemCategoryService.activateOrDeactivateItemSubCategory(itemReq);
         } catch (error) {
              return error;
         }
       }



}
