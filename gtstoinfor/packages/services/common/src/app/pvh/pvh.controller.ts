
import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import * as fs from 'fs';
import { PVHService } from "./pvh.service";
import { CommonResponseModel, PvhOrderFilter } from "@project-management-system/shared-models";
import { extname, join } from "path";
import { FilesInterceptor } from "@nestjs/platform-express";



@ApiTags("/pvh")
@Controller("/pvh")
export class PVHController {

    constructor(
        private readonly Service: PVHService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }

    @Post("/savePvhOrder")
    @ApiBody({})
    async savePvhOrder(@Body() req: any): Promise<CommonResponseModel> {
        console.log(req, "post")
        try {
            return await this.Service.savePvhOrder(req);
        } catch (error) {
            return this.applicationExeptionhandler.returnException(
                CommonResponseModel,
                error
            );
        }
    }

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
        if (!file.originalname.match(/\.(xlsx|xls|pdf|jpg|png|jpeg|doc|PDF|xml|XML)$/)) {
          return callback(new Error('Only xlsx,xls,pdf, jpg, png, doc,xml,XML jpeg files are allowed!'), false);
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
  

    @Post('/getorderDataForInfo')
    @ApiBody({ type: PvhOrderFilter })
    async getorderDataForInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderDataForInfo(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/pvhBot')
    async pvhBot(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.pvhBot();
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

    
    @Post('/getorderacceptanceData')
    @ApiBody({ type: PvhOrderFilter })
    async getorderacceptanceData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderacceptanceData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }





}