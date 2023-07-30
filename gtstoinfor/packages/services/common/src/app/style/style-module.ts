import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Style } from './dto/style-entity';
import { StyleRepository } from './dto/style-repo';
import { StyleService } from './style-service';
import { StyleController } from './style-controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Style
        ]),
      ],
      providers: [ApplicationExceptionHandler,StyleRepository,StyleService],
      controllers: [StyleController],
      exports: []
})
export class StyleModule { }