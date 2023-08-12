
import { GlobalResponseObject } from "../common/global-response-object";
import { DocumentReqDto } from "./document-request-dto";
export class DocumentResponseModel extends GlobalResponseObject {
    data: DocumentReqDto
    constructor(status: boolean, errorCode: number, internalMessage: string, data?: DocumentReqDto) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}