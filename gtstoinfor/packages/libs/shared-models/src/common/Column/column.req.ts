export class ColumnReq{
    column: string;
    createdUser : string;
    columnId?: number;

    constructor(column: string,createdUser : string,columnId?: number){
        this.column = column
        this.createdUser = createdUser
        this.columnId = columnId
    }
}