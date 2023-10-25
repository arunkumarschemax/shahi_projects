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
    
    // async getAllItemGroup(): Promise<AllItemGroupResponseModel> {
       
    //     try {
    //      const data = await this.ItemGroupRepository.find()
    //      let record =[]
    //      for(const res of data ){
    //      if(data.length>0)
    //      {
    //         record.push(new ItemGroupDto(res.itemGroupId,ItemGroupEnum.FG,res.isActive,res.createdUser,res.updatedUser,res.versionFlag))
    //      }
    //     }
    //     } catch (err) {
    //       return err;
    //     }
    //   }  
   
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
}