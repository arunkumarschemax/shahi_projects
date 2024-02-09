import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { LengthEntity } from "./length-entity";
import { LengthDto } from "./length-dto";

@Injectable()
export class LengthService{
    constructor(
        @InjectRepository(LengthEntity)
        private repo : Repository<LengthEntity>,
    ) {}

    async getAllActiveLengths():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{length:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllLength():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{length:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createLength(dto: LengthDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            if(!isUpdate) {
                const existing = await this.repo.findOne({ where: { length: dto.length }})
                if(existing) {
                    throw new Error('Length already exists');
                }
            }
            const entityData = new LengthEntity()
            entityData.length = dto.length
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.lengthId = dto.lengthId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Length updated successfully' : 'Length created successfully', data)
        }catch(err){
            throw(err)
        }
    }

}