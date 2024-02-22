
import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import { LevisService } from "./levis.service";
import { CommonResponseModel, LevisOrderFilter } from "@project-management-system/shared-models";
import { LevisDto } from "./dto/levis-orders.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";




@ApiTags("/levis")
@Controller("/levis")
export class LevisController {

    constructor(
        private readonly Service: LevisService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }

    @Post("/saveLevisOrder")
    @ApiBody({ type: LevisDto })
    async saveLevisOrder(@Body() req: any): Promise<CommonResponseModel> {
        console.log(req, "post")
        try {
            return await this.Service.saveLevisOrder(req);
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
            if (!file.originalname.match(/\.(pdf)$/i)) {
                return callback(new Error('Only PDF files are allowed!'), false);
            }
            callback(null, true);
        },
    }))
    

    async fileUpload(@UploadedFile() file, @Body() req:any): Promise<CommonResponseModel> {

        try {
            return await this.Service.updatePath(req.jsonData,req.poNumber, file.path, file.filename, file.mimetype)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
        }
    }



    @Post('/getorderacceptanceData')
    @ApiBody({ type: LevisOrderFilter })
    async getorderacceptanceData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderacceptanceData(req);
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



    @Post('/coLineCreationReq')
    async coLineCreationReq(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.coLineCreationReq(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getCoLineData')
    async getCoLineData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.getCoLineData(req);
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

    @Post('/getorderDataForInfo')
    @ApiBody({ type: LevisOrderFilter })
    async getorderDataForInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderDataForInfo(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/updateStatusInOrder')
    async updateStatusInOrder(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.updateStatusInOrder(req);
        } catch (error) {
            return error
        }
    }

    @Post('/getPdfFileInfo')
    async getPdfFileInfo(): Promise<CommonResponseModel> {
        try {
            return this.Service.getPdfFileInfo();
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

    @Post('/getordercomparationData')
    async getordercomparationData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.getordercomparationData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
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
   
    @Post('/createCOline')
    async createCOline(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.createCOline(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }
   
   

 
}