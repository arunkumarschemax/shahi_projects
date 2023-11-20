import { Injectable } from "@nestjs/common";
import { CommonResponseModel, FeatureSubstituionReq, FgDataModel, FgItemCodeReq, RmDataModel, RmMappingStatusEnum, SubResponseModel, SubstituionModel, SubstituionReq, fgItemIdReq } from "@project-management-system/shared-models";
import { SubstitutionRepository } from "./substitution-repo";
import { Substitution } from "./substituion.entity";
import { FgItemBom } from "./fg-item-bom.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource, Repository } from "typeorm";
import { FGItemBomRepository } from "./fg-item-bom-repo";
import { SubstituionRequest } from "./substitution-req";
import { FeatureSubstitution } from "./feature-substituion.entity";
import { ItemCreation } from "../fg-item/item_creation.entity";
import { RmCreationEntity } from "../rm-items/rm-items.entity";
import { FeatureEntity } from "../feature-creation/entities/feature.entity";
import { Rm } from "packages/libs/shared-models/src/common/substituion/rm-sku.req";
import { InjectRepository } from "@nestjs/typeorm";
import { FeatureSubstitutionRepository } from "./feature-substitution-repo";
import { RmSkus } from "../rm-skus/rm-sku.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";

@Injectable()

export class SubstituionService{
    constructor(
        private substitutionrepo:SubstitutionRepository,
        private fgItemBomRepo:FGItemBomRepository,
        private readonly dataSource: DataSource,
        // @InjectRepository(FeatureSubstitution)
        // private featureSubstitutionRepo: Repository<FeatureSubstitution>
        private featureSubstitutionRepo : FeatureSubstitutionRepository,
    ){}
    async createSubstitution(req:SubstituionRequest):Promise<CommonResponseModel>{
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try{
            console.log(req,'reqqq')
            await transactionalEntityManager.startTransaction();
            let saveFlag = new Set<boolean>()
            for(const rec of req.mappedInfo){
                for(const rmRec of rec.mappedRmSKuList){
                    const obj = new Substitution;
                    obj.fgItemCode = req.fgItemCode;
                    obj.rmItemCode = rmRec.rmItemCode;
                    obj.fgItemId = req.fgItemId;
                    obj.rmItemId = rmRec.rmItemId;
                    obj.fgSku = rec.fgSkuCode;
                    obj.rmSku = rmRec.rmSKuCode;
                    obj.rmSkuId = rmRec.rmSkuId;
                    obj.fgSkuId = rec.fgSkuId;
                    const savedata = await transactionalEntityManager.getRepository(Substitution).save(obj)
                    if(savedata){
                        const fgBomobj = new FgItemBom;
                        fgBomobj.rmItemId = rmRec.rmItemId;
                        fgBomobj.rmItemCode = rmRec.rmItemCode;
                        fgBomobj.rmSku = rmRec.rmSKuCode;
                        fgBomobj.rmSkuId = rmRec.rmSkuId;
                        fgBomobj.consumption = rmRec.consumption;
                        fgBomobj.fgSkuId = rec.fgSkuId;
                        fgBomobj.fgSku = rec.fgSkuCode;
                        fgBomobj.itemTypeId = req.itemTypeId;
                        fgBomobj.itemGroupeId = rmRec.itemGroupId;
                        fgBomobj.createdUser = req.createdUser;
                        // fgBomobj.rmItemType = rmRec.rmItemType
                        const fgBomSave = await transactionalEntityManager.getRepository(FgItemBom).save(fgBomobj)
                        if(fgBomSave){
                          const rmMappingStatusUpdate = await transactionalEntityManager.getRepository(ItemSkus).update({skuCode : rec.fgSkuCode},{rmMappingStatus : RmMappingStatusEnum.YES})
                          if(rmMappingStatusUpdate.affected){
                            saveFlag.add(true)
                          } else{
                            saveFlag.add(false)
                            break
                          }
                        }else{
                            saveFlag.add(false)
                            break
                        }
                    }else{
                        saveFlag.add(false)
                        break
                    }
                }
            }
            if(!(saveFlag.has(false))){
                await transactionalEntityManager.completeTransaction()
                return new CommonResponseModel(true,1,'Substitution done successfully')
            }else{
                console.log('innnnjjjj')
                await transactionalEntityManager.releaseTransaction()
                return new CommonResponseModel(false,0,'Substitution Failed')
            }
        }catch(err){
            console.log('innnnerror',err)

            await transactionalEntityManager.releaseTransaction()
            return new CommonResponseModel(false,0,err)
        }
    }

