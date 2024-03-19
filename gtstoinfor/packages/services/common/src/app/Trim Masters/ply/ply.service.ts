import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { PlyEntity } from "./ply.entity";
import { PlyDto } from "./ply.dto";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Injectable()
export class PlyService{
    constructor(
        @InjectRepository(PlyEntity)
        private repo : Repository<PlyEntity>,
        private m3TrimsCategoryMappingRepo:M3TrimsCategoryMappingRepo
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

    async getAllPlyForCategory(req:CategoryIdRequest):Promise<CommonResponseModel>{
        try{
            let data = await this.m3TrimsCategoryMappingRepo.getAllPlyByCategory(req.categoryId)
            if(data.status){
              return new CommonResponseModel(true, 0, 'Data retrieved successfully',data.data)
            }else{
              return new CommonResponseModel(false, 1, 'No data found',[])
            }
          }catch(err){
            throw(err)
          }
      }

}