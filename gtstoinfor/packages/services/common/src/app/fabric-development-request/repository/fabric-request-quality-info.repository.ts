import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestQualitiesInfoEntity } from "../fabric-request-quality-info.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FabricDevReqId } from "@project-management-system/shared-models";
import { Colour } from "../../colours/colour.entity";
import { Style } from "../../style/dto/style-entity";
import { UomEntity } from "../../uom/uom-entity";

@Injectable()
export class FabricRequestQualityInfoRepository extends Repository<FabricRequestQualitiesInfoEntity> {

    constructor(@InjectRepository(FabricRequestQualitiesInfoEntity) private FabricQualitiesInfoRepo: Repository<FabricRequestQualitiesInfoEntity>
    ) {
        super(FabricQualitiesInfoRepo.target, FabricQualitiesInfoRepo.manager, FabricQualitiesInfoRepo.queryRunner);
    }
 
    async getInfoByQltyId(req:FabricDevReqId): Promise<any> {
        
        const query =  this.createQueryBuilder('fri')
            .select(`fri.style_id ,fri.color_id , fri.garment_quantity ,fri.consumption ,fri.wastage ,fri.fabric_quantity ,fri.uom_id ,fri.status,u.uom,s.style,c.colour,
            fri.fabric_req_quality_info_id`)
            .leftJoin( Colour, 'c' , `c.colour_id = fri.color_id`)
            .leftJoin( Style, 's' ,` s.style_id = fri.style_id`)
            .leftJoin( UomEntity, 'u' , `u.id = fri.uom_id`)
            .where(`fabric_req_quality_id = ${req.fabricRequestQltyId}`)
        return await query.getRawMany()

    }
}