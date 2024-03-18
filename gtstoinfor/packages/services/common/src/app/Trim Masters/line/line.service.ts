import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { LineEntity } from "./line-entity";
import { LineDto } from "./line-dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Injectable()
export class LineService{
    constructor(
        @InjectRepository(LineEntity)
        private repo : Repository<LineEntity>,
        private m3TrimsCategoryMappingRepo:M3TrimsCategoryMappingRepo
    ) {}

    async getAllActiveLines():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{line:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllLine():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{line:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
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
                    throw new Error('Line Already Exists');
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
            return new CommonResponseModel(true, 1, isUpdate ? 'Line Updated Successfully' : 'Line Created Successfully', data)
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
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Line Is Deactivated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Line is Already Deactivated');
                            }
                        } else {
                            if (lineStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Line Is Activated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Line Is Already Activated');
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
                return new CommonResponseModel(true, 1, 'Line Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }
      async getAllTrimLineForCategory(req:CategoryIdRequest):Promise<CommonResponseModel>{
        try{
            let data = await this.m3TrimsCategoryMappingRepo.getAllTrimLineByCategory(req.categoryId)
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