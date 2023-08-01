import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { LiscenceType } from './liscence-type.entity';
import { LiscenceTypeController} from './liscence-type-controller';
import { LiscenceTypeService } from './liscence-type.service';
import { LiscenceTypeAdapter } from './dto/liscence-type.adapter';

@Module({
  imports: [
  TypeOrmModule.forFeature([LiscenceType]),
  ],
  controllers: [LiscenceTypeController],
  providers: [LiscenceTypeService,LiscenceTypeAdapter,ApplicationExceptionHandler]
})
export class LiscenceTypedModule {


  
}