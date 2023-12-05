import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { HoleEntity } from "./hole.entity";
import { HoleController } from "./hole.controller";
import { HoleService } from "./hole.service";


@Module({
  imports: [
    
    TypeOrmModule.forFeature([HoleEntity]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [HoleController],
  providers: [HoleService,ApplicationExceptionHandler],
})
export class HoleModule {}
