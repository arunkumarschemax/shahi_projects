
export class StyleIdReq{
    styleId:number
   isActive?: boolean;
   versionFlag?: number;
   constructor(
    styleId:number,
   isActive?: boolean,
   versionFlag?: number
   ){
    this.styleId=styleId
    this.isActive=isActive
    this.versionFlag=versionFlag

   }
}