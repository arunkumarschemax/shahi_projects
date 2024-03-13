import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { M3TrimsCategoryMappingRepo } from "../../m3-trims/m3-trims-category-mapping.repo";
import { CategoryMappingEntity } from "../../m3-trims/m3-trims-category-mapping.entity";
import { FunctionController } from "./function.controller";
import { FunctionService } from "./function.service";
import { FunctionEntity } from "./funtion.entity";


@Module({
  imports: [
    
    TypeOrmModule.forFeature([FunctionEntity,CategoryMappingEntity]),
   
  ],
  controllers: [FunctionController],
  providers: [FunctionService,ApplicationExceptionHandler,M3TrimsCategoryMappingRepo],
})
export class FunctionModule {}
