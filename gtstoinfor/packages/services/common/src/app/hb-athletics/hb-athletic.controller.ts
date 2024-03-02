
import { Controller, Post, Body, UseInterceptors,UploadedFiles, UploadedFile, Get } from "@nestjs/common";
import { FilesInterceptor} from "@nestjs/platform-express";
import { ApiTags, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { HbDto } from "./dto/hb.dto";
import { CommonResponseModel, HbPoOrderFilter } from "@project-management-system/shared-models";
import { HbService } from "./hb-athletic.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";
import { extname, join } from "path";
import * as fs from 'fs';



@ApiTags("/hb-athletics")
@Controller("/hb-athletics-orders")
export class HbController {

    constructor(
        private readonly Service: HbService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }
    @Post("/saveHbOrdersData")
    @ApiBody({ type: HbDto })
    async saveHbOrdersData(@Body() req: any): Promise<CommonResponseModel> {
        console.log(req, "post")
        try {
            return await this.Service.saveHbOrdersData(req);
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
        // const destinationPath = upload_files/SD-${(req.body.reqNo).replace(/\//g, "_")};
        // const destinationPath = https://edoc7.shahi.co.in/upload_files/PO-${req.body.poNumber};

        // const destinationPath = ${config.download_path}+/PO-${req.body.poNumber};

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
      //   callback(null, ./upload-files/PO-${req.body.customerPo});
      // },
      filename: (req, file, callback) => {
        // console.log(req);
        // console.log(file);
        // console.log("********************************");
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
    
          return await this.Service.updatePath(file, req.jsonData,req.custPo)
        } catch (error) {
          return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
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
    //     fileFilter: async (req, file, callback) => {
    //         try {
    //             if (!file || file.mimetype !== 'application/pdf') {
    //                 return callback(new Error('Only PDF files are allowed!'), false);
    //             }
    //             callback(null, true);
    //         } catch (error) {
    //             callback(error, false);
    //         }
    //     },
    // }))

    // async fileUpload(@UploadedFile() file, @Body() req: any): Promise<CommonResponseModel> {
    //     try {
    //         return await this.Service.updatePath(req.jsonData, req.custPo, file.path, file.filename, file.mimetype)
    //     } catch (error) {
    //         return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
    //     }
    // }

    @Post('/getPdfFileInfo')
    async getPdfFileInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.getPdfFileInfo(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getHborderData')
    @ApiBody({ type: HbPoOrderFilter })
    async getHborderData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getHborderData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getHbPoNumber')
    async getHbPoNumber(): Promise<CommonResponseModel> {
        try {
            return this.Service.getHbPoNumber();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/hbCoLineCreationReq')
    async hbCoLineCreationReq(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.hbCoLineCreationReq(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
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

    @Post('/createCOline')
    async createCOline(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.createCOline(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    //     @Post('/getHborderData')
    // @ApiBody({ type: HbPoOrderFilter })
    // async getHborderData (@Body() req: any): Promise<CommonResponseModel> {
    // try {
    // // console.log(req, "con")
    // return await this.Service.getHborderData (req);
    // } catch (err) {
    // }
    // return this.applicationExeptionhandler.returnException (CommonResponseModel, err);
    // }

    @Post('/hbAthleticBot')
    async hbAthleticBot(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.hbAthleticBot();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getHborderDataForInfo')
    @ApiBody({ type: HbPoOrderFilter })
    async getHborderDataForInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getHborderDataForInfo(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }


    @Post('/getHbCoLineData')
    async getHbCoLineData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.getHbCoLineData(req);
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

    @Post('/getordercomparationData')
    @ApiBody({ type: HbPoOrderFilter })
    async getordercomparationData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.getordercomparationData(req);
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

    @Post('/updateStatusInOrder')
    async updateStatusInOrder(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.updateStatusInOrder(req);
        } catch (error) {
            return error
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