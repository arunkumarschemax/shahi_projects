import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BuyersDestinationService } from "./buyers-destination.service";
import { BuyersDestinationResponseModel, CommonResponseModel } from "@project-management-system/shared-models";
import { BuyersDestinationRequest } from "./dto/byers-destination.request";

@ApiTags('buyers-destination')
@Controller('buyers-destination')
export class BuyersDestinationController{
    constructor(
        private buyersDesService : BuyersDestinationService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}

    @Post('/createbuyersDes')
    @ApiBody({type:BuyersDestinationRequest})
    async createbuyersDes(@Body() req:any):Promise<BuyersDestinationResponseModel>{
        console.log(req,'--------------req')
        try{
            return await this.buyersDesService.createBuyersDestination(req)
        } catch(err){
            return this.applicationExceptionHandler.returnException(BuyersDestinationResponseModel, err);
        }
    }


    @Post('/getAll')
    @ApiBody({type:BuyersDestinationRequest})
    async getBuyersDestinations(@Body() req:any):Promise<any>{
        try{
            return await this.buyersDesService.getAll(req)
        } catch(err){
            return this.applicationExceptionHandler.returnException(BuyersDestinationResponseModel, err);
        }
    }

    @Post('/getAllSizesAgainstBuyer')
    async getAllSizesAgainstBuyer(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.buyersDesService.getAllSizesAgainstBuyer(req)
        } catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getAllColorsAgainstBuyer')
    async getAllColorsAgainstBuyer(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.buyersDesService.getAllColorsAgainstBuyer(req)
        } catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }


    //  @Post('/getSizeDropDown')
    // async getSizeDropDown():Promise<BuyersDestinationResponseModel>{
    //     try{
    //         return await this.buyersDesService.getSizeDropDown()
    //     } catch(err){
    //         return this.applicationExceptionHandler.returnException(BuyersDestinationResponseModel, err);
    //     }
    // }

    // @Post('/getDestinationDropDown')
    // async getDestinationDropDown():Promise<BuyersDestinationResponseModel>{
    //     try{
    //         return await this.buyersDesService.getDestinationDropDown()
    //     } catch(err){
    //         return this.applicationExceptionHandler.returnException(BuyersDestinationResponseModel, err);
    //     }
    // }

    // @Post('/getColourDropDown')
    // async getColourDropDown():Promise<BuyersDestinationResponseModel>{
    //     try{
    //         return await this.buyersDesService.getColourDropDown()
    //     } catch(err){
    //         return this.applicationExceptionHandler.returnException(BuyersDestinationResponseModel, err);
    //     }
    // }
    

}