import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColourAdapter } from './dto/colour-adapter';
import { Colour } from './colour.entity';
import { ColourController } from './colour.controller';
import { ColourService } from './colour.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BuyerDestinationService } from '@project-management-system/shared-services';

@Module({
    imports: [
        TypeOrmModule.forFeature([Colour]),
        ],
        controllers: [ColourController],
        providers: [ColourService,ColourAdapter,ApplicationExceptionHandler,BuyerDestinationService]
      })
export class ColourModule{
    
}