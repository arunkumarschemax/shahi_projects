import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { StyleComboRepo } from "./dto/style-combo-repo";
import { BomRepo } from "./dto/bom-repo";
import { DpomRepository } from "../dpom/repositories/dpom.repository";
import { InjectRepository } from "@nestjs/typeorm";
import Item from "antd/es/list/Item";
import { ItemEntity } from "./entittes/item-entity";
import { BomInfo, CommonResponseModel, StyleComboInfo, TrimInfoModel } from "@project-management-system/shared-models";
import { StyleDto } from "./dto/style-dto";
import { StyleRepo } from "./dto/style-repo";
import { StyleNumberDto } from "./dto/style-number-dto";

@Injectable()
export class TrimService{
    constructor(
    private bomRepo: BomRepo,
    private styleComboRepo:StyleComboRepo,
    private styleRepo : StyleRepo,
    private dataSource: DataSource,
    private dpomRepo:  DpomRepository,
    @InjectRepository(ItemEntity)
    private itemRepo : Repository<ItemEntity>

    ){ }

    async getAllTrimInfo():Promise<CommonResponseModel>{
        try{
            const data =  await this.itemRepo.find({where:{isActive:true}})
            if(data){
                return new CommonResponseModel(true,1,'Data retrieved',data)
            }else{
                return new CommonResponseModel(false,0,'No data found')
            }

        }catch(err){
            throw err
        }
    }

    async getBomInfoAgainstStyle(req:StyleNumberDto):Promise<CommonResponseModel>{
        try{
            const data = await this.styleRepo.getBomInfoAgainstStyle(req)
            const bomInfoMap = new Map<number, BomInfo>()
            if(data.length >0){
                for(const rec of data){
                    if(!bomInfoMap.has(rec.bomId)){
                        bomInfoMap.set(rec.bomId,new BomInfo(rec.bomId,rec.item_name,rec.description,rec.im_code,rec.item_type,rec.use,rec.uom,rec.qty,[]))
                    }
                    bomInfoMap.get(rec.bomId).styleComboInfo.push(new StyleComboInfo(rec.styleComboId,rec.combination,rec.primary_color,rec.secondayr_color,rec.logo_color,rec.color))

                }
                const bomInfoModel: BomInfo[] = []
                bomInfoMap.forEach(e => {
                    bomInfoModel.push(e)
                })
                const infoModel = new TrimInfoModel(data[0]?.styleId,data[0]?.style,data[0]?.style_name,data[0]?.season,bomInfoModel,data[0].item,data[0].po_number)
                return new CommonResponseModel(true,1,'Data retrieved',infoModel)
            }else{
                return new CommonResponseModel(false,0,'No data found')
            }
        } catch(err){
            throw err
        }
    }
}