import { CommonResponseModel, FileIdReq, FileTypeDto, SaveOrderDto, YearReq } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"
import axios from "axios";

export class OrdersService extends CommonAxiosService {
    private ordersController = "/orders"

    async saveOrder(data: any, id: number, month: any): Promise<CommonResponseModel> {
        console.log(month)
        const idn = id;
        const montId = month
        const url = `/orders/saveOrder/${idn}/${montId}`;
        return this.axiosPostCall(url, data);
    }

    async getOrdersData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getOrdersData")
    }

    async getQtyChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyChangeData")
    }

    async getQtyDifChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getQtyDifChangeData")
    }

    async getContractDateChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getContractDateChangeData")
    }

    async getWharehouseDateChangeData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getWharehouseDateChangeData")
    }

    async getUnitWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getUnitWiseOrders")
    }

    async getDivisionWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getDivisionWiseOrders")
    }

    async getMaximumChangedOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMaximumChangedOrders")
    }

    // async fileUpload(file: any): Promise<CommonResponseModel> {
    //     return await this.axiosPostCall(this.ordersController + '/fileUpload', file);
    // }

    async fileUpload(file: any, month: number,fileType:string): Promise<CommonResponseModel> {
        const monthId = month;
        const url = `/orders/fileUpload/${monthId}/${fileType}`;
        return this.axiosPostCall(url, file);
    }

    async updateFileStatus(req: any): Promise<CommonResponseModel> {
        return await this.axiosPostCall(this.ordersController + '/updateFileStatus', req);
    }

    async getUploadFilesData(req?:FileTypeDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getUploadFilesData",req)
    }

    async revertFileData(req: FileIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/revertFileData", req)
    }

    async getVersionWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getVersionWiseData")
    }

    async getPhaseWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getPhaseWiseData")
    }

    async getPhaseWiseExcelData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getPhaseWiseExcelData")
    }

    async getMonthlyPhaseWiseExcelData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMonthlyPhaseWiseExcelData")
    }

    async getAllLatestFileMonthWisedata(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getAllLatestFileMonthWisedata")
    }

    async getMonthWiseData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getMonthWiseData")

    }
     async getTrimOrdersData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getTrimOrdersData")
    }
    async createCOline(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/createCOline", req)
    }
    async getAll(req:YearReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryMonthData",req)
    }
    async getExfactoryYearData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getExfactoryYear")
    }
    // async getAll(): Promise<any> {
    //     const data=[
    //         {
    //         year:2023,
    //         yearlyData:[  
    //         {
    //             itemName:'item2',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:84517,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:0,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:852,
    //                             decPcs:0
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:0,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:0,
    //                             sepCoeff:652,
    //                             octCoeff:0,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                      data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:0,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:0,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:0,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:0,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //           {
    //             itemName:'item4',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:0,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:0,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:0,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:0,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:0,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:0,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:0,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:0,
    //                             febPcs:52,
    //                             marPcs:0,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:0,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:0,
    //                             octPcs:965,
    //                             novPcs:0,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:0,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:0,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:0,
    //                             sepCoeff:956,
    //                             octCoeff:0,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             itemName:'item2',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:0,
    //                             marPcs:475,
    //                             aprPcs:0,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:0,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:0,
    //                             novPcs:852,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:0,
    //                             julCoeff:78,
    //                             augCoeff:0,
    //                             sepCoeff:652,
    //                             octCoeff:0,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                      data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:0,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:0,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:0,
    //                             aprCoeff:958,
    //                             mayCoeff:0,
    //                             junCoeff:985,
    //                             julCoeff:0,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:0,
    //                             novCoeff:8956,
    //                             decCoeff:0
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //           {
    //             itemName:'item5',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:0,
    //                             marPcs:475,
    //                             aprPcs:0,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:0,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:0,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:0,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:0,
    //                             julCoeff:78,
    //                             augCoeff:0,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:0,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:0,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:0,
    //                             sepPcs:965,
    //                             octPcs:0,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]},
    //        {
    //         year:2025,
    //         yearlyData:[  
    //         {
    //             itemName:'item3',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:852,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:966,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                      data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //           {
    //             itemName:'item6',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:852,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:966,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             itemName:'item7',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:852,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:966,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                      data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //           {
    //             itemName:'item8',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:852,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:966,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]},
        
    //     {
    //         year:2024,
    //         yearlyData:[  
    //         {
    //             itemName:'item9',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:0,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:525,
    //                             sepPcs:0,
    //                             octPcs:7412,
    //                             novPcs:8527,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:12,
    //                             julCoeff:787,
    //                             augCoeff:966,
    //                             sepCoeff:652,
    //                             octCoeff:66374,
    //                             novCoeff:78574,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                      data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //           {
    //             itemName:'item10',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:852,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:966,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             itemName:'item11',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'All Phases',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:852,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:966,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH3',
    //                      data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //           {
    //             itemName:'item12',
    //             monthWiseData:[
    //                 {
    //                     phasetype:'PH4',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:8451,
    //                             febPcs:512,
    //                             marPcs:475,
    //                             aprPcs:87452,
    //                             mayPcs:41,
    //                             junPcs:741,
    //                             julPcs:85421,
    //                             augPcs:52,
    //                             sepPcs:41,
    //                             octPcs:7412,
    //                             novPcs:852,
    //                             decPcs:952
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:85412,
    //                             febCoeff:85,
    //                             marCoeff:8956,
    //                             aprCoeff:96,
    //                             mayCoeff:786,
    //                             junCoeff:12,
    //                             julCoeff:78,
    //                             augCoeff:966,
    //                             sepCoeff:652,
    //                             octCoeff:663,
    //                             novCoeff:785,
    //                             decCoeff:632
    //                         }
    //                     ]
    //                 },
    //                    {
    //                     phasetype:'PH1',
    //                     data:[
    //                         {
    //                             name:'In Pcs',
    //                             janPcs:855,
    //                             febPcs:52,
    //                             marPcs:5962,
    //                             aprPcs:96,
    //                             mayPcs:7856,
    //                             junPcs:963,
    //                             julPcs:12,
    //                             augPcs:32,
    //                             sepPcs:965,
    //                             octPcs:965,
    //                             novPcs:7852,
    //                             decPcs:85
    //                         },
    //                         {
    //                             name:'In Coeff',
    //                             janCoeff:8754,
    //                             febCoeff:859,
    //                             marCoeff:85,
    //                             aprCoeff:958,
    //                             mayCoeff:52653,
    //                             junCoeff:985,
    //                             julCoeff:96562,
    //                             augCoeff:6952,
    //                             sepCoeff:956,
    //                             octCoeff:8956,
    //                             novCoeff:8956,
    //                             decCoeff:856
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]},
    //     ]      
    //       return data
    //     // return this.axiosPostCall(this.ordersController + "/getMonthWiseData")
    // }
    async saveTrimOrder(data: any, id: number, month: any): Promise<CommonResponseModel> {
        console.log(month)
        const idn = id;
        const montId = month
        const url = `/orders/saveTrimOrder/${idn}/${montId}`;
        return this.axiosPostCall(url, data);
    }

    async seasonWiseReport():Promise<CommonResponseModel>{
        return this.axiosPostCall(this.ordersController + "/seasonWiseReport")
    }

    async getSeasonWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getSeasonWiseOrders")
    }

    async getYearWiseOrders(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/getYearWiseOrders")
    }

}