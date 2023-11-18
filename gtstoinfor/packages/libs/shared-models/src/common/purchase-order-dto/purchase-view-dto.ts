export class PurchaseViewDto{
  id?: number;
        confirmStartDate?:string;
         confirmEndDate?:string;
        constructor(id?: number,confirmStartDate?:string,confirmEndDate?:string) {
            this.id= id;
            this.confirmStartDate = confirmStartDate 
            this.confirmEndDate  = confirmEndDate
        }
    
    }