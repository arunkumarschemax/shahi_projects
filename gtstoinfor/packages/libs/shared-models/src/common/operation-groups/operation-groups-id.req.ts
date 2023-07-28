export class OperationGroupsRequest{
    operationGroupId:number;
    updatedUser?: string;
    versionFlag?: number;
    isActive?: boolean;
    operationGroupCode?: string;
    
    constructor(operationGroupId:number,updatedUser?: string,versionFlag?: number,isActive?: boolean,operationGroupCode?: string){
        this.operationGroupId = operationGroupId;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
        this.operationGroupCode = operationGroupCode;
    }
}