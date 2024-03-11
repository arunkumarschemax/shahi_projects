import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ContentService } from './content-service';
import { ContentEntity } from './dto/content-entity';
import { ContentRepo } from './dto/content-repo';
import { ContentController } from './content-comtroller';
import { M3TrimsCategoryMappingRepo } from '../../m3-trims/m3-trims-category-mapping.repo';
import { CategoryMappingEntity } from '../../m3-trims/m3-trims-category-mapping.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ContentEntity,CategoryMappingEntity
        ]),
      ],
      providers: [ApplicationExceptionHandler,ContentRepo,ContentService,M3TrimsCategoryMappingRepo],
      controllers: [ContentController],
      exports: []
})
export class ContentModule { }