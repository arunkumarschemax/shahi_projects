import { Injectable } from '@nestjs/common';
import { CoeffDataDto, COLineRequest, CommonResponseModel, FileStatusReq, FileTypeDto, FileTypesEnum, ItemDataDto, MonthAndQtyModel, MonthWiseDataModel, MonthWiseDto, MonthWiseExcelDataModel, PcsDataDto, PhaseAndQtyModel, PhaseWiseDataModel, PhaseWiseExcelDataModel, VersionAndQtyModel, VersionDataModel, YearReq, orderColumnValues, ProductionOrderColumns, TrimOrderColumns, SeasonWiseRequest } from '@project-management-system/shared-models';
import axios, { Axios } from 'axios';
import { SaveOrderDto } from './models/save-order-dto';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersEntity } from './entities/orders.entity';
import { OrdersAdapter } from './adapters/orders.adapter';
import { OrdersChildRepository } from './repository/orders-child.repository';
import { OrdersChildEntity } from './entities/orders-child.entity';
import { OrdersChildAdapter } from './adapters/orders-child.adapter';
import { OrdersDifferenceEntity } from './orders-difference-info.entity';
import { OrderDifferenceRepository } from './repository/order-difference.repository';
import { FileUploadRepository } from './repository/upload.repository';
import { FileUploadEntity } from './entities/upload-file.entity';
import { DataSource, Entity, EntityManager, getManager } from 'typeorm';
import { FileIdReq } from './models/file-id.req';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { AppDataSource } from '../app-datasource';
import { TrimOrderDto } from './models/trim-order.dto';
import { TrimOrdersRepository } from './repository/trim-orders.repo';
import { TrimOrdersEntity } from './entities/trim-orders.entity';
import { TrimOrdersChildEntity } from './entities/trim-orders-child.entity';
import { TrimOrdersChildAdapter } from './adapters/trim-orders-child.adapter';
import { TrimOrdersAdapter } from './adapters/trim-orders.adapter';
import { TrimOrdersChildRepository } from './repository/trim-order-child.repo';
import { find } from 'rxjs';
import { log } from 'console';
import { appConfig } from 'packages/services/common/config';
import * as fs from 'fs';
import * as Imap from 'imap';
import * as base64 from 'base64-stream';
import * as winston from 'winston';
import { resolve } from 'path';
import { isNumberObject } from 'util/types';
import { FormatDates } from '../../../../../libs/shared-models/src/enum';
const xlsxFile = require('read-excel-file/node');
const csv = require('csv-parser');
const Excel = require('exceljs');
let moment = require('moment');
moment().format();

@Injectable()
export class OrdersService {

