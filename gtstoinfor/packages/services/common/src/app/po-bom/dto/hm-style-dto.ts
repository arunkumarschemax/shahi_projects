import { ApiProperty } from "@nestjs/swagger";
import { BomDto } from "./bom-dto";

export class HMStyleDto {

    @ApiProperty()
    hmId:number

    @ApiProperty()
    styleNumber:string

    
    @ApiProperty()
    teflonSheetSize:string

    
    @ApiProperty()
    consumption:string

    @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt : Date;

  @ApiProperty()
  createdUser : string;
  
    @ApiProperty()
  updatedAt : Date;
  @ApiProperty()
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;

    
    // constructor(

    //     styleNumber:string,
    //     teflonSheetSize:string,
    //     consumption:string,
    //     hmId?:number 
    //     )
    //     {
  
    //         this.styleNumber=styleNumber
    //         this.teflonSheetSize=teflonSheetSize
    //         this.consumption=consumption
    //         this.hmId=hmId
    // }
}