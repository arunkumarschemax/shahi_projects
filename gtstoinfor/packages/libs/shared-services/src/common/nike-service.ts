import { BomItemReq, CommonResponseModel, DiaPDFModel, DpomApproveRequest, ItemNoDto, PpmDateFilterRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export class NikeService extends CommonAxiosService {
    private dpomController = "/nike-dpom"

    async saveDPOMExcelData(data: any, id: number): Promise<CommonResponseModel> {
        const idn = id;
        const url = `/nike-dpom/saveDPOMExcelData/${idn}`;
        return this.axiosPostCall(url, data);
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/fileUpload", formData)
    }

    async saveDPOMDataToDataBase(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/saveDPOMDataToDataBase")
    }

    async saveLegalPOPDFData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/saveLegalPOPDFData", req)
    }

    async saveDIAPDFData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/saveDIAPDFData", req)
    }

    async coLineCreationReq(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/coLineCreationReq", req)
    }

    async createCOline(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/createCOline", req)
    }

    async updateFileStatus(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateFileStatus", req)
    }

    async getUploadFilesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getUploadFilesData")
    }

    async revertFileData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/revertFileData", req)
    }

    async getFactoryReportData(req?: PpmDateFilterRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFactoryReportData", req)
    }

    async getByFactoryStatus(): Promise<any> {
        return this.axiosPostCall(this.dpomController + "/getByFactoryStatus")
    }

    async getDivertReportData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getDivertReportData")
    }

    async updateDivertDataValues(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateDivertDataValues", req)
    }

    async getDivertReportDataFromDivertTable(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getDivertReportDataFromDivertTable")
    }

    async updateDivertData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateDivertData", req)
    }

    async getCountForDivertReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getCountForDivertReport")
    }

    async getPlantWisePoOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPlantWisePoOrders")
    }

    async getStatusWiseItems(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getStatusWiseItems")
    }

    async approveDpomLineItemStatus(req: DpomApproveRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/approveDpomLineItemStatus", req)
    }

    async getTotalItemQtyChangeData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getTotalItemQtyChangeData", req)
    }

    async poLineItemStatusChange(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/poLineItemStatusChange")
    }

    async getShipmentPlaningChart(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getShipmentPlaningChart")
    }

    async getShipmentTrackerReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getShipmentTrackerReport")
    }

    async getCategoryWiseItemQty(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getCategoryWiseItemQty")
    }

    async getShipmentWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getShipmentWiseData")
    }

    async getPPMData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPPMData", req)
    }

    async getPlanShipmentWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPlanShipmentWiseData")
    }
    async getFabricTrackerReport(req: PpmDateFilterRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFabricTrackerReport", req)
    }

    async getItemChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getItemChangeData")
    }

    async getUnitChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getUnitChangeData")
    }

    async getFOBPriceChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFOBPriceChangeData")
    }

    async getNetInclDiscChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getNetInclDiscChangeData")
    }

    async getTradingNetInclDiscChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getTradingNetInclDiscChangeData")
    }

    async getGACChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getGACChangeData")
    }

    async getMRGACChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getMRGACChangeData")
    }

    async getModeOfTransportChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getModeOfTransportChangeData")
    }

    async getPlantCodeChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPlantCodeChangeData")
    }

    async getShippingTypeChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getShippingTypeChangeData")
    }

    async getVasTextChangeData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getVasTextChangeData", req)
    }

    async getShipToCustomerChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getShipToCustomerChangeData")
    }

    async getInventorySegmentCodeChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getInventorySegmentCodeChangeData")
    }

    async getDirectShipSoNoChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getDirectShipSoNoChangeData")
    }

    async getDestinationCountryChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getDestinationCountryChangeData")
    }

    async getDestinationWisePo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getDestinationWisePo")
    }

    async getSeasonWisePo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getSeasonWisePo")
    }

    async getPoAndQtyDashboard(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPoAndQtyDashboard", req)
    }

    async getPpmProductCodeForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmProductCodeForFactory")
    }

    async getPpmPoLineForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPoLineForFactory")
    }

    async getPpmColorDescForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmColorDescForFactory")
    }

    async getPpmCategoryDescForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmCategoryDescForFactory")
    }

    async getPpmDestinationCountryForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmDestinationCountryForFactory")
    }

    async getPpmPlantForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPlantForFactory")
    }

    async getPpmItemForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmItemForFactory")
    }

    async getPpmFactoryForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmFactoryForFactory")
    }
    async getPpmPoNumberForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPoNumberForFactory")
    }

    //-------------------------------------------------------------------------------------------->ppm marketing
    async updateFactoryStatusColumns(req?: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateFactoryStatusColumns", req)
    }

    async getPriceDifferenceReport(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPriceDifferenceReport", req)
    }

    async getPpmProductCodeForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmProductCodeForMarketing")
    }

    async getPpmPoLineForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPoLineForMarketing")
    }

    async getPpmColorDescForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmColorDescForMarketing")
    }
    async getPppoNumberForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPppoNumberForMarketing")
    }

    async getPpmCategoryDescForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmCategoryDescForMarketing")
    }

    async getPpmDestinationCountryForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmDestinationCountryForMarketing")
    }

    async getPpmPlantForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPlantForMarketing")
    }

    async getPpmItemForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmItemForMarketing")
    }

    async getPpmFactoryForMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmFactoryForMarketing")
    }

    async getOrderAcceptanceData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getOrderAcceptanceData", req)
    }
    async getdpomDataForBom(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getdpomDataForBom", req)
    }

    async getPpmProductCodeForOrderCreation(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmProductCodeForOrderCreation")
    }

    async getPpmPoLineForOrderCreation(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPoLineForOrderCreation")
    }

    async getPpmPoLineForNikeOrder(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPoLineForNikeOrder")
    }

    async getPriceDiffSizeDescription(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPriceDiffSizeDescription")
    }

    async getPriceDiffStyleNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPriceDiffStyleNumber")
    }

    async getPriceDiffPoLinedd(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPriceDiffPoLinedd")
    }

    async getPdfFileInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPdfFileInfo")
    }
    //--------------------------------------------------------------------------------------->fabric tracker
    async getFabricTrackerForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFabricTrackerForFactory")
    }

    async getFabricTrackerForItem(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFabricTrackerForItem")
    }

    async getFabricTrackerForProductCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFabricTrackerForProductCode")
    }

    async getFabricTrackerForStyleNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFabricTrackerForStyleNumber")
    }

    async getFabricTrackerForColorDesc(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFabricTrackerForColorDesc")
    }

    async getPpmDocTypeMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmDocTypeMarketing")
    }

    async getPpmPoLineItemNumberMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPoLineItemNumberMarketing")
    }

    async getPpmStyleNumberMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmStyleNumberMarketing")
    }

    async getPpmPlanningSeasonCodeMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPlanningSeasonCodeMarketing")
    }

    async getPpmPlanningSeasonYearMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPlanningSeasonYearMarketing")
    }

    async getPpmdesGeoCodeMarketing(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmdesGeoCodeMarketing")
    }

    async getDpomSyncDetails(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getDpomSyncDetails")
    }

    async getChangeComparision(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getChangeComparision", req)
    }

    async getCoLine(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getCoLine", req)
    }

    async getBuyerPo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getBuyerPo")
    }

    async getColineItem(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getColineItem")
    }

    async getColineOrderNo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getColineOrderNo")
    }

    async getPpmDocTypeForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmDocTypeForFactory")
    }

    async getPpmdesGeoCodeFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmdesGeoCodeFactory")
    }

    async getPpmPoLineNumberForFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPoLineNumberForFactory")
    }

    async getPpmStyleNumberFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmStyleNumberFactory")
    }

    async getPpmPlanningSeasonCodeFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPlanningSeasonCodeFactory")
    }

    async getPpmPlanningSeasonYearFactory(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPpmPlanningSeasonYearFactory")
    }

    async getStyleNumberForOrderCreation(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getStyleNumberForOrderCreation")
    }

    async downloadPPMMArketingExcel(req?: PpmDateFilterRequest) {
        return this.axiosGetCall(this.dpomController + "/downloadPPMReportExcel")
    }

    async updateItemNo(payload?: ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateItemNo", payload)
    }

    async deleteCoLine(payload?: ItemNoDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/deleteCoLine", payload)
    }

    async updateDomItme(payload?:ItemNoDto[]): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateDomItme",payload)
    }
    
    async updateBomItems(payload?:BomItemReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateBomItems",payload)
    }
    
    async getStyleNumberForItemUpdate(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getStyleNumberForItemUpdate")
    }
}

