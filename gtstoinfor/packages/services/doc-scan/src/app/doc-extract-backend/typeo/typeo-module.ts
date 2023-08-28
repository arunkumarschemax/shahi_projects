import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeoEntity } from '../entity/typeo-entity';
import { TypeoController } from './typeo-controller';
import { TypeoService } from './typeo-service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeoEntity])],
  controllers: [TypeoController],
  providers: [TypeoService],
})
export class TypeoModule {}
