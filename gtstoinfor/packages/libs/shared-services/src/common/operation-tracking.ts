import { OperationFilterModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export class OperationTrackingService extends CommonAxiosService{
URL = '/operation-tracking';



        
async getAllitemsCode(): Promise<any> {
    const dummyMapItemsData = [
        { itemsCode: 'IT001', description: 'Red color ',itemsId: 1 },
        { itemsCode: 'IT002', description: 'combination of green and black color',itemsId: 2 },
        { itemsCode: 'IT003', description: 'combination of green and black color',itemsId: 3 },
        { itemsCode: 'IT004', description: 'combination of green and black color',itemsId: 4 },

        
      ];
      return dummyMapItemsData
    
}

async getAllOperation(req:OperationFilterModel): Promise<any> {

  const data = [
    {itemCode:"IT001", itemsId: 1, operation:[{operationName:"Garment stitching"},{operationName:"Stitching Alteration"}],sequence:[1,2]},
    {itemCode:"IT002", itemsId: 2, operation:[{operationName:"Cutting1"},{operationName:"Cutting2"}],sequence:[1,2]},
    {itemCode:"IT003", itemsId: 3, operation:[{operationName:"Embroidery"},{operationName:"Embroidery1"}],sequence:[1,2]},
    {itemCode:"IT004", itemsId: 4, operation:[{operationName:"Stitching"},{operationName:"Cutting"},{operationName:"Packing"}],sequence:[1,2]},

    ]


  if (req.itemsId) {
      const filteredItems = data.filter(item => item.itemsId ===req.itemsId);
      return filteredItems;
  } else if (req.itemsId === undefined) {
    return []
  }

  return data;
}

 

async getAllOperationData(req:OperationFilterModel): Promise<any> {
    const data = [
        {  itemsId: 1, operationName: "Garment stitching" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 1, operationName: "Stitching Alteration" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
       
    ] 
    if (req. itemsId && req.operationName ) {
                 const filteredItems = data.filter(item => item.itemsId === req.itemsId &&  item.operationName === req.operationName );
                    return filteredItems;
                } else if (req.itemsId === undefined) {
                  return []
                }
    return data;
}

}

// async getOperationReportingData(): Promise<OperationReportingResponseModel> {
//   // return this.axiosPostCall(this.URL + "/getOperationReportingData", req)
//   return({status: true, errorCode: 11208, internalMessage: "success",
//   data:[{'jobNumber' : 'J001','skuCode' : 'S001','poNumber' : 'P001','issuedQuantity' : 500},
//   {'jobNumber' : 'J002','skuCode' : 'S002','poNumber' : 'P002','issuedQuantity' : 600},
//   {'jobNumber' : 'J003','skuCode' : 'S003','poNumber' : 'P003','issuedQuantity' : 1000},
//   {'jobNumber' : 'J004','skuCode' : 'S004','poNumber' : 'P004','issuedQuantity' : 200},
//   {'jobNumber' : 'J005','skuCode' : 'S005','poNumber' : 'P005','issuedQuantity' : 400},
//   {'jobNumber' : 'J006','skuCode' : 'S006','poNumber' : 'P006','issuedQuantity' : 300},
//     ]})
//     
//   }