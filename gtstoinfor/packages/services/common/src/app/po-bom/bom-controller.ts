import { Body, Controller, Post, UploadedFile, UseInterceptors, } from "@nestjs/common";
import { ApiBody, ApiTags, ApiConsumes } from "@nestjs/swagger";
import { BomService } from "./bom-service";
import { BomExcelreq, CommonResponseModel, PpmDateFilterRequest } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleDto } from "./dto/style-dto";
import { TrimService } from "./trim-service";
import { StyleNumberDto } from "./dto/style-number-dto";
import { StyleIdReq } from "./dto/api-requests";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@ApiTags('bom')
@Controller('bom')
export class BomController {
    constructor(
        private readonly bomService: BomService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
        private readonly trimService: TrimService

    ) { }

    @Post('/createBom')
    async createBom(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.createBom(req)
        }
        catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }
    @Post('/getAllStylesData')
    async getAllStylesData(): Promise<CommonResponseModel> {
        try {
            return this.bomService.getAllStylesData()
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }
    @Post('/getAll')
    async getAll(): Promise<CommonResponseModel> {
        try {
            return this.bomService.getAll()
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getPpmPoLineData')
    async getPpmPoLineData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.getPpmPoLineData(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getAllTrimInfo')
    async getAllTrimInfo(): Promise<CommonResponseModel> {
        try {
            return this.trimService.getAllTrimInfo()
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @ApiBody({ type: StyleNumberDto })
    @Post('/getBomInfoAgainstStyle')
    async getBomInfoAgainstStyle(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.trimService.getBomInfoAgainstStyle(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getItemInfo')
    async getItemInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.trimService.getItemInfo(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getItemDropdownByCreatedAt')
    async getItemDropdownByCreatedAt(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.trimService.getItemDropdownByCreatedAt(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getRegionDropdownByCreatedAt')
    async getRegionDropdownByCreatedAt(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.trimService.getRegionDropdownByCreatedAt(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }


    @Post('/getStylesData')
    async getStylesData(): Promise<CommonResponseModel> {
        try {
            return this.bomService.getStylesData()
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }
    @Post('/getPoLineDataForCihinaInserttag')
    async getPoLineDataForCihinaInserttag(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.getPoLineDataForCihinaInserttag(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getBomPrintInfo')
    async getBomPrintInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.trimService.getBomPrintInfo(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @ApiBody({ type: StyleIdReq })
    @Post('/getBomDataForStyle')
    async getBomDataForStyle(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.getBomDataForStyle(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getBomCreationData')
    async getBomCreationData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.getBomCreationData(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/generateBom')
    async generateBom(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.generateBom(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/saveExcelData')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: { files: 1 },
            storage: diskStorage({
                destination: './upload-files',
                filename: (req, filea, callback) => {
                    const name = filea.originalname;
                    callback(null, `${name}`);
                },
            }),
        })
    )
    @ApiConsumes('multipart/form-data')
    async saveExcelData(@UploadedFile() file): Promise<any> {
        try {
            return this.bomService.saveExcelData(file);
        } catch (err) {
            console.log(err);
        }
    }

    @Post('/migrateData')
    async migrateData(): Promise<any> {
        try {
            return this.bomService.migrateData()
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getbomexcel')
    async getBomExcel(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.getBomExcel(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }


    @Post('/generateProposal')
    async generateProposal(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.generateProposal(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/generateProposalForButton')
    async generateProposalForButton(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.generateProposalForButton(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }

    @Post('/getbom')
    @ApiBody({ type: BomExcelreq })
    async getBom(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.getBom(req)
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }


    @Post('/getStyle')
    async getStyle(): Promise<CommonResponseModel> {
        try {
            return this.bomService.getStyle()
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }    

    @Post('/getGeoCode')
    async getGeoCode(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.bomService.getGeoCode()
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err)
        }
    }   
}