

export class PackageTermsDto{
    packageTermsId : number;
    packageTermsName : string;
    isActive: boolean;
    createdUser : string;
    updatedUser : string;

    

    constructor(packageTermsId : number,packageTermsName : string,isActive: boolean,createdUser : string,updatedUser:string){
        this.packageTermsId = packageTermsId;
        this.packageTermsName = packageTermsName;
        this.isActive= isActive;
        this.createdUser= createdUser;
        this.updatedUser= updatedUser;

    }
}

