
import { GlobalResponseObject } from '../global-response-object';
import {ItemGroupDropDownDto}  from './item-group-dropdown'

export class ItemgroupDropDownResponse extends GlobalResponseObject {
    data?: ItemGroupDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemGroupDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}

