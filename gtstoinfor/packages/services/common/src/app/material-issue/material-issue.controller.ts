import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { MaterialIssueService } from "./material-issue.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, MaterialIssueRequest, MaterialIssueIdreq, MaterialIssueResponseModel, ResponesNoDropDownRes, RequestNoDto, MaterialReportsResponse } from "@project-management-system/shared-models";
import { MaterialIssueDto } from "./dto/material-issue-dto";
import { MaterialIssueLogDto } from "./dto/material-issue-log-dto";

@ApiTags('material-issue')
@Controller('/material-issue')
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

    @Post("getAllMaterialIssues")
    async getAllMaterialIssues() {
        try {
            return this.issueService.getAllMaterialIssues();
        } catch (err) {
            return err;
        }
    }

    @Post("/getMaterialIssueDetailsById")
    @ApiBody({ type: MaterialIssueIdreq })
    async getMaterialIssueDetailsById(@Body() req: any) {
        try {
            return await this.issueService.getMaterialIssueDetailsById(req);
        } catch (err) {
            return err;
        }
    }

    @Post("/getAllFabricDetails")
    @ApiBody({ type: MaterialIssueIdreq })
    async getAllFabricDetails(@Body() req: any) {
        try {
            return this.issueService.getAllFabricDetails(req);
        } catch (error) {
            return error;
        }
    }

    @Post("/getAllTrimDetails")
    @ApiBody({ type: MaterialIssueIdreq })
    async getAllTrimDetails(@Body() req: any) {
        try {
            return this.issueService.getAllTrimDetails(req);
        } catch (error) {
            return error;
        }
    }

    @Post('/getDataByStyleId')
    @ApiBody({ type: MaterialIssueRequest })
    async getDataByStyleId(@Body() req: any): Promise<MaterialIssueResponseModel> {
        try {
            return await this.issueService.getDataByStyleId(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(MaterialIssueResponseModel, err);
        }
    }
    @Post('/getAllMaterial')
    @ApiBody({ type: MaterialIssueRequest })
    async getMaterialIssue(@Body() req: any): Promise<MaterialReportsResponse> {
        try {
            return await this.issueService.getMaterialIssue(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(MaterialReportsResponse, err);
        }
    };



    @Post('/getRequestNoDrop')
    @ApiBody({ type: RequestNoDto })
    async getMaterialIssues(@Body() req:RequestNoDto): Promise<ResponesNoDropDownRes> {
        try {
            return await this.issueService.getMaterialIssues(req)
        } catch (error) {
            return this.applicationExceptionHandler.returnException(ResponesNoDropDownRes, error);
        }
    }

    @Post('/createMaterialIssueLog')
    @ApiBody({ type: MaterialIssueLogDto })
    async createMaterialIssueLog(@Body() req: any): Promise<CommonResponseModel> {
        console.log(req,"contt")
        try {
            return await this.issueService.createMaterialIssueLog(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

}