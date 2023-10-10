import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ItemCreationService } from './item_creation.service';

@Controller('fg-item')
@ApiTags('fg-item')
export class ItemCreationController {
    constructor(
        private itemCreationService: ItemCreationService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}

   
}
