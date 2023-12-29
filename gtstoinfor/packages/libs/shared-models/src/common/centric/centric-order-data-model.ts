import { CentricSizeWiseModel } from "./centric-size-wise data";

export class CentricOrderDataModel {

    id: number;

    poNumber: string;

    shipmentMethod: string;

    season: string;
    division: string;
    manufacture: string;

    portOfExport: string;

    portOfEntry: string;

    reference: string;
    packMethod: string;

    paymentTermDescription: string;
    incoterm: string;

    specialInstructions: string;

    poLine: number;

    material: string;
    comptMaterial: string;

    color: string;

    gender: string;
    shortDescription: string;

    size: string;
    upc: string;
    retailPrice: number;
    fobPrice: number;

    label: string;

    totalQuantity: string;
    vendorFlag: string;

    exFactoryDate: string;

    exPortDate: string;

    deliveryDate: string;

    retialPrice: string;
    PODate: string;
    shipToAddress: string;

    sizeWiseData: CentricSizeWiseModel[]
    ratio?:number
    ppkUpc?:string
    status?:string

    constructor(
        id: number,

        poNumber: string,
    
        shipmentMethod: string,
    
        season: string,
        division: string,
        manufacture: string,
    
        portOfExport: string,
    
        portOfEntry: string,
    
        reference: string,
        packMethod: string,
    
        paymentTermDescription: string,
        incoterm: string,
    
        specialInstructions: string,
    
        poLine: number,
    
        material: string,
        comptMaterial: string,
    
        color: string,
    
        gender: string,
        shortDescription: string,
    
        size: string,
    
    
        upc: string,
        retailPrice: number,
        fobPrice: number,
    
        label: string,
    
        totalQuantity: string,
        vendorFlag: string,
    
        exFactoryDate: string,
    
        exPortDate: string,
    
        deliveryDate: string,
    
        retialPrice: string,
        PODate: string,
        shipToAddress: string,
    
        sizeWiseData: CentricSizeWiseModel[],
        ratio?:number,
        ppkUpc?:string,
        status?:string
    ) {
        this.id = id
        this.poNumber = poNumber
        this.shipmentMethod = shipmentMethod
        this.season = season
        this.division = division
        this.manufacture = manufacture
        this.portOfExport = portOfExport
        this.portOfEntry = portOfEntry
        this.reference = reference
        this.packMethod = packMethod
        this.paymentTermDescription = paymentTermDescription
        this.incoterm = incoterm
        this.specialInstructions = specialInstructions
        this.poLine = poLine
        this.material = material
        this.comptMaterial = comptMaterial
        this.color = color
        this.gender = gender
        this.shortDescription = shortDescription
        this.size = size
        this.upc = upc
        this.retailPrice = retailPrice
        this.fobPrice = fobPrice
        this.label = label
        this.totalQuantity = totalQuantity
        this.vendorFlag = vendorFlag
        this.exFactoryDate = exFactoryDate
        this.exPortDate = exPortDate
        this.deliveryDate = deliveryDate
        this.retialPrice = retialPrice
        this.PODate = PODate
        this.shipToAddress = shipToAddress
        this.sizeWiseData = sizeWiseData
        this.ratio = ratio
        this.ppkUpc = ppkUpc
        this.status = status
    }
}


