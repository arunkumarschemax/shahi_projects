export class DeliveryTermsDto{

    deliverytermId:number;
    deliverytermName:string;
    isActive: boolean;
    created_user: number;
    created_at: Date|any;
    updated_user: number ;
    updated_at: Date|any;
    version_flag: number;

    constructor(deliverytermId:number,deliverytermName:string, 
         isActive: boolean,created_user: number,created_at: Date|any,updated_user: number ,updated_at: Date|any,version_flag: number){
        this.deliverytermId=deliverytermId;
        this. deliverytermName= deliverytermName;
        
    

        this.isActive=isActive;
        this.created_user=created_at;
        this.created_at=created_at;
        this.updated_at=updated_at;
        this.updated_user=updated_user;
        this.version_flag=version_flag
    
    
    }

}