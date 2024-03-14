import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {CommonResponseModel } from "@project-management-system/shared-models";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { InnerDiaEntity } from "./innerDia.entity";
import { InnerDiaDTO } from "./dto/innerDia.dto";

@Injectable()
export class InnerDiaService {
    constructor(
      
        @InjectRepository(InnerDiaEntity)
        private innerDiaRepo: Repository<InnerDiaEntity>,
    
    ){}
  
  
      async getAllInnerDia(): Promise<CommonResponseModel> {
        try {
            const data = await this.innerDiaRepo.find({order:{innerDia:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'innerDia data retrieved successfully',data)
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

      async createInnerDia(req: InnerDiaDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
          const innerDiaData = await this.innerDiaRepo.findOne({ where: { innerDia: req.innerDia } });

          if (isUpdate && innerDiaData && innerDiaData.innerDiaId !== req.innerDiaId) {
            return new CommonResponseModel(false, 1, 'Another innerDia already exists');
          }

          if (!isUpdate && innerDiaData) {
            return new CommonResponseModel(false, 1, 'innerDia already exists');
          }
          const entity = new InnerDiaEntity();
          entity.innerDia = req.innerDia;
          if (isUpdate) {
            entity.innerDiaId = req.innerDiaId;
            entity.updatedUser = req.username;
          } else {
            entity.createdUser = req.username;
          }
          const savedResult = await this.innerDiaRepo.save(entity)
          return new CommonResponseModel(true, 0, isUpdate ? 'innerDia updated successfully' : 'innerDia created successfully', [savedResult])
        } catch (err) {
          throw err;
        }
      }

      async activateOrDeactivateInnerDia(req: InnerDiaDTO): Promise<CommonResponseModel> {
        try {
            const innerDiaExists = await this.innerDiaRepo.findOne({where:{innerDiaId: req.innerDiaId}});
            if (innerDiaExists) {
                if (!innerDiaExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current innerDia. Refresh and try again');
                } else {
                    
                        const innerDiaStatus =  await this.innerDiaRepo.update(
                            { innerDiaId: req.innerDiaId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (innerDiaExists.isActive) {
                            if (innerDiaStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'innerDia is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'innerDia is already deactivated');
                            }
                        } else {
                            if (innerDiaStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'innerDia is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'innerDia is already activated');
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


      async getAllActiveInnerDia(): Promise<CommonResponseModel> {
        try {
            const data = await this.innerDiaRepo.find({where:{isActive: true},order:{innerDia:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'innerDia data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async getInnerDiaById(req:InnerDiaDTO): Promise<CommonResponseModel> {
        try {
            const data = await this.innerDiaRepo.find({where:{innerDiaId: req.innerDiaId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'innerDia data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }
}
