import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeAdapter } from './dto/sizes-adapter';
import { Size } from './sizes-entity';
import { SizeController } from './sizes-controller';
import { SizeService } from './sizes-service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BuyerDestinationService } from 'packages/libs/shared-services/src/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([Size]),
        ],
        controllers: [SizeController],
        providers: [SizeService,SizeAdapter,ApplicationExceptionHandler,BuyerDestinationService]
      })
export class SizeModule{
    
}