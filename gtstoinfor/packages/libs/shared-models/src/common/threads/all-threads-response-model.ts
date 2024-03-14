import { GlobalResponseObject } from "../global-response-object";
import { ThreadsDto } from "./threads.requests";


export class AllThreadsResponseModel extends GlobalResponseObject {
    data?: ThreadsDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ThreadsDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

