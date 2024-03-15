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
                return new CommonResponseModel(true, 1, 'UOM Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
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
            return new CommonResponseModel(false, 1, 'Another UOM Already Exists');
          }

          if (!isUpdate && trimUomData) {
            return new CommonResponseModel(false, 1, 'UOM Already Exists');
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
          return new CommonResponseModel(true, 0, isUpdate ? 'UOM Updated successfully' : 'UOM Created Successfully', [savedResult])
        } catch (err) {
          throw err;
        }
      }

      async activateOrDeactivateTrimUom(req: TrimUomDTO): Promise<CommonResponseModel> {
        try {
            const trimUomExists = await this.trimUomRepo.findOne({where:{uomId: req.uomId}});
            if (trimUomExists) {
                if (!trimUomExists) {
                    throw new ErrorResponse(10113, 'Someone Updated The Current UOM. Refresh And Try Again');
                } else {
                    
                        const trimUomStatus =  await this.trimUomRepo.update(
                            { uomId: req.uomId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (trimUomExists.isActive) {
                            if (trimUomStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'UOM Is Deactivated Successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'UOM Is Already Deactivated');
                            }
                        } else {
                            if (trimUomStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'UOM Is Activated Successfully');
                                return response
                            } else {
                                throw new CommonResponseModel(false,10112, 'UOM Is Already Activated');
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
                return new CommonResponseModel(true, 1, 'UOM Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }

      async getTrimUomById(req:TrimUomDTO): Promise<CommonResponseModel> {
        try {
            const data = await this.trimUomRepo.find({where:{uomId: req.uomId,isActive: true}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'UOM Data Retrieved Successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No Data Found',[])
            }
        } catch (err) {
          return err;
        }
      }
}
