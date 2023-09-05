import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCategoryRequest } from '../item-categories/dto/item-categories.request';
import { ItemSubCategoryAdapter } from './dto/item-sub-category.adapter';
import { ItemSubCategoryDto } from './dto/item-sub-category.dto';
import { ItemSubCategoryRequest } from './dto/item-sub-category.request';
import { ItemSubCategory } from './item-sub-category.entity';
import { ItemSubCategoryResponse, AllItemSubCategoryResponse, ItemSubCategoriesDropDownResponse, ItemSubCategoryDropDownDto } from '@project-management-system/shared-models';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';

@Injectable()
export class ItemSubCategoriesService {
    constructor(
        @InjectRepository(ItemSubCategory) private ItemSubCategoryRepository: Repository<ItemSubCategory>,
        private itemSubcategoryAdapter: ItemSubCategoryAdapter,
    ) { }

    // async createItemSubCategory(itemCatDto: ItemSubCategoryDto, isUpdate: boolean, request: Request): Promise<ItemSubCategoryResponse> {
    //     try {

    //         if (!isUpdate) {
    //             const itemSubCatEntity = await this.getItemSubCategory(itemCatDto.itemSubCategory);
    //             if (itemSubCatEntity) {
    //                 throw new ErrorResponse(11104, 'Item category already exists');
    //             }
    //         }
    //         else {
    //             const itemSubCatEntity = await this.getItemSubCategory(itemCatDto.itemSubCategory);
    //             if (itemSubCatEntity) {
    //                 if (itemSubCatEntity.itemSubCategoryId != itemCatDto.itemSubCategoryId) {
    //                     throw new ErrorResponse(11104, 'Item category already exists');
    //                 }
    //             }
    //         }
    //         const convertedItemSubCatEntity: ItemSubCategory = this.itemSubcategoryAdapter.convertDtoToEntity(itemCatDto, isUpdate);
    //         const savedItemSubCatEntity: ItemSubCategory = await this.ItemSubCategoryRepository.save(convertedItemSubCatEntity);
    //         const savedItemCatDto: ItemSubCategoryDto = this.itemSubcategoryAdapter.convertEntityToDto(savedItemSubCatEntity);

    //         if (savedItemCatDto) {
    //             const response = new ItemSubCategoryResponse(true, isUpdate ? 11100 : 11101, isUpdate ? 'Item sub category Updated Successfully' : 'Item sub category Created Successfully', savedItemCatDto);
    //             return response;
    //         } else {
    //             throw new ErrorResponse(11106, 'Item sub category saved but issue while transforming into DTO');
    //         }
    //     }
    //     catch (error) {
    //         return error;
    //     }
    // }

