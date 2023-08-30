import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyersDestionations } from './buyers-destination.entity';
import { Size } from '../sizes/sizes-entity';
import { Destination } from '../destination/destination.entity';
import { Buyers } from '../buyers/buyers.entity';
import { BuyersDestinationController } from './buyers-destination.controller';
import { buyersDestionationMappingRepository } from './buyers-destination.repo';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BuyersSize } from './buyers-sizes.entity';
import { BuyersColor } from './byers-colors.entity';
import { BuyersDestinationService } from './buyers-destination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyersDestionations,Size,Destination,Buyers,BuyersSize,BuyersColor]),
  ],
  controllers: [BuyersDestinationController],
   providers: [ApplicationExceptionHandler,buyersDestionationMappingRepository,BuyersDestinationService]
})
export class BuyersDestinationModule {}