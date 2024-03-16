import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "./entittes/style-entity";
import { BomCreationFiltersReq, BomDataForStyleAndSeasonModel, BomExcelreq, BomGenerationReq, BomProposalDataModel, BomProposalReq, BomReportModel, BomReportSizeModel, CommonResponseModel, ItemInfoFilterReq, MarketingReportModel, MarketingReportSizeModel, PoDataForBomGenerationModel, PpmDateFilterRequest, ShippingTypeEnum, StyleNumReq, updateItemId } from "@project-management-system/shared-models";
import { DataSource, Repository, getManager } from "typeorm";
import { StyleDto } from "./dto/style-dto";
import { BomEntity } from "./entittes/bom-entity";
import { StyleComboEntity } from "./entittes/style-combo-entity";
import { StyleRepo } from "./dto/style-repo";
import { BomRepo } from "./dto/bom-repo";
import { StyleComboRepo } from "./dto/style-combo-repo";
import { BomDto } from "./dto/bom-dto";
import { StyleComboDto } from "./dto/style-combo-dto";
import { DpomRepository } from "../dpom/repositories/dpom.repository";
import { StyleIdReq } from "./dto/api-requests";
import { PoBomEntity } from "./entittes/po-bom.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { FileUploadEntity } from "./entittes/file-upload-entity";
import * as XLSX from 'xlsx';
import { log } from "winston";
import { DpomEntity } from "../dpom/entites/dpom.entity";
import { AppDataSource, AppDataSource2 } from "../app-datasource";
import { object } from "prop-types";
import { PoBomRepo } from "./repo/po-bom-repo";
import { ZFactorsRepo } from "./repo/z-factors-repo";
import { ItemsRepo } from "./repo/items-repo";
import { DestinationsRepo } from "./repo/destination-repo";
import { ZFactorsBomRepo } from "./repo/z-factors-bom-repo";
import { ZFactorsBomEntity } from "./entittes/z-factors-bom.entity";
import { ItemEntity } from "./entittes/item-entity";
import { Console, group } from "console";
import { itemWiseMOQ } from "./moq-data";
import { ApiSizeMatrixRepo } from "./repo/apasizematrix-repo";




@Injectable()
export class BomService {
    constructor(

        private styleRepo: StyleRepo,
        private bomRepo: BomRepo,
        private styleComboRepo: StyleComboRepo,
        private dataSource: DataSource,
        private dpomRepo: DpomRepository,
        private poBomRepo: PoBomRepo,
        private zFactorsRepo: ZFactorsRepo,
        private itemsRepo: ItemsRepo,
        private destinationsRepo: DestinationsRepo,
        private zFactorsBomRepo: ZFactorsBomRepo,
        private apaSizeamtrixRepo: ApiSizeMatrixRepo

    ) { }
    async createBom(req: StyleDto): Promise<CommonResponseModel> {
        try {
            const entity = new StyleEntity()
            entity.style = req.style
            entity.season = req.season
            entity.styleName = req.styleName
            entity.mscCode = req.msc

            let bomEntityArray = []
            for (const bom of req.bomdto) {
                const bomEntity = new BomEntity()
                bomEntity.description = bom.description
                bomEntity.imCode = bom.imCode
                bomEntity.itemType = bom.itemType
                bomEntity.use = bom.use
                let styleComboArray = []
                for (const styleCombo of bom.styleCombo) {
                    const styleComboEntity = new StyleComboEntity()
                    styleComboEntity.combination = styleCombo.combination
                    styleComboEntity.primaryColor = styleCombo.primaryColor
                    styleComboEntity.secondaryColor = styleCombo.secondaryColor
                    styleComboEntity.logoColor = styleCombo.logoColor
                    styleComboEntity.styleEntity = entity
                    styleComboArray.push(styleComboEntity)
                }
                bomEntity.styleComboEntity = styleComboArray
                bomEntityArray.push(bomEntity)
            }
            entity.bomEntity = bomEntityArray

            const save = await this.styleRepo.save(entity)
            if (save) {
                return new CommonResponseModel(true, 1, 'Created Sucessfully')
            } else {
                return new CommonResponseModel(false, 0, 'Something Went Wrong')

            }
        }
        catch (err) {
            throw err
        }
    }

    async getAllStylesData(): Promise<CommonResponseModel> {
        try {
            let stylesArray = []
            const style = await this.styleRepo.getStyelsData()
            if (style.length > 0) {
                for (const styleDetails of style) {
                    let bomdetailsArray = []
                    styleDetails.bomData = await this.bomRepo.getBomData(styleDetails.id)
                    for (const bom of styleDetails.bomData) {
                        const combo = await this.styleComboRepo.getStyleComboData(bom.bomId)
                        let styleCombosArray = []
                        for (const rec of combo) {
                            styleCombosArray.push(new StyleComboDto(rec.combination, rec.primaryColor, rec.secondaryColor, rec.logoColor))
                        }
                        bomdetailsArray.push(new BomDto(bom.itemName, bom.description, bom.imCode, bom.itemType, bom.use, styleCombosArray, bom.bomId, bom.styleId))
                    }
                    stylesArray.push(new StyleDto(styleDetails.style, styleDetails.styleName, styleDetails.season, styleDetails.expNo, styleDetails.msc, styleDetails.factoryLo, styleDetails.status, styleDetails.fileData, bomdetailsArray))
                }
            }
            console.log(stylesArray, 'stylesarray')
            if (stylesArray) {
                return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', stylesArray)

            } else {
                return new CommonResponseModel(false, 1, 'No Data Found', [])
            }
        }
        catch (err) {
            throw err
        }
    }



    async getAll(): Promise<CommonResponseModel> {
        try {
            const query = 'SELECT b.use,s.id as styeleId,s.style, s.style_name AS styleName,s.season,s.exp_no AS expNo,b.id AS bomId,b.style_id as bstyleId,b.item_name AS itemName,b.DESCRIPTION,b.im_code AS imCode,b.item_type AS itemType ,sc.id AS styleComboId,sc.bom_id AS sbomId,sc.style_id AS sstyleId,sc.combination,sc.primary_color AS primaryColor,sc.secondary_color AS secondaryColor,sc.logo_color AS logoColor FROM styles s  LEFT JOIN bom b ON b.style_id=s.id LEFT JOIN style_combos sc ON sc.bom_id=b.id'
            const result = await this.dataSource.query(query)
            const bomDetailsmap = new Map<number, BomDto>()
            if (result.length > 0) {
                for (const rec of result) {
                    if (!bomDetailsmap.has(rec.bomId)) {
                        bomDetailsmap.set(rec.bomId, new BomDto(rec.itemName, rec.DESCRIPTION, rec.imCode, rec.itemType, rec.use, [], rec.bomId, rec.bstyleId))
                    }
                    bomDetailsmap.get(rec.bomId).styleCombo.push(new StyleComboDto(rec.combination, rec.primaryColor, rec.secondaryColor, rec.logoColor))
                }
                const bomInfo: BomDto[] = []
                bomDetailsmap.forEach((e) => {
                    bomInfo.push(e)
                })
                const finalData = new StyleDto(result.style, result.styleName, result.season, result.expNo, result.msc, result.factoryLo, result.status, result.fileData, bomInfo)

                return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', finalData)
            } else {
                return new CommonResponseModel(false, 1, 'No Data Found', [])
            }


        }
        catch (err) {
            throw err
        }
    }

