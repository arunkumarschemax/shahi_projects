
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentDto } from './dto/document.dto';
import { DeleteDto } from './dto/delete-dto';
import {DocumentResponseModel} from '../../../../../libs/shared-models/src/document-management/document-response.model'
import { DocumentRepository } from './repository/documents.repository';
import { CommonResponseModel, DocumentIdReq } from '@project-management-system/shared-models';
import { DocumentRoleMappingRepository } from './repository/document-role-repository';
import { UploadFilesRepository } from './repository/upload-files.repository';
import { DocumentsListRepository } from './repository/documents-list.repository';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private repository:DocumentRepository ,
        private mappingRepo : DocumentRoleMappingRepository,
        private uploadFilesRepository:DocumentsListRepository,


    ) { }

    async getAllDocuments(): Promise<DocumentResponseModel> {
        const query= 'select document_name as documentName,id,created_user as createdUser,updated_user as updatedUser,is_active as isActive,version_flag as versionFlag, priority AS priority,is_download as isDownload from document ORDER BY priority ASC' 
        const data = await this.repository.query(query)
        console.log(data,'dataa')
        if (data) {
         return new DocumentResponseModel(true,1,'Document data Retrived Sucessfully',data)
        }else{
          return new DocumentResponseModel(false,0,'no data found',undefined)
        }
       
      }
      async getAllDocumentsforRolemapping(): Promise<DocumentResponseModel> {
        const query= 'select document_name as documentName,id,created_user as createdUser,updated_user as updatedUser,is_active as isActive,version_flag as versionFlag from document where is_active=true'
        const data = await this.repository.query(query)
        console.log(data,'dataa')
        if (data) {
         return new DocumentResponseModel(true,1,'Document data Retrived Sucessfully',data)
        }else{
          return new DocumentResponseModel(false,0,'no data found',undefined)
        }    
      }

      async getDocvalidation(documentName:string):Promise<DocumentEntity>{
        const data = await this.repository.findOne({
           where:{documentName: documentName}    
        })
        if(data){
            return data
        }else{
            return null
        }
    }
    async updatePriority(req:DocumentDto):Promise<CommonResponseModel>{
      try{
        let flag = true;
        // for(const data of req){
          let existingPriority = await this.repository.findOne({where:{priority:req.priority}});
          let oldPriority = await this.repository.findOne({where:{id:req.id}});
          let updatePriority = await this.repository.update({id:req.id},{priority:req.priority});
          if(updatePriority.affected === 0){
            flag = false;
            return new CommonResponseModel(false, 1001, "Update Failed",)
          }
          else{
            let updateNewPriority = await this.repository.update({id:existingPriority.id},{priority:oldPriority.priority});
            if(updateNewPriority.affected === 0){
              flag = false;
              return new CommonResponseModel(false, 1001, "Update Failed",)
            }
          }
        // }
        if(!flag){
          return new CommonResponseModel(false, 1001, "Update Failed",)
        }
        else{
          return new CommonResponseModel(true, 1010, "Updated Successfully. ",)
        }
      }catch(error){
        return new CommonResponseModel(false,10011,"Something went wrong. ")
          throw error
        }
    }


      async createDocument(req:DocumentDto ,isUpdate: boolean):Promise<DocumentResponseModel>{
        try{
          let count =  await this.repository.count();
          console.log(count)
          if(!isUpdate){
            const relation = await this.getDocvalidation(req.documentName)
            if(relation){
                return new DocumentResponseModel(false,0,'Document already exists',undefined)
            }
        }else{
            console.log('hiii')
            const relation = await this.getDocvalidation(req.documentName)
            if(relation){
                return new DocumentResponseModel(false,0,'Document already exists',undefined)     
            }
        }
          const entities= new DocumentEntity()
          entities.documentName=req.documentName
          if(isUpdate){
            entities.id=req.id
            entities.updatedUser=req.updatedUser
          }else{
            entities.createdUser=req.createdUser
          }
          entities.priority = Number(count) + 1;
          const save = await this.repository.save(entities)
          if(save){
            return new DocumentResponseModel(true,1,isUpdate?'Document updated sucessfully..':'Document created successfully..',undefined)
          }else{
            return new DocumentResponseModel(false,0,'somthing went wrong..',undefined)

          }
        }catch(error){
          throw error
        }
      }

      async activateOrDeactivateDocument(req: DocumentDto): 
      Promise<DocumentResponseModel> {
        const routedetails = await this.repository.findOne({ where: { id: req.id } })        
        if (routedetails) {

            if (req.versionFlag != routedetails.versionFlag) {

                throw new DocumentResponseModel(false, 1, 'SomeOne updated. Referesh and try again', [])
            } else {
                const routesupdate = await this.repository.update({ id: req.id }, { isActive: req.isActive, updatedUser: req.updatedUser, })
                if (routedetails.isActive) {
                    if (routesupdate.affected) {
                      const updateRolemap = await this.mappingRepo.update({documentId:req.id},{isActive:req.isActive})

                        return new DocumentResponseModel(true, 0, ' de-activated successfully', [])
                    } else {
                        throw new DocumentResponseModel(false, 1, 'already deactivated', [])
                    }
                } else {
                    if (routesupdate.affected) {
                      const updateRolemap = await this.mappingRepo.update({documentId:req.id},{isActive:req.isActive})
                        return new DocumentResponseModel(true, 0, 'activated successfully', [])
                    } else {
                        throw new DocumentResponseModel(false, 1, 'already activated', [])
                    }
                }
            }
        }
        else {
            throw new DocumentResponseModel(false, 1, 'No record found', [])

        }

    }

    async getDocumentsNotMapped():Promise<DocumentResponseModel>{
      try{
        const query= 'select d.document_name as documentName,d.id,d.created_user as createdUser,d.updated_user as updatedUser,d.is_active as isActive,d.version_flag as versionFlag from document d left join document_role_mapping drm on drm.document_id = d.id where drm.document_id IS NULL'
        const data = await this.repository.query(query)
        console.log(data,'dataa')
        if (data) {
         return new DocumentResponseModel(true,1,'Document data Retrived Sucessfully',data)
        }else{
          return new DocumentResponseModel(false,0,'no data found',undefined)
        }

      }catch(error){
          throw error
        }
    }

    async updateDownloadStatus(req:DocumentIdReq):Promise<DocumentResponseModel>{

      const update = await this.repository.update({id:req.documentId},{isDownload:req.isDownload})
      if(update){
        return new DocumentResponseModel(true,1,'Download Status Update SucessFully')
      }else{
        return new DocumentResponseModel(false,0,'Something went wrong',[])
      }


    }



      
    }
