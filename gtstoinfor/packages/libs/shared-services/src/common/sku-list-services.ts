import { CommonAxiosService } from "../common-axios-service-prs";
import { SKUlistFilterRequest } from "@project-management-system/shared-models";

export class SKUlistService extends CommonAxiosService{
URL = '/sku-list';



async getAllitemsCode():Promise<any>{
    const mockItemData=[
        {
            itemsNo:'IT001',
            itemNoId:1,

            skus:[
                {
                    skuId: 'SKU001',
                     sizes:'S',
                     sizeId:1,
                     destinations: 'Domestic',
                     colour: 'Red',
                     colourId:2, 
                     destinationId:1, 
                },
            
            ]
        },
        {
            itemsNo:'IT002',
            itemNoId:2,
            skus:[
                {
                    skuId: 'SKU02',
                     sizes:'L',
                     sizeId:2,
                     destinations: 'Domestic',
                     colour: 'Blue',
                     colourId:3, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU03',
                     sizes:'S',
                     sizeId:1,
                     destinations: 'Domestic',
                     colour: 'White',
                     colourId:1, 
                     destinationId:1, 
                },
            ]

        },
        {
            itemsNo:'IT003',
            itemNoId:3,
            skus:[
                {
                    skuId: 'SKU04',
                     sizes:'L',
                     sizeId:2,
                     destinations: 'Domestic',
                     colour: 'Brown',
                     colourId:3, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU05',
                     sizes:'S',
                     sizeId:1,
                     destinations: 'India',
                     colour: 'White',
                     colourId:1, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU06',
                     sizes:'XL',
                     sizeId:2,
                     destinations: 'Domestic',
                     colour: 'Black',
                     colourId:3, 
                     destinationId:1, 
                },
            ]

        },
        {
            itemsNo:'IT004',
            itemNoId:4,
            skus:[
                {
                    skuId: 'SKU07',
                     sizes:'L',
                     sizeId:2,
                     destinations: 'Domestic',
                     colour: 'Brown',
                     colourId:3, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU08',
                     sizes:'XS',
                     sizeId:1,
                     destinations: 'India',
                     colour: 'White',
                     colourId:1, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU09',
                     sizes:'XXL',
                     sizeId:2,
                     destinations: 'Usa',
                     colour: 'Pink',
                     colourId:3, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU010',
                     sizes:'XXL',
                     sizeId:2,
                     destinations: 'Uk',
                     colour: 'Pink',
                     colourId:3, 
                     destinationId:1, 
                },
            ]

        }
    ]
    return  mockItemData
}
async getAllMapItems(req?: SKUlistFilterRequest): Promise<any> {
    const dummyMapItemsNo = [
        {
            itemsNo:'IT001',
            itemNoId:1,

            skus:[
                {
                    skuId: 'SKU001',
                     sizes:'L',
                     sizeId:1,
                     destinations: 'Domestic',
                     colour: 'Red',
                     colourId:2, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU002',
                     sizes:'S',
                     sizeId:1,
                     destinations: 'Domestic',
                     colour: 'White',
                     colourId:1, 
                     destinationId:1, 
                },
            ]

        },
        {
            itemsNo:'IT002',
            itemNoId:2,

            skus:[
                {
                    skuId: 'SKU031',
                     sizes:'L',
                     sizeId:2,
                     destinations: 'Domestic',
                     colour: 'Black',
                     colourId:3, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU032',
                     sizes:'S',
                     sizeId:1,
                     destinations: 'Domestic',
                     colour: 'White',
                     colourId:1, 
                     destinationId:1, 
                },
            ]

        },
        {
            itemsNo:'IT003',
            itemNoId:3,
            skus:[
                {
                    skuId: 'SKU04',
                     sizes:'L',
                     sizeId:2,
                     destinations: 'Domestic',
                     colour: 'Brown',
                     colourId:3, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU05',
                     sizes:'S',
                     sizeId:1,
                     destinations: 'India',
                     colour: 'White',
                     colourId:1, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU06',
                     sizes:'XL',
                     sizeId:2,
                     destinations: 'Domestic',
                     colour: 'Black',
                     colourId:3, 
                     destinationId:1, 
                },
            ]

        },
        {
            itemsNo:'IT004',
            itemNoId:4,
            skus:[
                {
                    skuId: 'SKU07',
                     sizes:'L',
                     sizeId:2,
                     destinations: 'Domestic',
                     colour: 'Brown',
                     colourId:3, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU08',
                     sizes:'XS',
                     sizeId:1,
                     destinations: 'India',
                     colour: 'White',
                     colourId:1, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU09',
                     sizes:'XXL',
                     sizeId:2,
                     destinations: 'Usa',
                     colour: 'Pink',
                     colourId:3, 
                     destinationId:1, 
                },
                {
                    skuId: 'SKU010',
                     sizes:'XXL',
                     sizeId:2,
                     destinations: 'Uk',
                     colour: 'Pink',
                     colourId:3, 
                     destinationId:1, 
                },
            ]

        }


    ]
    console.log(req,'popopopopopo')
    if (req !== undefined) {
        console.log('dfghjkl',req.itemNoId)
        const filteredItems = dummyMapItemsNo.filter(item => String(item.itemNoId )=== String(req.itemNoId[0]));
                console.log(filteredItems,'ijijjjjj')
    
        return filteredItems;
      }
  return dummyMapItemsNo;


}

           

}



//   if (req) {
//       const filteredItems = dummyMapItemsNo.filter(item => item.itemNoId === req.itemNoId[0]);
//       return filteredItems;
//   }