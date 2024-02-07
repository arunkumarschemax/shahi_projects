import { Body, Controller, Post, Get, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CentricDto } from "./dto/centric.dto";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/exception-handling/application-exception-handler";
import { CommonResponseModel } from "packages/libs/shared-models/src/common/global-response-object";
import { CentricService } from "./centric.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer'
import { PoOrderFilter, centricOrderHistory } from "@project-management-system/shared-models";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";


@ApiTags("/centric")
@Controller("/centric-orders")
export class CentricController {
    constructor(
        private readonly Service: CentricService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }

    @Post("/saveCentricOrder")
    @ApiBody({ type: CentricDto })
    async saveCentricOrder(@Body() req: any): Promise<CommonResponseModel> {
        console.log(req, "post")
        try {
            return await this.Service.saveCentricOrder(req);
        } catch (error) {
            return this.applicationExeptionhandler.returnException(
                CommonResponseModel,
                error
            );
        }
    }

    @Post('/fileUpload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        limits: { files: 1 },
        storage: diskStorage({
            destination: './upload-files',
            filename: (req, file, callback) => {
                console.log(file.originalname);
                const name = file.originalname;
                callback(null, `${name}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(pdf)$/)) {
                return callback(new Error('Only pdf files are allowed!'), false);
            }
            callback(null, true);
        },
    }))

    async fileUpload(@UploadedFile() file, @Body() req: any): Promise<CommonResponseModel> {

        try {
            return await this.Service.updatePath(req.jsonData, req.poNumber, file.path, file.filename, file.mimetype)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getorderData')
    @ApiBody({ type: PoOrderFilter })
    async getorderData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }



    @Post('/getPdfFileInfo')
    @ApiBody({ type: centricOrderHistory })
    async getPdfFileInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.getPdfFileInfo(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPoNumber')
    async getPoNumber(): Promise<CommonResponseModel> {
        try {
            return this.Service.getPoNumber();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPoLineNumbers')
    @ApiBody({ type: PoOrderFilter })
    async getPoLineNumbers(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.getPoLineNumbers(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/coLineCreationReq')
    async coLineCreationReq(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.coLineCreationReq(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/createCOline')
    async createCOline(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.createCOline(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getCentricCoLine')
    async getCentricCoLine(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.getCentricCoLine(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getCentricorderData')
    @ApiBody({ type: PoOrderFilter })
    async getCentricorderData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getCentricorderData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    // @Get('centric-Bot')
    // async centricBot(): Promise<any> {
    //     return this.Service.centricBot();

    // }

    @Post('/centricBot')
    async centricBot(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.centricBot();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }


    @Post('/getItem')
    async getItem(): Promise<CommonResponseModel> {
        try {
            return this.Service.getItem();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getCoPoNumber')
    async getCoPoNumber(): Promise<CommonResponseModel> {
        try {
            return this.Service.getCoPoNumber();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getOrderdataForCOline')
    @ApiBody({ type: OrderDetailsReq })
    async getOrderdataForCOline(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.getOrderdataForCOline(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }


    @Post('/getseasonData')
    async getseasonData(): Promise<CommonResponseModel> {
        try {
            return this.Service.getseasonData();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }


    @Post('/getCentricorderDataForPPK')
    @ApiBody({ type: PoOrderFilter })
    async getCentricorderDataForPPK(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getCentricorderDataForPPK(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getCentricorderDataForSolidPO')
    @ApiBody({ type: PoOrderFilter })
    async getCentricorderDataForSolidPO(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getCentricorderDataForSolidPO(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    /**
     * this API is consumed by the external App SCAN-AND-PACK
     * @param req 
     * @returns 
     */
    @Post('/getCentricorderDataForScanAndPack')
    @ApiBody({ type: PoOrderFilter })
    async getCentricorderDataForScanAndPack(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.getCentricorderDataForScanAndPack(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPoNumberforPPKReport')
    async getPoNumberforPPKReport(): Promise<CommonResponseModel> {
        try {
            return this.Service.getPoNumberforPPKReport();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }


    @Post('/getPoNumberforSolidReport')
    async getPoNumberforSolidReport(): Promise<CommonResponseModel> {
        try {
            return this.Service.getPoNumberforSolidReport();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getordercomparationData')
    async getordercomparationData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.getordercomparationData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }


    @Post('/updateItemNo')
    async updateItemNo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.updateItemNo(req);
        } catch (error) {
            return error;
        }
    }

    @Post('/deleteCoLine')
    async deleteCoLine(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.deleteCoLine(req);
        } catch (error) {
            return error;
        }
    }

    @Post('/updateCOLineStatus')
    async updateCOLineStatus(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.updateCOLineStatus(req);
        } catch (error) {
            return error
        }
    }


}