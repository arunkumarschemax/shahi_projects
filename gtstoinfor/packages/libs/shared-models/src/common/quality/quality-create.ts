export class QualityCreateRequest {
    qualityId:number;
    quality:string;
   createdUser :string;


   constructor(quality: string,createdUser : string,qualityId?: number){
    this.quality = quality
    this.createdUser = createdUser
    this.qualityId = qualityId
}
}