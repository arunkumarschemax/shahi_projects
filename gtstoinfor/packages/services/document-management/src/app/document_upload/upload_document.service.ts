import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentsList } from "./entities/upload-document-entity";
import { DocumentsListRepository } from "./repository/documents-list.repository";
import { UploadDocumentListAdapter } from "./repository/upload-document-adapter";
import { DocumentsListRequest } from "./requests/document-list.request";
import { ErrorResponse } from "../../../../../libs/shared-models/src/common/whatsapp/error-response-object";

import {UploadDocumentListResponseModel} from '../../../../../libs/shared-models/src/document-management/upload-document-list-response-model';
@Injectable()
export class DocumentsListService {
    constructor(
        @InjectRepository(DocumentsList)
        private documentsListRepository: DocumentsListRepository,
        private documentsListAdapter: UploadDocumentListAdapter,
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

    }