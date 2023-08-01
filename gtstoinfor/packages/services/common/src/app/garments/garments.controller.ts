import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GarmentDto } from './dto/garments.dto';
import { GarmentsService } from './garments.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllGarmentsResponse, GarmentResponse } from '@project-management-system/shared-models';
import { GarmentsRequest } from './dto/garments.request';



@Controller('garments')
@ApiTags('garments')
export class GarmentsController {
    constructor(
        private garmentService: GarmentsService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}

      /**
     * creates  a Item SubCategory
     * @param ItemSubCategory Item SubCategory DTO
     * @returns Item SubCategoryResponse
     */
       @Post('/createGarment')
       @ApiBody({type:GarmentDto})
       async createGarment(@Body() garmentDto:any,isUpdate:boolean=false,@Req() request:Request): Promise<GarmentResponse> {
           try {
            return await this.garmentService.createGarment(garmentDto,false);
          } catch (error) {
               return this.applicationExceptionHandler.returnException(GarmentResponse, error);
          }
        }


         /**
     *  updates a  value Item Subcategory
     * @param ItemSubCategory ItemSubCategory DTO
     * @returns ItemSubCategoryResponse
     */
     @Post('/updateGarment')
     @ApiBody({type:GarmentDto})
     async updateGarment(@Body() GarmentDto:any,isUpdate:boolean=true,@Req() request:Request): Promise<GarmentResponse> {
         try {
          return await this.garmentService.createGarment(GarmentDto,true);
        } catch (error) {
             return this.applicationExceptionHandler.returnException(GarmentResponse, error);
        }
      }

           /**
     * gets all the Value Item sub Categories
     * @returns AllIte,CategoryResponseModel which returns all the Value Item sub Categories  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
     */

    @Post('/getAllGarments')
    async getAllGarments(): Promise<AllGarmentsResponse> {
        try {
            return await this.garmentService.getAllGarments();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(AllGarmentsResponse, error);
        }
    }


    //     /**
    //  *  get all active sub categories 
    //  * @param ItemCategory ItemSubCategory DTO
    //  * @returns ItemSubCategoryResponse
    //  */
    // @Post('/getAllItemSubCategoriesDropDown')
    // async getAllItemSubCategoriesDropDown(): Promise<ItemSubCategoriesDropDownResponse> {
    //     try {
    //      return await this.itemCategoryService.getAllItemSubCategoriesDropDown();
    //    } catch (error) {
    //         return this.applicationExceptionHandler.returnException(ItemSubCategoriesDropDownResponse, error);
    //    }
    //  }


    //  @Post('/getItemSubCategoriesForCategoryDropDown')
    // async getItemSubCategoriesForCategoryDropDown(@Body() req:ItemCategoryRequest): Promise<ItemSubCategoriesDropDownResponse> {
    //     try {
    //      return await this.itemCategoryService.getItemSubCategoriesForCategoryDropDown(req);
    //    } catch (error) {
    //         return this.applicationExceptionHandler.returnException(ItemSubCategoriesDropDownResponse, error);
    //    }
    //  }

    //  @Post('/getItemSubCategoryForId')
    //  async getItemSubCategoryForId(@Body() req:ItemSubCategoryRequest): Promise<ItemSubCategoryDropDownDto> {
    //      try {
    //       return await this.itemCategoryService.getItemSubCategoryForId(req.itemSubCategoryId);
    //     } catch (error) {
    //          return error;
    //     }
    //   }

      @Post('/activateOrDeactivateGarment')
      @ApiBody({type:GarmentsRequest})
      async activateOrDeactivateGarment(@Body()req: any): Promise<GarmentResponse> {
          try {
           return await this.garmentService.activateOrDeactivateGarment(req);
         } catch (error) {
              return error;
         }
       }



}
