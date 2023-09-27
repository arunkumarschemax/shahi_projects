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

async getAllOperation(itemsId:number): Promise<any> {

  const data = [
    {itemCode:"IT001", itemsId: 11, operation:[{operationName:"Sewing In"},{operationName:"Sewing Out"},{operationName:"Washing"},{operationName:"Packing"}],sequence:[1,2,3,4]},
    {itemCode:"IT002", itemsId: 12, operation:[{operationName:"Sewing In"},{operationName:"Sewing Out"},{operationName:"Washing"},{operationName:"Packing"}],sequence:[1,2,3,4]},
    {itemCode:"IT003", itemsId: 13, operation:[{operationName:"Sewing In"},{operationName:"Sewing Out"},{operationName:"Packing"}],sequence:[1,2,3]},
    {itemCode:"IT004", itemsId: 14, operation:[{operationName:"Sewing In"},{operationName:"Sewing Out"},{operationName:"Washing"},{operationName:"Packing"}],sequence:[1,2,3,4]},

    ]


  if (itemsId) {
      const filteredItems = data.filter(item => item.itemsId === itemsId);
      return filteredItems;
  } else if (itemsId === undefined) {
    return []
  }

  return data;
}



async getAllOperationData(itemsId: number, operationName: string): Promise<any> {
    const data = [
        {  itemsId: 11, operationName: "Sewing In" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 11, operationName: "Sewing Out" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 11, operationName: "Washing" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 11, operationName: "Packing" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 12, operationName: "Sewing In" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 12, operationName: "Sewing Out" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 12, operationName: "Washing" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 12, operationName: "Packing" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 13, operationName: "Sewing In" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 13, operationName: "Sewing Out" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        // {  itemsId: 13, operationName: "Washing" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 13, operationName: "Packing" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 14, operationName: "Sewing In" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 14, operationName: "Sewing Out" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 14, operationName: "Washing" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
        {  itemsId: 14, operationName: "Packing" ,SKUinfo: [{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "50"},{SKUcode: "SKU001",SKUId:1, color: "blue",colorId:2, size: "S",sizeId:1, destination: "USA",destinationId:1, style: "STY001",StyleId:1, quantity: "70"}] },
       
    ] 
    if (itemsId && operationName ) {
                 const filteredItems = data.filter(item => item.itemsId === itemsId &&  item.operationName === operationName );
                    return filteredItems;
                } else if (itemsId === undefined) {
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