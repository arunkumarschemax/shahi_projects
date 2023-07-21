export  class VersionAndQtyModel {
    version: number;
    orderQtyPcs: number;
    constructor(version: number, orderQtyPcs: number){
        this.orderQtyPcs = orderQtyPcs
        this.version = version
    };
}