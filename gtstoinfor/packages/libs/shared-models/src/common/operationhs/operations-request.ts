export class OperationsDTO{
    operationId:number;
    operationCode:string;
    operationName:string;
    isActive:boolean;
    updatedUser:string;
    versionFlag:number;
    operationGroupId:number;

    /**
     * 
     * @param operationId This is a number
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     * @param operationCode This is a string
     * @param versionFlag This is a string

     */
    
    constructor(operationId:number,operationCode:string, operationName:string,isActive:boolean,updatedUser:string,versionFlag:number,operationGroupId:number){
        this.operationId = operationId;
        this.updatedUser = updatedUser;
        this.operationCode = operationCode
        this.isActive = isActive;
        this.versionFlag = versionFlag
        this.operationName = operationName
        this.operationGroupId = operationGroupId
    }
}