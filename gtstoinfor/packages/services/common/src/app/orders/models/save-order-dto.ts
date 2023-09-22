import { ApiProperty } from "@nestjs/swagger";

export class SaveOrderDto {

    @ApiProperty()
    productionPlanId: number
    @ApiProperty()
    year: string;
    @ApiProperty()
    planningSsnCd: string;
    @ApiProperty()
    planningSsn: string;
    @ApiProperty()
    tgtSsnCd: string;
    @ApiProperty()
    tgtSsn: string;
    @ApiProperty()
    bizCd: string;
    @ApiProperty()
    biz: string;
    @ApiProperty()
    planningRegionCode: string;
    @ApiProperty()
    planningRegionName: string;
    @ApiProperty()
    channelCode: string;
    @ApiProperty()
    channelName: string;
    @ApiProperty()
    department: string;
    @ApiProperty()
    deptCd: string;
    @ApiProperty()
    Cls1_cd: string;
    @ApiProperty()
    Cls2_cd: string;
    @ApiProperty()
    gDept: string;
    @ApiProperty()
    subCategory1: string;
    @ApiProperty()
    coreCategory: string;
    @ApiProperty()
    subCategory2: string;
    @ApiProperty()
    subCategory3: string;
    @ApiProperty()
    productionCategoryFabric: string;
    @ApiProperty()
    productionCategoryFabricProcessing: string;
    @ApiProperty()
    productionCategorySewing: string;
    @ApiProperty()
    productionCategorySewingProcessing: string;
    @ApiProperty()
    planningSumCode: string;
    @ApiProperty()
    planningSum: string;
    @ApiProperty()
    localNameGhq: string;
    @ApiProperty()
    itemCd: string;
    @ApiProperty()
    item: string;
    @ApiProperty()
    origPrice: string;
    @ApiProperty()
    mainSampleCode: string;
    @ApiProperty()
    frFabricCode: string;
    @ApiProperty()
    frFabric: string;
    @ApiProperty()
    supplierRawMaterialCode: string;
    @ApiProperty()
    supplierRawMaterial: string;
    @ApiProperty()
    rawMaterialSupplierCode: string;
    @ApiProperty()
    rawMaterialSupplier: string;
    @ApiProperty()
    vendorCoode: string;
    @ApiProperty()
    vendor: string;
    @ApiProperty()
    sewingFactoryCode: string;
    @ApiProperty()
    sewingFactory: string;
    @ApiProperty()
    branchFactoryCode: string;
    @ApiProperty()
    branchFactory: string;
    @ApiProperty()
    coeff: string;
    @ApiProperty()
    itemBranchNumber: number;
    @ApiProperty()
    officialPlanStdQty: number;
    @ApiProperty()
    OfficialPlanFabPrpPlnQty: number;
    @ApiProperty()
    OfficialPlanPoPrSlsQty: string;
    @ApiProperty()
    officalPlanCoQty: string;
    @ApiProperty()
    officalPlanStockQty: string;
    @ApiProperty()
    publishFlagForFactory: string;
    @ApiProperty()
    publishDate: string;
    @ApiProperty()
    allcEndDy: string;
    @ApiProperty()
    slsEndDy: string;
    @ApiProperty()
    GWH: string;
    @ApiProperty()
    orderPlanNumber: string;
    @ApiProperty()
    orderTiming: string;
    @ApiProperty()
    swngPrdMonth: string;
    @ApiProperty()
    swngPrdWeek: string;
    @ApiProperty()
    orderPlanQty: string;
    @ApiProperty()
    orderPlanQtyCoeff: string;
    @ApiProperty()
    trnspMthd: string;
    @ApiProperty()
    prodPlanType: string;
    @ApiProperty()
    ph1St: string;
    @ApiProperty()
    wh: string;
    @ApiProperty()
    whAct: string;
    @ApiProperty()
    whAuto: string;
    @ApiProperty()
    yarnDlRequested: string;
    @ApiProperty()
    yarnDlAnswered: string;
    @ApiProperty()
    yarnDlAuto: string;
    @ApiProperty()
    yarnProductionDueDateAuto: string;
    @ApiProperty()
    yarnAutoReflectionDate: string;
    @ApiProperty()
    yarnActDy: string;
    @ApiProperty()
    yarnActQty: string;
    @ApiProperty()
    yarnOrderNumber: string;
    @ApiProperty()
    yarnOrderStatus: string;
    @ApiProperty()
    yarnDeliveryDate: string;
    @ApiProperty()
    fbrcDlRequested: string;
    @ApiProperty()
    fbrcDlAnswered: string;
    @ApiProperty()
    fbrcDlAuto: string;
    @ApiProperty()
    fbrcProductionDueDateAuto: string;
    @ApiProperty()
    fbrcAutoReflectionDate: string;
    @ApiProperty()
    factoryCommentUpdateDate: string;
    @ApiProperty()
    fbrcActDy: string;
    @ApiProperty()
    fbrcActQty: string;
    @ApiProperty()
    fbrcOrderNumber: string;
    @ApiProperty()
    fbrcOrderStatus: string;
    @ApiProperty()
    fbrcDeliveryDate: string;
    @ApiProperty()
    colorDlRequested: string;
    @ApiProperty()
    colorDlAnswered: string;
    @ApiProperty()
    colorDlAuto: string;
    @ApiProperty()
    colorProductionDueDateAuto: string;
    @ApiProperty()
    colorAutoReflectionDate: string;
    @ApiProperty()
    colorActDy: string;
    @ApiProperty()
    colorActQty: string;
    @ApiProperty()
    ManualLockFlagNow: string;
    @ApiProperty()
    colorOrderNumber: string;
    @ApiProperty()
    colorOrderStatus: string;
    @ApiProperty()
    colorDeliveryDate: string;
    @ApiProperty()
    trimDlRequested: string;
    @ApiProperty()
    trimDlAnswered: string;
    @ApiProperty()
    trimDlAuto: string;
    @ApiProperty()
    trimProductionDueDateAuto: string;
    @ApiProperty()
    trimAutoReflectionDate: string;
    @ApiProperty()
    trimActDy: string;
    @ApiProperty()
    trimActQty: string;
    @ApiProperty()
    trimOrderNumber: string;
    @ApiProperty()
    trimOrderStatus: string;
    @ApiProperty()
    trimDeliveryDate: string;
    @ApiProperty()
    poDlRequested: string;
    @ApiProperty()
    poDlAnswered: string;
    @ApiProperty()
    poDlAuto: string;
    // @ApiProperty()
    // PO_EXFtotalAbnormalLT: string;
    @ApiProperty()
    slsStartDy: string;
    @ApiProperty()
    poProductionDueDateAuto: string;
    @ApiProperty()
    poAutoReflectionDate: string;
    @ApiProperty()
    poActDy: string;
    @ApiProperty()
    poActQty: string;
    @ApiProperty()
    poOrderNumber: string;
    @ApiProperty()
    poOrderStatus: string;
    @ApiProperty()
    assort1: string;
    @ApiProperty()
    assort2: string;
    @ApiProperty()
    nxAssort: string;
    @ApiProperty()
    solid: string;
    @ApiProperty()
    orderPlanQtyStop: string;
    @ApiProperty()
    fixFlag: string;
    @ApiProperty()
    alternativeFlag: string;
    @ApiProperty()
    expressLineFlag: string;
    @ApiProperty()
    factoryComment: string;
    @ApiProperty()
    plannedEXF: string;
    @ApiProperty()
    exfEtd: string;
    @ApiProperty()
    exfWh: string;
    @ApiProperty()
    sweingCountryRegion: string;
     @ApiProperty()
     rewMaterialOriginal: string;
     @ApiProperty()
     itemDrop: string;
     @ApiProperty()
     createdUserId?: string;
     @ApiProperty()
     createdUserName: string;
     @ApiProperty()
     createFunction: string;
     @ApiProperty()
     updatedUserId?: string;
     @ApiProperty()
     updatedUserName: string;
    @ApiProperty()
    updatedUserFunction: string;
    @ApiProperty()
    countY: string;
    @ApiProperty()
    sample: string;
    @ApiProperty()
    exf: string;
    @ApiProperty()
    bddl: string;
     @ApiProperty()
     bddlPast: string;
    @ApiProperty()
    ltBdExf: string;
    @ApiProperty()
    newBddl: string;
    @ApiProperty()
    newLtBdExf: string;
    @ApiProperty()
    qtyLtBdExf: string;
    @ApiProperty()
    qtyLtPoExf: string;
    @ApiProperty()
    ltPoExf: string;
    @ApiProperty()
    country2Y: string;
    @ApiProperty()
    phase: string;
    @ApiProperty()
    createDate: string;
    @ApiProperty()
    createUserId : string;
    @ApiProperty()
    createUserName: string;
    @ApiProperty()
    updateDate: string;
    @ApiProperty()
    updateUserId : string;
    @ApiProperty()
    updateUserName: string;
    @ApiProperty()
    updateFunction : string;
    @ApiProperty()
    version: number;
    @ApiProperty()
    fileId:number;
    @ApiProperty()
    createdUser?: string;
    @ApiProperty()
    updatedUser?:string;
    @ApiProperty()
    userName?: string;