    // async getPpmPoLineData(): Promise<CommonResponseModel> {
    //     const details = await this.dpomRepo.getPoLineData();
    //     if (details.length < 0) {
    //         return new CommonResponseModel(false, 0, 'data not found');
    //     }

    //     // Limit the data to the first 100 records for testing
    //     const limitedDetails = details.slice(0, 100);

    //     const sizeDateMap = new Map<string, BomReportModel>();

    //     for (const rec of limitedDetails) {
    //         let sizeData = sizeDateMap.get(rec.po_and_line);

    //         if (!sizeData) {
    //             sizeData = new BomReportModel(
    //                 rec.po_number,rec.po_and_line,rec.DPOMLineItemStatus, rec.style_number,rec.destination_country_code,rec.destination_country,rec.planning_season_code,rec.planning_season_year,
    //                 rec.geo_code,
    //                 rec.total_item_qty, // Assuming this property exists in your data
    //                 []
    //             );

    //             sizeDateMap.set(rec.po_and_line, sizeData);
    //         }

    //         if (!sizeData.sizeWiseData) {
    //             sizeData.sizeWiseData = [];
    //         }

    //         sizeData.sizeWiseData.push(new BomReportSizeModel(rec.size_description, rec.size_qty));
    //     }

    //     const dataModelArray: BomReportModel[] = [];
    //     sizeDateMap.forEach(sizeData => dataModelArray.push(sizeData));

    //     return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    // }
    //created  for sample purpose for 100 records

    async getPpmPoLineData(req: PpmDateFilterRequest): Promise<CommonResponseModel> {
        console.log(req)
        const details = await this.dpomRepo.getPoLineData(req);
        if (details.length < 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }

        const sizeDateMap = new Map<string, BomReportModel>();

        for (const rec of details) {
            let sizeData = sizeDateMap.get(rec.po_and_line);
            if (!sizeData) {
                sizeData = new BomReportModel(
                    rec.id,
                    rec.po_number,
                    rec.po_and_line,
                    // rec.DPOMLineItemStatus, // Assuming this property exists in your data
                    rec.style_number,
                    rec.destination_country_code,
                    rec.destination_country,
                    rec.planning_season_code,
                    rec.planning_season_year,
                    rec.geo_code,
                    rec.total_item_qty, // Assuming this property exists in your data
                    [],
                    rec.gender_age_desc,
                    '',
                    rec.item,
                    rec.plant
                );
                sizeDateMap.set(rec.po_and_line, sizeData);
            }
            if (!sizeData.sizeWiseData) {
                sizeData.sizeWiseData = [];
            }
            sizeData.sizeWiseData.push(new BomReportSizeModel(rec.size_description, rec.size_qty));
        }
        const dataModelArray: BomReportModel[] = [];
        sizeDateMap.forEach(sizeData => dataModelArray.push(sizeData));
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }

    async getPoLineDataForCihinaInserttag(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        const details = await this.dpomRepo.getPoLineDataForCihinaInserttag(req);
        if (details.length < 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }
        const sizeDateMap = new Map<string, BomReportModel>();
        for (const rec of details) {
            let sizeData = sizeDateMap.get(rec.po_and_line);
            console.log(rec, 'RECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
            if (!sizeData) {
                sizeData = new BomReportModel(
                    rec.po_number,
                    rec.po_and_line,
                    rec.DPOMLineItemStatus, // Assuming this property exists in your data
                    rec.style_number,
                    rec.destination_country_code,
                    rec.destination_country,
                    rec.planning_season_code,
                    rec.planning_season_year,
                    rec.geo_code,
                    rec.total_item_qty, // Assuming this property exists in your data
                    [],
                    rec.gender_age_desc,
                    rec.ogac
                );
                sizeDateMap.set(rec.po_and_line, sizeData);
            }

            if (!sizeData.sizeWiseData) {
                sizeData.sizeWiseData = [];
            }

            sizeData.sizeWiseData.push(new BomReportSizeModel(rec.size_description, rec.size_qty));
        }

        const dataModelArray: BomReportModel[] = [];
        sizeDateMap.forEach(sizeData => dataModelArray.push(sizeData));

        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }



    async getStylesData(): Promise<CommonResponseModel> {
        const stylesData = await this.styleRepo.getStyelsData()
        if (stylesData.length) {
            return new CommonResponseModel(true, 1111, "Date retreived sucessfully", stylesData)
        } else {
            return new CommonResponseModel(false, 1110, "No data found")
        }
    }

    async getBomDataForStyle(req: StyleIdReq): Promise<CommonResponseModel> {
        // const bomData = await this.bomRepo.getBomData(req.styleId)
        // const bomdetailsArray: BomDto[] = []
        // for (const bom of bomData) {
        //     const combo = await this.styleComboRepo.getStyleComboData(bom.bomId)
        //     let styleCombosArray: StyleComboDto[] = []
        //     for (const rec of combo) {
        //         styleCombosArray.push(new StyleComboDto(rec.combination, rec.primaryColor, rec.secondaryColor, rec.logoColor,rec.color))
        //     }
        //     bomdetailsArray.push(new BomDto(bom.itemName, bom.description, bom.imCode, bom.itemType, bom.use, styleCombosArray, bom.bomId, bom.styleId))
        // }
        const bomData = await this.bomRepo.getAllBomData(req.styleId)

        const bomMap = new Map<number, BomDto>()
        for (const rec of bomData) {
            if (!bomMap.has(rec.bomId)) {
                bomMap.set(rec.bomId, new BomDto(rec.itemName, rec.description, rec.imCode, rec.itemType, rec.use, [], rec.bomId, rec.styleId))
            }
            bomMap.get(rec.bomId).styleCombo.push(new StyleComboDto(rec.combination, rec.primaryColor, rec.secondaryColor, rec.logoColor, rec.color))
        }
        const bomInfo: BomDto[] = []
        bomMap.forEach(rec => {
            bomInfo.push(rec)
        })
        return new CommonResponseModel(true, 11111, "Data retreived sucessfully", bomInfo)

    }

    async getBomCreationData(req: BomCreationFiltersReq): Promise<CommonResponseModel> {
        const data = await this.dpomRepo.getBomCreationData(req)
        return new CommonResponseModel(true, 11111, "Data retreived sucessfully", data)
    }

    async calculateMOQForEachItem(bomQty: number, geoCode: string, regionSum: number, itemId: number): Promise<number> {
        if (itemId == 1) {
            const moq = itemWiseMOQ[itemId].find(v => v.geoCode = geoCode).qty
            if (moq > regionSum) {
                const excessQty = moq - regionSum;
                const adjustmentRatio = bomQty / regionSum;
                const additionalQty = Math.round(adjustmentRatio * excessQty);
                return bomQty + additionalQty;
            }
            return bomQty
        }
        return bomQty
    }

    async generateBom(req: BomGenerationReq): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        await transactionManager.startTransaction()
        try {
            const { poLine, updatedSizes } = req
            const poData = await this.dpomRepo.getPoDataForBomGeneration({ poLine })
            const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })
            const styleDataMap = new Map<string, BomDataForStyleAndSeasonModel[]>()
            const regionDataMap = new Map<string, { poData: PoDataForBomGenerationModel[], totalQty: number }>()
            // moq logic for wash care label
            function calculateBomQty(poQty: number, consumption: number, shippingType: ShippingTypeEnum) {
                const excessQty = shippingType == ShippingTypeEnum.DIRECT ? 1.02 : 1.03
                const bomQty = poQty * consumption;
                const bomQtyWithExcess = bomQty * excessQty; // Adding 3% excess
                return bomQtyWithExcess;
            }

