import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ItemCategoryDto } from './dto/item-categories.dto';
import { ItemCategoryRequest } from './dto/item-categories.request';
import { ItemCategoryNameRequest } from './dto/item-category-name.request';
import { ItemCategoriesService } from './item-categories.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ItemCategoryResponse, AllItemCategoryResponse, ItemCategoriesDropDownResponseModel, ItemCategoryDropDownDto } from '@project-management-system/shared-models';

@ApiTags('item-categories')
@Controller('item-categories')
export class ItemCategoriesController {
    constructor(
        private itemCategoryService: ItemCategoriesService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      /**
     * creates  a Item Category
     * @param ItemCategory Item Category DTO
     * @returns Item CategoryResponse
     */
    @Post('/createItemCategory')
    async createItemCategory(@Body() itemCatDto:ItemCategoryDto,isUpdate:boolean=false,@Req() request:Request): Promise<ItemCategoryResponse> {
        try {
         return await this.itemCategoryService.createItemCategory(itemCatDto,false);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(ItemCategoryResponse, error);
       }
     }

      /**
     * gets all the Value Item Categories
     * @returns AllIte,CategoryResponseModel which returns all the Value Item Categories  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
     */

    @Post('/getAllItemCategories')
    async getAllItemCategories(): Promise<AllItemCategoryResponse> {
        try {
            return await this.itemCategoryService.getAllItemCategories();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(AllItemCategoryResponse, error);
        }
    }

     /**
     * Activate Or De-Activate Value Item category
     * @param getSingleIteCategory item category 
     * @returns Value itemcategoryResponse
     */
   @Post('/activateOrDeactivateItemCategory')
   @ApiBody({type:ItemCategoryRequest})
   async activateOrDeactivateItemCategory(@Body() itemReq: any): Promise<ItemCategoryResponse> {
       try {
           return await this.itemCategoryService.activateOrDeactivateItemCategory(itemReq);
       } catch (err) {
           return this.applicationExceptionHandler.returnException(ItemCategoryResponse, err);
       }
   }

   /**
     *  updates a  value Item category
     * @param ItemCategory ItemCategory DTO
     * @returns ItemCategoryResponse
     */
    @Post('/updateItemCategory')
    @ApiBody({type:ItemCategoryDto})
    async updateItemCategory(@Body() itemCatDto:any,isUpdate:boolean=true,@Req() request:Request): Promise<ItemCategoryResponse> {
        try {
         return await this.itemCategoryService.createItemCategory(itemCatDto,true);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(ItemCategoryResponse, error);
       }
     }

    //   /**
    //  *  updates a  value Item category
    //  * @param ItemCategory ItemCategory DTO
    //  * @returns ItemCategoryResponse
    //  */
    // @Post('/updateItemCategory')
    // async updateItemCategory(@Body() itemCatDto:ItemCategoryDto,isUpdate:boolean=true,@Req() request:Request): Promise<ItemCategoryResponse> {
    //     try {
    //      return await this.itemCategoryService.createItemCategory(itemCatDto,true,request);
    //    } catch (error) {
    //         return this.applicationExceptionHandler.returnException(ItemCategoryResponse, error);
    //    }
    //  }


       /**
     *  get all active categories 
     * @param ItemCategory ItemCategory DTO
     * @returns ItemCategoryResponse
     */
    @Post('/getAllItemCategoriesDropDown')
    async getAllItemCategoriesDropDown(): Promise<ItemCategoriesDropDownResponseModel> {
        try {
         return await this.itemCategoryService.getAllItemCategoriesDropDown();
       } catch (error) {
            return this.applicationExceptionHandler.returnException(ItemCategoriesDropDownResponseModel, error);
       }
     }

     @Post('/getItemCategoryByName')
     async getItemCategoryByName(@Body() itemcategoryreq: ItemCategoryNameRequest): Promise<ItemCategoryDropDownDto> {
         try {
             return await this.itemCategoryService.getItemCategoryByName(itemcategoryreq);
         } catch (err) {
             throw err;
         }
     }

     @Post('/getItemCategoryById')
     async getItemCategoryById(@Body() itemcategoryreq: ItemCategoryRequest): Promise<ItemCategoryDropDownDto> {
         try {
             return await this.itemCategoryService.getItemCategorydataById(itemcategoryreq);
         } catch (err) {
             throw err;
         }
     }

     @Post('/getAllActiveItemCategories')
     async getAllActiveItemCategories(): Promise<AllItemCategoryResponse> {
         try {
             return await this.itemCategoryService.getAllActiveItemCategories();
         } catch (error) {
            return this.applicationExceptionHandler.returnException(AllItemCategoryResponse, error);
         }
     }
}
