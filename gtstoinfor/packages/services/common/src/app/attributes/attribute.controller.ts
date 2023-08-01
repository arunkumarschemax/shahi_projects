import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AttributeService } from './attribute.service';



@Controller('attributes')
@ApiTags('attributes')
export class AttributeController {
    constructor(
        private AttributeService: AttributeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}

      /**
     * creates  a Item SubCategory
     * @param ItemSubCategory Item SubCategory DTO
     * @returns Item SubCategoryResponse
     */
       



}
