import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCategoryAdapter } from './dto/item-categories.adapter';
import { ItemCategoryDto } from './dto/item-categories.dto';
import { ItemCategoryRequest } from './dto/item-categories.request';
import { ItemCategoryNameRequest } from './dto/item-category-name.request';
import { ItemCategory } from './item-categories.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllItemCategoryResponse, ItemCategoriesDropDownResponseModel, ItemCategoryDropDownDto, ItemCategoryResponse } from '@project-management-system/shared-models';

@Injectable()
export class ItemCategoriesService {
    constructor(
        @InjectRepository(ItemCategory) private ItemCategoryRepository: Repository<ItemCategory>,
        private itemcategoryAdapter: ItemCategoryAdapter,
      ) { }

      async createItemCategory(itemCatDto: ItemCategoryDto, isUpdate: boolean): Promise<ItemCategoryResponse> {
        try {
        
        if (!isUpdate) {
            const itemCatEntity = await this.ItemCategoryRepository.findOne({where:{itemCategoryId:itemCatDto.itemCategoryId}});
          if (itemCatEntity) {
            throw new ItemCategoryResponse(false,11104, 'Item category exists');
          }
        }else{
            console.log('came in')
            const itemCatEntity = await this.ItemCategoryRepository.findOne({where:{itemCategory:itemCatDto.itemCategory}});
            if (itemCatEntity) {
                if(!itemCatDto){
                    throw new ErrorResponse(11104, 'Item category already exists');
                }
            }
        }
        const convertedItemCatEntity: ItemCategory = this.itemcategoryAdapter.convertDtoToEntity(itemCatDto,isUpdate);
        const savedItemCatEntity: ItemCategory = await this.ItemCategoryRepository.save(convertedItemCatEntity);
        const savedItemCatDto: ItemCategoryDto = this.itemcategoryAdapter.convertEntityToDto(savedItemCatEntity);
       
         if (savedItemCatDto) {
          const response = new ItemCategoryResponse(true,isUpdate ? 11100 : 11101,isUpdate? 'Item category Updated Successfully':'Item category Created Successfully',savedItemCatDto);
          return response;
        } else {
          throw new ErrorResponse(11106,'Item category saved but issue while transforming into DTO');
        }
      }
      catch (error) {
        return error;
      }
    }

