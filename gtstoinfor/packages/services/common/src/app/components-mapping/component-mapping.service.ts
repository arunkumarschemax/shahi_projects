import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ComponentMappingEntity } from "./component-mapping.entity";
import { Repository } from "typeorm";
import { ComponentMappingDto } from "./dto/component-mapping.dto";
import { ComponentInfoModel, ComponentMappingModel, ComponentMappingResponseModel } from "@project-management-system/shared-models";
import { Style } from "../style/dto/style-entity";
import { GarmentCategory } from "../garment-category/garment-category.entity";
import { Garments } from "../garments/garments.entity";

@Injectable()
export class ComponentMappingService{
    constructor(
        @InjectRepository(ComponentMappingEntity)
        private componentMappingRepo : Repository<ComponentMappingEntity>
        
    ){}

    async createComponentMapping(req:ComponentMappingDto,isUpdate:boolean): Promise<ComponentMappingResponseModel>{
        try{
            for(const rec of req.componentDeatils){
                const entity = new ComponentMappingEntity()
                entity.componentMappingId = req.componentMappingId;
                const styleEntity = new Style()
                styleEntity.styleId = req.styleId;
                entity.styleInfo =styleEntity;
                const garmantCategoryEntity = new GarmentCategory()
                garmantCategoryEntity.garmentCategoryId = req.garmentCategoryId;
                entity.garmentcategoryInfo = garmantCategoryEntity;
                const garmentEntity = new Garments()
                garmentEntity.garmentId = req.garmentId;
                entity.garmentInfo = garmentEntity;
                if(isUpdate){
                    entity.componentMappingId = req.componentMappingId;
                    entity.updatedUser = req.updatedUser
                } else {
                    entity.createdUser = req.createdUser
                }
                
                const componentSave = await this.componentMappingRepo.save(entity)
            }
            return new ComponentMappingResponseModel(true,1,'Mapped Successfully')

        } catch(err){
            throw err
        }
    }

    async getMappedComponents():Promise<ComponentMappingResponseModel> {
        try{
            let info = [];
            const data = await this.componentMappingRepo.find({relations:['garmentInfo','garmentcategoryInfo','styleInfo']})
            if(data){
                for(const rec of data){
                    info.push(new ComponentMappingModel(rec.componentMappingId,rec.styleInfo.styleId,rec.garmentcategoryInfo.garmentCategoryId,rec.garmentInfo.garmentId,[],rec.createdUser,rec.updatedUser,rec.isActive,rec.versionFlag,rec.styleInfo.style,rec.garmentcategoryInfo.garmentCategory,rec.garmentInfo.garmentName))
                }
                return new ComponentMappingResponseModel(true,1,'Data retrieved',info)
            } else {
                return new ComponentMappingResponseModel(false,0,'No Data found')
            }
        }catch(err){
            throw err 
        }
    }

}