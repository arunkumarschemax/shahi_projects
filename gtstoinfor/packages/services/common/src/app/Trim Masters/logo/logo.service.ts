import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LogoEntity } from "./logo-entity";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { LogoDto } from "./logo.dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";

@Injectable()
export class LogoService{
    constructor(
        @InjectRepository(LogoEntity)
        private repo : Repository<LogoEntity>,
    ) {}

    async getAllActiveLogo():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{logo:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllLogo():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{logo:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createLogo(dto: LogoDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            const existing = await this.repo.findOne({ where: { logo: dto.logo }})

            if (existing && (!isUpdate || (isUpdate && existing.logoId !== dto.logoId))) {
                throw new Error('Logo with the same name already exists');
            }

            const entityData = new LogoEntity()
            entityData.logo = dto.logo
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.logoId = dto.logoId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Logo updated successfully' : 'Logo created successfully', data)
        }catch(err){
            throw(err)
        }
    }

    async activateOrDeactivateLogo(req: LogoDto): Promise<CommonResponseModel> {
        try {
            const logoExists = await this.repo.findOne({where:{logoId: req.logoId}});
            if (logoExists) {
                if (!logoExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Logo information. Refresh and try again');
                } else {
                    
                        const logoStatus =  await this.repo.update(
                            { logoId: req.logoId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (logoExists.isActive) {
                            if (logoStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Logo is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Logo is already deactivated');
                            }
                        } else {
                            if (logoStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Logo is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Logo is already activated');
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