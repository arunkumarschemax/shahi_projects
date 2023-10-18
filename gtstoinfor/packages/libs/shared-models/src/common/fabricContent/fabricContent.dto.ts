export class FabricContentdto {
    id: number;
    style:string;
    component: string;
    fabricContent: string;
    createdUser?: string;
    isActive?:boolean;
    updatedUser?:string;
    versionFlag?: number;
    constructor(id: number, style:string,
        component: string,
        fabricContent: string,createdUser?:string,isActive?:boolean,versionFlag?: number,    updatedUser?:string
        ) {
      this.id = id;
      this.style = style;
      this.component = component;
      this.fabricContent = fabricContent;
      this.createdUser = createdUser;
      this.isActive = isActive;
      this.versionFlag = versionFlag;
      this.updatedUser = updatedUser
    }
  }
  