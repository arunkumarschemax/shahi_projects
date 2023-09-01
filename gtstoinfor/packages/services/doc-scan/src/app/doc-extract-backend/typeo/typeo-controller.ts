import { Body, Controller, Post,UseInterceptors } from "@nestjs/common";
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import { ApiTags } from "@nestjs/swagger";
import { ScanService } from "./typeo-service";
import * as fs from 'fs';
import {extname} from 'path';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApplicationExceptionHandler } from "../../../../../../libs/backend-utils/src/exception-handling/application-exception-handler";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {ScanResponseModel} from "../../../../../../libs/shared-models/src/shared-model/scan-response-object";
// import { ScanDto } from "../dtos/typeo.dto";

@ApiTags("docs")
@Controller("docs")
export class ScanController {
  constructor(
    private readonly Service: ScanService,
    private readonly applicationExeptionhandler: ApplicationExceptionHandler

  ) { }

  // @Post("postdata")
  // async postdata(@Body() scanDto: ScanDto): Promise<any> {
  //     return await this.Service.postdata(scanDto);
  //   }

  @Post("postdata")
  async postdata(@Body() ScanDto: any): Promise<ScanResponseModel> {
    try {
      return await this.Service.postdata(ScanDto);
    } catch (error) {
      return this.applicationExeptionhandler.returnException(
        ScanResponseModel,
        error
      );
    }
  }

  @Post('/DocumentFileUpload')
    @UseInterceptors (FilesInterceptor('file', 10, {
      storage: diskStorage({
        // destination: './upload-files/manisha-123',
        // destination: `./upload-files/PO-${req}`,
        destination: (req, file, callback) => {
          console.log(file);
          const destinationPath = `./upload-files/PO-${req.body.poNumber}`;
          try {
            // Attempt to create the directory if it doesn't exist
            fs.mkdirSync(destinationPath, { recursive: true });
            callback(null, destinationPath);
          } catch (error) {
            console.error('Error creating directory:', error);
            callback(error, null);
          }
        },
        // destination: (req, file, callback) => {
        //   callback(null, `./upload-files/PO-${req.body.customerPo}`);
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
        if (!file.originalname.match(/\.(xls|pdf|jpg|png|jpeg|doc)$/)) {
          return callback(new Error('Only xls,pdf, jpg, png, doc, jpeg files are allowed!'), false);
        }
        callback(null, true);
      },
    }))



  
  @Post("getdata")
  async getdata(): Promise<any> {
    return await this.Service.getdata();
  }

}