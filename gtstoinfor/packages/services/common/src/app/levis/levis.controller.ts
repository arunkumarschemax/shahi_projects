
import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import { LevisService } from "./levis.service";
import { CommonResponseModel, LevisOrderFilter } from "@project-management-system/shared-models";
import { LevisDto } from "./dto/levis-orders.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";
import { extname, join } from "path";
import * as fs from 'fs';




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

    // @Post('/fileUpload')
    // @ApiConsumes('multipart/form-data')
    // @UseInterceptors(FileInterceptor('file', {
    //     limits: { files: 1 },
    //     storage: diskStorage({
    //         destination: './upload-files',
    //         filename: (req, file, callback) => {
    //             console.log(file.originalname);
    //             const name = file.originalname;
    //             callback(null, `${name}`);
    //         },
    //     }),
    //     fileFilter: (req, file, callback) => {
    //         if (!file.originalname.match(/\.(pdf)$/i)) {
    //             return callback(new Error('Only PDF files are allowed!'), false);
    //         }
    //         callback(null, true);
    //     },
    // }))
    

    // async fileUpload(@UploadedFile() file, @Body() req:any): Promise<CommonResponseModel> {

    //     try {
    //         return await this.Service.updatePath(req.jsonData,req.poNumber, file.path, file.filename, file.mimetype)
    //     } catch (error) {
    //         return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
    //     }
    // }

    @Post('/fileUpload')
    @UseInterceptors(FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: (req, file, callback) => {
          // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
          // console.log(req.body);
  
          // console.log(file);
          const destinationPath = join(__dirname, '../../../../',`upload_files`)
          // console.log(destinationPath)
          // const destinationPath = `upload_files/SD-${(req.body.reqNo).replace(/\//g, "_")}`;
          // const destinationPath = `https://edoc7.shahi.co.in/upload_files/PO-${req.body.poNumber}`;
  
          // const destinationPath = `${config.download_path}+/PO-${req.body.poNumber}`;
  
          try {
            // Attempt to create the directory if it doesn't exist
            fs.mkdirSync(destinationPath, { recursive: true });
            callback(null, destinationPath);
          } catch (error) {
            // console.error('Error creating directory:', error);
            callback(error, null);
          }
        },
        // destination: (req, file, callback) => {
        //   callback(null, `./upload-files/PO-${req.body.customerPo}`);
        // },
        filename: (req, file, callback) => {
          // console.log(req);
          // console.log(file);
          // console.log("************************************************************************************************");
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(xlsx|xls|pdf|jpg|png|jpeg|doc|PDF)$/)) {
          return callback(new Error('Only xlsx,xls,pdf, jpg, png, doc, jpeg files are allowed!'), false);
        }
        callback(null, true);
      },
    }))
    async updateStylePath(@UploadedFiles() file: File[], @Body() req: any): Promise<CommonResponseModel> {
      // console.log(file, '-------file')
      try {
  
        return await this.Service.updatePath(file, req.jsonData,req.poNumber)
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
    async getPdfFileInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.getPdfFileInfo(req);
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

    @Post('/levisBot')
    async levisBot(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.levisBot();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getOrderReportData')
    @ApiBody({ type: LevisOrderFilter })
    async getOrderReportData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getOrderReportData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/editCOline')
    async editCOline(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.editCOline(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }
   
    @Post('/editCoLineCreationReq')
    async editCoLineCreationReq(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.editCoLineCreationReq(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }


    @Post('/getEditCoLineData')
    async getEditCoLineData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.getEditCoLineData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getEditItem')
    async getEditItem(): Promise<CommonResponseModel> {
        try {
            return this.Service.getEditItem();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getEditCoPoNumber')
    async getEditCoPoNumber(): Promise<CommonResponseModel> {
        try {
            return this.Service.getEditCoPoNumber();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }


    @Post('/getHistoryPoNumber')
    async getHistoryPoNumber(): Promise<CommonResponseModel> {
        try {
            return this.Service.getHistoryPoNumber();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }
 
    @Post('/deleteEditCoLine')
    async deleteEditCoLine(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.deleteEditCoLine(req);
        } catch (error) {
            return error;
        }
    }

    @Post('/updateStatusInOrderAcceptance')
    async updateStatusInOrderAcceptance(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.updateStatusInOrderAcceptance(req);
        } catch (error) {
            return error
        }
    }

    @Post('/getSplitOrderComparisionData')
    async getSplitOrderComparisionData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.getSplitOrderComparisionData(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }

}