import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { RangeController } from './range-controller';
import { RangeEnitty } from './range-entity';
import { RangeAdapter } from './range-dto/range-adapter';
import { RangeService } from './range-service';
import { RangeRepository } from './range-repo/range-repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([RangeEnitty]),
  ],
  controllers: [RangeController],
  providers: [RangeRepository,RangeService,RangeAdapter,ApplicationExceptionHandler]
})
export class RangeModule {}
