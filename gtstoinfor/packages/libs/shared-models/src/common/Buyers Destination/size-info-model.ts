export class SizeInfoModel{
    sizeId: number;
    size?: string;
    

    constructor(sizeId: number,size?: string){
        this.sizeId = sizeId;
        this.size = size;
    }

}