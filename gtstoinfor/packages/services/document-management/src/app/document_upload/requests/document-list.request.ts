import { ApiProperty } from "@nestjs/swagger";

export class DocumentsListRequest{
    @ApiProperty()
    documentsListId:number;
    @ApiProperty()
    documentCategoryId:number;
    @ApiProperty()
    roleId:number;
    @ApiProperty()
    poNumber:string  
    @ApiProperty()
    orderId:number
    @ApiProperty()
    fileName:string
    @ApiProperty()
    file:any[];
    @ApiProperty()
    uid:any[]
    constructor(documentsListId:number,documentCategoryId:number,roleId:number,poNumber:string,fileName:string,orderId:number, file:any[],uid:any[]){
        this.documentsListId = documentsListId;
        this.documentCategoryId = documentCategoryId;
        this.file = file;
        this.roleId = roleId;
        this.poNumber=poNumber
        this.fileName=fileName
        this.orderId=orderId
        this.uid=uid

    }
}