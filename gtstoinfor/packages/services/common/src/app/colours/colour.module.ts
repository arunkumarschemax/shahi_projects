import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColourAdapter } from './dto/colour-adapter';
import { Colour } from './colour.entity';
import { ColourController } from './colour.controller';
import { ColourService } from './colour.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([Colour]),
        ],
        controllers: [ColourController],
        providers: [ColourService,ColourAdapter,ApplicationExceptionHandler]
      })
export class ColourModule{
    
}