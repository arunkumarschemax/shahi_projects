export class FileInfoModel{
    fileId:number;
    fileName:string;
    filePath:string;
    uploadedDate:any;
    createdUser:string;
    status: string;
    fileType:string;
    projectionRecords: number;
    trimRecords:number;
    proorderqty :number;
    trimorderqty:number;
    uploadType:string;
    columns:string;
    failedReason:string;
    isActive:number;

    constructor(fileId:number,fileName:string,filePath:string,uploadedDate:any,createdUser:string,status: string,fileType:string,projectionRecords: number,trimRecords:number,proorderqty :number,trimorderqty:number,uploadType:string,columns:string,failedReason:string,isActive:number){
    this.fileId = fileId 
    this.fileName = fileName 
    this.filePath = filePath 
    this.uploadedDate = uploadedDate 
    this.createdUser = createdUser 
    this.status = status 
    this.fileType = fileType 
    this.projectionRecords= projectionRecords
    this.trimRecords = trimRecords 
    this.proorderqty  = proorderqty  
    this.trimorderqty = trimorderqty 
    this.uploadType = uploadType 
    this.columns = columns 
    this.failedReason = failedReason 
    this.isActive = isActive 
    }

}