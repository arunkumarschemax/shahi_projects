import { GlobalResponseObject } from "../common";
import {UploadDocumentListDto} from "../document-management/upload-document-list.dto";

export class UploadDocumentListResponseModel extends GlobalResponseObject{
    data?: UploadDocumentListDto[];

    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data string
     */
    constructor(status: boolean, errorCode: number, internalMessage: string, data?: UploadDocumentListDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}