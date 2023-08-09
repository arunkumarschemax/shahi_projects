import { ApiProperty } from "@nestjs/swagger";

export class SampleTypesDto{
    @ApiProperty()
    sampleTypeId: number;

    @ApiProperty()
    sampleType: string;

    @ApiProperty()
    isActive: boolean;
  
    createdAt : Date;
  
    @ApiProperty()
    createdUser : string;
  
    updatedAt : Date;
    
    @ApiProperty()
    updatedUser : string;
  
    @ApiProperty()
    versionFlag : number;


}