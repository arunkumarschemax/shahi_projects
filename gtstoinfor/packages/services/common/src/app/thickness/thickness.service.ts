import { InjectRepository } from "@nestjs/typeorm";
import { Thickness } from "./thickness.entity";
import { ThicknessRepository } from "./thickness.repo";
import { Injectable } from "@nestjs/common";
import { ThicknessReq, ThicknessResponseModel, ThicknessModel, ThicknessActivateReq } from "@project-management-system/shared-models";



@Injectable()
export class ThicknessService {
    constructor(
        private repo : ThicknessRepository
    ) { }

    async createThickness(req: ThicknessReq,isUpdate:boolean) : Promise<ThicknessResponseModel>{
        try{
            const entity = new Thickness()
            if(!isUpdate){
                const ThicknessCheck = await this.repo.find({where:{ThicknessId:req.thicknessId}})
                if(ThicknessCheck.length >0){
                    return new ThicknessResponseModel(false,0,'Thickness already exists')
                }
            }
            entity.Thickness = req.thickness;
            if(isUpdate){
                entity.ThicknessId = req.thicknessId;
                entity.updatedUser = req.createdUser
            } else{
                entity.createdUser = req.createdUser
            }
            const save = await this.repo.save(entity)
            const convertedData = new ThicknessModel(save.ThicknessId,save.Thickness,save.isActive,save.versionFlag)
            console.log(convertedData,'oooooooooo');
            
            return new ThicknessResponseModel(true,1,isUpdate ? 'Thickness Updated successfully' : 'Thickness Saved successfully',[convertedData])

        } catch(err){
            throw err
        }
    }

    async getAllThicknessInfo():Promise<ThicknessResponseModel>{
        try{
            const data = await this.repo.find()
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new ThicknessModel(rec.ThicknessId,rec.Thickness,rec.isActive,rec.versionFlag))
                }
                return new ThicknessResponseModel(true,1,'Data retrieved',info)
            } else{
                return new ThicknessResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }

   async activateOrDeactivateThickness(req: ThicknessActivateReq): Promise<ThicknessResponseModel> {
    
    try {
        const ThicknessExists = await this.repo.findOne({where:{ThicknessId:req.thicknessId}});
        if (ThicknessExists) {
            if (req.versionFlag !== ThicknessExists.versionFlag) {
                return new ThicknessResponseModel(false,10113, 'Someone updated the current Thickness information.Refresh and try again');
            } else {

                const ThicknessStatus = await this.repo.update(
                    { ThicknessId: req.thicknessId },
                    { isActive: req.isActive, updatedUser: req.updatedUser });

                if (ThicknessExists.isActive) {
                    if (ThicknessStatus.affected) {
                        const busAreaResponse: ThicknessResponseModel = new ThicknessResponseModel(true, 10115, 'Thickness is Deactivated successfully');
                        return busAreaResponse;
                    } else {
                        return new ThicknessResponseModel(false,10111, 'Thickness is already Deactivated');
                    }
                } else {
                    if (ThicknessStatus.affected) {
                        const busAreaResponse: ThicknessResponseModel = new ThicknessResponseModel(true, 10114, 'Thickness is Activated successfully');
                        return busAreaResponse;
                    } else {
                        return new ThicknessResponseModel(false,10112, 'Thickness is already Activated');
                    }
                }
                // }
                }
        } else {
            return new ThicknessResponseModel(false,99998, 'No Records Found');
        }
        } catch (err) {
            return err;
        }
    }

    
    async getAllActiveThicknessInfo():Promise<ThicknessResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive:true}})
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new ThicknessModel(rec.ThicknessId,rec.Thickness,rec.isActive,rec.versionFlag))
                }
                return new ThicknessResponseModel(true,1,'Data retrieved',info)
            } else{
                return new ThicknessResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }
}