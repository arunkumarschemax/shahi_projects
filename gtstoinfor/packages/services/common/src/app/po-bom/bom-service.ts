import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "./entittes/style-entity";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { StyleDto } from "./dto/style-dto";
import { BomEntity } from "./entittes/bom-entity";
import { StyleComboEntity } from "./entittes/style-combo-entity";
import { StyleRepo } from "./dto/style-repo";
import { BomRepo } from "./dto/bom-repo";
import { StyleComboRepo } from "./dto/style-combo-repo";
import { BomDto } from "./dto/bom-dto";

@Injectable()
export class BomService{
    constructor(

    private StyleRepo: StyleRepo,
    private bomRepo: BomRepo,
    private styleComboRepo:StyleComboRepo
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
            entity.fileData=req.fileData

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
                        styles.push(new StyleDto(styleDetails.style,styleDetails.styleName,styleDetails.season,styleDetails.expNo,styleDetails.msc,styleDetails.factoryLo,styleDetails.status,styleDetails.fileData,bomdetails))
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
}