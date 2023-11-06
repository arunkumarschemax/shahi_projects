import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Substitution } from "./substituion.entity";
import { SubstituionController } from "./substituion.controller";
import { SubstituionService } from "./substituion.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { FgItemBom } from "./fg-item-bom.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Substitution,FgItemBom]),
      ],
      controllers: [SubstituionController],
      providers: [SubstituionService,ApplicationExceptionHandler],
      exports: []
})
export class SubstituionModule { }