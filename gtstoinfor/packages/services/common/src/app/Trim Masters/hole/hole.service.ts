import { Injectable } from "@nestjs/common";
import { HoleEntity } from "./hole.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { retry } from "rxjs";
import { HoleDTO } from "./dto/hole.dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";

@Injectable()
export class HoleService {
    constructor(
      
        @InjectRepository(HoleEntity)
        private holeRepo: Repository<HoleEntity>,
    ){}
  
  
      async getAllHoles(): Promise<CommonResponseModel> {
        try {
            const data = await this.holeRepo.find({order:{hole:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Hole data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async createHole(req: HoleDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
          if (!isUpdate) {
            const updateData = await this.holeRepo.findOne({ where: { hole: req.hole } });
            if (updateData) {
              throw new CommonResponseModel(false, 11104, 'Hole already exists');
            }
          } else {
            const existingFinish = await this.holeRepo.findOne({ select: ['holeId'], where: { hole: req.hole } });
            if (existingFinish) {
              throw new ErrorResponse(0, 'Hole already exists!!!');
            }
          }
      
          const finishEntity = new HoleEntity();
          finishEntity.hole = req.hole;
      
          const data = await this.holeRepo.save(finishEntity);
      
          return new CommonResponseModel(false, 0, isUpdate ? 'Hole updated successfully' : 'Hole created successfully', data);
        } catch (err) {
          return err;
        }
      }

      async activateOrDeactivateHole(req: HoleDTO): Promise<CommonResponseModel> {
        try {
            const holeExists = await this.holeRepo.findOne({where:{holeId: req.holeId}});
            if (holeExists) {
                if (!holeExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Hole. Refresh and try again');
                } else {
                    
                        const holeStatus =  await this.holeRepo.update(
                            { holeId: req.holeId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (holeExists.isActive) {
                            if (holeStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Hole is Deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Hole is already Deactivated');
                            }
                        } else {
                            if (holeStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Hole is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Hole is already activated');
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


      async getAllActiveHole(): Promise<CommonResponseModel> {
        try {
            const data = await this.holeRepo.find({where:{isActive: true},order:{hole:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Hole data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async getHoleById(req:HoleDTO): Promise<CommonResponseModel> {
        try {
            const data = await this.holeRepo.find({where:{holeId: req.holeId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Hole data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }
}
