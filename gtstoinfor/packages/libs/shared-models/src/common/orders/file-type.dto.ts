import { FileTypesEnum } from "../../enum";

export class FileTypeDto{
    fileType: FileTypesEnum;
    fromDate ?: any;
    toDate?: any;
    type?: string;
    uploadStatus?: string;

    constructor(fileType:FileTypesEnum,fromDate?:any,toDate?:any,type?: string,uploadStatus?: string){
        this.fileType = fileType
        this.fromDate = fromDate
        this.toDate = toDate
        this.type = type
        this.uploadStatus = uploadStatus
    }
}