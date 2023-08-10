export class FactoryDto {
  id: number;
  name: string;
  address: string;
  createdUser?: string;
  isActive?:boolean
  versionFlag?: number;
  constructor(id: number, name: string, address: string,createdUser?:string,isActive?:boolean,versionFlag?: number) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.createdUser = createdUser;
    this.isActive = isActive;
    this.versionFlag = versionFlag;
  }
}
