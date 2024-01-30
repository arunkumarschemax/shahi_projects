import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { StyleComboRepo } from "./dto/style-combo-repo";
import { BomRepo } from "./dto/bom-repo";
import { DpomRepository } from "../dpom/repositories/dpom.repository";
import { InjectRepository } from "@nestjs/typeorm";
import Item from "antd/es/list/Item";
import { ItemEntity } from "./entittes/item-entity";
import { CommonResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class TrimService{
    constructor(
    private bomRepo: BomRepo,
    private styleComboRepo:StyleComboRepo,
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
}