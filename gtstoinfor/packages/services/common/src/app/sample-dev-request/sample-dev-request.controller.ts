import { Body, Controller, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from '@nestjs/platform-express';
import { Cron } from '@nestjs/schedule';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllSampleDevReqResponseModel, CommonResponseModel, RequestNoReq, SampleFilterRequest, UploadResponse, lifeCycleStatusReq, sampleReqIdReq } from '@project-management-system/shared-models';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { AllocatedLocationRequest } from './dto/allocated-location-req';
import { AllocationApprovalRequest } from './dto/allocation-approval-req';
import { AllLocationRequest } from './dto/location-req';
import { MaterialIssueRequest } from './dto/material-issue.req';
import { OrderQuantityRequset } from './dto/order-quantity-request';
import { SampleRequestDto } from './dto/samle-dev-req';
import { SampleInventoryLog } from './dto/sample-inventory-log-dto';
import { SampleOrderIdRequest } from './dto/sample-req-id';
import { MaterialallitemsReq } from './dto/sample-req-size-req';
import { SampleRequestService } from './sample-dev-request.service';

@ApiTags('sample-request')
@Controller('sample-request')
export class SampleDevReqController {
  constructor(private sampleService: SampleRequestService,
    private readonly applicationExceptionHandler: ApplicationExceptionHandler
  ) { }


