
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { weightRepository } from './dto/weight-repo';
import { CategoryActivateReq, CategoryReq, CategoryResponseModel, CommonResponseModel, WeightActivateReq, WeightResponseModel } from '@project-management-system/shared-models';
import { WeightEntity } from './dto/weight-entity';
import { WeightDto } from './dto/weight-dto';
@Injectable()

export class WeightService{
    @InjectDataSource()
    private datasource: DataSource
    constructor(
        private weightRepo:weightRepository
    ){}

    async createWeight(req:WeightDto,isUpdate: boolean):Promise<CommonResponseModel>{
        try{
            console.log(req,"req,ser")
            const entity = new WeightEntity()
                entity.weightId=req.weightId
                entity.weight=req.weight
                if(isUpdate){
                    entity.weightId=req.weightId
                    entity.updatedUser=req.updatedUser
                }else{
                    entity.createdUser=req.createdUser
                }
                const save = await this.weightRepo.save(entity)
                if(save){
                    return new CommonResponseModel(true,1,isUpdate ? 'Weight Updated Successfully' : 'Weight Created Successfully')
                }else{
                    return new CommonResponseModel(false,0,'Something Went wrong')
                }

        }
        catch(err){
            throw err
        }
    }

    async getAllWeight():Promise<CommonResponseModel>{
        const style = await this.weightRepo.find({
            order:{weight:'ASC'}
        })
        console.log(style);
        if(style.length >0){
            return new CommonResponseModel(true,1,'Active Weight Retrived Sucessfully',style)
        }else{
            return new CommonResponseModel(false,0,'No  Weight Found ',[])

        }

    }
    async getAllActiveWeight():Promise<CommonResponseModel>{
        const style = await this.weightRepo.find({
            where:{isActive:true},
            order:{weight:'ASC'}
        })
        console.log(style);
        if(style.length >0){
            return new CommonResponseModel(true,1,'Active weight Retrived Sucessfully',style)
        }else{
            return new CommonResponseModel(false,0,'No  weight Found ',[])

        }

    }
    async activeteOrDeactivateWeight(req: WeightActivateReq): Promise<WeightResponseModel> {
        try {
            const ColumnExists = await this.weightRepo.findOne({where:{weightId:req.weightId}});
            if (ColumnExists) {
                if (req.versionFlag !== ColumnExists.versionFlag) {
                    return new WeightResponseModel(false,10113, 'Someone updated the current Weight information.Refresh and try again');
                } else {
    
                    const ColumnStatus = await this.weightRepo.update(
                        { weightId: req.weightId },
                        { isActive: req.isActive, updatedUser: req.updatedUser });
    
                    if (ColumnExists.isActive) {
                        if (ColumnStatus.affected) {
                            const busAreaResponse: WeightResponseModel = new WeightResponseModel(true, 10115, 'Weight is Deactivated successfully');
                            return busAreaResponse;
                        } else {
                            return new WeightResponseModel(false,10111, 'Weight is already Deactivated');
                        }
                    } else {
                        if (ColumnStatus.affected) {
                            const busAreaResponse: WeightResponseModel = new WeightResponseModel(true, 10114, 'Weight is Activated successfully');
                            return busAreaResponse;
                        } else {
                            return new WeightResponseModel(false,10112, 'Weight is already Activated');
                        }
                    }
                    // }
                    }
            } else {
                return new WeightResponseModel(false,99998, 'No Records Found');
            }
            } catch (err) {
                return err;
            }
        }
}
