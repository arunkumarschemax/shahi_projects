export class PoRoleRequest{
    role:string;
    customerPo:string
    constructor(role:string,customerPo:string){
        this.role = role;
        this.customerPo=customerPo
    }
}

export class poReq{
    customerPo:string
    constructor(customerPo:string){
        this.customerPo=customerPo
    }
}