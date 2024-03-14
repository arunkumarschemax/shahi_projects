import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { LogoEntity } from "./logo-entity";
import { LogoController } from "./logo.controller";
import { LogoService } from "./logo.service";

@Module({
    imports:[TypeOrmModule.forFeature([LogoEntity])],
    controllers:[LogoController],
    providers:[LogoService,ApplicationExceptionHandler]
})
export class LogoModule{}