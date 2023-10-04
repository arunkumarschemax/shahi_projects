export class TrimOrdersReq{
  OrderNumber?:string;
  approvalFromDate? : any
  approvalToDate?: any
  constructor(OrderNumber?:string,approvalFromDate? : any,approvalToDate?: any){
      this.OrderNumber = OrderNumber
      this.approvalFromDate = approvalFromDate
      this.approvalToDate = approvalToDate
  }
}