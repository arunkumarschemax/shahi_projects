import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PartsEntity } from "./parts.entity";
import { PartsDto } from "./parts.dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";

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
            console.log(data,']]]]]]]]]]]]]]]]]]]]]]]]]]')
            return new CommonResponseModel(true, 1, isUpdate ? 'Parts updated successfully' : 'Parts created successfully', data)
        }catch(err){
            throw(err)
        }
    }

    async activateOrDeactivateParts(req: PartsDto): Promise<CommonResponseModel> {
        try {
            const PartsExists = await this.repo.findOne({where:{partsId: req.partsId}});
            if (PartsExists) {
                if (!PartsExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Parts. Refresh and try again');
                } else {
                    
                        const partStatus =  await this.repo.update(
                            { partsId: req.partsId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (PartsExists.isActive) {
                            if (partStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Parts is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Parts is already deactivated');
                            }
                        } else {
                            if (partStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Parts is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Parts is already activated');
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

      async getPartsById(req:PartsDto): Promise<CommonResponseModel> {
        try {
            const data = await this.repo.find({where:{partsId: req.partsId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Parts data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }



}