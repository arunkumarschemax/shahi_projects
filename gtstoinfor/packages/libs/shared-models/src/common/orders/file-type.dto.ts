import { FileTypesEnum } from "../../enum";

export class FileTypeDto{
    fileType: FileTypesEnum;

    constructor(fileType:FileTypesEnum){
        this.fileType = fileType
    }
}