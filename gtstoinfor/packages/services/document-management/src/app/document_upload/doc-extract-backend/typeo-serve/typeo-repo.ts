import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeoEntity } from '../entity/typeo-entity';

@Injectable()
export class TypeoRepo extends Repository<TypeoEntity> {}
