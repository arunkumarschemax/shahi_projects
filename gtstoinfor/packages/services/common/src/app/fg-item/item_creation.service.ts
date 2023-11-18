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
import { CommonResponseModel, ItemCreFilterRequest, FgItemCreIdRequest, CustomerOrderStatusEnum, SubContractStatus, ItemCreationDTO, ItemcreationResponseModel } from '@project-management-system/shared-models';
import { groupBy } from 'rxjs';
import e = require('express');


@Injectable()
export class ItemCreationService {
    constructor(
        @InjectRepository(ItemCreation) private itemCreationRepository: Repository<ItemCreation>,
        private itemCreationAdapter: ItemCreationAdapter,
        private repository: ItemCreationRepository,
        private readonly dataSource: DataSource,

    ) { }

    async createItem(itemCreationDto: ItemCreationDto, isUpdate: boolean): Promise<ItemcreationResponseModel> {
        console.log(itemCreationDto,"service");
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);

        try {
             console.log(itemCreationDto);
            // const convertedItemCreationEntity: ItemCreation = this.itemCreationAdapter.convertDtoToEntity(itemCreationDto, isUpdate);
            // console.log(convertedItemCreationEntity,'entity');
            
            // const savedItemCreationEntity: ItemCreation = await this.itemCreationRepository.save(convertedItemCreationEntity);
            // console.log(savedItemCreationEntity,'saved');
            
            // const savedItemCreationDto: ItemCreationDto = this.itemCreationAdapter.convertEntityToDto(savedItemCreationEntity);
            // console.log(savedItemCreationDto,'dtoooooooooo');
            await transactionalEntityManager.startTransaction();

            const entities = new ItemCreation();
            entities.altUoms=  itemCreationDto.altUoms;
            entities.approver=itemCreationDto.approver;
            entities.basicUom=itemCreationDto.basicUom;
            entities.brandId=itemCreationDto.brandId;
            entities.businessArea=itemCreationDto.businessArea;
            entities.buyingHouseCommision=itemCreationDto.buyingHouseCommision;
            entities.categoryId=itemCreationDto.categoryId;
            entities.composition=itemCreationDto.composition;
            entities.conversionFactor=itemCreationDto.conversionFactor;
            entities.currency=itemCreationDto.currency;
            entities.customGroupId=itemCreationDto.customGroupId;
            entities.description=itemCreationDto.description;
            entities.facilityId=itemCreationDto.facilityId;
            entities.factoryMerchant=itemCreationDto.factoryMerchant;
            entities.firstExFactoryDate=itemCreationDto.firstExFactoryDate;
            entities.groupTechClass=itemCreationDto.groupTechClass;
            entities.internalStyleId=itemCreationDto.internalStyleId;
            entities.isSubContract=itemCreationDto.isSubContract;
            entities.itemCode=itemCreationDto.itemCode;
            entities.itemGroup=itemCreationDto.itemGroup;
            entities.itemName=itemCreationDto.itemName;
            entities.itemTypeId=itemCreationDto.itemTypeId;
            entities.licenseId=itemCreationDto.licenseId;
            entities.moq=itemCreationDto.moq;
            entities.nationalDbk=itemCreationDto.nationalDbk;
            entities.noOfLacePanel=itemCreationDto.noOfLacePanel;
            entities.orderCloseDate=itemCreationDto.orderCloseDate;
            entities.orderConfirmedDate=itemCreationDto.orderConfirmedDate;
            entities.orderQty=itemCreationDto.orderQty;
            entities.pdMerchant=itemCreationDto.pdMerchant;
            entities.productDesignerId=itemCreationDto.productDesignerId;
            entities.productGroup=itemCreationDto.productGroup;
            entities.productionMerchant=itemCreationDto.productionMerchant;
            entities.projectionOrder=itemCreationDto.projectionOrder;
            entities.range=itemCreationDto.range;
            entities.reference=itemCreationDto.reference;
            entities.responsiblePersonId=itemCreationDto.responsiblePersonId;
            entities.roslGroup=itemCreationDto.roslGroup;
            entities.salePersonId=itemCreationDto.salePersonId;
            entities.salePrice=itemCreationDto.salePrice;
            entities.salePriceQty=itemCreationDto.salePriceQty;
            entities.searchGroup=itemCreationDto.searchGroup;
            entities.season=itemCreationDto.season;
            entities.styleNo=itemCreationDto.styleNo;
            entities.subCategoryId=itemCreationDto.subCategoryId;
            entities.targetCurrency=itemCreationDto.targetCurrency;
            
            entities.uom=itemCreationDto.uom;
         if(!isUpdate){
    entities.fgitemId=itemCreationDto.fgitemId;
    entities.updatedUser=itemCreationDto.updatedUser;
}else{
    entities.createdUser=itemCreationDto.updatedUser;
}
const savedResult = await this.itemCreationRepository.save(entities)
// const itemInfo = new ItemCreationDTO(savedResult.altUoms,savedResult.approver,savedResult.basicUom,savedResult.brandId,savedResult.businessArea,savedResult.businessArea,savedResult.buyingHouseCommision,savedResult.categoryId,savedResult.composition,savedResult.conversionFactor,savedResult.currency,savedResult.customGroupId,savedResult.description,savedResult.facilityId,savedResult.factoryMerchant,savedResult.fgitemId,savedResult.fgitemId,savedResult.firstExFactoryDate,savedResult.groupTechClass,savedResult.internalStyleId,savedResult.internalStyleId,savedResult.isSubContract,savedResult.isSubContract,savedResult.itemCode,savedResult.itemGroup,savedResult.itemName,savedResult.itemTypeId,savedResult.licenseId,savedResult.moq,savedResult.nationalDbk,savedResult.noOfLacePanel,savedResult.orderCloseDate,savedResult.orderConfirmedDate,savedResult.orderQty,savedResult.pdMerchant,savedResult.productDesignerId,savedResult.productDesignerId,savedResult.productGroup,savedResult.productionMerchant,savedResult.projectionOrder,savedResult.projectionOrder,savedResult.range,savedResult.reference,savedResult.responsiblePersonId,savedResult.roslGroup,savedResult.salePersonId,savedResult.salePersonId,savedResult.salePrice,savedResult.salePriceQty,savedResult.searchGroup,savedResult.season,savedResult.styleNo,savedResult.styleOrderInfo,savedResult.subCategoryId,savedResult.targetCurrency,savedResult.uom)
// await transactionalEntityManager.completeTransaction()
                    // return new CoLineResponseModel(true,1,'Created successfully',[])
                    await transactionalEntityManager.completeTransaction()
                    // return new CommonResponseModel(true,1,'Created successfully',[])
                    if(savedResult){
                return new CommonResponseModel (true,0,isUpdate? 'Item Updated Successfully':'Item created Successfully',[])
                       
                    } else {
                return new CommonResponseModel (false,0,"Something went Wrong")
                         
                    }
                        

        } catch (err){
            return err;
        }
    }

    //     })
    //         if (savedItemCreationDto) {
    //             // generating resposnse
    //             const response = new CommonResponseModel(true, isUpdate ? 11101 : 11100, isUpdate ? 'Item Updated Successfully' : 'Item Created Successfully', savedItemCreationDto);
    //             return response;
    //         } else {
    //             const response = new CommonResponseModel(false, 0, 'Something went wrong');
    //             return response;
    //         }
    //     } catch (error) {
    //         return error;
    //     }
    // }

    async getFgItemsDropdown(req?:FgItemCreIdRequest):Promise<CommonResponseModel>{
        try{
            const data = await this.itemCreationRepository.find({select:['fgitemId','itemName','itemCode','salePrice','salePriceQty','currency'],where:{fgitemId:req.fgItemId}})
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


