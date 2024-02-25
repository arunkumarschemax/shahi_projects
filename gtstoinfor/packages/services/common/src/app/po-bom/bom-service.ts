import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "./entittes/style-entity";
import { DataSource, Repository, getManager } from "typeorm";
import { BomReportModel, BomReportSizeModel, CommonResponseModel, ItemInfoFilterReq, MarketingReportModel, MarketingReportSizeModel } from "@project-management-system/shared-models";
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
import { GenericTransactionManager } from "../../typeorm-transactions";
import { FileUploadEntity } from "./entittes/file-upload-entity";
import * as XLSX from 'xlsx';
import { log } from "winston";


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
            entity.fileData = req.fileData

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

    async getPpmPoLineData(): Promise<CommonResponseModel> {
        const details = await this.dpomRepo.getPoLineData();
        if (details.length < 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }

        const sizeDateMap = new Map<string, BomReportModel>();

        for (const rec of details) {
            let sizeData = sizeDateMap.get(rec.po_and_line);

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
                    rec.gender_age_desc
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
    
    async getPoLineDataForCihinaInserttag(req:ItemInfoFilterReq): Promise<CommonResponseModel> {
        const details = await this.dpomRepo.getPoLineDataForCihinaInserttag(req);
        if (details.length < 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }
        const sizeDateMap = new Map<string, BomReportModel>();
        for (const rec of details) {
            let sizeData = sizeDateMap.get(rec.po_and_line);
            console.log(rec,'RECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
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
        for(const rec of bomData){
            if(!bomMap.has(rec.bomId)){
                bomMap.set(rec.bomId,new BomDto(rec.itemName, rec.description, rec.imCode, rec.itemType, rec.use, [], rec.bomId, rec.styleId))  
            }
            bomMap.get(rec.bomId).styleCombo.push(new StyleComboDto(rec.combination, rec.primaryColor, rec.secondaryColor, rec.logoColor,rec.color))
        }
        const bomInfo: BomDto[] = []
        bomMap.forEach(rec =>{
            bomInfo.push(rec)
        })
        return new CommonResponseModel(true, 11111, "Data retreived sucessfully", bomInfo)

    }

    async saveExcelData(val): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
           
            const jsonData: any[] = await this.convertExcelToJson(val);
            const headerRow = jsonData[0];

            if (!jsonData.length) {
                return new CommonResponseModel(true, 1110, 'No data found in excel');
            }            
            const data = await this.updatePath(val.path, val.filename, transactionManager);
            const jsonArray: any = jsonData.map((row, arrInd) => {
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
                 const entity = new StyleEntity()
                 entity.style = record.styleNbr
                 entity.styleName= record.styleNm
                 entity.season = record.seasonCd + record.seasonYr.slice(-2);
                 entity.expNo= record
                 entity.msc =  record.mscLevel1 + record.mscLevel2 + record.mscLevel3
                 entity.gender = record.mscLevel1
                 entity.factoryLo = record.factory
                 entity.status = record.status
                 entity.fileData = record
                   
                 await getManager().save(entity);       
            }
            await transactionManager.completeTransaction()
            return new CommonResponseModel(true,1111,'Data saved sucessfully', );
        } catch (err) {
            console.log(err)
            await transactionManager.releaseTransaction()
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
}




