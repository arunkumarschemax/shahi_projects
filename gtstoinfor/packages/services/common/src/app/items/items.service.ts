import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { ItemsDTO } from './dto/items.dto';
import { Items } from './items.entity';
import { ItemsAdapter } from './dto/items.adapter';
import { AllItemsResponseModel,CommonResponseModel,ItemsResponseModel } from '@project-management-system/shared-models';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsRequest } from '@project-management-system/shared-models';
import { ItemsRepository } from './items.repo';

@Injectable()
export class ItemsService {
  
    constructor(
      
        @InjectRepository(Items)
        private itemsRepository: ItemsRepository,
        private itemsAdapter: ItemsAdapter,
    ){}

    async getItemDetailsWithoutRelations(item: string): Promise<Items> {
        const itemResponse = await this.itemsRepository.findOne({
          where: {itemId: Raw(alias => `item = '${item}'`)},
        });
        if (itemResponse) {
          return itemResponse;
        } else {
          return null;
        }
      }

      async createItem(ItemDto: ItemsDTO, isUpdate: boolean): Promise<ItemsResponseModel> {
        
        try {
          let previousValue
          if (!isUpdate) {
            const ItemEntity = await this.getItemDetailsWithoutRelations(ItemDto.item);
            if (ItemEntity) {
              throw new ItemsResponseModel(false,11104, 'Item already exists');
            }
          }
          else{
            const certificatePrevious = await this.itemsRepository.findOne({where:{itemId:ItemDto.itemId}})
            previousValue = certificatePrevious.item
            const itemEntity = await this.getItemDetailsWithoutRelations(ItemDto.item);
            if (itemEntity) {
              if(itemEntity.itemId!=ItemDto.itemId) {
                throw new ItemsResponseModel(false,11104, 'Item already exists');      
              }
            }
          }
          const convertedItemEntity: Items = this.itemsAdapter.convertDtoToEntity(ItemDto,isUpdate);
          const savedItemEntity: Items = await this.itemsRepository.save( convertedItemEntity);
          const savedItemDto: ItemsDTO = this.itemsAdapter.convertEntityToDto(savedItemEntity);
          if (savedItemDto) {
            const presentValue = savedItemDto.item;
           const response = new ItemsResponseModel(true,1,isUpdate? 'Items Updated Successfully': 'Items Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Items Updated Successfully': 'Items Created Successfully'
           const userName = isUpdate? savedItemDto.updatedUser :savedItemDto.createdUser;
        
           return response
          } else {
            throw new ItemsResponseModel(false,11106,'Items saved but issue while transforming into DTO');
          }
        } catch (error) {
         
          return error;
        }
      }  

      async getAllItems(): Promise<CommonResponseModel> {
        try {
            const info = await this.itemsRepository.find()
            if (info) {
                return new CommonResponseModel(true, 1, 'Data retrieved', info)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            return new CommonResponseModel(false, 0, 'Something went wrong', err)
        }
    }
      async getAllActiveItems(): Promise<AllItemsResponseModel> {
        // const page: number = 1;
        try {
            const ItemsDtos: ItemsDTO[] = [];
            //retrieves all companies
            const itemEntities: Items[] = await this.itemsRepository.find({ order: { 'item': 'ASC' },where:{isActive:true}
           });
        //  console.log(CurrenciesEntities)
            if (itemEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                itemEntities.forEach(Item => {
                    const convertedItemDtos: ItemsDTO = this.itemsAdapter.convertEntityToDto(
                      Item
                    );
                    ItemsDtos.push(convertedItemDtos);
                });
                const response = new AllItemsResponseModel(true, 11108, "Currencies retrieved successfully", ItemsDtos);
                return response;
            } else {
                throw new ItemsResponseModel(false,99998, 'Data not found'); ItemsDtos
            }
        } catch (err) {
            return err;
        }
    }
      async activateOrDeactivateItems(itemReq: any): Promise<ItemsResponseModel> {
        try {
            const itemExists = await this.getItemById(itemReq.currencyId);
            if (itemExists) {
                if (itemReq.versionFlag !== itemExists.versionFlag) {
                    throw new ItemsResponseModel(false,10113, 'Someone updated the current items information.Refresh and try again');
                } else {
                    
                        const itemstatus =  await this.itemsRepository.update(
                            { itemId: itemReq.itemId },
                            { isActive: itemReq.isActive,updatedUser: itemReq.updatedUser });
                       
                        if (itemExists.isActive) {
                            if (itemstatus.affected) {
                                const itemResponse: ItemsResponseModel = new ItemsResponseModel(true, 10115, 'items is Deactivated Successfully');
                                return itemResponse;
                            } else {
                                throw new ItemsResponseModel(false,10111, 'items is already deactivated');
                            }
                        } else {
                            if (itemstatus.affected) {
                                const itemrespose: ItemsResponseModel = new ItemsResponseModel(true, 10114, 'items is Activated Successfully');
                                return itemrespose;
                            } else {
                                throw new ItemsResponseModel(false,10112, 'items is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ItemsResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
      async getActiveItemsById(itemReq: ItemsRequest): Promise<ItemsResponseModel> {
        try {
            //retrieves all companies
            const itemEntities: Items = await this.itemsRepository.findOne({
              where:{itemId:itemReq.itemId}
              });
              
              const itemsData: ItemsDTO = this.itemsAdapter.convertEntityToDto(itemEntities);
              if (itemsData) {
                  const response = new ItemsResponseModel(true, 11101 , 'Item Retrived Successfully',itemsData);
                  return response;
              }
              else{
                  throw new ItemsResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getItemById(itemId: number): Promise<Items> {
        //  console.log(employeeId);
            const Response = await this.itemsRepository.findOne({
            where: {itemId: itemId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
