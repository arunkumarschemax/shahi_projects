import { Injectable } from "@nestjs/common";
import { Between, DataSource, Repository } from "typeorm";
import { StyleComboRepo } from "./dto/style-combo-repo";
import { BomRepo } from "./dto/bom-repo";
import { DpomRepository } from "../dpom/repositories/dpom.repository";
import { InjectRepository } from "@nestjs/typeorm";
import Item from "antd/es/list/Item";
import { ItemEntity } from "./entittes/item-entity";
import { BomInfo, BomInfoModel, BomPrintFilterReq, BomPrintInfoModel, CommonResponseModel, ItemInfoFilterReq, ItemInfoModel, RegionModel, SizeInfo, StyleComboInfo, TrimInfoModel } from "@project-management-system/shared-models";
import { StyleDto } from "./dto/style-dto";
import { StyleRepo } from "./dto/style-repo";
import { StyleNumberDto } from "./dto/style-number-dto";
import { ItemsRepo } from "./repo/items-repo";
import { ItemDto } from "./dto/item-request";

@Injectable()
export class TrimService {
    constructor(
        private bomRepo: BomRepo,
        private styleComboRepo: StyleComboRepo,
        private styleRepo: StyleRepo,
        private dataSource: DataSource,
        private dpomRepo: DpomRepository,
        @InjectRepository(ItemEntity)
        private itemRepo: Repository<ItemEntity>,
        private itemRepository: ItemsRepo,


    ) { }

    async getAllTrimInfo(): Promise<CommonResponseModel> {
        try {
            const data = await this.itemRepo.find({ where: { isActive: true },order:{consumptionRequired : "DESC"} })
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retrieved', data)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }

        } catch (err) {
            throw err
        }
    }