    constructor(
        private ordersAdapter: OrdersAdapter,
        private trimordersAdapter: TrimOrdersAdapter,
        private ordersRepository: OrdersRepository,
        private trimOrdersRepository: TrimOrdersRepository,
        private ordersChildRepo: OrdersChildRepository,
        private trimordersChildRepo: TrimOrdersChildRepository,
        private ordersChildAdapter: OrdersChildAdapter,
        private trimordersChildAdapter: TrimOrdersChildAdapter,
        private orderDiffRepo: OrderDifferenceRepository,
        private fileUploadRepo: FileUploadRepository,
        private trimOrderRepo: TrimOrdersRepository,
        @InjectDataSource()
        private dataSource: DataSource,
        @InjectEntityManager() private readonly entityManager: EntityManager,
        

    ) { }
    //for email integration
    private logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'email-service.log' }),
        ],
        });
    async saveOrdersData(formData: any, id: number, months: number): Promise<CommonResponseModel> {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const flag = new Set()
            const columnArray = [];
            // console.log(formData,'formdaaaa')
            const updatedArray = formData.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    // console.log(key,'  :keydata')
                    const newKey = key.replace(/\s/g, '_').replace(/[\(\)]/g, '').replace(/-/g, '_').replace(/:/g,'_').replace(/[*]/g,'_').replace(/=/g,'_').replace(/”/g,'').replace(/~/g,'').replace(/[/]/g,'').replace(/“/g,'').replace(/'/g,'')
                    const newKey1 = newKey.replace(/__/g,'_');
                    columnArray.push(newKey1)
                    updatedObj[newKey1] = obj[key];
                }
                return updatedObj;
            });
            // console.log(updatedArray,'updatedarray')

            const convertedData = updatedArray.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    // console.log(key,'keyvalues')
                    const value = obj[key];
                    // console.log(value,'nevalue')
                    if (value === "") {
                        updatedObj[key] = null;
                    } else {
                        // console.log(value,'nekkvalue')
                        // updatedObj[key] = value;
                        var regexPattern = /[^A-Za-z0-9 -;:/.,()[]&_']/g;
                        
                        updatedObj[key] = value.replace(regexPattern, null);
                        // console.log(value,'nekkvaluejjj')
                        // console.log(updatedObj[key],'nekkvaluejjjiyuuu')
                        updatedObj[key] = Buffer.from(value, 'utf-8').toString()
                        
                    }
                }
                return updatedObj;
            });
            // console.log(convertedData,'updatedObjmm')
            const difference = columnArray.filter((element) => !ProductionOrderColumns.includes(element));
            if(difference.length > 0){
                await transactionManager.releaseTransaction()
                return new CommonResponseModel(false,1110,'Please Upload Correct Excel')
            }
            for (const data of convertedData) {
let dtoData;
if(data.Order_Plan_Number !== null){
    dtoData = new SaveOrderDto(null,data.Year,data.Planning_Ssn_Cd,data.Planning_Ssn,data.Tgt_Ssn_Cd,data.Tgt_Ssn,data.Biz_Cd,data.Biz,data.Planning_Region_Code,data.Planning_Region_Name,data.Channel_Code,data.Channel_Name,data.Department,data.Dept_Cd,data.Cls1_Cd,data.Cls2_Cd,data.G_Dept,data.Sub_Category1,data.Core_Category,data.Sub_Category2,data.Sub_Category3,data.Production_Category_Fabric,data.Production_Category_FabricProcessing,data.Production_Category_Sewing,data.Production_Category_SewingProcessing,data.Planning_Sum_Code,data.Planning_Sum,data.Local_NameGHQ,data.Item_Cd,data.Item,data.Orig_Price,data.Main_Sample_Code,data.FR_Fabric_Code,data.FR_Fabric,data.Supplier_Raw_Material_Code,data.Supplier_Raw_Material,data.Raw_Material_Supplier_Code,data.Raw_Material_Supplier,data.Vendor_Code,data.Vendor,data.Sewing_Factory_Code,data.Sewing_Factory,data.Branch_Factory_Code,data.Branch_Factory,data.Coeff,data.month,data.Item_Brunch_Number,data.Official_Plan_Std_Qty,data.Official_Plan_Fab_Prp_Pln_Qty,data.Official_Plan_PO_pr_Sls_Qty,data.Official_Plan_CO_Qty,data.Official_Plan_Stock_Qty,data.Sls_Start_Dy,data.Publish_Flag_for_Factory,data.Publish_Date,data.Allc_End_Dy,data.Sls_End_Dy,data.GWH,data.Order_Plan_Number,data.Order_Timing,data.Swng_Prd_Month,data.Swng_Prd_Week,data.Order_Plan_Qty,data.Order_Plan_QtyCoeff,data.Trnsp_Mthd,data.Prod_Plan_Type,data.Ph11st,data.WH,data.WH_Act,data.WHAuto,data.Yarn_DL_Requested,data.Yarn_DL_Answered,data.Yarn_DL_Auto,data.Yarn_Production_Due_Date_Auto,data.Yarn_Auto_Reflection_Date,data.Yarn_Act_Dy,data.Yarn_Act_Qty,data.Yarn_Order_Number,data.Yarn_Order_Status,data.Yarn_Delivery_Date,data.Fbrc_DL_Requested,data.Fbrc_DL_Answered,data.Fbrc_DL_Auto,data.Fbrc_Production_Due_Date_Auto,data.Fbrc_Auto_Reflection_Date,data.Fbrc_Act_Dy,data.Fbrc_Act_Qty,data.Fbrc_Order_Number,data.Fbrc_Order_Status,data.Fbrc_Delivery_Date,data.Color_DL_Requested,data.Color_DL_Answered,data.Color_DL_Auto,data.Color_Production_Due_Date_Auto,data.Color_Auto_Reflection_Date,data.Color_Act_Dy,data.Color_Act_Qty,data.Color_Order_Number,data.Color_Order_Status,data.Color_Delivery_Date,data.Trim_DL_Requested,data.Trim_DL_Answered,data.Trim_DL_Auto,data.Trim_Production_Due_Date_Auto,data.Trim_Auto_Reflection_Date,data.Trim_Act_Dy,data.Trim_Act_Qty,data.Trim_Order_Number,data.Trim_Order_Status,data.Trim_Delivery_Date,data.PO_DL_Requested,data.PO_DL_Answered,data.PO_DL_Auto,data.PO_Production_Due_Date_Auto,data.PO_Auto_Reflection_Date,data.PO_Act_Dy,data.PO_Act_Qty,data.PO_Order_Number,data.PO_Order_Status,data.Assort1,data.Assort2,data.NX_Assort,data.Solid,data.Order_Plan_QtySTOP,data.Fix_Flag,data.Alternative_Flag,data.Express_Line_Flag,data.Factory_Comment,data.Planned_EXF,data.EXF_ETD,data.ETD_WH,data.Sewing_Country_Region,data.Raw_Material_Original_Country_Region,data.Item_Drop,moment(data.Create_Date).format('YYYY-MM-DD HH:mm'),data.Create_User_ID,data.Create_User_Name,data.Create_Function,moment(data.Update_Date).format('YYYY-MM-DD HH:mm'),data.Update_User_ID,data.Update_User_Name,data.Update_Function,data.CountY,data.Sample,data.EXF,data.BDDL,data.BDDLpast_Past,data.LTBD_EXF,data.New_BDDL,data.new_LTBD_EXF,data.LTPO_EXF,data.Qty_LTBD_EXF,data.Qty_LTPO_EXF,data.County2Y,data.PHASE,id,null,'bidhun')
    } else{
        break
    }
        if (dtoData.orderPlanNumber != null) {
            const details = await this.ordersRepository.findOne({ where: { orderPlanNumber: dtoData.orderPlanNumber } })
            const versionDetails = await this.ordersChildRepo.getVersion(dtoData.orderPlanNumber)
            let version = 1;
            if (versionDetails.length > 0) {
                version = Number(versionDetails.length) + 1
            }
            dtoData.version = version
            if (details) {
                // const updatedData = this.ordersAdapter.convertDtoToEntity(data);
                const updateOrder = await transactionManager.getRepository(OrdersEntity).update({ orderPlanNumber: dtoData.orderPlanNumber }, {
                year:dtoData.year,planningSsnCd:dtoData.planningSsnCd,planningSsn:dtoData.planningSsn,tgtSsnCd:dtoData.tgtSsnCd,tgtSsn:dtoData.tgtSsn,bizCd:dtoData.bizCd,biz:dtoData.biz,planningRegionCode:dtoData.planningRegionCode,planningRegionName:dtoData.planningRegionName,channelCode:dtoData.channelCode,channelName:dtoData.channelName,department:dtoData.department,deptCd:dtoData.deptCd,Cls1_cd:dtoData.Cls1_cd,Cls2_cd:dtoData.Cls2_cd,gDept:dtoData.gDept,subCategory1:dtoData.subCategory1,coreCategory:dtoData.coreCategory,subCategory2:dtoData.subCategory2,subCategory3:dtoData.subCategory3,productionCategoryFabric:dtoData.productionCategoryFabric,productionCategoryFabricProcessing:dtoData.productionCategoryFabricProcessing,productionCategorySewing:dtoData.productionCategorySewing,productionCategorySewingProcessing:dtoData.productionCategorySewingProcessing,planningSumCode:dtoData.planningSumCode,planningSum:dtoData.planningSum,localNameGhq:dtoData.localNameGhq,itemCd:dtoData.itemCd,item:dtoData.item,origPrice:dtoData.origPrice,mainSampleCode:dtoData.mainSampleCode,frFabricCode:dtoData.frFabricCode,frFabric:dtoData.frFabric,supplierRawMaterialCode:dtoData.supplierRawMaterialCode,supplierRawMaterial:dtoData.supplierRawMaterial,rawMaterialSupplierCode:dtoData.rawMaterialSupplierCode,rawMaterialSupplier:dtoData.rawMaterialSupplier,vendorCoode:dtoData.vendorCoode,vendor:dtoData.vendor,sewingFactoryCode:dtoData.sewingFactoryCode,sewingFactory:dtoData.sewingFactory,branchFactoryCode:dtoData.branchFactoryCode,branchFactory:dtoData.branchFactory,coeff:dtoData.coeff,itemBranchNumber:dtoData.itemBranchNumber,officialPlanStdQty:dtoData.officialPlanStdQty,OfficialPlanFabPrpPlnQty:dtoData.OfficialPlanFabPrpPlnQty,OfficialPlanPoPrSlsQty:dtoData.OfficialPlanPoPrSlsQty,officalPlanCoQty:dtoData.officalPlanCoQty,officalPlanStockQty:dtoData.officalPlanStockQty,slsStartDy:dtoData.slsStartDy,publishFlagForFactory:dtoData.publishFlagForFactory,publishDate:dtoData.publishDate,allcEndDy:dtoData.allcEndDy,slsEndDy:dtoData.slsEndDy,GWH:dtoData.GWH,orderTiming:dtoData.orderTiming,swngPrdMonth:dtoData.swngPrdMonth,swngPrdWeek:dtoData.swngPrdWeek,orderPlanQty:dtoData.orderPlanQty,orderPlanQtyCoeff:dtoData.orderPlanQtyCoeff,trnspMthd:dtoData.trnspMthd,prodPlanType:dtoData.prodPlanType,ph1St:dtoData.ph1St,wh:dtoData.wh,whAct:dtoData.whAct,whAuto:dtoData.whAuto,yarnDlRequested:dtoData.yarnDlRequested,yarnDlAnswered:dtoData.yarnDlAnswered,yarnDlAuto:dtoData.yarnDlAuto,yarnProductionDueDateAuto:dtoData.yarnProductionDueDateAuto,yarnAutoReflectionDate:dtoData.yarnAutoReflectionDate,yarnActDy:dtoData.yarnActDy,yarnActQty:dtoData.yarnActQty,yarnOrderNumber:dtoData.yarnOrderNumber,yarnOrderStatus:dtoData.yarnOrderStatus,yarnDeliveryDate:dtoData.yarnDeliveryDate,fbrcDlRequested:dtoData.fbrcDlRequested,fbrcDlAnswered:dtoData.fbrcDlAnswered,fbrcDlAuto:dtoData.fbrcDlAuto,fbrcProductionDueDateAuto:dtoData.fbrcProductionDueDateAuto,fbrcAutoReflectionDate:dtoData.fbrcAutoReflectionDate,factoryCommentUpdateDate:dtoData.factoryCommentUpdateDate,fbrcActDy:dtoData.fbrcActDy,fbrcActQty:dtoData.fbrcActQty,fbrcOrderNumber:dtoData.fbrcOrderNumber,fbrcOrderStatus:dtoData.fbrcOrderStatus,fbrcDeliveryDate:dtoData.fbrcDeliveryDate,colorDlRequested:dtoData.colorDlRequested,colorDlAnswered:dtoData.colorDlAnswered,colorDlAuto:dtoData.colorDlAuto,colorProductionDueDateAuto:dtoData.colorProductionDueDateAuto,colorAutoReflectionDate:dtoData.colorAutoReflectionDate,colorActDy:dtoData.colorActDy,colorActQty:dtoData.colorActQty,colorOrderNumber:dtoData.colorOrderNumber,colorOrderStatus:dtoData.colorOrderStatus,colorDeliveryDate:dtoData.colorDeliveryDate,trimDlRequested:dtoData.trimDlRequested,trimDlAnswered:dtoData.trimDlAnswered,trimDlAuto:dtoData.trimDlAuto,trimProductionDueDateAuto:dtoData.trimProductionDueDateAuto,trimAutoReflectionDate:dtoData.trimAutoReflectionDate,trimActDy:dtoData.trimActDy,trimActQty:dtoData.trimActQty,trimOrderNumber:dtoData.trimOrderNumber,trimOrderStatus:dtoData.trimOrderStatus,trimDeliveryDate:dtoData.trimDeliveryDate,poDlRequested:dtoData.poDlRequested,poDlAnswered:dtoData.poDlAnswered,poDlAuto:dtoData.poDlAuto,poProductionDueDateAuto:dtoData.poProductionDueDateAuto,poAutoReflectionDate:dtoData.poAutoReflectionDate,poActDy:dtoData.poActDy,poActQty:dtoData.poActQty,poOrderNumber:dtoData.poOrderNumber,poOrderStatus:dtoData.poOrderStatus,assort1:dtoData.assort1,assort2:dtoData.assort2,nxAssort:dtoData.nxAssort,solid:dtoData.solid,orderPlanQtyStop:dtoData.orderPlanQtyStop,fixFlag:dtoData.fixFlag,alternativeFlag:dtoData.alternativeFlag,expressLineFlag:dtoData.expressLineFlag,factoryComment:dtoData.factoryComment,plannedEXF:dtoData.plannedEXF,exfEtd:dtoData.exfEtd,exfWh:dtoData.exfWh,sweingCountryRegion:dtoData.sweingCountryRegion,rewMaterialOriginal:dtoData.rewMaterialOriginal,itemDrop:dtoData.itemDrop,fileId:Number(dtoData.fileId),countY:dtoData.countY,sample:dtoData.sample,exf:dtoData.exf,bddl:dtoData.bddl,bddlPast:dtoData.bddlPast,ltBdExf:dtoData.ltBdExf,newBddl:dtoData.newBddl,newLtBdExf:dtoData.newLtBdExf,ltPoExf:dtoData.ltPoExf,qtyLtBdExf:dtoData.qtyLtBdExf,qtyLtPoExf:dtoData.qtyLtPoExf,country2Y:dtoData.country2Y,phase:dtoData.phase,version:dtoData.version,month:Number(month),createDate: moment(dtoData.createDate).format('YYYY-MM-DD HH:mm'),updateDate:moment(dtoData.updateDate).format('YYYY-MM-DD HH:mm')

                })
                if (!updateOrder.affected) {
                    await transactionManager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                }
                const convertedExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData,id,details.productionPlanId,Number(month));
                const saveExcelEntity: OrdersChildEntity = await transactionManager.getRepository(OrdersChildEntity).save(convertedExcelEntity);
                if (saveExcelEntity) {
                    //difference insertion to order diff table
                    const existingDataKeys = Object.keys(details)
                    const currentDataKeys = Object.keys(dtoData)
                    for (const existingDataKey of existingDataKeys) {
                        if (details[existingDataKey] != dtoData[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'version' && existingDataKey != '' && existingDataKey != 'orderStatus' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser' && existingDataKey != 'fileId' && existingDataKey != 'month' && existingDataKey != 'productionPlanId') {
                            const orderDiffObj = new OrdersDifferenceEntity();
                            if (existingDataKey === 'publishDate' || existingDataKey === 'yarnProductionDueDateAuto' || existingDataKey === 'yarnAutoReflectionDate' || existingDataKey === 'EXF' || existingDataKey === 'yarnDeliveryDate' || existingDataKey === 'fbrcProductionDueDateAuto'|| existingDataKey === 'fbrcAutoReflectionDate'|| existingDataKey === 'fbrcDeliveryDate'|| existingDataKey === 'colorProductionDueDateAuto'|| existingDataKey === 'colorAutoReflectionDate'|| existingDataKey === 'colorDeliveryDate' || existingDataKey === 'trimProductionDueDateAuto'|| existingDataKey === 'trimAutoReflectionDate'|| existingDataKey === 'trimDeliveryDate'|| existingDataKey === 'poProductionDueDateAuto'|| existingDataKey === 'poAutoReflectionDate') {
                                const oldValue = moment(details[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY']).format('YYYY-MM-DD');
                                const newValue = moment(dtoData[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY']).format('YYYY-MM-DD');
                                orderDiffObj.oldValue = details[existingDataKey]
                                orderDiffObj.newValue = dtoData[existingDataKey]
                                orderDiffObj.columnName = orderColumnValues[existingDataKey]
                                orderDiffObj.displayName = existingDataKey
                                orderDiffObj.productionPlanId = details[0].productionPlanId
                                orderDiffObj.version = dtoData.version
                                orderDiffObj.fileId = Number(id)
                                orderDiffObj.orderPlanNumber = dtoData.orderPlanNumber
                                if (oldValue != newValue) {
                                    const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
                                    if (!orderDiffSave) {
                                        flag.add(false)
                                        await transactionManager.releaseTransaction();
                                        break;
                                    }
                                } else {
                                    continue;
                                }
                            } else {
                                orderDiffObj.oldValue = details[existingDataKey]
                                orderDiffObj.newValue = dtoData[existingDataKey]
                                orderDiffObj.columnName = orderColumnValues[existingDataKey]
                                orderDiffObj.displayName = existingDataKey
                                orderDiffObj.productionPlanId = details.productionPlanId
                                orderDiffObj.version = dtoData.version
                                orderDiffObj.fileId = Number(id)
                                orderDiffObj.orderPlanNumber = dtoData.orderPlanNumber
                                if (orderDiffObj.oldValue != orderDiffObj.newValue) {
                                    const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
                                    if (!orderDiffSave) {
                                        flag.add(false)
                                        await transactionManager.releaseTransaction();
                                        break;
                                    } 
                                }
                            }
                        }
                    }
                }
            } else {
                dtoData.version = 1
                const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(dtoData, id, Number(month));
                // console.log(convertedExcelEntity,'-----convertedExcelEntity------')
                const saveExcelEntity: OrdersEntity = await transactionManager.getRepository(OrdersEntity).save(convertedExcelEntity);
                const convertedChildExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData,id,saveExcelEntity.productionPlanId,Number(month));
                const saveChildExcelEntity: OrdersChildEntity = await transactionManager.getRepository(OrdersChildEntity).save(convertedChildExcelEntity);
                // const saveChildExcelDto = this.ordersChildAdapter.convertEntityToDto(saveChildExcelEntity);
                if (!saveExcelEntity || !saveChildExcelEntity) {
                    flag.add(false)
                    await transactionManager.releaseTransaction();
                    break;
                }
            }
        }
    }
    if (!(flag.has(false))) {
        await transactionManager.completeTransaction()
        return new CommonResponseModel(true, 1, 'Data saved sucessfully')
    } else {
        await transactionManager.releaseTransaction()
        return new CommonResponseModel(false, 0, 'Something went wrong')
    }
    } catch (error) {
        await transactionManager.releaseTransaction()
        return new CommonResponseModel(false, 0, error)
    }
    }
    async saveTrimOrdersData(formData: any, id: number, month: number): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const flag = new Set()
            const columnArray = [];
            const updatedArray = formData.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                        const newKey = key.replace(/\s/g, '_').replace(/[\(\)\.]/g, '').replace(/-/g, '_');
                        columnArray.push(newKey)
                        updatedObj[newKey] = obj[key];
                }
                return updatedObj;
            });
            // console.log(updatedArray,'updatedObj')

            const convertedData = updatedArray.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    const value = obj[key];
                    if (value === "") {
                        updatedObj[key] = null;
                    } else {
                        updatedObj[key] = value;
                        // var regexPattern = /[^A-Za-z0-9 -;:/.,()[]&_']/g;
                        // updatedObj[key] = value.replace(regexPattern, null);
                        // updatedObj[key] = Buffer.from(value, 'utf-8').toString()
                    }
                }
                return updatedObj;
            });
            const difference = columnArray.filter((element) => !TrimOrderColumns.includes(element));
            if(difference.length > 0){
                await transactionManager.releaseTransaction()
                return new CommonResponseModel(false,1110,'Please Upload Correct Excel')
            }
            for (const data of convertedData) {
                let dtoData
                if(data.Order_No != null){
                    dtoData = new TrimOrderDto(null,data.Order_No,data.Year,data.Revision_No,data.Planning_Ssn,data.Global_Business_Unit,data.Business_Unit,data.Item_Brand,data.Department,data.Revised_Date,data.Document_Status,data.Answered_Status,data.Vendor_Person_in_Charge,data.Decision_Date,data.Payment_Terms,data.Contracted_ETD,data.ETA_WH,data.Approver,data.Approval_Date,data.Order_Conditions,data.Remark,data.Raw_Material_CodeFR,data.Supplier_Raw_Material_Code,data.Supplier_Raw_Material,data.Vendor_Code,data.Vendor,data.Management_Factory_Code,data.Management_Factory,data.Branch_Factory_Code,data.Branch_Factory,data.Order_Plan_Number,data.Item_Code,data.Item,data.Representative_Sample_Code,data.Sample_Code,data.Color_Code,data.Color,data.Pattern_Dimension_Code,data.Size_Code,data.Size,(data.Order_Qtypcs).toString().replace(/,/g,''),data.Arrangement_By,data.Trim_Description,data.Trim_Item_No,data.Trim_Supplier,'bidhun',null,null,null,null,id,month)
                }else{
                    break;
                }
                if (dtoData.orderNo != null) {
                    const details = await this.trimOrdersRepository.findOne({ where: { orderNo: dtoData.orderNo,sizeCode:dtoData.sizeCode,colorCode:dtoData.colorCode } })
                    const versionDetails = await this.trimordersChildRepo.getVersion(dtoData.orderNo,dtoData.sizeCode,dtoData.colorCode)
                    let version = 1;
                    if (versionDetails.length > 0) {
                        version = Number(versionDetails.length) + 1
                    }
                    dtoData.version = version
                    if (details) {
                        // const updatedData = this.ordersAdapter.convertDtoToEntity(data);
                        const updateOrder = await transactionManager.getRepository(TrimOrdersEntity).update({ orderNo: dtoData.orderNo,sizeCode:dtoData.sizeCode,colorCode:dtoData.colorCode }, {
                            year : dtoData.year,revisionNo : dtoData.revisionNo,planningSsn : dtoData.planningSsn,globalBusinessUnit : dtoData.globalBusinessUnit,businessUnit : dtoData.businessUnit,itemBrand : dtoData.itemBrand,Department : dtoData.Department,revisedDate : dtoData.revisedDate,DocumentStatus : dtoData.DocumentStatus,answeredStatus : dtoData.answeredStatus,vendorPersoninCharge : dtoData.vendorPersoninCharge,decisionDate : dtoData.decisionDate,paymentTerms : dtoData.paymentTerms,contractedETD : dtoData.contractedETD,ETAWH : dtoData.ETAWH,approver : dtoData.approver,approvalDate : dtoData.approvalDate,orderConditions : dtoData.orderConditions,remark : dtoData.remark,rawMaterialCode : dtoData.rawMaterialCode,supplierRawMaterialCode : dtoData.supplierRawMaterialCode,supplierRawMaterial : dtoData.supplierRawMaterial,vendorCode : dtoData.vendorCode,vendor : dtoData.vendor,managementFactoryCode : dtoData.managementFactoryCode,managementFactory : dtoData.managementFactory,branchFactoryCode : dtoData.branchFactoryCode,branchFactory : dtoData.branchFactory,orderPlanNumber : dtoData.orderPlanNumber,itemCode : dtoData.itemCode,item : dtoData.item,representativeSampleCode : dtoData.representativeSampleCode,sampleCode : dtoData.sampleCode,colorCode : dtoData.colorCode,color : dtoData.color,patternDimensionCode : dtoData.patternDimensionCode,sizeCode : dtoData.sizeCode,size : dtoData.size,arrangementBy : dtoData.arrangementBy,trimDescription : dtoData.trimDescription,trimItemNo : dtoData.trimItemNo,trimSupplier : dtoData.trimSupplier,createdUser : dtoData.createdUser,updatedUser : dtoData.updatedUser,version : dtoData.version,fileId : dtoData.fileId,month:dtoData.month,orderQtyPcs:dtoData.orderQtyPcs
                        })
                        if (!updateOrder.affected) {
                            await transactionManager.releaseTransaction();
                            return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                        }
                        const convertedExcelEntity: Partial<TrimOrdersChildEntity> = this.trimordersChildAdapter.convertDtoToEntity(dtoData, id, month);
                        const saveExcelEntity: TrimOrdersChildEntity = await transactionManager.getRepository(TrimOrdersChildEntity).save(convertedExcelEntity);
                        // if (saveExcelEntity) {
                        //     //difference insertion to order diff table
                        //     const existingDataKeys = Object.keys(details)
                        //     const currentDataKeys = Object.keys(dtoData)
                        //     for (const existingDataKey of existingDataKeys) {
                        //         if (details[existingDataKey] != data[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'version' && existingDataKey != '' && existingDataKey != 'orderStatus' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser' && existingDataKey != 'fileId' && existingDataKey != 'month') {
                        //             const orderDiffObj = new OrdersDifferenceEntity();
                        //             if (existingDataKey === 'lastUpdateDate' || existingDataKey === 'requestedWhDate' || existingDataKey === 'contractedDate' || existingDataKey === 'EXF') {
                        //                 const oldValue = moment(details[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY']).format('YYYY-MM-DD');
                        //                 const newValue = moment(dtoData[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY']).format('YYYY-MM-DD');
                        //                 orderDiffObj.oldValue = details[existingDataKey]
                        //                 orderDiffObj.newValue = dtoData[existingDataKey]
                        //                 orderDiffObj.columnName = orderColumnValues[existingDataKey]
                        //                 orderDiffObj.displayName = existingDataKey
                        //                 orderDiffObj.productionPlanId = dtoData.productionPlanId
                        //                 orderDiffObj.version = dtoData.version
                        //                 orderDiffObj.fileId = id
                        //                 if (oldValue != newValue) {
                        //                     const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
                        //                     if (!orderDiffSave) {
                        //                         flag.add(false)
                        //                         await transactionManager.releaseTransaction();
                        //                         break;
                        //                     }
                        //                 } else {
                        //                     continue;
                        //                 }
                        //             } else {
                        //                 orderDiffObj.oldValue = details[existingDataKey]
                        //                 orderDiffObj.newValue = dtoData[existingDataKey]
                        //                 orderDiffObj.columnName = orderColumnValues[existingDataKey]
                        //                 orderDiffObj.displayName = existingDataKey
                        //                 orderDiffObj.productionPlanId = dtoData.productionPlanId
                        //                 orderDiffObj.version = dtoData.version
                        //                 orderDiffObj.fileId = id
                        //                 if (orderDiffObj.oldValue != orderDiffObj.newValue) {
                        //                     const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
                        //                     if (!orderDiffSave) {
                        //                         flag.add(false)
                        //                         await transactionManager.releaseTransaction();
                        //                         break;
                        //                     }
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }
                    } else {

                        dtoData.version = 1
                        const convertedExcelEntity: Partial<TrimOrdersEntity> = this.trimordersAdapter.convertDtoToEntity(dtoData, id, month);
                        const saveExcelEntity: TrimOrdersEntity = await transactionManager.getRepository(TrimOrdersEntity).save(convertedExcelEntity);
                        const convertedChildExcelEntity: Partial<TrimOrdersChildEntity> = this.trimordersChildAdapter.convertDtoToEntity(dtoData, id, month);
                        const saveChildExcelEntity: TrimOrdersChildEntity = await transactionManager.getRepository(TrimOrdersChildEntity).save(convertedChildExcelEntity);
                        // const saveChildExcelDto = this.ordersChildAdapter.convertEntityToDto(saveChildExcelEntity);
                        if (!saveExcelEntity || !saveChildExcelEntity) {
                            flag.add(false)
                            await transactionManager.releaseTransaction();
                            break;
                        }
                    }
                }else{
                    break;
                }
            }

            if (!flag.has(false)) {
                await transactionManager.completeTransaction()
                return new CommonResponseModel(true, 1, 'Data saved sucessfully')
            } else {
                await transactionManager.releaseTransaction()
                return new CommonResponseModel(false, 0, 'Something went wrong')
            }
        } catch (error) {
            await transactionManager.releaseTransaction()
            return new CommonResponseModel(false, 0, error)
        }
    }

    async getOrdersData(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.getOrdersData()
        if (details)
            return new CommonResponseModel(true, 1, 'data retrived', details)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getQtyChangeData(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getQtyChangeData()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getQtyDifChangeData(): Promise<CommonResponseModel> {
        const files = await this.fileUploadRepo.getFilesData()

        let data;
        if (files.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        } else if (files.length == 1) {
            data = await this.ordersChildRepo.getItemQtyChangeData1(files[0]?.fileId)
        } else {
            data = await this.ordersChildRepo.getItemQtyChangeData(files[1]?.fileId, files[0]?.fileId)
        }
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getContractDateChangeData(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getContractDateChangeData()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getWharehouseDateChangeData(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getWharehouseDateChangeData()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getUnitWiseOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getUnitCount()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getDivisionWiseOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getDivisionCount()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getMaximumChangedOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersChildRepo.getNoOfChangedItem()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async revertProjectionFileData(req: FileIdReq): Promise<CommonResponseModel> {
        const manager = new GenericTransactionManager(this.dataSource);
        await manager.startTransaction();
        if (req) {
            const latestFileId = await manager.getRepository(FileUploadEntity).update({ id: req.fileId }, { isActive: false })
            if(!latestFileId.affected){
                await manager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong in File update')
            }
        }
        if (req) {
            const deleteChildData = await manager.getRepository(OrdersChildEntity).delete({fileId:req.fileId})
            if(!deleteChildData.affected){
                await manager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
            } 
            
        }
        if (req) {
            const getOrderDiff = await this.orderDiffRepo.find({where:{fileId:req.fileId}})
            if(getOrderDiff.length > 0){
                const deleteDiffData = await manager.getRepository(OrdersDifferenceEntity).delete({fileId:req.fileId})
                if(!deleteDiffData.affected){
                    await manager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
                }
            }
        }
        if (req) {
            const deleteOrdersData = await manager.getRepository(OrdersEntity).delete({fileId:req.fileId,version:1})
            // if(!deleteOrdersData.affected){
            //     await manager.releaseTransaction();
            //     return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
            // }
        }
        const updatedData = await manager.getRepository(OrdersChildEntity).find({select:['fileId'],
        order: { id: 'DESC' },take:1
        })
        const flag = new Set()
        let data = []
        if(updatedData.length > 0){
            data = await manager.getRepository(OrdersChildEntity).find({where: { fileId: updatedData[0]?.fileId }})
            // this.ordersChildRepo.find({
            //     where: { fileId: updatedData[0]?.fileId },
            //     // relations: ['orders']
            // })
        } else{
            flag.add(true)
        }
       
        if(data.length > 0){

            for (const dtoData of data) {
                // const prodPlanId = new OrdersEntity();
                // prodPlanId.productionPlanId = dtoData.orders.productionPlanId
                const updateOrder = await manager.getRepository(OrdersEntity).update({ orderPlanNumber: dtoData.orderPlanNumber },{ 
                    year: dtoData.year,planningSsnCd: dtoData.planningSsnCd,planningSsn: dtoData.planningSsn,tgtSsnCd: dtoData.tgtSsnCd,tgtSsn: dtoData.tgtSsn,bizCd: dtoData.bizCd,biz: dtoData.biz,planningRegionCode: dtoData.planningRegionCode,planningRegionName: dtoData.planningRegionName,channelCode: dtoData.channelCode,channelName: dtoData.channelName,department: dtoData.department,deptCd: dtoData.deptCd,Cls1_cd: dtoData.Cls1_cd,Cls2_cd: dtoData.Cls2_cd,gDept: dtoData.gDept,subCategory1: dtoData.subCategory1,coreCategory: dtoData.coreCategory,subCategory2: dtoData.subCategory2,subCategory3: dtoData.subCategory3,productionCategoryFabric: dtoData.productionCategoryFabric,productionCategoryFabricProcessing: dtoData.productionCategoryFabricProcessing,productionCategorySewing: dtoData.productionCategorySewing,productionCategorySewingProcessing: dtoData.productionCategorySewingProcessing,planningSumCode: dtoData.planningSumCode,planningSum: dtoData.planningSum,localNameGhq: dtoData.localNameGhq,itemCd: dtoData.itemCd,item: dtoData.item,origPrice: dtoData.origPrice,mainSampleCode: dtoData.mainSampleCode,frFabricCode: dtoData.frFabricCode,frFabric: dtoData.frFabric,supplierRawMaterialCode: dtoData.supplierRawMaterialCode,supplierRawMaterial: dtoData.supplierRawMaterial,rawMaterialSupplierCode: dtoData.rawMaterialSupplierCode,rawMaterialSupplier: dtoData.rawMaterialSupplier,vendorCoode: dtoData.vendorCoode,vendor: dtoData.vendor,sewingFactoryCode: dtoData.sewingFactoryCode,sewingFactory: dtoData.sewingFactory,branchFactoryCode: dtoData.branchFactoryCode,branchFactory: dtoData.branchFactory,coeff: dtoData.coeff,itemBranchNumber: dtoData.itemBranchNumber,officialPlanStdQty: dtoData.officialPlanStdQty,OfficialPlanFabPrpPlnQty: dtoData.OfficialPlanFabPrpPlnQty,OfficialPlanPoPrSlsQty: dtoData.OfficialPlanPoPrSlsQty,officalPlanCoQty: dtoData.officalPlanCoQty,officalPlanStockQty: dtoData.officalPlanStockQty,slsStartDy: dtoData.slsStartDy,publishFlagForFactory: dtoData.publishFlagForFactory,publishDate: dtoData.publishDate,allcEndDy: dtoData.allcEndDy,slsEndDy: dtoData.slsEndDy,GWH: dtoData.GWH,orderPlanNumber: dtoData.orderPlanNumber,orderTiming: dtoData.orderTiming,swngPrdMonth: dtoData.swngPrdMonth,swngPrdWeek: dtoData.swngPrdWeek,orderPlanQty: dtoData.orderPlanQty,orderPlanQtyCoeff: dtoData.orderPlanQtyCoeff,trnspMthd: dtoData.trnspMthd,prodPlanType: dtoData.prodPlanType,ph1St: dtoData.ph1St,wh: dtoData.wh,whAct: dtoData.whAct,whAuto: dtoData.whAuto,yarnDlRequested: dtoData.yarnDlRequested,yarnDlAnswered: dtoData.yarnDlAnswered,yarnDlAuto: dtoData.yarnDlAuto,yarnProductionDueDateAuto: dtoData.yarnProductionDueDateAuto,yarnAutoReflectionDate: dtoData.yarnAutoReflectionDate,yarnActDy: dtoData.yarnActDy,yarnActQty: dtoData.yarnActQty,yarnOrderNumber: dtoData.yarnOrderNumber,yarnOrderStatus: dtoData.yarnOrderStatus,yarnDeliveryDate: dtoData.yarnDeliveryDate,fbrcDlRequested: dtoData.fbrcDlRequested,fbrcDlAnswered: dtoData.fbrcDlAnswered,fbrcDlAuto: dtoData.fbrcDlAuto,fbrcProductionDueDateAuto: dtoData.fbrcProductionDueDateAuto,fbrcAutoReflectionDate: dtoData.fbrcAutoReflectionDate,factoryCommentUpdateDate: dtoData.factoryCommentUpdateDate,fbrcActDy: dtoData.fbrcActDy,fbrcActQty: dtoData.fbrcActQty,fbrcOrderNumber: dtoData.fbrcOrderNumber,fbrcOrderStatus: dtoData.fbrcOrderStatus,fbrcDeliveryDate: dtoData.fbrcDeliveryDate,colorDlRequested: dtoData.colorDlRequested,colorDlAnswered: dtoData.colorDlAnswered,colorDlAuto: dtoData.colorDlAuto,colorProductionDueDateAuto: dtoData.colorProductionDueDateAuto,colorAutoReflectionDate: dtoData.colorAutoReflectionDate,colorActDy: dtoData.colorActDy,colorActQty: dtoData.colorActQty,colorOrderNumber: dtoData.colorOrderNumber,colorOrderStatus: dtoData.colorOrderStatus,colorDeliveryDate: dtoData.colorDeliveryDate,trimDlRequested: dtoData.trimDlRequested,trimDlAnswered: dtoData.trimDlAnswered,trimDlAuto: dtoData.trimDlAuto,trimProductionDueDateAuto: dtoData.trimProductionDueDateAuto,trimAutoReflectionDate: dtoData.trimAutoReflectionDate,trimActDy: dtoData.trimActDy,trimActQty: dtoData.trimActQty,trimOrderNumber: dtoData.trimOrderNumber,trimOrderStatus: dtoData.trimOrderStatus,trimDeliveryDate: dtoData.trimDeliveryDate,poDlRequested: dtoData.poDlRequested,poDlAnswered: dtoData.poDlAnswered,poDlAuto: dtoData.poDlAuto,PO_EXFtotalAbnormalLT: dtoData.PO_EXFtotalAbnormalLT,poProductionDueDateAuto: dtoData.poProductionDueDateAuto,poAutoReflectionDate: dtoData.poAutoReflectionDate,poActDy: dtoData.poActDy,poActQty: dtoData.poActQty,poOrderNumber: dtoData.poOrderNumber,poOrderStatus: dtoData.poOrderStatus,assort1: dtoData.assort1,assort2: dtoData.assort2,nxAssort: dtoData.nxAssort,solid: dtoData.solid,orderPlanQtyStop: dtoData.orderPlanQtyStop,fixFlag: dtoData.fixFlag,alternativeFlag: dtoData.alternativeFlag,expressLineFlag: dtoData.expressLineFlag,factoryComment: dtoData.factoryComment,plannedEXF: dtoData.plannedEXF,exfEtd: dtoData.exfEtd,exfWh: dtoData.exfWh,sweingCountryRegion: dtoData.sweingCountryRegion,rewMaterialOriginal: dtoData.rewMaterialOriginal,itemDrop: dtoData.itemDrop,version: Number(dtoData.version),fileId: dtoData.fileId,countY: dtoData.countY,sample: dtoData.sample,exf: dtoData.exf,bddl: dtoData.bddl,bddlPast: dtoData.bddlPast,ltBdExf: dtoData.ltBdExf,newBddl: dtoData.newBddl,newLtBdExf: dtoData.newLtBdExf,ltPoExf: dtoData.ltPoExf,qtyLtBdExf: dtoData.qtyLtBdExf,qtyLtPoExf: dtoData.qtyLtPoExf,country2Y: dtoData.country2Y,phase: dtoData.phase
                })
               
                if (updateOrder.affected) {
                    flag.add(true)
                }else {
                    flag.add(false)
                    await manager.releaseTransaction()
                    return new CommonResponseModel(false, 0, 'Something went wrong in order update', updateOrder)
                }
            }
        } else{
            flag.add(true)
        }
        if (flag.has(true)) {
            await manager.completeTransaction()
            return new CommonResponseModel(true, 1, 'File Reverted Successfully')
        } else {
            await manager.releaseTransaction()
            return new CommonResponseModel(false, 0, 'failed to revert file data')
        }
    }

    async revertTrimFileData(req: FileIdReq): Promise<CommonResponseModel> {
        const manager = new GenericTransactionManager(this.dataSource)
        await manager.startTransaction()

        if (req) {
            const latestFileId = await manager.getRepository(FileUploadEntity).update({ id: req.fileId }, { isActive: false })
            if(!latestFileId.affected){
                await manager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong in File update')
            }
        }
        if (req) {
            const deleteChildData = await manager.getRepository(TrimOrdersChildEntity).delete({fileId:req.fileId})
            if(!deleteChildData.affected){
                await manager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
            }
        }
        // if (req) {
        //     const deleteDiffData = await this.orderDiffRepo.deleteDiffData(req)
        // }
        if (req) {
            const deleteOrdersData = await manager.getRepository(TrimOrdersEntity).delete({fileId:req.fileId,version:1})
            // if(!deleteOrdersData.affected){
            //     await manager.releaseTransaction();
            //     return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
            // }
        }
        const updatedData = await manager.getRepository(TrimOrdersChildEntity).find({select:['fileId'],
        order: { id: 'DESC' },take:1
        })
        const flag = new Set()
        let data = []
        if(updatedData.length > 0){

             data = await this.trimordersChildRepo.find({
                where: { fileId: updatedData[0]?.fileId },
                // relations: ['orders']
            })
        } else{
            flag.add(true)
        }
        if(data.length > 0){

            for (const dtoData of data) {
                // const prodPlanId = new OrdersEntity();
                // prodPlanId.productionPlanId = dtoData.orders.productionPlanId
                const updateOrder = await manager.getRepository(TrimOrdersEntity).update({ orderNo: dtoData.orderNo,sizeCode:dtoData.sizeCode,colorCode:dtoData.colorCode }, {
                    year : dtoData.year,revisionNo : dtoData.revisionNo,planningSsn : dtoData.planningSsn,globalBusinessUnit : dtoData.globalBusinessUnit,businessUnit : dtoData.businessUnit,itemBrand : dtoData.itemBrand,Department : dtoData.Department,revisedDate : dtoData.revisedDate,DocumentStatus : dtoData.DocumentStatus,answeredStatus : dtoData.answeredStatus,vendorPersoninCharge : dtoData.vendorPersoninCharge,decisionDate : dtoData.decisionDate,paymentTerms : dtoData.paymentTerms,contractedETD : dtoData.contractedETD,ETAWH : dtoData.ETAWH,approver : dtoData.approver,approvalDate : dtoData.approvalDate,orderConditions : dtoData.orderConditions,remark : dtoData.remark,rawMaterialCode : dtoData.rawMaterialCode,supplierRawMaterialCode : dtoData.supplierRawMaterialCode,supplierRawMaterial : dtoData.supplierRawMaterial,vendorCode : dtoData.vendorCode,vendor : dtoData.vendor,managementFactoryCode : dtoData.managementFactoryCode,managementFactory : dtoData.managementFactory,branchFactoryCode : dtoData.branchFactoryCode,branchFactory : dtoData.branchFactory,orderPlanNumber : dtoData.orderPlanNumber,itemCode : dtoData.itemCode,item : dtoData.item,representativeSampleCode : dtoData.representativeSampleCode,sampleCode : dtoData.sampleCode,colorCode : dtoData.colorCode,color : dtoData.color,patternDimensionCode : dtoData.patternDimensionCode,sizeCode : dtoData.sizeCode,size : dtoData.size,arrangementBy : dtoData.arrangementBy,trimDescription : dtoData.trimDescription,trimItemNo : dtoData.trimItemNo,trimSupplier : dtoData.trimSupplier,createdUser : dtoData.createdUser,updatedUser : dtoData.updatedUser,version : dtoData.version,fileId : dtoData.fileId,month:dtoData.month,orderQtyPcs:dtoData.orderQtyPcs
                })
                if (!updateOrder.affected) {
                    flag.add(false)
                    await manager.releaseTransaction()
                    return new CommonResponseModel(false, 0, 'Something went wrong in Trim order update', updateOrder)
                }
                 else {
                    flag.add(true)
                }
            }
        }else{
            flag.add(true)
        }
        if (flag.has(true)) {
            await manager.completeTransaction()
            return new CommonResponseModel(true, 1, 'File Reverted Successfully')
        } else {
            await manager.releaseTransaction()
            return new CommonResponseModel(false, 0, 'failed to revert file data')
        }
    }

    async updatePath(filePath: string, filename: string, month: number,fileType:string): Promise<CommonResponseModel> {
        const entity = new FileUploadEntity()
        entity.fileName = filename;
        entity.filePath = filePath;
        entity.month = 9;
        entity.fileType = fileType;
        entity.status = 'uploading';
        const file = await this.fileUploadRepo.findOne({ where: { fileName: filename, isActive: true } })
        if (file) {
            return new CommonResponseModel(false, 0, 'File with same name already uploaded');
        } else {
            const save = await this.fileUploadRepo.save(entity)
            if (save) {
                return new CommonResponseModel(true, 1, 'uploaded successfully', save);
            }
            else {
                return new CommonResponseModel(false, 0, 'uploaded failed', save);
            }
        }
    }

    async updateFileStatus(req: FileStatusReq): Promise<CommonResponseModel> {
        let update
        if (req.status === 'Failed') {
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status, isActive: false, createdUser: req.userName });
        } else {
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status, createdUser: req.userName })
        }
        if (update.affected) {
            return new CommonResponseModel(true, 1, 'updated successfully');
        } else {
            return new CommonResponseModel(false, 0, 'update failed');

        }
    }

    async getUploadFilesData(req:FileTypeDto): Promise<CommonResponseModel> {
        let data
        if(req.fileType !== undefined){

            data = await this.fileUploadRepo.getFilesData(req)
        } else{
            data = await this.fileUploadRepo.getFilesData()
        }
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', data);
        }
        else {
            return new CommonResponseModel(false, 0, 'No data found', data);
        }
    }

    async getVersionWiseData(): Promise<CommonResponseModel> {
        const records = await this.ordersChildRepo.getVersionWiseQty()
        const versionDataMap = new Map<number, VersionDataModel>();
        if (records.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        }
        for (const record of records) {
            if (!versionDataMap.has(record.production_plan_id)) {
                versionDataMap.set(record.production_plan_id, new VersionDataModel(record.production_plan_id, record.prod_plan_type_name, record.item_code, record.itemName, []));
            }
            versionDataMap.get(record.production_plan_id).versionWiseData.push(new VersionAndQtyModel(record.version, record.order_qty_pcs));
        }
        const versionDataModelArray: VersionDataModel[] = [];
        versionDataMap.forEach(version => versionDataModelArray.push(version));
        return new CommonResponseModel(true, 1, 'Data retrived successfully', versionDataModelArray);
    }

    async getPhaseWiseData(): Promise<CommonResponseModel> {
        const files = await this.fileUploadRepo.getFilesData();
        let records;
        if (files.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        } else if (files.length == 1) {
            records = await this.ordersChildRepo.getPhaseWiseData(files[0].fileId)
        } else {
            records = await this.ordersChildRepo.getPhaseWiseData(files[0].fileId, files[1]?.fileId, files[2]?.fileId, files[3]?.fileId, files[4]?.fileId)
        }
        const phaseWiseDataMap = new Map<number, PhaseWiseDataModel>();
        if (records.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        }
        for (const record of records) {
            if (!phaseWiseDataMap.has(record.item_code)) {
                phaseWiseDataMap.set(record.item_code, new PhaseWiseDataModel(record.item_code, record.itemName, []));
            }
            phaseWiseDataMap.get(record.item_code).phaseWiseData.push(new PhaseAndQtyModel(record.prod_plan_type_name, record.old_qty_value3, record.old_qty_value2, record.old_qty_value1, record.old_qty_value, record.new_qty_value));
        }
        const phaseDataModelArray: PhaseWiseDataModel[] = [];
        phaseWiseDataMap.forEach(phase => phaseDataModelArray.push(phase));
        return new CommonResponseModel(true, 1, 'Data retrived successfully', phaseDataModelArray);
    }

    async getPhaseWiseExcelData(): Promise<CommonResponseModel> {
        const files = await this.fileUploadRepo.getFilesData();
        let records;
        if (files.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        } else if (files.length == 1) {
            records = await this.ordersChildRepo.getPhaseWiseData(files[0].fileId)
        } else {
            records = await this.ordersChildRepo.getPhaseWiseData(files[0].fileId, files[1]?.fileId, files[2]?.fileId, files[3]?.fileId, files[4]?.fileId)
        }
        const phaseDataModelArray: PhaseWiseExcelDataModel[] = [];
        if (records.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        }
        for (const record of records) {
            phaseDataModelArray.push(new PhaseWiseExcelDataModel(record.item_code, record.itemName, record.prod_plan_type_name, record.old_qty_value3, record.old_qty_value2, record.old_qty_value1, record.old_qty_value, record.new_qty_value, record.new_qty_value - record.old_qty_value));
        }
        return new CommonResponseModel(true, 1, 'Data retrived successfully', phaseDataModelArray);
    }

    async getMonthWiseData(): Promise<CommonResponseModel> {
        const files = await this.fileUploadRepo.getlatestFileIdAgainstMonth();
        const fileIdsByMonth: Record<string, number> = {};

        for (const entry of files) {
            const { id, month } = entry;
            const fileId = `fileId${month}`;
            fileIdsByMonth[fileId] = id;
        }
        let records;
        if (files.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        } else {
            records = await this.ordersChildRepo.getMonthWiseData(fileIdsByMonth?.fileId1, fileIdsByMonth?.fileId2, fileIdsByMonth?.fileId3, fileIdsByMonth?.fileId4, fileIdsByMonth?.fileId5, fileIdsByMonth?.fileId6, fileIdsByMonth?.fileId7, fileIdsByMonth?.fileId8, fileIdsByMonth?.fileId9, fileIdsByMonth?.fileId10, fileIdsByMonth?.fileId11, fileIdsByMonth?.fileId12)
        }
        const monthWiseDataMap = new Map<number, MonthWiseDataModel>();
        if (records.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        }
        for (const record of records) {
            if (!monthWiseDataMap.has(record.item_code)) {
                monthWiseDataMap.set(record.item_code, new MonthWiseDataModel(record.item_code, record.itemName, []));
            }
            monthWiseDataMap.get(record.item_code).monthWiseData.push(new MonthAndQtyModel(record.prod_plan_type_name, record.old_qty_value1, record.old_qty_value2, record.old_qty_value3, record.old_qty_value4, record.old_qty_value5, record.old_qty_value6, record.old_qty_value7, record.old_qty_value8, record.old_qty_value9, record.old_qty_value10, record.old_qty_value11, record.old_qty_value12));
        }
        const monthDataModelArray: MonthWiseDataModel[] = [];
        monthWiseDataMap.forEach(phase => monthDataModelArray.push(phase));
        return new CommonResponseModel(true, 1, 'Data retrived successfully', monthDataModelArray);
    }

    async getAllLatestFileMonthWisedata(): Promise<CommonResponseModel> {
        try {
            const query = 'WITH LatestFileCreated AS (SELECT t1.MONTH,t1.file_id,t1.created_at AS latest_created_at FROM orders_child t1  WHERE (t1.MONTH, t1.created_at) IN (SELECT t2.MONTH,MAX(t2.created_at) AS latest_created_at FROM orders_child t2  WHERE t2.MONTH = t1.MONTH GROUP BY t2.MONTH ))SELECT item_code, itemName , prod_plan_type_name,lf.MONTH,lf.file_id, SUM(oc.order_qty_pcs) AS total_quantity FROM LatestFileCreated lf JOIN orders_child oc ON lf.MONTH = oc.MONTH AND lf.file_id = oc.file_id GROUP BY lf.MONTH, lf.file_id'
            const result = await this.ordersChildRepo.query(query)
            if (result.length > 0) {
                return new CommonResponseModel(true, 1, 'Data retived sucssfully', result)

            } else {
                return new CommonResponseModel(false, 1, 'Nod Data Found', [])
            }
        }
        catch (error) {
            throw error
        }
    }

    async getMonthlyPhaseWiseExcelData(): Promise<CommonResponseModel> {
        const files = await this.fileUploadRepo.getlatestFileIdAgainstMonth();
        const fileIdsByMonth: Record<string, number> = {};

        for (const entry of files) {
            const { id, month } = entry;
            const fileId = `fileId${month}`;
            fileIdsByMonth[fileId] = id;
        }
        let records;
        if (files.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        } else {
            records = await this.ordersChildRepo.getMonthWiseData(fileIdsByMonth?.fileId1, fileIdsByMonth?.fileId2, fileIdsByMonth?.fileId3, fileIdsByMonth?.fileId4, fileIdsByMonth?.fileId5, fileIdsByMonth?.fileId6, fileIdsByMonth?.fileId7, fileIdsByMonth?.fileId8, fileIdsByMonth?.fileId9, fileIdsByMonth?.fileId10, fileIdsByMonth?.fileId11, fileIdsByMonth?.fileId12)
        }
        if (records.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        }
        const monthWiseDataModelArray: MonthWiseExcelDataModel[] = [];
        for (const record of records) {
            monthWiseDataModelArray.push(new MonthWiseExcelDataModel(record.item_code, record.itemName, record.prod_plan_type_name, record.old_qty_value1, record.old_qty_value2, record.old_qty_value3, record.old_qty_value4, record.old_qty_value5, record.old_qty_value6, record.old_qty_value7, record.old_qty_value8, record.old_qty_value9, record.old_qty_value10, record.old_qty_value11, record.old_qty_value12));
        }
        return new CommonResponseModel(true, 1, 'Data retrived successfully', monthWiseDataModelArray);
    }
    
    async getTrimOrdersData(): Promise<CommonResponseModel> {
        const data = await this.trimOrderRepo.getTrimOders()
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', data);
        }
        else {
            return new CommonResponseModel(false, 0, 'No data found', data);
        }
    }
    async getExfactoryYear(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getExfactoryYearData()
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', data);
        }
        else {
            return new CommonResponseModel(false, 0, 'No data found', data);
        }
    }
    async getExfactoryMonthData(req:YearReq): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getExfactoryMonthData(req.year);
        
        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }
    
        const DateMap = new Map<string, ItemDataDto>();        
        for (const rec of data) {
            if (!DateMap.has(rec.item_cd)) {
                DateMap.set(
                    rec.item_cd,
                    new ItemDataDto(rec.item, [])
                );
            }
            const monthData = DateMap.get(rec.item_cd).monthWiseData;
            const phase = monthData.find(e => e.phasetype === rec.prod_plan_type)

    // const phase = 
    // console.log(monthData.find(e=> e.phasetype === rec.prod_plan_type),'-------')
            if (!phase) {
                const pcs: PcsDataDto[] = [];
                const coeff: CoeffDataDto[] = [];
             pcs.push(
               { name: 'In Pcs',
                janPcs: rec.ExfMonth === 1 ? rec.order_plan_qty :0,
                febPcs: rec.ExfMonth === 2 ? rec.order_plan_qty :0,
                marPcs: rec.ExfMonth === 3 ? rec.order_plan_qty :0,
                aprPcs: rec.ExfMonth === 4 ? rec.order_plan_qty :0,
                mayPcs: rec.ExfMonth === 5 ? rec.order_plan_qty :0,
                junPcs: rec.ExfMonth === 6 ? rec.order_plan_qty :0,
                julPcs: rec.ExfMonth === 7 ? rec.order_plan_qty :0,
                augPcs: rec.ExfMonth === 8 ? rec.order_plan_qty :0,
                sepPcs: rec.ExfMonth === 9 ? rec.order_plan_qty :0,
                octPcs: rec.ExfMonth === 10 ? rec.order_plan_qty :0,
                novPcs: rec.ExfMonth === 11 ? rec.order_plan_qty :0,
                decPcs: rec.ExfMonth === 12 ? rec.order_plan_qty :0,}
            )
              coeff.push({
                name: 'In Coeff',
                janCoeff: rec.ExfMonth === 1 ? rec.order_plan_qty_coeff :0,
                febCoeff: rec.ExfMonth === 2 ? rec.order_plan_qty_coeff :0,
                marCoeff: rec.ExfMonth === 3 ? rec.order_plan_qty_coeff :0,
                aprCoeff: rec.ExfMonth === 4 ? rec.order_plan_qty_coeff :0,
                mayCoeff: rec.ExfMonth === 5 ? rec.order_plan_qty_coeff :0,
                junCoeff: rec.ExfMonth === 6 ? rec.order_plan_qty_coeff :0,
                julCoeff: rec.ExfMonth === 7 ? rec.order_plan_qty_coeff :0,
                augCoeff: rec.ExfMonth === 8 ? rec.order_plan_qty_coeff :0,
                sepCoeff: rec.ExfMonth === 9 ? rec.order_plan_qty_coeff :0,
                octCoeff: rec.ExfMonth === 10 ? rec.order_plan_qty_coeff :0,
                novCoeff: rec.ExfMonth === 11 ? rec.order_plan_qty_coeff :0,
                decCoeff: rec.ExfMonth === 12 ? rec.order_plan_qty_coeff :0,
              })
              const totalPcs = pcs.reduce((total, item) => {
                return  [item.janPcs, item.febPcs, item.marPcs, item.aprPcs, item.mayPcs, item.junPcs, item.julPcs, item.augPcs, item.sepPcs, item.octPcs, item.novPcs, item.decPcs]
                    .filter(value => value !== 0) // Filter out values equal to 0
                    .reduce((sum, value) =>  value, 0);
            }, 0);
            
            const totalCoeff = coeff.reduce((total, item) => {
                return  [item.janCoeff, item.febCoeff, item.marCoeff, item.aprCoeff, item.mayCoeff, item.junCoeff, item.julCoeff, item.augCoeff, item.sepCoeff, item.octCoeff, item.novCoeff, item.decCoeff]
                    .filter(value => value !== 0) // Filter out values equal to 0
                    .reduce((sum, value) => value, 0);
            }, 0);
            //   console.log(Math.round(totalPcs),'ppppppppppp');
            //   console.log(totalCoeff,'cccccccccccccccc');
              
                const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff,totalPcs,totalCoeff);
                monthData.push(monthWiseInstance); // Store each instance
                // console.log(monthWiseInstance,"rec")
            }
            
        }
        
        const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());   
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }

    async getSeasonWiseOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getSeasonCount()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getYearWiseOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getYearWiseData()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async seasonWiseReport(req?:SeasonWiseRequest): Promise<CommonResponseModel> {
        let query = `SELECT planning_ssn as plannedSeason,year,item_cd as itemCode,item as itemName,SUM(january) AS january,SUM(february) AS february,SUM(march) AS march,SUM(april) AS april,SUM(may) AS may,SUM(june) AS june,SUM(july) AS july,SUM(august) AS august,SUM(september) AS september,SUM(october) AS october,SUM(november) AS november,SUM(december) AS december,SUM(exfJan) AS exfJan,SUM(exfFeb) AS exfFeb,SUM(exfMarch) AS exfMarch,SUM(exfApril) AS exfApril,SUM(exfMay) AS exfMay,SUM(exfJune) AS exfJune,SUM(exfJuly) AS exfJuly,SUM(exfAug) AS exfAug,SUM(exfSep) AS exfSep,SUM(exfOct) AS exfOct,SUM(exfNov) AS exfNov,SUM(exfDec) AS exfDec,
        SUM(january + february + march + april + may + june + july + august + september + october + november + december) AS whTotal,
        SUM(exfJan + exfFeb + exfMarch + exfApril + exfMay + exfJune + exfJuly + exfAug + exfSep + exfOct + exfNov + exfDec) AS exfTotal
      FROM (
        SELECT planning_ssn, year, item_cd, item,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 1 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS january,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 2 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS february,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 3 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS march,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 4 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS april,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 5 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS may,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 6 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS june,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 7 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS july,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 8 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS august,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 9 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS september,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 10 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS october,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 11 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS november,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 12 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS december,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 1 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfJan,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 2 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfFeb,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 3 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfMarch,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 4 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfApril,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 5 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfMay,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 6 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfJune,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 7 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfJuly,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 8 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfAug,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 9 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfSep,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 10 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfOct,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 11 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfNov,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 12 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfDec
        FROM orders
        GROUP BY planning_ssn, item_cd, item
      ) AS subquery
      WHERE 1 = 1`
    if (req.itemCode) {
        query = query + ` AND item_cd = "${req.itemCode}"`
        }
    if (req.itemName) {
        query = query + ` AND item = "${req.itemName}"`;
    }
    query = query + ` GROUP BY planning_ssn, item_cd, item ORDER BY item_cd`;
      const reportData = await this.dataSource.query(query);
      
      const season23SS = reportData.filter(data => data.year === "2023" && data.plannedSeason === "SS");
      const season23FW = reportData.filter(data => data.year === "2023" && data.plannedSeason === "FW");
      const season24SS = reportData.filter(data => data.year === "2024" && data.plannedSeason === "SS");
      const season = [season23SS, season23FW, season24SS];
      if (reportData.length > 0) {
        return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', season);
    } else {
        return new CommonResponseModel(false, 0, 'No Data Found', []);
    }    
    }
   
    
    async createCOline(req: any): Promise<CommonResponseModel> {
        // console.log(req)
        try {
            const manager = this.dataSource
            const orderNo = req.orderNumber
            const itemNo = req.itemNumber
            // req.purchaseOrderNumber = 3504865987
            // req.poLineItemNumber = 10000
            // req.scheduleLineItemNumber = 100
            const m3Config = appConfig.m3Cred.headerRequest()
            const sale_price_qry = `select price from price_list where style = ${req.itemcode} and destination = ${req.destination}`
            const salePriceData = await manager.query(sale_price_qry)
            const salePrice = salePriceData[0].price
            const rptOperation = `https://172.17.3.115:23005/m3api-rest/execute/OIZ100MI/AddBatchLine?CONO=111&ORNO=${orderNo}&ITNO=${itemNo}&SAPR=${salePrice}`;
            // const rptOperation = `https://172.17.3.115:23005/m3api-rest/execute/OIZ100MI/AddFreeField?CONO=111&ORNO=${req.purchaseOrderNumber}&PONR=${req.poLineItemNumber}&POSX=${req.scheduleLineItemNumber}&HDPR=${styleNumber}`;
            const response = await axios.get(rptOperation, { headers: m3Config.headersRequest, httpsAgent: m3Config.agent });
            // console.log(response, 'response')
            // console.log(response.data?.MIRecord, 'MIRecord')
            if (response.data['@type'])
                return new CommonResponseModel(false, 0, "M3 error ,Error message " + " : '" + response.data['Message'] + "'")
            if (!response.data?.MIRecord && !response.data?.MIRecord.length)
                return new CommonResponseModel(false, 0, "No data found for this item")
            // const meToCustomObj = [{ m3Key: 'STAT', yourKey: 'status' }, { m3Key: 'ORNO', yourKey: 'orderNO' }, { m3Key: 'PONR', yourKey: 'poLine' }]
            // const myObj = construnctDataFromM3Result(meToCustomObj, response.data.MIRecord)
            if (response.status !== 200)
                return new CommonResponseModel(false, 1, `Validation failed as`)
            await this.updateOrderApprovalStatus(req);
            return new CommonResponseModel(true, 1, `COline created successfully`)
        } catch (err) {
            throw err
        }
    }

    async updateOrderApprovalStatus(req: COLineRequest): Promise<CommonResponseModel> {
        const orderNo = req.orderNumber
        const sizeCode = req.sizeCode
        const colorCode = req.colorCode
        const updateStatus = await this.trimOrderRepo.update({ orderNo: orderNo,sizeCode:sizeCode,colorCode:colorCode}, { answeredStatus: 'Accepted',buyerItemNumber:req.itemNumber })
        if (updateStatus.affected) {
            return new CommonResponseModel(true, 1, 'Status Updated')
        } else {
            return new CommonResponseModel(false, 0, 'Something went wrong');
        }
    }

