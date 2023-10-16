import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemCreationAdapter } from './dto/item_creation.adapter';
import { ItemCreationDto } from './dto/item-creation.dto';
import { ItemCreation } from './item_creation.entity';
import { CommonResponseModel } from '@project-management-system/shared-models';


@Injectable()
export class ItemCreationService {
    constructor(
        @InjectRepository(ItemCreation) private itemCreationRepository: Repository<ItemCreation>,
        private itemCreationAdapter: ItemCreationAdapter,
    ) { }

    async createItem(itemCreationDto: ItemCreationDto, isUpdate: boolean): Promise<CommonResponseModel> {
        try {
            console.log(itemCreationDto);
            const convertedItemCreationEntity: ItemCreation = this.itemCreationAdapter.convertDtoToEntity(itemCreationDto, isUpdate);
            const savedItemCreationEntity: ItemCreation = await this.itemCreationRepository.save(convertedItemCreationEntity);
            const savedItemCreationDto: ItemCreationDto = this.itemCreationAdapter.convertEntityToDto(savedItemCreationEntity);
            if (savedItemCreationDto) {
                // generating resposnse
                const response = new CommonResponseModel(true, isUpdate ? 11101 : 11100, isUpdate ? 'Item Updated Successfully' : 'Item Created Successfully', savedItemCreationDto);
                return response;
            } else {
                const response = new CommonResponseModel(false, 10101, 'Something went wrong');
                return response;
            }
        } catch (error) {
            return error;
        }
    }
}


