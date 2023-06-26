import { Module } from '@nestjs/common';
import { FactoriesService } from './factories.service';

@Module({
  providers: [FactoriesService]
})
export class FactoriesModule {}
