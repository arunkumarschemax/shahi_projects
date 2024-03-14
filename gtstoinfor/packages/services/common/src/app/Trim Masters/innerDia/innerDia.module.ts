import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { InnerDiaEntity } from "./innerDia.entity";
import { InnerDiaController } from "./innerDia.controller";
import { InnerDiaService } from "./innerDia.service";

@Module({
  imports: [
    
    TypeOrmModule.forFeature([InnerDiaEntity,CategoryMappingEntity]),
   
  ],
  controllers: [InnerDiaController],
  providers: [InnerDiaService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo],
})
export class InnerDiaModule {}
