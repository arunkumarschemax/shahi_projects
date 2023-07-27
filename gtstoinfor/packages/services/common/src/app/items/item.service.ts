import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository } from './dto/item-repository';
import { AllItemsResponseModel, ItemsDto } from '@project-management-system/shared-models';
import { Item } from './item-entity';

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
    
}