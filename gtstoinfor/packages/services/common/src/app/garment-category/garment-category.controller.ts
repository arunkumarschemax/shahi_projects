import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GarmentCategoryDto } from './dto/garment-category.dto';
import { GarmentCategoryRequest } from './dto/garment-category.request';
import { GarmentCategoryNameRequest } from './dto/garment-category-name.request';
import { GarmentCategoryService } from './garment-category.service';
import { GarmentCategoryResponse,AllGarmentCategoryResponse,GarmentCategoryDropDownResponseModel,GarmentCategoryDropDownDto } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { GarmentCategory } from './garment-category.entity';

@ApiTags('garment-categories')
@Controller('garment-categories')
export class GarmentCategoriesController {
    constructor(
        private garmentCategoryService: GarmentCategoryService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      /**
     * creates  a garment Category
     * @param garmentCategory garmentCategory DTO
     * @returns garment CategoryResponse
     */

      @Post('/createGarmentCategory')
      @ApiBody({type:GarmentCategoryDto})
      async createGarmentCategory(@Body() garmentCatDto:any,isUpdate:boolean=false,@Req() request:Request): Promise<GarmentCategoryResponse> {
        console.log(garmentCatDto,'----------garmentCatDto')
          try {
           return await this.garmentCategoryService.createGarmentCategory(garmentCatDto,false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(GarmentCategoryResponse, error);
         }
       }
  
        /**
       * gets all the Value garment Categories
       * @returns All,CategoryResponseModel which returns all the Value garment Categories  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
       */


        @Post('/getAllGarmentCategories')
    async getAllGarmentCategories(): Promise<AllGarmentCategoryResponse> {
        try {          
            console.log(await this.garmentCategoryService.getAllGarmentCategories())
            return await this.garmentCategoryService.getAllGarmentCategories();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(AllGarmentCategoryResponse, error);
        }
    }

    
     /**
     * Activate Or De-Activate Value garment category
     * @param getSingleGarmentCategory  category 
     * @returns Value garmentcategoryResponse
     */
   @Post('/activateOrDeactivateGarmentCategory')
   @ApiBody({type:GarmentCategoryDto})
   async activateOrDeactivateGarmentCategory(@Body() garmentReq: any): Promise<GarmentCategoryResponse> {
       try {
           return await this.garmentCategoryService.activateOrDeactivateGarmentCategory(garmentReq);
       } catch (err) {
           return this.applicationExceptionHandler.returnException(GarmentCategoryResponse, err);
       }
   }

   /**
     *  updates a  value Garment category
     * @param GarmentCategory GarmentCategory DTO
     * @returns GarmentCategoryResponse
     */
   @Post('/updateGarmentCategory')
   @ApiBody({type:GarmentCategoryDto})
   async updateGarmentCategory(@Body() germentCatDto:any,isUpdate:boolean=true,@Req() request:Request): Promise<GarmentCategoryResponse> {
       try {
        return await this.garmentCategoryService.createGarmentCategory(germentCatDto,true);
      } catch (error) {
           return this.applicationExceptionHandler.returnException(GarmentCategoryResponse, error);
      }
    }
     //   /**
    //  *  updates a  value Garment category
    //  * @param garmentCategory garmentCategory DTO
    //  * @returns GarmentCategoryResponse
    //  */

    // @Post('/updateGarmentCategory')
    // async updategarmentCategory(@Body() garmentCatDto:GarmentCategoryDto,isUpdate:boolean=true,@Req() request:Request): Promise<garmentCategoryResponse> {
    //     try {
    //      return await this.garmentCategoryService.creategarmentCategory(garmentCatDto,true,request);
    //    } catch (error) {
    //         return this.applicationExceptionHandler.returnException(GarmentCategoryResponse, error);
    //    }
    //  }

      /**
     *  get all active categories 
     * @param GarementCategory GarmentCategory DTO
     * @returns GarmentCategoryResponse
     */
      @Post('/getAllGarmentCategoriesDropDown')
      async getAllGarmentCategoriesDropDown(): Promise<GarmentCategoryDropDownResponseModel> {
          try {
           return await this.garmentCategoryService.getAllGarmentCategoriesDropDown();
         } catch (error) {
              return this.applicationExceptionHandler.returnException(GarmentCategoryDropDownResponseModel, error);
         }
       }
       @Post('/getGarmentCategoryByName')
       async getAllGarmentCategoryByName(@Body() garmentcategoryreq: GarmentCategoryNameRequest): Promise<GarmentCategoryDropDownDto> {
           try {
               return await this.garmentCategoryService.getGarmentCategoryByName(garmentcategoryreq);
           } catch (err) {
               throw err;
           }
       }
  
       @Post('/getGarmentCategoryById')
       async getGarmentCategoryById(@Body() garmentcategoryreq: GarmentCategoryRequest): Promise<GarmentCategoryDropDownDto> {
           try {
               return await this.garmentCategoryService.getGarmentCategoryById(garmentcategoryreq.garmentCategoryId);
           } catch (err) {
               throw err;
           }
       }
  
       @Post('/getAllActiveGarmentCategories')
       async getAllActiveGarmentCategories(): Promise<AllGarmentCategoryResponse> {
           try {
               return await this.garmentCategoryService.getAllActiveGarmentCategories();
           } catch (error) {
              return this.applicationExceptionHandler.returnException(AllGarmentCategoryResponse, error);
           }
       }
}