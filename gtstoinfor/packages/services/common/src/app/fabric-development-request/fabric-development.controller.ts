import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
// import { FabricDevelopmentService } from "@project-management-system/shared-services";
import { FabricRequestQualitiesDto } from "./dto/fabric-request-qualities.dto";
import { FabricDevelopmentRequestResponse } from "@project-management-system/shared-models";
import { FabricDevelopmentService } from "./fabric-development.services";
import { FabricRequestDto } from "./dto/fabric-request.dto";
 

@ApiTags('FabricDevelopment')
@Controller('FabricDevelopment')
export class FabricDevelopmentController {
    constructor(
      private readonly fabricDevelopmentService: FabricDevelopmentService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

     @ApiBody({type:FabricRequestDto})   
    @Post('/createFabricDevelopmentRequest')
    async createFabricDevelopmentRequest(@Body() req:any): Promise<FabricDevelopmentRequestResponse> {
        console.log(req)
        try {
            return await this.fabricDevelopmentService.createFabricDevelopmentRequest(req, false)
        } catch (error) {
            return (this.applicationExceptionHandler.returnException(FabricDevelopmentRequestResponse, error));
        }
    }

    }