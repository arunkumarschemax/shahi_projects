import { Module } from '@nestjs/common';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricContentService } from './fabric-content.service';
import { FabricContentRepository } from './fabric-repo/fabric-content.repository';
import { FabricContentAdapter } from './adapters/fabric-content.adapter';
import { FabricContent } from './fabric-content.entity';
import { FabricContentController } from './fabric-content-controller';

@Module({
  providers: [FabricContentService, ApplicationExceptionHandler,FabricContentRepository,FabricContentAdapter],
  imports: [
    TypeOrmModule.forFeature([
        FabricContent
  ])],
  controllers: [FabricContentController],
  exports:[FabricContentService]
})
export class FabricContentModule { }
