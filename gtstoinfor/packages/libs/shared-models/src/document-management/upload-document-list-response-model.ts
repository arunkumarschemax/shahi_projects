import { GlobalResponseObject } from "../common";
import {UploadDocumentListDto} from "../document-management/upload-document-list.dto";

export class UploadDocumentListResponseModel extends GlobalResponseObject{
    data?: UploadDocumentListDto[];
    dataa?: any[];


    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data string
     */
    constructor(status: boolean, errorCode: number, internalMessage: string, data?: UploadDocumentListDto[],dataa?:any[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
        this.dataa = dataa;
    }
}