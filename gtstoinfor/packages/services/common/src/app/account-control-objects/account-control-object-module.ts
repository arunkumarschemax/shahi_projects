import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountControlObjectAdapter } from './dto/account-control-object-adapter';
import { AccountControlObjectController } from './account-control-objects-controller';
import { AccountControlObjectService } from './account-control-object-service';
import { AccountControlObject } from './account-control-objects-entity';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitControlHead } from '../profit-control-head/profit-control-head-entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([AccountControlObject,ProfitControlHead]),
    ],
    controllers: [AccountControlObjectController],
    providers: [AccountControlObjectService,AccountControlObjectAdapter,ApplicationExceptionHandler],
    exports:[AccountControlObjectService]
  })
  export class AccountControlObjectModule {}
  