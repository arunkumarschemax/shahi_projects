import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { TrimSizeEntity } from "./trim-size-entity";
import { TrimSizeDto } from "./trim-size.dto";

@Injectable()
export class TrimSizeService{
    constructor(
        @InjectRepository(TrimSizeEntity)
        private repo : Repository<TrimSizeEntity>,
    ) {}

    async getAllActiveTrimSizes():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{trimSize:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllTrimSizes():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{trimSize:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createTrimSize(dto: TrimSizeDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            if(!isUpdate) {
                const existing = await this.repo.findOne({ where: { trimSize: dto.trimSize }})
                if(existing) {
                    throw new Error('Size already exists');
                }
            }
            const entityData = new TrimSizeEntity()
            entityData.trimSize = dto.trimSize
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.trimSizeId = dto.trimSizeId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Size updated successfully' : 'Size created successfully', data)
        }catch(err){
            throw(err)
        }
    }


}