import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ScanEntity } from '../entity/typeo-entity';

@Injectable()
export class TypeoRepo extends Repository<ScanEntity> {}
