
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

    async createContent(req: ContentDto, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
            const existing = await this.contentRepo.findOne({ where: { content: req.content } });
            if (existing) {
                return new CommonResponseModel(false, 11104, 'Content already exists');
            }
    
            const entity = new ContentEntity();
            entity.content = req.content;
            entity.itemType = req.itemType
    
            if (isUpdate) {
                entity.updatedUser = req.createdUser;
                entity.contentId = req.contentId;
            } else {
                entity.createdUser = req.createdUser;
            }
    
            const save = await this.contentRepo.save(entity);
    
            if (save) {
                return new CommonResponseModel(true, 1, isUpdate ? 'Content Updated Successfully' : 'Content Created Successfully');
            } else {
                return new CommonResponseModel(false, 0, 'Something Went Wrong');
            }
        } catch (err) {
            // Handle the error appropriately, e.g., log or rethrow
            throw err;
        }
    }
    

    async getAllContent():Promise<CommonResponseModel>{
        const style = await this.contentRepo.find({
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

    async getContentById(contentId: number): Promise<ContentEntity> {
        const Response = await this.contentRepo.findOne({
        where: {contentId: contentId},
        });
        if (Response) {
        return Response;
        } else {
        return null;
        }
    } 

  async activateOrDeactivateContent(req: ContentDto): Promise<CommonResponseModel> {
    try {
        const Exist = await this.getContentById(req.contentId);
        if (Exist) {
            if (!Exist) {
                throw new CommonResponseModel(false,10113, 'Someone updated the current   Content information.Refresh and try again');
            } else {
                
                    const Status =  await this.contentRepo.update(
                        { contentId: req.contentId },
                        { isActive: req.isActive,updatedUser: req.updatedUser });
                   
                    if (Exist.isActive) {
                        if (Status.affected) {
                            const Response: CommonResponseModel = new CommonResponseModel(true, 10115, 'Content is Deactivated successfully');
                            return Response;
                        } else {
                            throw new CommonResponseModel(false,10111, 'Content is already deactivated');
                        }
                    } else {
                        if (Status.affected) {
                            const response: CommonResponseModel = new CommonResponseModel(true, 10114, 'Content is Activated successfully');
                            return response;
                        } else {
                            throw new CommonResponseModel(false,10112, 'Content is already  activated');
                        }
                    }
                // }
            }
        } else {
            throw new CommonResponseModel(false,99998, 'No Records Found');
        }
    } catch (err) {
        return err;
    }
}

async getFabricContentData():Promise<CommonResponseModel>{
    try{
      let query = `
      SELECT content, item_type as itemType, content_id as contentId
      FROM content
      WHERE item_type = 'Fabric'`
      const data = await this.datasource.query(query)
      if(data.length>0){
        return new CommonResponseModel(true, 0, 'Data retrieved successfully',data)
      }else{
        return new CommonResponseModel(false, 1, 'No data found',[])
      }
    }catch(err){
      throw(err)
    }
  }

  
}
