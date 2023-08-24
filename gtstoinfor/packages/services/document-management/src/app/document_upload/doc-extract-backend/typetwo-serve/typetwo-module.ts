import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypetwoService } from './typetwo-service';
import { TypetwoController } from './typetwo-controller';
import { TypetwoEntity } from '../entity/typetwo-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypetwoEntity])],
  controllers: [TypetwoController],
  providers: [TypetwoService],
})
export class TypetwoModule {}
