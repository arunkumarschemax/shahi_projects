import { Inject, Injectable } from '@nestjs/common';
import { StyleRepository } from './dto/style-repo';
import { AllStyleResponseModel, StyleIdReq, UploadResponse } from '@project-management-system/shared-models';
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
   
    async getAllStyle():Promise<AllStyleResponseModel>{
        const style = await this.styleRepo.find({order:{createdAt:'ASC'}})
        if(style.length >0){
            return new AllStyleResponseModel(true,1,'Styles Retrived Sucessfully',style)
        }else{
            return new AllStyleResponseModel(false,0,'No  Styles Found ',[])

        }

    }
    async getAllActiveStyle():Promise<AllStyleResponseModel>{
        const style = await this.styleRepo.find({
            where:{isActive:true},
            order:{createdAt:'ASC'}
        })
        if(style.length >0){
            return new AllStyleResponseModel(true,1,'Active Styles Retrived Sucessfully',style)
        }else{
            return new AllStyleResponseModel(false,0,'No  Employees Found ',[])

        }

    }
    
    async ActivateOrDeactivateStyle(req: StyleIdReq): Promise<AllStyleResponseModel> {
        const StyleDetails = await this.styleRepo.findOne({ where: { styleId: req.styleId } })
        if (StyleDetails) {
            if (req.versionFlag != StyleDetails.versionFlag) {
                throw new AllStyleResponseModel(false, 1, 'SomeOne updated. Referesh and try again', [])
            } else {
                const StyleUpdate = await this.styleRepo.update({ styleId: req.styleId }, { isActive: req.isActive})
                if (StyleDetails.isActive) {
                    console.log('activeeeee')
                    if (StyleUpdate.affected) {
                        return new AllStyleResponseModel(true, 0, 'style de-activated successfully', [])
                    } else {
                        throw new AllStyleResponseModel(false, 1, 'style already deactivated', [])
                    }
                } else {
                    if (StyleUpdate.affected) {
                        return new AllStyleResponseModel(true, 0, 'style activated successfully', [])
                    } else {
                        throw new AllStyleResponseModel(false, 1, 'style already activated', [])
                    }
                }
            }
        }
        else {
            throw new AllStyleResponseModel(false, 1, 'No record found', [])

        }
    }
}