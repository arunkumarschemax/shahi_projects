import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {CommonResponseModel } from "@project-management-system/shared-models";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { AirHoleEntity } from "./air-hole.entity";
import { AirHoleDTO } from "./dto/air-hole.dto";

@Injectable()
export class AirHoleService {
    constructor(
      
        @InjectRepository(AirHoleEntity)
        private airHoleRepo: Repository<AirHoleEntity>,
    
    ){}
  
  
      async getAllAirHole(): Promise<CommonResponseModel> {
        try {
            const data = await this.airHoleRepo.find({order:{airHole:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'AirHole Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }


      async createAirHole(req: AirHoleDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
          const airHoleData = await this.airHoleRepo.findOne({ where: { airHole: req.airHole } });

          if (isUpdate && airHoleData && airHoleData.airHoleId !== req.airHoleId) {
            return new CommonResponseModel(false, 1, 'Another AirHole Already Exists');
          }

          if (!isUpdate && airHoleData) {
            return new CommonResponseModel(false, 1, 'AirHole Already Exists');
          }
          const entity = new AirHoleEntity();
          entity.airHole = req.airHole;
          if (isUpdate) {
            entity.airHoleId= req.airHoleId;
            entity.updatedUser = req.username;
          } else {
            entity.createdUser = req.username;
          }
          const savedResult = await this.airHoleRepo.save(entity)
          return new CommonResponseModel(true, 0, isUpdate ? 'AirHole Updated Successfully' : 'AirHole Created Successfully', [savedResult])
        } catch (err) {
          throw err;
        }
      }

      async activateOrDeactivateAirHole(req: AirHoleDTO): Promise<CommonResponseModel> {
        try {
            const AirHoleExists = await this.airHoleRepo.findOne({where:{airHoleId: req.airHoleId}});
            if (AirHoleExists) {
                if (!AirHoleExists) {
                    throw new ErrorResponse(10113, 'Someone Updated the current AirHole. Refresh and try again');
                } else {
                    
                        const airHoleStatus =  await this.airHoleRepo.update(
                            { airHoleId: req.airHoleId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (AirHoleExists.isActive) {
                            if (airHoleStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'AirHole Is Deactivated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'AirHole Is Already Deactivated');
                            }
                        } else {
                            if (airHoleStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'AirHole Is Activated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'AirHole Is Already Activated');
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


      async getAllActiveAirHole(): Promise<CommonResponseModel> {
        try {
            const data = await this.airHoleRepo.find({where:{isActive: true},order:{airHole:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'AirHole Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async getAirHoleById(req:AirHoleDTO): Promise<CommonResponseModel> {
        try {
            const data = await this.airHoleRepo.find({where:{airHoleId: req.airHoleId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'AirHole Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }
}
