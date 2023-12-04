

export class QualitysDTO {
    qualityId:number;
    qualityName: string;
    isActive?:boolean;
    versionFlag?:number;
    updatedUser : string;
    updatedAt : Date | any;
    createdUser : string;
    createdAt : Date | any;

}
export const QulaitysDefault : QualitysDTO = {
    qualityId:0,
    qualityName:"",
    isActive: true,
    createdAt : new Date() ,
    createdUser : '0',
    updatedAt : new Date() ,
    updatedUser : '0',
    versionFlag : 1
    
}
