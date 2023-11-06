import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { MaterialIssueService } from "./material-issue.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, MaterialIssueResponseModel } from "@project-management-system/shared-models";
import { MaterialIssueDto } from "./dto/material-issue-dto";
import { MaterialIssueRequest } from "./dto/material-report-req";

@ApiTags('material-issue')
@Controller('material-issue')
export class MaterialIssueController {
  constructor(
    private issueService: MaterialIssueService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler
  ) { }

  @Post('/createMaterialIssue')
  @ApiBody({ type: MaterialIssueDto })
  async createMaterialIssue(@Body() req: any): Promise<MaterialIssueResponseModel> {
    try {
      return await this.issueService.createMaterialIssue(req)
    } catch (err) {
      return this.applicationExceptionHandler.returnException(MaterialIssueResponseModel, err);
    }
  }

  @Post('/getAllMaterial')
  // @ApiBody({type: OperationInventoryDto})
  async getMaterialIssue(): Promise<CommonResponseModel> {
    try {
      return await this.issueService.getMaterialIssue()
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getAllMaterialFabric')
  // @ApiBody({type: OperationInventoryDto})
  async getAllActiveFabrics(): Promise<CommonResponseModel> {
    try {
      return await this.issueService.getAllActiveFabrics()
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getAllMaterialTrim')
  // @ApiBody({type: OperationInventoryDto})
  async getMaterialTrim(): Promise<CommonResponseModel> {
    try {
      return await this.issueService.getMaterialTrim()
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
}