import { GlobalResponseObject } from "../global-response-object";
import { MaterialIssueReportsDto } from "./get-matireal-reports.dto";

export class MaterialReportsResponse extends GlobalResponseObject {
    data?: MaterialIssueReportsDto[];
    constructor(status: boolean, errorCode: number, internalMessage: string, data?: MaterialIssueReportsDto[]) {
        super(status, errorCode, internalMessage)
        this.data = data
    }
}