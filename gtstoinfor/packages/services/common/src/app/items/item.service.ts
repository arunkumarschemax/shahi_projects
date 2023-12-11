import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository } from './dto/item-repository';
import { AllItemsResponseModel, CommonResponseModel, ItemsDto } from '@project-management-system/shared-models';
import { Item } from './item-entity';
import { ItemIdReq } from './dto/item-id-req';
import { ItemCategory } from '../item-categories/item-categories.entity';
import { ItemSubCategory } from '../item-sub-categories/item-sub-category.entity';
import { ItemView } from './item.view.entity';
import { DataSource } from "typeorm";

@Injectable()

export class ItemsService{
    constructor(
        private itemsRepo:ItemsRepository,
        private dataSource: DataSource,
    ){}

    async creteItems(req: ItemsDto, isUpdate: boolean):Promise<AllItemsResponseModel>{
        try{
            const itemEntity = new Item()
            itemEntity.itemName=req.itemName
            itemEntity.itemCode=req.itemCode
            const itemCategoryEntity = new ItemCategory()
            itemCategoryEntity.itemCategoryId =req.itemCategoryId
            itemEntity.itemCategory=itemCategoryEntity

            const itemSubcategoryEntity = new ItemSubCategory()
            itemSubcategoryEntity.itemSubCategoryId=req.itemSubCategoryId

            itemSubcategoryEntity.itemSubCategoryId=req.itemSubCategoryId
            itemEntity.itemSubCategory=itemSubcategoryEntity
            itemEntity.hsnCode=req.hsnCode
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

    // async getAllItems():Promise<CommonResponseModel>{
    //     let items:ItemsDto[]=[]
    //     const data = await this.itemsRepo.getItem();
    //     const manager = this.dataSource;
    //     // const dataSource = new DataSource()
       
    //     // const result = await manager.query(query)
    //     // const res = await this.dataSource.manager.find(ItemView,{where:{brandId:1,itemCode:'UQ-FAB-01'}})
    //     const res = await this.dataSource.manager.find(ItemView)
        
    //     if(data.length >0){

    //         return new CommonResponseModel(true,1,'Items Retrived Sucessfully..',res)
    //     }else{
    //         return new AllItemsResponseModel(false,0,'No Items Found..',[])

    //     }
    // }
   
       
    async getAllItems():Promise<CommonResponseModel>{
        const style = await this.itemsRepo.find({
            order:{itemName:'ASC'}
        })
        console.log(style);
        if(style.length >0){
            return new CommonResponseModel(true,1,'Active Categories Retrived Sucessfully',style)
        }else{
            return new CommonResponseModel(false,0,'No  Categories Found ',[])

        }

    }
}