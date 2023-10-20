import { GlobalResponseObject } from '../global-response-object';
import { HierarchyLevelDto } from './hierarchy-level-model';



export class hierachyLevelModel extends GlobalResponseObject{
    data?:HierarchyLevelDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //PaymentTermsDto
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: HierarchyLevelDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
