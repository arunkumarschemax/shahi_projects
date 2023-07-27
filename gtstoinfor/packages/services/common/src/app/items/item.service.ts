import { Inject, Injectable } from '@nestjs/common';
import { ItemsRepository } from './dto/item-repository';

@Injectable()

export class ItemsService{
    constructor(
        private itemsRepo:ItemsRepository
    ){}
    
}