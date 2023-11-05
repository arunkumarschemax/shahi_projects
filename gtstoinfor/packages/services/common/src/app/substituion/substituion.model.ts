import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Substitution } from "./substituion.entity";
import { SubstituionController } from "./substituion.controller";
import { SubstituionService } from "./substituion.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";

@Module({
    imports: [
        TypeOrmModule.forFeature([Substitution]),
      ],
      controllers: [SubstituionController],
      providers: [SubstituionService,ApplicationExceptionHandler],
      exports: []
})
export class SubstituionModule { }