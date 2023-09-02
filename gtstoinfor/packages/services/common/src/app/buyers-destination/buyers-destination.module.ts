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
import { BuyerRepository } from '../buyers/buyers.repository';
import { buyersSizesMappingRepository } from './buyer-size-repo';
import { buyerColorsMappingRepository } from './buyer-colors-repo';
import { Colour } from '../colours/colour.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyersDestionations,Size,Destination,Buyers,BuyersSize,BuyersColor,Colour]),
  ],
  controllers: [BuyersDestinationController],
   providers: [ApplicationExceptionHandler,buyersDestionationMappingRepository,BuyersDestinationService,BuyerRepository,buyersSizesMappingRepository,buyerColorsMappingRepository]
})
export class BuyersDestinationModule {}