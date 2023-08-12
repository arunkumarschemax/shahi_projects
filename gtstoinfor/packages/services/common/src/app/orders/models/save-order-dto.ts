import { ApiProperty } from "@nestjs/swagger";

export class SaveOrderDto {


    id: number
    buyer: string;
    challanNo: number;
    invoiceNo: string;
    style: string;
    poNo: string;
    date: Date;
    dest: string;
    tcStatus: string;
    shipQty: number;
    ctns: number;
    createdUser: string | null;
    updatedUser: string | null;
    createdAt: string;
    updatedAt: string;
    version: number;
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
    constructor(id: number,buyer: string,challanNo: number,invoiceNo: string,style: string,poNo: string,date: Date,dest: string,tcStatus: string,shipQty: number,ctns: number,createdUser: string | null,updatedUser: string | null,createdAt: string,updatedAt: string,version: number,fileId : number){
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