import { CommonAxiosService } from "../common-axios-service-prs";
import { SKUlistFilterRequest } from "@project-management-system/shared-models";

export class SKUlistService extends CommonAxiosService{
URL = '/sku-list';



        
// async getAllitemsCode(): Promise<any> {
//     console.log
//     const dummyMapItemsNo = [
//         { itemsNo: 'IT001', size: 'XL', sizeId:'1',colour:'Red color ',colourId:'1',destinations:'India',destinationId:'1',itemNoId:1,skus: ['SKU001', 'SKU002']},
//         { itemsNo: 'IT001', size: 'L', sizeId:'2',colour:'Combination of green and black color',colourId:'2',destinationId:'2',destinations: 'Canada' ,itemNoId:2,skuId:'SKU003'},
//         { itemsNo: 'IT003', size: 'M',sizeId:'3', colour: 'Black color garment',colourId:'3',destinations: 'India' ,destinationId:'3',itemNoId:3,skuId:'SKU00'},
//         { itemsNo: 'IT004', size: 'S ',sizeId:'4',colour:'Blue',colourId:'4',destinations: 'USA',destinationId:'4',itemNoId:4,skuId:'SKU004' },
    
//       ];
//       return dummyMapItemsNo
    
// }


async getAllitemsCode():Promise<any>{
    const mockItemData=[
        {
            itemsNo:'IT001',
            skus:[
                {
                    skuId: 'SKU001',
                     sizes: ['S'],
                     sizeId:['1'],
                     destinations: ['Domestic'],
                     colour: ['Red'],
                     colourId:['2'], 
                     destinationId:['1'], 
                     itemNoId:[1]
                },
                {
                    skuId: 'SKU001',
                     sizes: ['S'],
                     sizeId:['1'],
                     destinations: ['Domestic'],
                     colour: ['Red'],
                     colourId:['2'], 
                     destinationId:['1'], 
                     itemNoId:[1]

                }
            ]

        }
    ]
    return  mockItemData
}
async getAllMapItems(req?: SKUlistFilterRequest): Promise<any> {
    console.log(req,'popopopopopo')
    const dummyMapItemsNo = [
        {
            itemsNo:'IT001',
            skus:[
                {
                    skuId: 'SKU001',
                     sizes: ['S'],
                     sizeId:['1'],
                     destinations: ['Domestic'],
                     colour: ['Red'],
                     colourId:['2'], 
                     destinationId:['1'], 
                     itemNoId:[1]
                },
                {
                    skuId: 'SKU001',
                     sizes: ['S'],
                     sizeId:['1'],
                     destinations: ['Domestic'],
                     colour: ['Red'],
                     colourId:['2'], 
                     destinationId:['1'], 
                     itemNoId:[1]

                }
            ]

        }
    ]

//   if (req) {
//       const filteredItems = dummyMapItemsNo.filter(item => item.itemNoId === req.itemNoId[0]);
//       return filteredItems;
//   }

  
if (req && req.itemsNo) {
    const filteredItems = dummyMapItemsNo.filter(item => String(item.itemsNo) === String(req.itemNoId));
    return filteredItems;
  }


  return dummyMapItemsNo;


}








           

}