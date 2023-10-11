import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllAttributesResponse, AttributeResponse } from '@project-management-system/shared-models';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { ItemCreation } from './item_creation.entity';
import { ItemCreationAdapter } from './dto/item_creation.adapter';


@Injectable()
export class ItemCreationService {
    constructor(
        @InjectRepository(ItemCreation) private itemCreationRepository: Repository<ItemCreation>,
        private itemCreationAdapter: ItemCreationAdapter,
    ) { }

}


