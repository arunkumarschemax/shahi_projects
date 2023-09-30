import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { FabricDevelopmentService } from "@project-management-system/shared-services";
 

@ApiTags('FabricDevelopment')
@Controller('FabricDevelopment')
export class FabricDevelopmentController {
    constructor(
      private readonly service: FabricDevelopmentService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    }