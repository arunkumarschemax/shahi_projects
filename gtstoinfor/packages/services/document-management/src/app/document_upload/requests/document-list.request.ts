import { ApiProperty } from "@nestjs/swagger";

export class DocumentsListRequest{
    @ApiProperty()
    documentsListId:number;
    @ApiProperty()
    documentCategoryId:number;
    @ApiProperty()
    roleId:number;
    @ApiProperty()
    customerPo:string  
    @ApiProperty()
    orderId:number
    @ApiProperty()
    file:any[];
    constructor(documentsListId:number,documentCategoryId:number,roleId:number,customerPo:string,orderId:number, file:any[],){
        this.documentsListId = documentsListId;
        this.documentCategoryId = documentCategoryId;
        this.file = file;
        this.roleId = roleId;
        this.customerPo=customerPo
        this.orderId=orderId

    }
}