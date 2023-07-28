import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Item } from '../item-entity';

@Injectable()
export class ItemsRepository extends Repository<Item> {

    constructor(@InjectRepository(Item) private item: Repository<Item>
    ) {
        super(item.target, item.manager, item.queryRunner);
    }
   
}