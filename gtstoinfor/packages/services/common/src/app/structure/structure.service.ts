import { InjectRepository } from "@nestjs/typeorm";
import { Structure } from "./structure.entity";
import { StructureRepository } from "./structure.repo";
import { Injectable } from "@nestjs/common";
import { StructureReq, StructureResponseModel, StructureModel, StructureActivateReq, CommonResponseModel } from "@project-management-system/shared-models";



@Injectable()
export class StructureService {
    constructor(
        private repo : StructureRepository
    ) { }

    async createStructure(req: StructureReq,isUpdate:boolean) : Promise<StructureResponseModel>{
        
        try{
            const entity = new Structure()
            if(!isUpdate){
                const ColumnCheck = await this.repo.find({where:{structure:req.structure}})
                if(ColumnCheck.length >0){
                    return new StructureResponseModel(false,0,'structure already exists')
                }
            }
            entity.structure = req.structure;
            if(isUpdate){
                entity.structureId = req.structureId;
                entity.updatedUser = req.createdUser
            } else{
                entity.createdUser = req.createdUser
            }
            const save = await this.repo.save(entity)
            const convertedData = new StructureModel(save.structureId,save.structure,save.isActive,save.versionFlag)
            return new StructureResponseModel(true,1,isUpdate ? 'structure Updated successfully' : 'structure Saved successfully',[convertedData])

        } catch(err){
            throw err
        }
    }
    // async createStructure1(req: StructureReq,isUpdate:boolean) : Promise<StructureResponseModel>{
    //     console.log(req,'ppppppppp');
        
    //     try{
    //         const entity = new Structure()
    //         if(!isUpdate){
    //             const StructureCheck = await this.repo.find({where:{structureId:req.structureId}})
    //             if(StructureCheck.length >0){
    //                 return new StructureResponseModel(false,0,'Structure already exists')
    //             }
    //         }
    //         entity.structure = req.structure;
    //         if(isUpdate){
    //             entity.structureId = req.structureId;
    //             entity.updatedUser = req.createdUser
    //         } else{
    //             entity.createdUser = req.createdUser
    //         }
    //         const save = await this.repo.save(entity)
    //         const convertedData = new StructureModel(save.structureId,save.structure,save.isActive,save.versionFlag)
    //         console.log(convertedData,'oooooooooo');
            
    //         return new StructureResponseModel(true,1,isUpdate ? 'Structure Updated successfully' : 'Structure Saved successfully',[convertedData])

    //     } catch(err){
    //         throw err
    //     }
    // }
     
    async getAllStrucutreInfo():Promise<StructureResponseModel>{
        try{
            const data = await this.repo.find()
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new StructureModel(rec.structureId,rec.structure,rec.isActive,rec.versionFlag))
                }
                return new StructureResponseModel(true,1,'Data retrieved',info)
            } else{
                return new StructureResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }

   async activateOrDeactivateStructure(req: StructureActivateReq): Promise<StructureResponseModel> {
    
    try {
        const StructureExists = await this.repo.findOne({where:{structureId:req.structureId}});
        if (StructureExists) {
            if (req.versionFlag !== StructureExists.versionFlag) {
                return new StructureResponseModel(false,10113, 'Someone updated the current Structure information.Refresh and try again');
            } else {

                const StructureStatus = await this.repo.update(
                    { structureId: req.structureId },
                    { isActive: req.isActive, updatedUser: req.updatedUser });

                if (StructureExists.isActive) {
                    if (StructureStatus.affected) {
                        const busAreaResponse: StructureResponseModel = new StructureResponseModel(true, 10115, 'Structure is Deactivated successfully');
                        return busAreaResponse;
                    } else {
                        return new StructureResponseModel(false,10111, 'Structure is already Deactivated');
                    }
                } else {
                    if (StructureStatus.affected) {
                        const busAreaResponse: StructureResponseModel = new StructureResponseModel(true, 10114, 'Structure is Activated successfully');
                        return busAreaResponse;
                    } else {
                        return new StructureResponseModel(false,10112, 'Structure is already Activated');
                    }
                }
                // }
                }
        } else {
            return new StructureResponseModel(false,99998, 'No Records Found');
        }
        } catch (err) {
            return err;
        }
    }

    
    async getAllActiveStructure():Promise<StructureResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive:true}})
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new StructureModel(rec.structureId,rec.structure,rec.isActive,rec.versionFlag))
                }
                return new StructureResponseModel(true,1,'Data retrieved',info)
            } else{
                return new StructureResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }
}