    // async getSubstitution (req?:fgItemIdReq):Promise<SubResponseModel>{
    //     try{
    //       const getdata = await this.substitutionrepo.getSubstitution(req)
    //       // console.log(getdata,"getdata")
    //       const DataMap = new Map<string, FgDataModel>();
    //       for (const res of getdata) {
    //         if (!DataMap.has(res.fgItemId)) {
    //           // console.log(res,'000000000000');
              
    //           DataMap.set (res.fgItemId,new FgDataModel(res.fgItemCode,res.fgItemId,[]))
    //           //  DataMap.set(res.fgItemId, new RmDataModel(res.rmItemId,res.itemType,res.rmSku,res.featureCode,res.status,res.itemCode,res.featureOptionId,res.optionGroup,res.optionId,re));
    //           // console.log( res.fgItemId,'service item id');
        
    //         }
    //          const RmSku = DataMap.get(res.fgItemId)?.rmData;
    //         if (RmSku) {
    //           // const data1 = new RmDataModel(featureCode,res.status,res.itemCode,res.featureOptionId,res.optionGroup,res.optionId,re
    //           const data1 = new RmDataModel(
    //           res.fgItemId,res.fgSkuId,res.fgSkuCode,[]);
    //         }

    //         const Rmitem = DataMap.get(res.fgItemId)?.rmItem
    //         // console.log(RmSku,'uuuuuuuuuuuu');
            
    //       }
        
    //       let ListArray: FgDataModel[] = Array.from(DataMap.values());
    //       // console.log(ListArray,'service............');
        
    //       if(getdata.length>0){
      
    //         return new SubResponseModel(true,1,'data retreived',ListArray)
      
    //       }else{
      
    //         return new CommonResponseModel(false,0,'No data found')
      
    //       }
          
    //     }catch(err){
    //       throw err
    //     }
    // }

    // async getSubstitution(req?:fgItemIdReq):Promise<CommonResponseModel>{
    //        const data =await this.substitutionrepo.getSubstitution(req);
    //        if(data.length === 0){
    //         return new CommonResponseModel(false, 0, 'data not found');

    //        }

    //        const DataMap = new Map<string, FgDataModel>();
    //        for(const res of data){
    //         if(!DataMap.has(res.fg_item_id)){
    //           DataMap.set(res.fg_item_id, new FgDataModel(res.fg_item_code,res.fg_item_id,[]))
    //         }
    //         const Fgsku=DataMap.get(res.fg_item_id)?.rmData;

    //         if(Fgsku){
    //           const data1= new RmDataModel(res.fg_sku_id,res.fg_sku,[])
    //         } 

    //         const item=DataMap.get(res.)
    //         }

    //        }

    

    async getSubstitution(req?: fgItemIdReq): Promise<SubResponseModel> {
      try {
        const data = await this.substitutionrepo.getSubstitution(req);
    
        const DataMap = new Map<string, FgDataModel>();
    
        for (const res of data) {
          if (!DataMap.has(res.fgItemId)) {
            DataMap.set(res.fgItemId, new FgDataModel(res.fgItemCode, res.fgItemId, []));
          }
    
          // Assuming that FgDataModel has an rmData property
          const Fgsku = DataMap.get(res.fgItemId)?.rmData;
    
          if (Fgsku) {
            const rmData = new RmDataModel(res.fgSkuId, res.fgSkuCode, []);
    
            // Assuming RmDataModel has an rmDetails property
            rmData.rmDetails.push(new Rm(res.rmSku, res.rmSkuId));
            Fgsku.push(rmData);
          }
          
        }
    
        // Convert the Map values to an array
        let ListArray: FgDataModel[] = Array.from(DataMap.values());
    
        if (data.length > 0) {
          return new SubResponseModel(true, 1, 'data retrieved', ListArray);
        } else {
          return new CommonResponseModel(false, 0, 'No data found');
        }
      } catch (err) {
        throw err;
      }
    }
    
