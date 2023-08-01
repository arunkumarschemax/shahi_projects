import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { GarmentCategoryAdapter } from './dto/garment-category.adapter';
import { GarmentCategoryDto } from './dto/garment-category.dto';
import { GarmentCategoryRequest } from './dto/garment-category.request';
import { GarmentCategoryNameRequest } from './dto/garment-category-name.request';
import { GarmentCategory } from './garment-category.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllGarmentCategoryResponse,GarmentCategoryDropDownResponseModel,GarmentCategoryDropDownDto,GarmentCategoryResponse } from '@project-management-system/shared-models';
import { PaymentMethod } from '../payment-methods/payment-method-entity';
 @Injectable()
 export class GarmentCategoryService {
    constructor(
        @InjectRepository(GarmentCategory) private GarmentCategoryRepository: Repository<GarmentCategory>,
        private garmentcategoryAdapter: GarmentCategoryAdapter,
      ) { }

      async getGarmentWithoutRelations(garment: string): Promise<GarmentCategory>{
        const GarmentResponse = await this.GarmentCategoryRepository.findOne({
          where: {garmentCategory: Raw(alias => `garment_category = '${garment}'`)},
        });
        if(GarmentResponse){
          return GarmentResponse;
        }
        else{
          return null;
        }
      }
      async createGarmentCategory(garmentCatDto:GarmentCategoryDto , isUpdate: boolean): Promise<GarmentCategoryResponse> {
        try {
        let previousValue 
        // const garmentCategoryDtos:GarmentCategoryDto[]=[];

        if (!isUpdate) {
            const garmentCatEntity = await this.getGarmentWithoutRelations(garmentCatDto.garmentCategory);
          if (garmentCatEntity) {
            throw new GarmentCategoryResponse(false,11104, 'garment category exists');
          }
        }else{
            console.log('came in')
            const garmentPrevious = await this.GarmentCategoryRepository.findOne({where:{garmentCategoryId:garmentCatDto.garmentCategoryId}})
            previousValue=(garmentPrevious.garmentCategory)
            const garmentCatEntity = await this.getGarmentWithoutRelations(garmentCatDto.garmentCategory);
            if (garmentCatEntity) {
                if(garmentCatEntity.garmentCategoryId!= garmentCatDto.garmentCategoryId){
                    throw new ErrorResponse(11104, 'garment category already exists');
                }
            }
        }
        const convertedGarmentCatEntity: GarmentCategory = this.garmentcategoryAdapter.convertDtoEntity(garmentCatDto,isUpdate);
        const savedGarmentCatEntity: GarmentCategory = await this.GarmentCategoryRepository.save(convertedGarmentCatEntity);
        const savedGarmentCatDto: GarmentCategoryDto = this.garmentcategoryAdapter.convertEntityToDto(savedGarmentCatEntity);
       
         if (savedGarmentCatDto) {
            // const presentValue =GarmentCategoryDto.garmentCategory;
            const name=isUpdate?'upadated':'created'
            const displayValue =isUpdate? 'GarmentCategory Updated Successfully':'GarmentCategory created Successfully'
            const userName =isUpdate? savedGarmentCatDto.updatedUser:savedGarmentCatDto.createdUser
          const response = new GarmentCategoryResponse(true,isUpdate ? 11100 : 11101,isUpdate? 'garment category Updated Successfully':'garment category Created Successfully',[savedGarmentCatDto]);
          return response;
        } else {
          throw new ErrorResponse(11106,'garment category saved but issue while transforming into DTO');
        }
      }
      catch (error) {
        return error;
      }
    }
    /**
     * gets all   garment categories details  
     * @returns all the  garment category details .
     */
    // @LogActions({ isAsync: true })


    async getAllGarmentCategories(): Promise<AllGarmentCategoryResponse> {  
        try {
console.log('===============');

            const garmentcatDto: GarmentCategoryDto[] = [];
            // retrieves all plants
            const garmentCategoryEntity: GarmentCategory[] = await this.GarmentCategoryRepository.find({
                order: { garmentCategory: "ASC" },
            });
            if (garmentCategoryEntity) {
                console.log(garmentCategoryEntity,'--------');

                garmentCategoryEntity.forEach(garmentCatEntity => {
                const convertedgarmentcatDto: GarmentCategoryDto = this.garmentcategoryAdapter.convertEntityToDto(garmentCatEntity);
                garmentcatDto.push(convertedgarmentcatDto);
                });

                const response = new AllGarmentCategoryResponse(true, 11208, "garment categories retrieved successfully", garmentcatDto);
                return response;
            } else {
                //   console.log('yest')
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
}

async getGarmentCategory(GarementCategory: string): Promise<GarmentCategory> {
    //  console.log(employeeId);
        const response = await this.GarmentCategoryRepository.findOne({
        where: {garmentCategory: GarementCategory},
        });
        // console.log(response);
        if (response) {
        return response;
        } else {
        return null;
        }
    }

    async activateOrDeactivateGarmentCategory(garment: GarmentCategoryRequest): Promise<GarmentCategoryResponse> {
        try {
            console.log(garment,'reqqqqqqqqqqqqq');
            
            const garCatExists = await this.getGarmentCategoryById(garment.garmentCategoryId);
            if (garCatExists) {
                       if(garment.versionFlag !== garCatExists.versionFlag) {                                                                
                    throw new GarmentCategoryResponse(false,10113, 'Someone updated the current garment category information.Refresh and try again');
                } else {
                    
                        const garmentCatSatatus =  await this.GarmentCategoryRepository.update(
                            { garmentCategoryId: garment.garmentCategoryId },
                            { isActive: garment.isActive,updatedUser: garment.updatedUser });
                       
                        if (garCatExists.isActive) {
                            if (garmentCatSatatus.affected) {
                                const garmentcatResponse: GarmentCategoryResponse = new GarmentCategoryResponse(true, 10115, 'Garment category is de-activated successfully');
                                return garmentcatResponse;
                            } else {
                                throw new GarmentCategoryResponse(false,10111, 'Garment category is already deactivated');
                            }
                        } else {
                            if (garmentCatSatatus.affected) {
                                const garmentcatResponse: GarmentCategoryResponse = new GarmentCategoryResponse(true, 10114, 'Garment category is activated successfully');
                                return garmentcatResponse;
                            } else {
                                throw new GarmentCategoryResponse(false,10112, 'Garment category is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }


    async getGarmentCategoryById(garmentCategoryId: number): Promise<GarmentCategory> {
        //  console.log(employeeId);
            const response = await this.GarmentCategoryRepository.findOne({
            where: {garmentCategoryId: garmentCategoryId},
            });
            // console.log(employeeresponse);
            if (response) {
            return response;
            } else {
            return null;
            }
        } 

        async getAllGarmentCategoriesDropDown(): Promise<GarmentCategoryDropDownResponseModel> {

            try {
                const garmentcategoryDTO: GarmentCategoryDropDownDto[] = [];
                const garmentCategoryEntities: GarmentCategory[] = await this.GarmentCategoryRepository.find({ select: ['garmentCategoryId', 'garmentCategory'], where: { isActive: true }, order: { garmentCategory: 'ASC' } });
                if (garmentCategoryEntities && garmentCategoryEntities.length > 0) {
                    garmentCategoryEntities.forEach(garmentCatEntity => {
                        garmentcategoryDTO.push(new GarmentCategoryDropDownDto(garmentCatEntity.garmentCategoryId, garmentCatEntity.garmentCategory));
                    });
                    const response = new GarmentCategoryDropDownResponseModel(true, 11108, "garment categories retrieved successfully", garmentcategoryDTO);
                    return response;
                } else {
                    throw new ErrorResponse(99998, 'Data not found');
                }
            } catch (err) {
                return err;
            }
        }
        async getGarmentCategorydataById(garmentcategoryreq: GarmentCategoryRequest): Promise<GarmentCategoryDropDownDto>{
            const GarmentCategoryEntities = await this.GarmentCategoryRepository.findOne({select:['garmentCategoryId', 'garmentCategory'],
              where:{garmentCategoryId:garmentcategoryreq.garmentCategoryId}
              });
              if(GarmentCategoryEntities){
              const response = new GarmentCategoryDropDownDto(GarmentCategoryEntities.garmentCategoryId,GarmentCategoryEntities.garmentCategory);
                  return response;
              }else{
                  throw new ErrorResponse(11106,'Something went wrong');
              }
    }
    async getGarmentCategoryByName(garmentcategoryreq: GarmentCategoryNameRequest): Promise<GarmentCategoryDropDownDto> {
        console.log(garmentcategoryreq);
       const GarmentCategoryEntities = await this.GarmentCategoryRepository.findOne({select:['garmentCategoryId', 'garmentCategory'],
             where:{garmentCategory:garmentcategoryreq.garmentCategory}
             });
             if(GarmentCategoryEntities){
             const response = new GarmentCategoryDropDownDto(GarmentCategoryEntities.garmentCategoryId,GarmentCategoryEntities.garmentCategory);
                 return response;
             }else{
                 throw new ErrorResponse(11106,'Something went wrong');
             }
   }

   async getAllActiveGarmentCategories(): Promise<AllGarmentCategoryResponse> {
    // const page: number = 1;
    // const response = new AllDeliveryResponseModel();
    try {
      const garmentCategoryDTO: GarmentCategoryDto[] = [];
      //retrieves all companies
      const garmentCategoryEntity: GarmentCategory[] = await this.GarmentCategoryRepository.find({where:{"isActive":true},order :{garmentCategory:'ASC'}});
      //console.log(statesEntities);
      
      if (garmentCategoryEntity) {
        // converts the data fetched from the database which of type companies array to type StateDto array.
        garmentCategoryEntity.forEach(garmentCategoryEntity => {
          const convertedDeliveryMethodDto: GarmentCategoryDto = this.garmentcategoryAdapter.convertEntityToDto(
            garmentCategoryEntity
          );
          garmentCategoryDTO.push(convertedDeliveryMethodDto);
        });

        //generated response

        const response = new AllGarmentCategoryResponse(true,1,'Garment Category retrieved successfully',garmentCategoryDTO);
        return response;
      } else {
        throw new ErrorResponse(99998, 'Data not found');
      }
      // return response;
    } catch (err) {
      return err;
    }
  } 
 }
