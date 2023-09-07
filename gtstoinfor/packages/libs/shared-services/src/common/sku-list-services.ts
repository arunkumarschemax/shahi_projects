import { CommonAxiosService } from "../common-axios-service-prs";
import { SKUlistFilterRequest } from "@project-management-system/shared-models";

export class SKUlistService extends CommonAxiosService{
URL = '/sku-list';



        
async getAllitemsCode(): Promise<any> {
    const dummyMapItemsNo = [
        { itemsNo: 'IT001', size: 'XL', sizeId:'1',colour:'Red color ',colourId:'1',destinations:'India',destinationId:'1',itemNoId:'1'},
        { itemsNo: 'IT002', size: 'L', sizeId:'2',colour:'Combination of green and black color',colourId:'2',destinationId:'2',destinations: 'Canada' ,itemNoId:'2'},
        { itemsNo: 'IT003', size: 'M',sizeId:'3', colour: 'Black color garment',colourId:'3',destinations: 'India' ,destinationId:'3',itemNoId:'3'},
        { itemsNo: 'IT004', size: 'S ',sizeId:'4',colour:'Blue',colourId:'4',destinations: 'USA',destinationId:'4',itemNoId:'4' },
    
      ];
      return dummyMapItemsNo
    
}

async getAllMapItems(req?: SKUlistFilterRequest): Promise<any> {
  const dummyMapItemsNo = [
    { itemsNo: 'IT001', size: 'XL', sizeId:'1',colour:'Red color ',colourId:'1',destinations:'India',destinationId:'1',itemNoId:'1'},
        { itemsNo: 'IT002', size: 'L', sizeId:'2',colour:'Combination of green and black color',colourId:'2',destinationId:'2',destinations: 'Canada' ,itemNoId:'2'},
        { itemsNo: 'IT003', size: 'M',sizeId:'3', colour: 'Black color garment',colourId:'3',destinations: 'India' ,destinationId:'3',itemNoId:'3'},
        { itemsNo: 'IT004', size: 'S ',sizeId:'4',colour:'Blue',colourId:'4',destinations: 'USA',destinationId:'4',itemNoId:'4' },
  ]

  if (req) {
      const filteredItems = dummyMapItemsNo.filter(item => item.itemNoId === req.itemNoId[0]);
      return filteredItems;
  }

  return dummyMapItemsNo;


}








           

}