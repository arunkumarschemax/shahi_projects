import { ApiProperty } from "@nestjs/swagger";

export class PoReq{
    @ApiProperty()
    poNumber:string[]
  
    constructor(poNumber:string[],documents:string[]){
        this.poNumber=poNumber
       
    }

    
}
export class docreq{
    @ApiProperty()
    documents:string[]
    constructor(documents:string[]){
        this.documents=documents
    }
        
}

export class req {
    @ApiProperty()
    poNumber:string[]
    // @ApiProperty()
    // documents:number[]
    constructor(poNumber:string[]){
        // this.documents=documents
        this.poNumber=poNumber
    }
}
