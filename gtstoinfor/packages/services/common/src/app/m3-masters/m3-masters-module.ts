import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { M3MastersEntity } from './m3-masters.entity';
import { M3MastersController } from './m3-masters-controller';
import { M3MastersService } from './m3-masters-service';
import { M3MastersRepository } from './m3-masters.repo';
@Module({
  imports: [
    
    TypeOrmModule.forFeature([M3MastersEntity]),
  ],
  controllers: [M3MastersController],
  providers: [M3MastersService,ApplicationExceptionHandler,M3MastersRepository],
  exports: [M3MastersService],
})
export class M3MastersModule {}
