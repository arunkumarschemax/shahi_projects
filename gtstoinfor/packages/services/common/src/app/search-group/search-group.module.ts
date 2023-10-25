import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { SearchGroupController } from './search-group.contoller';
import { SearchGroupRepository } from './search-grp-repo/search-group.repo';
import { SearchGroupEnitty } from './search-group.entity';
import { SearchGroupAdapter } from './search-group-dto/search-group.adapter';
import { SearchGrpService } from './search-group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchGroupEnitty]),
  ],
  controllers: [SearchGroupController],
  providers: [SearchGroupRepository,SearchGrpService,SearchGroupAdapter,ApplicationExceptionHandler]
})
export class SearchGrpModule {}
