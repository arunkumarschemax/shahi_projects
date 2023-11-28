import { CommonResponseModel, OperationReportingRequest, OperationReportingResponseModel, OperationTrackingDto, TabNameReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class OperationReportingService extends CommonAxiosService{
  URL = "/operation-inventory";

  async createOperationReporting(req: OperationTrackingDto): Promise<OperationReportingResponseModel> {
    
    console.log('++++++++++++++++++++++++++')
    return this.axiosPostCall(this.URL + "/createOperationReporting", req)
  }
  async reportOperation(req: OperationTrackingDto): Promise<OperationReportingResponseModel> {
    
    console.log('++++++++++++++++++++++++++')
    return this.axiosPostCall(this.URL + "/reportOperation", req)
  }
  

  async getOperationInventoryData(req: TabNameReq): Promise<CommonResponseModel>{
    return this.axiosPostCall(this.URL + "/getOperationInventoryData",req)
  }

  async getReportedOperations(req: TabNameReq): Promise<CommonResponseModel>{
    return this.axiosPostCall(this.URL + "/getReportedOperations",req)
  }
  

  async getOperationReportingData(req:TabNameReq): Promise<OperationReportingResponseModel> {
    // return this.axiosPostCall(this.URL + "/getOperationReportingData", req)
    if(req.tabName == 'Cutting'){
      return({status: true, errorCode: 11208, internalMessage: "success",
      data:[{'jobNumber' : 'J001','skuCode' : 'S001','poNumber' : 'P001','issuedQuantity' : 500},
      {'jobNumber' : 'J002','skuCode' : 'S002','poNumber' : 'P002','issuedQuantity' : 600},
      {'jobNumber' : 'J003','skuCode' : 'S003','poNumber' : 'P003','issuedQuantity' : 1000},
      // {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200},
      // {'jobNumber' : 'J005','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400},
      // {'jobNumber' : 'J006','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300},
      ]})
    } 
    else if(req.tabName == 'Sewing In'){
      return({status: true, errorCode: 11208, internalMessage: "success",
      data:[
      {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200},
      {'jobNumber' : 'J005','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400},
      {'jobNumber' : 'J006','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300},
      ]})
    } else if(req.tabName == 'Sewing Out'){
      return({status: true, errorCode: 11208, internalMessage: "success",
      data:[
      {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200},
      {'jobNumber' : 'J007','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400},
      {'jobNumber' : 'J009','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300},
      ]})
    } else if(req.tabName == 'Washing'){
      return({status: true, errorCode: 11208, internalMessage: "success",
      data:[
      {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200},
      {'jobNumber' : 'J007','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400},
      {'jobNumber' : 'J009','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300},
      ]})
    }else if(req.tabName == 'Packing'){
      return({status: true, errorCode: 11208, internalMessage: "success",
      data:[
      {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200},
      {'jobNumber' : 'J007','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400},
      {'jobNumber' : 'J009','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300},
      ]})
    }
    else{
      return({status: false, errorCode: 11208, internalMessage: "error",
      })
    }
  }

  async getOperationWiseData(req:TabNameReq): Promise<OperationReportingResponseModel> {
    // return this.axiosPostCall(this.URL + "/getOperationReportingData", req)
    if(req.tabName == 'Cutting'){
      return({status: true, errorCode: 11208, internalMessage: "success",
      data:[{'jobNumber' : 'J001','skuCode' : 'S001','poNumber' : 'P001','issuedQuantity' : 500,'inventory': 500,'style':'WV34D103','styleDescription':'ROLL CUFFSHORT','rejectedQuantity':50},
      {'jobNumber' : 'J002','skuCode' : 'S002','poNumber' : 'P002','issuedQuantity' : 600,'inventory': 500,'style':'WV34D103','styleDescription':'ROLL CUFFSHORT','rejectedQuantity':0},
      {'jobNumber' : 'J003','skuCode' : 'S003','poNumber' : 'P003','issuedQuantity' : 1000,'inventory': 500,'style':'WV34D103','styleDescription':'ROLL CUFFSHORT','rejectedQuantity':0},
      // {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200},
      // {'jobNumber' : 'J005','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400},
      // {'jobNumber' : 'J006','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300},
      ]})
    } 
    else if(req.tabName == 'Sewing In'){
      return({status: true, errorCode: 11208, internalMessage: "success",
      data:[
      {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200,'inventory': 500,'style':'WV34D103','styleDescription':'ROLL CUFFSHORT','rejectedQuantity':0},
      {'jobNumber' : 'J005','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400,'inventory': 500,'style':'WV34D104','styleDescription':'Bagee phant','rejectedQuantity':0},
      {'jobNumber' : 'J006','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300,'inventory': 500,'style':'WV34D104','styleDescription':'Bagee phant','rejectedQuantity':100},
      ]})
    } else if(req.tabName == 'Sewing Out'){
      return({status: true, errorCode: 11208, internalMessage: "success",
      data:[
      {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200,'inventory': 500,'style':'WV34D104','styleDescription':'Bagee phant','rejectedQuantity':0},
      {'jobNumber' : 'J007','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400,'inventory': 500,'style':'WV34D104','styleDescription':'Bagee phant','rejectedQuantity':0},
      {'jobNumber' : 'J009','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300,'inventory': 500,'style':'WV34D104','styleDescription':'Bagee phant','rejectedQuantity':0},
      ]})
    }
    else{
      return({status: false, errorCode: 11208, internalMessage: "error",
      })
    }
  }

}