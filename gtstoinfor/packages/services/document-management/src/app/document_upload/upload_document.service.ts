import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DocumentsList } from "./entities/upload-document-entity";
import { DocumentsListRepository } from "./repository/documents-list.repository";
import { UploadDocumentListAdapter } from "./repository/upload-document-adapter";
import { DocumentsListRequest } from "./requests/document-list.request";
import { ErrorResponse } from "../../../../../libs/shared-models/src/common/whatsapp/error-response-object";

import {UploadDocumentListResponseModel} from '../../../../../libs/shared-models/src/document-management/upload-document-list-response-model';
import {DocumentFileUploadResponse} from '../../../../../libs/shared-models/src/document-management/document-file-upload-response'
import {OrdersRepository} from '../../../../common/src/app/orders/repository/orders.repository';
import { DocumentRoleMappingRepository } from "./repository/document-role-repository";
import { PoReq, docreq,req } from "./requests/importedPoReq";
import { DocumentRepository } from "./repository/documents.repository";
import { DataSource } from "typeorm";
import { PoRoleRequest } from "@project-management-system/shared-models";
import { DocumentUploadDto } from "./requests/document-upload-dto";
import { UploadFilesRepository } from "./repository/upload-files.repository";
import { UploadFileDto } from "./models/upload-file.dto";
import { UploadFilesEntity } from "./entities/upload-files.entity";
@Injectable()
export class DocumentsListService {
    constructor(
        @InjectRepository(DocumentsList)
        private documentsListRepository: DocumentsListRepository,
        private documentsListAdapter: UploadDocumentListAdapter,
        private documentRoleMappingRepo:DocumentRoleMappingRepository,
        private documentRepo:DocumentRepository,
        private uploadFilesRepository:UploadFilesRepository,

        @InjectDataSource()
        private dataSource: DataSource,

      ) {}

      async createDocumentsList(documentsListRequest: DocumentsListRequest, isUpdate: boolean,): Promise<UploadDocumentListResponseModel> {
        
        // const manager = new GenericTransactionManager();
        try{
            const data:DocumentsList[] = [];
            // await manager.startTransaction();
            let flag:boolean =true;
            
            // for(const doc of documentsListRequest.file){

                const convertedDto = await this.documentsListAdapter.convertDtoToEntity(documentsListRequest);
                // const savedDoc = await manager.getCustomRepository(DocumentsListRepository).save(convertedDto);
                console.log(convertedDto,'convertedDto')
                const savedDoc = await this.documentsListRepository.save(convertedDto);
                if(!savedDoc){
                    flag=false;
                }
            // }

            if(flag){
                return new UploadDocumentListResponseModel(true, 1001, 'Document Uploaded Successfully. ', savedDoc);
            }else{
                throw new ErrorResponse(9999, 'Something Went Wrong')
            }
        }catch(error){
            // await manager.releaseTransaction();
            return error;
        }
    }


     /**
   *
   * @param filePath
   * @param saleOrderId
   * @returns
   */
  async updatePath(
    req:DocumentsListRequest,
    file:any,
): Promise<DocumentFileUploadResponse> {
    try{
        let flag :boolean = true;
        const filePathUpdate = await this.documentsListRepository.update(
            {  documentsListId:req.documentsListId },
            { isUploaded: true }
        );
        if (filePathUpdate.affected) {
            for(const res of file){
                console.log("*******************************");
                console.log(res);

                const data = new UploadFileDto(0,res.filename,res.path,req.documentsListId)
                const entity = new UploadFilesEntity()
                entity.fileName=data.fileName
                entity.filePath="/dist/packages/services/document-management/"+data.filePath
                entity.documentListId=data.documentListId     
                const uploadDoc = await this.uploadFilesRepository.save(entity);
                if(!uploadDoc){
                    flag = false;
                }
            }
            if(flag){
                return new DocumentFileUploadResponse(true,1,'uploaded successfully. ',"");
            }
        } else{
            flag=false
            return new DocumentFileUploadResponse(false,0,'something went wrong. ',"");
        }

  }catch(error){
      console.log(error);
      return error;
  }
}


    async getPoNumberDropdown():Promise<UploadDocumentListResponseModel>{
        try{
            const query ='select customer_po as poNumber from documents_list group by customer_po'
            const result = await this.dataSource.query(query)
            return new UploadDocumentListResponseModel(true,1,'Data retrived Sucessfully',result)
        }
        catch(err){
            throw err
        }
        
    }

    async getDocumentDetailsByPO(req:PoRoleRequest):Promise<UploadDocumentListResponseModel>{
        try{
            const sqlQuery = "Select dl.status as status,is_uploaded AS uploadStatus,GROUP_CONCAT(uf.file_path) AS documentsPath, d.document_name AS documentName,dl.customer_po AS poNumber,d.id as documentCategoryId,dl.documents_list_id AS documentsListId from documents_list dl left join upload_files uf on uf.document_list_id = dl.documents_list_id left join document d on d.id = dl.document_category_id where dl.customer_po = '"+req.customerPo+"' Group by dl.documents_list_id";
            const result = await this.documentRoleMappingRepo.query(sqlQuery)
            if(result){
                return new UploadDocumentListResponseModel(true,1,'data retrived sucessfully..',result)
            }else{
            return new UploadDocumentListResponseModel(false,0,'no data found..',[])

            }

        }catch(error){
            throw error
        }
    }

    async getDocumentOrderIds():Promise<UploadDocumentListResponseModel>{
        try{
            const query ='select id AS documentCategoryId from document'
            const result = await this.documentRepo.query(query)
            console.log(result)
            return new UploadDocumentListResponseModel(true,1,'retrived sucessfully',result)
        }
        catch(error){
            throw error
        }
    }

        async createDocList(req?:req[]):Promise<UploadDocumentListResponseModel>{
            try{
                const docIds = await this.getDocumentOrderIds();
                const roleMappingData = await this.documentRoleMappingRepo.find();
                for(const poNo of req){
                    console.log(poNo)
                    for(const doc of docIds.data){
                        const entity = new DocumentsList()
                        entity.customerPo=poNo.poNumber;
                        entity.documentCategoryId=doc.documentCategoryId;
                        entity.roleName= roleMappingData.find((res) => res.documentId === doc.documentCategoryId).roleName;
                        const save = await this.documentsListRepository.save(entity)
                    }    
                }

                return new UploadDocumentListResponseModel(true,1,'creted sucessfully',[])
            }
            catch(error){
                throw(error)
            }
        }   

    }