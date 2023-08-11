import { ApiProperty } from "@nestjs/swagger";

export class DocumentsListRequest{
    @ApiProperty()
    documentCategoryId:number;
    @ApiProperty()
    roleId:number;
    @ApiProperty()
    customerPo:string
    @ApiProperty()
    orderId:number
    @ApiProperty()
    file:string[];
    constructor(documentCategoryId:number,roleId:number,customerPo:string,orderId:number, file:string[],){
        this.documentCategoryId = documentCategoryId;
        this.file = file;
        this.roleId = roleId;
        this.customerPo=customerPo
        this.orderId=orderId

    }
}