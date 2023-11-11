

export class M3StyleDTO {
    m3StyleId:number;
    m3StyleCode: string;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(m3StyleId:number,m3StyleCode: string,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.m3StyleId = m3StyleId;
        this.m3StyleCode = m3StyleCode;
        this.isActive = isActive;
        versionFlag = versionFlag;
       
       
    }
}
