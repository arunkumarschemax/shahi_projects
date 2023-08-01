import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Attributes } from './attributes.entity';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { AttributeAdapter } from './dto/attribute.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attributes]),
  ],
  controllers: [AttributeController],
  providers: [AttributeService,AttributeAdapter,ApplicationExceptionHandler],
  exports:[AttributeService]
})
export class AttributeModule {}
