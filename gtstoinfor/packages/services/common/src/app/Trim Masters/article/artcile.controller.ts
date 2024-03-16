import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ArticleService } from "./article.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ArticleDto } from "./article.dto";

@ApiTags('article')
@Controller('article')
export class ArticleController{
    constructor(
        private service: ArticleService,
        private applicationHandler: ApplicationExceptionHandler
    ){}

    @Post('/getAllActiveArticles')
    async getAllActiveArticles():Promise<CommonResponseModel>{
        try{
            return await this.service.getAllActiveArticles()
        }catch(err){
            return this.applicationHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getAllArticles')
    async getAllArticles():Promise<CommonResponseModel>{
        try{
            return await this.service.getAllArticles()
        }catch(err){
            return this.applicationHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/createArticles')
    @ApiBody({type:ArticleDto})
    async createArticles(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.service.createArticles(req,false)
        }catch(err){
            return this.applicationHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/updateArticles')
    @ApiBody({type:ArticleDto})
    async updateArticles(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.service.createArticles(req,true)
        }catch(err){
            return this.applicationHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/activateOrDeactivateArticle')
    @ApiBody({type:ArticleDto})
    async activateOrDeactivateArticle(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.service.activateOrDeactivateArticle(req)
        }catch(err){
            return this.applicationHandler.returnException(CommonResponseModel,err)
        }
    }
}