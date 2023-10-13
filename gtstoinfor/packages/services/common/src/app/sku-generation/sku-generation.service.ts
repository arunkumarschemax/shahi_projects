import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemSkus } from "./sku-generation.entity";
import { DataSource, Repository } from "typeorm";
import { ColorInfoReq, CommonResponseModel, DestinationInfoReq, ItemCodeReq, ItemSKusModel, ItemSKusReq, SKUGenerationResponseModel, SizeInfoReq, SKUlistFilterRequest, SkuStatusEnum } from "@project-management-system/shared-models";
import { Item } from "../items/item-entity";
import { Destination } from "../destination/destination.entity";
import { Size } from "../sizes/sizes-entity";
import { Colour } from "../colours/colour.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { ItemSkuRepository } from "./sku-generation-repo";
import { Style } from "../style/dto/style-entity";

@Injectable()
export class ItemSkuService{
    constructor(
        // @InjectRepository(ItemSkus)
        // private itemSkuRepo: Repository<ItemSkus>,
        private readonly dataSource: DataSource,
        private itemSkuRepo: ItemSkuRepository

    ){}

    async createItemSku(req:ItemSKusReq):Promise<SKUGenerationResponseModel>{
      const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
      try{
        await transactionalEntityManager.startTransaction();
        // const colorLength = req.colorInfo.length
        // const sizeLength = req.sizeInfo.length
        // const destinationLength = req.destinationInfo.length
        // const totLen = (colorLength * sizeLength * destinationLength)
        let flag = []
        let len = 0; 
        const itemSearch = await this.itemSkuRepo.find({where:{itemCode:req.itemCode}})   
        let count = itemSearch.length
        // if(itemSearch.length > 0){
        //   flag.push(false)
        //   await transactionalEntityManager.releaseTransaction()
        //   return new SKUGenerationResponseModel(false,0,'ItemCode alerady exisited!',[])

        // } else{
          for(const dest of req.destinationInfo){
            const entity = new ItemSkus()
            entity.itemCode = req.itemCode;
            const itemEntity = new Item
            itemEntity.itemId = req.itemId 
            entity.itemInfo = itemEntity
            const style = new Style()
            style.styleId = req.styleId
            entity.styleInfo = style
            entity.status = req.status
            entity.createdUser = req.createdUser
            const destinationEntity = new Destination()
            destinationEntity.destinationId = dest.destinationId
            entity.destinationInfo = destinationEntity
            entity.destination = dest.destination
            for(const size of req.sizeInfo){
              const sizeEntity = new Size()
              sizeEntity.sizeId = size.sizeId
              entity.sizeInfo = sizeEntity
              entity.size = size.size
              for(const color of req.colorInfo){
                const find = await this.itemSkuRepo.find({where:{itemCode:req.itemCode,color:color.colour,size:size.size,destination:dest.destination}})
                const colorEntity = new Colour
                colorEntity.colourId = color.colourId
                entity.colorInfo = colorEntity
                entity.color = color.colour
                // if(req.itemSkuId){
                //   entity.itemSkuId = req.itemSkuId
                //   entity.updatedUser = req.createdUser
                //   entity.skuCode = req.skuCode
                // } else{
                  entity.itemSkuId = null
                  entity.createdUser = req.createdUser
                // }
                // let save 
                if(itemSearch.length > 0 && !(find.length > 0)){
                  count = count + 1
                  entity.skuCode = `${req.itemCode}-${count}`
                 const save = await transactionalEntityManager.getRepository(ItemSkus).save(entity)
                  if(!save){
                    flag.push(false)
                    await transactionalEntityManager.releaseTransaction()
                    return new SKUGenerationResponseModel(false,0,'Some thing went wrong in SKU creation',[])
                  } else{
                    flag.push(true)
                  }
                } else if (!(itemSearch.length > 0)){
                  len = len +1
                  entity.skuCode = `${req.itemCode}-${len}`
                  const save = await transactionalEntityManager.getRepository(ItemSkus).save(entity)
                  if(!save){
                    flag.push(false)
                    await transactionalEntityManager.releaseTransaction()
                    return new SKUGenerationResponseModel(false,0,'Some thing went wrong in SKU creation',[])
                  } else{
                    flag.push(true)
                  }
                }
                // const save = await this.itemSkuRepo.save(entity)

              // }
            }
          }
        }
        if(flag.includes(false)){
          await transactionalEntityManager.releaseTransaction()
          return new SKUGenerationResponseModel(false,0,'Some thing went wrong in SKU creation',[])
        } else{
          await transactionalEntityManager.completeTransaction()
          return new SKUGenerationResponseModel(true,1,'Created Successfully')
        }

      } catch(err){
        // await transactionalEntityManager.releaseTransaction()
          throw err
      }
    }

