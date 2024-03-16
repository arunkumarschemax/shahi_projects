import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from "./article.entity";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { ArticleDto } from "./article.dto";
import { Vendors } from "../../vendors/vendors.entity";
import { LengthEntity } from "../length/length-entity";

@Injectable()
export class ArticleService{
    constructor(
        @InjectRepository(ArticleEntity)
        private repo : Repository<ArticleEntity>
    ){}

    async getAllArticles():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({order:{articleName:'ASC'},relations:['VendorInfo','lengthInfo']})
            if(data.length > 0){
                return new CommonResponseModel(true,1,'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false,0, 'No data found',[])
            }
        }catch(error){
            throw(error)
        }
    }

    async getAllActiveArticles():Promise<CommonResponseModel>{
        try{
            const data = await this.repo.find({where:{isActive: true},order:{articleName:"ASC"}})
            if(data.length > 0){
                return new CommonResponseModel(true,1,'Data retrieved successfully',data)
            }else{
                return new CommonResponseModel(false,0,'No data found',[])
            }
        }catch(err){
            throw(err)
        }
    }

    async createArticles(dto: ArticleDto,isUpdate: boolean):Promise<CommonResponseModel>{
        try{
            const existingData = await this.repo.findOne({where:{articleName:dto.articleName}})
            if (existingData && (!isUpdate || existingData.articleId !== dto.articleId)) {
                throw new Error('Article already exists');
            }
            const entityData = new ArticleEntity()
            entityData.articleName = dto.articleName
            entityData.text = dto.text
            const vendorEntity = new Vendors()
            vendorEntity.vendorId = dto.supplierId
            entityData.VendorInfo = vendorEntity
            const lengthEntity = new LengthEntity()
            lengthEntity.lengthId = dto.lengthId
            entityData.lengthInfo = lengthEntity
            if(isUpdate){
                entityData.articleId = dto.articleId
                entityData.updatedUser = dto.updatedUser
            }else{
                entityData.createdUser = dto.createdUser
            }
            const data = await this.repo.save(entityData)
            return new CommonResponseModel(true, 1, isUpdate ? 'Article updated successfully' : 'Article created successfully', data)
        }catch(err){
            throw(err)
        }
    }

    async activateOrDeactivateArticle(req: ArticleDto): Promise<CommonResponseModel> {
        try {
            const articleExists = await this.repo.findOne({ where: { articleId: req.articleId } });
            
            if (!articleExists) {
                throw new CommonResponseModel(false, 99998, 'No Records Found');
            }
    
            const updatedProperties = { isActive: req.isActive, updatedUser: req.updatedUser };
            const articleStatus = await this.repo.update({ articleId: req.articleId }, updatedProperties);
    
            let message, code;
            if (articleExists.isActive === req.isActive) {
                message = req.isActive ? 'Article is already activated' : 'Article is already deactivated';
                code = req.isActive ? 10112 : 10111;
            } else {
                message = req.isActive ? 'Article is activated successfully' : 'Article is deactivated successfully';
                code = req.isActive ? 10114 : 10115;
            }
    
            return new CommonResponseModel(articleStatus.affected > 0, code, message);
        } catch (err) {
            return err;
        }
    }
    
}