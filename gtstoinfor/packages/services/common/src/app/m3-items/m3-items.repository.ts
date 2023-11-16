import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { M3ItemsEntity } from "./m3-items.entity";
import { FabricType } from "../fabric-types/fabric-type.entity";
import { FabricWeave } from "../fabric weave/fabric-weave.entity";
import { InjectRepository } from "@nestjs/typeorm";




@Injectable()
export class M3ItemsRepo extends Repository<M3ItemsEntity> {

    constructor(@InjectRepository(M3ItemsEntity) private M3ItemsEntity: Repository<M3ItemsEntity>
    ) {
        super(M3ItemsEntity.target, M3ItemsEntity.manager, M3ItemsEntity.queryRunner);
    }

    async getM3ItemsData (){
        const query = this.createQueryBuilder(`m3`)
        .select (`m3.m3_items_Id,m3.item_code,m3.content,m3.fabric_type,
        m3.weave,m3.weight,m3.construction,m3.yarn_count,m3.finish,m3.shrinkage,ft.fabric_type_name,fw.fabric_weave_name `)
        .leftJoin(FabricType,'ft','ft.fabric_type_id=m3.fabric_type')
        .leftJoin(FabricWeave,'fw','fw.fabric_weave_id=m3.weave')
        const data = await query.getRawMany()
        return data 
    }
    
}