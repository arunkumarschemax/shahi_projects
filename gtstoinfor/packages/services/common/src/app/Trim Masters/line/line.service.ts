import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { LineEntity } from "./line-entity";
import { LineDto } from "./line-dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";

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

    async activateOrDeactivateLine(req: LineDto): Promise<CommonResponseModel> {
        try {
            const LineExists = await this.repo.findOne({where:{lineId: req.lineId}});
            if (LineExists) {
                if (!LineExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Line. Refresh and try again');
                } else {
                    
                        const lineStatus =  await this.repo.update(
                            { lineId: req.lineId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (LineExists.isActive) {
                            if (lineStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Line is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Line is already deactivated');
                            }
                        } else {
                            if (lineStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Line is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Line is already activated');
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

      async getLineById(req:LineDto): Promise<CommonResponseModel> {
        try {
            const data = await this.repo.find({where:{lineId: req.lineId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Line data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

}