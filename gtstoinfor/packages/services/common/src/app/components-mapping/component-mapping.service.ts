import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ComponentMappingEntity } from "./component-mapping.entity";
import { Repository } from "typeorm";
import { ComponentMappingDto } from "./dto/component-mapping.dto";
import { ComponentMappingResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class ComponentMappingService{
    constructor(
        @InjectRepository(ComponentMappingEntity)
        private componentMappingRepo : Repository<ComponentMappingEntity>
        
    ){}

    async createComponentMapping(req:ComponentMappingDto): Promise<ComponentMappingResponseModel>{
        try{
            const entity = new ComponentMappingEntity()
            for(const rec of req.componentDeatils){
                entity.componentMappingId = req.componentMappingId;
                

            }


            return new ComponentMappingResponseModel(true,1,'Mapped Successfully')

        } catch(err){
            throw err
        }

    }

}