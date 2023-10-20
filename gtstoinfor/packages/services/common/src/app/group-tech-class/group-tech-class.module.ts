import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupTechClassController} from './group-tech-class.controller';
import { GroupTechClassService } from './group-tech-class.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { GroupTechClassEntity } from './group-tech-class.entity';
import { GroupTechClassAdapter } from './dto/group-tech-class.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupTechClassEntity]),
  ],
  controllers: [GroupTechClassController],
  providers: [GroupTechClassService,GroupTechClassAdapter,ApplicationExceptionHandler],
  exports: [GroupTechClassService]
})
export class GroupTechClassModule {}
