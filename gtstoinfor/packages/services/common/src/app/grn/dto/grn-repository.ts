import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GrnEntity } from '../entities/grn-entity';

@Injectable()
export class GrnRepository extends Repository<GrnEntity> {

    constructor(@InjectRepository(GrnEntity) private grn: Repository<GrnEntity>
    ) {
        super(grn.target, grn.manager, grn.queryRunner);
    }

   
}