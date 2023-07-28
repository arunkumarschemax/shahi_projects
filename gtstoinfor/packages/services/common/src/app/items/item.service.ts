import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository } from './dto/item-repository';
import { AllItemsResponseModel, ItemsDto } from '@project-management-system/shared-models';
import { Item } from './item-entity';
import { ItemIdReq } from './dto/item-id-req';

@Injectable()

export class ItemsService{
    constructor(
        private itemsRepo:ItemsRepository
    ){}

    async creteItems(req: ItemsDto, isUpdate: boolean):Promise<AllItemsResponseModel>{
        try{
            const itemEntity = new Item()
            itemEntity.itemName=req.itemName
            itemEntity.itemCode=req.itemCode
            itemEntity.itemCategoryId=req.itemCategoryId
            itemEntity.itemSubCategoryId=req.itemSubCategoryId
            itemEntity.itemSubCategoryId=req.itemSubCategoryId
            itemEntity.brandId=req.brandId
            itemEntity.minQuantity=req.minQuantity
            itemEntity.uomId=req.uomId
            itemEntity.remarks=req.remarks
            if (isUpdate) {
                itemEntity.itemId = req.itemId;
                itemEntity.updatedUser = req.updatedUser
            } else {
                itemEntity.createdUser = req.createdUser;
            }
          const save = await this.itemsRepo.save(itemEntity)
          if (save) {
              return new AllItemsResponseModel(true, 0, isUpdate ? 'Items Updated Sucessfully' : 'Routes creted sucessfuly', [])
          }

        }
        catch(error){
            throw error
        }
    }
    async ActivateOrDeactivateItem(req: ItemIdReq): Promise<AllItemsResponseModel> {
        const itemdetails = await this.itemsRepo.findOne({ where: { itemId: req.itemId } })
        if (itemdetails) {
            if (req.versionFlag != itemdetails.versionFlag) {
                throw new AllItemsResponseModel(false, 1, 'SomeOne updated. Referesh and try again', [])
            } else {
                const itemUpdate = await this.itemsRepo.update({ itemId: req.itemId }, { isActive: req.isActive})
                if (itemdetails.isActive) {
                    console.log('activeeeee')
                    if (itemUpdate.affected) {
                        return new AllItemsResponseModel(true, 0, 'Item is de-activated successfully', [])
                    } else {
                        throw new AllItemsResponseModel(false, 1, 'Item already deactivated', [])
                    }
                } else {
                    if (itemUpdate.affected) {
                        return new AllItemsResponseModel(true, 0, 'Item is activated successfully', [])
                    } else {
                        throw new AllItemsResponseModel(false, 1, 'Item already activated', [])
                    }
                }
            }
        }
        else {
            throw new AllItemsResponseModel(false, 1, 'No record found', [])

        }

    }
    
}