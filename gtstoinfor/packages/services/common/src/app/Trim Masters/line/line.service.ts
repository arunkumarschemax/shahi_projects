import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { LineEntity } from "./line-entity";
import { LineDto } from "./line-dto";

@Injectable()
export class LineService{
    constructor(
        @InjectRepository(LineEntity)
        private repo : Repository<LineEntity>,
    ) {}

    async getAllActiveLines():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{line:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllLine():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{line:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createLine(dto: LineDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            if(!isUpdate) {
                const existing = await this.repo.findOne({ where: { line: dto.line }})
                if(existing) {
                    throw new Error('Line already exists');
                }
            }
            const entityData = new LineEntity()
            entityData.line = dto.line
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.lineId = dto.lineId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Line updated successfully' : 'Line created successfully', data)
        }catch(err){
            throw(err)
        }
    }

}