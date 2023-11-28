import { Inject, Injectable } from '@nestjs/common';
import { StyleRepository } from './dto/style-repo';
import { AllStyleResponseModel, StyleIdReq, UploadResponse, buyerReq } from '@project-management-system/shared-models';
import { Style } from './dto/style-entity';
import { StyleReq } from './dto/style-dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { BuyerRequest } from './dto/buyer.request';

@Injectable()

export class StyleService{
    @InjectDataSource()
    private datasource: DataSource
    constructor(
        private styleRepo:StyleRepository
    ){}

    async creteStyle(req:StyleReq ,isUpdate: boolean):Promise<AllStyleResponseModel>{
        try{
            const style= new Style()
            
            style.style=req.style
            // style.locationId=req.locationId
            // style.pch=req.pch
            style.description=req.description
            style.buyerId=req.buyerId
            if(isUpdate){
                style.styleId=req.styleId
                style.updatedUser=req.updatedUser
            }else{
                style.createdUser=req.createdUser
            }
            const save = await this.styleRepo.save(style)
            if(save){
                return new AllStyleResponseModel(true,1,'Style created Sucessfully..',[])
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
   
    async getAllStyle(buyerReq:BuyerRequest):Promise<AllStyleResponseModel>{
        try{
            console.log(buyerReq)
            const manager=this.datasource;
            let query1 = "SELECT s.style_id AS styleId,s.location_id AS locationId,pf.profit_control_head AS pch, s.style, b.buyer_name AS buyer, s.is_active AS isActive, s.style_file_name AS styleFileName, s.style_file_path AS styleFilePath, s.description AS description, s.created_user AS createdUser, s.version_flag AS versionFlag, s.updated_user AS updatedUser, s.updated_at AS updatedAt, s.created_at AS createdAt from style s left join profit_control_head pf on pf.profit_control_head_id = s.pch left join buyers b on b.buyer_id = s.buyer_id where style_id > 0 ";
            if(buyerReq.buyerId != undefined){
                query1 = query1 + " and s.buyer_id ="+buyerReq.buyerId;
            }
            query1 = query1 + " order by b.buyer_name,s.style ASC";
            let style = await manager.query(query1);
        console.log(style);
        if(style.length >0){
            return new AllStyleResponseModel(true,1,'Styles Retrived Sucessfully',style)
        }else{
            return new AllStyleResponseModel(false,0,'No  Styles Found ',[])

        }
    }
    catch (error) {
        console.log(error);
    }

    }
    async getAllActiveStyle():Promise<AllStyleResponseModel>{
        const style = await this.styleRepo.find({
            where:{isActive:true},
            order:{style:'ASC'}
        })
        if(style.length >0){
            return new AllStyleResponseModel(true,1,'Active Styles Retrived Sucessfully',[])
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
                        return new AllStyleResponseModel(true, 0, 'style deactivated successfully', [])
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