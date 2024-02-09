import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PartsEntity } from "./parts.entity";
import { PartsDto } from "./parts.dto";

@Injectable()
export class PartsService{
    constructor(
        @InjectRepository(PartsEntity)
        private repo : Repository<PartsEntity>,
    ) {}

    async getAllActiveParts():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{parts:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllParts():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{parts:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createParts(dto: PartsDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            if(!isUpdate) {
                const existing = await this.repo.findOne({ where: { parts: dto.parts }})
                if(existing) {
                    throw new Error('Parts already exists');
                }
            }
            const entityData = new PartsEntity()
            entityData.parts = dto.parts
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.partsId = dto.partsId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Parts updated successfully' : 'Parts created successfully', data)
        }catch(err){
            throw(err)
        }
    }


}