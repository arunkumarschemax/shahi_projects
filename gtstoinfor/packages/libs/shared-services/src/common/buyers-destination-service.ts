import { BuyersDestinationDto, BuyersDestinationResponseModel, BuyersDestinationRequest, CommonResponseModel, BuyerIdReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class BuyerDestinationService  extends CommonAxiosService{
    URL =  '/buyers-destination'

    async create(req:BuyersDestinationDto):Promise<BuyersDestinationResponseModel>{
        return this.axiosPostCall(this.URL + '/createbuyersDes',req)
    }

    async getAll(req:BuyersDestinationRequest):Promise<BuyersDestinationResponseModel>{
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

    async getDestinationsByBuyerId(req:BuyerIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getDestinationsByBuyerId',req)
    }

    async getColorsByBuyerId(req:BuyerIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getColorsByBuyerId',req)
    }

    async getSizesByBuyerId(req:BuyerIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getSizesByBuyerId',req)
    }

}