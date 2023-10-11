import { CommonAxiosService } from "../common-axios-service-prs";
import {FabricDevelopmentRequestModel, FabricDevelopmentRequestResponse, FabricFilterRequest } from '@project-management-system/shared-models';


export class FabricDevelopmentService extends CommonAxiosService{
URL = '/FabricDevelopment';
URL = '/FabricDevelopment';


async createFabricDevelopmentRequest(req: FabricDevelopmentRequestModel): Promise<FabricDevelopmentRequestResponse> {
    return this.axiosPostCall(this.URL + "/createFabricDevelopmentRequest", req)
}
        
async getAllitemsCode(): Promise<any> {
    const dummyMapItemsData = [
        { itemsCode: 'IT001', description: 'Red color ',itemsId: 1 },
        { itemsCode: 'IT002', description: 'combination of green and black color',itemsId: 2 },
        { itemsCode: 'IT003', description: 'black color garment',itemsId: 3 },
        { itemsCode: 'IT004', description: 'others ',itemsId: 4 },

    
      ];
      return dummyMapItemsData
    
}

async getAllMapItems(req?: FabricFilterRequest): Promise<any> {
  console.log(req,"989898")
  const dummyMapItemsData = [
      { itemsCode: 'IT001', description: 'Red color ', itemsId: 1 },
      { itemsCode: 'IT002', description: 'combination of green and black color', itemsId: 2 },
      { itemsCode: 'IT003', description: 'black color garment', itemsId: 3 },
      { itemsCode: 'IT004', description: 'others ', itemsId: 4 },
  ]

  if (req) {
      const filteredItems = dummyMapItemsData.filter(item => item.itemsId === req.itemsId[0]);
      return filteredItems;
  }

  return dummyMapItemsData;


}
// async getAllMapItems(req?: FabricFilterRequest): Promise<any> {
//   console.log(req, "989898");
//   const dummyMapItemsData = [
//     { itemsCode: 'IT001', description: 'Red color ', itemsId: 1 },
//     { itemsCode: 'IT002', description: 'combination of green and black color', itemsId: 2 },
//     { itemsCode: 'IT003', description: 'black color garment', itemsId: 3 },
//     { itemsCode: 'IT004', description: 'others ', itemsId: 4 },
//   ];

//   if (req && req.length > 0) {
//     const filteredItems = dummyMapItemsData.filter(item => req.includes(item.itemsId));
//     return filteredItems;
//   }

//   return dummyMapItemsData;
// }





async getAll(): Promise<any> {
    // const dummyData = [
    //           {
    //         locationId:1,
    //         location:'vizag',
    //         PCH:'pch',
    //         requestNo:4615,
    //         buyer:'raj',
    //         fabricType:'Cotton',
    //         fabricResponsible:'fabric',
    //         qualities:[
    //             { 
    //                 qualityName:'Quality1',
    //                 placement:'Body Fabric',
    //                 width:20,
    //                 faabricDescription:'floral Print',
    //                 fabricCode:'FAB00956',
    //                 fabInfo:[
    //                     {
    //                         style:'ST0003', 
    //                         color:'red', 
    //                         garmentQty:'T-Shirt',
    //                         consumption:20,
    //                         wastage:30,
    //                         fabricQuantity:10,
    //                         uom:'kgs',
    //                         items :[ 
    //                             {
    //                             itemCode:'IO2025',
    //                             description:'item'
    //                             },
    //                             {
    //                                 itemCode:'IO2417',
    //                                 description:'item13'
    //                                 },
    //                         ]
    //                     },
    //                     {
    //                         style:'ST0003', 
    //                         color:'white', 
    //                         garmentQty:'T-Shirt',
    //                         consumption:15,
    //                         wastage:30,
    //                         fabricQuantity:20,
    //                         uom:'kgs',
    //                         items :[ 
    //                             {
    //                             itemCode:'IO2452',
    //                             description:'item'
    //                             },
    //                             {
    //                                 itemCode:'IO2413',
    //                                 description:'item14'
    //                                 },
    //                         ]

    //                     }
    //                 ]
    //             },
    //             { 
    //                 qualityName:'Quality2',
    //             placement:'',
    //             width:30,
    //               faabricdescription:'Abstract Print',
    //                 fabricCode:'FAB00623',
    //             fabInfo:[
    //                 {
    //                     style:'ST0035', 
    //                     color:'green', 
    //                     garmentQty:'Shirt',
    //                     consumption:30,
    //                     wastage:20,
    //                     fabricQuantity:10,
    //                     uom:'kgs',
    //                         items :[ 
    //                             {
    //                             itemCode:'IO2051',
    //                             description:'item4'
    //                             },
    //                             {
    //                                 itemCode:'IO251',
    //                                 description:'item3'
    //                                 },
    //                         ]
    //                 },
    //                 {
    //                     style:'ST0035', 
    //                     color:'black', 
    //                     garmentQty:'Shirt',
    //                     consumption:30,
    //                     wastage:20,
    //                     fabricQuantity:10,
    //                     uom:'kgs',
    //                     items :[ 
    //                         {
    //                         itemCode:'IO252',
    //                         description:'item9'
    //                         },
    //                         {
    //                             itemCode:'IO2412',
    //                             description:'item12'
    //                             },
    //                     ]
    //                 }
    //             ]
    //         }
    //         ]
    //     },
    //     {
    //         locationId:2,
    //         location:'vijaywada',
    //         PCH:'pch',
    //         requestNo:48854,
    //         buyer:'sai',
    //         fabricType:'Arcylic Silk',
    //         fabricResponsible:'fabric',
    //         qualities:[
    //             { 
    //                 qualityName:'Quality1',
    //                 placement:'Back Left',
    //                 innerWidth:40,
    //                 faabricdescription:'floral Print',
    //                 fabricCode:'FAB00541',
    //                 fabInfo:[
    //                     {
    //                         style:'Pant41', 
    //                         color:'red', 
    //                         garmentQty:'Denim Pant',
    //                         consumption:20,
    //                         wastage:30,
    //                         fabricQuantity:10,
    //                         uom:'kgs',
    //                         items :[ 
    //                             {
    //                             itemCode:'IO2024',
    //                             description:'item5'
    //                             },
    //                             {
    //                                 itemCode:'IO2419',
    //                                 description:'item14'
    //                                 },
    //                         ]
    //                     },
    //                     {
    //                         style:'Pant52', 
    //                         color:'white', 
    //                         garmentQtyQty:'Jogger',
    //                         consumption:20,
    //                         wastage:30,
    //                         fabricQuantity:10,
    //                         uom:'kgs',
    //                         items :[ 
    //                             {
    //                             itemCode:'IO2048',
    //                             description:'item8'
    //                             },
    //                             {
    //                                 itemCode:'IO2505',
    //                                 description:'ite51'
    //                                 },
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //             qualityName:'Quality2',
    //             placement:'Above Pocket',
    //             innerWidth:30,
    //             faabricdescription:'floral Print',
    //             fabricCode:'FAB00874',
    //             fabInfo:[
    //                 {
    //                     style:'ST0041', 
    //                     color:'green', 
    //                     garmentQty:'Trouser',
    //                     consumption:20,
    //                         wastage:30,
    //                         fabricQuantity:10,
    //                         uom:'kgs', 
    //                         items :[ 
    //                             {
    //                             itemCode:'IO2541',
    //                             description:'item1'
    //                             },
    //                             {
    //                                 itemCode:'IO2805',
    //                                 description:'item2'
    //                                 },
    //                             ]
    //                 },
    //                 {
    //                     style:'ST0035', 
    //                     color:'black', 
    //                     garmentQty:'Shirt',
    //                     consumption:20,
    //                         wastage:30,
    //                         fabricQuantity:10,
    //                         uom:'kgs',   
    //                         items :[ 
    //                             {
    //                             itemCode:'IO27221',
    //                             description:'item1'
    //                             },
    //                             {
    //                                 itemCode:'IO20885',
    //                                 description:'item2'
    //                                 },
    //                             ]
    //                 }
    //             ]
    //             }
    //         ]
    //     }
        
       
    
    //   ];
    //   console.log(dummyData,'service')
    //   return dummyData
    
}
    
async getFabricDevReqData(): Promise<any> {
    return this.axiosPostCall(this.URL + "/getFabricDevReqData")
  }
           

}