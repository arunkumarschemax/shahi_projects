export class ColumnModel{
   columnId: number;
   column: string;
    isActive: boolean;
    versionFlag: number;

    constructor(columnId: number,column: string,isActive: boolean,versionFlag: number){
        this.columnId =columnId
        this.column =column
        this.isActive = isActive
        this.versionFlag = versionFlag
    }
}