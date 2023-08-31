import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UomEntity } from '../uom-entity';

@Injectable()
export class UomRepository extends Repository<UomEntity> {

    constructor(@InjectRepository(UomEntity) private uomRepo: Repository<UomEntity>
    ) {
        super(uomRepo.target, uomRepo.manager, uomRepo.queryRunner);
    }
    
}