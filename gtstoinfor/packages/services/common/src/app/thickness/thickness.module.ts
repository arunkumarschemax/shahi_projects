import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { Thickness } from "./thickness.entity";
import { ThicknessController } from "./thickness.controller";
import { ThicknessRepository } from "./thickness.repo";
import { ThicknessService } from "./thickness.service";


@Module({
    imports: [
      TypeOrmModule.forFeature([Thickness]),
    ],
    controllers: [ThicknessController],
    providers: [ThicknessService,ApplicationExceptionHandler,ThicknessRepository]
  })
  export class ThicknessModule {}