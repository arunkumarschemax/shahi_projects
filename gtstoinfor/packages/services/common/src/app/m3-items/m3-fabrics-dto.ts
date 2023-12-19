import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { m3ItemsContentEnum } from 'packages/libs/shared-models/src/enum';
import { FabricYarnDto } from './fabric-yarn-dto';
import { FabricContentDto } from './fabric-content-dto';

export class M3FabricsDTO {

    @ApiProperty()
    m3ItemsId: number;

    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    itemCode: string;

    @ApiProperty()
    fabricTypeId: number;

    @ApiProperty()
    weaveId: number;

    @ApiProperty()
    weightId: number;

    @ApiProperty()
    weightUnit: string;

    @ApiProperty()
    epiConstruction: string;

    @ApiProperty()
    ppiConstruction: string;

    @ApiProperty()
    yarnType: string;

    @ApiProperty()
    width: number;

    @ApiProperty()
    widthUnit: number;

    @ApiProperty()
    finishId: number

    @ApiProperty()
    shrinkage: string;
    @ApiProperty()
    description: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;

    @ApiProperty()
    buyerCode?: string;
    
    @ApiProperty()
    m3Code?: string;

        
    @ApiProperty()
    hsnCode?: string;

    @ApiProperty({type:[FabricYarnDto]})
    fabricYarnInfo: FabricYarnDto[]

    @ApiProperty({type:[FabricContentDto]})
    fabricContentInfo: FabricContentDto[]
}

