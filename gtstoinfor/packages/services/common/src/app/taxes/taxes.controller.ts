import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaxesDTO } from './dto/taxes.dto';
import { TaxesService } from './taxes.service';
import { TaxesRequest } from './dto/taxes.request';
import { UserRequestDto } from '../countries/dto/user-request-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllTaxesResponseModel, TaxDropDownDto, TaxDropDownResponse, TaxesResponseModel } from '@project-management-system/shared-models';
// import { UserRequestDto } from '@gtpl/shared-models/common-models';

@ApiTags('taxes')
@Controller('taxes')
export class TaxesController {
    constructor(
        private taxesService: TaxesService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}
    /**
     * creates or updates a Tax details
     * @param taxesDTO 
     * @param isUpdate 
     * @param request 
     */
    @Post('/createTax')
    async createTax(@Body() taxesDTO:TaxesDTO,isUpdate:boolean=false,@Req() request:Request): Promise<TaxesResponseModel> {
        try {
            return await this.taxesService.createTax(taxesDTO, false,request);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(TaxesResponseModel, error)

        }
    }
    /**
     * creates or updates a Tax details
     * @param taxesDTO 
     * @param request 
     */
    @Post('/updateTax')
    async updateTax(@Body() taxesDTO:any,@Req() request:Request): Promise<TaxesResponseModel> {
        try {
        return await this.taxesService.createTax(taxesDTO, true,request);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(TaxesResponseModel, error)

        }
    }   
    /**
     * get all Taxes Details
     * @param request 
     */
    @Post('/getAllTaxes')
    async getAllTaxes(@Req() req?:UserRequestDto): Promise<AllTaxesResponseModel> {
        try {
        return await this.taxesService.getAllTaxes(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(AllTaxesResponseModel, error)

        }
    }
    @Post('/getAllActiveTaxes')
  async getAllActiveTaxes(@Req() request: Request): Promise<AllTaxesResponseModel> {
      try {
          return await this.taxesService.getAllActiveTaxes();
      } catch (error) {
          return this.applicationExceptionhandler.returnException(AllTaxesResponseModel, error)
      }
  }

     /**
     * Activate Or De-Activate Value Taxes
     * @param getSingleTaxes TaxesResponseModel 
     * @returns Value Taxes
     */
    @Post('/activateOrDeactivateTax')
    async activateOrDeactivateTax(@Body() taxReq: any): Promise<TaxesResponseModel> {
        try {
            return await this.taxesService.activateOrDeactivateTax(taxReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(TaxesResponseModel, err);
        }
    }

    /**
     * 
     * @param taxReq 
     * @returns 
     */
    @Post('/getTaxForId')
    async getTaxForId(@Body() taxReq: TaxesRequest): Promise<TaxDropDownDto> {
        try {
            return await this.taxesService.getTaxForId(taxReq.taxId);
        } catch (err) {
            throw err;
        }
    }

    @Post('/getTaxForNoTax')
    async getTaxForNoTax(): Promise<TaxDropDownDto> {
        try {
            return await this.taxesService.getTaxForNoTax();
        } catch (err) {
            throw err;
        }
    }
    @Post('/getDefaultTaxForPO')
    async getDefaultTaxForPO(): Promise<TaxDropDownDto> {
        try {
            return await this.taxesService.getDefaultTaxForPO();
        } catch (err) {
            throw err;
        }
    }

    

    @Post('/getActiveTaxDropDown')
    async getActiveTaxDropDown(): Promise<TaxDropDownResponse> {
        try {
            return await this.taxesService.getActiveTaxDropDown();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(TaxDropDownResponse, err);
        }
    }
}
