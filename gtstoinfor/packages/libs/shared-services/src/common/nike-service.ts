import { CommonResponseModel, DiaPDFModel, DpomApproveRequest, PpmDateFilterRequest } from "@project-management-system/shared-models";
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

    async getCountForDivertReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getCountForDivertReport")
    }

    async getPlantWisePoOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPlantWisePoOrders")
    }

    async getStatusWiseItems(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getStatusWiseItems")
    }

    async getOrderAcceptanceData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getOrderAcceptanceData")
    }

    async approveDpomLineItemStatus(req: DpomApproveRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/approveDpomLineItemStatus", req)
    }

    async getTotalItemQtyChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getTotalItemQtyChangeData")
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
    async getFabricTrackerReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getFabricTrackerReport")
    }

    async saveDiaPDFFields(req: DiaPDFModel): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/saveDiaPDFFields", req)
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

    async getVasTextChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getVasTextChangeData")
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
    //---------------------------------------------------------------------------------------->factory
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
    //-------------------------------------------------------------------------------------------->ppm marketing
    async updateFactoryStatusColumns(req?: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/updateFactoryStatusColumns", req)
    }

    async getPriceDifferenceReport(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.dpomController + "/getPriceDifferenceReport")
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
///----------------------------------------------------------------------------------------------------->fabric tracker report
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
}   