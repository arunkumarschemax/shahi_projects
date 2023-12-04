
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { OrdersRepository } from './dto/category-repo';
import { CommonResponseModel } from '@project-management-system/shared-models';
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
                    return new CommonResponseModel(true,1,'category created sucessfully')
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
}
