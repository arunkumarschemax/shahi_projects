import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "./entittes/style-entity";
import { BomCreationFiltersReq, BomDataForStyleAndSeasonModel, BomGenerationReq, BomReportModel, BomReportSizeModel, CommonResponseModel, ItemInfoFilterReq, MarketingReportModel, MarketingReportSizeModel, PpmDateFilterRequest } from "@project-management-system/shared-models";
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


@Injectable()
export class BomService {
    constructor(

        private StyleRepo: StyleRepo,
        private bomRepo: BomRepo,
        private styleComboRepo: StyleComboRepo,
        private dataSource: DataSource,
        private dpomRepo: DpomRepository,

    ) { }
    async createBom(req: StyleDto): Promise<CommonResponseModel> {
        try {
            const entity = new StyleEntity()
            entity.style = req.style
            entity.season = req.season
            entity.expNo = req.expNo
            entity.styleName = req.styleName
            entity.msc = req.msc
            entity.factoryLo = req.factoryLo
            entity.status = req.status

            let bomEntityArray = []
            for (const bom of req.bomdto) {
                const bomEntity = new BomEntity()
                bomEntity.itemName = bom.itemName
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

            const save = await this.StyleRepo.save(entity)
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
            const style = await this.StyleRepo.getStyelsData()
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
        const stylesData = await this.StyleRepo.getStyelsData()
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
            const styleDataMap = new Map<string, BomDataForStyleAndSeasonModel[]>()

            function calculateBomQty(poQty:number, moq:number, consumption:number, wastage:number) {
                const wastageQty  =  (poQty * consumption) * (wastage / 100)
                const bomQty = (poQty * consumption)  + wastageQty
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
            console.log(poData.length,' po data size')
            for (const po of poData) {
                let styleData = []
                if (!styleDataMap.has(po.styleNumber)) {
                    styleData = await this.bomRepo.getBomDataForStyleAndSeason({ style: po.styleNumber, season: po.season, year: po.year })
                    styleDataMap.set(po.styleNumber, styleData)
                } else {
                    styleData = styleDataMap.get(po.styleNumber)
                }
                // console.log(po.styleNumber,styleData.length,' style size')
                for (const styleBom of styleData) {
                    
                    const consumptions = await req.updatedConsumptions.find((v) => v.itemId == styleBom.itemId) ? await req.updatedConsumptions.find((v) => v.itemId == styleBom.itemId) : { itemId: 0, wastage: 3, moq: 100, consumption: 1 }
                    // console.log(consumptions,styleBom.itemId)
                    const { consumption, moq, wastage } = consumptions
                    const updatedQty = getUpdatedQty(po.poLineNo, po.qty)
                    const bomQty = calculateBomQty(updatedQty, moq, consumption, wastage)
                    const poBomEntity = new PoBomEntity()
                    const bom = new BomEntity()
                    bom.id = styleBom.bomId
                    poBomEntity.bom = bom
                    poBomEntity.consumption = consumption ? consumption : 0
                    poBomEntity.moq = moq ? moq : 0
                    poBomEntity.wastage = wastage ? wastage : 0
                    poBomEntity.bomQty = isNaN(bomQty) ? 0 : bomQty
                    poBomEntity.poQty = po.qty
                    
                    const dpom = new DpomEntity()
                    dpom.id = po.id
                    poBomEntity.dpom = dpom
                    poBomEntities.push(poBomEntity)
                    await transactionManager.getRepository(PoBomEntity).insert(poBomEntity)
                }
            }
            for (const poLine of req.poLine) {
                await transactionManager.getRepository(DpomEntity).update({ poAndLine: poLine }, { isBomGenerated: true })
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
    
        try {
            await transactionManager.startTransaction();
    
            const jsonData: any[] = await this.convertExcelToJson(val);
            const headerRow = jsonData[0];
    
            if (!jsonData.length) {
                return new CommonResponseModel(true, 1110, 'No data found in excel');
            }
    
            const data = await this.updatePath(val.path, val.filename, transactionManager);
    
            const styleRepository = transactionManager.getRepository(StyleEntity);
            const bomRepository = transactionManager.getRepository(BomEntity);
            const styleComboRepository = transactionManager.getRepository(StyleComboEntity);
    
            const jsonArray: any[] = jsonData.slice(1).map((row, arrInd) => {
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
    
            for (const record of jsonArray) {
                if (record.status !== 'K') {
                    const styleEntity = styleRepository.create({
                        style: record.styleNbr,
                        styleName: record.styleNm,
                        season: record.seasonCd + record.seasonYr.slice(-2),
                        // now need to show seacon code  , seasonyear seperately 
                        expNo: record.expNo,
                        msc: record.mscLevel1 + record.mscLevel2 + record.mscLevel3,
                        gender: record.mscLevel1,
                        factoryLo: record.factory,
                        status: record.status,
                        bomEntity: [],
                        styleComboEntity: [] 
                    });
    
                    const bomEntity = bomRepository.create({
                        itemName: record.itemType1,
                        description: record.description,
                        itemId:record,
                        imCode:record,
                        itemType:record.itemType2,
                        use: record.use,
                        
                    });
                    bomEntity.styleEnityy = styleEntity; 
                    styleEntity.bomEntity.push(bomEntity); 
                    // Create StyleComboEntity
                    const styleComboEntity = styleComboRepository.create({
                        // bom_id:record.bomId,
                        combination: record.combination,
                        primaryColor: record.prmry,
                        secondaryColor: record.scndy,
                        logoColor: record.logo,
                    });
                    styleComboEntity.styleEntity = styleEntity; 
                    styleEntity.styleComboEntity.push(styleComboEntity); 
    
                    // Save everything
                    await styleRepository.save(styleEntity);
                }
            }
    
            await transactionManager.completeTransaction();
            return new CommonResponseModel(true, 1111, 'Data saved successfully');
        } catch (err) {
            console.error(err);
            await transactionManager.rollbackTransaction();
            return new CommonResponseModel(false, 1112, 'Error occurred while saving data');
        } finally {
            await transactionManager.releaseTransaction();
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

    async generateProposal(req: BomGenerationReq) : Promise<CommonResponseModel>{
        
        return new CommonResponseModel(true, 11, '');
    }

    async getBomExcel(req: BomCreationFiltersReq): Promise<CommonResponseModel> {
       let query=` SELECT pb.dpom_id, dp.style_number AS style, dp.item AS item, dp.geo_code AS geo_code
          FROM po_bom pb
            JOIN dpom dp ON dp.id = pb.dpom_id
           GROUP BY pb.dpom_id`
        const records = await this.bomRepo.query(query);
       return new CommonResponseModel(true, 65441, "Data Retrieved Successfully", records)
      
      }
     
}