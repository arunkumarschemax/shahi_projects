import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoTypeRepository } from "./co-type.repo";
import { CoTypeActivateReq, CoTypeModel, CoTypeReq, CoTypeResponseModel } from "@project-management-system/shared-models";
import { CoTypes } from "./co-type.entity";

@Injectable()
export class CoTypeService {
    constructor(
        private repo : CoTypeRepository
    ) { }

    async createCoType(req: CoTypeReq,isUpdate:boolean) : Promise<CoTypeResponseModel>{
        try{
            const entity = new CoTypes()
            if(!isUpdate){
                const coTypeCheck = await this.repo.find({where:{coType:req.coType}})
                if(coTypeCheck.length >0){
                    return new CoTypeResponseModel(false,0,'Co Type already exists')
                }
            }
            entity.coType = req.coType;
            if(isUpdate){
                entity.coTypeId = req.coTypeId;
                entity.updatedUser = req.createdUser
            } else{
                entity.createdUser = req.createdUser
            }
            const save = await this.repo.save(entity)
            const convertedData = new CoTypeModel(save.coTypeId,save.coType,save.isActive,save.versionFlag)
            return new CoTypeResponseModel(true,1,isUpdate ? 'Co Type Updated successfully' : 'Co Type Saved successfully',[convertedData])

        } catch(err){
            throw err
        }
    }

    async getAllCoTypeInfo():Promise<CoTypeResponseModel>{
        try{
            const data = await this.repo.find()
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new CoTypeModel(rec.coTypeId,rec.coType,rec.isActive,rec.versionFlag))
                }
                return new CoTypeResponseModel(true,1,'Data retrieved',info)
            } else{
                return new CoTypeResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }

   async activateOrDeactivateCoType(req: CoTypeActivateReq): Promise<CoTypeResponseModel> {
    try {
        const coTypeExists = await this.repo.findOne({where:{coTypeId:req.coTypeId}});
        if (coTypeExists) {
            if (req.versionFlag !== coTypeExists.versionFlag) {
                return new CoTypeResponseModel(false,10113, 'Someone updated the current co type information.Refresh and try again');
            } else {

                const coTypeStatus = await this.repo.update(
                    { coTypeId: req.coTypeId },
                    { isActive: req.isActive, updatedUser: req.updatedUser });

                if (coTypeExists.isActive) {
                    if (coTypeStatus.affected) {
                        const busAreaResponse: CoTypeResponseModel = new CoTypeResponseModel(true, 10115, 'Co Type is Deactivated successfully');
                        return busAreaResponse;
                    } else {
                        return new CoTypeResponseModel(false,10111, 'Co Type is already Deactivated');
                    }
                } else {
                    if (coTypeStatus.affected) {
                        const busAreaResponse: CoTypeResponseModel = new CoTypeResponseModel(true, 10114, 'Co Type is Activated successfully');
                        return busAreaResponse;
                    } else {
                        return new CoTypeResponseModel(false,10112, 'Co Type is already Activated');
                    }
                }
                // }
                }
        } else {
            return new CoTypeResponseModel(false,99998, 'No Records Found');
        }
        } catch (err) {
            return err;
        }
    }

    
    async getAllActiveCoTypeInfo():Promise<CoTypeResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive:true}})
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new CoTypeModel(rec.coTypeId,rec.coType,rec.isActive,rec.versionFlag))
                }
                return new CoTypeResponseModel(true,1,'Data retrieved',info)
            } else{
                return new CoTypeResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }
}