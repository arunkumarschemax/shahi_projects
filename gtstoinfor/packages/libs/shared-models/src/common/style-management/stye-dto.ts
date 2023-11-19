
export class StyleDto {
  styleId:number;
  locationId:number;
  profitControlHeadId:number;
  style:string;
  description:string;
  styleFileName: string;
  styleFilePath:string;

  isActive:boolean;
  createdUser: string | null;
  updatedUser: string | null;
  constructor(
    styleId:number,
    locationId:number,
    profitControlHeadId:number,
    style:string,
    description:string,
    styleFileName: string,
    styleFilePath:string,
    isActive:boolean,
    createdUser: string | null,
    updatedUser: string | null,
  ){
    this.styleId=styleId
    this.style=style
    this.description=description
    this.styleFileName=styleFileName
    this.styleFilePath=styleFilePath
    this.locationId=locationId
    this.isActive=isActive
    this.profitControlHeadId=profitControlHeadId
    this.createdUser=createdUser
    this.updatedUser=updatedUser

  }


}
