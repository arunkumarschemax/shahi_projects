import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BuyersService } from './buyers.service';
import { BuyersRequest } from './dto/buyers.request';
import { BuyersDTO } from './dto/buyers.dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BuyersResponseModel } from 'packages/libs/shared-models/src/common/buyers/buyers.response.model';
import { AllBuyersResponseModel, BuyerRequest, BuyersGeneralAttributeResponseModel } from '@project-management-system/shared-models';
import { BuyersGeneralAttributeDto } from './dto/buyers-general-attributes.dto';
import { BuyersGeneralAttributeService } from './buyers-general-attributes.service';

@ApiTags('Buyers')
@Controller('buyers')
export class BuyersController {
    constructor(
        private buyersService: BuyersService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,
        private buyersGeneralAttributeService : BuyersGeneralAttributeService

    ) { }
    /**
     * creates or updates a value of Buyers
     * @param BuyersDto Buyers DTO
     * @returns BuyersResponse
     */
    @Post('/createBuyer')
    async createBuyer(@Body() buyersDTO: any, isUpdate: boolean = false): Promise<BuyersResponseModel> {
        console.log(buyersDTO,'=============')
        try {
            return await this.buyersService.createBuyer(buyersDTO, false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(BuyersResponseModel, error)
        }
    }
    /**
     *  creates or updates a value of Customers
     * @param buyersDTO 
     * @param request 
     */
    @Post('/updateBuyer')
    async updateBuyer(@Body() buyersDTO: any): Promise<BuyersResponseModel> {
        try {
            return await this.buyersService.createBuyer(buyersDTO, true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(BuyersResponseModel, error)
        }
    }

    /**
     * get All Buyer Details
     * @param request 
     */
    @Post('/getAllBuyer')
    async getAllBuyer(): Promise<AllBuyersResponseModel> {
        try {
            return await this.buyersService.getAllBuyers();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(AllBuyersResponseModel, error)
        }
    }
    @Post('/getAllActiveBuyers')
    async getAllActiveBuyers(@Req() request: Request): Promise<AllBuyersResponseModel> {
        try {
            return await this.buyersService.getAllActiveBuyers();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(AllBuyersResponseModel, error)
        }
    }

    @Post('/getBuyerDataById')
    async getBuyerDataById(@Body() buyerRequest:any,@Req() request: Request): Promise<BuyersResponseModel> {
        try {

        return await this.buyersService.getBuyerDataById(buyerRequest);
        } catch (error) {
            
            return this.applicationExceptionhandler.returnException(BuyersResponseModel, error)
        }
    }

    /**
     * Activate or Deactivate Buyer
     * @param buyerReq 
     */
    @Post('/activateOrDeactivateBuyer')
    async activateOrDeactivateBuyer(@Body() buyerReq: any): Promise<BuyersResponseModel> {
        try {
            return await this.buyersService.activateOrDeactivateBuyer(buyerReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(BuyersResponseModel, err);
        }
    }

    /**
     * get All Customers Details
     * @param request 
     */
    // @Post('/getActiveCustomersDropDownData')
    // async getActiveCustomersDropDownData(): Promise<CustomersDropDownDataResponseModel> {
    //     try {
    //         return await this.buyersService.getActiveCustomersDropDownData();
    //     } catch (error) {
    //         return this.applicationExceptionhandler.returnException(CustomersDropDownDataResponseModel, error)
    //     }
    // }

    @Post('/createGeneralAttribute')
    async createGeneralAttribute(@Body() req: any): Promise<BuyersGeneralAttributeResponseModel> {
        try {
            return await this.buyersGeneralAttributeService.createGeneralAttribute(req,false);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(BuyersGeneralAttributeResponseModel, err);
        }
    }
}
