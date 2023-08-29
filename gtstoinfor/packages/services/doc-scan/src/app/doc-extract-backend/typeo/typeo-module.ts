import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeoController } from './typeo-controller';
import { TypeoService } from './typeo-service';
import { ScanEntity } from '../entity/typeo-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScanEntity])],
  controllers: [TypeoController],
  providers: [TypeoService],
})
export class TypeoModule {}
