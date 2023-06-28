export class FactoryDto {
  id: number;
  name: string;
  address: string;
  createdUser: any;
  constructor(id: number, name: string, address: string) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}