    async getBomInfoAgainstStyle(req: StyleNumberDto): Promise<CommonResponseModel> {
        try {
            const data = await this.styleRepo.getBomInfoAgainstStyle(req)

            const styleWiseMap = new Map<string, [Map<number, BomInfo>, TrimInfoModel]>()
            if (data.length > 0) {
                for (const rec of data) {
                    // console.log(rec,'----rec-----')
                    //-----------------------------------------------------------------------------------//
                    if (!styleWiseMap.has(rec.style)) {
                        const trimInfoModel = new TrimInfoModel(rec?.styleId, rec?.style, rec?.style_name, rec?.season, [], rec.item, rec.po_number, rec.msc, rec.gender, rec.ship_to_address_legal_po, rec.geo_code, rec.destination_country, rec.plant, rec.styleType)
                        styleWiseMap.set(rec.style, [new Map<number, BomInfo>(), trimInfoModel]);
                        const bomInfoMap = styleWiseMap.get(rec.style)[0];
                        // console.log(bomInfoMap,'------------bominfomap----------')
                        if (!bomInfoMap.has(rec.bomId)) {
                            // console.log('bom id doest not exist')
                            bomInfoMap.set(rec.bomId, new BomInfo(rec.bomId, rec.item_name, rec.description, rec.im_code, rec.item_type, rec.use, rec.uom, rec.qty, [], rec.trimInfo));
                            bomInfoMap.get(rec.bomId).styleComboInfo.push(new StyleComboInfo(rec.styleComboId, rec.combination, rec.primary_color, rec.secondary_color, rec.logo_color, rec.color));
                        }
                    }
                }

                const trimsInfo: TrimInfoModel[] = []
                for (const style of styleWiseMap.keys()) {
                    const bomInfoModel: BomInfo[] = []
                    const bomInfo = styleWiseMap.get(style)[0]
                    const poInfo = styleWiseMap.get(style)[1]

                    for (const [_, bomValue] of bomInfo) {
                        bomInfoModel.push(bomValue)
                    }

                    poInfo.bomInfo = bomInfoModel
                    trimsInfo.push(poInfo)
                }
                //---------------------------------------------------------------------------------------------------------//
                return new CommonResponseModel(true, 1, 'Data retrieved', styleWiseMap)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }

    async getItemInfo(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        try {
            let query = `SELECT  id,LEFT(item,4) as item,style_number,geo_code,destination_country_code,destination_country,po_number,po_line_item_number,sum(total_item_qty) as total_item_qty
            FROM dpom WHERE created_at BETWEEN '${req.fromDate}' AND '${req.toDate}' AND item IS NOT NULL`
            if (req.item) {
                query += ` AND LEFT(item,4) = '${req.item}'`
            }
            if (req.region) {
                query += ` AND geo_code = '${req.region}'`
            }
            query += ` GROUP BY LEFT(item,4),style_number,geo_code ORDER BY LEFT(item,4)`
            const data = await this.dataSource.query(query)
            if (data) {
                const itemMap = new Map<string, ItemInfoModel>()
                for (const rec of data) {
                    if (!itemMap.has(`${rec.item}-${rec.style_number}`)) {
                        itemMap.set(`${rec.item}-${rec.style_number}`, new ItemInfoModel(rec.id, rec.item, rec.po_line_item_number, rec.po_number, rec.style_number, rec.total_item_qty, []))
                    }
                    itemMap.get(`${rec.item}-${rec.style_number}`).regionInfo.push(new RegionModel(rec.destination_country, rec.destination_country_code, rec.geo_code))

                }
                const itemModel: ItemInfoModel[] = []
                itemMap.forEach(e => itemModel.push(e))
                return new CommonResponseModel(true, 1, 'Data retreived', itemModel)
            } else {

                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }

    async getItemDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        try {
            // const data = await this.dpomRepo.find({select:['item'],where:{createdAt:Between(`${req.fromDate}`,`${req.toDate}`)}})
            const query = `select LEFT(bom_item,4) as item from dpom where DATE(document_date) between DATE('${req.fromDate}') and DATE('${req.toDate}') and bom_item is not null group by LEFT(bom_item,4)`
            const data = await this.dataSource.query(query)
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retreived', data)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }

    async getRegionDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        try {
            // const data = await this.dpomRepo.find({select:['geoCode'],where:{createdAt:Between(`${req.fromDate}`,`${req.toDate}`)}})
            const query = `select geo_code as geoCode from dpom where created_at between '${req.fromDate}' and '${req.toDate}' and geo_code is not null group by geo_code`
            const data = await this.dataSource.query(query)
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retreived', data)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }

    async getBomPrintInfo(req: BomPrintFilterReq): Promise<CommonResponseModel> {
        try {
            const data = await this.dpomRepo.getBomInfoAgainstItemStyle(req)
            if (data) {
                const trimPrintInfoMap = new Map<string, BomPrintInfoModel>();

                for (const rec of data) {
                    let sizeData = trimPrintInfoMap.get(`${rec.style_number}-${rec.item}-${rec.geo_code}`);

                    if (!sizeData) {
                        sizeData = new BomPrintInfoModel(rec.item, rec.geo_code, rec.destination_country, null, rec.style_number, null, rec.season, rec.po_number, rec.msc, null, rec.plant, null, [], []
                        );

                        trimPrintInfoMap.set(`${rec.style_number}-${rec.item}-${rec.geo_code}`, sizeData);
                    }

                    if (!sizeData.sizeInfo) {
                        sizeData.sizeInfo = [];
                    }

                    sizeData.sizeInfo.push(new SizeInfo(rec.size_description, rec.size_qty));
                }

                const styleReq = new StyleNumberDto()
                styleReq.style = req.style
                styleReq.trimName = req.trimName
                const styleWiseBomInfoRes = await this.getBomInfoAgainstStyle(styleReq)
                const styleWiseBomInfoData = styleWiseBomInfoRes.data
                const dataModelArray: BomPrintInfoModel[] = [];
                trimPrintInfoMap.forEach(e => dataModelArray.push(e));
                for (const rec of dataModelArray) {
                    if (styleWiseBomInfoData != undefined) {

                        if (styleWiseBomInfoData.has(rec.style)) {
                            const bomInfoModel: BomInfo[] = []
                            const bomInfo = styleWiseBomInfoData.get(rec.style)[0]
                            for (const [_, bomValue] of bomInfo) {
                                bomInfoModel.push(bomValue)
                            }
                            const poInfo = styleWiseBomInfoData.get(rec.style)[1]
                            rec.gender = poInfo.gender
                            rec.msc = poInfo.msc
                            rec.plant = poInfo.plant
                            rec.season = poInfo.season
                            rec.styleType = poInfo.styleType
                            rec.styleName = poInfo.styleName
                            rec.bomInfo.push(bomInfoModel)
                        }
                    }

                }
                return new CommonResponseModel(true, 1, 'Data retrieved', dataModelArray)
            }

        } catch (err) {
            throw err
        }
    }

    async getProductCodeDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        try {
            // const data = await this.dpomRepo.find({select:['item'],where:{createdAt:Between(`${req.fromDate}`,`${req.toDate}`)}})
            const query = `select id ,product_code from dpom where DATE(document_date) between DATE('${req.fromDate}') and DATE('${req.toDate}') and doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' and product_code is not null group by product_code `
            const data = await this.dataSource.query(query)
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retreived', data)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }
    async getSeasonCodeDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        try {
            // const data = await this.dpomRepo.find({select:['item'],where:{createdAt:Between(`${req.fromDate}`,`${req.toDate}`)}})
            const query = `select id ,planning_season_code from dpom where DATE(document_date) between DATE('${req.fromDate}') and DATE('${req.toDate}') and doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' and planning_season_code is not null group by planning_season_code `
            const data = await this.dataSource.query(query)
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retreived', data)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }
    async getSeasonYearDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        try {
            // const data = await this.dpomRepo.find({select:['item'],where:{createdAt:Between(`${req.fromDate}`,`${req.toDate}`)}})
            const query = `select id ,planning_season_year from dpom where DATE(document_date) between DATE('${req.fromDate}') and DATE('${req.toDate}') and doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' and planning_season_year is not null group by planning_season_year `
            const data = await this.dataSource.query(query)
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retreived', data)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }
    
    async getPpmStyleNumberByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        try {
            const query = `select id ,style_number from dpom where DATE(document_date) between DATE('${req.fromDate}') and DATE('${req.toDate}') and doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' and style_number is not null group by style_number `
            const data = await this.dataSource.query(query)
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retreived', data)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }
 
    async getAllConsumptionRequiredTrims(req): Promise<CommonResponseModel> {
        try {
            const data = await this.itemRepository.getTrimListForBomGenration(req);
            if (data) {

                const itemDtos = data.map(item => new ItemDto(
                    item.item_id,item.item,item.consumption_required == 1 ?true:false,item.consumption,
                    item.wastage, item.moq,item.print_component,item.consumptionAgainst,item.uom,
                    item.createdAt,item.createdUser,item.updatedAt,
                    item.updatedUser,item.versionFlag,item.isActive
                ));
                return new CommonResponseModel(true, 1, 'Data retrieved', itemDtos);
            } else {
                return new CommonResponseModel(false, 0, 'No data found');
            }
        } catch (err) {
            throw err;
        }
    }
    
    
}