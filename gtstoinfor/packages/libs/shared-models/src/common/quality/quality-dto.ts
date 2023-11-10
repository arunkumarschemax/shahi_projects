

export class QualityDTO {
    qualityId:number;
    quality: string;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(qualityId:number,quality: string,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.qualityId = qualityId;
        this.quality = quality;
        this.isActive = isActive;
        versionFlag = versionFlag;
       
       
    }
}
