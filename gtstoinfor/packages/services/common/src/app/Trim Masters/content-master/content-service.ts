
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { ContentRepo } from './dto/content-repo';
import { ContentEntity } from './dto/content-entity';
import { ContentDto } from './dto/content-dto';
@Injectable()

export class ContentService{
    @InjectDataSource()
    private datasource: DataSource
    constructor(
        private contentRepo:ContentRepo
    ){}
    async createContent(req:ContentDto, isUpdate:boolean):Promise<CommonResponseModel>{
        try{
            const entity= new ContentEntity()
            entity.content=req.content
            if(isUpdate){
                entity.updatedUser=req.createdUser
                entity.contentId=req.contentId
            }else{
                entity.createdUser=req.createdUser
            }
            const save = await this.contentRepo.save(entity)
            if(save){
                return new CommonResponseModel(true,1,'Content Created SucessFully')
            }else{
                return new CommonResponseModel(false,0,'Something Went Wrong')

            }

        }catch(err){
            throw err
        }
    }

    async getAllContent():Promise<CommonResponseModel>{
        const style = await this.contentRepo.find({
            where:{isActive:true},
            order:{content:'ASC'}
        })
        console.log(style);
        if(style.length >0){
            return new CommonResponseModel(true,1,'Active Contents Retrived Sucessfully',style)
        }else{
            return new CommonResponseModel(false,0,'No  Content Found ',[])

        }

    }
    async getAllActiveContent():Promise<CommonResponseModel>{
        const style = await this.contentRepo.find({
            where:{isActive:true},
            order:{content:'ASC'}
        })
        console.log(style);
        if(style.length >0){
            return new CommonResponseModel(true,1,'Active content Retrived Sucessfully',style)
        }else{
            return new CommonResponseModel(false,0,'No  Content Found ',[])

        }

    }
}
