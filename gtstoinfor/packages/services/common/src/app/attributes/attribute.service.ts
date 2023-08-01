import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemSubCategoryResponse, AllItemSubCategoryResponse, ItemSubCategoriesDropDownResponse, ItemSubCategoryDropDownDto } from '@project-management-system/shared-models';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { Attributes } from './attributes.entity';
import { AttributeAdapter } from './dto/attribute.adapter';

@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attributes) private AttributeRepository: Repository<Attributes>,
        private itemSubcategoryAdapter: AttributeAdapter,
    ) { }

}