  @Post('/getAllSampleDevData')
  @ApiBody({ type: SampleFilterRequest })
  async getAllSampleDevData(@Body() req?: any): Promise<AllSampleDevReqResponseModel> {
    // console.log(req, "cont")
    try {
      return await this.sampleService.getAllSampleDevData(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/getAllSampleReqNo')
  async getAllSampleReqNo(): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleReqNo();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/getAllSampleReqDropDown')
  async getAllSampleReqDropDown(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllSampleReqDropDown();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/getIssuedSampleRequests')
  async getIssuedSampleRequests(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getIssuedSampleRequests(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }



  @Post('/getAllSampleData')
  async getAllSampleData(): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllSampleData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }


  @Post('/getmaterialissue')
  async getmaterialissue(): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getmaterialissue();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/cancelSampleReqById')
  @ApiBody({ type: SampleFilterRequest })
  async cancelSampleReqById(@Body() req: any): Promise<AllSampleDevReqResponseModel> {
    try {
      // console.log(req, 'controller')
      return await this.sampleService.cancelSampleReqById(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  @Post('/createSampleDevelopmentRequest')
  @ApiBody({ type: SampleRequestDto })
  async createSampleDevelopmentRequest(@Body() req: any): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.createSampleDevelopmentRequest(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, err);
    }
  }

  @Post('/getAllPCH')
  async getAllPCH(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllPCH();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getAllStyleNo')
  async getAllStyleNo(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllStyleNo();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  // @Post('/fileUpload')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('file', {
  //   limits: { files: 1 },
  //   storage: diskStorage({
  //     destination: './upload-files',
  //     filename: (req, file, callback) => {
  //       const name = file.originalname.split('.')[0];
  //       const fileExtName = extname(file.originalname);
  //       const randomName = Array(4)
  //         .fill(null)
  //         .map(() => Math.round(Math.random() * 16).toString(16))
  //         .join('');
  //       callback(null, `${name}-${randomName}${fileExtName}`);
  //     },
  //   }),
  //   fileFilter: (req, file, callback) => {
  //     if (!file.originalname.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
  //       return callback(new Error('Only png,jpeg,PNG,jpg,gif,tiff,x-tiff,z-png files are allowed!'), false);
  //     }
  //     callback(null, true);
  //   },
  // }))

  @Post('/fileUpload')
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      // destination: './upload-files/manisha-123',
      // destination: `./upload-files/PO-${req}`,
      destination: (req, file, callback) => {
        // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        // console.log(req.body);

        // console.log(file);
        const destinationPath = join(__dirname, '../../../../',`upload_files/SD-${(req.body.reqNo).replace(/\//g, "_")}`)
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
  async updateStylePath(@UploadedFiles() file: File[], @Body() uploadData: any): Promise<UploadResponse> {
    // console.log(file, '-------file')
    try {
      return await this.sampleService.UpdateFilePath(file, uploadData.SampleRequestId)
    } catch (error) {
      return this.applicationExceptionHandler.returnException(UploadResponse, error);
    }
  }

  @Post('/fabricUpload')
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      // destination: './upload-files/manisha-123',
      // destination: `./upload-files/PO-${req}`,
      destination: (req, file, callback) => {
        // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        // console.log(req.body);

        // console.log(file);
        const destinationPath = join(__dirname, '../../../../',`upload_files/Fabric-SD-${(req.body.reqNo).replace(/\//g, "_")}`)

        // const destinationPath = `upload_files/Fabric-SD-${(req.body.reqNo).replace(/\//g, "_")}`;
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
  async fabricUpload(@UploadedFiles() file: File[], @Body() uploadData: any): Promise<UploadResponse> {
    try {
      return await this.sampleService.fabricUpload(file, uploadData.fabIds)
    } catch (error) {
      return this.applicationExceptionHandler.returnException(UploadResponse, error);
    }
  }

  @Post('/trimUpload')
  @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
      // destination: './upload-files/manisha-123',
      // destination: `./upload-files/PO-${req}`,
      destination: (req, file, callback) => {
        // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        // console.log(req.body);

        // console.log(file);

        const destinationPath = join(__dirname, '../../../../',`upload_files/Trim-SD-${(req.body.reqNo).replace(/\//g, "_")}`)

        // const destinationPath = `upload_files/Trim-SD-${(req.body.reqNo).replace(/\//g, "_")}`;
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
  async trimUpload(@UploadedFiles() file: File[], @Body() uploadData: any): Promise<UploadResponse> {
    try {
      return await this.sampleService.trimUpload(file, uploadData.fabIds)
    } catch (error) {
      return this.applicationExceptionHandler.returnException(UploadResponse, error);
    }
  }

  @Post('/getSampleRequestReport')
  async getSampleRequestReport(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getSampleRequestReport(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getFabricCodes')
  async getFabricCodes(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getFabricCodes();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getTrimCodes')
  async getTrimCodes(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getTrimCodes();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getTrimType')
  async getTrimType(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getTrimType();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getTrimCodeAgainstTrimType')
  async getTrimCodeAgainstTrimType(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getTrimCodeAgainstTrimType(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getM3StyleCode')
  async getM3StyleCode(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getM3StyleCode();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getSampleInventory')
  async getSampleInventory(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getSampleInventory();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('getAllRequestNo')
  async getAllRequestNo(): Promise<CommonResponseModel> {
    const data = await this.sampleService.getAllRequestNo()
    return data
  }

  @Post('getAllBuyers')
  async getAllBuyers(): Promise<CommonResponseModel> {
    const data = await this.sampleService.getAllBuyers()
    return data
  }


  @Post('/createSampling')
  @ApiBody({ type: SampleInventoryLog })
  async createSampling(@Req() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.createSampling(req.body)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getAllSmaplingDevData')
  async getAllSmaplingDevData(): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllSmaplingDevData()
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getAvailbelQuantityAginstBuyerAnditem')
  async getAvailbelQuantityAginstBuyerAnditem(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAvailbelQuantityAginstBuyerAnditem(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getAllMaterialAllocation')
  async getAllMaterialAllocation(@Body() req: any): Promise<AllSampleDevReqResponseModel> {
    try {
      return await this.sampleService.getAllMaterialAllocation(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }


  @Post('/creatematerialAlloction')
  async creatematerialAlloction(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.creatematerialAlloction(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getallMaterialAllocationItemsById')
  @ApiBody({ type: MaterialallitemsReq })

  async getallMaterialAllocationItemsById(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getallMaterialAllocationItemsById(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/updateStatus')
  async updateStatus(@Body() req: any): Promise<CommonResponseModel> {
    // console.log(req, "controll")
    try {
      return await this.sampleService.updateStatus(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getSampleOrderDetails')
  async getSampleOrderDetails(@Body() req: any): Promise<CommonResponseModel> {
    // console.log(req, "controll")
    try {
      return await this.sampleService.getSampleOrderDetails(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }


  @Post('/getfabricDetailsOfSample')
  async getfabricDetailsOfSample(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getfabricDetailsOfSample(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getTrimDetailsOfSample')
  async getTrimDetailsOfSample(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getTrimDetailsOfSample(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getAllocatedBomInfo')
  async getAllocatedBomInfo(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllocatedBomInfo(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/allocatedLocationInfo')
  @ApiBody({ type: AllocatedLocationRequest })
  async allocatedLocationInfo(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.allocatedLocationInfo(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/approvaAllocatedStock')
  @ApiBody({ type: AllocationApprovalRequest })
  async approvaAllocatedStock(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.approveAllocatedStock(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getAllAllocatedRequestNo')
  async getAllAllocatedRequestNo(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllAllocatedRequestNo(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getAllApprovedRequestNo')
  async getAllApprovedRequestNo(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllApprovedRequestNo(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/updatedispatch')
  @ApiBody({ type: lifeCycleStatusReq })
  async updatedispatch(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.updatedispatch(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getRequestno')
  async getRequestNo(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getRequestNo()
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/allocatedLocation')
  @ApiBody({ type: AllLocationRequest })
  async allocatedLocation(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.allocatedLocation(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getbyID')
  @ApiBody({ type: RequestNoReq })
  async getbyID(@Body() req: any): Promise<AllSampleDevReqResponseModel> {
    // console.log(req, "constroller");

    try {
      return await this.sampleService.getbyID(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllSampleDevReqResponseModel, error);
    }
  }

  //Mobile App API for material Issues
  @Post('/issueMaterial')
  @ApiBody({ type: MaterialIssueRequest })
  async issueMaterial(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.issueMaterial(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  //Mobile App API for Roll codes in material issues screen
  @Post('/getGrnRollsForSampleOrder')
  @ApiBody({ type: SampleOrderIdRequest })
  async getGrnRollsForSampleOrder(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getGrnRollsForSampleOrder(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }



  @Post('/getPickListInfo')
  async getPickListInfo(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getPickListInfo(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getSizeWiseOrders')
  @ApiBody({ type: SampleOrderIdRequest })
  async getSizeWiseOrders(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getSizeWiseOrders(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getOrderedSizes')
  @ApiBody({ type: SampleOrderIdRequest })
  async getOrderedSizes(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getOrderedSizes(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getPch')
  async getPch(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getPch()
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getOrderedColors')
  @ApiBody({ type: SampleOrderIdRequest })
  async getOrderedColors(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getOrderedColors(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getStyle')
  async getStyle(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getStyle()
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getQuantityForSIzeAndColor')
  @ApiBody({ type: OrderQuantityRequset })
  async getQuantityForSIzeAndColor(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getQuantityForSIzeAndColor(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getAllSampleRequestsInfo')
  @ApiBody({ type: sampleReqIdReq })
  async getAllSampleRequestsInfo(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllSampleRequestsInfo(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }
  @Post('/getAllSampleRequestSizesInfo')
  @ApiBody({ type: sampleReqIdReq })
  async getAllSampleRequestSizesInfo(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllSampleRequestSizesInfo(req)
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  // @Get('open')
  // async openWindowsApp() {
  //   try{
  //     // const appPath = 'E:\myprojects\\windowsapp\\my-windows-app-launcher\\dist\\win-unpacked\\my-windows-app-launcher.exe';
  //     const appPath = 'E:\\myprojects\\windowsapp\\WindowsFormsApp\\WindowsFormsApp\\bin\\Debug\\WindowsFormsApp.exe';
  //     console.log(appPath);
  //     const cmd = `start "" "${appPath}"`;
  //     console.log(cmd)
  //     exec(`start "" "${appPath}"`, (error) => {
  //       if (error) {
  //         console.error(error);
  //         return 'Error opening Windows app';
  //       } else {
  //         console.log('mmmmm');
  //         return 'Windows app opened successfully';
  //       }
  //     });

  //   }catch(err){
  //     return err

  //   }

  // }
  @Cron('26 10 * * *')
  @Post('/getUsageWhtsAppMsg')
  @ApiBody({ type: Date })
  async getUsageWhtsAppMsg(@Body() req?: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getUsageWhtsAppMsg()
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getAllFilesDataByReqId')
  @ApiBody({ type: SampleOrderIdRequest })
  async getAllFilesDataByReqId(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getAllFilesDataByReqId(req);
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

  @Post('/getProcessAgainstSampleOrder')
  @ApiBody({ type: SampleOrderIdRequest })
  async getProcessAgainstSampleOrder(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.sampleService.getProcessAgainstSampleOrder(req);
    }
    catch (err) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    }
  }

}
