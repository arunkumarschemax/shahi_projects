import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PriceEntity } from '../entity/price-entity';

@Injectable()
@EntityRepository(PriceEntity)
export class ScanRepo extends Repository<PriceEntity> {}