// }

//     async  getWareHouseMonthwiseData(): Promise<CommonResponseModel> {
//         try {
//           // Assuming you are fetching data from an API using a library like Axios
//           const response = await getWareHouseMonthwiseData();
//           const data = await response.data.map((item)=>({
//             year:item.year,
//             yearlyData:item.yearlyData.map((yearlyDataItem)=>({
//                 itemName: yearlyDataItem.itemName,
//                 monthWiseData: yearlyDataItem.monthWiseData.map((monthWiseItem)=>({
//                     phaseType: monthWiseItem.phaseType,
// data:monthWiseItem.data.map((dataItem)=>{})
//                 }))
//             }))
//           });
      
//           // Assuming data is the result you want to send in the response
//           if (data.length>0){
//           return new CommonResponseModel (true,1,'Data fetched successfully',data);
//         }
//          else {
//           return new CommonResponseModel (false,0,'No data found',[])
//         }
//     }
//     catch (error){
//         throw error
//     }

async getProdPlanCount(): Promise<CommonResponseModel> {
    const data = await this.ordersRepository.getProdPlanCount()
    if (data)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
}
      
async getWareHouseYear(): Promise<CommonResponseModel> {
    const data = await this.ordersRepository.getWareHouseYearData()
    if (data.length > 0) {
        return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', data);
    }
    else {
        return new CommonResponseModel(false, 0, 'No data found', data);
    }
}

