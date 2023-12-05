import { Injectable } from "@nestjs/common";
import { FinishEntity } from "./finish.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { retry } from "rxjs";
import { FinishDTO } from "./dto/finish.dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";

@Injectable()
export class FinishService {
    constructor(
      
        @InjectRepository(FinishEntity)
        private finishRepo: Repository<FinishEntity>,
    ){}
  
  
      async getAllFinish(): Promise<CommonResponseModel> {
        try {
            const data = await this.finishRepo.find({order:{finish:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Finish data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async createFinish(req: FinishDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
          if(!isUpdate){
            const finishDetails = await this.finishRepo.findOne({ where: { finish: req.finish } })
            if (finishDetails) {
              return new CommonResponseModel(false, 1, 'Finish already exists')
            } 
            const details = await this.finishRepo.findOne({ where: { finishCode: req.finishCode } })
            if (details) {
              return new CommonResponseModel(false, 1, 'Finish Code already exists')
            } 
          }
          const entity = new FinishEntity();
          entity.finish = req.finish;
          entity.finishCode = req.finishCode;
          if (isUpdate) {
            entity.finishId = req.finishId;
            entity.updatedUser = req.username;
          } else {
            entity.createdUser = req.username;
          }
          const savedResult = await this.finishRepo.save(entity)
          return new CommonResponseModel(true, 0, isUpdate ? 'Finish updated successfully' : 'Finish created successfully', [savedResult])
        } catch (err) {
          throw err;
        }
      }

      async activateOrDeactivateFinish(req: FinishDTO): Promise<CommonResponseModel> {
        try {
            const finishExists = await this.finishRepo.findOne({where:{finishId: req.finishId}});
            if (finishExists) {
                if (!finishExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Finish information. Refresh and try again');
                } else {
                    
                        const finishStatus =  await this.finishRepo.update(
                            { finishId: req.finishId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (finishExists.isActive) {
                            if (finishStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Finish is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Finish is already deactivated');
                            }
                        } else {
                            if (finishStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Finish is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Finish is already activated');
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


      async getAllActiveFinish(): Promise<CommonResponseModel> {
        try {
            const data = await this.finishRepo.find({where:{isActive: true},order:{finish:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Finish data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async getFinishById(req:FinishDTO): Promise<CommonResponseModel> {
        try {
            const data = await this.finishRepo.find({where:{finishId: req.finishId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Finish data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }
      

}
