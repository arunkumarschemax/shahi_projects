export class SMVFilterRequest {

    operationId?:number;
    departmentId?:number;
    validFromDate?: string;
    validToDate?: string;

    
        constructor(
            operationId?:number,departmentId?:number,rmItemCode?: string,optionGroup?: string,
        ) {
            this.operationId = operationId
            this.departmentId = departmentId
            this.validFromDate = rmItemCode
            this.validToDate =optionGroup 
            
        }
    }
    