async getWareHouseMonthData(req:YearReq): Promise<CommonResponseModel> {
    const data = await this.ordersRepository.getWareHouseMonthData(req.year);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }

    const DateMap = new Map<string, ItemDataDto>();
    const monthWiseInstances: MonthWiseDto[] = []; // Use an array to store instances
    
    for (const rec of data) {
        if (!DateMap.has(rec.item_cd)) {
            DateMap.set(
                rec.item_cd,
                new ItemDataDto(rec.item, [])
            );
        }
        const monthData = DateMap.get(rec.item_cd).monthWiseData;
        const phase = monthData.find(e => e.phasetype === rec.prod_plan_type)

        if (!phase) {
            const pcs: PcsDataDto[] = [];
            const coeff: CoeffDataDto[] = [];

pcs.push(
           { name: 'In Pcs',
            janPcs: rec.month === 1 ? rec.order_plan_qty :0,
            febPcs: rec.month === 2 ? rec.order_plan_qty :0,
            marPcs: rec.month === 3 ? rec.order_plan_qty : 0,
            aprPcs: rec.month === 4 ? rec.order_plan_qty : 0,
            mayPcs: rec.month === 5 ? rec.order_plan_qty : 0,
            junPcs: rec.month === 6 ? rec.order_plan_qty : 0,
            julPcs: rec.month === 7 ? rec.order_plan_qty : 0,
            augPcs: rec.month === 8 ? rec.order_plan_qty : 0,
            sepPcs: rec.month === 9 ? rec.order_plan_qty : 0,
            octPcs: rec.month === 10 ? rec.order_plan_qty : 0,
            novPcs: rec.month === 11 ? rec.order_plan_qty : 0,
            decPcs: rec.month === 12 ? rec.order_plan_qty : 0,}
        )
          coeff.push({
            name: 'In Coeff',
            janCoeff: rec.month === 1 ? rec.order_plan_qty_coeff : "-",
            febCoeff: rec.month === 2 ? rec.order_plan_qty_coeff : "-",
            marCoeff: rec.month === 3 ? rec.order_plan_qty_coeff : "-",
            aprCoeff: rec.month === 4 ? rec.order_plan_qty_coeff : "-",
            mayCoeff: rec.month === 5 ? rec.order_plan_qty_coeff : "-",
            junCoeff: rec.month === 6 ? rec.order_plan_qty_coeff : "-",
            julCoeff: rec.month === 7 ? rec.order_plan_qty_coeff : "-",
            augCoeff: rec.month === 8 ? rec.order_plan_qty_coeff : "-",
            sepCoeff: rec.month === 9 ? rec.order_plan_qty_coeff : "-",
            octCoeff: rec.month === 10 ? rec.order_plan_qty_coeff : "-",
            novCoeff: rec.month === 11 ? rec.order_plan_qty_coeff : "-",
            decCoeff: rec.month === 12 ? rec.order_plan_qty_coeff : "-",
          })
//        
 const totalPcs = pcs.reduce((total, item) => {
                return  [item.janPcs, item.febPcs, item.marPcs, item.aprPcs, item.mayPcs, item.junPcs, item.julPcs, item.augPcs, item.sepPcs, item.octPcs, item.novPcs, item.decPcs]
                    .filter(value => value !== 0) // Filter out values equal to 0
                    .reduce((sum, value) =>  value, 0);
            }, 0);
            
            const totalCoeff = coeff.reduce((total, item) => {
                return  [item.janCoeff, item.febCoeff, item.marCoeff, item.aprCoeff, item.mayCoeff, item.junCoeff, item.julCoeff, item.augCoeff, item.sepCoeff, item.octCoeff, item.novCoeff, item.decCoeff]
                    .filter(value => value !== 0) // Filter out values equal to 0
                    .reduce((sum, value) => value, 0);
            }, 0);
           
              
                const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff,totalPcs,totalCoeff);
                monthData.push(monthWiseInstance); // Store each instance
               
            }
            
        }
    const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());   
    return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
}

