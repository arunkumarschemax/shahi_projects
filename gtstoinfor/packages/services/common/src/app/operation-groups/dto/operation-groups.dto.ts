import { ApiProperty } from "@nestjs/swagger";

export class OperationGroupsDto{
    @ApiProperty()
    operationGroupId: number;

    @ApiProperty()
    operationGroupCode: string;

    @ApiProperty()
    operationGroupName: string;

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