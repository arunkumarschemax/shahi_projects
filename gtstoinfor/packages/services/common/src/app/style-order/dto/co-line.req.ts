import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";
import { ApiProperty } from "@nestjs/swagger";
import { CoLineInfo } from "./co-line-info.req";

export class CoLineReq {
    @ApiProperty()
    orderNumber : string;
    @ApiProperty()
    exFactoryDate : Date;
    @ApiProperty()
    deliveryDate : Date;
    @ApiProperty()
    season : string;
    @ApiProperty()
    buyerPoNumber: string;
    @ApiProperty()
    status: CustomerOrderStatusEnum;
    @ApiProperty()
    deliveryAddress : string;
    @ApiProperty()
    coNumber : string;
    @ApiProperty({type: [CoLineInfo]})
    coLineInfo : CoLineInfo[];

    

    constructor (orderNumber : string,exFactoryDate : Date,deliveryDate : Date,season : string,status:CustomerOrderStatusEnum,deliveryAddress: string,buyerPoNumber: string,coNumber : string,coLineInfo : CoLineInfo[]){
        this.orderNumber = orderNumber
        this.exFactoryDate= exFactoryDate
        this.deliveryDate = deliveryDate
        this.season = season
        this.buyerPoNumber = buyerPoNumber
        this.coLineInfo = coLineInfo
        this.status = status
        this.deliveryAddress = deliveryAddress
        this.coNumber = coNumber
        
    }
}