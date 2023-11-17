import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { ItemGroupEnum, ItemGroupResponseModel } from '@project-management-system/shared-models';
import { AllItemGroupResponseModel,ItemGroupDto,ItemgroupDropDownResponse } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
// import { SizeAdapter } from './dto/sizes-adapter';
import {ItemGroup} from './item-group.entity'
import { ItemGroupRequestDto } from '@project-management-system/shared-models';
import {ItemGroupRequest} from './dto/item-group.request'
import { Console } from 'console';
import { ItemGroupAdapter } from './dto/item-group.adapter';

@Injectable()
export class ItemGroupService{
    constructor(
        @InjectRepository(ItemGroup)

        private ItemGroupRepository: Repository<ItemGroup>,
        private ItemAdapter: ItemGroupAdapter,

        ){}
    
        async getItemGroupWithoutRelations(itemgroup: string): Promise<ItemGroup>{
          const ItemGroupResponse = await this.ItemGroupRepository.findOne({
            where: {itemGroup: Raw(alias => `item_group = '${itemgroup}'`)},
          });
          if(ItemGroupResponse){
            return ItemGroupResponse;
          }
          else{
            return null;
          }
        }

      //   async createItemGroup(itemgroupDTO: ItemGroupDto, isUpdate: boolean): Promise<ItemGroupResponseModel>{
  
      //     // const response = new PaymentMethodResponseModel();
      //     try{
            
      //       let previousValue
      //       console.log(previousValue,"previousValue");

      //     const ItemGroupDtos: ItemGroupDto[] = [];
  
      //       if(!isUpdate){
      //         const ItemEntity = await this.getItemGroupWithoutRelations(itemgroupDTO.itemGroup);
      //         if (ItemEntity){
      //           throw new ItemGroupResponseModel(false,11104, 'itemGroup  already exists'); 
      //         }
      //       }
      //       else{
      //         const certificatePrevious = await this.ItemGroupRepository.findOne({where:{itemGroupId:itemgroupDTO.itemGroupId}})
      //         previousValue =(certificatePrevious.itemGroup)
      //         const ItemEntity = await this.getItemGroupWithoutRelations(itemgroupDTO.itemGroup);
      //         if (ItemEntity){
      //           if(ItemEntity.itemGroupId != itemgroupDTO.itemGroupId ){
      //             throw new ItemGroupResponseModel(false,11104, 'ItemGroup already exists'); 
      //           }
      //         }
      //       }
      //       const convertedItemEntity: ItemGroup = this.ItemAdapter.convertDtoToEntity(itemgroupDTO,isUpdate);
  
