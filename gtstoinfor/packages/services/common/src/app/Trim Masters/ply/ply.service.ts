import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PlyEntity } from "./ply.entity";
import { PlyDto } from "./ply.dto";

@Injectable()
export class PlyService{
    constructor(
        @InjectRepository(PlyEntity)
        private repo : Repository<PlyEntity>,
    ) {}

    async getAllActivePly():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{ply:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllPlys():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{ply:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createPly(dto: PlyDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            if(!isUpdate) {
                const existing = await this.repo.findOne({ where: { ply: dto.ply }})
                if(existing) {
                    throw new Error('Ply already exists');
                }
            }
            const entityData = new PlyEntity()
            entityData.ply = dto.ply
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.plyId = dto.plyId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Ply updated successfully' : 'Ply created successfully', data)
        }catch(err){
            throw(err)
        }
    }
}