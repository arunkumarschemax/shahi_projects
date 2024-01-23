import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "./entittes/style-entity";
import { DataSource, Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { StyleDto } from "./dto/style-dto";
import { BomEntity } from "./entittes/bom-entity";
import { StyleComboEntity } from "./entittes/style-combo-entity";
import { StyleRepo } from "./dto/style-repo";
import { BomRepo } from "./dto/bom-repo";
import { StyleComboRepo } from "./dto/style-combo-repo";
import { BomDto } from "./dto/bom-dto";
import { StyleComboDto } from "./dto/style-combo-dto";

@Injectable()
export class BomService{
    constructor(

    private StyleRepo: StyleRepo,
    private bomRepo: BomRepo,
    private styleComboRepo:StyleComboRepo,
    private dataSource: DataSource,

    ){ }
    async createBom(req:StyleDto):Promise<CommonResponseModel>{
        try{
            const entity = new StyleEntity()
            entity.style=req.style
            entity.season=req.season
            entity.expNo=req.expNo
            entity.styleName=req.styleName
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
            let styles=[]
            let styleCombos=[]
            let bomdetails=[]
            const style= await this.StyleRepo.getStyelsData()
            if(style.length >0){
                for(const styleDetails of style){
                    const bomDetails = await this.bomRepo.getBomData(styleDetails.id)
                        for(const combo of bomDetails){
                            const comboDetails = await this.styleComboRepo.getBomData(combo.bomId)
                            for(const data of comboDetails){
                                styleCombos.push(data)
                            }
                            bomdetails.push(new BomDto(combo.itemName,combo.description,combo.imCode,combo.itemType,combo.use,styleCombos,combo.id,combo.styleId))
                        }
                        styles.push(new StyleDto(styleDetails.style,styleDetails.styleName,styleDetails.season,styleDetails.expNo,bomdetails))
                }
            }
            if(styles){
                return new CommonResponseModel(true,1,'Data Retrived Sucessfully',styles)

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
            const query= 'SELECT s.id as styeleId,s.style, s.style_name AS styleName,s.season,s.exp_no AS expNo,b.id AS bomId,b.item_name AS itemName,b.DESCRIPTION,b.im_code AS imCode,b.item_type AS itemType ,sc.id AS styleComboId,sc.bom_id AS bomId,sc.style_id AS sstyleId,sc.combination,sc.primary_color AS primaryColor,sc.secondary_color AS secondaryColor,sc.logo_color AS logoColor FROM styles s  LEFT JOIN bom b ON b.style_id=s.id LEFT JOIN style_combos sc ON sc.bom_id=b.id'
            const result = await this.dataSource.query(query)
            const combo=[]
            const allStyleData =new Map<number, StyleDto>()
            const comboStyle = new Map<number, StyleComboDto>()
            if(result.length >0){
                for(const rec of result){
                    if(!allStyleData.has(rec.styeleId)){
                        allStyleData.set(rec.styeleId,new StyleDto(rec.style,rec.styleName,rec.season,rec.expNo,[]))
                    }
                    allStyleData.get(rec.styeleId).bomdto.push(new BomDto(rec.itemName,rec.description,rec.imCode,rec.itemType,rec.use,combo))
                    // if(!comboStyle.has(rec.bomId)){
                    //    const data= comboStyle.set(rec.bomId,new StyleComboDto(rec.combination,rec.primaryColor,rec.secondaryColor,rec.logoColor))
                    // }
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
}