import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GarmentsAdapter } from './dto/garments.adapter';
import { GarmentDto } from './dto/garments.dto';
import { Garments } from './garments.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllGarmentsResponse, GarmentRequest, GarmentResponse } from '@project-management-system/shared-models';
import { GarmentsRequest } from './dto/garments.request';

@Injectable()
export class GarmentsService {
    constructor(
        @InjectRepository(Garments) private garmentsRepository: Repository<Garments>,
        private garmentsAdapter: GarmentsAdapter,
    ) { }

    async createGarment(garmentDto: GarmentDto, isUpdate: boolean): Promise<GarmentResponse> {
        try {
          let previousValue
          if (!isUpdate) {
            const garmentEntity = await this.garmentsRepository.findOne({where:{garmentName:garmentDto.garmentName}})
                if (garmentEntity) {
                    throw new GarmentResponse(false,11104, 'Garment already exists');
                }
            }
            else {
                const garmentEntity = await this.garmentsRepository.findOne({where:{garmentId:garmentDto.garmentId}})
                if (garmentEntity) {
                    if (!garmentDto) {
                        throw new ErrorResponse(11104, 'Garment already exists');
                    }
                }
            }
          const convertedGarment: Garments = this.garmentsAdapter.convertDtoToEntity(garmentDto,isUpdate);
          console.log(convertedGarment);
          const savedGarmentEntity: Garments = await this.garmentsRepository.save(convertedGarment);
          const savedGarmentDto: GarmentDto = this.garmentsAdapter.convertEntityToDto(convertedGarment);
            // console.log(savedStateDto);
          if (savedGarmentDto) {
            const presentValue = savedGarmentDto.garmentName;
           // generating resposnse
           const response = new GarmentResponse(true,1,isUpdate? 'Garment Updated Successfully': 'Garment Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Garment Updated Successfully': 'Garment Created Successfully'
           const userName = isUpdate? savedGarmentDto.updatedUser :savedGarmentDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new GarmentResponse(false,11106,'Garment saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }

    /**
    * gets all   Item categories details  
    * @returns all the  Item category details .
    */
    // @LogActions({ isAsync: true })
    
    async getAllGarments(): Promise<AllGarmentsResponse> {
        try {
            const garmentDto: GarmentDto[] = [];
            const garmentEntities: Garments[] = await this.garmentsRepository.find({
                order: { garmentName: "ASC" },
                // relations: ['garment']
            });
            if (garmentEntities.length > 0) {
                garmentEntities.forEach(garmentEntity => {
                    const convertedGarmentDto: GarmentDto = this.garmentsAdapter.convertEntityToDto(garmentEntity);
                    garmentDto.push(convertedGarmentDto);
                });
                console.log(garmentDto);
                const response = new AllGarmentsResponse(true, 11208, "Garments retrieved successfully", garmentDto);
                return response;
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }


//     /**
//    * gets all item sub category details  
//    * @returns all item sub category details .
//    */
//     async getAllItemSubCategoriesDropDown(): Promise<ItemSubCategoriesDropDownResponse> {
//         try {
//             const itemSubcategoryDTO: ItemSubCategoryDropDownDto[] = [];
//             const itemSubCategoryEntities: Garments[] = await this.ItemSubCategoryRepository.find({ select: ['itemSubCategoryId', 'itemSubCategory', 'itemSubCategoryCode'], where: { isActive: true }, order: { itemSubCategory: 'ASC' } });
//             if (itemSubCategoryEntities && itemSubCategoryEntities.length > 0) {
//                 itemSubCategoryEntities.forEach(itemSubCatEntity => {
//                     itemSubcategoryDTO.push(new ItemSubCategoryDropDownDto(itemSubCatEntity.itemSubCategoryId, itemSubCatEntity.itemSubCategory, itemSubCatEntity.itemSubCategoryCode));
//                 });
//                 const response = new ItemSubCategoriesDropDownResponse(true, 11108, "Item sub categories retrieved successfully", itemSubcategoryDTO);
//                 return response;
//             } else {
//                 throw new ErrorResponse(99998, 'Data not found');
//             }
//         } catch (err) {
//             return err;
//         }
//     }

//     async getItemSubCategory(itemSubCategory: string): Promise<Garments> {
//         //  console.log(employeeId);
//         const response = await this.ItemSubCategoryRepository.findOne({
//             where: { itemSubCategory: itemSubCategory },
//         });
//         // console.log(response);
//         if (response) {
//             return response;
//         } else {
//             return null;
//         }
//     }

//     async getItemSubCategoryForBomItem(itemSubCategory: string, category:string): Promise<Garments> {
//         //  console.log(employeeId);
//         const type = (category)?'packing':'raw';
//         const response = await this.ItemSubCategoryRepository.findOne({
//             where: { itemSubCategory: itemSubCategory, itemSubCategoryCode: type},
//         });
//         // console.log(response);
//         if (response) {
//             return response;
//         } else {
//             return null;
//         }
//     }

//     async getItemSubCategoryForId(itemSubCategoryId: number): Promise<ItemSubCategoryDropDownDto> {
//         const response = await this.ItemSubCategoryRepository.findOne({
//             select: ['itemSubCategoryId', 'itemSubCategory', 'itemSubCategoryCode'],
//             where: { itemSubCategoryId: itemSubCategoryId },
//         });
//         if (response) {
//             return new ItemSubCategoryDropDownDto(response.itemSubCategoryId, response.itemSubCategory, response.itemSubCategoryCode);
//         } else {
//             return null;
//         }
//     }


//     async getItemSubCategoriesForCategoryDropDown(req: ItemCategoryRequest): Promise<ItemSubCategoriesDropDownResponse> {
//         try {
//             const itemSubCategoryEntities: ItemSubCategoryDropDownDto[] = await this.ItemSubCategoryRepository
//                 .createQueryBuilder('item_sub_categories')
//                 .select('item_sub_category_id as itemSubCategoryId, item_sub_category as itemSubCategory, category_code as itemSubCategoryCode')
//                 .where(`is_active=1 and item_category_id='${req.itemCategoryId}'`)
//                 .orderBy('item_sub_category')
//                 .getRawMany();

//             if (itemSubCategoryEntities && itemSubCategoryEntities.length > 0) {
//                 const response = new ItemSubCategoriesDropDownResponse(true, 11108, "Item sub categories retrieved successfully", itemSubCategoryEntities);
//                 return response;
//             } else {
//                 throw new ErrorResponse(99998, 'Data not found');
//             }
//         } catch (err) {
//             return err;
//         }
//     }

    async activateOrDeactivateGarment(garmentReq: GarmentsRequest): Promise<GarmentResponse> {
        try {
            const garmentExists = await this.getGarmentById(garmentReq.garmentId);
            if (garmentExists) {
                if (!garmentExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current garment information.Refresh and try again');
                } else {
                    
                        const garmentStatus =  await this.garmentsRepository.update(
                            { garmentId: garmentReq.garmentId },
                            { isActive: garmentReq.isActive,updatedUser: garmentReq.updatedUser });
                       
                        if (garmentExists.isActive) {
                            if (garmentStatus.affected) {
                                const garmentResponse: GarmentResponse = new GarmentResponse(true, 10115, 'Garment is de-activated successfully');
                                return garmentResponse;
                            } else {
                                throw new ErrorResponse(10111, 'Garment is already deactivated');
                            }
                        } else {
                            if (garmentStatus.affected) {
                                const garmentResponse: GarmentResponse = new GarmentResponse(true, 10114, 'Garment is activated successfully');
                                return garmentResponse;
                            } else {
                                throw new ErrorResponse(10112, 'Garment is already  activated');
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

    async getGarmentById(garmentId: number): Promise<Garments> {
        //  console.log(employeeId);
            const response = await this.garmentsRepository.findOne({
            where: {garmentId: garmentId},
            });
            if (response) {
            return response;
            } else {
            return null;
            }
        }

}
