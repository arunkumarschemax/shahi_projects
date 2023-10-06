import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BomService } from "./bom.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BomController } from "./bom.controller";
import { BomTrimEntity } from "./bom-trim.entity";
import { BomTrimRepository } from "./repository/bom-trim.repository";



  @Module({
    imports: [
    TypeOrmModule.forFeature([BomTrimEntity]),
    ],
    controllers: [BomController],
    providers: [BomService,BomTrimRepository,ApplicationExceptionHandler]
  }) 
  export class BomModule {}