import { GlobalResponseObject } from '../global-response-object';
import { SettingsModel } from './settings.model';
import { SettingsRequest } from './settings.req';

export class SettingsResponseModel extends GlobalResponseObject{
    data?: SettingsModel;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: SettingsModel) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
