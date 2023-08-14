export class PoRoleRequest{
    roleId:number;
    customerPo:string
    constructor(roleId:number,customerPo:string){
        this.roleId = roleId;
        this.customerPo=customerPo
    }
}