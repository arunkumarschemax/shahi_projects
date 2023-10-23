import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CoTypeService } from "./co-type.service";
import { CoTypeResponseModel } from "@project-management-system/shared-models";

@ApiTags('co_types')
@Controller('co_types')
export class CoTypeController {
    constructor(
        private coTypeService: CoTypeService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/getAllCoTypeInfo')
    async getAllCoTypeInfo(): Promise<CoTypeResponseModel> {
        try {
            return await this.coTypeService.getAllCoTypeInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CoTypeResponseModel, error)
        }
    }

}