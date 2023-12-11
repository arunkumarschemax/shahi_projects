import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScanService } from './typeo-service';
import { ScanEntity } from '../entity/typeo-entity';
import { ScanController } from './typeo-controller';
import { ScanAdapter } from '../adapters/scan-adapters';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApplicationExceptionHandler } from 'packages/libs/backend-utils/src/exception-handling/application-exception-handler';
import { HSNEntity } from '../entity/hsn-entity';
import { EmailAttachments } from '../entity/mails-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScanEntity,HSNEntity,EmailAttachments])],
  controllers: [ScanController],
  providers: [ScanService,ScanAdapter,ApplicationExceptionHandler],
  exports:[TypeOrmModule,ScanService]
})
export class TypeoModule {}
