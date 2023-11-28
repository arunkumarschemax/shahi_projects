export class ColumnActivateReq{
    columnId: number;
    updatedUser: string;
    versionFlag: number;
    isActive: boolean;

    constructor( columnId: number,updatedUser: string,versionFlag: number,isActive: boolean){
        this.columnId = columnId
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.isActive = isActive
    }
}