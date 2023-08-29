
import { GlobalResponseObject } from "../common/global-response-object";
import{DocumentDto} from '../document-management/document-request-dto'
export class DocumentResponseModel extends GlobalResponseObject {
    data?: DocumentDto[]
    constructor(status: boolean, errorCode: number, internalMessage: string, data?: DocumentDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}