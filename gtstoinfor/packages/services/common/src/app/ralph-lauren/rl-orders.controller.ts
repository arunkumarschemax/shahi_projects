// import { Controller } from "@nestjs/common";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { RLOrdersService } from "./rl-orders.service";
import { Body, Controller, Post, Param, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { CommonResponseModel, PoOrderFilter } from "@project-management-system/shared-models";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { OrderDetailsReq } from "./dto/order-details-req";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer'


@Controller("/rl-orders")
export class RLOrdersController {
    constructor(
        private rlOrdersService: RLOrdersService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ) { }

    @Post('/saveOrdersDataFromPDF')
    async saveOrdersDataFromPDF(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.rlOrdersService.saveOrdersDataFromPDF(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPdfFileInfo')
    @ApiBody({ type: PoOrderFilter })
    async getPdfFileInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.rlOrdersService.getPdfFileInfo(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getorderData')
    @ApiBody({ type: PoOrderFilter })
    async getorderData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.rlOrdersService.getorderData(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getorderDataforAcceptance')
    @ApiBody({ type: PoOrderFilter })
    async getorderDataforAcceptance(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.rlOrdersService.getorderDataforAcceptance(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getorderDataByPoNumber')
    @ApiBody({ type: PoOrderFilter })
    async getorderDataByPoNumber(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.rlOrdersService.getorderDataByPoNumber(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/coLineCreationReq')
    async coLineCreationReq(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.coLineCreationReq(req)
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/createCOline')
    async createCOline(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.createCOline(req)
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getCoLine')
    async getCoLine(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getCoLine(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getOrderDetails')
    @ApiBody({ type: OrderDetailsReq })
    async getOrderDetails(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.rlOrdersService.getOrderDetails(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getBuyerPo')
    async getBuyerPo(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getBuyerPo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    
    @Post('/getBuyerPoNumber')
    async getBuyerPoNumber(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getBuyerPoNumber();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getColineItem')
    async getColineItem(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getColineItem();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getColineOrderNo')
    async getColineOrderNo(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getColineOrderNo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
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

    async fileUpload(@UploadedFile() file, @Body() req: any, poNumber: string): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.updatePath(req.jsonData, poNumber, file.path, file.filename, file.mimetype)
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getTradeLinkPdf')
    async getTradeLinkPdf(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getTradeLinkPdf()
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/readPOPdfBot')
    async readPOPdfBot(): Promise<CommonResponseModel> {
        try {
            return this.rlOrdersService.readPOPdfBot();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }


    // @Post('/getTradeLinkButtonBot')
    // async getTradeLinkButtonBot(): Promise<CommonResponseModel> {
    //     try {
    //         return this.rlOrdersService.getTradeLinkButtonBot();
    //     } catch (err) {
    //         return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
    //     }
    // }

    // @Post('/updateDownloadStatus')
    // async updateDownloadStatus(@Body() req: any): Promise<CommonResponseModel> {
    //     try {
    //         return await this.rlOrdersService.updateDownloadStatus(req);
    //     } catch (error) {
    //         return error;
    //     }
    // }

    @Post('/getPoNumber')
    async getPoNumber(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getPoNumber();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getordercomparationData')
    async getordercomparationData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getordercomparationData(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/revertProjectionFileData')
    async revertProjectionFileData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.revertProjectionFileData(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/updateItemNo')
    async updateItemNo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.updateItemNo(req);
        } catch (error) {
            return error;
        }
    }

    @Post('/deleteCoLine')
    async deleteCoLine(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.deleteCoLine(req);
        } catch (error) {
            return error;
        }
    }
}