import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FabricSubTypeNameRequest {
    FabricSubType: string;
    isActive?: boolean;
    constructor(FabricSubType: string,isActive?: boolean){
        this.FabricSubType = FabricSubType;
        this.isActive = isActive;

    }
}