import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ItemCreationAdapter } from './dto/item_creation.adapter';
import { ItemCreationDto } from './dto/item-creation.dto';
import { ItemCreation } from './item_creation.entity';
import { error } from 'console';
import { ItemCreationRepository } from './item-repo/item-creation.repository';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { StyleOrder } from '../style-order/style-order.entity';
import { CommonResponseModel, ItemCreFilterRequest, FgItemCreIdRequest, CustomerOrderStatusEnum, SubContractStatus } from '@project-management-system/shared-models';
import { groupBy } from 'rxjs';


@Injectable()
export class ItemCreationService {
    constructor(
        @InjectRepository(ItemCreation) private itemCreationRepository: Repository<ItemCreation>,
        private itemCreationAdapter: ItemCreationAdapter,
        private repository: ItemCreationRepository,
        private readonly dataSource: DataSource,

    ) { }

    async createItem(itemCreationDto: ItemCreationDto, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
            console.log(itemCreationDto);
            const convertedItemCreationEntity: ItemCreation = this.itemCreationAdapter.convertDtoToEntity(itemCreationDto, isUpdate);
            const savedItemCreationEntity: ItemCreation = await this.itemCreationRepository.save(convertedItemCreationEntity);
            const savedItemCreationDto: ItemCreationDto = this.itemCreationAdapter.convertEntityToDto(savedItemCreationEntity);
            if (savedItemCreationDto) {
                // generating resposnse
                const response = new CommonResponseModel(true, isUpdate ? 11101 : 11100, isUpdate ? 'Item Updated Successfully' : 'Item Created Successfully', savedItemCreationDto);
                return response;
            } else {
                const response = new CommonResponseModel(false, 10101, 'Something went wrong');
                return response;
            }
        } catch (error) {
            return error;
        }
    }

    async getFgItemsDropdown():Promise<CommonResponseModel>{
        try{
            const data = await this.itemCreationRepository.find({select:['fgitemId','itemName','itemCode','salePrice','salePriceQty','currency']})
            if(data.length >0){
                return new CommonResponseModel(true,1,'Data retrieved',data)
            } else{
                return new CommonResponseModel(false,0,'No data found')
            }
        } catch(err){
            return err
        }
    }

    async getAllFgItems(req?:ItemCreFilterRequest):Promise<CommonResponseModel>{
        try{
            const data = await this.repository.getAllFgItemCrted(req)
            if(data.length === 0){
                return new CommonResponseModel(false,0,'No data found')
            } else{
                return new CommonResponseModel(true,1,'Data retrieved',data)

            }
        } catch(err){
            return err
        }
    }
    async cancelOrder(req:FgItemCreIdRequest):Promise<CommonResponseModel>{
        
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try{
            await transactionalEntityManager.startTransaction();
            const updateStatus = await transactionalEntityManager.getRepository(ItemCreation).update({fgitemId:req.fgItemId},{isSubContract:SubContractStatus.NO});
           
            if(updateStatus.affected > 0){
                
                await transactionalEntityManager.completeTransaction();
                return new CommonResponseModel(true,1,'Item Cancelled Successfully. ',)
           }
            else{
                await transactionalEntityManager.releaseTransaction();
                return new CommonResponseModel(false,0,'Cancel Item failed. ',)
            }
        } catch(err){
            throw err
        }
       }
       async getAll():Promise<CommonResponseModel>{
        try{
            const data = await this.repository.getAll()
            if(data.length === 0){
                return new CommonResponseModel(false,0,'No data found')
            } else{
                return new CommonResponseModel(true,1,'Data retrieved',data)

            }
        } catch(err){
            return err
        }
    }
    async getAllStyleDropDown():Promise<CommonResponseModel>{
        try{
            const data = await this.repository.getAllstyle()
            if(data.length === 0){
                return new CommonResponseModel(false,0,'No data found')
            } else{
                return new CommonResponseModel(true,1,'Data retrieved',data)

            }
        } catch(err){
            return err
        }
    }
    async getAllItemDropDown():Promise<CommonResponseModel>{
        try{
            const data = await this.repository.getAllitems()
            if(data.length === 0){
                return new CommonResponseModel(false,0,'No data found')
            } else{
                return new CommonResponseModel(true,1,'Data retrieved',data)

            }
        } catch(err){
            return err
        }
    }
    async getAllBrandDropDown():Promise<CommonResponseModel>{
        try{
            const data = await this.repository.getBrand()
            if(data.length === 0){
                return new CommonResponseModel(false,0,'No data found')
            } else{
                return new CommonResponseModel(true,1,'Data retrieved',data)

            }
        } catch(err){
            return err
        }
    }
}


