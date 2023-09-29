export class orders{
    PoOrderStatus?:string;
    OrderPlanNumber?:string;
    plannedFromDate? : Date
    plannedToDate?: Date
    constructor(PoOrderStatus?:string,OrderPlanNumber?:string,plannedFromDate?: Date, plannedToDate?: Date)
    {
        this.PoOrderStatus=PoOrderStatus
        this.OrderPlanNumber=OrderPlanNumber
        this.plannedFromDate = plannedFromDate
        this.plannedToDate = plannedToDate
    }
}