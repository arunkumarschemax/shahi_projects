export class RequestNoDto {
    consumption?: string;

    constructor(requestNo?: string, consumption?: string) {
        this.consumption= consumption;
        // this.materialIssueId = materialIssuedId
    }

}