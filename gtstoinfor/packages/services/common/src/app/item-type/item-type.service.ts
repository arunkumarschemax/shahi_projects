import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AllItemTypeResponseModel,ItemTypeDropDownDto,ItemTypeDropDownResponse, ProductGroupRequest } from '@project-management-system/shared-models';
import { ItemTypeResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import {ItemTypeAdapter} from './dto/item-type.adapter'
import { ItemTypeEntity } from './item-type.entity';
import { ItemTypeRequestDto } from '@project-management-system/shared-models';
import {ItemTypeRequest} from  './dto/item-type.request'
import { Console } from 'console';
import { ItemTypeDtos } from './dto/item-type.dto';
import { DivisionRequest } from '../division/dto/division.request';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
@Injectable()
export class ItemTypeService{
    constructor(
        @InjectRepository(ItemTypeEntity)

        private ItemTypeRepository: Repository<ItemTypeEntity>,
        private ItemTypeAdapter: ItemTypeAdapter,
      ){}
      async getItemTypeWithoutRelations(Item: string): Promise<ItemTypeEntity>{
        const ItemResponse = await this.ItemTypeRepository.findOne({
          where: {itemType: Raw(alias => `item_type = '${Item}'`)},
        });
        if(ItemResponse){
          return ItemResponse;
        }
        else{
          return null;
        }
      }


      async createItemType(itemdto: ItemTypeDtos, isUpdate: boolean): Promise<ItemTypeResponseModel>{
        console.log('ggggggggg============',isUpdate)
        // const response = new ProfitControlHeadResponseModel();
        try{
          let previousValue
        const ItemDto2: ItemTypeDtos[] = [];

          if(!isUpdate){

            const ItemEntity = await this.getItemTypeWithoutRelations(itemdto.itemType);
            if (ItemEntity){
              throw new ItemTypeResponseModel(false,11104, 'ItemType already exists'); 
            }
          }
          else{
            // console.log('ertyudfghjk============')

            const certificatePrevious = await this.ItemTypeRepository.findOne({where:{itemTypeId:itemdto.itemTypeId}})
            previousValue =(certificatePrevious.itemType)
            const ItemTypesEntity = await this.getItemTypeWithoutRelations(itemdto.itemType);
            // console.log('ertyudfghjk============',certificatePrevious)
            if (ItemTypesEntity){
              if(ItemTypesEntity.itemTypeId != itemdto.itemTypeId ){
                throw new ItemTypeResponseModel(false,11104, 'ItemType already exists'); 
              }
            }
          }
          const convertedItemTypesEntity: ItemTypeEntity = this.ItemTypeAdapter.convertDtoToEntity(itemdto,isUpdate);

          // console.log(convertedSizeEntity);
        const savedItemEntity: ItemTypeEntity = await this.ItemTypeRepository.save(convertedItemTypesEntity);
        const savedItemDto: ItemTypeDtos = this.ItemTypeAdapter.convertEntityToDto(savedItemEntity);
        // sizedDto2.push(savedSizeDto)
          // console.log(savedSizeDto,'saved');
        if (savedItemDto) {
          const presentValue = itemdto.itemType;
          //generating resposnse
          const response =new ItemTypeResponseModel(true,1,isUpdate? 'ItemType  Updated Successfully':'ItemType Successfully')
          const name=isUpdate?'updated':'created'
          const displayValue = isUpdate? 'ItemType Updated Successfully': 'ItemType Created Successfully'
          const userName = isUpdate? savedItemDto.updatedUser :savedItemDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Size', savedProfitCenterDto.profitCenter, true, displayValue,userName,previousValue,presentValue)
            // let res = await this.logService.createLog(newLogDto);
            // console.log(response,'9999999999999999');
            // const response = new AllProfitCenterResponseModel(true,1000,isUpdate? 'SizeUpdated Successfully': Size Created Successfully');
          return response;
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new ItemTypeResponseModel(false,11106,'ItemType saved but issue while transforming into DTO');
        }
        // return response;
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }

    async getAllItemTypes(): Promise<AllItemTypeResponseModel> {
       
        try {
          const itemTypedto: ItemTypeDtos[] = [];
          const itemEntity: ItemTypeEntity[] = await this.ItemTypeRepository.find({ 
            order :{itemType:'ASC'},
            relations: ['division','productgroup']
          });
          console.log(itemEntity,"itemEntity")
          if (itemEntity.length > 0) {
            itemEntity.forEach(itemEntity => {
              const converteditemDto: ItemTypeDtos = this.ItemTypeAdapter.convertEntityToDto(itemEntity);
              itemTypedto.push(converteditemDto);
            });    
            const response = new AllItemTypeResponseModel(true,1,'ItemType retrieved successfully',itemTypedto);
        
            return response;
          } else {
            throw new ErrorResponse(99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  
      async getAllActiveItemTypes(): Promise<AllItemTypeResponseModel> {
        // const page: number = 1;
        try {
            const SampleSubTypeDto: ItemTypeDtos[] = [];
            //retrieves all companies
            const SampleSubTypeEntities:ItemTypeEntity [] = await this.ItemTypeRepository.find({ order: { 'itemType': 'ASC' },where:{isActive:true}
           });
         console.log(SampleSubTypeEntities)
            if (SampleSubTypeEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                SampleSubTypeEntities.forEach(Entity => {
                    const convertedBrandsDtos: ItemTypeDtos = this.ItemTypeAdapter.convertEntityToDto(
                      Entity
                    );
                    SampleSubTypeDto.push(convertedBrandsDtos);
                });
                const response = new AllItemTypeResponseModel(true, 11108, "ItemType retrieved successfully",SampleSubTypeDto);
                return response;
            } else {
                throw new AllItemTypeResponseModel(false,99998, 'Data not found'); 
            }
        } catch (err) {
            return err;
        }
    }
      // async getAllActiveSizes(): Promise<AllSizeResponseModel> {
      //   // const page: number = 1;
      //   // const response = new AllSizeResponseModel();
      //   try {
      //     const sizesDTO: SizeDto[] = [];
      //     //retrieves all companies
      //     const SizeEntity: Size[] = await this.SizeRepository.find({where:{"isActive":true},order :{'size':'ASC'}});
      //     //console.log(statesEntities);
          
      //     if (SizeEntity) {
      //       // converts the data fetched from the database which of type companies array to type StateDto array.
      //       SizeEntity.forEach(SizeEntity => {
      //         const convertedSizeDto: Size = this.SizeAdapter.convertEntityToDto(
      //           SizeEntity
      //         );
      //         sizesDTO.push(convertedSizeDto);
      //       });
    
      //       //generated response
  
      //       const response = new AllSizeResponseModel(true,1,'Size retrieved successfully',sizesDTO);
      //       return response;
      //     } else {
      //       throw new SizeResponseModel(false,99998, 'Data not found');
      //     }
      //     // return response;
      //   } catch (err) {
      //     return err;
      //   }
      // }  
      
      async activateOrDeactivateItemType(itemReq: ItemTypeRequest): Promise<ItemTypeResponseModel> {
        try {
            const itemExists = await this.getItemtypeById(itemReq.itemTypeId);
            if (itemExists) {
              
                if (!itemExists) {
                    throw new ItemTypeResponseModel(false,10113, 'Someone updated the current ItemType information.Refresh and try again');
                } else {
                    
                        const ItemTypeStatus =  await this.ItemTypeRepository.update(
                            { itemTypeId: itemReq.itemTypeId },
                            { isActive: itemReq.isActive,updatedUser: itemReq.updatedUser });
                       
                        if (itemExists.isActive) {
                            if (ItemTypeStatus.affected) {
                                const Response: ItemTypeResponseModel = new ItemTypeResponseModel(true, 10115, 'ItemType is de-activated successfully');
                                return Response;
                            } else {
                                throw new ItemTypeResponseModel(false,10111, 'ItemType is already deactivated');
                            }
                        } else {
                            if (ItemTypeStatus.affected) {
                                const sizesResponse: ItemTypeResponseModel = new ItemTypeResponseModel(true, 10114, 'ItemType is activated successfully');
                                return sizesResponse;
                            } else {
                                throw new ItemTypeResponseModel(false,10112, 'ItemType is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ItemTypeResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

   
    async getActiveItemTypeById(itemReq: ItemTypeRequest): Promise<ItemTypeResponseModel> {
        try {
            //retrieves all companies
            const sizeEntities: ItemTypeEntity = await this.ItemTypeRepository.findOne({
              where:{itemTypeId:itemReq.itemTypeId}
              });
              
              const sized: ItemTypeDtos = this.ItemTypeAdapter.convertEntityToDto(sizeEntities);
              if (sized) {
                  const response = new ItemTypeResponseModel(true, 11101 , 'ItemType  retrived Successfully',[sized]);
                  return response;
              }
              else{
                  throw new ItemTypeResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getItemtypeById(itemTypeId: number): Promise<ItemTypeEntity> {
        //  console.log(employeeId);
            const Response = await this.ItemTypeRepository.findOne({
            where: {itemTypeId: itemTypeId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        } 

        async getItemTypeForDivisionDropDown(req:DivisionRequest ): Promise<ItemTypeDropDownResponse> {
          try {
              const itemEntities: ItemTypeDropDownDto[] = await this.ItemTypeRepository
                  .createQueryBuilder('itemType')
                  .select('item_type_id   as itemTypeId, item_type as itemType, ')
                  .where(`is_active=1 and division_id='${req.divisionId}'`)
                  .orderBy('itemType')
                  .getRawMany();
  
              if (itemEntities && itemEntities.length > 0) {
                  const response = new ItemTypeDropDownResponse(true, 11108, "ItemType  retrieved successfully", itemEntities);
                  return response;
              } else {
                  throw new ItemTypeDropDownResponse(false,99998, 'Data not found');
              }
          } catch (err) {
              return err;
          }
      }
      async getItemTypeForProductGroupDropDown(req:ProductGroupRequest ): Promise<ItemTypeDropDownResponse> {
        try {
            const ItemEntities: ItemTypeDropDownDto[] = await this.ItemTypeRepository
                .createQueryBuilder('itemType')
                .select('item_type_id   as itemTypeId, item_type as itemType, ')
                .where(`is_active=1 and product_group_id='${req.productGroupId}'`)
                .orderBy('itemType')
                .getRawMany();

            if (ItemEntities && ItemEntities.length > 0) {
                const response = new ItemTypeDropDownResponse(true, 11108, "ItemType  retrieved successfully", ItemEntities);
                return response;
            } else {
                throw new ItemTypeDropDownResponse(false,99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }
}