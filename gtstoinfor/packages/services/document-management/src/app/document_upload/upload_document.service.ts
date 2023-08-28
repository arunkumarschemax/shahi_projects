import { Injectable, Query } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DocumentsList } from "./entities/upload-document-entity";
import { DocumentsListRepository } from "./repository/documents-list.repository";
import { UploadDocumentListAdapter } from "./repository/upload-document-adapter";
import { DocumentsListRequest } from "./requests/document-list.request";
import { ErrorResponse } from "../../../../../libs/shared-models/src/common/whatsapp/error-response-object";
import { config } from 'packages/libs/shared-services/config';
import {UploadDocumentListResponseModel} from '../../../../../libs/shared-models/src/document-management/upload-document-list-response-model';
import {DocumentFileUploadResponse} from '../../../../../libs/shared-models/src/document-management/document-file-upload-response'
import {OrdersRepository} from '../../../../common/src/app/orders/repository/orders.repository';
import { DocumentRoleMappingRepository } from "./repository/document-role-repository";
import { PoReq, docreq,req } from "./requests/importedPoReq";
import { DocumentRepository } from "./repository/documents.repository";
import { DataSource } from "typeorm";
import { DocumentIdreq, PoRoleRequest, UploadDocumentListDto, docRequest, poReq } from "@project-management-system/shared-models";
import { DocumentUploadDto } from "./requests/document-upload-dto";
import { UploadFilesRepository } from "./repository/upload-files.repository";
import { UploadFileDto } from "./models/upload-file.dto";
import { UploadFilesEntity } from "./entities/upload-files.entity";
import { OrdersEntity } from "../orders/entities/order.entity";
import { GenericTransactionManager } from "packages/services/common/src/typeorm-transactions/generic-transaction-manager";
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
        console.log(req)
        let flag :boolean = true;
        const uploadStatusUpdate = await this.documentsListRepository.update(
            {  documentsListId:req.documentsListId },
            { isUploaded: true, status:req.status }
        );
        console.log (uploadStatusUpdate)
        if (uploadStatusUpdate.affected > 0) {
            for(const res of file){
                const data = new UploadFileDto(0,res.filename,res.path,req.documentsListId,res.uid)
                const entity = new UploadFilesEntity()
                entity.fileName=data.fileName
                entity.filePath="/dist/packages/services/document-management/"+data.filePath
                entity.documentListId=data.documentListId  
                if(req.uid.length >= 20){            
                    entity.uid=req.uid;
                }else{
                    entity.uid=req.uid[file.indexOf(res)];
                }      
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
            const query ='select customer_po as poNumber from documents_list where customer_po != "" and is_uploaded = 0 group by customer_po'
            const result = await this.dataSource.query(query)
            return new UploadDocumentListResponseModel(true,1,'Data retrived Sucessfully',result)
        }
        catch(err){
            throw err
        }
        
    }

    async getDocumentDetailsByPO(req:PoRoleRequest):Promise<UploadDocumentListResponseModel>{
        try{
            const sqlQuery = "Select dl.status,is_uploaded AS uploadStatus,GROUP_CONCAT(uf.file_path) AS documentsPath, d.document_name AS documentName,dl.customer_po AS poNumber,d.id as documentCategoryId,dl.documents_list_id AS documentsListId from documents_list dl left join upload_files uf on uf.document_list_id = dl.documents_list_id left join document d on d.id = dl.document_category_id where dl.customer_po = '"+req.customerPo+"' and role_name ='"+req.role+"' Group by dl.documents_list_id";
            const result = await this.documentRoleMappingRepo.query(sqlQuery)
            let docinfo: UploadDocumentListDto[] = [];
            let urls:any[] = [];
            if(result.length >0){
            for (const res of result){
                const doctlistQuery = 'SELECT uid,u.file_name AS name, concat("'+config.download_path+'PO-",dl.customer_po,"/",u.file_name) AS url, "application/pdf" AS "type", d.document_name AS documentName FROM upload_files u  LEFT JOIN documents_list dl ON u.document_list_id=dl.documents_list_id left join document d on d.id = dl.document_category_id where u.document_list_id ='+res.documentsListId;
                const docres = await this.uploadFilesRepository.query(doctlistQuery)

                const docReq:docRequest[] =[];
                for(const res of docres){
                    console.log(res);
                    urls.push(res.url);
                    let data = new docRequest(res.uid,res.name,res.status,res.type,res.url,res.documentName);
                    console.log(data);
                    console.log("*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

                    docReq.push(data);
                }
                // console.log(docReq,'docReq')
                // console.log(res.status,'resssssssssssssssssssssssssssss')
                docinfo.push(new UploadDocumentListDto(res.documentsListId,res.documentCategoryId,res.role_id,res.poNumber,1,res.documentName,res.dlFilePath,res.uploadStatus,res.isActive,'','','','',1,docReq,res.status,res.documentName) )
                // result.documentsPath = docReq;
                console.log( docinfo,' result.documentsPath')
            }
                return new UploadDocumentListResponseModel(true,1,'data retrived sucessfully..',docinfo,urls)
            }else{
            return new UploadDocumentListResponseModel(false,0,'no data found..',[])

            }
        }catch(error){
            throw error
        }
    }

    async getDocumentOrderIds():Promise<UploadDocumentListResponseModel>{
        try{
            const query ='select id AS documentCategoryId from document where is_active = 1'
            const result = await this.documentRepo.query(query)
            console.log(result)
            return new UploadDocumentListResponseModel(true,1,'retrived sucessfully',result)
        }
        catch(error){
            throw error
        }
    }

        async createDocList(req?:OrdersEntity[]):Promise<UploadDocumentListResponseModel>{
            const transactionManager = new GenericTransactionManager(this.dataSource)
            let flag:boolean=true;
            try{
                await transactionManager.startTransaction()
                const docIds = await this.getDocumentOrderIds();
                const roleMappingData = await this.documentRoleMappingRepo.find();
                for(const poNo of req){
                    for(const doc of docIds.data){
                        if(roleMappingData.find((res) => res.documentId === doc.documentCategoryId)?.roleName != undefined && poNo.poNo != null && poNo.id != null){
                            const entity = new DocumentsList()
                            entity.customerPo=poNo.poNo;
                            entity.orderId=poNo.id;
                            entity.documentCategoryId=doc.documentCategoryId;
                            entity.roleName= roleMappingData.find((res) => res.documentId === doc.documentCategoryId).roleName;
                            const save =  await transactionManager.getRepository(DocumentsList).save(entity)
                            if(!save){
                                flag=false;
                                break
                            }
                        }
                        else{
                            continue;
                        }
                    }    
                }
                if(!flag){
                    await transactionManager.releaseTransaction()
                    return new UploadDocumentListResponseModel(false,0,'something went wrong. ',[])
                }
                else{
                    await transactionManager.completeTransaction()
                    return new UploadDocumentListResponseModel(true,1,'creted sucessfully',[])
                }
            }
            catch(error){
                await transactionManager.releaseTransaction()
                return new UploadDocumentListResponseModel(false,0,'something went wrong. ',[])
            }
        }   

        async totalFileUploadAgainstPo(req:poReq):Promise<UploadDocumentListResponseModel>{
            try{
                const query = 'SELECT uid,status,id,document_list_id,file_name AS fileName,file_path AS filePath  FROM upload_files WHERE document_list_id IN ( SELECT documents_list_id FROM documents_list WHERE customer_po="'+req.customerPo+'")'
                const result = await this.uploadFilesRepository.query(query)
                if(result){
                    return new UploadDocumentListResponseModel(true,1,'data retrived sucessfull',result)
                }else{
                    return new UploadDocumentListResponseModel(false,0,'no data found',[])

                }

            }catch(err){
                throw err
            }
        }


    async getDocumentuploadedStaus(req:DocumentIdreq):Promise<UploadDocumentListResponseModel>{
        try{
            const query='select  document_category_id AS docCatId,is_uploaded AS isUploaded FROM documents_list  WHERE is_uploaded=1 AND document_category_id='+req.documentId+''
            const result= await this.documentsListRepository.query(query)
            if(result){
                return new UploadDocumentListResponseModel(true,1,'data retrivedsucessfully',result)
            }else{
                return new UploadDocumentListResponseModel(false,1,'data not found',[])

            }
        }catch(err){
            throw err
        }

    }
    async documentwisePercentage():Promise<UploadDocumentListResponseModel>{
        try{
          const query= 'SELECT COUNT(u.document_list_id) AS uploadedDoccnt,COUNT(document_category_id) AS doccnt,100-(ROUND(COUNT(u.document_list_id)*100/(COUNT(document_category_id)))) AS perecent, u.document_list_id,document_name AS docName FROM documents_list dl LEFT JOIN  `upload_files` u  ON u.document_list_id=dl.documents_list_id LEFT JOIN document d ON d.id=dl.document_category_id         GROUP BY document_category_id'
          const data = await this.documentsListRepository.query(query)
          console.log(data,'dataa')
          if (data) {
           return new UploadDocumentListResponseModel(true,1,'Document data Retrived Sucessfully',data)
          }else{
            return new UploadDocumentListResponseModel(false,0,'no data found',undefined)
          }
  
        }catch(error){
            throw error
          }
      }
  

    }