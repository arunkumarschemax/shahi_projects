
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThreadsService } from "./threads.service";
import { ThreadsController } from "./threads.controller";
import { ThreadsRepository } from "./threads.repo";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ThreadsEntity } from "./threads.entity";
import { ThreadsAdapter } from "./dto/threads.adapter";

@Module({
    imports: [
      TypeOrmModule.forFeature([ThreadsEntity])],
    controllers: [ThreadsController],
    providers: [ThreadsService,ThreadsAdapter,ThreadsRepository,ApplicationExceptionHandler]
  })
  export class ThreadsModule { }