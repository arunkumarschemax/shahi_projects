export enum StatusEnum {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELLED = 'CANCELLED',
    CLOSED = 'CLOSED',
    APPROVED = 'APPROVED',
    TOTAL = 'TOTAL'

  }

  export const StatusEnumDisplay = [
    { name: "OPEN", displayVal:'OPEN'},
    { name:'IN_PROGRESS', displayVal:'IN PROGRESS'},
    { name:'CANCELLED', displayVal:'CANCELLED'},
    { name:'CLOSED', displayVal:'CLOSED'},
    { name:'APPROVED', displayVal:'APPROVED'}




 ]


 
 export enum MaterialStatusEnum {
  MATERIAL_ALLOCATED = 'MATERIAL ALLOCATED',
  MATERIAL_ISSUED = 'MATERIAL ISSUED',
}