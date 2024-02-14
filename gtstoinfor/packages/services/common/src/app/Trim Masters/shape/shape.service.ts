import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ShapeEntity } from "./shape-entity";
import { ShapeDto } from "./shape-dto";

@Injectable()
export class ShapeService{
    constructor(
        @InjectRepository(ShapeEntity)
        private repo : Repository<ShapeEntity>,
    ) {}

    async getAllActiveShape():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{shape:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }
    
    async getAllShapes():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{shape:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createShape(dto: ShapeDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            if(!isUpdate) {
                const existing = await this.repo.findOne({ where: { shape: dto.shape }})
                if(existing) {
                    throw new Error('Shape already exists');
                }
            }
            const entityData = new ShapeEntity()
            entityData.shape = dto.shape
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.shapeId = dto.shapeId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Shape updated successfully' : 'Shape created successfully', data)
        }catch(err){
            throw(err)
        }
    }

}