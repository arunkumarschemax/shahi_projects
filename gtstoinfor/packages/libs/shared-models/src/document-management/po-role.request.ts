export class PoRoleRequest{
    role:string;
    customerPo:string;
    invoice:string;
    challan:string
    orderId:number

    constructor(role:string,customerPo:string, invoice:string, challan:string, orderId:number){
        this.role = role;
        this.customerPo=customerPo
        this.invoice=invoice
        this.challan=challan
        this.orderId=orderId
    }
}

export class InvoiceReq{
    role:string;
    customerPo:string;
    constructor(role:string,customerPo:string){
        this.role = role;
        this.customerPo=customerPo
    }
}

export class ChallanReq{
    role:string;
    customerPo:string;
    invoice:string;
    constructor(role:string,customerPo:string,invoice:string){
        this.role = role;
        this.customerPo=customerPo
        this.invoice=invoice
    }
}

export class poReq{
    customerPo:string
    constructor(customerPo:string){
        this.customerPo=customerPo
    }
}

export class RoleReq{
    role:string
    constructor(role:string){
        this.role=role
    }
}