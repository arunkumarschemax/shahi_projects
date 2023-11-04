import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { MaterialIssueService } from "./material-issue.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, MaterialIssueResponseModel } from "@project-management-system/shared-models";
import { MaterialIssueDto } from "./dto/material-issue-dto";

@ApiTags('material-issue')
@Controller('material-issue')
export class MaterialIssueController{
    constructor(
        private issueService: MaterialIssueService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}

    @Post('/createMaterialIssue')
    @ApiBody({type: MaterialIssueDto})
    async createMaterialIssue(@Body() req:any):Promise<MaterialIssueResponseModel>{
        try{
            return await this.issueService.createMaterialIssue(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(MaterialIssueResponseModel, err);
        }
    }
}