import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {CommonResponseModel } from "@project-management-system/shared-models";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { GaugeEntity } from "./gauge.entity";
import { GaugeDTO } from "./dto/gauge.dto";

@Injectable()
export class GaugeService {
    constructor(
      
        @InjectRepository(GaugeEntity)
        private gaugeRepo: Repository<GaugeEntity>,
    
    ){}
  
  
      async getAllGauge(): Promise<CommonResponseModel> {
        try {
            const data = await this.gaugeRepo.find({order:{gauge:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Gauge Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }


      async createGauge(req: GaugeDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
          const gaugeData = await this.gaugeRepo.findOne({ where: { gauge: req.gauge } });

          if (isUpdate && gaugeData && gaugeData.gaugeId !== req.gaugeId) {
            return new CommonResponseModel(false, 1, 'Another Gauge Already Exists');
          }

          if (!isUpdate && gaugeData) {
            return new CommonResponseModel(false, 1, 'Gauge Already Exists');
          }
          const entity = new GaugeEntity();
          entity.gauge = req.gauge;
          if (isUpdate) {
            entity.gaugeId = req.gaugeId;
            entity.updatedUser = req.username;
          } else {
            entity.createdUser = req.username;
          }
          const savedResult = await this.gaugeRepo.save(entity)
          return new CommonResponseModel(true, 0, isUpdate ? 'Gauge Updated Successfully' : 'Gauge Created Successfully', [savedResult])
        } catch (err) {
          throw err;
        }
      }

      async activateOrDeactivateGauge(req: GaugeDTO): Promise<CommonResponseModel> {
        try {
            const GaugeExists = await this.gaugeRepo.findOne({where:{gaugeId: req.gaugeId}});
            if (GaugeExists) {
                if (!GaugeExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Gauge. Refresh and try again');
                } else {
                    
                        const gaugeStatus =  await this.gaugeRepo.update(
                            { gaugeId: req.gaugeId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (GaugeExists.isActive) {
                            if (gaugeStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Gauge Is Deactivated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Gauge Is Already Deactivated');
                            }
                        } else {
                            if (gaugeStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Gauge Is Activated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Gauge Is Already Activated');
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


      async getAllActiveGauge(): Promise<CommonResponseModel> {
        try {
            const data = await this.gaugeRepo.find({where:{isActive: true},order:{gauge:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Gauge Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async getGaugeById(req:GaugeDTO): Promise<CommonResponseModel> {
        try {
            const data = await this.gaugeRepo.find({where:{gaugeId: req.gaugeId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Gauge Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }
}