    /**
     * gets all   Item categories details  
     * @returns all the  Item category details .
     */
    // @LogActions({ isAsync: true })
    async getAllItemCategories(): Promise<AllItemCategoryResponse> {  
        try {
            const iteCatDto: ItemCategoryDto[] = [];
            // retrieves all plants
            const itemCatEntities: ItemCategory[] = await this.ItemCategoryRepository.find({
                order: { itemCategory: "ASC" },
            });
            //   console.log(itemCatEntities);
            if (itemCatEntities.length>0) {
                itemCatEntities.forEach(itemcatEntity => {
                const convertedItemcatDto: ItemCategoryDto = this.itemcategoryAdapter.convertEntityToDto(itemcatEntity);
                iteCatDto.push(convertedItemcatDto);
                });
                const response = new AllItemCategoryResponse(true, 11208, "Item categories retrieved successfully", iteCatDto);
                return response;
            } else {
                //   console.log('yest')
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getItemCategory(itemCategory: string): Promise<ItemCategory> {
        //  console.log(employeeId);
            const response = await this.ItemCategoryRepository.findOne({
            where: {itemCategory: itemCategory},
            });
            // console.log(response);
            if (response) {
            return response;
            } else {
            return null;
            }
        }

    /**
     * It deactivates value  Item category   
     * @param itemReq   item category  as string
     * @returns true or false
     */
    // @LogActions({isAsync: true})
    async activateOrDeactivateItemCategory(itemReq: ItemCategoryRequest): Promise<ItemCategoryResponse> {
        try {
            const itemCatExists = await this.getItemCategoryById(itemReq.itemCategoryId);
            if (itemCatExists) {
                if (!itemCatExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current item category information.Refresh and try again');
                } else {
                    
                        const itemCatSatatus =  await this.ItemCategoryRepository.update(
                            { itemCategoryId: itemReq.itemCategoryId },
                            { isActive: itemReq.isActive,updatedUser: itemReq.updatedUser });
                       
                        if (itemCatExists.isActive) {
                            if (itemCatSatatus.affected) {
                                const itemcatResponse: ItemCategoryResponse = new ItemCategoryResponse(true, 10115, 'Item category is de-activated successfully');
                                return itemcatResponse;
                            } else {
                                throw new ErrorResponse(10111, 'Item category is already deactivated');
                            }
                        } else {
                            if (itemCatSatatus.affected) {
                                const itemcatResponse: ItemCategoryResponse = new ItemCategoryResponse(true, 10114, 'Item category is activated successfully');
                                return itemcatResponse;
                            } else {
                                throw new ErrorResponse(10112, 'Item category is already  activated');
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

    async getItemCategoryById(itemCategoryId: number): Promise<ItemCategory> {
    //  console.log(employeeId);
        const response = await this.ItemCategoryRepository.findOne({
        where: {itemCategoryId: itemCategoryId},
        });
        // console.log(employeeresponse);
        if (response) {
        return response;
        } else {
        return null;
        }
    }

      /**
     * gets all item category details  
     * @returns all item category details .
     */
       async getAllItemCategoriesDropDown(): Promise<ItemCategoriesDropDownResponseModel> {
        try {
            const itemcategoryDTO: ItemCategoryDropDownDto[] = [];
            const itemCategoryEntities: ItemCategory[] = await this.ItemCategoryRepository.find({ select: ['itemCategoryId', 'itemCategory','itemCategoryCode'], where: { isActive: true }, order: { itemCategory: 'ASC' } });
            if (itemCategoryEntities && itemCategoryEntities.length > 0) {
                itemCategoryEntities.forEach(itemCatEntity => {
                    itemcategoryDTO.push(new ItemCategoryDropDownDto(itemCatEntity.itemCategoryId, itemCatEntity.itemCategory,itemCatEntity.itemCategoryCode));
                });
                const response = new ItemCategoriesDropDownResponseModel(true, 11108, "Item categories retrieved successfully", itemcategoryDTO);
                return response;
            } else {
                throw new ErrorResponse(99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

    async getItemCategorydataById(itemcategoryreq: ItemCategoryRequest): Promise<ItemCategoryDropDownDto>{
            const ItemCategoryEntities = await this.ItemCategoryRepository.findOne({select:['itemCategoryId', 'itemCategory','itemCategoryCode'],
              where:{itemCategoryId:itemcategoryreq.itemCategoryId}
              });
              if(ItemCategoryEntities){
              const response = new ItemCategoryDropDownDto(ItemCategoryEntities.itemCategoryId,ItemCategoryEntities.itemCategory,ItemCategoryEntities.itemCategoryCode);
                  return response;
              }else{
                  throw new ErrorResponse(11106,'Something went wrong');
              }
    }

    async getItemCategoryByName(itemCategoryreq: ItemCategoryNameRequest): Promise<ItemCategoryDropDownDto> {
         console.log(itemCategoryreq);
        const ItemCategoryEntities = await this.ItemCategoryRepository.findOne({select:['itemCategoryId', 'itemCategory','itemCategoryCode'],
              where:{itemCategory:itemCategoryreq.itemCategory}
              });
              if(ItemCategoryEntities){
              const response = new ItemCategoryDropDownDto(ItemCategoryEntities.itemCategoryId,ItemCategoryEntities.itemCategory);
                  return response;
              }else{
                  throw new ErrorResponse(11106,'Something went wrong');
              }
    }


    async getAllActiveItemCategories(): Promise<AllItemCategoryResponse> {
        // const page: number = 1;
        // const response = new AllDeliveryResponseModel();
        try {
          const itemCategoryDTO: ItemCategoryDto[] = [];
          //retrieves all companies
          const itemCategoryEntity: ItemCategory[] = await this.ItemCategoryRepository.find({where:{"isActive":true},order :{itemCategory:'ASC'}});
          //console.log(statesEntities);
          
          if (itemCategoryEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            itemCategoryEntity.forEach(itemCategoryEntity => {
              const convertedDeliveryMethodDto: ItemCategoryDto = this.itemcategoryAdapter.convertEntityToDto(
                itemCategoryEntity
              );
              itemCategoryDTO.push(convertedDeliveryMethodDto);
            });
    
            //generated response
  
            const response = new AllItemCategoryResponse(true,1,'Item Category retrieved successfully',itemCategoryDTO);
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
