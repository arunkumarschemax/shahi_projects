import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CoBomService } from './co-bom-service';


@Controller('co_bom')
@ApiTags('co_bom')
export class CoBomController{
    constructor(
        private cobom: CoBomService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}
}