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
    documentName?:string
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
    constructor(uid: string,name:string,status:string,type:string){
        this.uid = uid;
        this.name = name;
        this.status = status;
        this.type = type;
    }
}
