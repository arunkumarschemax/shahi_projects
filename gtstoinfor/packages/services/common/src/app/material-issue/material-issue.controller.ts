import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { MaterialIssueService } from "./material-issue.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, MaterialIssueRequest, MaterialIssueIdreq, MaterialIssueResponseModel } from "@project-management-system/shared-models";
import { MaterialIssueDto } from "./dto/material-issue-dto";

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
    async getAllFabricDetails(@Body() req:any) {
        try{
            return this.issueService.getAllFabricDetails(req);
        } catch(error) {
            return error;
        }
    }

    @Post("/getAllTrimDetails")
    @ApiBody({ type: MaterialIssueIdreq })
    async getAllTrimDetails(@Body() req:any) {
        try{
            return this.issueService.getAllTrimDetails(req);
        } catch(error) {
            return error;
        }
    }

    @Post('/getDataByStyleId')
    @ApiBody({type: MaterialIssueRequest})
    async getDataByStyleId(@Body() req: any):Promise<MaterialIssueResponseModel>{
        try{
            console.log(req,'-------')
            return await this.issueService.getDataByStyleId(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(MaterialIssueResponseModel, err);
        }
    }
    @Post('/getAllMaterial')
    @ApiBody({type: MaterialIssueRequest})
    async getMaterialIssue(@Body() req: any):Promise<MaterialIssueResponseModel>{
        try{
            return await this.issueService.getMaterialIssue()
        }catch(err){
            return this.applicationExceptionHandler.returnException(MaterialIssueResponseModel, err);
        }
    }
}