async getExfactoryComparisionData(req:YearReq): Promise<CommonResponseModel> {
    const data = await this.ordersChildRepo.getExfactoryComparisionData(req);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }

    const DateMap = new Map<string, ItemDataDto>();
    const monthWiseInstances: MonthWiseDto[] = []; 
    let totalPcs =0
    let totalCoeff = 0
    for (const rec of data) {
        if (!DateMap.has(rec.item_cd)) {
            DateMap.set(
                rec.item_cd,
                new ItemDataDto(rec.item, [])
            );
        }
        const monthData = DateMap.get(rec.item_cd).monthWiseData;
        const phase = monthData.find(e => e.phasetype === rec.prod_plan_type)

        if (!phase) {
            const pcs: PcsDataDto[] = [];
            const coeff: CoeffDataDto[] = [];
            if (!phase)
          {  if (rec.status === "previous") {
                // totalPcs += rec.order_plan_qty;
pcs.push(
           { name: 'In Pcs',
            janPcs: rec.ExfMonth === 1 ? rec.order_plan_qty :0,
            febPcs: rec.ExfMonth === 2 ? rec.order_plan_qty :0,
            marPcs: rec.ExfMonth === 3 ? rec.order_plan_qty :0,
            aprPcs: rec.ExfMonth === 4 ? rec.order_plan_qty :0,
            mayPcs: rec.ExfMonth === 5 ? rec.order_plan_qty :0,
            junPcs: rec.ExfMonth === 6 ? rec.order_plan_qty :0,
            julPcs: rec.ExfMonth === 7 ? rec.order_plan_qty :0,
            augPcs: rec.ExfMonth === 8 ? rec.order_plan_qty :0,
            sepPcs: rec.ExfMonth === 9 ? rec.order_plan_qty :0,
            octPcs: rec.ExfMonth === 10 ? rec.order_plan_qty :0,
            novPcs: rec.ExfMonth === 11 ? rec.order_plan_qty :0,
            decPcs: rec.ExfMonth === 12 ? rec.order_plan_qty :0,}
        )
    } 
    if (rec.status === "latest") {
        // totalCoeff += rec.order_plan_qty;
          coeff.push({
            name: 'In Coeff',
            janCoeff: rec.ExfMonth === 1 ? rec.order_plan_qty :0,
            febCoeff: rec.ExfMonth === 2 ? rec.order_plan_qty :0,
            marCoeff: rec.ExfMonth === 3 ? rec.order_plan_qty :0,
            aprCoeff: rec.ExfMonth === 4 ? rec.order_plan_qty :0,
            mayCoeff: rec.ExfMonth === 5 ? rec.order_plan_qty :0,
            junCoeff: rec.ExfMonth === 6 ? rec.order_plan_qty :0,
            julCoeff: rec.ExfMonth === 7 ? rec.order_plan_qty :0,
            augCoeff: rec.ExfMonth === 8 ? rec.order_plan_qty :0,
            sepCoeff: rec.ExfMonth === 9 ? rec.order_plan_qty :0,
            octCoeff: rec.ExfMonth === 10 ? rec.order_plan_qty :0,
            novCoeff: rec.ExfMonth === 11 ? rec.order_plan_qty :0,
            decCoeff: rec.ExfMonth === 12 ? rec.order_plan_qty :0,
          })
        }
        const totalPcs = pcs.reduce((total, item) => {
            return total + [item.janPcs, item.febPcs, item.marPcs, item.aprPcs, item.mayPcs, item.junPcs, item.julPcs, item.augPcs, item.sepPcs, item.octPcs, item.novPcs, item.decPcs]
                .filter(value => value !== 0) 
                .reduce((sum, value) => sum + value, 0);
        }, 0);
        
        const totalCoeff = coeff.reduce((total, item) => {
            return total + [item.janCoeff, item.febCoeff, item.marCoeff, item.aprCoeff, item.mayCoeff, item.junCoeff, item.julCoeff, item.augCoeff, item.sepCoeff, item.octCoeff, item.novCoeff, item.decCoeff]
                .filter(value => value !== 0) // Filter out values equal to 0
                .reduce((sum, value) => sum + value, 0);
        }, 0);
        
            const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs,coeff,totalPcs,totalCoeff);
            monthData.push(monthWiseInstance); 
            // console.log(monthWiseInstance,"rec")
        }
        
    
    }
    const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());   
    // console.log(DateMap.values ,"length")

    return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
}


}
async getWareHouseComparisionData(req:YearReq): Promise<CommonResponseModel> {
    const data = await this.ordersChildRepo.getWareHouseComparisionData(req);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }

    const DateMap = new Map<string, ItemDataDto>();
    const monthWiseInstances: MonthWiseDto[] = []; 
    let totalPcs =0
    let totalCoeff = 0
    for (const rec of data) {
        if (!DateMap.has(rec.item_cd)) {
            DateMap.set(
                rec.item_cd,
                new ItemDataDto(rec.item, [])
            );
        }
        const monthData = DateMap.get(rec.item_cd).monthWiseData;
const phase = monthData.find(e => e.phasetype === rec.prod_plan_type)
        if (!phase) {
            const pcs: PcsDataDto[] = [];
            const coeff: CoeffDataDto[] = [];
            
            if(!phase){
            {if (rec.status === "previous") {
                // totalPcs += rec.order_plan_qty;
pcs.push(
           { name: 'In Pcs',
            janPcs: rec.month === 1 ? rec.order_plan_qty : 0,
            febPcs: rec.month === 2 ? rec.order_plan_qty : 0,
            marPcs: rec.month === 3 ? rec.order_plan_qty : 0,
            aprPcs: rec.month === 4 ? rec.order_plan_qty : 0,
            mayPcs: rec.month === 5 ? rec.order_plan_qty : 0,
            junPcs: rec.month === 6 ? rec.order_plan_qty : 0,
            julPcs: rec.month === 7 ? rec.order_plan_qty : 0,
            augPcs: rec.month === 8 ? rec.order_plan_qty : 0,
            sepPcs: rec.month === 9 ? rec.order_plan_qty : 0,
            octPcs: rec.month === 10 ? rec.order_plan_qty : 0,
            novPcs: rec.month === 11 ? rec.order_plan_qty : 0,
            decPcs: rec.month === 12 ? rec.order_plan_qty : 0,}
        )
    } 
    if (rec.status === "latest") {
        // totalCoeff += rec.order_plan_qty;

          coeff.push({
            name: 'In Coeff',
            janCoeff: rec.month === 1 ? rec.order_plan_qty : 0,
            febCoeff: rec.month === 2 ? rec.order_plan_qty : 0,
            marCoeff: rec.month === 3 ? rec.order_plan_qty : 0,
            aprCoeff: rec.month === 4 ? rec.order_plan_qty : 0,
            mayCoeff: rec.month === 5 ? rec.order_plan_qty : 0,
            junCoeff: rec.month === 6 ? rec.order_plan_qty : 0,
            julCoeff: rec.month === 7 ? rec.order_plan_qty : 0,
            augCoeff: rec.month === 8 ? rec.order_plan_qty : 0,
            sepCoeff: rec.month === 9 ? rec.order_plan_qty : 0,
            octCoeff: rec.month === 10 ? rec.order_plan_qty : 0,
            novCoeff: rec.month === 11 ? rec.order_plan_qty : 0,
            decCoeff: rec.month === 12 ? rec.order_plan_qty : 0,
          })
        }
        const totalPcs = pcs.reduce((total, item) => {
            return total + [item.janPcs, item.febPcs, item.marPcs, item.aprPcs, item.mayPcs, item.junPcs, item.julPcs, item.augPcs, item.sepPcs, item.octPcs, item.novPcs, item.decPcs]
                .filter(value => value !== 0) 
                .reduce((sum, value) => sum + value, 0);
        }, 0);
        
        const totalCoeff = coeff.reduce((total, item) => {
            return total + [item.janCoeff, item.febCoeff, item.marCoeff, item.aprCoeff, item.mayCoeff, item.junCoeff, item.julCoeff, item.augCoeff, item.sepCoeff, item.octCoeff, item.novCoeff, item.decCoeff]
                .filter(value => value !== 0) 
                .reduce((sum, value) => sum + value, 0);
        }, 0);
        //  console.log(totalPcs,'previous',totalCoeff,'latest');
         
          
            const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs,coeff,totalPcs,totalCoeff);
            monthData.push(monthWiseInstance); 
            // console.log(monthWiseInstance,"rec")
        }
        
    
    }
}
    const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());   
    // console.log(DateMap.values ,"length")

    return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
}
}

    
async getSeasonWiseItemCode():Promise<CommonResponseModel>{
    try{
        const itemCode = await this.ordersRepository.getSeasonWiseItemCode()
        if(itemCode.length > 0){
            return new CommonResponseModel(true, 1, 'Data Retrieved Succesfully',itemCode)
        }else {
            return new CommonResponseModel(false,0,'No data found',[])
        }
    }catch(err){
        throw(err)
    }
}

