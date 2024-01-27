import { Body, Controller, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IndentService } from "./indent.service";
import { AllItemsResponseModel, BuyerRefNoRequest, CommonResponseModel, IndentRequestDto, UploadResponse } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { IndentDto } from "./dto/indent-dto";
import { IndentRepository } from "./dto/indent-repository";
import { AnyARecord } from "dns";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { extname } from 'path';

@ApiTags('indent')
@Controller('Indent')
export class IndentController {
  constructor(
    private readonly indentService: IndentService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    private readonly repo: IndentRepository

  ) { }
  @Post('/creteIndent')
  async creteIndent(@Body() dto: any, isUpdate: boolean = false): Promise<CommonResponseModel> {
    try {
      return await this.indentService.creteIndent(dto, false);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/updateItem')
  async updateItem(@Body() dto: any, @Req() request: Request): Promise<CommonResponseModel> {
    try {
      return await this.indentService.creteIndent(dto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/indentFabricUpload')
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      // destination: './upload-files/manisha-123',
      // destination: `./upload-files/PO-${req}`,
      destination: (req, file, callback) => {
        // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        // console.log(req.body);

        console.log(file);

        const destinationPath = `./upload_files/Fabric-SD-${(req.body.reqNo).replace(/\//g, "_")}`;
        // const destinationPath = `https://edoc7.shahi.co.in/upload_files/PO-${req.body.poNumber}`;

        // const destinationPath = `${config.download_path}+/PO-${req.body.poNumber}`;

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
async indentFabricUpload(@UploadedFiles() file:File[], @Body() uploadData: any): Promise<UploadResponse> {
  try {
    console.log(uploadData,'uploadDatauploadDatauploadDatauploadData')
    console.log(file,'$$$$$$$$$$$$$$$$$$$$')
    return await this.indentService.indentFabricUpload(file, uploadData.fabIds)
  } catch (error) {
    return this.applicationExceptionHandler.returnException(UploadResponse, error);
  }
}

  
  @Post('/indentTrimUpload')
    @UseInterceptors(FilesInterceptor('file', 10, {
      storage: diskStorage({
        // destination: './upload-files/manisha-123',
        // destination: `./upload-files/PO-${req}`,
        destination: (req, file, callback) => {
          // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
          // console.log(req.body);

          console.log(file);

          const destinationPath = `./upload_files/Trim-SD-${(req.body.reqNo).replace(/\//g, "_")}`;
          // const destinationPath = `https://edoc7.shahi.co.in/upload_files/PO-${req.body.poNumber}`;

          // const destinationPath = `${config.download_path}+/PO-${req.body.poNumber}`;

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
  async trimUpload(@UploadedFiles() file:File[], @Body() uploadData: any): Promise<UploadResponse> {
    try {
      return await this.indentService.indentTrimUpload(file, uploadData.fabIds)
    } catch (error) {
      return this.applicationExceptionHandler.returnException(UploadResponse, error);
    }
  }



  // @Post('/getAllItems')
  // async getAllItems():Promise<AllItemsResponseModel>{
  //   try{
  //     return await this.indentService.getAllItems()
  //   }catch(error){
  //     return this.applicationExceptionHandler.returnException(AllItemsResponseModel,error)
  //   }
  // }

  @Post('/getAllIndentData')
  async getAllIndentData(@Body() req?:any): Promise<CommonResponseModel> {
    try {
      return await this.indentService.getAllIndentData(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getIndentnumbers')
  async getIndentnumbers(@Body() req?:any): Promise<CommonResponseModel> {
    try {
      return await this.indentService.getIndentnumbers(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getAllIndentItemDetailsAgainstIndent')
  async getAllIndentItemDetailsAgainstIndent(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.indentService.getAllIndentItemDetailsAgainstIndent(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getAllIndentTrimDetailsAgainstIndent')
  async getAllIndentTrimDetailsAgainstIndent(@Body() req:any): Promise<CommonResponseModel> {
    try {
      return await this.indentService.getAllIndentTrimDetailsAgainstIndent(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getIndentData')
  async getIndentData(@Req() req: any): Promise<CommonResponseModel> {
    try {
      return await this.indentService.getIndentData(req.body);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getIndentDropDown')
  async getIndentDropDown(@Body() req: IndentRequestDto): Promise<CommonResponseModel> {
    console.log(req, '444444444444444');
    try {
      return await this.indentService.getIndentDropDown(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  // @Post('/getIndentDate')
  // async getIndentDate(@Req() req: any): Promise<CommonResponseModel> {
  //   console.log(req, '444444444444444');
  //   try {
  //     return await this.indentService.getIndentData(req.body);
  //   } catch (error) {
  //     return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
  //   }
  // }
}