    constructor(
        productionPlanId: number,
        year: string,
        planningSsnCd: string,
        planningSsn: string,
        tgtSsnCd: string,
        tgtSsn: string,
        bizCd: string,
        biz: string,
        planningRegionCode: string,
        planningRegionName: string,
        channelCode: string,
        channelName: string,
        department: string,
        deptCd: string,
        Cls1_cd: string,
        Cls2_cd: string,
        gDept: string,
        subCategory1: string,
        coreCategory: string,
        subCategory2: string,
        subCategory3: string,
        productionCategoryFabric: string,
        productionCategoryFabricProcessing: string,
        productionCategorySewing: string,
        productionCategorySewingProcessing: string,
        planningSumCode: string,
        planningSum: string,
        localNameGhq: string,
        itemCd: string,
        item: string,
        origPrice: string,
        mainSampleCode: string,
        frFabricCode: string,
        frFabric: string,
        supplierRawMaterialCode: string,
        supplierRawMaterial: string,
        rawMaterialSupplierCode: string,
        rawMaterialSupplier: string,
        vendorCoode: string,
        vendor: string,
        sewingFactoryCode: string,
        sewingFactory: string,
        branchFactoryCode: string,
        branchFactory: string,
        coeff: string,
        itemBranchNumber: number,
        officialPlanStdQty: number,
        OfficialPlanFabPrpPlnQty: number,
        OfficialPlanPoPrSlsQty: string,
        officalPlanCoQty: string,
        officalPlanStockQty: string,
        slsStartDy: string,
        publishFlagForFactory: string,
        publishDate: string,
        allcEndDy: string,
        slsEndDy: string,
        GWH: string,
        orderPlanNumber: string,
        orderTiming: string,
        swngPrdMonth: string,
        swngPrdWeek: string,
        orderPlanQty: string,
        orderPlanQtyCoeff: string,
        trnspMthd: string,
        prodPlanType: string,
        ph1St: string,
        wh: string,
        whAct: string,
        whAuto: string,
        yarnDlRequested: string,
        yarnDlAnswered: string,
        yarnDlAuto: string,
        yarnProductionDueDateAuto: string,
        yarnAutoReflectionDate: string,
        yarnActDy: string,
        yarnActQty: string,
        yarnOrderNumber: string,
        yarnOrderStatus: string,
        yarnDeliveryDate: string,
        fbrcDlRequested: string,
        fbrcDlAnswered: string,
        fbrcDlAuto: string,
        fbrcProductionDueDateAuto: string,
        fbrcAutoReflectionDate: string,
       // factoryCommentUpdateDate: string,
        fbrcActDy: string,
        fbrcActQty: string,
        fbrcOrderNumber: string,
        fbrcOrderStatus: string,
        fbrcDeliveryDate: string,
        colorDlRequested: string,
        colorDlAnswered: string,
        colorDlAuto: string,
        colorProductionDueDateAuto: string,
        colorAutoReflectionDate: string,
        colorActDy: string,
        colorActQty: string,
        colorOrderNumber: string,
        colorOrderStatus: string,
        colorDeliveryDate: string,
        trimDlRequested: string,
        trimDlAnswered: string,
        trimDlAuto: string,
        trimProductionDueDateAuto: string,
        trimAutoReflectionDate: string,
        trimActDy: string,
        trimActQty: string,
        trimOrderNumber: string,
        trimOrderStatus: string,
        trimDeliveryDate: string,
        poDlRequested: string,
        poDlAnswered: string,
        poDlAuto: string,
        // PO_EXFtotalAbnormalLT:string,
        poProductionDueDateAuto: string,
        poAutoReflectionDate: string,
        poActDy: string,
        poActQty: string,
        poOrderNumber: string,
        poOrderStatus: string,
        assort1: string,
        assort2: string,
        nxAssort: string,
        solid: string,
        orderPlanQtyStop: string,
        fixFlag: string,
        alternativeFlag: string,
        expressLineFlag:string,
        factoryComment: string,
        plannedEXF: string,
        exfEtd: string,
        exfWh: string,
        sweingCountryRegion: string,
        rewMaterialOriginal: string,
        itemDrop: string,
        createDate: string,
        createUserId : string,
        createUserName: string,
        createFunction : string,
        updateDate: string,
        updateUserId : string,
        updateUserName: string,
        updateFunction : string,
        countY: string,
        sample: string,
        exf: string,
        bddl: string,
        bddlPast: string,
        ltBdExf: string,
        newBddl: string,
        newLtBdExf: string,
        ltPoExf: string,
        qtyLtBdExf: string,
        qtyLtPoExf: string,
        country2Y: string,
        phase: string,
        fileId:number,
        version: number,
        createdUser?: string,
        userName?: string,
        updatedUser?:string,
 
    ) {
        this.productionPlanId = productionPlanId
        this.year = year
        this.planningSsnCd = planningSsnCd
        this.planningSsn = planningSsn
        this.tgtSsnCd = tgtSsnCd
        this.tgtSsn = tgtSsn
        this.bizCd = bizCd
        this.biz = biz
        this.planningRegionCode = planningRegionCode
        this.planningRegionName = planningRegionName
        this.channelCode = channelCode
        this.channelName = channelName
        this.department = department
        this.deptCd = deptCd
        this.Cls1_cd = Cls1_cd
        this.Cls2_cd = Cls2_cd
        this.gDept = gDept
        this.subCategory1 = subCategory1
        this.coreCategory = coreCategory
        this.subCategory2 = subCategory2
        this.subCategory3 = subCategory3
        this.productionCategoryFabric = productionCategoryFabric
        this.productionCategoryFabricProcessing = productionCategoryFabricProcessing
        this.productionCategorySewing = productionCategorySewing
        this.productionCategorySewingProcessing = productionCategorySewingProcessing
        this.planningSumCode = planningSumCode
        this.planningSum = planningSum
        this.localNameGhq = localNameGhq
        this.planningSum = planningSum
        this.itemCd = itemCd
        this.item = item
        this.origPrice = origPrice
        this.mainSampleCode = mainSampleCode
        this.frFabricCode = frFabricCode
        this.frFabric = frFabric
        this.supplierRawMaterialCode = supplierRawMaterialCode
        this.supplierRawMaterial = supplierRawMaterial
        this.rawMaterialSupplierCode = rawMaterialSupplierCode
        this.rawMaterialSupplier = rawMaterialSupplier
        this.vendorCoode = vendorCoode
        this.vendor = vendor
        this.sewingFactoryCode = sewingFactoryCode
        this.sewingFactory = sewingFactory
        this.branchFactoryCode = branchFactoryCode
        this.branchFactory = branchFactory
        this.coeff = coeff
        this.itemBranchNumber = itemBranchNumber
        this.officialPlanStdQty = officialPlanStdQty
        this.OfficialPlanFabPrpPlnQty = OfficialPlanFabPrpPlnQty
        this.OfficialPlanPoPrSlsQty = OfficialPlanPoPrSlsQty
        this.officalPlanCoQty = officalPlanCoQty
        this.OfficialPlanFabPrpPlnQty = OfficialPlanFabPrpPlnQty
        this.OfficialPlanPoPrSlsQty = OfficialPlanPoPrSlsQty
        this.officalPlanStockQty = officalPlanStockQty
        this.slsStartDy = slsStartDy
        this.publishFlagForFactory = publishFlagForFactory
        this.publishDate = publishDate
        this.allcEndDy = allcEndDy
        this.slsEndDy = slsEndDy
        this.GWH = GWH
        this.orderPlanNumber = orderPlanNumber
        this.orderTiming = orderTiming
        this.swngPrdMonth = swngPrdMonth
        this.swngPrdWeek = swngPrdWeek
        this.orderPlanQty = orderPlanQty
        this.orderPlanQtyCoeff = orderPlanQtyCoeff
        this.trnspMthd = trnspMthd
        this.prodPlanType = prodPlanType
        this.ph1St = ph1St
        this.wh = wh
        this.whAct = whAct
        this.whAuto = whAuto
        this.yarnDlRequested = yarnDlRequested
        this.yarnDlAnswered = yarnDlAnswered
        this.yarnDlAuto = yarnDlAuto
        this.yarnProductionDueDateAuto = yarnProductionDueDateAuto
        this.yarnAutoReflectionDate = yarnAutoReflectionDate
        this.yarnActDy = yarnActDy
        this.yarnActQty = yarnActQty
        this.yarnOrderNumber = yarnOrderNumber
        this.yarnOrderStatus = yarnOrderStatus
        this.yarnDeliveryDate = yarnDeliveryDate
        this.fbrcDlRequested = fbrcDlRequested
        this.fbrcDlAnswered = fbrcDlAnswered
        this.fbrcDlAuto = fbrcDlAuto
        this.fbrcProductionDueDateAuto = fbrcProductionDueDateAuto
        this.fbrcAutoReflectionDate = fbrcAutoReflectionDate
        // this.factoryCommentUpdateDate = factoryCommentUpdateDate
        this.fbrcActDy = fbrcActDy
        this.fbrcActQty = fbrcActQty
        this.fbrcOrderNumber = fbrcOrderNumber
        this.fbrcOrderStatus = fbrcOrderStatus
        this.fbrcDeliveryDate = fbrcDeliveryDate
        this.colorDlRequested = colorDlRequested
        this.colorDlAnswered = colorDlAnswered
        this.colorDlAuto = colorDlAuto
        this.colorProductionDueDateAuto = colorProductionDueDateAuto
        this.colorAutoReflectionDate = colorAutoReflectionDate
        this.colorActDy = colorActDy
        this.colorActQty = colorActQty
        this.colorOrderNumber = colorOrderNumber
        this.colorOrderStatus = colorOrderStatus
        this.colorDeliveryDate = colorDeliveryDate
        this.trimDlRequested = trimDlRequested
        this.trimDlAnswered = trimDlAnswered
        this.trimDlAuto = trimDlAuto
        this.trimProductionDueDateAuto = trimProductionDueDateAuto
        this.trimAutoReflectionDate = trimAutoReflectionDate
        this.trimActDy = trimActDy
        this.trimActQty = trimActQty
        this.trimOrderNumber = trimOrderNumber
        this.trimOrderStatus = trimOrderStatus
        this.trimDeliveryDate = trimDeliveryDate
        this.poDlRequested = poDlRequested
        this.poDlAnswered = poDlAnswered
        this.poDlAuto = poDlAuto
        // this.PO_EXFtotalAbnormalLT=PO_EXFtotalAbnormalLT
        this.poProductionDueDateAuto = poProductionDueDateAuto
        this.poAutoReflectionDate = poAutoReflectionDate
        this.poActDy = poActDy
        this.poActQty = poActQty
        this.poOrderNumber = poOrderNumber
        this.poOrderStatus = poOrderStatus
        this.assort1 = assort1
        this.assort2 = assort2
        this.nxAssort = nxAssort
        this.solid = solid
        this.orderPlanQtyStop = orderPlanQtyStop
        this.fixFlag = fixFlag
        this.alternativeFlag = alternativeFlag
        this.expressLineFlag =expressLineFlag
        this.factoryComment = factoryComment
        this.plannedEXF = plannedEXF
        this.exfEtd = exfEtd
        this.userName = userName
        this.version = version
        this.fileId = fileId;
        this.exfWh = exfWh
        this.sweingCountryRegion = sweingCountryRegion
        this.rewMaterialOriginal = rewMaterialOriginal
        this.itemDrop = itemDrop;
        this.countY=countY
        this.sample = sample
        this.exf = exf
        this.bddl = bddl
        this.bddlPast = bddlPast;
        this.ltBdExf=ltBdExf
        this.newBddl = newBddl
        this.newLtBdExf = newLtBdExf
        this.ltPoExf = ltPoExf
        this.qtyLtBdExf = qtyLtBdExf;
        this.qtyLtPoExf=qtyLtPoExf
        this.country2Y = country2Y
        this.phase = phase
        this.createdUser = createdUser
        this.qtyLtBdExf = qtyLtBdExf;
        this.updatedUser=updatedUser;
        this.createFunction = createFunction;
        this.createDate =  createDate;
        this.createUserId  = createUserId ;
        this.createUserName =  createUserName,
        this.createFunction  =  createFunction;
        this.updateDate =  updateDate;
        this.updateUserId  = updateUserId;
        this.updateUserName = updateUserName;
        this.updateFunction  =  updateFunction;
        
    }
}