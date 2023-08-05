import { ApiProperty } from "@nestjs/swagger";
import { ComponentInfoDto } from "./component-info.dto";

export class ComponentMappingDto{
    @ApiProperty()
    componentMappingId: number;

    @ApiProperty()
    styleId: number;
    style:string;

    @ApiProperty()
    garmentCategoryId: number;
    garmentCategory : string;

    @ApiProperty()
    garmentId: number;
    garment: string;

    @ApiProperty()
    componentDeatils: ComponentInfoDto[];

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