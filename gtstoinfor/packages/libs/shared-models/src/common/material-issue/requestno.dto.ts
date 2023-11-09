export class RequestNoDto {
    requestNo?: string;
    consumption?: string;

    constructor(requestNo?: string, consumption?: string) {
        this.requestNo = requestNo;
        this.consumption= consumption;
        // this.materialIssueId = materialIssuedId
    }

}