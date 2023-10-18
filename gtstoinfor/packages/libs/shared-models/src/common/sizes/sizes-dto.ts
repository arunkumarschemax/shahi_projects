import { ApiProperty } from "@nestjs/swagger";


export class SizeDto {
    sizeId: number;
    
    size: string;
    
    divisionId:number;

    divisionName:string;

    isActive: boolean;

    createdAt : Date | any;

    createdUser : string;

    updatedAt : Date | any;

    updatedUser : string;

    versionFlag : number;
}

export const sizeDtoDefault : SizeDto = {
    sizeId:0,
    size:"",
    divisionId:0,
    divisionName:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
};