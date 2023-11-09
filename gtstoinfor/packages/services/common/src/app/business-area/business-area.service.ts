import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessAreaRepository } from "./business-area.repo";
import { BusinessAreaActivateReq, BusinessAreaModel, BusinessAreaReq, BusinessAreaResponseModel } from "@project-management-system/shared-models";
import { BusinessArea } from "./business-area.entity";

@Injectable()
export class BusinessAreaService {
    constructor(
        private repo : BusinessAreaRepository
    ) { }

    async createBusinessArea(req: BusinessAreaReq,isUpdate:boolean) : Promise<BusinessAreaResponseModel>{
        try{
            const entity = new BusinessArea()
            if(!isUpdate){
                const buyerNameCheck = await this.repo.find({where:{businessAreaCode:req.businessAreaCode}})
                if(buyerNameCheck.length >0){
                    return new BusinessAreaResponseModel(false,0,'Business Area Code already exists')
                }
            }
            entity.businessAreaCode = req.businessAreaCode;
            entity.businessAreaName = req.businessAreaName;
            if(isUpdate){
                entity.businessAreaId = req.businessAreaId;
                entity.updatedUser = req.createdUser
            } else{
                entity.createdUser = req.createdUser
            }
            const save = await this.repo.save(entity)
            const convertedData = new BusinessAreaModel(save.businessAreaId,save.businessAreaCode,save.businessAreaName,save.isActive,save.versionFlag)
            return new BusinessAreaResponseModel(true,1,isUpdate ? 'Updated successfully' : 'Saved successfully',[convertedData])

        } catch(err){
            throw err
        }
    }

    async getAllBusinessAreaInfo():Promise<BusinessAreaResponseModel>{
        try{
            const data = await this.repo.find()
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new BusinessAreaModel(rec.businessAreaId,rec.businessAreaCode,rec.businessAreaName,rec.isActive,rec.versionFlag))
                }
                return new BusinessAreaResponseModel(true,1,'Data retrieved',info)
            } else{
                return new BusinessAreaResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }

    }

    async activateOrDeactivateBusinessArea(req: BusinessAreaActivateReq): Promise<BusinessAreaResponseModel> {
        try {
            const busAreaExists = await this.repo.findOne({where:{businessAreaId:req.businessAreaId}});
            if (busAreaExists) {
                if (req.versionFlag !== busAreaExists.versionFlag) {
                    return new BusinessAreaResponseModel(false,10113, 'Someone updated the current business area information.Refresh and try again');
                } else {

                    const busAreaStatus = await this.repo.update(
                        { businessAreaId: req.businessAreaId },
                        { isActive: req.isActive, updatedUser: req.updatedUser });

                    if (busAreaExists.isActive) {
                        if (busAreaStatus.affected) {
                            const busAreaResponse: BusinessAreaResponseModel = new BusinessAreaResponseModel(true, 10115, 'Business Area is de-activated successfully');
                            return busAreaResponse;
                        } else {
                            return new BusinessAreaResponseModel(false,10111, 'Business Area is already deactivated');
                        }
                    } else {
                        if (busAreaStatus.affected) {
                            const busAreaResponse: BusinessAreaResponseModel = new BusinessAreaResponseModel(true, 10114, 'Business Area is activated successfully');
                            return busAreaResponse;
                        } else {
                            return new BusinessAreaResponseModel(false,10112, 'Business Area is already activated');
                        }
                    }
                    // }
                }
            } else {
                return new BusinessAreaResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
}