import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { AllFactoriesResponseModel, CommonResponseModel, HistoryRequest, NewFilterDto, PriceListDto, PriceListResponseModel } from '@project-management-system/shared-models';
import { priceListService } from './pricelist.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { priceListDto } from './dto/pricelist.dto';
import { PriceListEntity } from './entities/pricelist.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { priceListRequest } from './dto/price-details.req';

@Controller('/priceList')
export class PriceListController {
    constructor(
        private priceService: priceListService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
        ) { }

        @Post('/createPriceList')
        @ApiBody({ type: priceListDto })
        async createPriceList(@Body() Dto: any): Promise<PriceListResponseModel> {
          try {
            return await this.priceService.createPriceList(Dto, false);
          } catch (error) {
            return this.applicationExceptionhandler.returnException(
              PriceListResponseModel,
              error
            );
          }
        }
      
        @Post('/updatePriceList')
        @ApiBody({ type: PriceListDto })
        async updatePriceList(@Body() Dto: any): Promise<PriceListResponseModel> {
          try {
            return await this.priceService.createPriceList(Dto, true);
          } catch (error) {
            return this.applicationExceptionhandler.returnException(
              PriceListResponseModel,
              error
            );
          }
        }
    

    @Post('/getAllPriceList')
    @ApiBody({ type: NewFilterDto })
    async getAllPriceList(@Body() req:any): Promise<PriceListResponseModel> {
        try {
            return await this.priceService.getAllPriceList(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(PriceListResponseModel, error);
        }
    }
    

    @Post('/getAllActivePriceList')
    async getAllActivePriceList() : Promise<PriceListResponseModel>{
        try{
            return await this.priceService.getAllActivePriceList()
        }catch(error){
            return this.applicationExceptionhandler.returnException(PriceListResponseModel, error);
        }
    }

    @Post("/ActivateOrDeactivatePriceList")
    @ApiBody({type : priceListDto})
    async ActivateOrDeactivatePriceList(@Body() req:any) : Promise<PriceListResponseModel>{
    try{
        await this.priceService.ActivateOrDeactivatePriceList(req)
    }catch(error){
        return this.applicationExceptionhandler.returnException(PriceListResponseModel,error)
    }
  }

  @Post('/getAllPriceListStyles')
    async getAllPriceListStyles(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListStyles();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getAllPriceListDestination')
    async getAllPriceListDestination(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListDestination();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllPriceListYear')
    async getAllPriceListYear(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListYear();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllPriceListCurrency')
    async getAllPriceListCurrency(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListCurrency();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllPriceListSeasonCode')
    async getAllPriceListSeasonCode(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllPriceListSeasonCode();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }


    @Post('/fileUpload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        limits: { files: 1 },
        storage: diskStorage({
            destination: './upload-files',
            filename: (req, file, callback) => {
                const name = file.originalname;
                callback(null, `${name}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(png|jpeg|PNG|jpg|JPG|xls|xlsx|csv)$/)) {
                return callback(new Error('Only png,jpeg,PNG,jpg,JPG,xls,xlsx and csv files are allowed!'), false);
            }
            callback(null, true);
        },
    }))

    async fileUpload( @UploadedFile() file): Promise<CommonResponseModel> {
        try {
            return await this.priceService.updatePath(file.path, file.filename)
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/updateFileStatus')
    async updateFileStatus(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.priceService.updateFileStatus(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getUploadFilesData')
    async getUploadFilesData(): Promise<CommonResponseModel> {
        try {
            return this.priceService.getUploadFilesData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/savePriceListData/:id')
    async savePriceListData(@Param('id') id: number, @Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.priceService.savePriceListData(data,id);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }
    
    @Post('/getAllPriceListItem')
    async getAllPriceListItem(): Promise<CommonResponseModel> {
        try {
            return this.priceService.getAllPriceListItem();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPriceHistory')
    @ApiBody({type: HistoryRequest})
    async getPriceHistory(@Body() req : any): Promise<CommonResponseModel> {
        try {
            return this.priceService.getPriceHistory(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getAllStyles')
    async getAllStyles(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllStyles();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getAllDestination')
    async getAllDestination(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllDestination();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllYear')
    async getAllYear(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllYear();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllCurrency')
    async getAllCurrency(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllCurrency();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }
    @Post('/getAllSeasonCode')
    async getAllSeasonCode(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getAllSeasonCode();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getUploadedTime')
    async getUploadedTime(): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getUploadedTime();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getPriceForItem')
    async getPriceForItem(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.priceService.getPriceForItem(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    
}
