import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { m3ItemsContentEnum } from 'packages/libs/shared-models/src/enum';
import { FabricYarnDto } from './fabric-yarn-dto';
import { FabricContentDto } from './fabric-content-dto';

export class M3ItemsDTO {

    @ApiProperty()
    m3ItemsId: number;

    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    itemCode: string;

    @ApiProperty()
    content: m3ItemsContentEnum;

    @ApiProperty()
    fabricType: number;

    @ApiProperty()
    weave: number;

    @ApiProperty()
    weight: number;

    @ApiProperty()
    weightUnit: string;

    @ApiProperty()
    epiConstruction: string;

    @ApiProperty()
    ppiConstruction: string;

    @ApiProperty()
    yarnType: string;

    // @ApiProperty()
    // yarnCount: string;

    // @ApiProperty()
    // yarnUnit: string;

    @ApiProperty()
    width: number;

    @ApiProperty()
    widthUnit: string;

    @ApiProperty()
    finish: string;

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

