export class FactoryDto {
  id: number;
  name: string;
  address: string;
  createdUser: string;
  isActive:boolean
  constructor(id: number, name: string, address: string,createdUser:string,isActive:boolean) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.createdUser = createdUser;
    this.isActive = isActive;
  }
}
