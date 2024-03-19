
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";


import { BackingPaperV2 } from "./backing-paper-v2-entity";

@Module({
    imports: [
      TypeOrmModule.forFeature([BackingPaperV2])],
    controllers: [],
    providers: [ApplicationExceptionHandler]
  })
  export class BcakingPaperV2Module { }