export class orders{
    PoOrderStatus?:string;
    OrderPlanNum?:string;
    plannedFromDate? : Date;
    plannedToDate?: Date;
    constructor(PoOrderStatus?:string, OrderPlanNum?:string,plannedFromDate?: Date, plannedToDate?: Date)
    {
        this.PoOrderStatus=PoOrderStatus
        this.OrderPlanNum=OrderPlanNum
        this.plannedFromDate = plannedFromDate
        this.plannedToDate = plannedToDate
    }
}