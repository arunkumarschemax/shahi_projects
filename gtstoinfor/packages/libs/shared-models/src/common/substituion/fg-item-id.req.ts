export class fgItemIdReq{
    fgItemCode?:string
    rmSku?: string

    constructor(fgItemCode?:string,rmSku?: string){
      this.fgItemCode = fgItemCode
      this.rmSku = rmSku
    }

  }