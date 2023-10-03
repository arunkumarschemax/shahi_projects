export class TrimOrdersReq{
  OrderNumber?:string;
  approvalFromDate? : Date
  approvalToDate?: Date
  constructor(OrderNumber?:string,approvalFromDate? : Date,approvalToDate?: Date){
      this.OrderNumber = OrderNumber
      this.approvalFromDate = approvalFromDate
      this.approvalToDate = approvalToDate
  }
}