    async cancelSKUById(req : ItemSKusReq): Promise<SKUGenerationResponseModel> {
      try {
        const sampleReq = await this.itemSkuRepo.findOne({ where: { itemSkuId: req.itemId  } })
        if (sampleReq) {
          const updateResult = await this.itemSkuRepo.update({ itemSkuId: req.itemId }, { status: SkuStatusEnum.CLOSED })
          if (updateResult) {
            return new SKUGenerationResponseModel(true, 1, 'SKU cancelled successfully', undefined)
          }
        } else {
          return new SKUGenerationResponseModel(false, 0, 'No SKU Record found', [])
        }
      } catch (err) {
        throw err;
      }
    }

    async getDestinationsByItem(req:ItemCodeReq): Promise<CommonResponseModel>{
      try{
        // const getData = await this.itemSkuRepo.find({select:['destination','destinationInfo'],where:{itemCode: req.itemCode}})
        const getData = await this.itemSkuRepo.getDestinationsByItem(req.itemCode)
        if(getData.length > 0){
          return new CommonResponseModel(true,1,'Data retreived',getData)
        } else{
          return new CommonResponseModel(false,0,'No data found')
        }

      } catch(err){
        throw err
      }
    }

    async getDataByDestinationAgainstItem(req:ItemCodeReq):Promise<CommonResponseModel>{
      try{
        const getData = await this.itemSkuRepo.find({relations:['destinationInfo','colorInfo','sizeInfo'],where:{itemCode:req.itemCode,destinationInfo:{destinationId:req.destinationId},status:SkuStatusEnum.OPEN}})
        if(getData.length > 0){
          return new CommonResponseModel(true,1,'Data retreived',getData)
        } else{
          return new CommonResponseModel(false,0,'No data found')
        }
      } catch(err){
        throw err
      }
    }

  async getDataByItem(req:ItemCodeReq):Promise<SKUGenerationResponseModel>{
    try{
      const data = await this.itemSkuRepo.find({relations:['destinationInfo','colorInfo','sizeInfo','itemInfo','styleInfo'],where:{itemCode:req.itemCode}})
      // const data = await this.itemSkuRepo.getDataByItem(req.itemCode)
      if(data.length > 0){
        let colorInfo = []
        let sizeInfo = []
        let destinationInfo = []
        let info = []
        for(const rec of data){
          if (!(colorInfo.filter(e => e.colour === rec.color).length > 0)) {
            colorInfo.push(new ColorInfoReq(rec.colorInfo.colourId,rec.color))
          }
          if (!(sizeInfo.filter(e => e.size === rec.size).length > 0)) {
          sizeInfo.push(new SizeInfoReq(rec.sizeInfo.sizeId,rec.size))
          }
          if (!(destinationInfo.filter(e => e.destination === rec.destination).length > 0)) {
          destinationInfo.push(new DestinationInfoReq(rec.destinationInfo.destinationId,rec.destination))
          }
        }
        info.push(new ItemSKusModel(data[0].itemSkuId,data[0].skuCode,data[0].itemInfo.itemId,data[0].itemCode,data[0].status,colorInfo,sizeInfo,destinationInfo,data[0].createdUser,data[0].styleInfo.styleId,data[0].styleInfo.style))
        // console.log(info,'----------')
        return new SKUGenerationResponseModel(true,1,'Data retreived',info)
      } else{
        return new SKUGenerationResponseModel(false,0,'No data found')
      }
    } catch(err){
      throw err
    }
  }


  async getSkuList(req:SKUlistFilterRequest):Promise<CommonResponseModel>{
    try{
      const getData= await this.itemSkuRepo.find({relations:['destinationInfo','colorInfo','sizeInfo'],
      // const getData = await this.itemSkuRepo.getDestinationsByItem(req.itemCode)

      // where:{itemInfoitem_id = req.itemNoId}
    })
      if(getData.length> 0){
        return new CommonResponseModel(true,1,'Data retreived',getData)
      }else{
        return new CommonResponseModel(false,0,'No data found')
      }
    }catch (err){
      throw err
    }
  }
   

// async getItemCode(req:ItemCodeReq):Promise<CommonResponseModel>{
//   try{
//     const getData = await this.itemSkuRepo.getDestinationsByItem(req.itemCode)
//     if(getData.length > 0){
//       return new CommonResponseModel(true,1,'Data retreived',getData)
//     } else{
//       return new CommonResponseModel(false,0,'No data found')
//     }

//   } catch(err){
//     throw err
//   }
// }

}