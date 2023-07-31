import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Style } from './style-entity';

@Injectable()
export class StyleRepository extends Repository<Style> {

    constructor(@InjectRepository(Style) private style: Repository<Style>
    ) {
        super(style.target, style.manager, style.queryRunner);
    }

   
   
}