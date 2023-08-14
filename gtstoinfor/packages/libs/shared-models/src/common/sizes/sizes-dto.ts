import { ApiProperty } from "@nestjs/swagger";


export class SizeDto {
    @ApiProperty()
    sizeId: number;
    
    @ApiProperty()
    size: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt : Date | any;

    @ApiProperty()
    createdUser : string;

    @ApiProperty()
    updatedAt : Date | any;

    @ApiProperty()
    updatedUser : string;

    @ApiProperty()
    versionFlag : number;
}

export const sizeDtoDefault : SizeDto = {
    sizeId:0,
    size:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};