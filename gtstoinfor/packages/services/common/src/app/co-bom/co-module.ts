import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CoBomController } from './co-bom.controller';
import { CoBomService } from './co-bom-service';
import { CoBomAdapter } from './dto/co-bom.adapter';
import { CoBom } from './co-bom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoBom]),
  ],
  controllers: [CoBomController],
  providers: [CoBomService,CoBomAdapter,ApplicationExceptionHandler],
  exports:[]
})
export class CoBomModule {}
