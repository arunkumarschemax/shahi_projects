import { ApiProperty } from "@nestjs/swagger";



export class SMVEfficiencyRequest {

    
    // SmvEfficiencyId: number;
    operationId: number;
    capacityType: string;     
    validFromDate: Date;
    validToDate: Date;
    revisionNo: string;
    workCenter: string;
    operationDescription: string; 
    departmentId: number;
    planingArea: string;
    runTime: string;
    priceTimeQty: string;
    setupTime: string;
    externalSetup: string;
    fixedTime: string;
    plnnoMachine: string;
    plnnoWorkers: string;
    plnnoSetup: string;
    phantom: string;
    leadtmOffset: string;
    pdays: string;
    optionsPercent: string;
    scrapPct: string;
    setupScrap: string;
    documentId: string;
    toolNo: string;
    subcontrCtrl: string;
    finite: string;
    qtyPerHour: string;
    critResource: string;
    addMtrlOffset: string;
    shippingBuffer: string;

    constructor(
      // SmvEfficiencyId: number,
    operationId: number,
    capacityType: string,     
    validFromDate: Date,
    validToDate: Date,
    revisionNo: string,
    workCenter: string,
    operationDescription: string, 
    departmentId: number,
    planingArea: string,
    runTime: string,
    priceTimeQty: string,
    setupTime: string,
    externalSetup: string,
    fixedTime: string,
    plnnoMachine: string,
    plnnoWorkers: string,
    plnnoSetup: string,
    phantom: string,
    leadtmOffset: string,
    pdays: string,
    optionsPercent: string,
    scrapPct: string,
    setupScrap: string,
    documentId: string,
    toolNo: string,
    subcontrCtrl: string,
    finite: string,
    qtyPerHour: string,
    critResource: string,
    addMtrlOffset: string,
    shippingBuffer: string,
    ){
      // this.SmvEfficiencyId = SmvEfficiencyId
      this.operationId = operationId
      this.capacityType = capacityType
      this.validFromDate = validFromDate
      this.validToDate = validToDate
      this.revisionNo = revisionNo
      this.workCenter = workCenter
      this.operationDescription = operationDescription
      this.departmentId = departmentId
      this.planingArea = planingArea
      this.runTime = runTime
      this.priceTimeQty = priceTimeQty
      this.setupTime = setupTime
      this.externalSetup = externalSetup
      this.fixedTime = fixedTime
      this.plnnoMachine = plnnoMachine
      this.plnnoWorkers = plnnoWorkers
      this.plnnoSetup = plnnoSetup
      this.phantom = phantom
      this.leadtmOffset = leadtmOffset
      this.pdays = pdays
      this.optionsPercent =optionsPercent
      this.scrapPct = scrapPct
      this.setupScrap = setupScrap
      this.documentId = documentId
      this.toolNo = toolNo
      this.subcontrCtrl = subcontrCtrl
      this.finite = finite
      this.qtyPerHour = qtyPerHour
      this.critResource = critResource
      this.addMtrlOffset = addMtrlOffset
      this.shippingBuffer = shippingBuffer
  


    }


  
  }
  