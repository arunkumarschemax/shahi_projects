import { ApiProperty } from "@nestjs/swagger";

export class CoLineInfo {
    @ApiProperty()
    skuCode : string;
    @ApiProperty()
    color : string;
    @ApiProperty()
    size : string;
    @ApiProperty()
    destination : string;
    @ApiProperty()
    price : number;
    @ApiProperty()
    qty : number;
    @ApiProperty()
    colorId : number;
    @ApiProperty()
    sizeId : number;
    @ApiProperty()
    destinationId : number;
    @ApiProperty()
    discount : number;
    @ApiProperty()
    coPercentage : number;
    @ApiProperty()
    uomId : number;
    @ApiProperty()
    uom : string;
    
    @ApiProperty()
    coLineNumber : string;
    constructor(
        skuCode : string,
        color : string,
        size : string,
        destination : string,
        price : number,
        qty : number,
        colourId : number,
        sizeId : number,
        destinationId : number,
        discount : number,
        coPercentage : number,
        uomId : number,
        uom : string,
        coLineNumber : string
    ){
        this.skuCode = skuCode
        this.color = color
        this.size = size
        this.destination = destination
        this.price = price
        this.qty = qty
        this.colorId = colourId
        this.sizeId = sizeId
        this.destinationId = destinationId 
        this.discount = discount
        this.coPercentage = coPercentage
        this.uom = uom
        this.uomId = uomId
        this.coLineNumber = coLineNumber
    }
}