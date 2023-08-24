import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypethreeController } from './typethree-controller';
import { TypethreeService } from './typethree-service';
import { TypethreeEntity } from '../entity/typethree-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypethreeEntity])],
  controllers: [TypethreeController],
  providers: [TypethreeService],
})
export class TypethreeModule {}
