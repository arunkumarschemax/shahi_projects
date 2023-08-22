import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BuyersService } from './buyers.service';
import { BuyersRequest } from './dto/buyers.request';
import { BuyersDTO } from './dto/buyers.dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { BuyersResponseModel } from 'packages/libs/shared-models/src/common/buyers/buyers.response.model';
import { AllBuyersResponseModel, BuyerRequest, BuyersGeneralAttributeResponseModel, CommonResponseModel, BuyersOrderAttributeResponseModel } from '@project-management-system/shared-models';
import { BuyersGeneralAttributeDto } from './dto/buyers-general-attributes.dto';
import { BuyersGeneralAttributeService } from './buyers-general-attributes.service';
import { BuyersOrderAttributeService } from './buyers-order-attributes.service';
import { BuyersOrderAttributeDto } from './dto/buyers-order-attributes.dto';

@ApiTags('Buyers')
@Controller('buyers')
export class BuyersController {
    constructor(
        private buyersService: BuyersService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,
        private buyersGeneralAttributeService : BuyersGeneralAttributeService,
        private buyersOrderAttributeService : BuyersOrderAttributeService

    ) { }
    /**
     * creates or updates a value of Buyers
     * @param BuyersDto Buyers DTO
     * @returns BuyersResponse
     */
    @Post('/createBuyer')
    async createBuyer(@Body() buyersDTO: any, isUpdate: boolean = false): Promise<BuyersResponseModel> {
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

    @Post('/createOrderAttribute')
    async createOrderAttribute(@Body() req: any): Promise<BuyersOrderAttributeResponseModel> {
        try {
            return await this.buyersOrderAttributeService.createOrderAttribute(req,false);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(BuyersOrderAttributeResponseModel, err);
        }
    }

    @Post('/updateGeneralAttribute')
    async updateGeneralAttribute(@Body() req: any): Promise<BuyersGeneralAttributeResponseModel> {
        try {
            return await this.buyersGeneralAttributeService.createGeneralAttribute(req,true);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(BuyersGeneralAttributeResponseModel, err);
        }
    }

    @Post('/getByBuyerId')
    async getByBuyerId(@Body() req:any): Promise<BuyersGeneralAttributeResponseModel> {
        try {
            return await this.buyersGeneralAttributeService.getByBuyerId(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(BuyersGeneralAttributeResponseModel, err);
        }
    }

    @Post('/getAddressByBuyerId')
    async getAddressByBuyerId(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.buyersService.getAddressByBuyerId(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getAllBuyersInfo')
    async getAllBuyersInfo(): Promise<CommonResponseModel> {
        try {
            return await this.buyersService.getAllBuyersInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/updateOrderAttribute')
    async updateOrderAttribute(@Body() req: any): Promise<BuyersOrderAttributeResponseModel> {
        try {
            return await this.buyersOrderAttributeService.createOrderAttribute(req,true);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(BuyersOrderAttributeResponseModel, err);
        }
    }

    @Post('/getBuyerId')
    async getBuyerId(@Body() req:any): Promise<BuyersOrderAttributeResponseModel> {
        try {
            return await this.buyersOrderAttributeService.getBuyerId(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(BuyersOrderAttributeResponseModel, err);
        }
    }
}
