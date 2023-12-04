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
          if (!isUpdate) {
            const updateData = await this.finishRepo.findOne({ where: { finish: req.finish } });
            if (updateData) {
              throw new CommonResponseModel(false, 11104, 'Finish already exists');
            }
            const finishCode = await this.finishRepo.findOne({ where: { finishCode: req.finishCode } });
            if (finishCode) {
              throw new CommonResponseModel(false, 11104, 'Finish Code already exists');
            }
          } 
          else {
            const existingFinish = await this.finishRepo.findOne({ select: ['finishId'], where: { finish: req.finish } });
            if (existingFinish) {
              throw new ErrorResponse(0, 'Finish already exists!!!');
            }
      
            // const existingFinishCode = await this.finishRepo.findOne({ select: ['finishId'], where: { finishCode: req.finishCode } });
            // if (existingFinishCode) {
            //   throw new ErrorResponse(0, 'Finish Code already exists!!!');
            // }
          }
      
          const finishEntity = new FinishEntity();
          finishEntity.finish = req.finish;
          finishEntity.finishCode = req.finishCode;
      
          const data = await this.finishRepo.save(finishEntity);
      
          return new CommonResponseModel(false, 0, isUpdate ? 'Finish updated successfully' : 'Finish created successfully', data);
        } catch (err) {
          return err;
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
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Finish is Deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Finish is already Deactivated');
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
