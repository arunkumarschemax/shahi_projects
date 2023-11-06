import { Injectable } from "@nestjs/common";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { DataSource } from "typeorm";

@Injectable()

export class SubstituionService{
    constructor(
        private readonly dataSource: DataSource,
    ){}


   
}