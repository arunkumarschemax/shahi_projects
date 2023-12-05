
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { OrdersRepository } from './dto/category-repo';
import { CategoryActivateReq, CategoryReq, CategoryResponseModel, CommonResponseModel } from '@project-management-system/shared-models';
import { CategoryEntity } from './dto/category-entity';
import { CategoryDto } from './dto/category-dto';
@Injectable()

export class CategoryService{
    @InjectDataSource()
    private datasource: DataSource
    constructor(
        private categoryRepo:OrdersRepository
    ){}

    async createCategory(req:CategoryDto,isUpdate: boolean):Promise<CommonResponseModel>{
        try{
            console.log(req,"req,ser")
            const entity = new CategoryEntity()
                entity.category=req.category
                entity.categoryCode=req.categoryCode
                if(isUpdate){
                    entity.categoryId=req.categoryId
                    entity.updatedUser=req.updatedUser
                }else{
                    entity.createdUser=req.createdUser
                }
                const save = await this.categoryRepo.save(entity)
                if(save){
                    return new CommonResponseModel(true,1,isUpdate ? 'Category Updated Successfully' : 'Category Created Successfully')
                }else{
                    return new CommonResponseModel(false,0,'Something Went wrong')
                }

        }
        catch(err){
            throw err
        }
    }

    async getAllCategory():Promise<CommonResponseModel>{
        const style = await this.categoryRepo.find({
            order:{category:'ASC'}
        })
        console.log(style);
        if(style.length >0){
            return new CommonResponseModel(true,1,'Active Categories Retrived Sucessfully',style)
        }else{
            return new CommonResponseModel(false,0,'No  Categories Found ',[])

        }

    }
    async getAllActiveCategory():Promise<CommonResponseModel>{
        const style = await this.categoryRepo.find({
            where:{isActive:true},
            order:{category:'ASC'}
        })
        console.log(style);
        if(style.length >0){
            return new CommonResponseModel(true,1,'Active Categories Retrived Sucessfully',style)
        }else{
            return new CommonResponseModel(false,0,'No  Categories Found ',[])

        }

    }
    async activeteOrDeactivateCategory(req: CategoryActivateReq): Promise<CategoryResponseModel> {
        try {
            const ColumnExists = await this.categoryRepo.findOne({where:{categoryId:req.categoryId}});
            if (ColumnExists) {
                if (req.versionFlag !== ColumnExists.versionFlag) {
                    return new CategoryResponseModel(false,10113, 'Someone updated the current Category information.Refresh and try again');
                } else {
    
                    const ColumnStatus = await this.categoryRepo.update(
                        { categoryId: req.categoryId },
                        { isActive: req.isActive, updatedUser: req.updatedUser });
    
                    if (ColumnExists.isActive) {
                        if (ColumnStatus.affected) {
                            const busAreaResponse: CategoryResponseModel = new CategoryResponseModel(true, 10115, 'Category is Deactivated successfully');
                            return busAreaResponse;
                        } else {
                            return new CategoryResponseModel(false,10111, 'Category is already Deactivated');
                        }
                    } else {
                        if (ColumnStatus.affected) {
                            const busAreaResponse: CategoryResponseModel = new CategoryResponseModel(true, 10114, 'Category is Activated successfully');
                            return busAreaResponse;
                        } else {
                            return new CategoryResponseModel(false,10112, 'Category is already Activated');
                        }
                    }
                    // }
                    }
            } else {
                return new CategoryResponseModel(false,99998, 'No Records Found');
            }
            } catch (err) {
                return err;
            }
        }
}
