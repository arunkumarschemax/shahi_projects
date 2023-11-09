


export class RmItemMappingRequest {

    rmitemId: number;
    rmitemCode: string;
    operationId?:number
    

    constructor(
           
        rmitemId: number,
        rmitemCode: string,
        operationId?:number
    
  
    ){
      
      this.rmitemId = rmitemId
      this.rmitemCode = rmitemCode
      this.operationId = operationId

    }
  
  }
  