            function getUpdatedQty(poLine: string, poQty) {
                if (updatedSizes.length) {
                    const updatedSize = updatedSizes.find((u) => u.poLine == poLine)
                    if (updatedSize) {
                        return updatedSize.qty
                    }
                }
                return poQty
            }

            const poBomEntities: PoBomEntity[] = []

            for (const po of poData) {
                const bomDestinations = destinations.find((v) => v.destination == po.destination)
                const { geoCode } = bomDestinations
                if (!regionDataMap.has(geoCode)) {
                    regionDataMap.set(geoCode, { poData: [po], totalQty: po.qty });
                } else {
                    const poData = regionDataMap.get(geoCode).poData
                    poData.push(po)
                    const totalQty = regionDataMap.get(geoCode).totalQty + po.qty
                    regionDataMap.set(geoCode, { poData, totalQty })
                }

                let styleData: BomDataForStyleAndSeasonModel[] = []
                if (!styleDataMap.has(po.styleNumber)) {
                    styleData = await this.bomRepo.getTrimBomDataForStyleAndSeason({ style: po.styleNumber, season: po.season, year: po.year, itemId: req.itemId })
                    styleDataMap.set(po.styleNumber, styleData)
                } else {
                    styleData = styleDataMap.get(po.styleNumber)
                }
                

                const updatedQty = getUpdatedQty(po.poLineNo, po.qty)
                for (const styleBom of styleData) {
                    // console.log(styleBom)

                    // console.log(consumptions,styleBom.itemId)

                    const { consumption } = req.updatedConsumptions.length ? req.updatedConsumptions.find((v) => {
                        if (v.consumptionAgainst == 'item') {
                            return v.item == po.item
                        } else {
                            return v.style == po.styleNumber
                        }
                    }) : { consumption: 1 }
                    const bomQty = calculateBomQty(updatedQty, consumption, po.shippingType)
                    const poBomEntity = new PoBomEntity()
                    const bom = new BomEntity()

                    bom.id = styleBom.bomId
                    poBomEntity.bom = bom
                    poBomEntity.consumption = consumption ? consumption : 1
                    poBomEntity.moq = 1
                    poBomEntity.wastage = 1.03
                    poBomEntity.bomQty = bomQty
                    poBomEntity.poQty = po.qty
                    const dpom = new DpomEntity()
                    dpom.id = po.id
                    poBomEntity.dpom = dpom

                    const zfactors = await this.zFactorsBomRepo.getZfactorBomValues(styleBom.itemId)
                    for (const zfactor of zfactors) {
                        if (styleBom.imCode == zfactor.actualIm && styleBom.itemId == zfactor.itemId) {
                            if (geoCode == zfactor.geoCode || po.destination == zfactor.destination) {
                                const zfactorID = new ZFactorsBomEntity()
                                zfactorID.id = zfactor.id
                                poBomEntity.zFactorBom = zfactorID
                                poBomEntity.bom = null
                                // console.log(poBomEntity)
                            }
                        }
                    }

                    poBomEntities.push(poBomEntity)
                    // await transactionManager.getRepository(PoBomEntity).insert(poBomEntity)

                }
                const zfactorsToAdd = await this.zFactorsBomRepo.getZfactorBomValuesToAdd(req.itemId)
                for (const ab of zfactorsToAdd) {
                    if (po.destination == ab.destination || po.styleNumber == ab.style) {

                        if (req.itemId == 1 && ab.plantCode?.split(",").includes(po.plant)) continue;
                        const poBomExtraITem = new PoBomEntity()
                        poBomExtraITem.consumption = 1
                        poBomExtraITem.moq = 1
                        poBomExtraITem.wastage = 1
                        poBomExtraITem.bomQty = po.qty
                        poBomExtraITem.poQty = updatedQty
                        const dpom = new DpomEntity()
                        dpom.id = po.id
                        poBomExtraITem.dpom = dpom
                        const zfactorID = new ZFactorsBomEntity()
                        zfactorID.id = ab.id
                        poBomExtraITem.zFactorBom = zfactorID
                        poBomExtraITem.bom = null
                        poBomEntities.push(poBomExtraITem)
                        // await transactionManager.getRepository(PoBomEntity).insert(poBomExtraITem)
                    }
                }
            }
            // moq logic before insering

            const moqData = [
                {
                    region: "NA",
                    moqQty: 300
                }, {
                    region: "EMEA",
                    moqQty: 500
                }, {
                    region: "AAO",
                    moqQty: 500
                }, {
                    region: "APA",
                    moqQty: 500
                }
            ]

            for (const reg of ["EMEA", "APA", "AAO", "NA"]) {
                if (regionDataMap.has(reg)) {
                    const moq = moqData.find((v) => v.region == reg)?.moqQty
                    const regionTotal = regionDataMap.get(reg).totalQty
                    if (regionTotal < moq) {
                        for (const regPOObj of regionDataMap.get(reg).poData) {
                            const div = moq / regionTotal
                            const moqPoQty = regPOObj.qty * div
                            poBomEntities.find((p) => p.dpom.id == regPOObj.id).bomQty = moqPoQty
                        }
                    }
                }
            }

            for (const rec of poBomEntities) {
                const isBomRecExist = await this.poBomRepo.checkIfBomGenerated(rec.dpom.id, rec.bom ? rec.bom.id : null, rec.zFactorBom ? rec.zFactorBom.id : null)
                if (isBomRecExist) continue
                await transactionManager.getRepository(PoBomEntity).insert(rec)

            }

