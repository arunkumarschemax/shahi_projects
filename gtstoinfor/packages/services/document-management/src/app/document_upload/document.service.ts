
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentDto } from './dto/document.dto';
import { DeleteDto } from './dto/delete-dto';
import {DocumentResponseModel} from '../../../../../libs/shared-models/src/document-management/document-response.model'
import { DocumentRepository } from './repository/documents.repository';
import { CommonResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private repository:DocumentRepository ,
    ) { }

    async getAllDocuments(): Promise<DocumentResponseModel> {
        const query= 'select document_name as documentName,id,created_user as createdUser,updated_user as updatedUser,is_active as isActive,version_flag as versionFlag from document'
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

      async createDocument(req:DocumentDto ,isUpdate: boolean):Promise<DocumentResponseModel>{
        try{

          if(!isUpdate){
            const relation = await this.getDocvalidation(req.documentName)
            if(relation){
                return new DocumentResponseModel(false,0,'routes combination already exists',undefined)
            }
        }else{
            console.log('hiii')
            const relation = await this.getDocvalidation(req.documentName)
            if(relation){
                return new DocumentResponseModel(false,0,'routes combination already exists',undefined)     
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
          const save = await this.repository.save(entities)
          if(save){
            return new DocumentResponseModel(true,1,'document created sucessfully..',undefined)
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
                        return new DocumentResponseModel(true, 0, ' de-activated successfully', [])
                    } else {
                        throw new DocumentResponseModel(false, 1, 'already deactivated', [])
                    }
                } else {
                    if (routesupdate.affected) {
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


      
    }
