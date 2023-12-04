import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { variety } from './variety-entity';
import { VarietyController } from './variety-controller';
import { varietyService } from './variety-services';
import { VarietyAdapter } from './dto/variety-adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([variety]),
  ],
  controllers: [VarietyController],
  providers: [varietyService,VarietyAdapter,ApplicationExceptionHandler]
})
export class varietyModule {}
