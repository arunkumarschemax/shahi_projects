import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "./entittes/style-entity";
import { DataSource, Repository } from "typeorm";
import { BomReportModel, BomReportSizeModel, CommonResponseModel, MarketingReportModel, MarketingReportSizeModel } from "@project-management-system/shared-models";
import { StyleDto } from "./dto/style-dto";
import { BomEntity } from "./entittes/bom-entity";
import { StyleComboEntity } from "./entittes/style-combo-entity";
import { StyleRepo } from "./dto/style-repo";
import { BomRepo } from "./dto/bom-repo";
import { StyleComboRepo } from "./dto/style-combo-repo";
import { BomDto } from "./dto/bom-dto";
import { StyleComboDto } from "./dto/style-combo-dto";
import { DpomRepository } from "../dpom/repositories/dpom.repository";

@Injectable()
export class BomService{
    constructor(

    private StyleRepo: StyleRepo,
    private bomRepo: BomRepo,
    private styleComboRepo:StyleComboRepo,
    private dataSource: DataSource,
    private dpomRepo:  DpomRepository,

    ){ }
    async createBom(req:StyleDto):Promise<CommonResponseModel>{
        try{
            const entity = new StyleEntity()
            entity.style=req.style
            entity.season=req.season
            entity.expNo=req.expNo
            entity.styleName=req.styleName
            entity.msc=req.msc
            entity.factoryLo=req.factoryLo
            entity.status=req.status

           let  bomEntityArray = []
            for(const bom of req.bomdto){
                const bomEntity = new BomEntity()
                bomEntity.itemName=bom.itemName
                bomEntity.description=bom.description
                bomEntity.imCode=bom.imCode
                bomEntity.itemType=bom.itemType
                bomEntity.use=bom.use
                let styleComboArray=[]
               for(const styleCombo of bom.styleCombo){
                    const styleComboEntity = new StyleComboEntity()
                    styleComboEntity.combination=styleCombo.combination
                    styleComboEntity.primaryColor=styleCombo.primaryColor
                    styleComboEntity.secondaryColor=styleCombo.secondaryColor
                    styleComboEntity.logoColor=styleCombo.logoColor
                    styleComboEntity.styleEntity=entity
                    styleComboArray.push(styleComboEntity)
               }
               bomEntity.styleComboEntity=styleComboArray
               bomEntityArray.push(bomEntity)
            }
            entity.bomEntity=bomEntityArray
            
            const save = await this.StyleRepo.save(entity)
            if(save){
            return new CommonResponseModel(true,1,'Created Sucessfully')
            }else{
            return new CommonResponseModel(false,0,'Something Went Wrong')

            }
        }
        catch(err){
            throw err
        }
    }

    async getAllStylesData():Promise<CommonResponseModel>{
        try{
            let stylesArray=[]
            const style= await this.StyleRepo.getStyelsData()
            if(style.length >0){
                for(const styleDetails of style){
                 let bomdetailsArray=[]
                    styleDetails.bomData = await this.bomRepo.getBomData(styleDetails.id)
                    for(const bom of styleDetails.bomData){
                          const combo = await this.styleComboRepo.getStyleComboData(bom.bomId)
                          let styleCombosArray=[]
                          for(const rec of combo){
                            styleCombosArray.push(new StyleComboDto(rec.combination,rec.primaryColor,rec.secondaryColor,rec.logoColor))
                            }
                            bomdetailsArray.push(new BomDto(bom.itemName,bom.description,bom.imCode,bom.itemType,bom.use,styleCombosArray,bom.bomId,bom.styleId))
                     }
                    stylesArray.push(new StyleDto(styleDetails.style,styleDetails.styleName,styleDetails.season,styleDetails.expNo,styleDetails.msc,styleDetails.factoryLo,styleDetails.status,bomdetailsArray))
                }
            }
            console.log(stylesArray,'stylesarray')
            if(stylesArray){
                return new CommonResponseModel(true,1,'Data Retrived Sucessfully',stylesArray)

            }else{
                return new CommonResponseModel(false,1,'No Data Found',[])
            }
        }
        catch(err){
            throw err
        }
    }


    async getAll():Promise<CommonResponseModel>{
        try{
            const query= 'SELECT s.id as styeleId,s.style, s.style_name AS styleName,s.season,s.exp_no AS expNo,b.id AS bomId,b.style_id as bstyleId,b.item_name AS itemName,b.DESCRIPTION,b.im_code AS imCode,b.item_type AS itemType ,sc.id AS styleComboId,sc.bom_id AS bomId,sc.style_id AS sstyleId,sc.combination,sc.primary_color AS primaryColor,sc.secondary_color AS secondaryColor,sc.logo_color AS logoColor FROM styles s  LEFT JOIN bom b ON b.style_id=s.id LEFT JOIN style_combos sc ON sc.bom_id=b.id'
            const result = await this.dataSource.query(query)
            const combo=[]
            const allStyleData =new Map<number, StyleDto>()
            const comboStyle = new Map<number, StyleComboDto>()
            if(result.length >0){
                for(const rec of result){
                    if(!allStyleData.has(rec.styeleId)){
                        allStyleData.set(rec.styeleId,new StyleDto(rec.style,rec.styleName,rec.season,rec.expNo,rec.msc,rec.factoryLo,rec.status,[]))
                    }
                    allStyleData.get(rec.styeleId).bomdto.push(new BomDto(rec.itemName,rec.description,rec.imCode,rec.itemType,rec.use,[],rec.bomId,rec.bstyleId
                        // [...combo,new StyleComboDto(rec.combination,rec.primaryColor,rec.secondaryColor,rec.logoColor)]
                        ))
                }
                const responsemodel:StyleDto[]=[]
                allStyleData.forEach((rec =>responsemodel.push(rec)))
             return new CommonResponseModel(true,1,'Data retrived',responsemodel)
            }

        }
        catch(err){
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
                    []
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
    
    
}