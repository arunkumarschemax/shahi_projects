import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MasterBrandAdapter } from './dto/master-brands.adapter';
import { MasterBrandRequest } from './dto/master-brands.request';
import { MasterBrandsService } from './master-brands.service';
import { AllBrandsResponseModel, MasterBrandsResponseModel, UploadResponse } from '@project-management-system/shared-models';
import { extname } from 'path';
import { BrandUploadResponse } from './dto/master-brand-file-upload';
import { diskStorage } from 'multer';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BrandsDTO } from './dto/master-brands.dto';
import { type } from 'os';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('master-brands')
@Controller('master-brands')
export class MasterBrandsController {


    constructor(
        private brandService: MasterBrandsService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
      ) {}

      @Post('/createMasterBrand')
      async createMasterBrand(@Body() brandDto:any): Promise<MasterBrandsResponseModel> {
        
          try {
           return await this.brandService.createMasterBrand(brandDto,false);
         } catch (error) {
              return this.applicationExceptionHandler.returnException(MasterBrandsResponseModel, error);
         }
       }

       @Post('/updateBrands')
       async updateBrands(@Body() masterBrandsDto: any,@Req() request:Request): Promise<MasterBrandsResponseModel> {
         try {
         //  console.log(request);
           return await this.brandService.createMasterBrand(masterBrandsDto, true);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(MasterBrandsResponseModel, error);
         }
       }
       @Post('/getAllBrands')
       // @UseGuards(AuthGuard('jwt'))
       async getAllBrands(@Body() req?:UserRequestDto): Promise<AllBrandsResponseModel> {
         try {
           return await this.brandService.getAllBrands(req);
         } catch (error) {
           return this.applicationExceptionHandler.returnException(AllBrandsResponseModel, error);
         }
       }
       @Post('/getAllActiveBrands')
       async getAll(@Req() request: Request): Promise<AllBrandsResponseModel> {
           try {
               return await this.brandService.getAllActiveBrands();
           } catch (error) {
               return this.applicationExceptionHandler.returnException(AllBrandsResponseModel, error)
           }
       }
       @Post('/activateOrDeactivateBrand')
       @ApiBody({type:MasterBrandRequest})
       async activateOrDeactivateBrand(@Body() BrandIDReq: any): Promise<MasterBrandsResponseModel> {
           try {
         //   console.log(BrandIDReq,'controller----------')
               return await this.brandService.activateOrDeactivatebrand(BrandIDReq);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(MasterBrandsResponseModel, err);
           }
       }
       @Post('/getActiveBrandsById')
       async getActiveBrandsById(@Body() BrandIDReq: MasterBrandRequest): Promise<MasterBrandsResponseModel> {
           try {
               return await this.brandService.getActiveBrandsById(BrandIDReq);
           } catch (err) {
               return this.applicationExceptionHandler.returnException(MasterBrandsResponseModel, err);
           }
       }
       @Post('/fileUpload')
       @ApiConsumes('multipart/form-data')
       @UseInterceptors(FileInterceptor('file', {
         limits: { files: 1 },
         storage: diskStorage({
           destination: './upload-files',
           filename: (req, file, callback) => {
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
           if (!file.originalname.match(/\.(png|jpeg|PNG|jpg|JPG|pjpeg|gif|tiff|x-tiff|x-png)$/)) {
             return callback(new Error('Only png,jpeg,PNG,jpg,gif,tiff,x-tiff,z-png files are allowed!'), false);
           }
           callback(null, true);
         },
       }))
     
       async fabricWeaveImageUpload(@UploadedFile() file, @Body() uploadData: any): Promise<UploadResponse> {
       
         try {
           return await this.brandService.updatePath(file.path,file.filename, uploadData.brandId)
         } catch (error) {
           return this.applicationExceptionHandler.returnException(UploadResponse, error);
         }
       }
      }
// function diskStorage(arg0: { destination: string; filename: (req: any, file: any, callback: any) => void; }): any {
//     throw new Error('Function not implemented.');
// }

