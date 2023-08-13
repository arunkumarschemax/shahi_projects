
import { ApiProperty } from "@nestjs/swagger";

export class SaveOrderDto {

    @ApiProperty()
    id: number

    @ApiProperty()
    buyer: string;

    @ApiProperty()
    challanNo: number;

    @ApiProperty()
    invoiceNo: string;

    @ApiProperty()
    style: string;

    @ApiProperty()
    poNo: string;

    @ApiProperty()
    date: any;

    @ApiProperty()
    dest: string;

    @ApiProperty()
    tcStatus: string;

    @ApiProperty()
    shipQty: number;

    @ApiProperty()
    ctns: number;

    @ApiProperty()
    createdUser: string | null;

    @ApiProperty()
    updatedUser: string | null;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;

    @ApiProperty()
    version: number;

    @ApiProperty()
    fileId : number;
    /**
     * 
     * @param id 
     * @param buyer 
     * @param challanNo 
     * @param invoiceNo 
     * @param style 
     * @param poNo 
     * @param date 
     * @param dest 
     * @param tcStatus 
     * @param shipQty 
     * @param ctns 
     * @param createdUser 
     * @param updatedUser 
     * @param createdAt 
     * @param updatedAt 
     * @param version 
     * @param fileId 
     */
    constructor(id: number,buyer: string,challanNo: number,invoiceNo: string,style: string,poNo: string,date: any,dest: string,tcStatus: string,shipQty: number,ctns: number,createdUser: string | null,updatedUser: string | null,createdAt: string,updatedAt: string,version: number,fileId : number){
        this.id = id;
        this.buyer = buyer;
        this.challanNo = challanNo;
        this.invoiceNo = invoiceNo;
        this.style = style;
        this.poNo = poNo;
        this.date = date;
        this.dest = dest;
        this.tcStatus = tcStatus;
        this.shipQty = shipQty;
        this.ctns = ctns;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.version = version;
        this.fileId = fileId;

    }
}
