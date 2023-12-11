import { LifeCycleStatusEnum, PurchaseStatusEnum } from "../../enum";
import { ExternalRefReq } from "../buyers";

export class MaterailViewDto {
    id?: number;
    quantity?: string;
    description?: string;
    user?: string;
    reamrks?: string;
    status?:LifeCycleStatusEnum
    contact?:string
    extension?:string
    samValue?:string
    country_name?:string
    colour?:string
    style?:string
    pch?:string
    techName?:string
    constructor(id?: number, quantity?: string, extension?: string, user?: string, description?: string,status?:LifeCycleStatusEnum,reamrks?:string,ExternalRefNo?:string,samValue?:string,country_name?:string,colour?:string,style?:string,pch?:string,techname?:string) {
        this.user = user
        this.id = id;
        this.quantity = quantity
        this.extension = extension
        this.reamrks = reamrks
        this.description = description
        this.status = status
        this.samValue = samValue
        this.country_name = country_name
        this.colour = colour
        this.style = style
        this.pch = pch
        this.techName = techname


    }

}