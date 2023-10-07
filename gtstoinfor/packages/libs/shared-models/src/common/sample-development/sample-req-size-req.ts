import { ApiProperty } from "@nestjs/swagger";

export class SampleSizeReq{
      colourId:number
      sizeId:number
      quantity : number;
      SampleRequestSizeId?:number;
      constructor(
        colourId:number,
        sizeId:number,
        quantity : number,
        SampleRequestSizeId?:number
      )
      {
        this.colourId=colourId
        this.sizeId=sizeId
        this.quantity=quantity
        this.SampleRequestSizeId=SampleRequestSizeId
      }
      
}
