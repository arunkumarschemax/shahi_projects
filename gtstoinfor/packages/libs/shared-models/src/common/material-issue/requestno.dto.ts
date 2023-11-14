export class RequestNoDto {
    consumption?: string;
    materialIssueId?:string;
    constructor(requestNo?: string, consumption?: string,materialIssueId?:string) {
        this.consumption= consumption;
        this.materialIssueId = materialIssueId;
    }

}