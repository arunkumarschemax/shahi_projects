
export class ItemsDto{
  itemId: number
  itemName: string;
  itemCode: string;
  itemCategoryId: number;
  itemSubCategoryId: number;
  brandId: number;
  minQuantity?:number
  uomId: number;
  remarks?: string;
  isActive?: boolean;
  createdAt?: Date;
  createdUser?: string | null;
  updatedAt?: Date;
  updatedUser?: string | null;
  versionFlag?: number;
  
  constructor(
  itemId: number,
  itemName: string,
  itemCode: string,
  itemCategoryId: number,
  itemSubCategoryId: number,
  brandId: number,
  minQuantity:number,
  uomId: number,
  remarks?: string,
  isActive?: boolean,
  createdAt?: Date,
  createdUser?: string | null,
  updatedAt?: Date,
  updatedUser?: string | null,
  versionFlag?: number,
  ){
    this.itemId=itemId
    this.itemName=itemName
    this.itemCode=itemCode
    this.itemSubCategoryId=itemSubCategoryId
    this.itemCategoryId=itemCategoryId
    this.brandId=brandId
    this.minQuantity=minQuantity
    this.uomId=uomId
    this.remarks=remarks
    this.isActive=isActive
    this.createdAt=createdAt
    this.createdUser=createdUser
    this.updatedAt=updatedAt
    this.updatedUser=updatedUser
    this.versionFlag=versionFlag

  }


}
