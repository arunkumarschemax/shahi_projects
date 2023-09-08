import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricWeave } from './fabric-weave.entity';
import { FabricWeaveController } from './fabric-weave.controller';
import { FabricWeaveService } from './fabric-weave.service';
import { FabricWeaveAdapter } from './dto/fabric-weave.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
  TypeOrmModule.forFeature([FabricWeave]),
  ],
  controllers: [FabricWeaveController],
  providers: [FabricWeaveService,FabricWeaveAdapter,ApplicationExceptionHandler]
})
export class FabricWeaveModule {}