    async createItemSubCategory(itemSubCategoryDto: ItemSubCategoryDto, isUpdate: boolean): Promise<ItemSubCategoryResponse> {
      
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const itemSubCatEntity = await this.getItemSubCategory(itemSubCategoryDto.itemSubCategory);
                if (itemSubCatEntity) {
                    throw new ItemSubCategoryResponse(false,11104, 'Item category already exists');
                }
            }
            // else {
            //     const itemSubCatEntity = await this.getItemSubCategory(itemSubCategoryDto.itemSubCategory);
            //     if (itemSubCatEntity) {
            //         if (!itemSubCategoryDto) {
            //             throw new ErrorResponse(11104, 'Item category already exists');
            //         }
            //     }
            // }
          const convertedItemSubCategory: ItemSubCategory = this.itemSubcategoryAdapter.convertDtoToEntity(itemSubCategoryDto,isUpdate);
          console.log(convertedItemSubCategory);
          const savedItemSubCategoryEntity: ItemSubCategory = await this.ItemSubCategoryRepository.save(convertedItemSubCategory);
          const savedItemSubCategoryDto: ItemSubCategoryDto = this.itemSubcategoryAdapter.convertEntityToDto(convertedItemSubCategory);
            // console.log(savedStateDto);
          if (savedItemSubCategoryDto) {
            const presentValue = savedItemSubCategoryDto.itemSubCategory;
           // generating resposnse
           const response = new ItemSubCategoryResponse(true,1,isUpdate? 'Item Sub Category Updated Successfully': 'Item Sub Category Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Item Sub Category Updated Successfully': 'Item Sub Category Created Successfully'
           const userName = isUpdate? savedItemSubCategoryDto.updatedUser :savedItemSubCategoryDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new ItemSubCategoryResponse(false,11106,'Item Sub Category saved but issue while transforming into DTO');
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
    async getAllItemSubCategories(): Promise<AllItemSubCategoryResponse> {
        try {
            const iteCatDto: ItemSubCategoryDto[] = [];
            const itemCatEntities: ItemSubCategory[] = await this.ItemSubCategoryRepository.find({
                order: { itemSubCategory: "ASC" },
                relations: ['itemCategory']
            });
            //   console.log(itemCatEntities);
            if (itemCatEntities.length > 0) {
                itemCatEntities.forEach(itemcatEntity => {
                    const convertedItemcatDto: ItemSubCategoryDto = this.itemSubcategoryAdapter.convertEntityToDto(itemcatEntity);
                    iteCatDto.push(convertedItemcatDto);
                });
                console.log(iteCatDto);
                const response = new AllItemSubCategoryResponse(true, 11208, "Item sub categories retrieved successfully", iteCatDto);
                return response;
            } else {
                //   console.log('yest')
                throw new AllItemSubCategoryResponse(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }


    /**
   * gets all item sub category details  
   * @returns all item sub category details .
   */
    async getAllItemSubCategoriesDropDown(): Promise<ItemSubCategoriesDropDownResponse> {
        try {
            const itemSubcategoryDTO: ItemSubCategoryDropDownDto[] = [];
            const itemSubCategoryEntities: ItemSubCategory[] = await this.ItemSubCategoryRepository.find({ select: ['itemSubCategoryId', 'itemSubCategory', 'itemSubCategoryCode'], where: { isActive: true }, order: { itemSubCategory: 'ASC' } });
            if (itemSubCategoryEntities && itemSubCategoryEntities.length > 0) {
                itemSubCategoryEntities.forEach(itemSubCatEntity => {
                    itemSubcategoryDTO.push(new ItemSubCategoryDropDownDto(itemSubCatEntity.itemSubCategoryId, itemSubCatEntity.itemSubCategory, itemSubCatEntity.itemSubCategoryCode));
                });
                const response = new ItemSubCategoriesDropDownResponse(true, 11108, "Item sub categories retrieved successfully", itemSubcategoryDTO);
                return response;
            } else {
                throw new ItemSubCategoryResponse(false,99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

    async getItemSubCategory(itemSubCategory: string): Promise<ItemSubCategory> {
        //  console.log(employeeId);
        const response = await this.ItemSubCategoryRepository.findOne({
            where: { itemSubCategory: itemSubCategory },
        });
        // console.log(response);
        if (response) {
            return response;
        } else {
            return null;
        }
    }

    async getItemSubCategoryForBomItem(itemSubCategory: string, category:string): Promise<ItemSubCategory> {
        //  console.log(employeeId);
        const type = (category)?'packing':'raw';
        const response = await this.ItemSubCategoryRepository.findOne({
            where: { itemSubCategory: itemSubCategory, itemSubCategoryCode: type},
        });
        // console.log(response);
        if (response) {
            return response;
        } else {
            return null;
        }
    }

    async getItemSubCategoryForId(itemSubCategoryId: number): Promise<ItemSubCategoryDropDownDto> {
        const response = await this.ItemSubCategoryRepository.findOne({
            select: ['itemSubCategoryId', 'itemSubCategory', 'itemSubCategoryCode'],
            where: { itemSubCategoryId: itemSubCategoryId },
        });
        if (response) {
            return new ItemSubCategoryDropDownDto(response.itemSubCategoryId, response.itemSubCategory, response.itemSubCategoryCode);
        } else {
            return null;
        }
    }


    async getItemSubCategoriesForCategoryDropDown(req: ItemCategoryRequest): Promise<ItemSubCategoriesDropDownResponse> {
        try {
            const itemSubCategoryEntities: ItemSubCategoryDropDownDto[] = await this.ItemSubCategoryRepository
                .createQueryBuilder('item_sub_categories')
                .select('item_sub_category_id as itemSubCategoryId, item_sub_category as itemSubCategory, category_code as itemSubCategoryCode')
                .where(`is_active=1 and item_category_id='${req.itemCategoryId}'`)
                .orderBy('item_sub_category')
                .getRawMany();

            if (itemSubCategoryEntities && itemSubCategoryEntities.length > 0) {
                const response = new ItemSubCategoriesDropDownResponse(true, 11108, "Item sub categories retrieved successfully", itemSubCategoryEntities);
                return response;
            } else {
                throw new ItemSubCategoriesDropDownResponse(false,99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

    async activateOrDeactivateItemSubCategory(itemReq: ItemSubCategoryRequest): Promise<ItemSubCategoryResponse> {
        try {
            const itemSubCatExists = await this.getItemSubCategoryById(itemReq.itemSubCategoryId);
            if (itemSubCatExists) {
                if (!itemSubCatExists) {
                    throw new ItemSubCategoryResponse(false,10113, 'Someone updated the current item category information.Refresh and try again');
                } else {
                    
                        const itemCatSatatus =  await this.ItemSubCategoryRepository.update(
                            { itemSubCategoryId: itemReq.itemSubCategoryId },
                            { isActive: itemReq.isActive,updatedUser: itemReq.updatedUser });
                       
                        if (itemSubCatExists.isActive) {
                            if (itemCatSatatus.affected) {
                                const itemcatResponse: ItemSubCategoryResponse = new ItemSubCategoryResponse(true, 10115, 'Item Sub category is Deactivated successfully');
                                return itemcatResponse;
                            } else {
                                throw new ItemSubCategoryResponse(false,10111, 'Item category is already deactivated');
                            }
                        } else {
                            if (itemCatSatatus.affected) {
                                const itemcatResponse: ItemSubCategoryResponse = new ItemSubCategoryResponse(true, 10114, 'Item Sub category is Activated successfully');
                                return itemcatResponse;
                            } else {
                                throw new ItemSubCategoryResponse(false,10112, 'Item Sub category is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ItemSubCategoryResponse(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getItemSubCategoryById(itemSubCategoryId: number): Promise<ItemSubCategory> {
        //  console.log(employeeId);
            const response = await this.ItemSubCategoryRepository.findOne({
            where: {itemSubCategoryId: itemSubCategoryId},
            });
            // console.log(employeeresponse);
            if (response) {
            return response;
            } else {
            return null;
            }
        }

}
