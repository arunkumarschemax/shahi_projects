export class PriceListModel {
    id: number;
    style: string;
    year: string;
    destination:string;
    seasonCode:string;
    price:number;
    currency:string;
    createdUser?: string;
    isActive?:boolean
    versionFlag?: number;
    updatedUser?:string;
    constructor( id:number,style: string, year: string,destination:string,
        seasonCode:string,price:number,currency:string,createdUser?:string,isActive?:boolean,versionFlag?: number,updatedUser?:string) {
      this.id = id;
      this.style = style;
      this.year = year;
      this.destination = destination;
      this.seasonCode = seasonCode;
      this.price = price
      this.currency = currency;
      this.createdUser = createdUser;
      this.isActive = isActive;
      this.versionFlag = versionFlag;
      this.updatedUser = updatedUser
    }
  }
  