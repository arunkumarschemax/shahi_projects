import { Inject, Injectable } from '@nestjs/common';
import { StyleRepository } from './dto/style-repo';
import { AllStyleResponseModel, UploadResponse } from '@project-management-system/shared-models';
import { Style } from './dto/style-entity';
import { StyleReq } from './dto/style-dto';

@Injectable()

export class StyleService{
    constructor(
        private styleRepo:StyleRepository
    ){}

    async creteStyle(req:StyleReq ,isUpdate: boolean):Promise<AllStyleResponseModel>{
        try{
            const style= new Style()
            
            style.style=req.style
            style.locationId=req.locationId
            style.pch=req.pch
            style.description=req.description
            if(isUpdate){
                style.styleId=req.styleId
                style.updatedUser=req.updatedUser
            }else{
                style.createdUser=req.createdUser
            }
            const save = await this.styleRepo.save(style)
            if(save){
                return new AllStyleResponseModel(true,1,'Style created Sucessfully..',[style])
            }
            
        }
        catch(error){
            throw error
        }
    }

    
    async updateStylePath(filePath: string, filename: string, styleId: number): Promise<UploadResponse> {
        console.log('upload service id---------------', styleId)
        try {
            let filePathUpdate;   
                filePathUpdate = await this.styleRepo.update(
                    { styleId: styleId },
                    { styleFilePath: filePath, styleFileName: filename },
                )
            if (filePathUpdate.affected > 0) {
                return new UploadResponse(true, 11, 'uploaded successfully', filePath);
            }
            else {
                return new UploadResponse(false, 11, 'uploaded failed', filePath);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
   
    
}