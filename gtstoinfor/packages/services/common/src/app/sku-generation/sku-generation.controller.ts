import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ItemSkuService } from "./sku-generation.service";

@ApiTags('itemSkus')
@Controller('itemSkus')
export class ItemSkuController{
    constructor(
        private itemSkuService: ItemSkuService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

}