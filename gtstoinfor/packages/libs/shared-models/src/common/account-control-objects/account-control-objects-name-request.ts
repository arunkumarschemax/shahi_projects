import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountControlObjectNameRequest {
    accountControlObjectName: string;
    isActive?: boolean;
    constructor(accountControlObjectName: string,isActive?: boolean){
        this.accountControlObjectName = accountControlObjectName;
        this.isActive = isActive;

    }
}