export class SamplieMappingDto{
    size?:string;
    quantity?: string
    location?: string
    opertionId?: number
    
    constructor( size?:string,quantity?: string, location?: string,opertionId?: number){
        this.size = size;
        this.quantity = quantity
        this.location = location
        this.opertionId = opertionId
    }
}