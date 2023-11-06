import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoBom } from './co-bom.entity';
import { CoBomAdapter } from './dto/co-bom.adapter';



@Injectable()
export class CoBomService {
    constructor(
        @InjectRepository(CoBom) private coBomRepository: Repository<CoBom>,
        private CoAdapter: CoBomAdapter,

    ) { }


    }
