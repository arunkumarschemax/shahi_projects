import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { SliderEntity } from "./slider-entity";
import { SliderDto } from "./slider-dto";

@Injectable()
export class SliderService{
    constructor(
        @InjectRepository(SliderEntity)
        private repo : Repository<SliderEntity>,
    ) {}

    async getAllActiveSliders():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{slider:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllSliders():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{slider:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createSlider(dto: SliderDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            if(!isUpdate) {
                const existing = await this.repo.findOne({ where: { slider: dto.slider }})
                if(existing) {
                    throw new Error('Slider already exists');
                }
            }
            const entityData = new SliderEntity()
            entityData.slider = dto.slider
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.sliderId = dto.sliderId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Slider updated successfully' : 'Slider created successfully', data)
        }catch(err){
            throw(err)
        }
    }
}