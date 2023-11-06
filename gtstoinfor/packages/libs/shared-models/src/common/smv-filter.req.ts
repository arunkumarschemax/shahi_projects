export class SMVFilterRequest {

    operationId?:number;
    departmentId?:number;
    validFromDate?: string;
    validToDate?: string;
    optionsPercent?:string;

    
        constructor(
            operationId?:number,departmentId?:number,rmItemCode?: string,optionGroup?: string, optionsPercent?:string
        ) {
            this.operationId = operationId
            this.departmentId = departmentId
            this.validFromDate = rmItemCode
            this.validToDate =optionGroup 
            this.optionsPercent = optionsPercent
            
        }
    }
    