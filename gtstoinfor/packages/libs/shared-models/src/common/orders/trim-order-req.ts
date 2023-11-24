export class TrimOrdersReq {
  OrderNumber?: string;
  sampleCode?: string;
  approvalFromDate?: any
  approvalToDate?: any
  constructor(OrderNumber?: string, sampleCode?: string, approvalFromDate?: any, approvalToDate?: any) {
    this.OrderNumber = OrderNumber
    this.approvalFromDate = approvalFromDate
    this.approvalToDate = approvalToDate
    this.sampleCode = sampleCode
  }
}