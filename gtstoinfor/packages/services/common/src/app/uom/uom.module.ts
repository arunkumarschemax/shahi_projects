import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { UomEntity } from './uom-entity';
import { UomController } from './uoms.controller';
import { UomService } from './uom.service';
import { UomRepository } from './dto/uom.repository';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([UomEntity]),
  ],
  controllers: [UomController],
  providers: [UomService,ApplicationExceptionHandler,UomRepository]
})
export class UomModule {}
