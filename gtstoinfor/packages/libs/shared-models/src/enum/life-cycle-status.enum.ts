export enum LifeCycleStatusEnum{
    OPEN = "OPEN",
    PO_RAISED = "PO_RAISED",
    GRN = "GRN",
    MATERIAL_ALLOCATED = "MATERIAL_ALLOCATED",
    MATERIAL_ISSUED = "MATERIAL_ISSUED",
    LAYING = "LAYING",
    CUTTING = "CUTTING",
    SEWING = "SEWING",
    EMBLISHMENT = "EMBLISHMENT",
    FINISHING = "FINISHING",
    QUALITY_CONTROL = "QUALITY_CONTROL",
    PACKING = "PACKING",
    SHIPMENT = "SHIPMENT"
 }
 
 export const LifeCycleStatusDisplay = [
     { name: "OPEN", displayVal:'OPEN'},
     { name:'PO_RAISED', displayVal:'PO RAISED'},
     { name:'GRN', displayVal:'GRN'},
     { name:'MATERIAL_ALLOCATED', displayVal:'MATERIAL ALLOCATED'},
     { name:'MATERIAL_ISSUED', displayVal:'MATERIAL ISSUED'},
     { name:'LAYING', displayVal:'LAYING'},
     { name:'CUTTING', displayVal:'CUTTING'},
     { name:'SEWING', displayVal:'SEWING'},
     { name:'EMBLISHMENT', displayVal:'EMBLISHMENT'},
     { name:'FINISHING', displayVal:'FINISHING'},
     { name:'QUALITY_CONTROL', displayVal:'QUALITY_CONTROL'},
     { name:'PACKING', displayVal:'PACKING'},
     { name:'SHIPMENT', displayVal:'SHIPMENT'},
 ]