    async getFgSku(req?:fgItemIdReq):Promise<CommonResponseModel>{
      try{
        const getData = await this.substitutionrepo.getFgSku(req)
        // console.log(getData,'dara');
        
        if(getData ){
          return new CommonResponseModel(true,1,'Data retreived',getData)
        } else{
          return new CommonResponseModel(false,0,'No data found')
        }
    
      } catch(err){
        throw err
      }

      
    }  

// async getSubstitution(req?:fgItemIdReq):Promise<CommonResponseModel>{
//   try{
//     const getdata= await this.substitutionrepo.getSubstitution(req)
//     if(getdata){
//       return new CommonResponseModel(true,1,'Data retreived',getdata)
//     }else{
//       return new CommonResponseModel(false,0,'No data found')
//     }
//   }catch (err){
//     throw err
//   }
// }

// async getSubstitution(req?: fgItemIdReq): Promise<CommonResponseModel> {
//   const data = await this.substitutionrepo.getSubstitution(req);

//   if (data.length > 0) {
//     const subdata = data.reduce((result, item) => {
//       const fgItemCode = item.fg_item_code;
//       const fgSkuCode = item.fg_sku;
//       const rmSkuCode = item.rm_sku;
//       const rmItemCode = item.rm_item_code;

//       // Initialize nested structures if not present
//       if (!result[fgItemCode]) {
//         result[fgItemCode] = {};
//       }
//       if (!result[fgItemCode][fgSkuCode]) {
//         result[fgItemCode][fgSkuCode] = {};
//       }
//       if (!result[fgItemCode][fgSkuCode][rmSkuCode]) {
//         result[fgItemCode][fgSkuCode][rmSkuCode] = [];
//       }

//       // Add rmItemCode to the nested structure
//       result[fgItemCode][fgSkuCode][rmSkuCode].push(rmItemCode);

//       return result;
//     }, {});

//     return new CommonResponseModel(true, 111, 'Data retrieved', subdata);
//   }

//   return new CommonResponseModel(false, 0, 'Data Not retrieved', {});
// }

    async getRmSku(req?:fgItemIdReq):Promise<CommonResponseModel>{
      try{
        const getData = await this.substitutionrepo.getRmSku(req)
        // console.log(getData,'dara');
        
        if(getData ){
          return new CommonResponseModel(true,1,'Data retreived',getData)
        } else{
          return new CommonResponseModel(false,0,'No data found')
        }
    
      } catch(err){
        throw err
      }
    }  

    async createFeatureSubstitution(req: FeatureSubstituionReq):Promise<CommonResponseModel>{
      const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
      try{
        await transactionalEntityManager.startTransaction();
        let saveFlag = new Set<boolean>()
        for(const rec of req.rmInfo){
          const entity = new FeatureSubstitution()
          entity.fgItemCode = req.fgItemCode
          const fgItem = new ItemCreation()
          fgItem.fgitemId = req.fgItemId
          entity.fgItemInfo = fgItem
          entity.rmItemCode = rec.rmItemCode
          const rmItem = new RmCreationEntity()
          rmItem.rmitemId = rec.rmItemId
          entity.rmItemInfo = rmItem
          const rmSkus = new RmSkus()
          rmSkus.rmSkuId = rec.rmSkuId
          entity.rmSkuInfo = rmSkus
          entity.rmSkuCode = rec.rmSkuCode
          entity.featureCode = rec.featureCode
          const feature = new FeatureEntity()
          feature.featureId = rec.featureId
          entity.featureInfo = feature
          entity.fgOption = rec.fgOption
          entity.fgOptionValue = rec.fgOptionValue
          entity.rmOption = rec.rmOption
          entity.rmOptionValue = rec.rmOptionValue
          entity.status = rec.status
          const savedata = await transactionalEntityManager.getRepository(FeatureSubstitution).save(entity)
          if(savedata){
            saveFlag.add(true)
          } else{
            saveFlag.add(false)
            break
          }
        }
        if(!(saveFlag.has(false))){
          await transactionalEntityManager.completeTransaction()
          return new CommonResponseModel(true,1,'Feature Substitution done successfully')
        }else{
            await transactionalEntityManager.releaseTransaction()
            return new CommonResponseModel(false,0,'Feature Substitution Creation Failed')
        }
      }catch(err){
        await transactionalEntityManager.releaseTransaction()
        throw err
      }
    }

    async getFeatureSubstitutionByFgItem(req:FgItemCodeReq):Promise<CommonResponseModel>{
      try{
        const data = await this.featureSubstitutionRepo.find({where:{fgItemCode:req.fgItemCode},relations:['rmItemInfo','fgItemInfo','featureInfo','rmSkuInfo']})
        if(data){
          return new CommonResponseModel(true,1,'Data retrieved',data)
        } else{
          return new CommonResponseModel(false,0,'No data found')
        }

      }catch(err){
        throw err
      }
    }
}