import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FinishEntity } from "./finish.entity";
import { FinishController } from "./finish.controller";
import { FinishService } from "./finish.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";


@Module({
  imports: [
    
    TypeOrmModule.forFeature([FinishEntity]),
    // forwardRef(() => ClusterModule),
  ],
  controllers: [FinishController],
  providers: [FinishService,ApplicationExceptionHandler],
})
export class FinishModule {}
