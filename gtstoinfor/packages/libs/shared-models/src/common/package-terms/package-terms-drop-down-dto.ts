export class PackageTermsDropDownDto{
    packageTermsId : number;
    packageTermsName : string;
    
    
    constructor(packageTermsId : number,packageTermsName : string){
        this.packageTermsId = packageTermsId;
        this.packageTermsName = packageTermsName;
    }
}