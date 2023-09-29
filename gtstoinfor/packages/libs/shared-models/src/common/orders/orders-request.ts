export class orders{
    PoOrderStatus?:string;
    OrderPlanNumber?:string;
    constructor(PoOrderStatus?:string,OrderPlanNumber?:string)
    {
        this.PoOrderStatus=PoOrderStatus
        this.OrderPlanNumber=OrderPlanNumber
    }
}