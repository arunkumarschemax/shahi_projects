import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ShapeEntity } from "./shape-entity";
import { ShapeDto } from "./shape-dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";

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
                return new CommonResponseModel(true, 1, 'Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        }catch(err){
            throw(err)
        }
    }
    
    async getAllShapes():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{shape:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
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
                    throw new Error('Shape Already Exists');
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
            return new CommonResponseModel(true, 1, isUpdate ? 'Shape Updated Successfully' : 'Shape Created Successfully', data)
        }catch(err){
            throw(err)
        }
    }


    async activateOrDeactivateShape(req: ShapeDto): Promise<CommonResponseModel> {
        try {
            const ShapeExists = await this.repo.findOne({where:{shapeId: req.shapeId}});
            if (ShapeExists) {
                if (!ShapeExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Shape. Refresh and try again');
                } else {
                    
                        const shapeStatus =  await this.repo.update(
                            { shapeId: req.shapeId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (ShapeExists.isActive) {
                            if (shapeStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Shape Is Deactivated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Shape Is Already Deactivated');
                            }
                        } else {
                            if (shapeStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Shape Is Activated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Shape Is Already Activated');
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

      async getShapeById(req:ShapeDto): Promise<CommonResponseModel> {
        try {
            const data = await this.repo.find({where:{shapeId: req.shapeId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Shape Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }


}