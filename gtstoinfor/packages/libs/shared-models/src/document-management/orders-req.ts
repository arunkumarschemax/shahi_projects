export class OrdersReq{
    fromDate:any
    toDate:any
    status:string
    constructor(
        fromDate?:any,
        toDate?:any,
        status?:string,
    ){
        this.fromDate=fromDate
        this.toDate=toDate
        this.status=status

    }
}