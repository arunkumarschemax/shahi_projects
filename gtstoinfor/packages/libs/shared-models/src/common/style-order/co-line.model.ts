import { CoLineStatusEnum, CustomerOrderStatusEnum } from "../../enum";
import { CoLineInfo } from "./co-line-info.model";

export class CoLineModel {
    orderNumber : string;
    exFactoryDate : Date;
    deliveryDate : Date;
    season : string;
    buyerPoNumber: string;
    status: CustomerOrderStatusEnum;
    deliveryAddress : string;
    coLineInfo : CoLineInfo[];

    

    constructor (orderNumber : string,exFactoryDate : Date,deliveryDate : Date,season : string,status:CustomerOrderStatusEnum,deliveryAddress: string,buyerPoNumber: string,coLineInfo : CoLineInfo[]){
        this.orderNumber = orderNumber
        this.exFactoryDate= exFactoryDate
        this.deliveryDate = deliveryDate
        this.season = season
        this.buyerPoNumber = buyerPoNumber
        this.coLineInfo = coLineInfo
        this.status = status
        this.deliveryAddress = deliveryAddress
    }
}