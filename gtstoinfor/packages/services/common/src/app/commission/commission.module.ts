import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commission } from './commission.entity';
import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';
import { CommissionAdapter } from './dto/commission.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
  TypeOrmModule.forFeature([Commission]),
  ],
  controllers: [CommissionController],
  providers: [CommissionService,CommissionAdapter,ApplicationExceptionHandler]
})
export class CommissionModule {}