import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BomTrimCreationEntity } from "./bom-trim.entity";
import { BomService } from "./bom.service";
import { BomTrimAdapter } from "./dto/bom-trim.adaptor";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BomController } from "./bom.controller";

@Module({
    imports: [
      
      TypeOrmModule.forFeature([BomTrimCreationEntity]),
    ],
    controllers: [BomController],
    providers: [BomService,BomTrimAdapter,ApplicationExceptionHandler],
    exports: [BomService],
  })
  export class BomModule {}