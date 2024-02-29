import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "./entittes/style-entity";
import { BomCreationFiltersReq, BomDataForStyleAndSeasonModel, BomExcelreq, BomGenerationReq, BomProposalDataModel, BomProposalModel, BomProposalReq, BomReportModel, BomReportSizeModel, CommonResponseModel, ItemInfoFilterReq, MarketingReportModel, MarketingReportSizeModel, PpmDateFilterRequest } from "@project-management-system/shared-models";
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
        private zFactorsBomRepo: ZFactorsBomRepo

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

    async generateBom(req: BomGenerationReq): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        await transactionManager.startTransaction()
        try {
            const { poLine, updatedSizes } = req
            const poData = await this.dpomRepo.getPoDataForBomGeneration({ poLine })
            const destinations = await this.destinationsRepo.find({ select: ['destination', 'geoCode'] })
            const styleDataMap = new Map<string, BomDataForStyleAndSeasonModel[]>()

            function calculateBomQty(poQty: number, moq: number, consumption: number, wastage: number) {
                const wastageQty = (poQty * consumption) * (wastage / 100)
                const bomQty = (poQty * consumption) + wastageQty
                return bomQty
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
            console.log(poData, '-------- po data -------------')
            console.log(destinations)
            for (const po of poData) {
                let styleData: BomDataForStyleAndSeasonModel[] = []
                if (!styleDataMap.has(po.styleNumber)) {
                    styleData = await this.bomRepo.getBomDataForStyleAndSeason({ style: po.styleNumber, season: po.season, year: po.year })
                    styleDataMap.set(po.styleNumber, styleData)
                } else {
                    styleData = styleDataMap.get(po.styleNumber)
                }
                // console.log(po.styleNumber,styleData.length,' style size')
                console.log(styleData.length, 'style data -----')
                if (!styleData.length) {
                    return new CommonResponseModel(false, 11111, "Style data not found")
                }

                const updatedQty = getUpdatedQty(po.poLineNo, po.qty)
                for (const styleBom of styleData) {
                    console.log(styleBom)
                    const consumptions = await req.updatedConsumptions.find((v) => v.itemId == styleBom.itemId) ? await req.updatedConsumptions.find((v) => v.itemId == styleBom.itemId) : { itemId: 0, wastage: 3, moq: 100, consumption: 1 }
                    // console.log(consumptions,styleBom.itemId)
                    const { consumption, moq, wastage } = consumptions
                    const bomQty = calculateBomQty(updatedQty, moq, consumption, wastage)
                    const poBomEntity = new PoBomEntity()
                    const bom = new BomEntity()
                    bom.id = styleBom.bomId
                    poBomEntity.bom = bom
                    poBomEntity.consumption = consumption ? consumption : 0
                    poBomEntity.moq = moq ? moq : 0
                    poBomEntity.wastage = wastage ? wastage : 0
                    poBomEntity.bomQty = po.qty
                    poBomEntity.poQty = updatedQty
                    const dpom = new DpomEntity()
                    dpom.id = po.id
                    poBomEntity.dpomId = po.id
                    poBomEntities.push(poBomEntity)
                    const zfactors = await this.zFactorsBomRepo.getZfactorBomValues(styleBom.itemId)
                    console.log(zfactors)
                    for (const zfactor of zfactors) {
                        if (styleBom.imCode == zfactor.actualIm && styleBom.itemId == zfactor.itemId) {
                            const bomGeoCode = destinations.find((v) => v.destination == po.destination)
                            console.log(bomGeoCode, '----geo code-----')
                            console.log(po.destination, 'destination')
                            if (bomGeoCode?.geoCode == zfactor.geoCode || po.destination == zfactor.destination) {
                                const zfactorID = new ZFactorsBomEntity()
                                zfactorID.id = zfactor.id
                                poBomEntity.zFactorBom = zfactor
                                poBomEntity.bom = null
                                console.log(poBomEntity)
                            }
                        }
                    }
                    await transactionManager.getRepository(PoBomEntity).insert(poBomEntity)


                }
                const zfactorsToAdd = await this.zFactorsBomRepo.getZfactorBomValuesToAdd()
                for (const ab of zfactorsToAdd) {
                    if (po.destination == ab.destination) {
                        const poBomExtraITem = new PoBomEntity()
                        poBomExtraITem.consumption = 1
                        poBomExtraITem.moq = 1
                        poBomExtraITem.wastage = 1
                        poBomExtraITem.bomQty = po.qty
                        poBomExtraITem.poQty = updatedQty
                        const dpom = new DpomEntity()
                        dpom.id = po.id
                        poBomExtraITem.dpomId = po.id
                        const zfactorID = new ZFactorsBomEntity()
                        zfactorID.id = ab.id
                        poBomExtraITem.zFactorBom = zfactorID
                        poBomExtraITem.bom = null
                        await transactionManager.getRepository(PoBomEntity).insert(poBomExtraITem)
                    }
                }

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
                console.log(obj)
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
        console.log(poBomZfactorData, '---po bom zfactord data')
        let data = [...poBomData, ...poBomZfactorData]
        const groupedData: any = data.reduce((result, currentItem) => {
            const { styleNumber, imCode, bomQty, description, use, itemNo, itemId, destination, size } = currentItem;
            const bomGeoCode = destinations.find((v) => v.destination == destination)
            const { geoCode } = bomGeoCode
            const key = `${geoCode}-${styleNumber}-${imCode}-${itemNo}`;

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
                    sizeWiseQty: [],
                    chinaSizes: [],
                    indonesiaSize: []
                };
            }
            if (geoCode == 'APA') {
                const sizeIndex = result[key]['sizeWiseQty'].findIndex((v) => v.size === size)
                if (sizeIndex >= 0) {
                    result[key]['sizeWiseQty'][sizeIndex].qty += bomQty
                } else {
                    result[key].sizeWiseQty.push({ size, qty: bomQty });
                }

                if (destination == 'China') {
                    const sizeIndex = result[key]['chinaSizes'].findIndex((v) => v.size === size)
                    if (sizeIndex >= 0) {
                        result[key]['chinaSizes'][sizeIndex].qty += bomQty
                    } else {
                        result[key].chinaSizes.push({ size, qty: bomQty });
                    }
                }

                if (destination == 'Indonesia') {
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

    async getBomExcel(req: BomCreationFiltersReq): Promise<CommonResponseModel> {
        let query = ` SELECT pb.dpom_id, dp.style_number AS style, dp.item AS item, dp.geo_code AS geo_code
          FROM po_bom pb
            JOIN dpom dp ON dp.id = pb.dpom_id
           GROUP BY pb.dpom_id`
        if (req?.style) {
            query += ` WHERE dp.style = '${req.style}' GROUP BY dp.style`
        }
        const records = await this.bomRepo.query(query);
        return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)

    }




    async getBom(req?: BomExcelreq): Promise<CommonResponseModel> {
        console.log(req, "req--------------------------")
        let query = `SELECT pb.id ,pb.bom_qty,b.im_code FROM po_bom pb 
        LEFT JOIN bom b ON b.id = pb.bom_id
        LEFT JOIN dpom d ON d.id = pb.dpom_id `
        if (req?.style) {
            query += ` WHERE d.style_number = '${req.style}'`
        }
        const records = await this.bomRepo.query(query);

        return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)

    }
}






