import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TrimBuyerEntity } from "./trim-buyer-entity";
import { Repository } from "typeorm";
import { CategoryIdRequest, CommonResponseModel } from "@project-management-system/shared-models";
import { TrimBuyerDto } from "./trim-buyer.dto";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";

@Injectable()
export class TrimBuyerService{
    constructor(
        @InjectRepository(TrimBuyerEntity)
        private repo : Repository<TrimBuyerEntity>,
        private m3TrimsCategoryMappingRepo:M3TrimsCategoryMappingRepo
    ) {}

    async getAllActiveTrimBuyers():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true}, order:{trimBuyer:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async getAllTrimBuyers():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{trimBuyer:'ASC'}})
            if(data.length > 0){
                return new CommonResponseModel(true, 1, 'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false, 0, 'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createTrimBuyer(dto: TrimBuyerDto, isUpdate: boolean): Promise<CommonResponseModel>{
        try{
            const existing = await this.repo.findOne({ where: { trimBuyer: dto.trimBuyer }})

            if (existing && (!isUpdate || (isUpdate && existing.trimBuyerId !== dto.trimBuyerId))) {
                throw new Error('Buyer with the same name already exists');
            }

            const entityData = new TrimBuyerEntity()
            entityData.trimBuyer = dto.trimBuyer
            entityData.isActive = dto.isActive === undefined || dto.isActive === null ? true : dto.isActive;
            
            if (isUpdate) {
                entityData.trimBuyerId = dto.trimBuyerId;
                entityData.updatedUser = dto.updatedUser;
            } else {
                entityData.createdUser = dto.createdUser;
            }
            const data = await this.repo.save(entityData);
            return new CommonResponseModel(true, 1, isUpdate ? 'Buyer updated successfully' : 'Buyer created successfully', data)
        }catch(err){
            throw(err)
        }
    }

    async activateOrDeactivateBuyer(req: TrimBuyerDto): Promise<CommonResponseModel> {
        try {
            const buyerExists = await this.repo.findOne({where:{trimBuyerId: req.trimBuyerId}});
            if (buyerExists) {
                if (!buyerExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Buyer information. Refresh and try again');
                } else {
                    
                        const buyerStatus =  await this.repo.update(
                            { trimBuyerId: req.trimBuyerId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (buyerExists.isActive) {
                            if (buyerStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Buyer is deactivated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10111, 'Buyer is already deactivated');
                            }
                        } else {
                            if (buyerStatus.affected) {
                                const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Buyer is activated successfully');
                                return response;
                            } else {
                                throw new CommonResponseModel(false,10112, 'Buyer is already activated');
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


      async getAllBuyersForCategory(req:CategoryIdRequest):Promise<CommonResponseModel>{
        try{
            let data = await this.m3TrimsCategoryMappingRepo.getAllTrimBuyersByCategory(req.categoryId)
            if(data.status){
              return new CommonResponseModel(true, 0, 'Data retrieved successfully',data.data)
            }else{
              return new CommonResponseModel(false, 1, 'No data found',[])
            }
          }catch(err){
            throw(err)
          }
      }
}