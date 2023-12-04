import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { QualitysService } from "./qualitys.service";
import { ColumnResponseModel, CommonResponseModel, qualitysResponseModel } from "@project-management-system/shared-models";
import { QualitysDTO } from "./qualitys.dto";

@ApiTags('qualitys')
@Controller('qualitys')
export class qualitysController {
    constructor(
        private columnService: QualitysService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createqualitys')
    async createqualitys(@Body() QualityDTO:QualitysDTO,isUpdate:boolean=false): Promise<qualitysResponseModel> {
        try {
            return await this.columnService.createQualitys(QualityDTO,false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(qualitysResponseModel, error)
        }
    }

    @Post('/updatequalitys')  
    @ApiBody({type:QualitysDTO})
    async updatequalitys(@Body() req:any): Promise<qualitysResponseModel> {
        try {
            return await this.columnService.createQualitys(req,true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(qualitysResponseModel, error)
        }
    }

    @Post('/getAllQualitys')
    async getAllQualitys(): Promise<qualitysResponseModel> {
        try {
            return await this.columnService.getAllQualitys();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(qualitysResponseModel, error)
        }
    }

    @Post('/activateOrDeactivateQualitys')
    async activateOrDeactivateQualitys(@Body() req:any): Promise<qualitysResponseModel> {
        try {
            return await this.columnService.activateOrDeactivateQualitys(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(qualitysResponseModel, error)
        }
    }

    // @Post('/getQualitysById')
    // async getQualitysById(@Body() qualityId: number): Promise<qualitysResponseModel> {
    //     try {
    //         return await this.columnService.getQualitysById(qualityId);
    //     } catch (error) {
    //         return this.applicationExceptionhandler.returnException(qualitysResponseModel, error)
    //     }
    // }

}