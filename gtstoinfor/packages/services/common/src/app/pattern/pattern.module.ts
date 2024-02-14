import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { PatternEntity } from "./pattern.entity";
import { PatternController } from "./pattern.controller";
import { PatternService } from "./pattern.service";

@Module({
    imports:[TypeOrmModule.forFeature([PatternEntity])],
    controllers:[PatternController],
    providers:[PatternService,ApplicationExceptionHandler]
})
export class PatternModule{}