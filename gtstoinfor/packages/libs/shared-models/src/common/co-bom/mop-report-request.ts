import { CustomerOrderStatusEnum } from "../../enum";
import { StyleOrderItemsModel } from "../style-order";

export class MopRequest{

    styleOrderId: number;
    coNumber:number;
    coLineNumber: string;
    






    constructor(styleOrderId: number,
        coNumber:number,
        coLineNumber:string
        ){
            this.styleOrderId = styleOrderId
            this.coNumber = coNumber
            this.coLineNumber = coLineNumber
    }
}


