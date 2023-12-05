export enum BomStatusEnum {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    PO = 'PO',
    GRN = 'GRN',
    CLOSED = 'CLOSED',
    ALLOCATED = 'ALLOCATED',
    ASSIGNED = 'ASSIGNED',
    CANCELLED = 'CANCELLED'

  }

  export const BomStatusEnumDisplay = [
    { name: "OPEN", displayVal:'OPEN'},
    { name:'IN_PROGRESS', displayVal:'IN PROGRESS'},
    { name:'PO', displayVal:'PO'},
    { name:'GRN', displayVal:'GRN'},
    { name:'CLOSED', displayVal:'CLOSED'},
    { name:'ALLOCATED', displayVal:'ALLOCATED'},
    { name:'ASSIGNED', displayVal:'ASSIGNED'},
    { name:'CANCELLED', displayVal:'CANCELLED'}
 ]