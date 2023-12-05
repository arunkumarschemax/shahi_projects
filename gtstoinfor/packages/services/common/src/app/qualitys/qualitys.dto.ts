import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class QualitysDTO {

    @ApiProperty()
    qualityId: number;

    @ApiProperty()
    @IsNotEmpty({message:" qualityName should not be empty"})
    @IsAlphanumeric()
    @IsOptional()
    qualityName: string;

    createdAt: Date;

    updatedAt: Date;
    
    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;
}

