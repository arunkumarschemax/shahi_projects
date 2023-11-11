import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class M3StyleDTO {

    @ApiProperty()
    m3StyleId: number;

    @ApiProperty()
    m3StyleCode: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;
}

