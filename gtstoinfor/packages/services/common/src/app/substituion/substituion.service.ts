import { Injectable } from "@nestjs/common";
import { CommonResponseModel, FgDataModel, RmDataModel, SubResponseModel, SubstituionModel, SubstituionReq, fgItemIdReq } from "@project-management-system/shared-models";
import { SubstitutionRepository } from "./substitution-repo";
import { Substitution } from "./substituion.entity";
import { FgItemBom } from "./fg-item-bom.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource } from "typeorm";
import { FGItemBomRepository } from "./fg-item-bom-repo";
import { SubstituionRequest } from "./substitution-req";

@Injectable()

export class SubstituionService{
    constructor(
        private substitutionrepo:SubstitutionRepository,
        private fgItemBomRepo:FGItemBomRepository,
        private readonly dataSource: DataSource,
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
                    console.log(savedata,'savedatalll')
                    if(savedata){
                        console.log('yesss')
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
                            saveFlag.add(true)
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
            console.log(saveFlag)
            if(!(saveFlag.has(false))){
                console.log('innnn')
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

    async getSubstitution (req?:fgItemIdReq):Promise<SubResponseModel>{
        try{
          const getdata = await this.substitutionrepo.getSubstitution(req)
          // console.log(getdata,"getdata")
          const DataMap = new Map<string, FgDataModel>();
          for (const res of getdata) {
            if (!DataMap.has(res.fgItemId)) {
              // console.log(res,'000000000000');
              
              DataMap.set (res.fgItemId,new FgDataModel(res.substituionId,res.fgItemCode,res.fgItemId,res.rmItemCode,res.rmItemId,res.fgSku,res.fgSkuId,res.rmSku,res.rmSkuId,res.consumption,res.itemTypeId,res.itemGroupId,res.itemType,res.isActive,[]))
              //  DataMap.set(res.fgItemId, new RmDataModel(res.rmItemId,res.itemType,res.rmSku,res.featureCode,res.status,res.itemCode,res.featureOptionId,res.optionGroup,res.optionId,re));
              // console.log( res.fgItemId,'service item id');
        
            }
             const RmSku = DataMap.get(res.fgItemId)?.rmData;
            //  console.log( RmSku,'service item id/ x`out sidex');
            if (RmSku) {
              // const data1 = new RmDataModel(featureCode,res.status,res.itemCode,res.featureOptionId,res.optionGroup,res.optionId,re
              const data1 = new RmDataModel(
              res.rmItemId,
                res.itemType,
                res.rmSKuCode,
                res.featureCode,
                res.status,
                res.itemCode,
                res.featureOptionId,
                res.optionGroup,res.optionId,res.optionValue
              );
              RmSku.push(data1);
            }
            // console.log(RmSku,'uuuuuuuuuuuu');
            
          }
        
          let ListArray: FgDataModel[] = Array.from(DataMap.values());
          console.log(ListArray,'service............');
        
          if(getdata.length>0){
      
            return new SubResponseModel(true,1,'data retreived',ListArray)
      
          }else{
      
            return new CommonResponseModel(false,0,'No data found')
      
          }
          
        }catch(err){
          throw err
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
}