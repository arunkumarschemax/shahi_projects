import { ApiProperty } from "@nestjs/swagger";

export class SupplierCreatDto {
    @ApiProperty()
    id?: number;
    @ApiProperty()
    isActive?: boolean;
    @ApiProperty()
    versionFlag?: number;
    @ApiProperty()
    updatedUser?: string;   
    createdUser: any;
}