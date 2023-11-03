


export class FgRmMappingRequest {

    
    fgitemId: number;
    fgitemCode: string;    
    rmitemId: number;
    rmitemCode: string;
    createdUser?: string;
   
  

    constructor(
        fgitemId: number,
        fgitemCode: string,    
        rmitemId: number,
        rmitemCode: string,
        createdUser?: string
  
    ){
      this.fgitemId = fgitemId
      this.fgitemCode = fgitemCode
      this.rmitemId = rmitemId
      this.rmitemCode = rmitemCode
      this.createdUser = createdUser



    }


  
  }
  