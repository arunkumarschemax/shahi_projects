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
          const holeData = await this.holeRepo.findOne({ where: { hole: req.hole } });

          if (isUpdate && holeData && holeData.holeId !== req.holeId) {
            return new CommonResponseModel(false, 1, 'Another hole already exists');
          }

          if (!isUpdate && holeData) {
            return new CommonResponseModel(false, 1, 'Hole already exists');
          }
          const entity = new HoleEntity();
          entity.hole = req.hole;
          if (isUpdate) {
            entity.holeId = req.holeId;
            entity.updatedUser = req.username;
          } else {
            entity.createdUser = req.username;
          }
          const savedResult = await this.holeRepo.save(entity)
          return new CommonResponseModel(true, 0, isUpdate ? 'Hole updated successfully' : 'Hole created successfully', [savedResult])
        } catch (err) {
          throw err;
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
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Hole is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Hole is already deactivated');
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
