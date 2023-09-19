import { ApiProperty } from "@nestjs/swagger";

export class SaveOrderDto {

    style:string;
    year:string;
    destination:string;
    currency:string;
    seasonCode:string;
   
    constructor( style:string,
        year:string,
        destination:string,
        currency:string,
        seasonCode:string
       
    ) {
        this.style = style
        this.year = year
        this.destination = destination
        this.currency = currency
        this.seasonCode = seasonCode
       
    }
}