import { BuyersDestinationDto, BuyersDestinationResponseModel, BuyersDestinationRequest, CommonResponseModel, BuyerIdReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class BuyerDestinationService  extends CommonAxiosService{
    URL =  '/buyers-destination'

    async create(req:BuyersDestinationDto):Promise<BuyersDestinationResponseModel>{
        return this.axiosPostCall(this.URL + '/createbuyersDes',req)
    }

    async getAll(req?:BuyersDestinationRequest):Promise<BuyersDestinationResponseModel>{
        return this.axiosPostCall(this.URL + '/getAll',req)
    }

    // async getColourDropDown():Promise<BuyersDestinationResponseModel>{
    //     return this.axiosPostCall(this.URL + '/getStyleDropDown')
    // }

    async getSizeDropDown():Promise<BuyersDestinationResponseModel>{
        return this.axiosPostCall(this.URL + '/getSizeDropDown')
    }

    async getDestinationDropDown():Promise<BuyersDestinationResponseModel>{
        return this.axiosPostCall(this.URL + '/getDestinationDropDown')
    }

    async getAllSizesAgainstBuyer(req:BuyerIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getAllSizesAgainstBuyer',req)
    }
    async getAllColorsAgainstBuyer(req:BuyerIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getAllColorsAgainstBuyer',req)
    }

}