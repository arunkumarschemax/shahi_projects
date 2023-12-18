export enum AttributeAgainstEnum {
    GENERAL = "GENERAL",
    ORDER = "ORDER"
  }

export enum TrackingEnum{
  NO = 'NO',
  YES = 'YES'
}
export enum MaterialFabricEnum{
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED'
}

export enum LocationMappedEnum{
  OPEN = 'OPEN',
  PARTIALLY_COMPLETED = 'PARTIALLY_COMPLETED',
  COMPLETED = 'COMPLETED'
}

export const LocationMappedEnumDisplay = [
  {name:'OPEN' , displayVal :'OPEN'},
  {name:'PARTIALLY_COMPLETED' , displayVal :'PARTIALLY COMPLETED'},
  {name:'COMPLETED' , displayVal :'COMPLETED'},
]

export enum GRNTypeEnum{
  INDENT = 'INDENT',
  SAMPLE_ORDER = 'SAMPLE ORDER'
}

export const GRNTypeEnumDisplay = [
  {name:'INDENT' , displayVal :'INDENT'},
  {name:'SAMPLE_ORDER' , displayVal :'SAMPLE ORDER'},
]


export enum ItemEnum {
  Fabric = 'Fabric',
  Trim = 'Trim',
}