import axios from "axios";
import { from } from "rxjs";
import { CommonAxiosService } from "../common-axios-service-prs";
import { FabricTypesDto,FabricTypeResponse,AllFabricTypesResponse, CommonResponseModel, FabricRequestCodeDto, TrimRequestCodeDto, M3trimsDTO, M3TrimType, BuyerRefNoRequest, TrimCodeReq, FabricCodeReq, UpdateIdReq } from "@project-management-system/shared-models";


export class FabricRequestCodeService extends CommonAxiosService{
    URL ='/item-req-code';

    async createFabricRequestedCode(dto:FabricRequestCodeDto): Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/createFabricRequestedCode', dto)
    }

    async getAllFabrics(req?:FabricCodeReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllFabrics',req)
    }

    async createTrimRequestedCode(dto:TrimRequestCodeDto): Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/createTrimRequestedCode', dto)
    }

    async getAllTrims(req?:TrimCodeReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllTrims',req)
    }

    async getAllTypes(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllTypes", req)
    }

    async getAllContents(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllContents", req)
    }

    async getAllFinishes(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllFinishes", req)
    }

    async getAllHoles(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllHoles", req)
    }

    async getAllStructures(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllStructures", req)
    }

    async getAllCategories(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllCategories", req)
    }

    async getAllQuality(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllQuality", req)
    }

    async getAllThickness(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllThickness", req)
    }

    async getAllVariety(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllVariety", req)
    }

    async getAllUom(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllUom", req)
    }

    async getAllColors(req: M3trimsDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllColors", req)
    }

    async getAllTrimCategories(req?:M3TrimType): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllTrimCategories",req)
    }

    async getAllBuyers(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllBuyers")
    }

    async getAllFabricBuyers(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllFabricBuyers")
    }

    async getAllFabricTypes(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllFabricTypes")
    }

    async getAllFinish(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllFinish")
    }

    async getAllHSNCodes(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllHSNCodes")
    }

    async getAllWeaves(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllWeaves")
    }

    async getContents(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getContents")
    }

    async updateFabStatus(req:UpdateIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/updateFabStatus",req)
    }
    async updateTrimStatus(req:UpdateIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/updateTrimStatus",req)
    }
   
}