            await transactionManager.completeTransaction()
            return new CommonResponseModel(true, 11111, "Data retreived sucessfully")

        } catch (err) {
            await transactionManager.releaseTransaction()
            throw err
        }
    }

    async saveExcelData(val): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource);
        const detailedArray: StyleDto[] = []
        const map = new Map<string, Map<string, StyleComboDto[]>>()
        const styleMap = new Map<string, StyleDto>()
        const bommap = new Map<string, Map<string, BomDto>>()
        try {
            // await transactionManager.startTransaction()
            const itemsData = await this.itemsRepo.find({ select: ['itemId', 'item'] })
            const jsonData: any[] = await this.convertExcelToJson(val);
            const headerRow = jsonData[0];

            if (!jsonData.length) {
                return new CommonResponseModel(true, 1110, 'No data found in excel');
            }
            // console.log(jsonData)
            // const data = await this.updatePath(val.path, val.filename, transactionManager);
            const jsonArray: any = jsonData.slice(1).map((row, arrInd) => {
                const obj: any = {};
                headerRow.forEach((header: any, index: any) => {
                    let headerWithoutSpace = header
                        .replace(/[^a-zA-Z0-9]/g, ' ')
                        .split(' ')
                        .map((word, index) =>
                            index === 0
                                ? word.toLowerCase()
                                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                        )
                        .join('');

                    obj[headerWithoutSpace] = row[index];

                });
                return obj;
            });

            const styleMap = new Map<string, StyleEntity>()
            const bomMap = new Map<string, BomEntity>()
            for (const rec of jsonArray) {
                if (!styleMap.has(rec.styleNbr)) {
                    const styleEntityObj = new StyleEntity()
                    styleEntityObj.styleName = rec.styleNm;
                    styleEntityObj.mscLevelOne = rec.mscLevel1
                    styleEntityObj.mscLevelTwo = rec.mscLevel2
                    styleEntityObj.mscLevelThree = rec.mscLevel3
                    styleEntityObj.mscCode = rec.mscCode
                    styleEntityObj.season = rec.seasonCd
                    styleEntityObj.style = rec.styleNbr
                    styleEntityObj.year = rec.seasonYr
                    styleEntityObj.bomEntity = []
                    styleMap.set(rec.styleNbr, styleEntityObj)
                }

                if (!bomMap.has(rec.styleNbr + rec.itemNbr)) {
                    const bomEntityObj = new BomEntity()
                    bomEntityObj.imCode = rec.itemNbr;
                    bomEntityObj.itemType = rec.itemType1;
                    bomEntityObj.use = rec.use;
                    bomEntityObj.qty = rec.qty
                    bomEntityObj.uom = rec.uom
                    bomEntityObj.description = rec.description
                    bomEntityObj.itemTypeOne = rec.itemType1
                    let itemName = rec.itemType2
                    if (rec.itemNbr == "445591") {
                        itemName = 'Wash Care Label'
                    }
                    if (rec.description.includes("CONTENT INFORMATION") || rec.use.includes("CARE INSTRUCTIONS")) {
                        itemName = "Wash Care Label"
                    }
                    if (rec.description.toLowerCase().includes("JOKERTAG")) {
                        itemName = "JOKER TAG"
                    }
                    if (rec.itemNbr == "1188") {
                        itemName = "EMB Threads"
                    }
                    if (rec.description.toLowerCase().includes("size strip")) {
                        itemName = "Size Strip"
                    }
                    if (rec.itemNbr == "10877" || rec.itemNbr == "1029386") {
                        itemName = "Twill Tape-shoulder"
                    }
                    if (rec.itemNbr == "itemNbr") {
                        itemName = "Main Woven labels"
                    }
                    if (rec.description.includes("SWOOSH HT")) {
                        itemName = "Swoosh HT label"
                    }
                    if (rec.use.includes("BACK NECK TAPE") || rec.use.includes("HERRINGBONE TAPE")) {
                        itemName = "Neck Tape"
                    }
                    if (rec.description.includes("JOCKTAGE")) {
                        itemName = "Jocktage Label"
                    }
                    if (rec.description.includes("1/4 FLAT RUBBER")) {
                        itemName = "Mobilon Tape"
                    } if (rec.description.includes("NIKE I.D. LABEL")) {
                        itemName = "Poid Label"
                    }
                    if (rec.description.includes("SPARE BUTTON LABEL")) {
                        itemName = "Spare button label"
                    }

                    bomEntityObj.itemName = itemName
                    // bomEntityObj.styleEnityy = style
                    const itemID = itemsData.find((i) => i.item == rec.itemType2) ? itemsData.find((i) => i.item == rec.itemType2).itemId : 29
                    const item = new ItemEntity()
                    item.itemId = itemID
                    bomEntityObj.itemEntity = item
                    bomEntityObj.styleComboEntity = []
                    bomMap.set(rec.styleNbr + rec.itemNbr, bomEntityObj)
                    // console.log(bomEntityObj)
                }
                const styleComboEntityObj = new StyleComboEntity()
                styleComboEntityObj.combination = rec.styleCwCd
                styleComboEntityObj.logoColor = rec.logo
                styleComboEntityObj.primaryColor = rec.prmry
                styleComboEntityObj.secondaryColor = rec.scndy
                styleComboEntityObj.itemColor = rec?.itemColorCd + " " + rec.itemColorNm

                // console.log(bomMap.get(rec.styleNm + rec.itemNbr))
                bomMap.get(rec.styleNbr + rec.itemNbr).styleComboEntity.push(styleComboEntityObj)
                styleMap.get(rec.styleNbr).bomEntity.push(bomMap.get(rec.styleNbr + rec.itemNbr))
            }
            for (const obj of styleMap.values()) {
                // console.log(obj)
                await this.styleRepo.save(obj)
            }
            return new CommonResponseModel(true, 1111, 'Data saved sucessfully', styleMap.keys());
        } catch (err) {
            console.log(err)
            // await transactionManager.releaseTransaction()
            throw ("Error Occured")
        }
    }

    async convertExcelToJson(file): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const workbook = XLSX.readFile(file.path);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: '',
                    raw: false,
                    // dateNF: 'DD/MM/YYYY HH:mm'
                });
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        });
    }

    async updatePath(filePath: string, filename: string, transactionManager: GenericTransactionManager): Promise<any> {
        try {
            const entity = new FileUploadEntity();
            entity.fileName = filename;
            entity.filePath = filePath;
            const filePathUpdate = await transactionManager.getRepository(FileUploadEntity).save(entity);
            if (filePathUpdate) {
                return new CommonResponseModel(
                    true,
                    11,
                    'uploaded successfully',
                    filePathUpdate
                );
            } else {
                return new CommonResponseModel(false, 11, 'uploaded failed');
            }
        } catch (error) {
            await transactionManager.releaseTransaction()
        }
    }


    async migrateData() {
        await AppDataSource2.initialize()
        const data = await AppDataSource2.getRepository(StyleComboEntity).find({ relations: ['styleEntity', 'bomEntity',] })
        for (const rec of data) {
            rec.createdAt = "2024-01-25 09:51:07.522162"
            rec.updatedAt = "2024-01-25 09:51:07.522162"
            await this.styleComboRepo.insert(rec)
        }

    }

    async generateProposal(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })

        const poBomData = await this.poBomRepo.getProposalsData(req)
        const poBomZfactorData = await this.poBomRepo.getZfactorsData(req)
        let sortData = [...poBomData, ...poBomZfactorData]
        let data = sortData.sort((a, b) => a.sequence - b.sequence);
        const groupedData: any = data.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, ogacDate, shipToNumber } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            const { geoCode } = bomGeoCode
            let key = `${geoCode}-${styleNumber}-${imCode}-${itemNo}`;

            if (['Brazil', 'Argentina'].includes(destination)) {
                key = `${key}-${destination}`
                if (destination == 'Brazil') {
                    key = `${key}-${shipToNumber}`
                }
            }
            if (!result[key]) {
                result[key] = {
                    geoCode,
                    styleNumber,
                    description,
                    use,
                    imCode,
                    itemNo,
                    bomQty: 0,
                    destination,
                    itemId,
                    poNumber,
                    gender,
                    season,
                    year,
                    shipToNumber,
                    displayInMainReq: true,
                    sizeWiseQty: [],
                    chinaSizes: [],
                    indonesiaSize: [],
                    ogacDateWiseQty: [],
                    shipToWiseQty: []

                };
            }
            if (geoCode == 'APA') {

                if (!result[key].sizeWiseQty.some((entry: any) => entry.ogacDate === ogacDate)) {
                    const sizeWiseEntry: any = { ogacDate };
                    sizeWiseEntry[size] = bomQty;
                    result[key].sizeWiseQty.push(sizeWiseEntry);
                } else {
                    const existingEntry = result[key].sizeWiseQty.find((entry: any) => entry.ogacDate === ogacDate);
                    existingEntry[size] = (existingEntry[size] || 0) + bomQty;
                }

                if (destination == 'China') {
                    result[key].displayInMainReq = false
                    const sizeIndex = result[key]['chinaSizes'].findIndex((v) => v.size === size)
                    if (sizeIndex >= 0) {
                        result[key]['chinaSizes'][sizeIndex].qty += bomQty
                    } else {
                        result[key].chinaSizes.push({ size, qty: bomQty });
                    }
                }

                if (destination == 'Indonesia') {
                    result[key].displayInMainReq = false
                    const sizeIndex = result[key]['indonesiaSize'].findIndex((v) => v.size === size)
                    if (sizeIndex >= 0) {
                        result[key]['indonesiaSize'][sizeIndex].qty += bomQty
                    } else {
                        result[key].indonesiaSize.push({ size, qty: bomQty });
                    }
                }


            }

            result[key].bomQty += bomQty;
            return result;
        }, {});
        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 11, 'Data retreived', groupedArray);
    }

    // async getBomExcel(req: BomCreationFiltersReq): Promise<CommonResponseModel> {
    //     let query = ` SELECT pb.dpom_id, dp.style_number AS style, dp.item AS item, dp.geo_code AS geo_code
    //       FROM po_bom pb
    //         JOIN dpom dp ON dp.id = pb.dpom_id
    //        GROUP BY pb.dpom_id`
    //     if (req?.style) {
    //         query += ` WHERE dp.style = '${req.style}' GROUP BY dp.style`
    //     }
    //     const records = await this.bomRepo.query(query);
    //     return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)

    // }




    async getBomExcel(req?: BomExcelreq): Promise<CommonResponseModel> {

        let query = ` SELECT pb.dpom_id, dp.style_number AS style, dp.item AS item, dp.geo_code AS geo_code,count(dp.style_number) as style_number_count
          FROM po_bom pb
           LEFT JOIN dpom dp ON dp.id = pb.dpom_id
            Where 1=1`
        if (req?.style) {
            query += ` and dp.style_number = '${req.style}'`
        }
        if (req?.geoCode) {
            query += ` and dp.geo_code = '${req.geoCode}'`
        }
        query = query + ` GROUP BY pb.dpom_id`
        const records = await this.bomRepo.query(query);
        return new CommonResponseModel(true, 12345, "Data Retrieved Successfully", records)

    }

    async getBom(req?: any): Promise<CommonResponseModel> {
        const query = `SELECT pb.bom_id ,pb.bom_qty,b.im_code FROM po_bom pb
        LEFT JOIN bom b ON b.id = pb.bom_id 
        WHERE pb.dpom_id IN (${req})`
        const records = await this.bomRepo.query(query);
        return new CommonResponseModel(true, 65486, "Data Retrieved Successfully", records)

    }


    async getStyle(req?: any): Promise<CommonResponseModel> {
        const query = `SELECT dp.style_number AS style
        FROM po_bom pb
        LEFT JOIN dpom dp ON dp.id = pb.dpom_id
        GROUP BY dp.style_number`;

        const data = await this.bomRepo.query(query)
        if (data.length) {
            return new CommonResponseModel(true, 1, 'data retrived', data)
        } else {
            return new CommonResponseModel(false, 0, 'error')
        }
    }

    async getGeoCode(): Promise<CommonResponseModel> {
        const query = `SELECT dp.id AS id, dp.geo_code AS geoCode
        FROM dpom dp
        WHERE dp.geo_code IS NOT NULL
        GROUP BY dp.geo_code`;

        const data = await this.bomRepo.query(query)
        if (data.length) {
            return new CommonResponseModel(true, 1, 'data retrived', data)
        } else {
            return new CommonResponseModel(false, 0, 'error')
        }
    }


    async generateProposalForButton(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })

        const poBomData = await this.poBomRepo.getProposalsDataForButton(req)
        // const poBomZfactorData = await this.poBomRepo.getZfactorsData(req)
        // console.log(poBomZfactorData, '---po bom zfactord data')
        let data = [...poBomData]
        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, attribute, attributeValue, productCode, bQty, poQty } = currentItem;
            // console.log(season)
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            const { geoCode } = bomGeoCode

            let key = `${styleNumber}-${imCode}-${itemNo}-${color}-${itemColor}`;
            if (req.trimName === 'Twill Tape') {
                key += `-${season}`;
            }
            if (!result[key]) {
                result[key] = {
                    geoCode,
                    styleNumber,
                    description,
                    use,
                    imCode,
                    itemNo,
                    bomQty: 0,
                    destination,
                    itemId,
                    poNumber,
                    gender,
                    season,
                    year,
                    color,
                    itemColor,
                    productCode,
                    bQty,
                    poQty,
                    attribute,
                    attributeValue,
                    sizeWiseQty: [],
                    // colorData: []
                };
            }
            const sizeIndex = result[key]['sizeWiseQty'].findIndex((v) => v.size === size)
            if (sizeIndex >= 0) {
                result[key]['sizeWiseQty'][sizeIndex].qty += bomQty
            } else {
                result[key].sizeWiseQty.push({ size, qty: bomQty });
            }
            result[key].bomQty += bomQty;
            return result;
        }, {});
        // console.log(groupedData,'@@@@@@@@@@@@@@@')
        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 11, 'Data retreived', groupedArray);
    }

    // async generateProposalForNeckTape(req: BomProposalReq): Promise<CommonResponseModel> {
    //     const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })

    //     const poBomData = await this.poBomRepo.getProposalsDataForButton(req)

    //     let data = [...poBomData]
    //     const groupedData: any = poBomData.reduce((result, currentItem:BomProposalDataModel) => {
    //         const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size ,poNumber,gender,season,year,color,itemColor,productCode} = currentItem;
    //         // console.log(season)
    //         const bomGeoCode = destinations.find((v) => v.destination == destination)
    //         const { geoCode } = bomGeoCode
    //         const key = `${geoCode}-${styleNumber}-${imCode}-${itemNo}`;

    //         if (!result[key]) {
    //             result[key] = {geoCode,styleNumber,description,use,imCode,
    //                 itemNo,bomQty: 0,destination,itemId,poNumber,gender, season,year, color,itemColor,productCode,};
    //         }
    //         result[key].bomQty += bomQty;
    //         return result;
    //     }, {});
    //     const groupedArray: any[] = Object.values(groupedData);
    //     return new CommonResponseModel(true, 11, 'Data retreived', groupedArray);
    // }
    async generateProposalForNeckTape(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] });

        const poBomData = await this.poBomRepo.getProposalsDataForNeckTape(req);
        // console.log(poBomData,"poBomData")
        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {


            const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, productCode } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination === destination);
            const { geoCode } = bomGeoCode;
            const key = `${styleNumber}-${imCode}-${itemNo}-${color}-${itemColor}`;

            if (!result[key]) {
                result[key] = {
                    geoCode, styleNumber, description, use, season, year, imCode, itemNo, colors: []
                };
            }

            // result[key].colors.push({
            //     color,
            //     itemColor,
            //     bomQty,
            // });

            const key2 = `${color}-${itemColor}`;
            const existingColor = result[key].colors.find((c: any) => c.key === key2);
            if (existingColor) {
                existingColor.bomQty += bomQty;
            } else {
                result[key].colors.push({
                    key: key2,
                    color,
                    itemColor,
                    bomQty
                });
            }
            return result;

        }, {});

        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 11, 'Data retrieved', groupedArray);
    }

    // async generatePropsalForHtLabel(req: BomProposalReq): Promise<CommonResponseModel> {
    //     const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })
    //     const poBomData = await this.poBomRepo.getProposalsDataForButton(req)
    //     const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
    //         const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, productCode, combination } = currentItem;
    //         const bomGeoCode = destinations.find((v) => v.destination == destination)
    //         const { geoCode } = bomGeoCode

    //         const key = `${styleNumber}-${imCode}-${itemNo}-${color}-${itemColor}`;

    //         if (!result[key]) {
    //             result[key] = {
    //                 geoCode,
    //                 styleNumber,
    //                 description,
    //                 use,
    //                 imCode,
    //                 itemNo,
    //                 bomQty: 0,
    //                 destination,
    //                 itemId,
    //                 poNumber,
    //                 gender,
    //                 season,
    //                 year,
    //                 color,
    //                 itemColor,
    //                 productCode,
    //                 combination,
    //                 sizeWiseQty: [],
    //                 extraSizeWiseQty: []
    //             };
    //         }
    //         const sizeIndex = result[key]['sizeWiseQty'].findIndex((v) => v.size === size)
    //         if (size.includes('-')) {
    //             if (sizeIndex >= 0) {
    //                 result[key]['extraSizeWiseQty'][sizeIndex].qty += bomQty
    //             } else {
    //                 result[key].extraSizeWiseQty.push({ size, qty: bomQty });
    //             }
    //         }
    //         else {
    //             if (sizeIndex >= 0) {
    //                 result[key]['sizeWiseQty'][sizeIndex].qty += bomQty
    //             } else {
    //                 result[key].sizeWiseQty.push({ size, qty: bomQty });
    //             }
    //         }
    //         result[key].bomQty += bomQty;
    //         return result;
    //     }, { });
    // const groupedArray: any[] = Object.values(groupedData);
    // return new CommonResponseModel(true, 11, 'Data retreived', groupedArray);
    // }


    async generateProposalForTrims(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })
        const poBomData = await this.poBomRepo.getProposalsData(req)

        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, poQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, productCode } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            const { geoCode } = bomGeoCode
            let key = `${styleNumber}-${imCode}-${itemNo}`;
            if (req.trimName === 'Interlining') {
                key += `-${color}`;
            }
            else if (req.trimName === 'Mobilon Tape') {
                key += `-${styleNumber}`;
            }
            else if (req.trimName === 'Jocktage Label') {
                key += `-${season}`;
            }
            else if (req.trimName === 'Poid Label') {
                key += `${styleNumber}-${itemNo}`;
            }
            if (!result[key]) {
                result[key] = {
                    geoCode,
                    styleNumber,
                    description,
                    poQty,
                    use, imCode, itemNo, bomQty: 0, destination,
                    itemId,
                    poNumber,
                    gender,
                    season,
                    year,
                    color,
                    itemColor,
                    productCode,
                };
            }
            result[key].bomQty += bomQty;
            console.log(bomQty, "poQty at 1036")

            return result
        }, {})
        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 1, 'Data Retrived', groupedArray)
    }

    async generateProposalForElasticTrim(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })
        const poBomData = await this.poBomRepo.getProposalsDataForElastic(req)
        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, totalGarmentQty, poNumber, gender, season, year, color, itemColor, productCode, consumption } = currentItem;
            const key = `${styleNumber}-${imCode}-${itemNo}-${color}`;

            if (!result[key]) {
                result[key] = {
                    styleNumber, description, use, imCode, itemNo, bomQty: 0,
                    itemId, poNumber, gender, season, year, color, itemColor, productCode, consumption, colors: [],
                };
            }

            const reqqty = totalGarmentQty * consumption;
            const key2 = `${color}-${itemColor}-${totalGarmentQty}`;
            if (!result[key].colors.find((c: any) => c.key === key2)) {
                result[key].colors.push({
                    key: key2,
                    color,
                    itemColor,
                    reqqty,
                    totalGarmentQty
                });
            }

            return result;
        }, {})
        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 1, 'Data Retrieved', groupedArray)
    }

    async generateProposalForTissuePaper(req: BomProposalReq): Promise<CommonResponseModel> {

        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] });
        const poBomData = await this.poBomRepo.getProposalsData(req);
        const groupedData: any[] = poBomData.reduce((result: any[], currentItem: BomProposalDataModel) => {
            const { styleNumber, bomQty, itemNo, destination } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination === destination);
            const key = `${styleNumber}-${itemNo}`;
            const existingGroup = result.find((group) => group.key === key);

            if (!existingGroup) {
                result.push({
                    key,
                    styleNumber,
                    itemNo,
                    bomQty: 0,
                });

            }
            const groupToUpdate = result.find((group) => group.key === key);
            if (groupToUpdate) {
                groupToUpdate.bomQty += bomQty;
            }

            return result;
        }, []);

        return new CommonResponseModel(true, 1, 'Data Retrieved', groupedData);
    }

    async generatePropsalForHtLabel(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })
        const poBomData = await this.poBomRepo.getProposalsDataForButton(req)
        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, productCode, combination } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            let htStyle
            const { geoCode } = bomGeoCode
            const key = `${styleNumber}-${imCode}-${itemNo}-${color}-${itemColor}`;

            if (!result[key]) {

                result[key] = {
                    htStyle,
                    geoCode,
                    styleNumber,
                    description,
                    use,
                    imCode,
                    itemNo,
                    bomQty: 0,
                    destination,
                    itemId,
                    poNumber,
                    gender,
                    season,
                    year,
                    color,
                    itemColor,
                    productCode,
                    combination,
                    teeStyelArray: [],
                    poloStyleArray: [],
                    sizeWiseQty: [],
                    extraSizeWiseQty: []
                };
            }
            const sizeIndex = result[key]['sizeWiseQty'].findIndex((v) => v.size === size)
            if (size.includes('-')) {
                if (sizeIndex >= 0) {
                    result[key]['extraSizeWiseQty'][sizeIndex].qty += bomQty
                } else {
                    result[key].extraSizeWiseQty.push({ size, qty: bomQty });
                }
            }
            else {
                if (sizeIndex >= 0) {
                    result[key]['sizeWiseQty'][sizeIndex].qty += bomQty
                } else {
                    result[key].sizeWiseQty.push({ size, qty: bomQty });
                }
            }

            result[key].bomQty += bomQty;
            return result;
        }, {});
        const groupedArray: any[] = Object.values(groupedData);
        // const obj=[groupedArray,teestylearray]
        return new CommonResponseModel(true, 11, 'Data retreived', groupedArray);
    }
    async getSizeHtLabelData(req: BomProposalReq): Promise<CommonResponseModel> {
        try {
            const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })

            const teeData = await this.poBomRepo.getProposalsDataForTeeStyle(req)
            const poloData = await this.poBomRepo.getProposalsDataForPoloStyle(req)

            const groupedTeeData: any = teeData.reduce((result, currentItem: BomProposalDataModel) => {
                const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, productCode, combination, fabricCode, fabricCombination, fabricContent, fit } = currentItem;
                const bomGeoCode = destinations.find((v) => v.destination == destination)
                let htStyle
                const { geoCode } = bomGeoCode
                const key = `${styleNumber}-${imCode}-${itemNo}-${color}-${itemColor}`;

                if (!result[key]) {

                    result[key] = {
                        fabricCode,
                        fabricCombination,
                        fabricContent,
                        fit,
                        htStyle,
                        geoCode,
                        styleNumber,
                        description,
                        use,
                        imCode,
                        itemNo,
                        bomQty: 0,
                        destination,
                        itemId,
                        poNumber,
                        gender,
                        season,
                        year,
                        color,
                        itemColor,
                        productCode,
                        combination,
                        sizeWiseQty: [],
                    };
                }
                const sizeIndex = result[key]['sizeWiseQty'].findIndex((v) => v.size === size)
                if (!size.includes('-')) {
                    if (sizeIndex >= 0) {
                        result[key]['sizeWiseQty'][sizeIndex].qty += bomQty
                    } else {
                        result[key].sizeWiseQty.push({ size, qty: bomQty });
                    }
                }
                result[key].bomQty += bomQty;
                return result;
            }, {});
            const groupedTeeArray: any[] = Object.values(groupedTeeData);

            const groupedPoloData: any = poloData.reduce((result, currentItem: BomProposalDataModel) => {
                const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, productCode, combination, fabricCode, fabricCombination, fabricContent, fit } = currentItem;
                const bomGeoCode = destinations.find((v) => v.destination == destination)
                const { geoCode } = bomGeoCode
                const key = `${styleNumber}-${imCode}-${itemNo}-${color}-${itemColor}`;
                if (!result[key]) {
                    result[key] = {
                        fabricCode,
                        fabricCombination,
                        fabricContent,
                        fit,
                        geoCode,
                        styleNumber,
                        description,
                        use,
                        imCode,
                        itemNo,
                        bomQty: 0,
                        destination,
                        itemId,
                        poNumber,
                        gender,
                        season,
                        year,
                        color,
                        itemColor,
                        productCode,
                        combination,
                        teeStyelArray: [],
                        poloStyleArray: [],
                        sizeWiseQty: [],
                        extraSizeWiseQty: []
                    };
                }
                const sizeIndex = result[key]['sizeWiseQty'].findIndex((v) => v.size === size)
                if (size.includes('-')) {
                    if (sizeIndex >= 0) {
                        result[key]['extraSizeWiseQty'][sizeIndex].qty += bomQty
                    } else {
                        result[key].extraSizeWiseQty.push({ size, qty: bomQty });
                    }
                }
                else {
                    if (sizeIndex >= 0) {
                        result[key]['sizeWiseQty'][sizeIndex].qty += bomQty
                    } else {
                        result[key].sizeWiseQty.push({ size, qty: bomQty });
                    }
                }

                result[key].bomQty += bomQty;
                return result;
            }, {});
            const groupedPoloArray: any[] = Object.values(groupedPoloData);
            const obj = { teeStyle: groupedTeeArray, poloStyle: groupedPoloArray }
            return new CommonResponseModel(true, 1, 'Data retrived', obj)

        } catch (err) {
            throw err
        }
    }
    async getMainWovenLableData(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })

        const poBomData = await this.poBomRepo.getProposalsDataForButton(req)
        let data = [...poBomData]
        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, attribute, attributeValue, productCode, bQty, poQty } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            const { geoCode } = bomGeoCode

            let key = `${styleNumber}-${imCode}-${itemNo}-${season} `;

            if (!result[key]) {
                result[key] = {
                    styleNumber, imCode, itemNo, bomQty: 0, itemId,
                    poNumber, gender, season, year,
                    color, itemColor, productCode,
                    bQty, poQty, attribute, attributeValue,
                    sizeWiseQty: [],
                    TsizeWiseqty: [],
                    SsizeWiseqty: []
                };
            }
            const sizeIndex = result[key]['sizeWiseQty'].findIndex((v) => v.size === size)
            if (size.includes('-T')) {
                if (sizeIndex >= 0) {
                    result[key]['TsizeWiseqty'][sizeIndex].qty += bomQty
                } else {
                    result[key].TsizeWiseqty.push({ size, qty: bomQty });
                }
            } else if (size.includes('-S')) {
                if (sizeIndex >= 0) {
                    result[key]['SsizeWiseqty'][sizeIndex].qty += bomQty
                } else {
                    result[key].SsizeWiseqty.push({ size, qty: bomQty });
                }
            } else {
                if (sizeIndex >= 0) {
                    result[key]['sizeWiseQty'][sizeIndex].qty += bomQty
                } else {
                    result[key].sizeWiseQty.push({ size, qty: bomQty });
                }
            }

            result[key].bomQty += bomQty;
            return result;
        }, {});
        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 11, 'Data retrieved', groupedArray);
    }


    async getSizeStrip(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })

        const poBomData = await this.poBomRepo.getSizeStrip(req)
        // const poBomZfactorData = await this.poBomRepo.getZfactorsData(req)
        // console.log(poBomZfactorData, '---po bom zfactord data')
        let data = [...poBomData]
        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, attribute, attributeValue, productCode, bQty, poQty } = currentItem;
            // console.log(season)
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            const { geoCode } = bomGeoCode
            const key = `${styleNumber}-${imCode}-${itemNo}-${color}-${itemColor}`;
            if (!result[key]) {
                result[key] = {
                    geoCode,
                    styleNumber,
                    description,
                    use,
                    imCode,
                    itemNo,
                    bomQty: 0,
                    destination,
                    itemId,
                    poNumber,
                    gender,
                    season,
                    year,
                    color,
                    itemColor,
                    productCode,
                    bQty,
                    poQty,
                    attribute,
                    attributeValue,
                    sizeWiseQty: [],
                    // colorData: []
                };
            }
            const sizeIndex = result[key]['sizeWiseQty'].findIndex((v) => v.size === size)
            if (sizeIndex >= 0) {
                result[key]['sizeWiseQty'][sizeIndex].qty += bomQty
            } else {
                result[key].sizeWiseQty.push({ size, qty: bomQty });
            }
            result[key].bomQty += bomQty;
            return result;
        }, {});
        // console.log(groupedData,'@@@@@@@@@@@@@@@')
        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 11, 'Data retreived', groupedArray);
    }

    async getImcodes(): Promise<CommonResponseModel> {
        const data = await this.bomRepo.getImcodes()
        if (data) {
            return new CommonResponseModel(true, 1, 'Data Retrived', data)
        } else {
            return new CommonResponseModel(false, 0, 'No Data', [])

        }
    }

    async getItemname(): Promise<CommonResponseModel> {
        const records = await this.bomRepo;
        const query = `SELECT i.item_id as itemId,i.item AS itemName FROM items i`
        const result = await this.bomRepo.query(query)
        if (result) {
            return new CommonResponseModel(true, 1, 'Data Retrived', result)
        } else {
            return new CommonResponseModel(false, 0, 'No Data', [])

        }

    }


    async updateItemid(req: updateItemId): Promise<CommonResponseModel> {
        try {
            console.log(req, "reqqqqqq")
            const query = ` UPDATE bom 
                SET item_id = '${req.itemId}'
                WHERE im_code = '${req.imCode}' `;
            const result = await this.dataSource.query(query)
            if (result) {
                return new CommonResponseModel(true, 1, 'Data Updated', result);
            } else {
                return new CommonResponseModel(false, 0, 'No Data Updated', []);
            }
        } catch (error) {
            // console.error("Error occurred during update:", error);
            return new CommonResponseModel(false, 0, 'Error occurred during update', []);
        }
    }
    async getApaSizeMatrix(req: StyleNumReq): Promise<CommonResponseModel> {
        try {
            // const query=`SELECT id,buy_month AS buyMonth,style_number AS styleNumber,style_type AS styleType,usa_size AS usaSize,china_size_matrixtype AS chinaSizeMatrixType,   china_top_size AS chinaTopSize,china_top_bodysize AS chinaTopBodySize,china_bottom_size AS chinaBottomSize,china_bottom_bodysize AS chinabottomBodySize,           korea_size_matrixtype AS koreaSizeMatrixType,korea_top_generic AS koreaTopGeneric,korea_top_chest AS koreaTopChest,            korea_top_height AS koreaTopHeight,korea_bottom_generic AS koreaBottomGeneric,korea_bottom_waist AS koreaBottomWaist,korea_bottom_hip AS koreaBottomWaist FROM apa_size_matrix where style_number in (:...style), { style: req.styleNumber }`
            // const result = await this.dataSource.query(query)
            const result = await this.apaSizeamtrixRepo.getApaSizeMatrixData(req)
            if (result) {
                return new CommonResponseModel(true, 1, 'Data Retrived', result)
            } else {
                return new CommonResponseModel(true, 1, 'Data Retrived', [])
            }
        }
        catch (err) {
            throw err
        }
    }
    async generateProposalForPOIDLabel(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })
        const poBomData = await this.poBomRepo.getProposalsData(req)
        console.log(poBomData, "poBomData")
        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, poQty, description, use, itemNo, itemId, destination, size, poNumber, gender, season, year, color, itemColor, productCode } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            const { geoCode } = bomGeoCode
            let key = `${styleNumber}-${imCode}-${itemNo}`;
            if (req.trimName === 'Poid Label') {
                key += `${styleNumber}-${itemNo}`;
            }
            if (!result[key]) {
                result[key] = {
                    geoCode,
                    styleNumber,
                    description,
                    poQty: 0,
                    use, imCode, itemNo, bomQty: 0, destination,
                    itemId,
                    poNumber,
                    gender,
                    season,
                    year,
                    color,
                    itemColor,
                    productCode,
                };
            }
            result[key].bomQty += bomQty;
            result[key].poQty += poQty;

            return result
        }, {})
        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 1, 'Data Retrived', groupedArray)
    }
    async generateProposalForKimble(req: BomProposalReq): Promise<CommonResponseModel> {
        const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })
        const poBomData = await this.poBomRepo.getProposalsDataForButton(req)
        const groupedData: any = poBomData.reduce((result, currentItem: BomProposalDataModel) => {
            const { styleNumber, imCode, bomQty, poQty, primaryColor, use, itemNo, itemId, destination, size, ogacDate, poNumber, gender, season, year, color, itemColor, productCode } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            const { geoCode } = bomGeoCode
            let key = `${styleNumber}-${imCode}-${itemNo}`;
            if (req.trimName === 'Poid Label') {
                key += `${styleNumber}-${ogacDate}`;
            }
            if (!result[key]) {
                result[key] = {
                    geoCode, styleNumber,
                    poQty: 0, itemNo, bomQty: 0,
                    itemId, poNumber, gender, primaryColor,
                    season, year, color, itemColor, productCode, ogacDate
                };
            }
            result[key].bomQty += bomQty;
            result[key].poQty += poQty;

            return result
        }, {})
        const groupedArray: any[] = Object.values(groupedData);
        return new CommonResponseModel(true, 1, 'Data Retrived', groupedArray)
    }
}






