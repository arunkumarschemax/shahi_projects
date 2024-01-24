import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FabricRequestCodeEntity } from './entities/fabric-request-code-entity';
import { TrimRequestCodeEntity } from './entities/trim-request-code.entity';
import { ItemReqCodeController } from './item-req-code.controller';
import { FabricReqCodeService } from './fabric-request-code.service';
import { TrimReqCodeService } from './trim-req-code.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FabricRequestCodeEntity,TrimRequestCodeEntity]),
  ],
  controllers: [ItemReqCodeController],
  providers: [FabricReqCodeService,ApplicationExceptionHandler,TrimReqCodeService],
  exports: [FabricReqCodeService,TrimReqCodeService]
})
export class RequestCodeModule {}
