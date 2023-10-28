
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SMVEfficiencyEntity } from "./smv-efficency.entity";
import { ProductStructureController } from "./product-structure.controller";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ProductStructureService } from "./product-structure.services";
import { SMVEfficiencyRepository } from "./repository/smv-efficency.repository";



  @Module({
    imports: [
    TypeOrmModule.forFeature([SMVEfficiencyEntity]),
    ],
    controllers: [ProductStructureController],
    providers: [ProductStructureService,SMVEfficiencyRepository,ApplicationExceptionHandler]
  }) 
  export class ProductStructureModule {}