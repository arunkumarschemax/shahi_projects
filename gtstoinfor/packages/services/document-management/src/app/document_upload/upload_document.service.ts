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
@Injectable()
export class DocumentsListService {
    constructor(
        @InjectRepository(DocumentsList)
        private documentsListRepository: DocumentsListRepository,
        private documentsListAdapter: UploadDocumentListAdapter,
        private ordersRepo:OrdersRepository
      ) {}

      async createDocumentsList(documentsListRequest: DocumentsListRequest, isUpdate: boolean,): Promise<UploadDocumentListResponseModel> {
        console.log(documentsListRequest);
        
        // const manager = new GenericTransactionManager();
        try{
            const data:DocumentsList[] = [];
            // await manager.startTransaction();
            let flag:boolean =true;
            // for(const doc of documentsListRequest.file){

                const convertedDto = await this.documentsListAdapter.convertDtoToEntity(documentsListRequest);
                // const savedDoc = await manager.getCustomRepository(DocumentsListRepository).save(convertedDto);
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
              { documentCategoryId: documentCategoryId, roleId:roleId,customerPo:customerPo,orderId:orderId, documentsListId:documentsListId[index] },
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
            const query ='select po_number as poNumber from orders'
            const result = await this.ordersRepo.query(query)
            return new UploadDocumentListResponseModel(true,1,'Data retrived Sucessfully',result)
        }
        catch(err){
            throw err
        }
        
    }

    }