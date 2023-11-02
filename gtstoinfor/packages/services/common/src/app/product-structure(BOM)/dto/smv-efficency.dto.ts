import { ApiProperty } from "@nestjs/swagger";



export class SMVEfficiencyDto {

    @ApiProperty()
    SmvEfficiencyId: number;
  
    @ApiProperty()
    operationId: number;

    @ApiProperty()
    capacityType: string;       

    @ApiProperty()
    validFromDate: Date;

    @ApiProperty()
    validToDate: Date;

    @ApiProperty()
    revisionNo: string;

    @ApiProperty()
    workCenter: string;

    @ApiProperty()
    operationDescription: string;

    @ApiProperty()
    departmentId: number;

    @ApiProperty()
    planingArea: string;

    @ApiProperty()
    runTime: string;

    @ApiProperty() 
    priceTimeQty: string;

    @ApiProperty()  
    setupTime: string;
 
    @ApiProperty()  
    externalSetup: string;
    
    @ApiProperty()  
    fixedTime: string;

    @ApiProperty()  
    plnnoMachine: string;

    @ApiProperty()
    plnnoWorkers: string;

    @ApiProperty()
    plnnoSetup: string;

    @ApiProperty() 
    phantom: string;

    @ApiProperty()
    leadtmOffset: string;

    @ApiProperty()
    pdays: string;

    @ApiProperty()
    optionsPercent: string;
    
    @ApiProperty()
    scrapPct: string;

    @ApiProperty()
    setupScrap: string;

    @ApiProperty() 
    documentId: string;

    @ApiProperty()
    toolNo: string;

    @ApiProperty()
    subcontrCtrl: string;

    @ApiProperty()
    finite: string;

    @ApiProperty()
    qtyPerHour: string;

    @ApiProperty()
    critResource: string;

    @ApiProperty()
    addMtrlOffset: string;

    @ApiProperty()
    shippingBuffer: string;


  
  }
  