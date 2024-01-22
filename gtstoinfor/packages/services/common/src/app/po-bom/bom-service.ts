import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "./entittes/style-entity";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { StyleDto } from "./dto/style-dto";
import { BomEntity } from "./entittes/bom-entity";
import { StyleComboEntity } from "./entittes/style-combo-entity";

@Injectable()
export class BomService{
    constructor(
    @InjectRepository(StyleEntity)
    private StyleRepo: Repository<StyleEntity>,
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
                    const style =new StyleEntity()
                    style.id = entity.id;
                    styleComboEntity.combination=styleCombo.combination
                    styleComboEntity.primaryColor=styleCombo.primaryColor
                    styleComboEntity.secondaryColor=styleCombo.secondaryColor
                    styleComboEntity.logoColor=styleCombo.logoColor
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
}