import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
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
@Injectable()
export class DocumentsListService {
    constructor(
        @InjectRepository(DocumentsList)
        private documentsListRepository: DocumentsListRepository,
        private documentsListAdapter: UploadDocumentListAdapter,
        private ordersRepo:OrdersRepository,
        private documentRoleMappingRepo:DocumentRoleMappingRepository,
        private documentRepo:DocumentRepository

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
    file:any[],
  filePath: string,
  documentCategoryId: number,
  roleId:number,
  customerPo:string,
  orderId:number,
  documentsListId: number[],
): Promise<DocumentFileUploadResponse> {
    console.log(documentsListId[0]);
    try{
        console.log('try');
        let status = false;
          file.forEach(async (element,index) => {
            console.log(documentsListId[index]);
            console.log(index,element);
            const filePathUpdate = await this.documentsListRepository.update(
              {  documentsListId:documentsListId[index] },
              { filePath: filePath+element.filename,fileName: element.originalname, isUploaded: true }
            );
              if (filePathUpdate.affected > 0) {
                  status = true;
              } 
        });
      if (status) {
          return new DocumentFileUploadResponse(true,1001,'uploaded successfully. ',"");
      }
      else{
          return new DocumentFileUploadResponse(false,1011,'Something went wrong. ',"");
      }
  }catch(error){
      console.log(error);
      return error;
  }
}


    async getPoNumberDropdown():Promise<UploadDocumentListResponseModel>{
        try{
            const query ='select po_no as poNumber from orders'
            const result = await this.ordersRepo.query(query)
            return new UploadDocumentListResponseModel(true,1,'Data retrived Sucessfully',result)
        }
        catch(err){
            throw err
        }
        
    }

    async getAllDocumentDetails():Promise<UploadDocumentListResponseModel>{
        try{
            const query='SELECT d.id as documentCategoryId,drl.id,role_name AS roleName,d.document_name AS documentName,documents_list_id AS documentListId,customer_po AS poNumber,order_id AS orderId,file_name AS fileName,file_path AS filePath,is_uploaded AS isUploaded FROM document_role_mapping drl      LEFT JOIN document d ON d.id=document_id LEFT JOIN documents_list dl ON dl.document_category_id=drl.document_id group by drl.document_id'
            const result = await this.documentRoleMappingRepo.query(query)
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
            const query ='select id from document'
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
                console.log(docIds.data,'docids')
                for(const request of req){
                    for(const poNumber of request.poNumber){
                        const entity = new DocumentsList()
                        entity.customerPo=poNumber
                        // entity.documentCategoryId=docIds.data
                        // for(const doc of request.documents){
                        //     entity.documentCategoryId=doc
                        // }
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