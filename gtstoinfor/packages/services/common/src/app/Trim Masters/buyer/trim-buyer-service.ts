import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TrimBuyerEntity } from "./trim-buyer-entity";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { TrimBuyerDto } from "./trim-buyer.dto";

@Injectable()
export class TrimBuyerService{
    constructor(
        @InjectRepository(TrimBuyerEntity)
        private repo : Repository<TrimBuyerEntity>,
    ) {}

    async getAllActiveTrimBuyers():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{trimBuyer:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllTrimBuyers():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{trimBuyer:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createTrimBuyer(dto: TrimBuyerDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            if(!isUpdate) {
                const existing = await this.repo.findOne({ where: { trimBuyer: dto.trimBuyer }})
                if(existing) {
                    throw new Error('Buyer already exists');
                }
            }
            const entityData = new TrimBuyerEntity()
            entityData.trimBuyer = dto.trimBuyer
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.trimBuyerId = dto.trimBuyerId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Buyer updated successfully' : 'Buyer created successfully', data)
        }catch(err){
            throw(err)
        }
    }


}