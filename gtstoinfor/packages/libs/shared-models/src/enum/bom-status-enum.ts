export enum PurchaseOrderStatus{
    OPEN='OPEN',
    IN_PROGRESS = 'IN PROGRESS',
    CANCELLED = 'CANCELLED',
    CLOSED = 'CLOSED',
}

export const PurchaseOrderStatusEnumDisplay = [
    { name: "OPEN", displayVal:'OPEN'},
    { name:'IN_PROGRESS', displayVal:'IN PROGRESS'},
    { name:'CLOSED', displayVal:'CLOSED'},
    { name:'CANCELLED', displayVal:'CANCELLED'}
 ]