import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoBomEntity } from "../entittes/po-bom.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../../dpom/entites/dpom.entity";
import { BomEntity } from "../entittes/bom-entity";
import { ZFactorsBomEntity } from "../entittes/z-factors-bom.entity";
import { ZFactorsEntity } from "../entittes/z-factors.entity";
import { BomProposalDataModel, BomProposalReq } from "@project-management-system/shared-models";
import { StyleComboEntity } from "../entittes/style-combo-entity";

@Injectable()
export class PoBomRepo extends Repository<PoBomEntity> {
    constructor(@InjectRepository(PoBomEntity) private poBomRepo: Repository<PoBomEntity>
    ) {
        super(poBomRepo.target, poBomRepo.manager, poBomRepo.queryRunner);
    }

    async getProposalsData(req: BomProposalReq): Promise<BomProposalDataModel[]> {
        const query = this.createQueryBuilder('pb')
            .select(`pb.id,pb.po_qty as poQty,pb.bom_qty as bomQty,pb.consumption,pb.wastage,pb.moq,b.description,b.im_code as imCode,b.use,
            d.style_number as styleNumber,d.color_desc as color,d.destination_country as destination,d.geo_code as geoCode,d.plant,d.planning_season_code as season,d.planning_season_year as year,d.size_description as size,SUBSTRING(d.item, 1, 4) as itemNo,b.item_id as itemId,d.po_number as poNumber,d.gender_age_desc as gender`)
            .leftJoin(DpomEntity, 'd', 'd.id = pb.dpom_id')
            .leftJoin(BomEntity, 'b', 'b.id = pb.bom_id and pb.bom_id is not null')
            .where(`d.po_and_line IN (:...poLine)`, { poLine: req.poLine })
            .andWhere(`b.item_id IN (:...itemId)`, { itemId: req.itemId })
            .andWhere(`pb.bom_id is not null`)

        const rawData = await query.getRawMany()
        const mappedData: BomProposalDataModel[] = rawData.map(item => {
            return new BomProposalDataModel({
                id: item.id,
                poQty: item.poQty,
                bomQty: item.bomQty,
                consumption: item.consumption,
                wastage: item.wastage,
                moq: item.moq,
                description: item.description,
                imCode: item.imCode,
                use: item.use,
                styleNumber: item.styleNumber,
                color: item.color,
                destination: item.destination,
                geoCode: item.geoCode,
                plant: item.plant,
                season: item.season,
                year: item.year,
                size: item.size,
                itemNo: item.itemNo,
                itemId: item.itemId,
                gender: item.gender,
                poNumber: item.poNumber
            });
        });

        return mappedData;
    }

    async getZfactorsData(req: BomProposalReq): Promise<BomProposalDataModel[]> {
        const query = this.createQueryBuilder('pb')
            .select(`pb.id,pb.po_qty as poQty,pb.bom_qty as bomQty,pb.consumption,pb.wastage,pb.moq,
            d.style_number as styleNumber,d.color_desc as color,d.destination_country as destination,d.geo_code as geoCode,d.plant,d.planning_season_code as season,d.planning_season_year as year,d.size_description as size,SUBSTRING(d.item, 1, 4) as itemNo,z.item_id as itemId,pb.zfactor_bom_id as zfactorBomId,zb.im_code as zbImCode,zb.item_name as zbItemName,zb.description,d.po_number as poNumber,d.gender_age_desc as gender`)
            .leftJoin(DpomEntity, 'd', 'd.id = pb.dpom_id')
            .leftJoin(ZFactorsBomEntity, 'zb', 'zb.id = pb.zfactor_bom_id and pb.zfactor_bom_id is not null')
            .leftJoin(ZFactorsEntity, 'z', 'z.id = zb.zfactor_id')
            .where(`d.po_and_line IN (:...poLine)`, { poLine: req.poLine })
            .andWhere(`z.item_id IN (:...itemId)`, { itemId: req.itemId })
            .andWhere(`pb.zfactor_bom_id is not null`)

        const rawData = await query.getRawMany()
        const mappedData: BomProposalDataModel[] = rawData.map(item => {
            return new BomProposalDataModel({
                id: item.id,
                poQty: item.poQty,
                bomQty: item.bomQty,
                consumption: item.consumption,
                wastage: item.wastage,
                moq: item.moq,
                description: item.description,
                imCode: item.zbImCode,
                use: item.use,
                styleNumber: item.styleNumber,
                color: item.color,
                destination: item.destination,
                geoCode: item.geoCode,
                plant: item.plant,
                season: item.season,
                year: item.year,
                size: item.size,
                itemNo: item.itemNo,
                itemId: item.itemId,
                gender: item.gender,
                poNumber: item.poNumber,
            });
        });

        return mappedData;
    }



    async getProposalsDataForButton(req: BomProposalReq): Promise<BomProposalDataModel[]> {
        const query = this.createQueryBuilder('pb')
            .select(`pb.id,pb.po_qty as poQty,pb.bom_qty as bomQty,pb.consumption,pb.wastage,pb.moq,b.description,b.im_code as imCode,b.use,
            d.style_number as styleNumber,d.color_desc as color,d.destination_country as destination,d.geo_code as geoCode,d.plant,d.planning_season_code as season,d.planning_season_year as year,d.size_description as size,SUBSTRING(d.item, 1, 4) as itemNo,b.item_id as itemId,d.po_number as poNumber,d.gender_age_desc as gender,st.combination,st.primary_color as primaryColor,st.secondary_color as secondaryColor,st.item_color as itemColor,product_code as productCode`)
            .leftJoin(DpomEntity, 'd', 'd.id = pb.dpom_id')
            .leftJoin(BomEntity, 'b', 'b.id = pb.bom_id and pb.bom_id is not null')
            .leftJoin(StyleComboEntity,'st','st.bom_id = b.id')
            .where(`d.po_and_line IN (:...poLine)`, { poLine: req.poLine })
            .andWhere(`b.item_id IN (:...itemId)`, { itemId: req.itemId })
            .andWhere(`pb.bom_id is not null`)

        const rawData = await query.getRawMany()
        const mappedData: BomProposalDataModel[] = rawData.map(item => {
            return new BomProposalDataModel({
                id: item.id,
                poQty: item.poQty,
                bomQty: item.bomQty,
                consumption: item.consumption,
                wastage: item.wastage,
                moq: item.moq,
                description: item.description,
                imCode: item.imCode,
                use: item.use,
                styleNumber: item.styleNumber,
                color: item.color,
                destination: item.destination,
                geoCode: item.geoCode,
                plant: item.plant,
                season: item.season,
                year: item.year,
                size: item.size,
                itemNo: item.itemNo,
                itemId: item.itemId,
                gender: item.gender,
                poNumber: item.poNumber,
                combination:item.combination,
                primaryColor:item.primaryColor,
                secondaryColor:item.secondaryColor,
                itemColor:item.itemColor,
                productCode:item.productCode
            });
        });
        return mappedData;
    }
}
