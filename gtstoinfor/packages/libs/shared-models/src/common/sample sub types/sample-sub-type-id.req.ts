export class SampleSubTypesRequest{
    sampleSubTypeId:number;
    
    constructor(sampleSubTypeId:number){
        this.sampleSubTypeId = sampleSubTypeId;
    }
}

export class TypeIdReq{
    sampleTypeId?:number;
    
    constructor(sampleTypeId?:number){
        this.sampleTypeId = sampleTypeId;
    }
}