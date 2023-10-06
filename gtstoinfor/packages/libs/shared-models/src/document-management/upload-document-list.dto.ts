import { DocumentDownloadEnum } from "./document-download-enum";
import { UploadedFileid } from "./po-role.request";

export class UploadDocumentListDto{
    documentsListId: number;
    documentCategoryId: number;
    roleId: number;
    customerPo: string;
    orderId: number;
    fileName: string;
    filePath: string;
    isUploaded: boolean;
    isActive: boolean;
    createdAt: Date;
    createdUser: string | null;
    updatedAt: Date;
    updatedUser: string | null;
    versionFlag: number;
    documentsPath?: any[];
    docStatus?:string
    documentName?:string
    uploadFileId?:number
    constructor(
    documentsListId: number,
    documentCategoryId: number,
    roleId: number,
    customerPo: string,
    orderId: number,
    fileName: string,
    filePath: string,
    isUploaded: boolean,
    isActive: boolean,
    createdAt: any,
    createdUser: string | null,
    updatedAt: any,
    updatedUser: string | null,
    versionFlag: number,
    documentsPath: any[],
    docStatus?:string,
    documentName?:string,
    uploadFileId?:number

    ){
        this.documentsListId=documentsListId
        this.documentCategoryId=documentCategoryId
        this.roleId=roleId
        this.customerPo=customerPo
        this.orderId=orderId
        this.fileName=fileName
        this.filePath=filePath
        this.isUploaded=isUploaded
        this.isActive=isActive
        this.createdAt=createdAt
        this.createdUser=createdUser
        this.updatedAt=updatedAt
        this.updatedUser=updatedUser
        this.versionFlag=versionFlag
        this.documentsPath=documentsPath
        this.docStatus=docStatus
        this.documentName=documentName
        this.uploadFileId=uploadFileId

    }
}



export class DocumentsListRequest{
    documentsListId: number;
    documentCategoryId:number;
    roleId:number;
    customerPo:string
    orderId:number
    file:any[];
    constructor(documentsListId: number,documentCategoryId:number,roleId:number,customerPo:string,orderId:number, file:any[],){
        this.documentsListId = documentsListId;
        this.documentCategoryId = documentCategoryId;
        this.file = file;
        this.roleId = roleId;
        this.customerPo=customerPo
        this.orderId=orderId

    }
}


export class docRequest{
    uid: string;
    name:string;
    status:string;
    type:string;
    url:string;
    documentName:string;
    downloadStatus:DocumentDownloadEnum | string;
    uploadFileId?:number
    documentListId?:number
    constructor(uid: string,name:string,status:string,type:string,url:string,documentName:string, downloadStatus:DocumentDownloadEnum | string,
        uploadFileId?:number,
        documentListId?:number
        ){
        this.uid = uid;
        this.name = name;
        this.status = status;
        this.type = type;
        this.url = url;
        this.documentName = documentName;
        this.downloadStatus = downloadStatus;
        this.uploadFileId=uploadFileId
        this.documentListId=documentListId
    }
}
