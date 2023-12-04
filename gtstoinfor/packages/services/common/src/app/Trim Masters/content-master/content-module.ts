import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ContentService } from './content-service';
import { ContentEntity } from './dto/content-entity';
import { ContentRepo } from './dto/content-repo';
import { ContentController } from './content-comtroller';


@Module({
    imports: [
        TypeOrmModule.forFeature([ContentEntity
        ]),
      ],
      providers: [ApplicationExceptionHandler,ContentRepo,ContentService],
      controllers: [ContentController],
      exports: []
})
export class ContentModule { }