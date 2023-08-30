import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BomService } from "./bom.service";
import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";



@ApiTags('bom')
@Controller('bom')
export class BomController {
    constructor(
        private bomService: BomService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
  
      ){}
}