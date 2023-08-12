import { GlobalResponseObject } from '../global-response-object';
import { SettingsRequest } from './settings.req';

export class SettingsResponseModel extends GlobalResponseObject{
    data?: SettingsRequest;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: SettingsRequest) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
