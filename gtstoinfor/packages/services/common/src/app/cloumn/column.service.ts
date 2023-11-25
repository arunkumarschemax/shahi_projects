import { InjectRepository } from "@nestjs/typeorm";
import { ColumnReq, ColumnResponseModel, ColumnModel, ColumnActivateReq } from "@project-management-system/shared-models";
import { Columns } from "./column.entity";
import { ColumnRepository } from "./column.repo";
import { Injectable } from "@nestjs/common";



@Injectable()
export class ColumnService {
    constructor(
        private repo : ColumnRepository
    ) { }

    async createColumn(req: ColumnReq,isUpdate:boolean) : Promise<ColumnResponseModel>{
        try{
            const entity = new Columns()
            if(!isUpdate){
                const ColumnCheck = await this.repo.find({where:{Column:req.column}})
                if(ColumnCheck.length >0){
                    return new ColumnResponseModel(false,0,'Column already exists')
                }
            }
            entity.Column = req.column;
            if(isUpdate){
                entity.ColumnId = req.columnId;
                entity.updatedUser = req.createdUser
            } else{
                entity.createdUser = req.createdUser
            }
            const save = await this.repo.save(entity)
            const convertedData = new ColumnModel(save.ColumnId,save.Column,save.isActive,save.versionFlag)
            return new ColumnResponseModel(true,1,isUpdate ? 'Column Updated successfully' : 'Column Saved successfully',[convertedData])

        } catch(err){
            throw err
        }
    }

    async getAllColumnInfo():Promise<ColumnResponseModel>{
        try{
            const data = await this.repo.find()
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new ColumnModel(rec.ColumnId,rec.Column,rec.isActive,rec.versionFlag))
                }
                return new ColumnResponseModel(true,1,'Data retrieved',info)
            } else{
                return new ColumnResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }

   async activateOrDeactivateColumn(req: ColumnActivateReq): Promise<ColumnResponseModel> {
    try {
        const ColumnExists = await this.repo.findOne({where:{ColumnId:req.columnId}});
        if (ColumnExists) {
            if (req.versionFlag !== ColumnExists.versionFlag) {
                return new ColumnResponseModel(false,10113, 'Someone updated the current Column information.Refresh and try again');
            } else {

                const ColumnStatus = await this.repo.update(
                    { ColumnId: req.columnId },
                    { isActive: req.isActive, updatedUser: req.updatedUser });

                if (ColumnExists.isActive) {
                    if (ColumnStatus.affected) {
                        const busAreaResponse: ColumnResponseModel = new ColumnResponseModel(true, 10115, 'Column is Deactivated successfully');
                        return busAreaResponse;
                    } else {
                        return new ColumnResponseModel(false,10111, 'Column is already Deactivated');
                    }
                } else {
                    if (ColumnStatus.affected) {
                        const busAreaResponse: ColumnResponseModel = new ColumnResponseModel(true, 10114, 'Column is Activated successfully');
                        return busAreaResponse;
                    } else {
                        return new ColumnResponseModel(false,10112, 'Column is already Activated');
                    }
                }
                // }
                }
        } else {
            return new ColumnResponseModel(false,99998, 'No Records Found');
        }
        } catch (err) {
            return err;
        }
    }

    
    async getAllActiveColumnInfo():Promise<ColumnResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive:true}})
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new ColumnModel(rec.ColumnId,rec.Column,rec.isActive,rec.versionFlag))
                }
                return new ColumnResponseModel(true,1,'Data retrieved',info)
            } else{
                return new ColumnResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }
   }
}