
export class ItemIdReq{
    itemId:number
   isActive?: boolean;
   versionFlag?: number;
   constructor(
    itemId:number,
   isActive?: boolean,
   versionFlag?: number
   ){
    this.itemId=itemId
    this.isActive=isActive
    this.versionFlag=versionFlag

   }
}