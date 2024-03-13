import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { TrimUomEntity } from "./trim-uom.entity";
import { TrimUomDTO } from "./dto/trim-uom.dto";

@Injectable()
export class TrimUomService {
    constructor(
      
        @InjectRepository(TrimUomEntity)
        private trimUomRepo: Repository<TrimUomEntity>,
    
    ){}
  
  
      async getAllTrimUom(): Promise<CommonResponseModel> {
        try {
            const data = await this.trimUomRepo.find({order:{uom:"ASC"}})
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

      async createTrimUom(req: TrimUomDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
          const trimUomData = await this.trimUomRepo.findOne({ where: { uom: req.uom } });

          if (isUpdate && trimUomData && trimUomData.uomId !== req.uomId) {
            return new CommonResponseModel(false, 1, 'Another uom already exists');
          }

          if (!isUpdate && trimUomData) {
            return new CommonResponseModel(false, 1, 'Uom already exists');
          }
          const entity = new TrimUomEntity();
          entity.uom = req.uom;
          if (isUpdate) {
            entity.uomId = req.uomId;
            entity.updatedUser = req.username;
          } else {
            entity.createdUser = req.username;
          }
          const savedResult = await this.trimUomRepo.save(entity)
          return new CommonResponseModel(true, 0, isUpdate ? 'Uom updated successfully' : 'Uom created successfully', [savedResult])
        } catch (err) {
          throw err;
        }
      }

      async activateOrDeactivateTrimUom(req: TrimUomDTO): Promise<CommonResponseModel> {
        try {
            const trimUomExists = await this.trimUomRepo.findOne({where:{uomId: req.uomId}});
            if (trimUomExists) {
                if (!trimUomExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Uom. Refresh and try again');
                } else {
                    
                        const trimUomStatus =  await this.trimUomRepo.update(
                            { uomId: req.uomId },
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


      async getAllActiveTrimUom(): Promise<CommonResponseModel> {
        try {
            const data = await this.trimUomRepo.find({where:{isActive: true},order:{uom:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Uom data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async getTrimUomById(req:TrimUomDTO): Promise<CommonResponseModel> {
        try {
            const data = await this.trimUomRepo.find({where:{uomId: req.uomId,isActive: true}})
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
