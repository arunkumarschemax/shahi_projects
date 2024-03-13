import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {CommonResponseModel } from "@project-management-system/shared-models";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { FunctionEntity } from "./funtion.entity";
import { FunctionDTO } from "./dto/function.dto";

@Injectable()
export class FunctionService {
    constructor(
      
        @InjectRepository(FunctionEntity)
        private functionRepo: Repository<FunctionEntity>,
    
    ){}
  
  
      async getAllFunction(): Promise<CommonResponseModel> {
        try {
            const data = await this.functionRepo.find({order:{function:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Uom data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

      // async getAllHolesForCategory(req:CategoryIdRequest): Promise<CommonResponseModel> {
      //   try {
      //     console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
      //       const data = await this.m3TrimsCategoryMappingRepo.getAllHolesByCategory(req.categoryId)
      //       if(data.status){
      //           return new CommonResponseModel(true, 1, 'Hole data retrieved successfully',data.data)
      //       }else{
      //           return new CommonResponseModel(false, 0, 'No data found',[])
      //       }
      //   } catch (err) {
      //     return err;
      //   }
      // }

      async createFunction(req: FunctionDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
          const trimUomData = await this.functionRepo.findOne({ where: { function: req.function } });

          if (isUpdate && trimUomData && trimUomData.functionId !== req.functionId) {
            return new CommonResponseModel(false, 1, 'Another function already exists');
          }

          if (!isUpdate && trimUomData) {
            return new CommonResponseModel(false, 1, 'Uom already exists');
          }
          const entity = new FunctionEntity();
          entity.function = req.function;
          if (isUpdate) {
            entity.functionId = req.functionId;
            entity.updatedUser = req.username;
          } else {
            entity.createdUser = req.username;
          }
          const savedResult = await this.functionRepo.save(entity)
          return new CommonResponseModel(true, 0, isUpdate ? 'Uom updated successfully' : 'Uom created successfully', [savedResult])
        } catch (err) {
          throw err;
        }
      }

      async activateOrDeactivateFunction(req: FunctionDTO): Promise<CommonResponseModel> {
        try {
            const trimUomExists = await this.functionRepo.findOne({where:{functionId: req.functionId}});
            if (trimUomExists) {
                if (!trimUomExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Uom. Refresh and try again');
                } else {
                    
                        const trimUomStatus =  await this.functionRepo.update(
                            { functionId: req.functionId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (trimUomExists.isActive) {
                            if (trimUomStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Uom is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Uom is already deactivated');
                            }
                        } else {
                            if (trimUomStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Uom is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Uom is already activated');
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


      async getAllActiveFunction(): Promise<CommonResponseModel> {
        try {
            const data = await this.functionRepo.find({where:{isActive: true},order:{function:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Uom data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async getFunctionById(req:FunctionDTO): Promise<CommonResponseModel> {
        try {
            const data = await this.functionRepo.find({where:{functionId: req.functionId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Uom data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }
}
