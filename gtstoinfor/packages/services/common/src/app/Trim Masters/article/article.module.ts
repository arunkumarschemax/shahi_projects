import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ArticleEntity } from "./article.entity";
import { LengthEntity } from "../length/length-entity";
import { Vendors } from "../../vendors/vendors.entity";
import { ArticleController } from "./artcile.controller";
import { ArticleService } from "./article.service";

@Module({
    imports:[TypeOrmModule.forFeature([ArticleEntity,LengthEntity,Vendors])],
    controllers:[ArticleController],
    providers:[ArticleService,ApplicationExceptionHandler]
})
export class ArticleModule{}