async getSeasonWiseItemName():Promise<CommonResponseModel>{
    try{
        const itemCode = await this.ordersRepository.getSeasonWiseItemName()
        if(itemCode.length > 0){
            return new CommonResponseModel(true, 1, 'Data Retrieved Succesfully',itemCode)
        }else {
            return new CommonResponseModel(false,0,'No data found',[])
        }
    }catch(err){
        throw(err)
    }
}

async getExfactoryMonthExcelData(req:YearReq): Promise<CommonResponseModel> {
    const data = await this.ordersRepository.getExfactoryMonthData(req.year);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }

    return new CommonResponseModel(true, 1, 'data retrieved', data);
}

async getExfactoryComparisionExcelData(req:YearReq): Promise<CommonResponseModel> {
    const data = await this.ordersChildRepo.getExfactoryComparisionData(req);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }
    return new CommonResponseModel(true, 1, 'data retrieved', data);
}

async getQtyDifChangeItemCode(): Promise<CommonResponseModel> {
    const files = await this.fileUploadRepo.getFilesData()

    let data;
    if (files.length == 0) {
        return new CommonResponseModel(false, 0, 'No data found');
    } else if (files.length == 1) {
        data = await this.ordersChildRepo.getItemQtyChangeData1ItemCode(files[0]?.fileId)
    } else {
        data = await this.ordersChildRepo.getItemQtyChangeDataItemCode(files[1]?.fileId, files[0]?.fileId)
    }
    if (data)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
}