      //       console.log(convertedItemEntity);
      //     const savedItemGroupEntity: ItemGroup = await this.ItemGroupRepository.save(convertedItemEntity);
      //     const savedItemGroupDto: ItemGroupDto = this.ItemAdapter.convertEntityToDto(savedItemGroupEntity);
      //     ItemGroupDtos.push(savedItemGroupDto)
      //       console.log(savedItemGroupDto);
      //     if (savedItemGroupDto) {
      //       const presentValue = itemgroupDTO.itemGroup;
        
     
      //       const name=isUpdate?'updated':'created'
      //       const displayValue = isUpdate? 'ItemGroup Updated Successfully': 'ItemGroup Created Successfully'
      //       const userName = isUpdate? savedItemGroupDto.updatedUser :savedItemGroupDto.createdUser;
      //         // const newLogDto = new LogsDto(1,name, 'PaymentMethod', savedPaymentMethodDto.paymentMethodId, true, displayValue,userName,previousValue,presentValue)
      //         // let res = await this.logService.createLog(newLogDto);
      //         // /console.log(res);
      //         const response = new AllItemGroupResponseModel(true,1000,isUpdate? 'ItemGroup Updated Successfully': 'ItemGroup Created Successfully');
      //       return response;
      //     } else {
      //       //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
      //       throw new AllItemGroupResponseModel(false,11106,'ItemGroup saved but issue while transforming into DTO');
      //     }
      //     // return response;
      //   } catch (error) {
      //     // when error occures while saving the data , the execution will come to catch block.
      //     // tslint:disable-next-line: typedef
      //     return error;
      //   }
      // }
      async createItemGroup(itemgroupDTO: ItemGroupDto, isUpdate: boolean): Promise<ItemGroupResponseModel> {
        console.log(itemgroupDTO, "previousValue");
        try {
          let previousValue;
      
       
      
          const ItemGroupDtos: ItemGroupDto[] = [];
      
          if (!isUpdate) {
            const ItemEntity = await this.getItemGroupWithoutRelations(itemgroupDTO.itemGroup);
            if (ItemEntity) {
              throw new ItemGroupResponseModel(false, 11104, 'ItemGroup already exists');
            }
          } else {
            const certificatePrevious = await this.ItemGroupRepository.findOne({ where: { itemGroupId: itemgroupDTO.itemGroupId } });
            previousValue = certificatePrevious.itemGroup;
            const ItemEntity = await this.getItemGroupWithoutRelations(itemgroupDTO.itemGroup);
            if (ItemEntity) {
              if (ItemEntity.itemGroupId != itemgroupDTO.itemGroupId) {
                throw new ItemGroupResponseModel(false, 11104, 'ItemGroup already exists');
              }
            }
          }
      

          const convertedItemEntity: ItemGroup = this.ItemAdapter.convertDtoToEntity(itemgroupDTO, isUpdate);
          const savedItemEntity:ItemGroup = await this.ItemGroupRepository.save(convertedItemEntity);
          const savedItemGroupDto: ItemGroupDto = this.ItemAdapter.convertEntityToDto(savedItemEntity);
          ItemGroupDtos.push(savedItemGroupDto);          
          console.log(savedItemGroupDto,"pppppppppppp");
      
          // if (savedItemGroupDto) {
          //   const presentValue=
          //   await this.ItemGroupRepository.update({ itemGroupId: itemgroupDTO.itemGroupId }, convertedItemEntity);
          // } else {
          //   await this.ItemGroupRepository.save(convertedItemEntity);
          // }
      
          // const savedItemGroupDto: ItemGroupDto = this.ItemAdapter.convertEntityToDto(convertedItemEntity);
          // ItemGroupDtos.push(savedItemGroupDto);
          // console.log(savedItemGroupDto );
      
          if (savedItemGroupDto) {
            const presentValue = itemgroupDTO.itemGroup;
      
            const name = isUpdate ? 'updated' : 'created';
            const displayValue = isUpdate ? 'ItemGroup Updated Successfully' : 'ItemGroup Created Successfully';
            const userName = isUpdate ? savedItemGroupDto.updatedUser : savedItemGroupDto.createdUser;
      
            const response = new AllItemGroupResponseModel(true, 1000, displayValue);
            return response;
          } else {
            throw new AllItemGroupResponseModel(false, 11106, 'ItemGroup saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      

      async getAllItemGroup(): Promise<AllItemGroupResponseModel> {
       
        try {
          const itemdto: ItemGroupDto[] = [];
          const itementity: ItemGroup[] = await this.ItemGroupRepository.find({ 
            order :{itemGroup:'ASC'},
          });
          if (itementity.length > 0) {
            itementity.forEach(itementity => {
              const convertedsizeDto: ItemGroupDto = this.ItemAdapter.convertEntityToDto(
                itementity
              );
              itemdto.push(convertedsizeDto);
            });
    
            //generated response
  
            const response = new AllItemGroupResponseModel(true,11208,'size retrieved successfully',itemdto);
        
            return response;
          } else {
            throw new AllItemGroupResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  
      async activateOrDeactivateItemGroup(profitReq: ItemGroupRequest): Promise<ItemGroupResponseModel> {
        try {
            const deptExists = await this.getItemGroupById(profitReq.itemGroupId);
            if (deptExists) {
                if (!deptExists) {
                    throw new ItemGroupResponseModel(false,10113, 'Someone updated the current  ItemGroup information.Refresh and try again');
                } else {
                    
                        const DepartmentStatus =  await this.ItemGroupRepository.update(
                            { itemGroupId: profitReq.itemGroupId },
                            { isActive: profitReq.isActive,updatedUser: profitReq.updatedUser });
                       
                        if (deptExists.isActive) {
                            if (DepartmentStatus.affected) {
                                const DepartmentResponse: ItemGroupResponseModel = new ItemGroupResponseModel(true, 10115, 'ItemGroup is de-activated successfully');
                                return DepartmentResponse;
                            } else {
                                throw new ItemGroupResponseModel(false,10111, 'ItemGroup is already deactivated');
                            }
                        } else {
                            if (DepartmentStatus.affected) {
                                const DepartResponse: ItemGroupResponseModel = new ItemGroupResponseModel(true, 10114, 'ItemGroup is activated successfully');
                                return DepartResponse;
                            } else {
                                throw new ItemGroupResponseModel(false,10112, 'Department is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ItemGroupResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

      async getAllActiveItemGroup(): Promise<AllItemGroupResponseModel> {
        // const page: number = 1;
        // const response = new AllProfitCenterResponseModel();
        try {
          const groupDTO: ItemGroupDto[] = [];
          //retrieves all companies
          const groupEntity: ItemGroup[] = await this.ItemGroupRepository.find({where:{"isActive":true},order :{'itemGroup':'ASC'}});
          //console.log(statesEntities);
          
          if (groupEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            groupEntity.forEach(groupEntity => {
              const convertedDepartDto: ItemGroupDto = this.ItemAdapter.convertEntityToDto(
                groupEntity
              );
              groupDTO.push(convertedDepartDto);
            });
    
            //generated response
  
            const response = new AllItemGroupResponseModel(true,1,'Department retrieved successfully',groupDTO);
            return response;
          } else {
            throw new AllItemGroupResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  

      async getActiveItemGroupById(profitReq: ItemGroupRequest): Promise<ItemGroupResponseModel> {
        try {
            //retrieves all companies
            const Entities: ItemGroup = await this.ItemGroupRepository.findOne({
              where:{itemGroupId:profitReq.itemGroupId}
              });
                            const departHead: ItemGroupDto = this.ItemAdapter.convertEntityToDto(Entities);
              if (departHead) {
                  const response = new ItemGroupResponseModel(true, 11101 , 'ItemGroup  retrived Successfully');
                  return response;
              }
              else{
                  throw new ItemGroupResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getItemGroupById(itemgroupId: number): Promise<ItemGroup> {
      //  console.log(employeeId);
          const Response = await this.ItemGroupRepository.findOne({
          where: {itemGroupId: itemgroupId},
          });
          // console.log(employeeResponse);
          if (Response) {
          return Response;
          } else {
          return null;
          }
      } 
}