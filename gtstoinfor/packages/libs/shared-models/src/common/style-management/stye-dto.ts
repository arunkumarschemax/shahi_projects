
export class StyleDto {
  styleId:number;
 locationId:string;
  pch:number;
  style:string;
  description:string;
  styleFileName: string;
  styleFilePath:string;
  buyerId:number;
  isActive:boolean;
  createdUser: string | null;
  updatedUser: string | null;
  buyer?: string | null;

  constructor(
    styleId:number,
    locationId:string,
    pch:number,
    style:string,
    description:string,
    styleFileName: string,
    styleFilePath:string,
    buyerId:number,
    isActive:boolean,
    createdUser: string | null,
    updatedUser: string | null,
    buyer?: string | null,
  ){
    this.styleId=styleId
    this.style=style
    this.description=description
    this.styleFileName=styleFileName
    this.styleFilePath=styleFilePath
    this.buyerId=buyerId
    this.locationId=locationId
    this.isActive=isActive
    this.pch=pch
    this.createdUser=createdUser
    this.updatedUser=updatedUser
    this.buyer=buyer
  }


}
