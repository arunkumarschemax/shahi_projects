import { CommonAxiosService } from "../common-axios-service-prs";
import { FabricFilterRequest } from '@project-management-system/shared-models';


export class FabricDevelopmentService extends CommonAxiosService{
URL = '/fabric-development';



        
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







           

}