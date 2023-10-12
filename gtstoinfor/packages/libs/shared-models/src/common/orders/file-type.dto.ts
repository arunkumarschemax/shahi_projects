import { FileTypesEnum } from "../../enum";

export class FileTypeDto{
    fileType: FileTypesEnum;
    fromDate ?: any;
    toDate?: any;

    constructor(fileType:FileTypesEnum,fromDate?:any,toDate?:any){
        this.fileType = fileType
        this.fromDate = fromDate
        this.toDate = toDate
    }
}