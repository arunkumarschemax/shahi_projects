import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MaterialIssueService } from "./material-issue.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, OperationSequenceResponse } from "@project-management-system/shared-models";

@ApiTags('material-issue')
@Controller('material-issue')
export class MaterialIssueController{
    constructor(
        private Service: MaterialIssueService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
}