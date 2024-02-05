export class TrimsDto {
    trimid: number;
    name: string;
    address: string;
    createdUser?: string;
    isActive?:boolean
    versionFlag?: number;
    constructor(trimid: number, name: string, address: string,createdUser?:string,isActive?:boolean,versionFlag?: number) {
      this.trimid = trimid;
      this.name = name;
      this.address = address;
      this.createdUser = createdUser;
      this.isActive = isActive;
      this.versionFlag = versionFlag;
    }
  }
  