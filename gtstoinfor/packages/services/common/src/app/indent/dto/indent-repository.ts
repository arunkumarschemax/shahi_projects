import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Indent } from '../indent-entity';

@Injectable()
export class IndentRepository extends Repository<Indent> {

    constructor(@InjectRepository(Indent) private indent: Repository<Indent>
    ) {
        super(indent.target, indent.manager, indent.queryRunner);
    }

   
}