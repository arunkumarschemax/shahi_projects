import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { PackageTermsService } from './package-terms.service';
import { AllPackageTermsResponseModel, PackageTermsDropDownResponseModel, PackageTermsRequest, PackageTermsResponseModel } from '@project-management-system/shared-models';
import { PackageTermsDTO } from './dto/package-terms.dto';

@ApiTags('package-terms')
@Controller('package-terms')
export class PackageTermsController {

    constructor(
        private packageTermsService: PackageTermsService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}
   
    @Post('/createPackageTerms')
    async createPackageTerms(@Body() packageTermsDTO:any,isUpdate:boolean=false): Promise<PackageTermsResponseModel> {
        try {
            console.log(packageTermsDTO,'pppppp');
            return await this.packageTermsService.createPackageTerms(packageTermsDTO, false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(PackageTermsResponseModel, error)
        }
    }

    
    @Post('/updatePackageTerms')
    async updatePackageTerms(@Body() packageTermsDTO: any,@Req() request:Request): Promise<PackageTermsResponseModel> {
        try {
        return await this.packageTermsService.createPackageTerms(packageTermsDTO, true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(PackageTermsResponseModel, error)
        }
    }

   
    @Post('/getAllPackageTerms')
    async getAllPackageTerms(@Body() req?:UserRequestDto): Promise<AllPackageTermsResponseModel> {
        try {
            console.log('yessss')
        return await this.packageTermsService.getAllPackageTerms(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(AllPackageTermsResponseModel, error)
        }
    }

    @Post('/getAllActivePackageTerms')
  async getAllActivePackageTerms(@Req() request: Request): Promise<AllPackageTermsResponseModel> {
      try {
          return await this.packageTermsService.getAllActivePackageTerms();
      } catch (error) {
          return this.applicationExceptionhandler.returnException(AllPackageTermsResponseModel, error)
      }
  }

    
    @Post('/activateOrDeactivatePackageTerms')
    async activateOrDeactivatePackageTerms(@Body() packageTermsReq: any): Promise<PackageTermsResponseModel> {
        console.log(packageTermsReq,"controller")
        try {
            return await this.packageTermsService.activateOrDeactivatePackageTerms(packageTermsReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(PackageTermsResponseModel, err);
        }
    }
    @Post('/getPackageById')
    async getPackageById(@Body() packageTermsReq: PackageTermsRequest): Promise<PackageTermsResponseModel> {
        try {
            return await this.packageTermsService.getPackageById(packageTermsReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(PackageTermsResponseModel, err);
        }
    }
   
    @Post('/getAllPackageTermsDropDown')
    async getAllPackageTermsDropDown(): Promise<PackageTermsDropDownResponseModel> {
        try {
        return await this.packageTermsService.getAllPackageTermsDropDown();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(PackageTermsDropDownResponseModel, error)
        }
    }

     
      @Post('/getAllVendorPackageTermsDropDown')
      async getAllVendorPackageTermsDropDown(): Promise<PackageTermsDropDownResponseModel> {
          try {
          return await this.packageTermsService.getAllVendorPackageTermsDropDown();
          } catch (error) {
              return this.applicationExceptionhandler.returnException(PackageTermsDropDownResponseModel, error)
          }
      }

}

