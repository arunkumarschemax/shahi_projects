import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { TrimSizeEntity } from "./trim-size-entity";
import { TrimSizeDto } from "./trim-size.dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";

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
            entityData.type = dto.type
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

    async activateOrDeactivateSize(req: TrimSizeDto): Promise<CommonResponseModel> {
        try {
            const sizeExists = await this.repo.findOne({where:{trimSizeId: req.trimSizeId}});
            if (sizeExists) {
                if (!sizeExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Size information. Refresh and try again');
                } else {
                    
                        const sizeStatus =  await this.repo.update(
                            { trimSizeId: req.trimSizeId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (sizeExists.isActive) {
                            if (sizeStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Size is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Size is already deactivated');
                            }
                        } else {
                            if (sizeStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Size is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Size is already activated');
                            }
                      }
                }
            } else {
                throw new CommonResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
      } 


}