export class CompareOrdersFilterReq {
     orderNumber?: string;
     itemCode?: string;
     itemName?: string;
     warehouseFromDate?: any;
     warehouseFromYear?: any;
     warehouseToDate?: any;
     warehouseToYear?: any;
     exFactoryFromDate?: any;
     exFactoryToDate?: any;
     year?:number

     constructor(orderNumber?: string,itemCode?: string,itemName?: string,warehouseFromDate?: any,warehouseFromYear?: any,warehouseToDate?: any,warehouseToYear?: any,exFactoryFromDate?: any,exFactoryToDate?: any,year?:number){
        this.orderNumber = orderNumber;
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.warehouseFromDate = warehouseFromDate;
        this.warehouseFromYear = warehouseFromYear;
        this.warehouseToDate = warehouseToDate;
        this.warehouseToYear = warehouseToYear;
        this.exFactoryFromDate = exFactoryFromDate;
        this.exFactoryToDate = exFactoryToDate;
        this.year = year
     }
}