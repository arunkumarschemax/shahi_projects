import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { trimEntity } from './trim-entity';
import { TrimController } from './trim-controller';
import { trimService } from './trim-services';
import { TrimAdapter } from './dto/trim-adapter';


@Module({
  imports: [
    TypeOrmModule.forFeature([trimEntity]),
  ],
  controllers: [TrimController],
  providers: [trimService,TrimAdapter,ApplicationExceptionHandler]
})
export class trimModule {}
