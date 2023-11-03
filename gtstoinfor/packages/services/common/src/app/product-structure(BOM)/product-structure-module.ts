
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SMVEfficiencyEntity } from "./smv-efficency.entity";
import { ProductStructureController } from "./product-structure.controller";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ProductStructureService } from "./product-structure.services";
import { SMVEfficiencyRepository } from "./repository/smv-efficency.repository";
import { FgRmMappingEntity } from "./fg-rm-mapping.entity";
import { FgRmMappingRepository } from "./repository/fg-rm-mapping.repo";



  @Module({
    imports: [
    TypeOrmModule.forFeature([SMVEfficiencyEntity,FgRmMappingEntity],),
    ],
    controllers: [ProductStructureController],
    providers: [ProductStructureService,SMVEfficiencyRepository,FgRmMappingRepository,ApplicationExceptionHandler]
  }) 
  export class ProductStructureModule {}