async getWareHouseMonthExcelData(req:YearReq): Promise<CommonResponseModel> {
    const data = await this.ordersRepository.getWareHouseMonthData(req.year);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }

    return new CommonResponseModel(true, 1, 'data retrieved', data);
}

async getWareHouseComparisionExcelData(req:YearReq): Promise<CommonResponseModel> {
    const data = await this.ordersChildRepo.getWareHouseComparisionData(req);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }
    return new CommonResponseModel(true, 1, 'data retrieved', data);
}
async processEmails() {
    // Set the environment variable to allow TLS
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    // Define your email configuration
    const imap = new Imap({
      user: 'naveenmaddula86@gmail.com',
      password: 'bshk euvb tulv cghr',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
    });

    const allowedExtensions = ['.xlsx', '.xls', '.csv'];
    const savePath = './upload-files/'
    function toUpper(thing) {
      return thing && thing.toUpperCase ? thing.toUpperCase() : thing;
    }

    const buildAttMessageFunction = (attachment) => {
      if (!attachment || !attachment.params || !attachment.params.name) {
        const logMessage = 'No valid attachment found.';
        this.logger.warn(logMessage);
        console.log(logMessage);
        return;
      }

      const filename = attachment.params.name;
      const encoding = attachment.encoding;

      return (msg, seqno) => {
        const prefix = `(Message #${seqno}) `;
        msg.on('body', (stream, info) => {
          const logMessage = `${prefix}Streaming attachment to file: ${filename}, ${info}`;
          this.logger.info(logMessage);
          console.log(logMessage);

          const writeStream = fs.createWriteStream(savePath + filename);
          console.log(writeStream,'www')
          console.log(savePath + filename+'iiiiii')
          writeStream.on('finish', () => {
            const finishLogMessage = `${prefix}Done writing to file: ${filename}`;
            this.logger.info(finishLogMessage);
            console.log(finishLogMessage);
            console.log(finishLogMessage);
            // './upload-files/007Q2_Shahi_0807.csv
            this.readCell(savePath + filename,filename)
          });

          if (toUpper(encoding) === 'BASE64') {
            stream.pipe(new base64.Base64Decode()).pipe(writeStream);
          } else {
            stream.pipe(writeStream); 
          }
        });
      };
    };

    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err, box) => {
        if (err) {
          const logMessage = `Error opening mailbox: ${err}`;
          this.logger.error(logMessage);
          console.error(logMessage);
          throw err;
        }

        const searchCriteria = [['FROM', 'jaswanthpappala3@gmail.com']];

        imap.search(searchCriteria, (err, results) => {
          if (err) {
            const logMessage = `Error searching emails: ${err}`;
            this.logger.error(logMessage);
            console.error(logMessage);
            throw err;
          }

          const fetch = imap.fetch(results, {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
            struct: true,
          });

          fetch.on('message', (msg, seqno) => {
            const prefix = `(Message #${seqno}) `;
            msg.once('attributes', (attrs) => {
              const attachments = findAttachmentParts(attrs.struct);
              const logMessage = `${prefix}Has attachments: ${attachments.length}`;
              this.logger.info(logMessage);
              console.log(logMessage);

              attachments.forEach((attachment) => {
                if (attachment.params && attachment.params.name) {
                  const logMessage = `${prefix}Fetching attachment: ${attachment.params.name}`;
                  this.logger.info(logMessage);
                  console.log(logMessage);
                  const f = imap.fetch(attrs.uid, {
                    bodies: [attachment.partID],
                  });
                  f.on('message', buildAttMessageFunction(attachment));
                }
              });
            });
            msg.once('end', () => {
              const logMessage = `${prefix}Finished email`;
              this.logger.info(logMessage);
              console.log(logMessage);
            });
          });

          fetch.once('error', (err) => {
            const logMessage = `Fetch error: ${err}`;
            this.logger.error(logMessage);
            console.error(logMessage);
          });

          fetch.once('end', () => {
            const logMessage = 'Done fetching all messages!';
            this.logger.info(logMessage);
            console.log(logMessage);
            imap.end();
          });
        });
      });
    });

    imap.once('error', (err) => {
      const logMessage = `IMAP error: ${err}`;
      this.logger.error(logMessage);
      console.error(logMessage);
    });

    imap.once('end', () => {
      const logMessage = 'IMAP Connection ended';
      this.logger.info(logMessage);
      console.log(logMessage);
    });

    imap.connect();

    const findAttachmentParts = (struct, attachments = []) => {
      for (let i = 0; i < struct.length; ++i) {
        if (Array.isArray(struct[i])) {
          findAttachmentParts(struct[i], attachments);
        } else {
          if (
            struct[i].disposition &&
            ['INLINE', 'ATTACHMENT'].indexOf(
              toUpper(struct[i].disposition.type)
            ) > -1 &&
            struct[i].params &&
            struct[i].params.name &&
            struct[i].params.name.startsWith('')
          ) {
            const filename = struct[i].params.name;
            const fileExtension = filename.split('.').pop().toLowerCase();
            if (allowedExtensions.includes('.' + fileExtension)) {
              attachments.push(struct[i]);
            }
          }
        }
      }
      return attachments;
    };
  }
  async readCell(filepath,filename):Promise<CommonResponseModel> {
    // console.log(filepath,'filepathhh')
    // console.log(filename,'filenamehh')
    // // return new Promise((resolve, reject) => {
    //     let workBook = new Excel.Workbook();
    //     workBook.xlsx.readFile(filename).then(() => {
            
    //         let sheet = workBook.getWorkSheet('Sheet1');
    //         console.log('sheetllll',sheet)
    //         let cellValue = sheet.getRow(2).getCell(1).value;
    //         // resolve(cellValue);
    //         console.log(cellValue,'cellvallll')
    //     }).catch(err => /* Do some error handling here if you want to */ console.log(err));
    // // });
    // working-----------
//     var workbook = new Excel.Workbook(); 
// workbook.xlsx.readFile('./upload-files/007Q_Shahi_0807_latest.xlsx')
//     .then(function() {
//         var worksheet = workbook.getWorksheet('Production Plan Rawdata Export');
// //         const c2 = worksheet.getRow(1);
// //    c2.eachCell(c => {
// //       console.log(c.value,'iiii');
// //    });
//         console.log(worksheet,'woooo')
//         worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {

//           console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
//         });
//     });

// xlsxFile('./upload-files/007Q_Shahi_0807_latest.xlsx')
//   .then((rows) => {
//     rows.forEach((row) => {
//       row.forEach((cell) => {
//         console.log(cell);
//       });
//     });
//   });
    console.log(filename.split('.').pop(),'extension')
    console.log(filename,'filename')
    const promise = () => new Promise((resolve, reject) => {
        if(filename.split('.').pop() == 'csv'){
            const dataArray = []
            fs.createReadStream(filepath)
                .on('error', () => {
                    // handle error
                })

                .pipe(csv())
                .on('data', (row) => {
                    dataArray.push(Object(row))
                })

                .on('end', () => {
                    resolve(dataArray)
                })
        }else if(filename.split('.').pop() == 'xlsx'){
            console.log('uuuuooo')
            xlsxFile(filepath)
              .then((rows) => {
                const dataArray = []
                const columnNames = rows.shift(); // Separate first row with column names
                rows.map((row) => { // Map the rest of the rows into objects
                  const obj = {}; // Create object literal for current row
                  row.forEach((cell, i) => {
                    if(cell == null){
                        obj[columnNames[i]] = "";
                    }
                    if(typeof cell == 'number'){
                        obj[columnNames[i]] = cell.toString(); // Use index from current cell to get column name, add current cell to new object
                    }else{
                        obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object

                    }
                    // console.log(columnNames[i],'4444444')
                    if(FormatDates.includes(columnNames[i]) &&  cell != null){
                        obj[columnNames[i]] = moment(cell).format('YYYY-MM-DD').toString()
                        // console.log(obj[columnNames[i]],'99999999999')

                    }
                        // obj[columnNames[i]] = ""; // Use index from current cell to get column name, add current cell to new object
                        // obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object


                    // }
                  });
                //   console.log(obj)
                  dataArray.push(Object(obj));
                  resolve(dataArray)
                //   console.log(objs); // Display the array of objects on the console
                //   return obj;
                });
              });
        }else{
            
        }
    })
    const dataArray = await promise();

//   console.log(dataArray,'datajjjj')

// -----------
// filepath = './upload-files/007Q2_Shahi_0807.csv'
// filename = '007Q2_Shahi_0807.csv'
// const promise = () => new Promise((resolve, reject) => {
//     const dataArray = []
// fs.createReadStream(filepath)
//     .on('error', () => {
//         // handle error
//     })

     

//     .pipe(csv())
//     .on('data', (row) => {
//         // const nwrow = JSON.stringify(row)
//         // row = JSON.parse(nwrow)
//         // const keysval = Object.keys(row)
//         // const updatedObj = {};

//         // for(const eachkey of keysval){
//         //     const updatedKey = eachkey.replace(/'/g,'')
//         // console.log(updatedKey,'updatedKey')

//         //     updatedObj[updatedKey] = row[eachkey]
//         // }
//         // console.log(updatedObj,'updatedObj')
//         dataArray.push(Object(row))
//     })

//     .on('end', () => {
//             resolve(dataArray)
//     })
// })
// const dataArray = await promise();

// console.log(dataArray)
// console.log('newdataaaafileenlllttt')
    if(dataArray){
        // console.log('dataArraymmmm',dataArray)
        
        const saveFilePath = await this.updatePath(filepath,filename,null,FileTypesEnum.PROJECTION_ORDERS)
        console.log(saveFilePath)
        // console.log('saveFilePathhhhh')
        if(saveFilePath.status){
            const saveProjOrders = await this.saveOrdersData(dataArray,saveFilePath.data.id,9)
            let req = new FileStatusReq();
            req.fileId = saveFilePath.data.id;
            req.userName = 'Bidhun'
            if(saveProjOrders.status){
                req.status = 'Success';
            }else{
                req.status = 'Failed';
            }
            const updateFileStatus = await this.updateFileStatus(req)
        }
        // return dataArray
    }else{
        // return dataArray
    }
    return 
    
    }

//   async readCell(filename) {
//     // // return new Promise((resolve, reject) => {
//     //     let workBook = new Excel.Workbook();
//     //     workBook.xlsx.readFile(filename).then(() => {
            
//     //         let sheet = workBook.getWorkSheet('Sheet1');
//     //         console.log('sheetllll',sheet)
//     //         let cellValue = sheet.getRow(2).getCell(1).value;
//     //         // resolve(cellValue);
//     //         console.log(cellValue,'cellvallll')
//     //     }).catch(err => /* Do some error handling here if you want to */ console.log(err));
//     // // });
//     // working-----------
// //     var workbook = new Excel.Workbook(); 
// // workbook.xlsx.readFile(filename)
// //     .then(function() {
// //         var worksheet = workbook.getWorksheet('Sheet1');
// //         worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
// //           console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
// //         });
// //     });

// // -----------
// const filepath = './upload-files/projection-orders/007Q_Shahi_0807.csv'
// fs.createReadStream(filepath)
//   .pipe(csv())
//   .on('headers', (headers) => {
//     console.log(headers)
//   })
//     }
}

  
