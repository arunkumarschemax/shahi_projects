import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricsAdapter } from './dto/fabrics.adapter';
import { Fabrics } from './fabrics-entity';
import { FabricsController } from './fabrics-controller';
import { FabricsService } from './fabrics-service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([Fabrics]),
        ],
        controllers: [FabricsController],
        providers: [FabricsAdapter,FabricsService,ApplicationExceptionHandler]
      })
export class FabricsModule{
    
}