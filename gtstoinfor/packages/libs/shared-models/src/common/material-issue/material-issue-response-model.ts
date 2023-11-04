import { GlobalResponseObject } from "../global-response-object";
import { MaterialIssueDto } from "./material-issue-dto";

export class MaterialIssueResponseModel extends GlobalResponseObject {
    data?: MaterialIssueDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: MaterialIssueDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

