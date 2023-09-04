import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ScanEntity } from '../entity/typeo-entity';

@Injectable()
@EntityRepository(ScanEntity)
export class ScanRepo extends Repository<ScanEntity> {}
