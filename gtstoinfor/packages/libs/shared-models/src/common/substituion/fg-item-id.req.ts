export class fgItemIdReq{
    fgItemCode?:string
    rmSku?: string
    rmItemCode?:string
    fgSkuCode?:string
    constructor(fgItemCode?:string,rmSku?: string, rmItemCode?:string,fgSkuCode?:string){
      this.fgItemCode = fgItemCode
      this.rmSku = rmSku
      this.fgSkuCode=fgSkuCode
      this.rmItemCode=rmItemCode
    }

  }