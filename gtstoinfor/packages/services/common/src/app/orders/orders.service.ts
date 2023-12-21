import { Injectable } from '@nestjs/common';
import { CoeffDataDto, COLineRequest, CommonResponseModel, FileStatusReq, FileTypeDto, FileTypesEnum, ItemDataDto, MonthAndQtyModel, MonthWiseDataModel, MonthWiseDto, MonthWiseExcelDataModel, PcsDataDto, PhaseAndQtyModel, PhaseWiseDataModel, PhaseWiseExcelDataModel, VersionAndQtyModel, VersionDataModel, YearReq, orderColumnValues, ProductionOrderColumns, TrimOrderColumns, SeasonWiseRequest, CompareOrdersFilterReq, orders, CoLineStatusReq, TrimOrdersReq, ordersPlanNo, RequiredColumns, ordersMailFileStatusArrayReq, CoLineFormatModel, Destinations, Colors, Sizes, FileInfoModel, sesaonWisereportModel, MonthItemData, CoLineRequest ,NewitemDataDto, NewMonthWiseDto, pcsData, PhaseWiseReq, itemData} from '@project-management-system/shared-models';
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
import { DataSource, Entity, EntityManager, Index, getManager } from 'typeorm';
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
import { find, groupBy, map } from 'rxjs';
import { log } from 'console';
import { appConfig } from 'packages/services/common/config';
import * as fs from 'fs';
import * as Imap from 'imap';
import * as base64 from 'base64-stream';
import * as winston from 'winston';
import { resolve } from 'path';
import { isNumberObject } from 'util/types';
import { monthOrderDtoKeys, yearOrderDtoKeys } from '../../../../../libs/shared-models/src/enum';
const xlsxFile = require('read-excel-file/node');
import { readSheetNames } from 'read-excel-file'
const csv = require('csv-parser');
const Excel = require('exceljs');
import { COLineEntity } from './entities/co-line.entity';
import { CoLineRepository } from './repository/co-line-repo';
let moment = require('moment');
moment().format();
import * as nodemailer from 'nodemailer';
import { PriceListService } from '@project-management-system/shared-services';
import { TrimDetailsRequest } from './models/trim-details.req';
import { promises } from 'dns';

const { Builder, Browser, By, Capabilities, until, Select } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
import { Cron } from '@nestjs/schedule';
import { get } from 'http';


@Injectable()
export class OrdersService {
    private transporter: nodemailer.Transporter;
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
        private colineRepo: CoLineRepository,
        @InjectDataSource()
        private dataSource: DataSource,
        @InjectEntityManager() private readonly entityManager: EntityManager,
        private priceListService: PriceListService


    ) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'uma.boddeda@schemaxtech.com',
                pass: 'edww bgvf vgxi ppar',
            },
        });

    }
    //for email integration
    private logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'email-service.log' }),
        ],
    });
    // async saveOrdersData(formData: any, id: number, months: number): Promise<CommonResponseModel> {
    //     const currentDate = new Date();
    //     const month = currentDate.getMonth() + 1;
    //     const transactionManager = new GenericTransactionManager(this.dataSource)
    //     try {
    //         await transactionManager.startTransaction()
    //         const flag = new Set()
    //         const lowerCasedProductionOrderColumns=ProductionOrderColumns.map(rec=>rec.toLocaleLowerCase());
    //         const dtoArray:SaveOrderDto[]=[]
    //         for(const obj of formData){
    //             const columnArray = [];
    //             const updatedObj:any = {};
    //             for (const key in obj) {
    //                 const newKey = key.replace(/\s/g, '_').replace(/[\(\)]/g, '').replace(/-/g, '_').replace(/:/g,'_').replace(/[*]/g,'_').replace(/=/g,'_').replace(/”/g,'').replace(/~/g,'').replace(/[/]/g,'').replace(/“/g,'').replace(/�/g,'').replace(/'/g,'')
    //                 const newKey1 = newKey.replace(/__/g,'_');
    //                 columnArray.push(newKey1)
    //                 const value = obj[key];
    //                 if (value === "") {
    //                     updatedObj[newKey1] = null;
    //                 } else {
    //                     updatedObj[newKey1] = value;                        
    //                 }
    //             }
    //             const missedColumns = new Set<string>();
    //             for(const requiredKey of RequiredColumns){
    //                 if(!(columnArray.includes(requiredKey))){
    //                     missedColumns.add(requiredKey)
    //                 }
    //             }
    //             if((missedColumns.size !==0 )){
    //                 await transactionManager.releaseTransaction()
    //                 return new CommonResponseModel(false,24,'Required Columns missed',Array.from(missedColumns));
    //             }
    //             const mismatchColumns=new Set<string>();
    //             const lowerCasedColumnArray=columnArray.map(rec=>rec.toLocaleLowerCase())
    //             lowerCasedColumnArray.forEach(rec=>{
    //                 if(!lowerCasedProductionOrderColumns.includes(rec))
    //                    mismatchColumns.add(rec);
    //             })
    //             if((mismatchColumns.size !==0 )){
    //                 await transactionManager.releaseTransaction()
    //                 return new CommonResponseModel(false,23,'Columns does not match!',Array.from(mismatchColumns))
    //             }

    //             let dtoData:SaveOrderDto;
    //             if(updatedObj.Order_Plan_Number !== null){
    //                 dtoData = new SaveOrderDto(null,updatedObj.Year,updatedObj.Planning_Ssn_Cd,updatedObj.Planning_Ssn,updatedObj.Tgt_Ssn_Cd,updatedObj.Tgt_Ssn,updatedObj.Biz_Cd,updatedObj.Biz,updatedObj.Planning_Region_Code,updatedObj.Planning_Region_Name,updatedObj.Channel_Code,updatedObj.Channel_Name,updatedObj.Department,updatedObj.Dept_Cd,updatedObj.Cls1_Cd,updatedObj.Cls2_Cd,updatedObj.G_Dept,updatedObj.Sub_Category1,updatedObj.Core_Category,updatedObj.Sub_Category2,updatedObj.Sub_Category3,updatedObj.Production_Category_Fabric,updatedObj.Production_Category_FabricProcessing,updatedObj.Production_Category_Sewing,updatedObj.Production_Category_SewingProcessing,updatedObj.Planning_Sum_Code,updatedObj.Planning_Sum,updatedObj.Local_NameGHQ,updatedObj.Item_Cd,updatedObj.Item,updatedObj.Orig_Price,updatedObj.Main_Sample_Code,updatedObj.FR_Fabric_Code,updatedObj.FR_Fabric,updatedObj.Supplier_Raw_Material_Code,updatedObj.Supplier_Raw_Material,updatedObj.Raw_Material_Supplier_Code,updatedObj.Raw_Material_Supplier,updatedObj.Vendor_Code,updatedObj.Vendor,updatedObj.Sewing_Factory_Code,updatedObj.Sewing_Factory,updatedObj.Branch_Factory_Code,updatedObj.Branch_Factory,updatedObj.Coeff,updatedObj.month,updatedObj.Item_Brunch_Number,(updatedObj.Official_Plan_Std_Qty)?.toString().replace(/,/g,''),(updatedObj.Official_Plan_Fab_Prp_Pln_Qty)?.toString().replace(/,/g,''),(updatedObj.Official_Plan_PO_pr_Sls_Qty)?.toString().replace(/,/g,''),(updatedObj.Official_Plan_CO_Qty)?.toString().replace(/,/g,''),(updatedObj.Official_Plan_Stock_Qty)?.toString().replace(/,/g,''),updatedObj.Sls_Start_Dy ? moment(updatedObj.Sls_Start_Dy).format('MM-DD') : null,updatedObj.Publish_Flag_for_Factory,updatedObj.Publish_Date,updatedObj.Allc_End_Dy ? moment(updatedObj.Allc_End_Dy).format('MM-DD') : null,updatedObj.Sls_End_Dy ? moment(updatedObj.Sls_End_Dy).format('MM-DD') : null,updatedObj.GWH ? moment(updatedObj.GWH).format('MM-DD'): null,updatedObj.Order_Plan_Number,updatedObj.Order_Timing,updatedObj.Swng_Prd_Month ? moment(updatedObj.Swng_Prd_Month).format('YYYY-MM') : null,updatedObj.Swng_Prd_Week ? moment(updatedObj.Swng_Prd_Week).format('YYYY-MM-DD') : null,(updatedObj.Order_Plan_Qty).toString().replace(/,/g,''),(updatedObj.Order_Plan_QtyCoeff)?.toString().replace(/,/g,''),updatedObj.Trnsp_Mthd,updatedObj.Prod_Plan_Type,updatedObj.Ph11st,updatedObj.WH ? moment(updatedObj.WH).format('MM-DD') : null,updatedObj.WH_Act,updatedObj.WHAuto ? moment(updatedObj.WHAuto).format('MM-DD') : null,updatedObj.Yarn_DL_Requested,updatedObj.Yarn_DL_Answered,updatedObj.Yarn_DL_Auto,updatedObj.Yarn_Production_Due_Date_Auto,updatedObj.Yarn_Auto_Reflection_Date ? moment(updatedObj.Yarn_Auto_Reflection_Date).format('MM-DD') : null,updatedObj.Yarn_Act_Dy,updatedObj.Yarn_Act_Qty,updatedObj.Yarn_Order_Number,updatedObj.Yarn_Order_Status,updatedObj.Yarn_Delivery_Date, updatedObj.Fbrc_DL_Requested ? moment(updatedObj.Fbrc_DL_Requested).format('MM-DD') : null,updatedObj.Fbrc_DL_Answered ? moment(updatedObj.Fbrc_DL_Answered).format('YYYY-MM-DD') : null,updatedObj.Fbrc_DL_Auto ? moment(updatedObj.Fbrc_DL_Auto).format('MM-DD') : null,updatedObj.Fbrc_Production_Due_Date_Auto,updatedObj.Fbrc_Auto_Reflection_Date ? moment(updatedObj.Fbrc_Auto_Reflection_Date).format('MM-DD') : null,updatedObj.Fbrc_Act_Dy,updatedObj.Fbrc_Act_Qty,updatedObj.Fbrc_Order_Number,updatedObj.Fbrc_Order_Status,updatedObj.Fbrc_Delivery_Date ? moment(updatedObj.Fbrc_Delivery_Date).format('MM-DD') : null,updatedObj.Color_DL_Requested,updatedObj.Color_DL_Answered,updatedObj.Color_DL_Auto,updatedObj.Color_Production_Due_Date_Auto,updatedObj.Color_Auto_Reflection_Date ? moment(updatedObj.Color_Auto_Reflection_Date).format('MM-DD') : null,updatedObj.Color_Act_Dy,updatedObj.Color_Act_Qty,updatedObj.Color_Order_Number,updatedObj.Color_Order_Status,updatedObj.Color_Delivery_Date,updatedObj.Trim_DL_Requested ? moment(updatedObj.Trim_DL_Requested).format('MM-DD') : null,updatedObj.Trim_DL_Answered ? moment(updatedObj.Trim_DL_Answered).format('YYYY-MM-DD') : null,updatedObj.Trim_DL_Auto ? moment(updatedObj.Trim_DL_Auto).format('MM-DD'): null,updatedObj.Trim_Production_Due_Date_Auto,updatedObj.Trim_Auto_Reflection_Date ? moment(updatedObj.Trim_Auto_Reflection_Date).format('MM-DD'):null,updatedObj.Trim_Act_Dy,updatedObj.Trim_Act_Qty,updatedObj.Trim_Order_Number,updatedObj.Trim_Order_Status,updatedObj.Trim_Delivery_Date,updatedObj.PO_DL_Requested ? moment(updatedObj.PO_DL_Requested).format('MM-DD') : null,updatedObj.PO_DL_Answered ? moment(updatedObj.PO_DL_Answered).format('YYYY-MM-DD') : null,updatedObj.PO_DL_Auto ? moment(updatedObj.PO_DL_Auto).format('MM-DD') : null,updatedObj.PO_Production_Due_Date_Auto,updatedObj.PO_Auto_Reflection_Date ? moment(updatedObj.PO_Auto_Reflection_Date).format('MM-DD') : null,updatedObj.PO_Act_Dy,updatedObj.PO_Act_Qty,updatedObj.PO_Order_Number,updatedObj.PO_Order_Status,updatedObj.Assort1,updatedObj.Assort2,updatedObj.NX_Assort,updatedObj.Solid,updatedObj.Order_Plan_QtySTOP,updatedObj.Fix_Flag,updatedObj.Alternative_Flag,updatedObj.Express_Line_Flag,updatedObj.Factory_Comment,updatedObj.Planned_EXF ? moment(updatedObj.Planned_EXF).format('YYYY-MM-DD') : null,updatedObj.EXF_ETD,updatedObj.ETD_WH,updatedObj.Sewing_Country_Region,updatedObj.Raw_Material_Original_Country_Region,updatedObj.Item_Drop,updatedObj.Create_Date ? moment(updatedObj.Create_Date).format('YYYY-MM-DD HH:mm') : null,updatedObj.Create_User_ID,updatedObj.Create_User_Name,updatedObj.Create_Function,updatedObj.Update_Date ? moment(updatedObj.Update_Date).format('YYYY-MM-DD HH:mm'): null,updatedObj.Update_User_ID,updatedObj.Update_User_Name,updatedObj.Update_Function,updatedObj.CountY,updatedObj.Sample,updatedObj.EXF ? moment(updatedObj.EXF).format('MM-DD'): null,updatedObj.BDDL ? moment(updatedObj.BDDL).format('MM-DD') : null,updatedObj.BDDLpast_Past,updatedObj.LTBD_EXF,updatedObj.New_BDDL,updatedObj.new_LTBD_EXF,updatedObj.LTPO_EXF,updatedObj.Qty_LTBD_EXF,updatedObj.Qty_LTPO_EXF,updatedObj.County2Y,updatedObj.PHASE,id,null,'bidhun');
    //                 let newDate
    //                 if(dtoData.exf == null){
    //                 let inputDate = dtoData.wh ? moment(dtoData.wh).format('MM-DD') : null;
    //                 if(inputDate === null){
    //                     await transactionManager.releaseTransaction()
    //                     return new CommonResponseModel(false,101,'Null value in WH column')
    //                 } else{

    //                     let parts = inputDate.split('-');
    //                     let months = parseInt(parts[0], 10);
    //                     let day = parseInt(parts[1], 10);
    //                     let numberOfDays = Number(dtoData.exfEtd);
    //                     let dateObject = new Date(2023, months - 1, day);
    //                     dateObject.setDate(dateObject.getDate() - numberOfDays);
    //                     newDate = moment(dateObject).format('MM-DD');
    //                     dtoData.exf=newDate;
    //                 }
    //                 }
    //                 // console.log(dtoData,'dtoDatadtoDatadtoData')
    //             } else {
    //                 break;
    //             }
    //             // console.log(dtoData,'_**********')
    //             dtoArray.push(dtoData);
    //             // console.log(dtoArray,'***************')
    //         };
    //         const slicedDataArray=this.sliceIntoChunks(dtoArray,100);
    //         const promises=[]
    //         slicedDataArray.forEach(rec=>{
    //             promises.push(this.saveAsChunks(rec,transactionManager,id))
    //         })
    //         await Promise.all(promises);
    //         await transactionManager.completeTransaction();
    //         return new CommonResponseModel(true,1,'Saved succesfully');


    //     } catch (error) {
    //         await transactionManager.releaseTransaction()
    //         return new CommonResponseModel(false, 0, error);
    //     }
    // }
    // sliceIntoChunks(arr, chunkSize) {
    //     const res = [];
    //     for (let i = 0; i < arr.length; i += chunkSize) {
    //         const chunk = arr.slice(i, i + chunkSize);
    //         res.push(chunk);
    //     }
    //     return res;
    // }
    // async saveAsChunks(dtosData: SaveOrderDto[],transactionManager: GenericTransactionManager,id){
    //     for(const dtoData of dtosData){
    //         if (dtoData.orderPlanNumber != null) {
    //             const details = await this.ordersRepository.findOne({ where: { orderPlanNumber: dtoData.orderPlanNumber } })
    //             const versionDetails = await this.ordersChildRepo.getVersion(Number(dtoData.orderPlanNumber))
    //             let version = 1;
    //             if (versionDetails.length > 0) {
    //                 version = Number(versionDetails.length) + 1
    //             }
    //             dtoData.version = version
    //             if (details) {
    //                 const updateOrder = await transactionManager.getRepository(OrdersEntity).update({ orderPlanNumber: dtoData.orderPlanNumber }, {
    //                 year:dtoData.year,planningSsnCd:dtoData.planningSsnCd,planningSsn:dtoData.planningSsn,tgtSsnCd:dtoData.tgtSsnCd,tgtSsn:dtoData.tgtSsn,bizCd:dtoData.bizCd,biz:dtoData.biz,planningRegionCode:dtoData.planningRegionCode,planningRegionName:dtoData.planningRegionName,channelCode:dtoData.channelCode,channelName:dtoData.channelName,department:dtoData.department,deptCd:dtoData.deptCd,Cls1_cd:dtoData.Cls1_cd,Cls2_cd:dtoData.Cls2_cd,gDept:dtoData.gDept,subCategory1:dtoData.subCategory1,coreCategory:dtoData.coreCategory,subCategory2:dtoData.subCategory2,subCategory3:dtoData.subCategory3,productionCategoryFabric:dtoData.productionCategoryFabric,productionCategoryFabricProcessing:dtoData.productionCategoryFabricProcessing,productionCategorySewing:dtoData.productionCategorySewing,productionCategorySewingProcessing:dtoData.productionCategorySewingProcessing,planningSumCode:dtoData.planningSumCode,planningSum:dtoData.planningSum,localNameGhq:dtoData.localNameGhq,itemCd:dtoData.itemCd,item:dtoData.item,origPrice:dtoData.origPrice,mainSampleCode:dtoData.mainSampleCode,frFabricCode:dtoData.frFabricCode,frFabric:dtoData.frFabric,supplierRawMaterialCode:dtoData.supplierRawMaterialCode,supplierRawMaterial:dtoData.supplierRawMaterial,rawMaterialSupplierCode:dtoData.rawMaterialSupplierCode,rawMaterialSupplier:dtoData.rawMaterialSupplier,vendorCoode:dtoData.vendorCoode,vendor:dtoData.vendor,sewingFactoryCode:dtoData.sewingFactoryCode,sewingFactory:dtoData.sewingFactory,branchFactoryCode:dtoData.branchFactoryCode,branchFactory:dtoData.branchFactory,coeff:dtoData.coeff,itemBranchNumber:dtoData.itemBranchNumber,officialPlanStdQty:dtoData.officialPlanStdQty,OfficialPlanFabPrpPlnQty:dtoData.OfficialPlanFabPrpPlnQty,OfficialPlanPoPrSlsQty:dtoData.OfficialPlanPoPrSlsQty,officalPlanCoQty:dtoData.officalPlanCoQty,officalPlanStockQty:dtoData.officalPlanStockQty,slsStartDy:dtoData.slsStartDy,publishFlagForFactory:dtoData.publishFlagForFactory,publishDate:dtoData.publishDate,allcEndDy:dtoData.allcEndDy,slsEndDy:dtoData.slsEndDy,GWH:dtoData.GWH,orderTiming:dtoData.orderTiming,swngPrdMonth:dtoData.swngPrdMonth,swngPrdWeek:dtoData.swngPrdWeek,orderPlanQty:dtoData.orderPlanQty,orderPlanQtyCoeff:dtoData.orderPlanQtyCoeff,trnspMthd:dtoData.trnspMthd,prodPlanType:dtoData.prodPlanType,ph1St:dtoData.ph1St,wh:dtoData.wh,whAct:dtoData.whAct,whAuto:dtoData.whAuto,yarnDlRequested:dtoData.yarnDlRequested,yarnDlAnswered:dtoData.yarnDlAnswered,yarnDlAuto:dtoData.yarnDlAuto,yarnProductionDueDateAuto:dtoData.yarnProductionDueDateAuto,yarnAutoReflectionDate:dtoData.yarnAutoReflectionDate,yarnActDy:dtoData.yarnActDy,yarnActQty:dtoData.yarnActQty,yarnOrderNumber:dtoData.yarnOrderNumber,yarnOrderStatus:dtoData.yarnOrderStatus,yarnDeliveryDate:dtoData.yarnDeliveryDate,fbrcDlRequested:dtoData.fbrcDlRequested,fbrcDlAnswered:dtoData.fbrcDlAnswered,fbrcDlAuto:dtoData.fbrcDlAuto,fbrcProductionDueDateAuto:dtoData.fbrcProductionDueDateAuto,fbrcAutoReflectionDate:dtoData.fbrcAutoReflectionDate,factoryCommentUpdateDate:dtoData.factoryCommentUpdateDate,fbrcActDy:dtoData.fbrcActDy,fbrcActQty:dtoData.fbrcActQty,fbrcOrderNumber:dtoData.fbrcOrderNumber,fbrcOrderStatus:dtoData.fbrcOrderStatus,fbrcDeliveryDate:dtoData.fbrcDeliveryDate,colorDlRequested:dtoData.colorDlRequested,colorDlAnswered:dtoData.colorDlAnswered,colorDlAuto:dtoData.colorDlAuto,colorProductionDueDateAuto:dtoData.colorProductionDueDateAuto,colorAutoReflectionDate:dtoData.colorAutoReflectionDate,colorActDy:dtoData.colorActDy,colorActQty:dtoData.colorActQty,colorOrderNumber:dtoData.colorOrderNumber,colorOrderStatus:dtoData.colorOrderStatus,colorDeliveryDate:dtoData.colorDeliveryDate,trimDlRequested:dtoData.trimDlRequested,trimDlAnswered:dtoData.trimDlAnswered,trimDlAuto:dtoData.trimDlAuto,trimProductionDueDateAuto:dtoData.trimProductionDueDateAuto,trimAutoReflectionDate:dtoData.trimAutoReflectionDate,trimActDy:dtoData.trimActDy,trimActQty:dtoData.trimActQty,trimOrderNumber:dtoData.trimOrderNumber,trimOrderStatus:dtoData.trimOrderStatus,trimDeliveryDate:dtoData.trimDeliveryDate,poDlRequested:dtoData.poDlRequested,poDlAnswered:dtoData.poDlAnswered,poDlAuto:dtoData.poDlAuto,poProductionDueDateAuto:dtoData.poProductionDueDateAuto,poAutoReflectionDate:dtoData.poAutoReflectionDate,poActDy:dtoData.poActDy,poActQty:dtoData.poActQty,poOrderNumber:dtoData.poOrderNumber,poOrderStatus:dtoData.poOrderStatus,assort1:dtoData.assort1,assort2:dtoData.assort2,nxAssort:dtoData.nxAssort,solid:dtoData.solid,orderPlanQtyStop:dtoData.orderPlanQtyStop,fixFlag:dtoData.fixFlag,alternativeFlag:dtoData.alternativeFlag,expressLineFlag:dtoData.expressLineFlag,factoryComment:dtoData.factoryComment,plannedEXF:dtoData.plannedEXF,exfEtd:dtoData.exfEtd,exfWh:dtoData.exfWh,sweingCountryRegion:dtoData.sweingCountryRegion,rewMaterialOriginal:dtoData.rewMaterialOriginal,itemDrop:dtoData.itemDrop,fileId:Number(dtoData.fileId),countY:dtoData.countY,sample:dtoData.sample,exf:dtoData.exf,bddl:dtoData.bddl,bddlPast:dtoData.bddlPast,ltBdExf:dtoData.ltBdExf,newBddl:dtoData.newBddl,newLtBdExf:dtoData.newLtBdExf,ltPoExf:dtoData.ltPoExf,qtyLtBdExf:dtoData.qtyLtBdExf,qtyLtPoExf:dtoData.qtyLtPoExf,country2Y:dtoData.country2Y,phase:dtoData.phase,version:dtoData.version,month:10,createDate: moment(dtoData.createDate).format('YYYY-MM-DD HH:mm'),updateDate:moment(dtoData.updateDate).format('YYYY-MM-DD HH:mm')

    //                 })
    //                 if (!updateOrder.affected) {
    //                     await transactionManager.releaseTransaction();
    //                     return new CommonResponseModel(false, 0, 'Something went wrong in order update')
    //                 }
    //                 const convertedExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData,id,details.productionPlanId,10,dtoData.exf);
    //                 const saveExcelEntity: OrdersChildEntity = await transactionManager.getRepository(OrdersChildEntity).save(convertedExcelEntity);
    //                 if (saveExcelEntity) {
    //                     //difference insertion to order diff table
    //                     const existingDataKeys = Object.keys(details)
    //                     const currentDataKeys = Object.keys(dtoData)
    //                     for (const existingDataKey of existingDataKeys) {
    //                         if (details[existingDataKey] != dtoData[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'version' && existingDataKey != '' && existingDataKey != 'orderStatus' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser' && existingDataKey != 'fileId' && existingDataKey != 'month' && existingDataKey != 'productionPlanId') {
    //                             const orderDiffObj = new OrdersDifferenceEntity();
    //                                     if(yearOrderDtoKeys.includes(existingDataKey)){

    //                                 const oldValue = moment(details[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY','YYYY/MM/DD','YYYY-MM-DD HH:mm:ss']).format('YYYY-MM-DD');
    //                                 const newValue = moment(dtoData[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY','YYYY/MM/DD','YYYY-MM-DD']).format('YYYY-MM-DD');
    //                                 orderDiffObj.oldValue = oldValue
    //                                 orderDiffObj.newValue = newValue
    //                                 orderDiffObj.columnName = orderColumnValues[existingDataKey]
    //                                 orderDiffObj.displayName = existingDataKey
    //                                 orderDiffObj.productionPlanId = details.productionPlanId
    //                                 orderDiffObj.version = dtoData.version
    //                                 orderDiffObj.fileId = Number(id)
    //                                 orderDiffObj.orderPlanNumber = dtoData.orderPlanNumber
    //                                 if (oldValue != newValue) {
    //                                     const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
    //                                     if (!orderDiffSave) {
    //                                         throw new Error('orderDiffSave')

    //                                     }
    //                                 } else {
    //                                     continue;
    //                                 }
    //                             }else if(monthOrderDtoKeys.includes(existingDataKey)){
    //                                 const oldValue = moment(details[existingDataKey]).format('MM-DD');
    //                                 const newValue = moment(dtoData[existingDataKey]).format('MM-DD');
    //                                 orderDiffObj.oldValue = oldValue
    //                                 orderDiffObj.newValue = newValue
    //                                 orderDiffObj.columnName = orderColumnValues[existingDataKey]
    //                                 orderDiffObj.displayName = existingDataKey
    //                                 orderDiffObj.productionPlanId = details.productionPlanId
    //                                 orderDiffObj.version = dtoData.version
    //                                 orderDiffObj.fileId = Number(id)
    //                                 orderDiffObj.orderPlanNumber = dtoData.orderPlanNumber
    //                                 if (oldValue != newValue) {
    //                                     const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
    //                                     if (!orderDiffSave) {
    //                                         throw new Error('Error while saving projection orders difference')
    //                                     }
    //                                 } else {
    //                                     continue;
    //                                 }
    //                             } 
    //                             else {
    //                                 orderDiffObj.oldValue = details[existingDataKey]
    //                                 orderDiffObj.newValue = dtoData[existingDataKey]
    //                                 orderDiffObj.columnName = orderColumnValues[existingDataKey]
    //                                 orderDiffObj.displayName = existingDataKey
    //                                 orderDiffObj.productionPlanId = details.productionPlanId
    //                                 orderDiffObj.version = dtoData.version
    //                                 orderDiffObj.fileId = Number(id)
    //                                 orderDiffObj.orderPlanNumber = dtoData.orderPlanNumber
    //                                 if (orderDiffObj.oldValue != orderDiffObj.newValue) {
    //                                     const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
    //                                     if (!orderDiffSave) {
    //                                         throw new Error('Error while saving projection orders difference')
    //                                     } 
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 dtoData.version = 1
    //                 if(dtoData.publishFlagForFactory !== 'NotPub'){

    //                     const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(dtoData, id, 10,dtoData.exf);
    //                     const saveExcelEntity: OrdersEntity = await transactionManager.getRepository(OrdersEntity).save(convertedExcelEntity);
    //                     const convertedChildExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData,id,saveExcelEntity.productionPlanId,10,dtoData.exf);
    //                     const saveChildExcelEntity: OrdersChildEntity = await transactionManager.getRepository(OrdersChildEntity).save(convertedChildExcelEntity);
    //                     if (!saveExcelEntity || !saveChildExcelEntity) {
    //                         throw new Error('Error while saving projection orders')
    //                     }
    //                 }
    //             }
    //         } 
    //     }

    // }
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
            if (difference.length > 0) {
                await transactionManager.releaseTransaction()
                return new CommonResponseModel(false, 1110, 'Please Upload Correct Excel')
            }
            for (const data of convertedData) {
                let dtoData
                if (data.Order_No != null) {
                    dtoData = new TrimOrderDto(null, data.Order_No, data.Year, data.Revision_No, data.Planning_Ssn, data.Global_Business_Unit, data.Business_Unit, data.Item_Brand, data.Department, moment(data.Revised_Date).format('YYYY-MM-DD'), data.Document_Status, data.Answered_Status, data.Vendor_Person_in_Charge, moment(data.Decision_Date).format('YYYY-MM-DD'), data.Payment_Terms, moment(data.Contracted_ETD).format('YYYY-MM-DD'), moment(data.ETA_WH).format('YYYY-MM-DD'), data.Approver, moment(data.Approval_Date).format('YYYY-MM-DD'), data.Order_Conditions, data.Remark, data.Raw_Material_CodeFR, data.Supplier_Raw_Material_Code, data.Supplier_Raw_Material, data.Vendor_Code, data.Vendor, data.Management_Factory_Code, data.Management_Factory, data.Branch_Factory_Code, data.Branch_Factory, data.Order_Plan_Number, data.Item_Code, data.Item, data.Representative_Sample_Code, data.Sample_Code, data.Color_Code, data.Color, data.Pattern_Dimension_Code, data.Size_Code, data.Size, (data.Order_Qtypcs).toString().replace(/,/g, ''), data.Arrangement_By, data.Trim_Description, data.Trim_Item_No, data.Trim_Supplier, 'bidhun', null, null, null, null, id, month)
                } else {
                    break;
                }
                if (dtoData.orderNo != null) {
                    const details = await this.trimOrdersRepository.findOne({ where: { orderNo: dtoData.orderNo, sizeCode: dtoData.sizeCode, colorCode: dtoData.colorCode } })
                    const versionDetails = await this.trimordersChildRepo.getVersion(dtoData.orderNo, dtoData.sizeCode, dtoData.colorCode)
                    let version = 1;
                    if (versionDetails.length > 0) {
                        version = Number(versionDetails.length) + 1
                    }
                    dtoData.version = version
                    if (details) {
                        // const updatedData = this.ordersAdapter.convertDtoToEntity(data);
                        const updateOrder = await transactionManager.getRepository(TrimOrdersEntity).update({ orderNo: dtoData.orderNo, sizeCode: dtoData.sizeCode, colorCode: dtoData.colorCode }, {
                            year: dtoData.year, revisionNo: dtoData.revisionNo, planningSsn: dtoData.planningSsn, globalBusinessUnit: dtoData.globalBusinessUnit, businessUnit: dtoData.businessUnit, itemBrand: dtoData.itemBrand, Department: dtoData.Department, revisedDate: dtoData.revisedDate, DocumentStatus: dtoData.DocumentStatus, answeredStatus: dtoData.answeredStatus, vendorPersoninCharge: dtoData.vendorPersoninCharge, decisionDate: dtoData.decisionDate, paymentTerms: dtoData.paymentTerms, contractedETD: dtoData.contractedETD, ETAWH: dtoData.ETAWH, approver: dtoData.approver, approvalDate: dtoData.approvalDate, orderConditions: dtoData.orderConditions, remark: dtoData.remark, rawMaterialCode: dtoData.rawMaterialCode, supplierRawMaterialCode: dtoData.supplierRawMaterialCode, supplierRawMaterial: dtoData.supplierRawMaterial, vendorCode: dtoData.vendorCode, vendor: dtoData.vendor, managementFactoryCode: dtoData.managementFactoryCode, managementFactory: dtoData.managementFactory, branchFactoryCode: dtoData.branchFactoryCode, branchFactory: dtoData.branchFactory, orderPlanNumber: dtoData.orderPlanNumber, itemCode: dtoData.itemCode, item: dtoData.item, representativeSampleCode: dtoData.representativeSampleCode, sampleCode: dtoData.sampleCode, colorCode: dtoData.colorCode, color: dtoData.color, patternDimensionCode: dtoData.patternDimensionCode, sizeCode: dtoData.sizeCode, size: dtoData.size, arrangementBy: dtoData.arrangementBy, trimDescription: dtoData.trimDescription, trimItemNo: dtoData.trimItemNo, trimSupplier: dtoData.trimSupplier, createdUser: dtoData.createdUser, updatedUser: dtoData.updatedUser, version: dtoData.version, fileId: dtoData.fileId, month: dtoData.month, orderQtyPcs: dtoData.orderQtyPcs
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
                } else {
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
            return new CommonResponseModel(false, 0, 'Network Error or Code issue')
        }
    }

    async getOrdersData(req: orders): Promise<CommonResponseModel> {
        // console.log(req,'req')
        const details = await this.ordersRepository.getOrdersData(req)
        if (details)
            return new CommonResponseModel(true, 1, 'data retrived', details)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getQtyChangeData(req: CompareOrdersFilterReq): Promise<CommonResponseModel> {
        const latprefiles = await this.fileUploadRepo.getLatestPreviousFilesData()
        const data = await this.ordersRepository.getQtyChangeData(req, latprefiles[0].fileId, latprefiles[1].fileId)
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getQtyDifChangeData(req: CompareOrdersFilterReq): Promise<CommonResponseModel> {
        const latprefiles = await this.fileUploadRepo.getLatestPreviousFilesData()
        const data = await this.ordersRepository.getItemWiseQtyChangeData(req, latprefiles[0].fileId, latprefiles[1].fileId)
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    // async getQtyDifChangeData(req:CompareOrdersFilterReq): Promise<CommonResponseModel> {
    //     const files = await this.fileUploadRepo.getFilesData()

    //     let data;
    //     if (files.length == 0) {
    //         return new CommonResponseModel(false, 0, 'No data found');
    //     } else if (files.length == 1) {
    //         data = await this.ordersChildRepo.getItemQtyChangeData1(files[0]?.fileId,req)
    //     } else {
    //         data = await this.ordersChildRepo.getItemQtyChangeData(files[1]?.fileId, files[0]?.fileId,req)
    //     }
    //     if (data)
    //         return new CommonResponseModel(true, 1, 'data retrived', data)
    //     else
    //         return new CommonResponseModel(false, 0, 'No data found');
    // }

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
            if (!latestFileId.affected) {
                await manager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong in File update')
            }
        }
        if (req) {
            const deleteChildData = await manager.getRepository(OrdersChildEntity).delete({ fileId: req.fileId })
            if (!deleteChildData.affected) {
                await manager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
            }

        }
        if (req) {
            const getOrderDiff = await this.orderDiffRepo.find({ where: { fileId: req.fileId } })
            if (getOrderDiff.length > 0) {
                const deleteDiffData = await manager.getRepository(OrdersDifferenceEntity).delete({ fileId: req.fileId })
                if (!deleteDiffData.affected) {
                    await manager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
                }
            }
        }
        if (req) {
            const deleteOrdersData = await manager.getRepository(OrdersEntity).delete({ fileId: req.fileId, version: 1 })
            // if(!deleteOrdersData.affected){
            //     await manager.releaseTransaction();
            //     return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
            // }
        }
        const updatedData = await manager.getRepository(OrdersChildEntity).find({
            select: ['fileId'],
            order: { id: 'DESC' }, take: 1
        })
        const flag = new Set()
        let data = []
        if (updatedData.length > 0) {
            data = await manager.getRepository(OrdersChildEntity).find({ where: { fileId: updatedData[0]?.fileId } })
            // this.ordersChildRepo.find({
            //     where: { fileId: updatedData[0]?.fileId },
            //     // relations: ['orders']
            // })
        } else {
            flag.add(true)
        }

        if (data.length > 0) {

            for (const dtoData of data) {
                // const prodPlanId = new OrdersEntity();
                // prodPlanId.productionPlanId = dtoData.orders.productionPlanId
                const updateOrder = await manager.getRepository(OrdersEntity).update({ orderPlanNumber: dtoData.orderPlanNumber }, {
                    year: dtoData.year, planningSsn: dtoData.planningSsn, biz: dtoData.biz, coreCategory: dtoData.coreCategory, planningSum: dtoData.planningSum, coeff: dtoData.coeff, publishFlagForFactory: dtoData.publishFlagForFactory, orderPlanQty: dtoData.orderPlanQty, orderPlanQtyCoeff: dtoData.orderPlanQtyCoeff, prodPlanType: dtoData.prodPlanType, wh: dtoData.wh, exfEtd: dtoData.exfEtd, etdWh: dtoData.etdWh, sample: dtoData.sample, version: dtoData.version, fileId: dtoData.fileId, updatedUser: dtoData.createdUser
                })

                if (updateOrder.affected) {
                    flag.add(true)
                } else {
                    flag.add(false)
                    await manager.releaseTransaction()
                    return new CommonResponseModel(false, 0, 'Something went wrong in order update', updateOrder)
                }
            }
        } else {
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
            if (!latestFileId.affected) {
                await manager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong in File update')
            }
        }
        if (req) {
            const deleteChildData = await manager.getRepository(TrimOrdersChildEntity).delete({ fileId: req.fileId })
            if (!deleteChildData.affected) {
                await manager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
            }
        }
        // if (req) {
        //     const deleteDiffData = await this.orderDiffRepo.deleteDiffData(req)
        // }
        if (req) {
            const deleteOrdersData = await manager.getRepository(TrimOrdersEntity).delete({ fileId: req.fileId, version: 1 })
            // if(!deleteOrdersData.affected){
            //     await manager.releaseTransaction();
            //     return new CommonResponseModel(false, 0, 'Something went wrong in Orders Delete')
            // }
        }
        const updatedData = await manager.getRepository(TrimOrdersChildEntity).find({
            select: ['fileId'],
            order: { id: 'DESC' }, take: 1
        })
        const flag = new Set()
        let data = []
        if (updatedData.length > 0) {

            data = await this.trimordersChildRepo.find({
                where: { fileId: updatedData[0]?.fileId },
                // relations: ['orders']
            })
        } else {
            flag.add(true)
        }
        if (data.length > 0) {

            for (const dtoData of data) {
                // const prodPlanId = new OrdersEntity();
                // prodPlanId.productionPlanId = dtoData.orders.productionPlanId
                const updateOrder = await manager.getRepository(TrimOrdersEntity).update({ orderNo: dtoData.orderNo, sizeCode: dtoData.sizeCode, colorCode: dtoData.colorCode }, {
                    year: dtoData.year, revisionNo: dtoData.revisionNo, planningSsn: dtoData.planningSsn, globalBusinessUnit: dtoData.globalBusinessUnit, businessUnit: dtoData.businessUnit, itemBrand: dtoData.itemBrand, Department: dtoData.Department, revisedDate: dtoData.revisedDate, DocumentStatus: dtoData.DocumentStatus, answeredStatus: dtoData.answeredStatus, vendorPersoninCharge: dtoData.vendorPersoninCharge, decisionDate: dtoData.decisionDate, paymentTerms: dtoData.paymentTerms, contractedETD: dtoData.contractedETD, ETAWH: dtoData.ETAWH, approver: dtoData.approver, approvalDate: dtoData.approvalDate, orderConditions: dtoData.orderConditions, remark: dtoData.remark, rawMaterialCode: dtoData.rawMaterialCode, supplierRawMaterialCode: dtoData.supplierRawMaterialCode, supplierRawMaterial: dtoData.supplierRawMaterial, vendorCode: dtoData.vendorCode, vendor: dtoData.vendor, managementFactoryCode: dtoData.managementFactoryCode, managementFactory: dtoData.managementFactory, branchFactoryCode: dtoData.branchFactoryCode, branchFactory: dtoData.branchFactory, orderPlanNumber: dtoData.orderPlanNumber, itemCode: dtoData.itemCode, item: dtoData.item, representativeSampleCode: dtoData.representativeSampleCode, sampleCode: dtoData.sampleCode, colorCode: dtoData.colorCode, color: dtoData.color, patternDimensionCode: dtoData.patternDimensionCode, sizeCode: dtoData.sizeCode, size: dtoData.size, arrangementBy: dtoData.arrangementBy, trimDescription: dtoData.trimDescription, trimItemNo: dtoData.trimItemNo, trimSupplier: dtoData.trimSupplier, createdUser: dtoData.createdUser, updatedUser: dtoData.updatedUser, version: dtoData.version, fileId: dtoData.fileId, month: dtoData.month, orderQtyPcs: dtoData.orderQtyPcs
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
        } else {
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

    async updatePath(filePath: string, filename: string, month: number, fileType: string, uploadType: string, msg?: string): Promise<CommonResponseModel> {
        const entity = new FileUploadEntity()
        entity.fileName = filename;
        entity.filePath = filePath;
        entity.month = 9;
        entity.fileType = fileType;
        entity.uploadType = uploadType
        if (msg) {
            entity.status = 'Failed';
            entity.failedReason = msg;
        } else {
            entity.status = 'uploading';
        }
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
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status, isActive: false, createdUser: req.userName, failedReason: req.failedReason, columns: req.columns });
        } else {
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status, createdUser: req.userName })
        }
        if (update.affected) {
            return new CommonResponseModel(true, 1, 'updated successfully');
        } else {
            return new CommonResponseModel(false, 0, 'update failed');

        }
    }

    async getUploadFilesData(req: FileTypeDto): Promise<CommonResponseModel> {
        // let data
        // if (req.fileType !== undefined) {

        //     data = await this.fileUploadRepo.getFilesData(req)
        // } else {
        //     data = await this.fileUploadRepo.getFilesData()
        // }
        const info = []
        let query = `select fup.id as fileId , fup.file_name as fileName , fup.file_path as filePath,DATE_FORMAT(fup.created_at, '%Y-%m-%d %h:%i %p') as uploadedDate, fup.created_user as createdUser, fup.status as status,fup.file_type as fileType,fup.upload_type AS uploadType,fup.columns, fup.failed_reason as failedReason,fup.is_active as isActive from file_upload fup where fup.id > 0`
        if(req.fileType){
            query += ` and fup.file_type = '${req.fileType}'`
        } 
        if(req.fromDate){
            query += ` and DATE(fup.created_at) BETWEEN '${req.fromDate}' AND '${req.toDate}'`
        }
        if(req.type !== 'UploadView'){
            query += ` and fup.is_active = 1 AND fup.status = 'Success'`
        }
        if(req.uploadStatus){
            query += ` and fup.status = '${req.uploadStatus}'`
        }
        query += ` group by fup.id order by fup.created_at DESC`
        const data = await this.dataSource.query(query)
        const trimQuery = `SELECT file_id as fileId,COUNT(*) as trimRecords,SUM(order_qty_pcs) as trimorderqty FROM trim_orders_child WHERE file_id IN(SELECT file_id FROM file_upload) GROUP BY file_id`
        const trimdata = await this.dataSource.query(trimQuery)
        const trimMap = new Map<number,any>()
        for (const rec of trimdata) {
            if (!(trimMap.has(rec.fileId))) {
                trimMap.set(rec.fileId, rec)
            }
        }
        const projectionQuery = `SELECT file_id as fileId,COUNT(*) as projectionRecords,SUM(order_plan_qty) as proorderqty FROM orders_child WHERE file_id IN(SELECT file_id FROM file_upload) GROUP BY file_id`
        const projectiondata = await this.dataSource.query(projectionQuery)
        const projectionMap = new Map<number,any>()
        for (const rec of projectiondata) {
            if (!(projectionMap.has(rec.fileId))) {
                projectionMap.set(rec.fileId, rec)
            }
        }
        if (data.length > 0) {
            for(const rec of data){
                info.push(new FileInfoModel(rec.fileId,rec.fileName,rec.filePath,rec.uploadedDate,rec.createdUser,rec.status,rec.fileType,projectionMap.get(rec.fileId)?.projectionRecords,trimMap.get(rec.fileId)?.trimRecords,projectionMap.get(rec.fileId)?.proorderqty,trimMap.get(rec.fileId)?.trimorderqty,rec.uploadType,rec.columns,rec.failedReason,rec.isActive))
            }
            return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', info);
        }
        else {
            return new CommonResponseModel(false, 0, 'No data found', data);
        }
    }

    async getVersionWiseData(req: VersionDataModel): Promise<CommonResponseModel> {
        const records = await this.ordersChildRepo.getVersionWiseQty(req)
        const versionDataMap = new Map<number, VersionDataModel>();
        if (records.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        }
        for (const record of records) {
            if (!versionDataMap.has(record.production_plan_id)) {
                versionDataMap.set(record.production_plan_id, new VersionDataModel(record.production_plan_id, record.prod_plan_type, record.item_cd, record.item, []));
            }
            versionDataMap.get(record.production_plan_id).versionWiseData.push(new VersionAndQtyModel(record.VERSION, record.order_plan_qty));
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

    async getTrimOrdersData(req: TrimOrdersReq): Promise<CommonResponseModel> {
        const data = await this.trimOrderRepo.getTrimOders(req)
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', data);
        }
        else {
            return new CommonResponseModel(false, 0, 'No data found', data);
        }
    }
    async getUnacceptedTrimOrders(req: TrimOrdersReq): Promise<CommonResponseModel> {
        const data = await this.trimOrderRepo.getUnacceptedTrimOrders(req)
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', data);
        }
        else {
            return new CommonResponseModel(false, 0, 'No data found', data);
        }
    }
    async getTrimOrdersNo(): Promise<CommonResponseModel> {
        const data = await this.trimOrderRepo.getTrimOdersNo()
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', data);
        }
        else {
            return new CommonResponseModel(false, 0, 'No data found', data);
        }
    }

    async getTrimSampleCode(): Promise<CommonResponseModel> {
        const data = await this.trimOrderRepo.getTrimSampleCode()
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
    // async getExfactoryMonthData(req:YearReq): Promise<CommonResponseModel> {
    //     console.log('okkkkkkkkk')

    //     const data = await this.ordersRepository.getExfactoryMonthData(req.year);

    //     if (data.length === 0) {
    //         return new CommonResponseModel(false, 0, 'data not found');
    //     }

    //     const DateMap = new Map<string, ItemDataDto>();  
    //     const monthWiseInstances: MonthWiseDto[] = [];      
    //     for (const rec of data) {
    //         const orderQty = rec.order_plan_qty.replace(/,/g, '')
    //         const coeffQty = rec.order_plan_qty_coeff.replace(/,/g,'')
    //         if (!DateMap.has(rec.item_cd)) {
    //             DateMap.set(
    //                 rec.item_cd,
    //                 new ItemDataDto(rec.item, [])
    //             );
    //         }
    //         const monthData = DateMap.get(rec.item_cd).monthWiseData;
    //         const phase = monthData.find(e => e.phasetype === rec.prod_plan_type)

    // // const phase = 
    // // console.log(monthData.find(e=> e.phasetype === rec.prod_plan_type),'-------')
    //         if (!phase) {
    //             const pcs: PcsDataDto[] = [];
    //             const coeff: CoeffDataDto[] = [];
    //          pcs.push(
    //            { name: 'In Pcs',
    //             janPcs: rec.ExfMonth === 1 ? Number(orderQty) :Number(0),
    //             febPcs: rec.ExfMonth === 2 ? Number(orderQty) :Number(0),
    //             marPcs: rec.ExfMonth === 3 ? Number(orderQty) :Number(0),
    //             aprPcs: rec.ExfMonth === 4 ? Number(orderQty) :Number(0),
    //             mayPcs: rec.ExfMonth === 5 ? Number(orderQty) :Number(0),
    //             junPcs: rec.ExfMonth === 6 ? Number(orderQty) :Number(0),
    //             julPcs: rec.ExfMonth === 7 ? Number(orderQty) :Number(0),
    //             augPcs: rec.ExfMonth === 8 ? Number(orderQty) :Number(0),
    //             sepPcs: rec.ExfMonth === 9 ? Number(orderQty) :Number(0),
    //             octPcs: rec.ExfMonth === 10 ? Number(orderQty) :Number(0),
    //             novPcs: rec.ExfMonth === 11 ? Number(orderQty) :Number(0),
    //             decPcs: rec.ExfMonth === 12 ? Number(orderQty) :Number(0),}
    //         )
    //           coeff.push({
    //             name: 'In Coeff',
    //             janCoeff: rec.ExfMonth === 1 ? Number(coeffQty) :Number(0),
    //             febCoeff: rec.ExfMonth === 2 ? Number(coeffQty) :Number(0),
    //             marCoeff: rec.ExfMonth === 3 ? Number(coeffQty) :Number(0),
    //             aprCoeff: rec.ExfMonth === 4 ? Number(coeffQty) :Number(0),
    //             mayCoeff: rec.ExfMonth === 5 ? Number(coeffQty) :Number(0),
    //             junCoeff: rec.ExfMonth === 6 ? Number(coeffQty) :Number(0),
    //             julCoeff: rec.ExfMonth === 7 ? Number(coeffQty) :Number(0),
    //             augCoeff: rec.ExfMonth === 8 ? Number(coeffQty) :Number(0),
    //             sepCoeff: rec.ExfMonth === 9 ? Number(coeffQty) :Number(0),
    //             octCoeff: rec.ExfMonth === 10 ? Number(coeffQty) :Number(0),
    //             novCoeff: rec.ExfMonth === 11 ? Number(coeffQty) :Number(0),
    //             decCoeff: rec.ExfMonth === 12 ? Number(coeffQty) :Number(0),
    //           })
    //           const totalPcs = pcs.reduce((total, item) => {
    //             return  [item.janPcs, item.febPcs, item.marPcs, item.aprPcs, item.mayPcs, item.junPcs, item.julPcs, item.augPcs, item.sepPcs, item.octPcs, item.novPcs, item.decPcs]
    //                 .filter(value => value !== 0) 
    //                 .reduce((sum, value) =>  value, 0);
    //         }, 0);

    //         const totalCoeff = coeff.reduce((total, item) => {
    //             return  [item.janCoeff, item.febCoeff, item.marCoeff, item.aprCoeff, item.mayCoeff, item.junCoeff, item.julCoeff, item.augCoeff, item.sepCoeff, item.octCoeff, item.novCoeff, item.decCoeff]
    //                 .filter(value => value !== 0)
    //                 .reduce((sum, value) => value, 0);
    //         }, 0);

    //             const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff,totalPcs,totalCoeff);
    //             monthData.push(monthWiseInstance); 
    //         }

    //     }

    //     const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());   
    //     return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    // }
    async getMonthWiseReportData(req: YearReq): Promise<CommonResponseModel> {

        const data = await this.ordersRepository.getMonthWiseReportData(req);

        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }

        const DateMap = new Map<string, ItemDataDto>();
        const monthWiseInstances: MonthWiseDto[] = [];
        for (const rec of data) {

            if (req.tabName === 'ExFactory') {
                if (!DateMap.has(rec.planning_sum)) {
                    DateMap.set(
                        rec.planning_sum,
                        new ItemDataDto(rec.planning_sum, [])
                    );
                }
                const monthData = DateMap.get(rec.planning_sum).monthWiseData;
                const pcs: PcsDataDto[] = [];
                const coeff: CoeffDataDto[] = [];
                pcs.push(
                    {
                        name: 'In Pcs',
                        janPcs: rec.janPcsExf,
                        febPcs: rec.febPcsExf,
                        marPcs: rec.marPcsExf,
                        aprPcs: rec.aprPcsExf,
                        mayPcs: rec.mayPcsExf,
                        junPcs: rec.junPcsExf,
                        julPcs: rec.julPcsExf,
                        augPcs: rec.augPcsExf,
                        sepPcs: rec.sepPcsExf,
                        octPcs: rec.octPcsExf,
                        novPcs: rec.novPcsExf,
                        decPcs: rec.decPcsExf,
                    }
                )
                coeff.push({
                    name: 'In Coeff',
                    janCoeff: rec.janCoeffExf,
                    febCoeff: rec.febCoeffExf,
                    marCoeff: rec.marCoeffExf,
                    aprCoeff: rec.aprCoeffExf,
                    mayCoeff: rec.mayCoeffExf,
                    junCoeff: rec.junCoeffExf,
                    julCoeff: rec.julCoeffExf,
                    augCoeff: rec.augCoeffExf,
                    sepCoeff: rec.sepCoeffExf,
                    octCoeff: rec.octCoeffExf,
                    novCoeff: rec.novCoeffExf,
                    decCoeff: rec.decCoeffExf,
                })
                const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff, rec.ExfPcsTotal, rec.ExfCoeffTotal);
                monthData.push(monthWiseInstance);
            }
            if (req.tabName === 'WareHouse') {
                if (!DateMap.has(rec.planning_sum)) {
                    DateMap.set(
                        rec.planning_sum,
                        new ItemDataDto(rec.planning_sum, [])
                    );
                }
                const monthData = DateMap.get(rec.planning_sum).monthWiseData;
                const pcs: PcsDataDto[] = [];
                const coeff: CoeffDataDto[] = [];
                pcs.push(
                    {
                        name: 'In Pcs',
                        janPcs: rec.janPcsWh,
                        febPcs: rec.febPcsWh,
                        marPcs: rec.marPcsWh,
                        aprPcs: rec.aprPcsWh,
                        mayPcs: rec.mayPcsWh,
                        junPcs: rec.junPcsWh,
                        julPcs: rec.julPcsWh,
                        augPcs: rec.augPcsWh,
                        sepPcs: rec.sepPcsWh,
                        octPcs: rec.octPcsWh,
                        novPcs: rec.novPcsWh,
                        decPcs: rec.decPcsWh,
                    }
                )
                coeff.push({
                    name: 'In Coeff',
                    janCoeff: rec.janCoeffWh,
                    febCoeff: rec.febCoeffWh,
                    marCoeff: rec.marCoeffWh,
                    aprCoeff: rec.aprCoeffWh,
                    mayCoeff: rec.mayCoeffWh,
                    junCoeff: rec.junCoeffWh,
                    julCoeff: rec.julCoeffWh,
                    augCoeff: rec.augCoeffWh,
                    sepCoeff: rec.sepCoeffWh,
                    octCoeff: rec.octCoeffWh,
                    novCoeff: rec.novCoeffWh,
                    decCoeff: rec.decCoeffWh,
                })
                const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff, rec.WhPcsTotal, rec.WhCoeffTotal);
                monthData.push(monthWiseInstance);
            }

        }

        const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }

    async getMonthWiseReportDataNew(req:YearReq): Promise<CommonResponseModel>{
        // console.log(req,'$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        const detailedarray: NewitemDataDto[] = [];

        const data = await this.ordersRepository.getMonthWiseReportDataNew(req);
        if(data.length == 0){
            return new CommonResponseModel(false, 0, 'data not found')
        }
        const itemPhaseTypeYearWiseMap = new Map<string, Map<string, pcsData[]>>();
        
        if(req.tabName === 'ExFactory'){
            for(const rec of data){
                if(!itemPhaseTypeYearWiseMap.has(rec.planning_sum)){
                    itemPhaseTypeYearWiseMap.set(rec.planning_sum, new Map<string, pcsData[]>())
                }
                if(!itemPhaseTypeYearWiseMap.get(rec.planning_sum).has(rec.prod_plan_type)){
                    itemPhaseTypeYearWiseMap.get(rec.planning_sum).set(rec.prod_plan_type, []);
                }
                const exfpc = {
                    monthName:rec.exfMonthName,
                    inPcs:rec.exfPcs,
                    inCoeffPcs:rec.exfCoeff
                }
                itemPhaseTypeYearWiseMap.get(rec.planning_sum).get(rec.prod_plan_type).push(exfpc);
            }
    
            itemPhaseTypeYearWiseMap.forEach((yearRecs, item) => {
                const monthWiseDtoArray: NewMonthWiseDto[] = [];
                yearRecs.forEach( (yr, phaseType) => {
                    const  exfData = new NewMonthWiseDto(phaseType, []);
                    yr.forEach(mData => {
                        exfData.pcsData.push(mData);
                    });
                    monthWiseDtoArray.push(exfData);
                });
                detailedarray.push(new NewitemDataDto(item,monthWiseDtoArray));
            });    
        }
        if(req.tabName === 'WareHouse'){
            for(const rec of data){
                if(!itemPhaseTypeYearWiseMap.has(rec.planning_sum)){
                    itemPhaseTypeYearWiseMap.set(rec.planning_sum, new Map<string, pcsData[]>())
                }
                if(!itemPhaseTypeYearWiseMap.get(rec.planning_sum).has(rec.prod_plan_type)){
                    itemPhaseTypeYearWiseMap.get(rec.planning_sum).set(rec.prod_plan_type, []);
                }
                const whpc = {
                    monthName:rec.whMonthName,
                    inPcs:rec.whPcs,
                    inCoeffPcs:rec.whCoeff
                }
                itemPhaseTypeYearWiseMap.get(rec.planning_sum).get(rec.prod_plan_type).push(whpc);
            }
            itemPhaseTypeYearWiseMap.forEach((yearRecs, item) => {
                const monthWiseDtoArray:NewMonthWiseDto[] =[];
                yearRecs.forEach((yr, phaseType) =>{
                    const  whData = new NewMonthWiseDto(phaseType, []);
                    yr.forEach(mData =>{
                        whData.pcsData.push(mData)
                    });
                    detailedarray.push(new NewitemDataDto(item,monthWiseDtoArray))
                })
            })
        }

        return new CommonResponseModel(true,1,'Data retrived',detailedarray)     
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

    async seasonWiseReport(req?: SeasonWiseRequest): Promise<CommonResponseModel> {
        const monthsList = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        const qtyQuery = [];
        const format = '%'
        let total = ``
        monthsList.forEach((rec, index) => {
            qtyQuery.push(`SUM(CASE WHEN MONTH(STR_TO_DATE(${req.qtyLocation}, '%m-%d')) = ${index + 1} THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS ${rec}`)
            total += `SUM(${rec}) AS ${rec},`
        })
        // console.log(qtyQuery)
        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        let query = `SELECT file_id,planning_ssn as plannedSeason,year,planning_sum as itemName ,${total}
              SUM(january + february + march + april + may + june + july + august + september + october + november + december) AS total
              FROM (
                SELECT planning_ssn, year, planning_sum,version,file_id,created_at,${qtyQuery}
                FROM orders
                WHERE file_id = (SELECT MAX(file_id) FROM orders) AND year = ${req.year} and planning_ssn = '${req.season}'
                GROUP BY planning_sum
            ) AS subquery
            WHERE 1=1`
        // if (req.itemCode) {
        //     query = query + ` AND item_cd = "${req.itemCode}"`
        //     }
        if (req.itemName) {
            query = query + ` AND planning_sum = "${req.itemName}"`;
        }
        query = query + ` GROUP BY planning_sum HAVING total != 0 ORDER BY created_at DESC`;
        const reportData = await this.dataSource.query(query);

        // const years = [...new Set(reportData.map(data => data.year))];

        // const seasons = years.map(year => {
        //     const seasons = [...new Set(reportData.filter(data => data.year === year).map(data => data.plannedSeason))];

        //     const seasonData = seasons.map(season => {
        //         const seasonData = reportData.filter(data => data.year === year && data.plannedSeason === season);
        //         return { season, data: seasonData };
        //     })

        //     return { year, seasons: seasonData };
        // })

        if (reportData.length > 0) {
            return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', reportData);
        } else {
            return new CommonResponseModel(false, 0, 'No Data Found', []);
        }
    }

    async seasonWiseTabs(): Promise<CommonResponseModel> {
        const query2 = `SELECT year, planning_ssn as plannedSeason FROM orders
            WHERE 1 = 1 AND file_id = (SELECT MAX(file_id) FROM orders ) group by planning_ssn,year ORDER BY year`
        const seasonTabs = await this.dataSource.query(query2)
        // console.log(seasonTabs,'----')
        const data = []
        seasonTabs.forEach((rec) => {
            data.push(
                rec.year.slice(-2) + rec.plannedSeason + "-WH" + "," + Number(rec.year) + "," + rec.plannedSeason,
                rec.year.slice(-2) + rec.plannedSeason + '-EXF' + "," + Number(rec.year) + "," + rec.plannedSeason,
            )
        })
        if (seasonTabs.length > 0) {
            return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', data);
        } else {
            return new CommonResponseModel(false, 0, 'No Data Found', []);
        }
    }


    // async createCOline(req: any): Promise<CommonResponseModel> {
    //     // console.log(req)
    //     try {
    //         const manager = this.dataSource
    //         const orderNo = req.orderNumber
    //         const itemNo = req.itemNumber
    //         // req.purchaseOrderNumber = 3504865987
    //         // req.poLineItemNumber = 10000
    //         // req.scheduleLineItemNumber = 100
    //         const m3Config = appConfig.m3Cred.headerRequest()
    //         const sale_price_qry = `select price from price_list where style = ${req.itemcode} and destination = ${req.destination}`
    //         const salePriceData = await manager.query(sale_price_qry)
    //         const salePrice = salePriceData[0].price
    //         const rptOperation = `https://172.17.3.115:23005/m3api-rest/execute/OIZ100MI/AddBatchLine?CONO=111&ORNO=${orderNo}&ITNO=${itemNo}&SAPR=${salePrice}`;
    //         // const rptOperation = `https://172.17.3.115:23005/m3api-rest/execute/OIZ100MI/AddFreeField?CONO=111&ORNO=${req.purchaseOrderNumber}&PONR=${req.poLineItemNumber}&POSX=${req.scheduleLineItemNumber}&HDPR=${styleNumber}`;
    //         const response = await axios.get(rptOperation, { headers: m3Config.headersRequest, httpsAgent: m3Config.agent });
    //         // console.log(response, 'response')
    //         // console.log(response.data?.MIRecord, 'MIRecord')
    //         if (response.data['@type'])
    //             return new CommonResponseModel(false, 0, "M3 error ,Error message " + " : '" + response.data['Message'] + "'")
    //         if (!response.data?.MIRecord && !response.data?.MIRecord.length)
    //             return new CommonResponseModel(false, 0, "No data found for this item")
    //         // const meToCustomObj = [{ m3Key: 'STAT', yourKey: 'status' }, { m3Key: 'ORNO', yourKey: 'orderNO' }, { m3Key: 'PONR', yourKey: 'poLine' }]
    //         // const myObj = construnctDataFromM3Result(meToCustomObj, response.data.MIRecord)
    //         if (response.status !== 200)
    //             return new CommonResponseModel(false, 1, `Validation failed as`)
    //         await this.updateOrderApprovalStatus(req);
    //         return new CommonResponseModel(true, 1, `COline created successfully`)
    //     } catch (err) {
    //         throw err
    //     }
    // }

    async updateOrderApprovalStatus(req: any): Promise<CommonResponseModel> {
        const orderNo = req.orderNumber
        const updateStatus = await this.trimOrderRepo.update({ orderNo: orderNo }, { answeredStatus: 'Accepted', buyerItemNumber: req.itemNumber })
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

    async getWareHouseMonthData(req: YearReq): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getWareHouseMonthData(req.year);

        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }

        const DateMap = new Map<string, ItemDataDto>();
        const monthWiseInstances: MonthWiseDto[] = []; // Use an array to store instances

        for (const rec of data) {
            const orderQty = rec.order_plan_qty.replace(/,/g, '')
            const coeffQty = rec.order_plan_qty_coeff.replace(/,/g, '')
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
                    {
                        name: 'In Pcs',
                        janPcs: rec.whMonth === 1 ? Number(orderQty) : Number(0),
                        febPcs: rec.whMonth === 2 ? Number(orderQty) : Number(0),
                        marPcs: rec.whMonth === 3 ? Number(orderQty) : Number(0),
                        aprPcs: rec.whMonth === 4 ? Number(orderQty) : Number(0),
                        mayPcs: rec.whMonth === 5 ? Number(orderQty) : Number(0),
                        junPcs: rec.whMonth === 6 ? Number(orderQty) : Number(0),
                        julPcs: rec.whMonth === 7 ? Number(orderQty) : Number(0),
                        augPcs: rec.whMonth === 8 ? Number(orderQty) : Number(0),
                        sepPcs: rec.whMonth === 9 ? Number(orderQty) : Number(0),
                        octPcs: rec.whMonth === 10 ? Number(orderQty) : Number(0),
                        novPcs: rec.whMonth === 11 ? Number(orderQty) : Number(0),
                        decPcs: rec.whMonth === 12 ? Number(orderQty) : Number(0),
                    }
                )
                coeff.push({
                    name: 'In Coeff',
                    janCoeff: rec.whMonth === 1 ? Number(coeffQty) : Number(0),
                    febCoeff: rec.whMonth === 2 ? Number(coeffQty) : Number(0),
                    marCoeff: rec.whMonth === 3 ? Number(coeffQty) : Number(0),
                    aprCoeff: rec.whMonth === 4 ? Number(coeffQty) : Number(0),
                    mayCoeff: rec.whMonth === 5 ? Number(coeffQty) : Number(0),
                    junCoeff: rec.whMonth === 6 ? Number(coeffQty) : Number(0),
                    julCoeff: rec.whMonth === 7 ? Number(coeffQty) : Number(0),
                    augCoeff: rec.whMonth === 8 ? Number(coeffQty) : Number(0),
                    sepCoeff: rec.whMonth === 9 ? Number(coeffQty) : Number(0),
                    octCoeff: rec.whMonth === 10 ? Number(coeffQty) : Number(0),
                    novCoeff: rec.whMonth === 11 ? Number(coeffQty) : Number(0),
                    decCoeff: rec.whMonth === 12 ? Number(coeffQty) : Number(0),
                })
                //        
                const totalPcs = pcs.reduce((total, item) => {
                    return [item.janPcs, item.febPcs, item.marPcs, item.aprPcs, item.mayPcs, item.junPcs, item.julPcs, item.augPcs, item.sepPcs, item.octPcs, item.novPcs, item.decPcs]
                        .filter(value => value !== 0) // Filter out values equal to 0
                        .reduce((sum, value) => value, 0);
                }, 0);

                const totalCoeff = coeff.reduce((total, item) => {
                    return [item.janCoeff, item.febCoeff, item.marCoeff, item.aprCoeff, item.mayCoeff, item.junCoeff, item.julCoeff, item.augCoeff, item.sepCoeff, item.octCoeff, item.novCoeff, item.decCoeff]
                        .filter(value => value !== 0) // Filter out values equal to 0
                        .reduce((sum, value) => value, 0);
                }, 0);


                const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff, totalPcs, totalCoeff);
                monthData.push(monthWiseInstance); // Store each instance

            }

        }
        const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }



    async getSeasonWiseItemCode(): Promise<CommonResponseModel> {
        try {
            const itemCode = await this.ordersRepository.getSeasonWiseItemCode()
            if (itemCode.length > 0) {
                return new CommonResponseModel(true, 1, 'Data Retrieved Succesfully', itemCode)
            } else {
                return new CommonResponseModel(false, 0, 'No data found', [])
            }
        } catch (err) {
            throw (err)
        }
    }

    async getSeasonWiseItemName(req: SeasonWiseRequest): Promise<CommonResponseModel> {
        try {
            const itemCode = await this.seasonWiseReport(req);
            // await this.ordersRepository.getSeasonWiseItemName(req);

            if (itemCode.status) {
                // console.log(itemCode,'---------')
                const empty = [];
                itemCode.data.forEach((ele) => {
                    empty.push({
                        itemName: ele.itemName
                    })
                })
                return new CommonResponseModel(true, 1, 'Data Retrieved Succesfully', empty)
            } else {
                return new CommonResponseModel(false, 0, 'No data found', [])
            }
        } catch (err) {
            throw (err)
        }
    }

    async getExfactoryMonthExcelData(req: YearReq): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getMonthWiseReportData(req);

        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }

        return new CommonResponseModel(true, 1, 'data retrieved', data);
    }
    async getExfactoryComparisionExcelData(req: YearReq): Promise<CommonResponseModel> {
        // console.log(req,'-------')
        const data = await this.ordersChildRepo.getMonthlyComparisionData(req);

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


    async getWareHouseMonthExcelData(req: YearReq): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getWareHouseMonthData(req.year);

        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }

        return new CommonResponseModel(true, 1, 'data retrieved', data);
    }

    async getWareHouseComparisionExcelData(req: YearReq): Promise<CommonResponseModel> {
        const data = await this.ordersChildRepo.getWareHouseComparisionData(req);

        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }
        return new CommonResponseModel(true, 1, 'data retrieved', data);
    }

    //cron job to fetch mails autmatically once per a day
    async processEmails(): Promise<CommonResponseModel> {
        const promiseA = () => new Promise((resolve, reject) => {
            // Set the environment variable to allow TLS
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            let filesArray = []

            const dns = require('dns');
            dns.lookup('zimbra.xmission.com', (err, addresses) => {
                if (err) {
                    // console.error(`DNS lookup error: ${err}`);
                } else {
                    // console.log(`Resolved addresses: ${addresses}`);
                }
            });

            // Define your email configuration
            const imap = new Imap({
                user: 'karthikeyan.nallamuthu@shahi.co.in',
                password: 'auao smhl wkmu uuht',
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 30000,
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
                    return;
                    // console.log(logMessage);
                }

                const filename = attachment.params.name;
                const encoding = attachment.encoding;
                //   this.readCell(filesArray)
                //   const test = getFilesArray(attachment)
                //   filesArray.push(attachment.params.name)




                return (msg, seqno) => {
                    const prefix = `(Message #${seqno}) `;
                    msg.on('body', (stream, info) => {
                        const logMessage = `${prefix}Streaming attachment to file: ${filename}, ${info}`;
                        this.logger.info(logMessage);
                        //   console.log(logMessage);

                        const writeStream = fs.createWriteStream(savePath + filename);


                        //   console.log(writeStream,'www')
                        //   console.log(savePath + filename+'iiiiii')
                        writeStream.on('finish', () => {
                            const finishLogMessage = `${prefix}Done writing to file: ${filename}`;
                            this.logger.info(finishLogMessage);
                            // console.log(finishLogMessage);
                            // console.log(finishLogMessage);
                            // './upload-files/007Q2_Shahi_0807.csv
                            // this.readCell(savePath + filename,filename)
                        });

                        if (toUpper(encoding) === 'BASE64') {
                            stream.pipe(new base64.Base64Decode()).pipe(writeStream);
                        } else {
                            stream.pipe(writeStream);
                        }
                    });
                };
            };
            // console.log('filesssssnwwggg',filesArray)

            imap.once('ready', () => {
                imap.openBox('INBOX', true, (err, box) => {
                    if (err) {
                        const logMessage = `Error opening mailbox: ${err}`;
                        this.logger.error(logMessage);
                        //   console.error(logMessage);
                        throw err;
                    }

                    // const searchCriteria = [['FROM', '']];
                    const searchCriteria = [['SUBJECT', 'UNIQLO ORDER MANAGEMENT'], ['FROM', 'karthikeyan.nallamuthu@shahi.co.in']];
                    // const searchCriteria = [['SUBJECT', 'testing mail'],['FROM', 'uma.boddeda@schemaxtech.com']];

                    imap.search(searchCriteria, (err, results) => {
                        if (err) {
                            const logMessage = `Error searching emails: ${err}`;
                            this.logger.error(logMessage);
                            // console.error(logMessage);
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
                                //   console.log(logMessage);

                                attachments.forEach(async (attachment) => {
                                    if (attachment.params && attachment.params.name) {
                                        const logMessage = `${prefix}Fetching attachment: ${attachment.params.name}`;
                                        this.logger.info(logMessage);
                                        //   console.log(logMessage);
                                        const f = imap.fetch(attrs.uid, {
                                            bodies: [attachment.partID],
                                        });
                                        f.on('message', buildAttMessageFunction(attachment));
                                        //   await this.readCell(savePath + attachment.params.name,attachment.params.name)
                                    }
                                });
                                fetch.on('end', () => {
                                    resolve(attachments);
                                });
                            });
                            msg.once('end', () => {
                                const logMessage = `${prefix}Finished email`;
                                this.logger.info(logMessage);
                                //   console.log(logMessage);
                            });

                        });

                        fetch.once('error', (err) => {
                            const logMessage = `Fetch error: ${err}`;
                            this.logger.error(logMessage);
                            // console.error(logMessage);
                        });

                        fetch.once('end', () => {
                            const logMessage = 'Done fetching all messages!';
                            this.logger.info(logMessage);
                            // console.log(logMessage);
                            imap.end();
                        });
                    });
                });
            });

            imap.once('error', (err) => {
                const logMessage = `IMAP error: ${err}`;
                this.logger.error(logMessage);
                //   console.error(logMessage);
            });

            imap.once('end', () => {
                const logMessage = 'IMAP Connection ended';
                this.logger.info(logMessage);
            });

            imap.connect();
            let testt = []

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
                                testt.push(struct[i])

                            }
                        }
                    }
                }
                // resolve(attachments)
                return attachments;
            };


            // console.log(filesArray)
            // this.readCell(savePath + filename,filename)
        })
        const getAttachments: any = await promiseA()
        return new CommonResponseModel(true, 2, '', getAttachments)

    }

    //   async getFiles 
    async readCell(filepath, filename): Promise<CommonResponseModel> {
        try {
            let filesArray = []
            // console.log(req,'filesdataaaa')
            const fs = require('fs');
            const files = fs.readdirSync('./upload-files/');
            // console.log(files,'filesssss')
            // const req = [{filePath:'./upload-files/pro_orders_1.xlsx',fileName:'pro_orders_1.xlsx'},{filePath:'./upload-files/projection_orders_1.xlsx',fileName:'projection_orders_1.xlsx'}]
            const uplodedFiles = await this.getUplodedFilesInfo()
            const difference = files.filter((element) => !uplodedFiles.data.includes(element))
            if (difference.length == 0) {
                // filesArray.push(new ordersMailFileStatusArrayReq(files,'Failed','Files with same name already exists!','-'))
                return new CommonResponseModel(false, 0, 'No new files identified in the mail')
            } else {
                for (const filerec of difference) {
                    const filename = filerec
                    const filepath = './upload-files/' + filerec

                    // // filename = 'pro_order_sep3.xlsx';
                    // console.log(filename.split('.').pop(),'extension')
                    // console.log(filename,'filename')
                    const promiseA = () => new Promise((resolve, reject) => {
                        xlsxFile(filepath, { getSheets: true }).then((sheets: any[]) => {
                            resolve(sheets)
                        });
                    })
                    const sheets: any = await promiseA()



                    const promise = () => new Promise((resolve, reject) => {
                        if (filename.split('.').pop() == 'csv') {
                            resolve(null)

                            // const dataArray = []
                            // fs.createReadStream(filepath)
                            //     .on('error', () => {
                            //         // handle error
                            //     })

                            //     .pipe(csv())
                            //     .on('data', (row) => {
                            //         dataArray.push(Object(row))
                            //     })

                            //     .on('end', () => {
                            //         resolve(dataArray)
                            //     })
                        } else if (filename.split('.').pop() == 'xlsx') {
                            // xlsxFile(filepath, { getSheets: true }).then((sheets)=>{
                            //     resolve(sheets)
                            // });
                            // const sheets = await promise()
                            // console.log('hhhhhoo',sheets)
                            let finalSheetName = ''
                            for (const sheetname of sheets) {
                                if (sheetname.name == 'Production Plan Rawdata Export' || sheetname.name == 'RawData' || sheetname.name == 'Rawdata') {
                                    finalSheetName = sheetname.name
                                    break
                                } else {
                                    continue
                                }
                            }
                            if (finalSheetName) {

                                xlsxFile(filepath, { sheet: finalSheetName }, {
                                    transformData(data) {
                                        // console.log(data)
                                        // data.slice(0,3)
                                        return data
                                    }
                                })

                                    .then((rows) => {
                                        let columnNames
                                        const dataArray = []
                                        while (rows.length) {
                                            columnNames = rows.shift(); // Separate first row with column names
                                            if (columnNames[0] != null) {
                                                break;
                                            }
                                        }
                                        // console.log(rows,'---------------')
                                        // rows.shift(); // Separate first row with column names
                                        // rows.shift(); // Separate first row with column names
                                        // rows.shift(); // Separate first row with column name
                                        // rows.shift(); // Separate first row with column name
                                        // rows.shift(); // Separate first row with column name
                                        // rows.shift(); // Separate first row with column name
                                        // const columnNames = rows.shift(); // Separate first row with column names
                                        rows.map((row) => { // Map the rest of the rows into objects
                                            const obj = {}; // Create object literal for current row
                                            row.forEach((cell, i) => {
                                                obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
                                            });
                                            //   console.log(obj)
                                            dataArray.push(Object(obj));
                                            resolve(dataArray)
                                            //   console.log(objs); // Display the array of objects on the console
                                            //   return obj;
                                        });
                                    });
                            } else {
                                const saveFilePath = this.updatePath(filepath, filename, null, FileTypesEnum.PROJECTION_ORDERS, 'Email', 'Sheet Name Does Not Match')
                                filesArray.push(new ordersMailFileStatusArrayReq(filename, 'Failed', `Sheet name doesn't match`, '-'))
                                resolve(null)
                            }
                        } else {

                        }
                    })
                    const dataArray = await promise();

                    if (dataArray) {

                        const saveFilePath = await this.updatePath(filepath, filename, null, FileTypesEnum.PROJECTION_ORDERS, 'Email')
                        // console.log(filepath,'jjjjj')
                        // console.log(filename,'jjjjj')
                        if (saveFilePath.status) {
                            // console.log(dataArray,'------------------------------------')
                            const saveProjOrders = await this.saveOrdersData(dataArray, saveFilePath.data.id, 9, 'Email')
                            // console.log(saveProjOrders,'saveProjOrders')
                            let req = new FileStatusReq();
                            req.fileId = saveFilePath.data.id;
                            req.userName = 'Bidhun'
                            if (saveProjOrders.status) {
                                req.status = 'Success';
                            } else {
                                req.failedReason = saveProjOrders.internalMessage
                                if (saveProjOrders?.data) {
                                    // console.log(saveProjOrders.data,'hhhhh')
                                    req.columns = saveProjOrders.data
                                    // const resData = saveProjOrders.data
                                } else {
                                    req.columns = ''
                                }
                                req.status = 'Failed';
                            }
                            // console.log(req,'valuuuuu')
                            const updateFileStatus = await this.updateFileStatus(req)
                            filesArray.push(new ordersMailFileStatusArrayReq(filename, req.status, req.status === 'Failed' ? req.failedReason : '', req.status === 'Failed' ? req.columns : ''))
                        } else {
                            // return false
                            filesArray.push(new ordersMailFileStatusArrayReq(filename, 'Failed', saveFilePath.internalMessage, '-'))
                        }
                        // return dataArray
                    } else {
                        // return dataArray
                    }
                }

                const sendMail = this.sendMail('karthikeyan.nallamuthu@shahi.co.in', 'Projection Order Uploded Files Status', filesArray)
                if (sendMail) {
                    return new CommonResponseModel(true, 1, '', filesArray)
                } else {
                    return new CommonResponseModel(true, 1, 'Something went wrong in sending mail', filesArray)
                }
            }

        } catch (err) {
            throw err
        }


    }


    async getMonthlyComparisionData(req: YearReq): Promise<CommonResponseModel> {
        // console.log(req,'-------')
        const data = await this.ordersChildRepo.getMonthlyComparisionData(req);

        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }

        const DateMap = new Map<string, ItemDataDto>();
        for (const rec of data) {

            if (req.tabName === 'ExFactory') {
                if (!DateMap.has(rec.planning_sum)) {
                    DateMap.set(
                        rec.planning_sum,
                        new ItemDataDto(rec.planning_sum, [])
                    );
                }
                const monthData = DateMap.get(rec.planning_sum).monthWiseData;
                const pcs: PcsDataDto[] = [];
                const coeff: CoeffDataDto[] = [];
                pcs.push(
                    {
                        name: 'In Previous',
                        janPcs: rec.janExfPre,
                        febPcs: rec.febExfPre,
                        marPcs: rec.marExfPre,
                        aprPcs: rec.aprExfPre,
                        mayPcs: rec.mayExfPre,
                        junPcs: rec.junExfPre,
                        julPcs: rec.julExfPre,
                        augPcs: rec.augExfPre,
                        sepPcs: rec.sepExfPre,
                        octPcs: rec.octExfPre,
                        novPcs: rec.novExfPre,
                        decPcs: rec.decExfPre,
                    }
                )
                coeff.push({
                    name: 'In Latest',
                    janCoeff: rec.janExfLat,
                    febCoeff: rec.febExfLat,
                    marCoeff: rec.marExfLat,
                    aprCoeff: rec.aprExfLat,
                    mayCoeff: rec.mayExfLat,
                    junCoeff: rec.junExfLat,
                    julCoeff: rec.julExfLat,
                    augCoeff: rec.augExfLat,
                    sepCoeff: rec.sepExfLat,
                    octCoeff: rec.octExfLat,
                    novCoeff: rec.novExfLat,
                    decCoeff: rec.decExfLat,
                })

                const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff, rec.totalExfPre, rec.totalExfLat, rec.order_plan_number);
                monthData.push(monthWiseInstance);
            }
            if (req.tabName === 'WareHouse') {
                if (!DateMap.has(rec.planning_sum)) {
                    DateMap.set(
                        rec.planning_sum,
                        new ItemDataDto(rec.planning_sum, [])
                    );
                }
                const monthData = DateMap.get(rec.planning_sum).monthWiseData;
                const pcs: PcsDataDto[] = [];
                const coeff: CoeffDataDto[] = [];
                pcs.push(
                    {
                        name: 'In Previous',
                        janPcs: rec.janWhPre,
                        febPcs: rec.febWhPre,
                        marPcs: rec.marWhPre,
                        aprPcs: rec.aprWhPre,
                        mayPcs: rec.mayWhPre,
                        junPcs: rec.junWhPre,
                        julPcs: rec.julWhPre,
                        augPcs: rec.augWhPre,
                        sepPcs: rec.sepWhPre,
                        octPcs: rec.octWhPre,
                        novPcs: rec.novWhPre,
                        decPcs: rec.decWhPre,
                    }
                )
                coeff.push({
                    name: 'In Latest',
                    janCoeff: rec.janWhLat,
                    febCoeff: rec.febWhLat,
                    marCoeff: rec.marWhLat,
                    aprCoeff: rec.aprWhLat,
                    mayCoeff: rec.mayWhLat,
                    junCoeff: rec.junWhLat,
                    julCoeff: rec.julWhLat,
                    augCoeff: rec.augWhLat,
                    sepCoeff: rec.sepWhLat,
                    octCoeff: rec.octWhLat,
                    novCoeff: rec.novWhLat,
                    decCoeff: rec.decWhLat,
                })
                const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff, rec.totalWhPre, rec.totalWhLat, rec.order_plan_number);
                monthData.push(monthWiseInstance);
            }
        }

        const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }

    // async getWareHouseComparisionData(req:YearReq): Promise<CommonResponseModel> {
    //     const data = await this.ordersChildRepo.getWareHouseComparisionData(req);

    //     if (data.length === 0) {
    //         console.log(data.length,"00000000")
    //         return new CommonResponseModel(false, 0, 'data not found');
    //     }

    //     const DateMap = new Map<string, ItemDataDto>();

    //     for (const rec of data) {
    //         const orderQty = rec.order_plan_qty.replace(/,/g, '')

    //         if (!DateMap.has(rec.item_cd)) {
    //             DateMap.set(
    //                 rec.item_cd,
    //                 new ItemDataDto(rec.item, [])
    //             );
    //         }
    //         const monthData = DateMap.get(rec.item_cd).monthWiseData;
    //         const phase = monthData.find(e => e.phasetype === rec.prod_plan_type)
    //             const pcs: PcsDataDto[] = [];
    //             const coeff: CoeffDataDto[] = [];


    // pcs.push(
    //     { name: 'In Pcs',
    //     janPcs: rec.whMonth === 1 ? Number(orderQty) :Number(0),
    //     febPcs: rec.whMonth === 2 ? Number(orderQty) :Number(0),
    //     marPcs: rec.whMonth === 3 ? Number(orderQty) :Number(0),
    //     aprPcs: rec.whMonth === 4 ? Number(orderQty) :Number(0),
    //     mayPcs: rec.whMonth === 5 ? Number(orderQty) :Number(0),
    //     junPcs: rec.whMonth === 6 ? Number(orderQty) :Number(0),
    //     julPcs: rec.whMonth === 7 ? Number(orderQty) :Number(0),
    //     augPcs: rec.whMonth === 8 ? Number(orderQty) :Number(0),
    //     sepPcs: rec.whMonth === 9 ? Number(orderQty) :Number(0),
    //     octPcs: rec.whMonth === 10 ? Number(orderQty) :Number(0),
    //     novPcs: rec.whMonth === 11 ? Number(orderQty) :Number(0),
    //     decPcs: rec.whMonth === 12 ? Number(orderQty) :Number(0),}
    //         )
    //     if (rec.status === "latest") {
    //         coeff.push({
    //             name: 'In Coeff',
    //             janCoeff: rec.whMonth === 1 ? Number(orderQty) :Number(0),
    //             febCoeff: rec.whMonth === 2 ? Number(orderQty) :Number(0),
    //             marCoeff: rec.whMonth === 3 ? Number(orderQty) :Number(0),
    //             aprCoeff: rec.whMonth === 4 ? Number(orderQty) :Number(0),
    //             mayCoeff: rec.whMonth === 5 ? Number(orderQty) :Number(0),
    //             junCoeff: rec.whMonth === 6 ? Number(orderQty) :Number(0),
    //             julCoeff: rec.whMonth === 7 ? Number(orderQty) :Number(0),
    //             augCoeff: rec.whMonth === 8 ? Number(orderQty) :Number(0),
    //             sepCoeff: rec.whMonth === 9 ? Number(orderQty) :Number(0),
    //             octCoeff: rec.whMonth === 10 ? Number(orderQty) :Number(0),
    //             novCoeff: rec.whMonth === 11 ? Number(orderQty) :Number(0),
    //             decCoeff: rec.whMonth === 12 ? Number(orderQty) :Number(0),
    //           })
    //         const totalPcs = pcs.reduce((total, item) => {
    //             return  + [item.janPcs, item.febPcs, item.marPcs, item.aprPcs, item.mayPcs, item.junPcs, item.julPcs, item.augPcs, item.sepPcs, item.octPcs, item.novPcs, item.decPcs]
    //                 .filter(value => value !== 0) 
    //                 .reduce((sum, value) => + value, 0);
    //         }, 0);

    //         const totalCoeff = coeff.reduce((total, item) => {
    //             return + [item.janCoeff, item.febCoeff, item.marCoeff, item.aprCoeff, item.mayCoeff, item.junCoeff, item.julCoeff, item.augCoeff, item.sepCoeff, item.octCoeff, item.novCoeff, item.decCoeff]
    //                 .filter(value => value !== 0) 
    //                 .reduce((sum, value) =>  + value, 0);
    //         }, 0);

    //             const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs,coeff,totalPcs,totalCoeff);
    //             monthData.push(monthWiseInstance); 

    //     }

    // }
    //     const dataModelArray: ItemDataDto[] = Array.from(DateMap.values());   

    //     return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    // }
    async getOrdersStatus(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.getOrdersStatus()
        if (details)
            return new CommonResponseModel(true, 1, 'data retrived', details)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getOrderPlanNo(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.getOrderPlanNO()
        if (details)
            return new CommonResponseModel(true, 1, 'data retrived', details)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getOrderNumberDropDownInCompare(): Promise<CommonResponseModel> {
        try {
            const data = await this.ordersChildRepo.getOrderNumbers()
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retrieved', data)
            } else {
                return new CommonResponseModel(false, 1, 'No data found')
            }

        } catch (err) {
            throw err
        }
    }
    async getMonthlyComparisionDate(req: YearReq): Promise<CommonResponseModel> {
        try {
            const data = await this.ordersChildRepo.getMonthlyComparisionDate(req)
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retrieved', data)
            } else {
                return new CommonResponseModel(false, 1, 'No data found')
            }

        } catch (err) {
            throw err
        }
    }

    // async createCOLineInternal(req: COLineRequest): Promise<CommonResponseModel> {
    //     try {
    //         const entity = new CoLine()
    //         entity.itemNumber = req.itemNumber;
    //         entity.orderNumber = req.orderNumber;
    //         entity.colorCode = req.colorCode;
    //         entity.color = req.color;
    //         entity.sizeCode = req.sizeCode;
    //         entity.size = req.size;
    //         entity.itemCode = req.itemCode;
    //         entity.item = req.item;
    //         entity.destination = req.destination;
    //         entity.company_CONO = req.company_CONO;
    //         entity.temporaryOrderNumber_ORNO = req.temporaryOrderNumber_ORNO;
    //         entity.itemNumber_ITNO = req.itemNumber_ITNO;
    //         entity.orderedQuantity_ORQT = req.orderedQuantity_ORQT;
    //         entity.warehouse_WHLO = req.warehouse_WHLO;
    //         entity.requestedDeliveryDate_DWDT = req.requestedDeliveryDate_DWDT;
    //         entity.jointDeliveryDate_JDCD = req.jointDeliveryDate_JDCD;
    //         entity.customersOrderNumber_CUPO = req.customersOrderNumber_CUPO;
    //         entity.salesPrice_SAPR = req.salesPrice_SAPR;
    //         entity.discountAmount1_DIA1 = req.discountAmount1_DIA1;
    //         entity.discountAmount2_DIA2 = req.discountAmount2_DIA2;
    //         entity.discountAmount3_DIA3 = req.discountAmount3_DIA3;
    //         entity.discountAmount4_DIA4 = req.discountAmount4_DIA4;
    //         entity.discountAmount5_DIA5 = req.discountAmount5_DIA5;
    //         entity.discountAmount6_DIA6 = req.discountAmount6_DIA6;
    //         entity.deliverySpecification_DLSP = req.deliverySpecification_DLSP;
    //         entity.deliverySpecificationText_DLSX = req.deliverySpecificationText_DLSX;
    //         entity.oldCFIN_CFXX = req.oldCFIN_CFXX;
    //         entity.simulationsNumber_ECVS = req.simulationsNumber_ECVS;
    //         entity.alternateUM_ALUN = req.alternateUM_ALUN;
    //         entity.confirmedDateOfDelivery_CODT = req.confirmedDateOfDelivery_CODT;
    //         entity.itemDescription_ITDS = req.itemDescription_ITDS;
    //         entity.discountPercent1_DIP1 = req.discountPercent1_DIP1;
    //         entity.discountPercent2_DIP2 = req.discountPercent2_DIP2;
    //         entity.discountPercent3_DIP3 = req.discountPercent3_DIP3;
    //         entity.discountPercent4_DIP4 = req.discountPercent4_DIP4;
    //         entity.discountPercent5_DIP5 = req.discountPercent5_DIP5;
    //         entity.discountPercent6_DIP6 = req.discountPercent6_DIP6;
    //         entity.aliasQualifier_ALWT = req.aliasQualifier_ALWT;
    //         entity.blanketAgreementNumber_AGNO = req.blanketAgreementNumber_AGNO;
    //         entity.container_CAMU = req.container_CAMU;
    //         entity.projectNumber_PROJ = req.projectNumber_PROJ;
    //         entity.projectElement_ELON = req.projectElement_ELON;
    //         entity.customerOrderNumber_CUOR = req.customerOrderNumber_CUOR;
    //         entity.customersPackagingIdentity_CUPA = req.customersPackagingIdentity_CUPA;
    //         entity.requestedDeliveryTime_DWHM = req.requestedDeliveryTime_DWHM;
    //         entity.standardQuantity_D1QT = req.standardQuantity_D1QT;
    //         entity.packaging_PACT = req.packaging_PACT;
    //         entity.aliasNumber_POPN = req.aliasNumber_POPN;
    //         entity.salesPriceQuantity_SACD = req.salesPriceQuantity_SACD;
    //         entity.saledPriceUOM_SPUN = req.saledPriceUOM_SPUN;
    //         entity.packagingTerms_TEPA = req.packagingTerms_TEPA;
    //         entity.EDIFACTPrice_EDFP = req.EDIFACTPrice_EDFP;
    //         entity.requestedDeliveryDate_DWDZ = req.requestedDeliveryDate_DWDZ;
    //         entity.requestedDeliveryTime_DWHZ = req.requestedDeliveryTime_DWHZ;
    //         entity.confirmedDeliveryTime_COHM = req.confirmedDeliveryTime_COHM;
    //         entity.confirmedDeliveryDate_CODZ = req.confirmedDeliveryDate_CODZ;
    //         entity.confirmedDeliveryTime_COHZ = req.confirmedDeliveryTime_COHZ;
    //         entity.mainProduct_HDPR = req.mainProduct_HDPR;
    //         entity.addressNumber_ADID = req.addressNumber_ADID;
    //         entity.lineSuffix_CUSX = req.lineSuffix_CUSX;
    //         entity.statusDiscount_DICI = req.statusDiscount_DICI;
    //         entity.trimOrderId = req.trimOrderId;
    //         const save = await this.colineRepo.save(entity)
    //         if (save) {
    //             return new CommonResponseModel(true, 1, 'Created Successfully', save)
    //         } else {
    //             return new CommonResponseModel(false, 0, 'Something went wrong')
    //         }

    //     } catch (err) {
    //         throw err
    //     }
    // }

    // async updateStatusAfterCoLineCreationInM3(req: CoLineStatusReq): Promise<CommonResponseModel> {
    //     try {
    //         const statusUpdate = await this.colineRepo.update({ coLineId: req.coLineId }, { status: req.status })
    //         if (statusUpdate.affected) {
    //             return new CommonResponseModel(true, 1, 'Status Updated')
    //         } else {
    //             return new CommonResponseModel(false, 0, 'Something went erong in status update')
    //         }
    //     } catch (err) {
    //         throw (err)
    //     }
    // }

    async getPhaseMonthData(req): Promise<CommonResponseModel> {
        try {
            const data = await this.ordersRepository.getdata(req);
            const DateMap = new Map<string, MonthWiseDto>();

            for (const rec of data) {
                let monthWiseInstance;

                if (DateMap.has(rec.prod_plan_type)) {
                    monthWiseInstance = DateMap.get(rec.prod_plan_type);
                } else {
                    monthWiseInstance = new MonthWiseDto(
                        rec.prod_plan_type,
                        [],
                        [],
                        0,
                        0
                    );
                    DateMap.set(rec.prod_plan_type, monthWiseInstance);
                }
                if (req.tabName === 'ExFactory') {

                    monthWiseInstance.pcsData.push({
                        name: 'In Pcs',
                        janPcs: rec.janPcsExf,
                        febPcs: rec.febPcsExf,
                        marPcs: rec.marPcsExf,
                        aprPcs: rec.aprPcsExf,
                        mayPcs: rec.mayPcsExf,
                        junPcs: rec.junPcsExf,
                        julPcs: rec.julPcsExf,
                        augPcs: rec.augPcsExf,
                        sepPcs: rec.sepPcsExf,
                        octPcs: rec.octPcsExf,
                        novPcs: rec.novPcsExf,
                        decPcs: rec.decPcsExf,
                    });

                    monthWiseInstance.coeffData.push({
                        name: 'In Coeff',
                        janCoeff: rec.janExfCoeff,
                        febCoeff: rec.febExfCoeff,
                        marCoeff: rec.marExfCoeff,
                        aprCoeff: rec.aprExfCoeff,
                        mayCoeff: rec.mayExfCoeff,
                        junCoeff: rec.julExfCoeff,
                        julCoeff: rec.julExfCoeff,
                        augCoeff: rec.augExfCoeff,
                        sepCoeff: rec.sepExfCoeff,
                        octCoeff: rec.octExfCoeff,
                        novCoeff: rec.novExfCoeff,
                        decCoeff: rec.decExfCoeff,
                    });
                    monthWiseInstance.totalPcs = rec.totalExfPre;
                    monthWiseInstance.totalCoeff = rec.totalExfLat;
                }
                if (req.tabName === 'WareHouse') {

                    monthWiseInstance.pcsData.push({
                        name: 'In Pcs',
                        janPcs: rec.janPcsWh,
                        febPcs: rec.febPcsWh,
                        marPcs: rec.marPcsWh,
                        aprPcs: rec.aprPcsWh,
                        mayPcs: rec.mayPcsWh,
                        junPcs: rec.junPcsWh,
                        julPcs: rec.julPcsWh,
                        augPcs: rec.augPcsWh,
                        sepPcs: rec.sepPcsWh,
                        octPcs: rec.octPcsWh,
                        novPcs: rec.novPcsWh,
                        decPcs: rec.decPcsWh,
                    });

                    monthWiseInstance.coeffData.push({
                        name: 'In Coeff',
                        janCoeff: rec.janWhCoeff,
                        febCoeff: rec.febWhCoeff,
                        marCoeff: rec.marWhCoeff,
                        aprCoeff: rec.aprWhCoeff,
                        mayCoeff: rec.mayWhCoeff,
                        junCoeff: rec.junWhCoeff,
                        julCoeff: rec.julWhCoeff,
                        augCoeff: rec.augWhCoeff,
                        sepCoeff: rec.sepWhCoeff,
                        octCoeff: rec.octWhCoeff,
                        novCoeff: rec.novWhCoeff,
                        decCoeff: rec.decWhCoeff,
                    });

                    monthWiseInstance.totalPcs = rec.totalWhPre;
                    monthWiseInstance.totalCoeff = rec.totalWhLat;
                }
            }
            const dataModelArray: MonthWiseDto[] = Array.from(DateMap.values());
            return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
        } catch (error) {
            // Handle errors appropriately
            // console.error(error);
            return new CommonResponseModel(false, 0, 'error occurred', null);
        }
    }

    async getComparisionphaseData(req: YearReq): Promise<CommonResponseModel> {
        const data = await this.ordersChildRepo.getComparisionphaseData(req);
        const DateMap = new Map<string, MonthWiseDto>();
        for (const rec of data) {
            if (!DateMap.has(rec.prod_plan_type)) {
                DateMap.set(
                    rec.prod_plan_type,
                    new MonthWiseDto(rec.prod_plan_type, [], [], 0, 0)
                );
            }
            const monthWiseInstance = DateMap.get(rec.prod_plan_type);

            if (req.tabName === 'ExFactory') {

                monthWiseInstance.pcsData.push({
                    name: 'In Previous',
                    janPcs: rec.janExfPre,
                    febPcs: rec.febExfPre,
                    marPcs: rec.marExfPre,
                    aprPcs: rec.aprExfPre,
                    mayPcs: rec.mayExfPre,
                    junPcs: rec.junExfPre,
                    julPcs: rec.julExfPre,
                    augPcs: rec.augExfPre,
                    sepPcs: rec.sepExfPre,
                    octPcs: rec.octExfPre,
                    novPcs: rec.novExfPre,
                    decPcs: rec.decExfPre,
                });

                monthWiseInstance.coeffData.push({
                    name: 'In Latest',
                    janCoeff: rec.janExfLat,
                    febCoeff: rec.febExfLat,
                    marCoeff: rec.marExfLat,
                    aprCoeff: rec.aprExfLat,
                    mayCoeff: rec.mayExfLat,
                    junCoeff: rec.julExfLat,
                    julCoeff: rec.julExfLat,
                    augCoeff: rec.augExfLat,
                    sepCoeff: rec.sepExfLat,
                    octCoeff: rec.octExfLat,
                    novCoeff: rec.novExfLat,
                    decCoeff: rec.decExfLat,
                });
                monthWiseInstance.totalPcs = rec.totalExfPre;
                monthWiseInstance.totalCoeff = rec.totalExfLat;
            }
            if (req.tabName === 'WareHouse') {

                monthWiseInstance.pcsData.push({
                    name: 'In Previous',
                    janPcs: rec.janWhPre,
                    febPcs: rec.febWhPre,
                    marPcs: rec.marWhPre,
                    aprPcs: rec.aprWhPre,
                    mayPcs: rec.mayWhPre,
                    junPcs: rec.junWhPre,
                    julPcs: rec.julWhPre,
                    augPcs: rec.augWhPre,
                    sepPcs: rec.sepWhPre,
                    octPcs: rec.octWhPre,
                    novPcs: rec.novWhPre,
                    decPcs: rec.decWhPre,
                });

                monthWiseInstance.coeffData.push({
                    name: 'In Latest',
                    janCoeff: rec.janWhLat,
                    febCoeff: rec.febWhLat,
                    marCoeff: rec.marWhLat,
                    aprCoeff: rec.aprWhLat,
                    mayCoeff: rec.mayWhLat,
                    junCoeff: rec.junWhLat,
                    julCoeff: rec.julWhLat,
                    augCoeff: rec.augWhLat,
                    sepCoeff: rec.sepWhLat,
                    octCoeff: rec.octWhLat,
                    novCoeff: rec.novWhLat,
                    decCoeff: rec.decWhLat,
                });

                monthWiseInstance.totalPcs = rec.totalWhPre;
                monthWiseInstance.totalCoeff = rec.totalWhLat;
            }
        }
        const dataModelArray: MonthWiseDto[] = Array.from(DateMap.values());
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }
    async getPhaseMonthExcelData(req: YearReq): Promise<CommonResponseModel> {
        try {
            let perData: any[] = [];
            const records = await this.ordersRepository.getdata(req);
            const data1 = await this.ordersRepository.getdata1(req);

            let totaljanExfPre = 0;
            let totalfebExfPre = 0;
            let totalmarExfPre = 0;
            let totalaprExfPre = 0;
            let totalmayExfPre = 0;
            let totaljunExfPre = 0;
            let totaljulExfPre = 0;
            let totalaugExfPre = 0;
            let totalsepExfPre = 0;
            let totaloctExfPre = 0;
            let totalnovExfPre = 0;
            let totaldecExfPre = 0;
            let sumExfPre = 0;
            let totaljanExfLat = 0;
            let totalfebExfLat = 0;
            let totalmarExfLat = 0;
            let totalaprExfLat = 0;
            let totalmayExfLat = 0;
            let totaljunExfLat = 0;
            let totaljulExfLat = 0;
            let totalaugExfLat = 0;
            let totalsepExfLat = 0;
            let totaloctExfLat = 0;
            let totalnovExfLat = 0;
            let totaldecExfLat = 0;
            let sumExfLat = 0;
            let totaljanWhPre = 0;
            let totalfebWhPre = 0;
            let totalmarWhPre = 0;
            let totalaprWhPre = 0;
            let totalmayWhPre = 0;
            let totaljunWhPre = 0;
            let totaljulWhPre = 0;
            let totalaugWhPre = 0;
            let totalsepWhPre = 0;
            let totaloctWhPre = 0;
            let totalnovWhPre = 0;
            let totaldecWhPre = 0;
            let sumWhPre = 0;
            let totaljanWhLat = 0;
            let totalfebWhLat = 0;
            let totalmarWhLat = 0;
            let totalaprWhLat = 0;
            let totalmayWhLat = 0;
            let totaljunWhLat = 0;
            let totaljulWhLat = 0;
            let totalaugWhLat = 0;
            let totalsepWhLat = 0;
            let totaloctWhLat = 0;
            let totalnovWhLat = 0;
            let totaldecWhLat = 0;
            let sumWhLat = 0;
            for (const record of records) {

                totaljanExfPre += record.janExfPcs;
                totalfebExfPre += record.febExfPcs;
                totalmarExfPre += record.marExfPcs;
                totalaprExfPre += record.aprExfPcs;
                totalmayExfPre += record.mayExfPcs;
                totaljunExfPre += record.junExfPcs;
                totaljulExfPre += record.julExfPcs;
                totalaugExfPre += record.augExfPcs;
                totalsepExfPre += record.sepExfPcs;
                totaloctExfPre += record.octExfPcs;
                totalnovExfPre += record.novExfPcs;
                totaldecExfPre += record.decExfPcs;
                sumExfPre += record.totalExfPcs;
                totaljanExfLat += record.janExfCoeff;
                totalfebExfLat += record.febExfCoeff;
                totalmarExfLat += record.marExfCoeff;
                totalaprExfLat += record.aprExfCoeff;
                totalmayExfLat += record.mayExfCoeff;
                totaljunExfLat += record.junExfCoeff;
                totaljulExfLat += record.julExfCoeff;
                totalaugExfLat += record.augExfCoeff;
                totalsepExfLat += record.sepExfCoeff;
                totaloctExfLat += record.octExfCoeff;
                totalnovExfLat += record.novExfCoeff;
                totaldecExfLat += record.decExfCoeff;
                sumExfLat += record.totalExfCoeff;
                totaljanWhPre += record.janWhPcs;
                totalfebWhPre += record.febWhPcs;
                totalmarWhPre += record.marWhPcs;
                totalaprWhPre += record.aprWhPcs;
                totalmayWhPre += record.mayWhPcs;
                totaljunWhPre += record.junWhPcs;
                totaljulWhPre += record.julWhPcs;
                totalaugWhPre += record.augWhPcs;
                totalsepWhPre += record.sepWhPcs;
                totaloctWhPre += record.octWhPcs;
                totalnovWhPre += record.novWhPcs;
                totaldecWhPre += record.decWhPcs;
                sumWhPre += record.totalWhPcs;
                totaljanWhLat += record.janWhCoeff;
                totalfebWhLat += record.febWhCoeff;
                totalmarWhLat += record.marWhCoeff;
                totalaprWhLat += record.aprWhCoeff;
                totalmayWhLat += record.mayWhCoeff;
                totaljunWhLat += record.junWhCoeff;
                totaljulWhLat += record.julWhCoeff;
                totalaugWhLat += record.augWhCoeff;
                totalsepWhLat += record.sepWhCoeff;
                totaloctWhLat += record.octWhCoeff;
                totalnovWhLat += record.novWhCoeff;
                totaldecWhLat += record.decWhCoeff;
                sumWhLat += record.totalWhCoeff;
            }
            for (const record of records) {
                const YEAR = record.YEAR;
                const file_id = record.file_id;
                const prod_plan_type = record.prod_plan_type;
                const janExfPcs = Number((record.janExfPcs / totaljanExfPre) * 100).toFixed(0) + '%';
                const febExfPcs = Number((record.febExfPcs / totalfebExfPre) * 100).toFixed(0) + '%'
                const marExfPcs = Number((record.marExfPcs / totalmarExfPre) * 100).toFixed(0) + '%'
                const aprExfPcs = Number((record.aprExfPcs / totalaprExfPre) * 100).toFixed(0) + '%'
                const mayExfPcs = Number((record.mayExfPcs / totalmayExfPre) * 100).toFixed(0) + '%'
                const junExfPcs = Number((record.junExfPcs / totaljunExfPre) * 100).toFixed(0) + '%'
                const julExfPcs = Number((record.julExfPcs / totaljulExfPre) * 100).toFixed(0) + '%'
                const augExfPcs = Number((record.augExfPcs / totalaugExfPre) * 100).toFixed(0) + '%'
                const sepExfPcs = Number((record.sepExfPcs / totalsepExfPre) * 100).toFixed(0) + '%'
                const octExfPcs = Number((record.octExfPcs / totaloctExfPre) * 100).toFixed(0) + '%'
                const novExfPcs = Number((record.novExfPcs / totalnovExfPre) * 100).toFixed(0) + '%'
                const decExfPcs = Number((record.decExfPcs / totaldecExfPre) * 100).toFixed(0) + '%'
                const totalExfPcs = Number((record.totalExfPcs / sumExfPre) * 100).toFixed(0) + '%'
                const janExfCoeff = Number((record.janExfCoeff / totaljanExfLat) * 100).toFixed(0) + '%';
                const febExfCoeff = Number((record.febExfCoeff / totalfebExfLat) * 100).toFixed(0) + '%';
                const marExfCoeff = Number((record.marExfCoeff / totalmarExfLat) * 100).toFixed(0) + '%';
                const aprExfCoeff = Number((record.aprExfCoeff / totalaprExfLat) * 100).toFixed(0) + '%';
                const mayExfCoeff = Number((record.mayExfCoeff / totalmayExfLat) * 100).toFixed(0) + '%';
                const junExfCoeff = Number((record.junExfCoeff / totaljunExfLat) * 100).toFixed(0) + '%';
                const julExfCoeff = Number((record.julExfCoeff / totaljulExfLat) * 100).toFixed(0) + '%';
                const augExfCoeff = Number((record.augExfCoeff / totalaugExfLat) * 100).toFixed(0) + '%';
                const sepExfCoeff = Number((record.sepExfCoeff / totalsepExfLat) * 100).toFixed(0) + '%';
                const octExfCoeff = Number((record.octExfCoeff / totaloctExfLat) * 100).toFixed(0) + '%';
                const novExfCoeff = Number((record.novExfCoeff / totalnovExfLat) * 100).toFixed(0) + '%';
                const decExfCoeff = Number((record.decExfCoeff / totaldecExfLat) * 100).toFixed(0) + '%';
                const totalExfCoeff = Number((record.totalExfCoeff / sumExfLat) * 100).toFixed(0) + '%';
                const janWhPcs = Number((record.janWhPcs / totaljanWhPre) * 100).toFixed(0) + '%';
                const febWhPcs = Number((record.febWhPcs / totalfebWhPre) * 100).toFixed(0) + '%';
                const marWhPcs = Number((record.marWhPcs / totalmarWhPre) * 100).toFixed(0) + '%';
                const aprWhPcs = Number((record.aprWhPcs / totalaprWhPre) * 100).toFixed(0) + '%';
                const mayWhPcs = Number((record.mayWhPcs / totalmayWhPre) * 100).toFixed(0) + '%';
                const junWhPcs = Number((record.junWhPcs / totaljunWhPre) * 100).toFixed(0) + '%';
                const julWhPcs = Number((record.julWhPcs / totaljulWhPre) * 100).toFixed(0) + '%';
                const augWhPcs = Number((record.augWhPcs / totalaugWhPre) * 100).toFixed(0) + '%';
                const sepWhPcs = Number((record.sepWhPcs / totalsepWhPre) * 100).toFixed(0) + '%';
                const octWhPcs = Number((record.octWhPcs / totaloctWhPre) * 100).toFixed(0) + '%';
                const novWhPcs = Number((record.novWhPcs / totalnovWhPre) * 100).toFixed(0) + '%';
                const decWhPcs = Number((record.decWhPcs / totaldecWhPre) * 100).toFixed(0) + '%';
                const totalWhPcs = Number((record.totalWhPcs / sumWhPre) * 100).toFixed(0) + '%'
                const janWhCoeff = Number((record.janWhCoeff / totaljanWhLat) * 100).toFixed(0) + '%';
                const febWhCoeff = Number((record.febWhCoeff / totalfebWhLat) * 100).toFixed(0) + '%';
                const marWhCoeff = Number((record.marWhCoeff / totalmarWhLat) * 100).toFixed(0) + '%';
                const aprWhCoeff = Number((record.aprWhCoeff / totalaprWhLat) * 100).toFixed(0) + '%';
                const mayWhCoeff = Number((record.mayWhCoeff / totalmayWhLat) * 100).toFixed(0) + '%';
                const junWhCoeff = Number((record.junWhCoeff / totaljunWhLat) * 100).toFixed(0) + '%';
                const julWhCoeff = Number((record.julWhCoeff / totaljulWhLat) * 100).toFixed(0) + '%';
                const augWhCoeff = Number((record.augWhCoeff / totalaugWhLat) * 100).toFixed(0) + '%';
                const sepWhCoeff = Number((record.sepWhCoeff / totalsepWhLat) * 100).toFixed(0) + '%';
                const octWhCoeff = Number((record.octWhCoeff / totaloctWhLat) * 100).toFixed(0) + '%';
                const novWhCoeff = Number((record.novWhCoeff / totalnovWhLat) * 100).toFixed(0) + '%';
                const decWhCoeff = Number((record.decWhCoeff / totaldecWhLat) * 100).toFixed(0) + '%';
                const totalWhCoeff = Number((record.totalWhCoeff / sumWhLat) * 100).toFixed(0) + '%'
                perData.push({
                    YEAR, file_id, prod_plan_type, janExfPcs, febExfPcs, marExfPcs, aprExfPcs, mayExfPcs, junExfPcs, julExfPcs, augExfPcs, sepExfPcs, octExfPcs, novExfPcs, decExfPcs, totalExfPcs,
                    janExfCoeff, febExfCoeff, marExfCoeff, aprExfCoeff, mayExfCoeff, junExfCoeff, julExfCoeff, augExfCoeff, sepExfCoeff, octExfCoeff, novExfCoeff, decExfCoeff, totalExfCoeff, janWhPcs, febWhPcs, marWhPcs, aprWhPcs, mayWhPcs,
                    junWhPcs, julWhPcs, augWhPcs, sepWhPcs, octWhPcs, novWhPcs, decWhPcs, totalWhPcs, janWhCoeff, febWhCoeff, marWhCoeff, aprWhCoeff, mayWhCoeff, junWhCoeff, julWhCoeff, augWhCoeff, sepWhCoeff, octWhCoeff, novWhCoeff,
                    decWhCoeff, totalWhCoeff
                })
            }
            if (records && data1) {
                const mergedData = [...records, ...perData]
                // console.log(mergedData,'ppppppppppppppp');

                return new CommonResponseModel(true, 1, 'Data retrieved', mergedData);
            } else {
                return new CommonResponseModel(false, 1, 'No data found');
            }
        } catch (err) {
            // console.error('Error in getComparisionphaseExcelData:', err);
            throw err;
        }
        // try {
        //     const data = await this.ordersRepository.getdata(req);
        //     const data1 = await this.ordersRepository.getdata1(req);

        //     if (data && data1) {

        //         const mergedData = [...data, ...data1];
        //         // Log the merged data for debugging
        //         // console.log('Merged Data:', mergedData);

        //         return new CommonResponseModel(true, 1, 'Data retrieved', mergedData);
        //     } else {
        //         return new CommonResponseModel(false, 1, 'No data found');
        //     }
        // } catch (err) {
        //     throw err
        // }
    }

  

    async getComparisionphaseExcelData(req: YearReq): Promise<CommonResponseModel> {
        try {
            let perData: any[] = [];
            const records = await this.ordersChildRepo.getComparisionphaseData1(req);
            const data1 = await this.ordersChildRepo.getComparisionphaseData(req);
            let totaljanExfPre = 0;
            let totalfebExfPre = 0;
            let totalmarExfPre = 0;
            let totalaprExfPre = 0;
            let totalmayExfPre = 0;
            let totaljunExfPre = 0;
            let totaljulExfPre = 0;
            let totalaugExfPre = 0;
            let totalsepExfPre = 0;
            let totaloctExfPre = 0;
            let totalnovExfPre = 0;
            let totaldecExfPre = 0;
            let sumExfPre = 0;
            let totaljanExfLat = 0;
            let totalfebExfLat = 0;
            let totalmarExfLat = 0;
            let totalaprExfLat = 0;
            let totalmayExfLat = 0;
            let totaljunExfLat = 0;
            let totaljulExfLat = 0;
            let totalaugExfLat = 0;
            let totalsepExfLat = 0;
            let totaloctExfLat = 0;
            let totalnovExfLat = 0;
            let totaldecExfLat = 0;
            let sumExfLat = 0;
            let totaljanWhPre = 0;
            let totalfebWhPre = 0;
            let totalmarWhPre = 0;
            let totalaprWhPre = 0;
            let totalmayWhPre = 0;
            let totaljunWhPre = 0;
            let totaljulWhPre = 0;
            let totalaugWhPre = 0;
            let totalsepWhPre = 0;
            let totaloctWhPre = 0;
            let totalnovWhPre = 0;
            let totaldecWhPre = 0;
            let sumWhPre = 0;
            let totaljanWhLat = 0;
            let totalfebWhLat = 0;
            let totalmarWhLat = 0;
            let totalaprWhLat = 0;
            let totalmayWhLat = 0;
            let totaljunWhLat = 0;
            let totaljulWhLat = 0;
            let totalaugWhLat = 0;
            let totalsepWhLat = 0;
            let totaloctWhLat = 0;
            let totalnovWhLat = 0;
            let totaldecWhLat = 0;
            let sumWhLat = 0;
            for (const record of records) {
                totaljanExfPre += record.janExfPre;
                totalfebExfPre += record.febExfPre
                totalmarExfPre += record.marExfPre
                totalaprExfPre += record.aprExfPre
                totalmayExfPre += record.mayExfPre
                totaljunExfPre += record.junExfPre
                totaljulExfPre += record.julExfPre
                totalaugExfPre += record.augExfPre
                totalsepExfPre += record.sepExfPre
                totaloctExfPre += record.octExfPre
                totalnovExfPre += record.novExfPre
                totaldecExfPre += record.decExfPre
                sumExfPre += record.totalExfPre
                totaljanExfLat += record.janExfLat;
                totalfebExfLat += record.febExfLat;
                totalmarExfLat += record.marExfLat;
                totalaprExfLat += record.aprExfLat;
                totalmayExfLat += record.mayExfLat;
                totaljunExfLat += record.junExfLat;
                totaljulExfLat += record.julExfLat;
                totalaugExfLat += record.augExfLat;
                totalsepExfLat += record.sepExfLat;
                totaloctExfLat += record.octExfLat;
                totalnovExfLat += record.novExfLat;
                totaldecExfLat += record.decExfLat;
                sumExfLat += record.totalExfLat;
                totaljanWhPre += record.janWhPre;
                totalfebWhPre += record.febWhPre;
                totalmarWhPre += record.marWhPre;
                totalaprWhPre += record.aprWhPre;
                totalmayWhPre += record.mayWhPre;
                totaljunWhPre += record.junWhPre;
                totaljulWhPre += record.julWhPre;
                totalaugWhPre += record.augWhPre;
                totalsepWhPre += record.sepWhPre;
                totaloctWhPre += record.octWhPre;
                totalnovWhPre += record.novWhPre;
                totaldecWhPre += record.decWhPre;
                sumWhPre += record.totalWhPre;
                totaljanWhLat += record.janWhLat;
                totalfebWhLat += record.febWhLat;
                totalmarWhLat += record.marWhLat;
                totalaprWhLat += record.aprWhLat;
                totalmayWhLat += record.mayWhLat;
                totaljunWhLat += record.junWhLat;
                totaljulWhLat += record.julWhLat;
                totalaugWhLat += record.augWhLat;
                totalsepWhLat += record.sepWhLat;
                totaloctWhLat += record.octWhLat;
                totalnovWhLat += record.novWhLat;
                totaldecWhLat += record.decWhLat;
                sumWhLat += record.totalWhLat;
            }
            for (const record of records) {
                const YEAR = record.YEAR;
                const file_id = record.file_id;
                const exf = record.exf;
                const wh = record.wh;
                const planning_sum = record.planning_sum;
                const STATUS = record.STATUS;
                const prod_plan_type = record.prod_plan_type;
                const janExfPre = Number((record.janExfPre / totaljanExfPre) * 100).toFixed(0) + '%';
                const febExfPre = Number((record.febExfPre / totalfebExfPre) * 100).toFixed(0) + '%'
                const marExfPre = Number((record.marExfPre / totalmarExfPre) * 100).toFixed(0) + '%'
                const aprExfPre = Number((record.aprExfPre / totalaprExfPre) * 100).toFixed(0) + '%'
                const mayExfPre = Number((record.mayExfPre / totalmayExfPre) * 100).toFixed(0) + '%'
                const junExfPre = Number((record.junExfPre / totaljunExfPre) * 100).toFixed(0) + '%'
                const julExfPre = Number((record.julExfPre / totaljulExfPre) * 100).toFixed(0) + '%'
                const augExfPre = Number((record.augExfPre / totalaugExfPre) * 100).toFixed(0) + '%'
                const sepExfPre = Number((record.sepExfPre / totalsepExfPre) * 100).toFixed(0) + '%'
                const octExfPre = Number((record.octExfPre / totaloctExfPre) * 100).toFixed(0) + '%'
                const novExfPre = Number((record.novExfPre / totalnovExfPre) * 100).toFixed(0) + '%'
                const decExfPre = Number((record.decExfPre / totaldecExfPre) * 100).toFixed(0) + '%'
                const totalExfPre = Number((record.totalExfPre / sumExfPre) * 100).toFixed(0) + '%'
                const janExfLat = Number((record.janExfLat / totaljanExfLat) * 100).toFixed(0) + '%';
                const febExfLat = Number((record.febExfLat / totalfebExfLat) * 100).toFixed(0) + '%';
                const marExfLat = Number((record.marExfLat / totalmarExfLat) * 100).toFixed(0) + '%';
                const aprExfLat = Number((record.aprExfLat / totalaprExfLat) * 100).toFixed(0) + '%';
                const mayExfLat = Number((record.mayExfLat / totalmayExfLat) * 100).toFixed(0) + '%';
                const junExfLat = Number((record.junExfLat / totaljunExfLat) * 100).toFixed(0) + '%';
                const julExfLat = Number((record.julExfLat / totaljulExfLat) * 100).toFixed(0) + '%';
                const augExfLat = Number((record.augExfLat / totalaugExfLat) * 100).toFixed(0) + '%';
                const sepExfLat = Number((record.sepExfLat / totalsepExfLat) * 100).toFixed(0) + '%';
                const octExfLat = Number((record.octExfLat / totaloctExfLat) * 100).toFixed(0) + '%';
                const novExfLat = Number((record.novExfLat / totalnovExfLat) * 100).toFixed(0) + '%';
                const decExfLat = Number((record.decExfLat / totaldecExfLat) * 100).toFixed(0) + '%';
                const totalExfLat = Number((record.totalExfLat / sumExfLat) * 100).toFixed(0) + '%';
                const janWhPre = Number((record.janWhPre / totaljanWhPre) * 100).toFixed(0) + '%';
                const febWhPre = Number((record.febWhPre / totalfebWhPre) * 100).toFixed(0) + '%';
                const marWhPre = Number((record.marWhPre / totalmarWhPre) * 100).toFixed(0) + '%';
                const aprWhPre = Number((record.aprWhPre / totalaprWhPre) * 100).toFixed(0) + '%';
                const mayWhPre = Number((record.mayWhPre / totalmayWhPre) * 100).toFixed(0) + '%';
                const junWhPre = Number((record.junWhPre / totaljunWhPre) * 100).toFixed(0) + '%';
                const julWhPre = Number((record.julWhPre / totaljulWhPre) * 100).toFixed(0) + '%';
                const augWhPre = Number((record.augWhPre / totalaugWhPre) * 100).toFixed(0) + '%';
                const sepWhPre = Number((record.sepWhPre / totalsepWhPre) * 100).toFixed(0) + '%';
                const octWhPre = Number((record.octWhPre / totaloctWhPre) * 100).toFixed(0) + '%';
                const novWhPre = Number((record.novWhPre / totalnovWhPre) * 100).toFixed(0) + '%';
                const decWhPre = Number((record.decWhPre / totaldecWhPre) * 100).toFixed(0) + '%';
                const totalWhPre = Number((record.totalWhPre / sumWhPre) * 100).toFixed(0) + '%'
                const janWhLat = Number((record.janWhLat / totaljanWhLat) * 100).toFixed(0) + '%';
                const febWhLat = Number((record.febWhLat / totalfebWhLat) * 100).toFixed(0) + '%';
                const marWhLat = Number((record.marWhLat / totalmarWhLat) * 100).toFixed(0) + '%';
                const aprWhLat = Number((record.aprWhLat / totalaprWhLat) * 100).toFixed(0) + '%';
                const mayWhLat = Number((record.mayWhLat / totalmayWhLat) * 100).toFixed(0) + '%';
                const junWhLat = Number((record.junWhLat / totaljunWhLat) * 100).toFixed(0) + '%';
                const julWhLat = Number((record.julWhLat / totaljulWhLat) * 100).toFixed(0) + '%';
                const augWhLat = Number((record.augWhLat / totalaugWhLat) * 100).toFixed(0) + '%';
                const sepWhLat = Number((record.sepWhLat / totalsepWhLat) * 100).toFixed(0) + '%';
                const octWhLat = Number((record.octWhLat / totaloctWhLat) * 100).toFixed(0) + '%';
                const novWhLat = Number((record.novWhLat / totalnovWhLat) * 100).toFixed(0) + '%';
                const decWhLat = Number((record.decWhLat / totaldecWhLat) * 100).toFixed(0) + '%';
                const totalWhLat = Number((record.totalWhLat / sumWhLat) * 100).toFixed(0) + '%'
                perData.push({
                    YEAR, file_id, exf, wh, planning_sum, STATUS, prod_plan_type, janExfPre, febExfPre, marExfPre, aprExfPre, mayExfPre, junExfPre, julExfPre, augExfPre, sepExfPre, octExfPre, novExfPre, decExfPre, totalExfPre,
                    janExfLat, febExfLat, marExfLat, aprExfLat, mayExfLat, junExfLat, julExfLat, augExfLat, sepExfLat, octExfLat, novExfLat, decExfLat, totalExfLat, janWhPre, febWhPre, marWhPre, aprWhPre, mayWhPre,
                    junWhPre, julWhPre, augWhPre, sepWhPre, octWhPre, novWhPre, decWhPre, totalWhPre, janWhLat, febWhLat, marWhLat, aprWhLat, mayWhLat, junWhLat, julWhLat, augWhLat, sepWhLat, octWhLat, novWhLat,
                    decWhLat, totalWhLat
                })

            }
            if (records && data1) {
                const mergedData = [...records, ...perData]
                return new CommonResponseModel(true, 1, 'Data retrieved', mergedData);
            } else {
                return new CommonResponseModel(false, 1, 'No data found');
            }
        } catch (err) {
            // console.error('Error in getComparisionphaseExcelData:', err);
            throw err;
        }
    }
    // async getversion():Promise<CommonResponseModel>{
    //     let query=`SELECT 
    //     order_plan_number, 
    //     old_val,
    //     created_at, 
    //     new_val,
    //     display_name,
    //     VERSION,
    //     new_column
    // FROM (
    //     SELECT 
    //         order_plan_number, 
    //         COLUMN_NAME,
    //         old_val,
    //         new_val,     
    //         display_name,
    //         created_at, 
    //         VERSION,
    //         ROW_NUMBER() OVER (PARTITION BY order_plan_number ORDER BY created_at DESC, VERSION DESC) AS new_column
    //     FROM order_diff
    // ) AS ranked
    // WHERE new_column <= 5;`
    // return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', query);

    // }
    // async getversion(req:ordersPlanNo):Promise<CommonResponseModel>{
    //     try{
    //         const query = await this.orderDiffRepo.getversions(req);
    //         return new CommonResponseModel(true,1,'data retrieved', query)
    //     }catch(err){
    //         throw err
    //     }
    // }
    async getversion(req: ordersPlanNo): Promise<CommonResponseModel> {
        // console.log(req,'serviceeeeeeeeeeeeeee');

        try {
            const data = await this.orderDiffRepo.getversions(req)
            if (data) {
                return new CommonResponseModel(true, 1, 'Data retrieved', data)
            } else {
                return new CommonResponseModel(false, 1, 'No data found')
            }

        } catch (err) {
            throw err
        }
    }
    async getItemsMonthly(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.getItemsMonthly()
        if (details)
            return new CommonResponseModel(true, 1, 'data retrived', details)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPhaseItems(): Promise<CommonResponseModel> {
        const details = await this.ordersChildRepo.getPhaseItems()
        if (details)
            return new CommonResponseModel(true, 1, 'data retrived', details)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getYearDropdown(): Promise<CommonResponseModel> {
        try {
            const info = await this.ordersRepository.getYearDropdown()
            if (info.length > 0) {
                return new CommonResponseModel(true, 1, 'Data retrieved', info)
            } else {
                return new CommonResponseModel(false, 0, 'No dat found')
            }

        } catch (err) {
            throw err
        }
    }

    async getLatestPreviousFilesData(): Promise<CommonResponseModel> {
        try {
            const info = await this.fileUploadRepo.getLatestPreviousFilesData()
            if (info.length > 0) {
                return new CommonResponseModel(true, 1, 'Data retrieved', info)
            } else {
                return new CommonResponseModel(false, 0, 'No dat found')
            }

        } catch (err) {
            throw err
        }
    }

    async sendMail(to: string, subject: string, message: any[]) {
        let content = message.reduce(function (a, b) {
            return a + '<tr bgcolor="#ffffff"><td>' + b.fileName + '</a></td><td>' + b.status + '</td><td>' + b.reason + '</td><td>' + b.columns + '</td></tr>';
        }, '');
        const sendMail = await this.transporter.sendMail({
            from: 'uma.boddeda@schemaxtech.com',
            to,
            subject,
            text: '',
            html: '<div><table cellspacing="3" bgcolor="#000000"><thead><tr bgcolor="#ffffff"><th>File Name</th><th width="25%">Status</th><th>Reason</th><th>Columns</th></tr></thead><tbody>' +
                content + '</tbody></table></div>',
            context: {

            }
        });
        // console.log(sendMail, '---------------sendmail')
        return sendMail
    }

    async saveOrdersData(formData: any, id: number, months: number, uploadType: string): Promise<CommonResponseModel> {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const flag = new Set()
            const dtoArray: SaveOrderDto[] = []
            for (const obj of formData) {
                const columnArray = [];
                const updatedObj: any = {};
                for (const key in obj) {
                    const newKey = key.replace(/\s/g, '_').replace(/[\(\)]/g, '').replace(/-/g, '_').replace(/:/g, '_').replace(/[*]/g, '_').replace(/=/g, '_').replace(/”/g, '').replace(/~/g, '').replace(/[/]/g, '').replace(/“/g, '').replace(/�/g, '').replace(/'/g, '')
                    const newKey1 = newKey.replace(/__/g, '_');
                    columnArray.push(newKey1)
                    const value = obj[key];
                    if (value === "") {
                        updatedObj[newKey1] = null;
                    } else {
                        updatedObj[newKey1] = value;
                    }
                }
                const missedColumns = new Set<string>();
                for (const requiredKey of RequiredColumns) {
                    if (!(columnArray.includes(requiredKey))) {
                        missedColumns.add(requiredKey)
                    }
                }
                if ((missedColumns.size !== 0)) {
                    await transactionManager.releaseTransaction()
                    return new CommonResponseModel(false, 24, 'Required Columns missed', Array.from(missedColumns));
                }
                let dtoData: SaveOrderDto;
                if (updatedObj.Order_Plan_Number !== null) {
                    if (uploadType == 'Manual') {
                        updatedObj.whDate = updatedObj.WH ? moment(updatedObj.WH).add(1, 'days').format('YYYY-MM-DD') : null
                        updatedObj.exfDate = updatedObj.EXF ? moment(updatedObj.EXF).add(1, 'days').format('YYYY-MM-DD') : null
                        updatedObj.WH = updatedObj.WH ? moment(updatedObj.WH).add(1, 'days').format('MM-DD') : null
                        updatedObj.EXF = updatedObj.EXF ? moment(updatedObj.EXF).add(1, 'days').format('MM-DD') : null

                    }
                    dtoData = new SaveOrderDto(null, updatedObj.Year, updatedObj.Planning_Ssn, updatedObj.Biz, updatedObj.Core_Category, updatedObj.Planning_Sum, updatedObj.Coeff, updatedObj.Publish_Flag_for_Factory, updatedObj.Order_Plan_Number, (updatedObj.Order_Plan_Qty).toString().replace(/,/g, ''), (updatedObj.Order_Plan_QtyCoeff)?.toString().replace(/,/g, ''), updatedObj.Prod_Plan_Type, updatedObj.WH ? moment(updatedObj.WH).format('MM-DD') : null, updatedObj.EXF_ETD, updatedObj.ETD_WH, updatedObj.Sample, updatedObj.EXF ? moment(updatedObj.EXF).format('MM-DD') : null, id, null, 'bidhun', null, null, updatedObj.whDate ? moment(updatedObj.whDate).format('YYYY-MM-DD') : null, updatedObj.exfDate ? moment(updatedObj.exfDate).format('YYYY-MM-DD') : null)
                    let newDate
                    if (dtoData.exf == null && dtoData.publishFlagForFactory !== 'NotPub') {
                        let inputDate = dtoData.wh ? moment(dtoData.wh).format('MM-DD') : null;
                        if (inputDate === null) {
                            await transactionManager.releaseTransaction()
                            return new CommonResponseModel(false, 101, 'Null value in WH column')
                        } else {
                            let parts = inputDate.split('-');
                            let months = parseInt(parts[0], 10);
                            let day = parseInt(parts[1], 10);
                            let numberOfDays = Number(dtoData.exfEtd);
                            let dateObject = new Date(2023, months - 1, day);
                            dateObject.setDate(dateObject.getDate() - numberOfDays);
                            newDate = moment(dateObject).format('MM-DD');
                            dtoData.exf = newDate;
                            // Convert the string to a Date object
                            var date = new Date(dtoData.whDate);
                            // Subtract one day from the date
                            date.setDate(date.getDate() - Number(dtoData.exfEtd));
                            // Convert the updated date back to a string
                            let updatedDateString = moment(date).format('YYYY-MM-DD')
                            dtoData.exfDate = updatedDateString
                        }
                    }
                } else {
                    break
                }
                dtoArray.push(dtoData);
                if (dtoData.orderPlanNumber != null) {
                    const details = await this.ordersRepository.findOne({ where: { orderPlanNumber: dtoData.orderPlanNumber } })
                    const versionDetails = await this.ordersChildRepo.getVersion(Number(dtoData.orderPlanNumber))
                    let version = 1;
                    if (versionDetails.length > 0) {
                        version = Number(versionDetails.length) + 1
                    }
                    dtoData.version = version
                    if (details) {
                        const updateOrder = await transactionManager.getRepository(OrdersEntity).update({ orderPlanNumber: dtoData.orderPlanNumber }, {
                            year: dtoData.year, planningSsn: dtoData.planningSsn, biz: dtoData.biz, coreCategory: dtoData.coreCategory, planningSum: dtoData.planningSum, coeff: dtoData.coeff, publishFlagForFactory: dtoData.publishFlagForFactory, orderPlanQty: dtoData.orderPlanQty, orderPlanQtyCoeff: dtoData.orderPlanQtyCoeff, prodPlanType: dtoData.prodPlanType, wh: dtoData.wh, exfEtd: dtoData.exfEtd, etdWh: dtoData.etdWh, sample: dtoData.sample, version: dtoData.version, fileId: dtoData.fileId, updatedUser: dtoData.createdUser, exf: dtoData.exf, whDate: dtoData.whDate, exfDate: dtoData.exfDate
                        })
                        if (!updateOrder.affected) {
                            await transactionManager.releaseTransaction();
                            return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                        } else {
                            flag.add(true)
                        }
                        const convertedExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData, id, details.productionPlanId, 10, dtoData.exf);
                        const saveExcelEntity: OrdersChildEntity = await transactionManager.getRepository(OrdersChildEntity).save(convertedExcelEntity);
                        if (saveExcelEntity) {
                            //difference insertion to order diff table
                            const existingDataKeys = Object.keys(details)
                            const currentDataKeys = Object.keys(dtoData)
                            for (const existingDataKey of existingDataKeys) {
                                if (details[existingDataKey] != dtoData[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'version' && existingDataKey != '' && existingDataKey != 'orderStatus' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser' && existingDataKey != 'fileId' && existingDataKey != 'month' && existingDataKey != 'productionPlanId') {
                                    const orderDiffObj = new OrdersDifferenceEntity();
                                    //         if(yearOrderDtoKeys.includes(existingDataKey)){

                                    //     const oldValue = moment(details[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY','YYYY/MM/DD','YYYY-MM-DD HH:mm:ss']).format('YYYY-MM-DD');
                                    //     const newValue = moment(dtoData[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY','YYYY/MM/DD','YYYY-MM-DD']).format('YYYY-MM-DD');
                                    //     orderDiffObj.oldValue = oldValue
                                    //     orderDiffObj.newValue = newValue
                                    //     orderDiffObj.columnName = orderColumnValues[existingDataKey]
                                    //     orderDiffObj.displayName = existingDataKey
                                    //     orderDiffObj.productionPlanId = details.productionPlanId
                                    //     orderDiffObj.version = dtoData.version
                                    //     orderDiffObj.fileId = Number(id)
                                    //     orderDiffObj.orderPlanNumber = dtoData.orderPlanNumber
                                    //     if (oldValue != newValue) {
                                    //         const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
                                    //         if (!orderDiffSave) {
                                    //             await transactionManager.releaseTransaction()
                                    //             return new CommonResponseModel(false,0,'Error while saving in orders difference')
                                    //         }
                                    //     } else {
                                    //         continue;
                                    //     }
                                    // }
                                    if (monthOrderDtoKeys.includes(existingDataKey)) {
                                        const oldValue = moment(details[existingDataKey]).format('MM-DD');
                                        const newValue = moment(dtoData[existingDataKey]).format('MM-DD');
                                        orderDiffObj.oldValue = oldValue
                                        orderDiffObj.newValue = newValue
                                        orderDiffObj.columnName = orderColumnValues[existingDataKey]
                                        orderDiffObj.displayName = existingDataKey
                                        orderDiffObj.productionPlanId = details.productionPlanId
                                        orderDiffObj.version = dtoData.version
                                        orderDiffObj.fileId = Number(id)
                                        orderDiffObj.orderPlanNumber = dtoData.orderPlanNumber
                                        if (oldValue != newValue) {
                                            const orderDiffSave = await transactionManager.getRepository(OrdersDifferenceEntity).save(orderDiffObj);
                                            if (!orderDiffSave) {
                                                await transactionManager.releaseTransaction()
                                                return new CommonResponseModel(false, 0, 'Error while saving projection orders difference')
                                            } else {
                                                flag.add(true)
                                            }
                                        } else {
                                            continue;
                                        }
                                    }
                                    else {
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
                                                await transactionManager.releaseTransaction()
                                                return new CommonResponseModel(false, 0, 'Error while saving projection orders difference')
                                            } else {
                                                flag.add(true)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        dtoData.version = 1
                        if (dtoData.publishFlagForFactory !== 'NotPub') {

                            const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(dtoData, id, 10, dtoData.exf);
                            const saveExcelEntity: OrdersEntity = await transactionManager.getRepository(OrdersEntity).save(convertedExcelEntity);
                            const convertedChildExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData, id, saveExcelEntity.productionPlanId, 10, dtoData.exf);
                            const saveChildExcelEntity: OrdersChildEntity = await transactionManager.getRepository(OrdersChildEntity).save(convertedChildExcelEntity);
                            if (!saveExcelEntity || !saveChildExcelEntity) {
                                await transactionManager.releaseTransaction()
                                return new CommonResponseModel(false, 0, 'Error while saving projection orders')
                            } else {
                                flag.add(true)
                            }
                        }
                    }
                }

            }
            if (!(flag.has(false))) {
                await transactionManager.completeTransaction()
                return new CommonResponseModel(true, 1, 'Created Successfully')
            } else {
                await transactionManager.releaseTransaction()
                return new CommonResponseModel(false, 0, 'Something went wrong in uploading')
            }
        } catch (err) {
            await transactionManager.releaseTransaction()
            return new CommonResponseModel(false, 0, 'Network error or Code issue');

        }
    }

    async getUplodedFilesInfo(): Promise<CommonResponseModel> {
        try {
            const data = await this.fileUploadRepo.find()
            let filesArray = []
            if (data) {
                for (const rec of data) {
                    filesArray.push(rec.fileName)
                }
                return new CommonResponseModel(true, 1, 'Data retreived', filesArray)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }

        } catch (err) {
            throw err
        }
    }

    async getTrimOrderDetails(req: TrimDetailsRequest): Promise<CommonResponseModel> {
        try {
            const priceMap = new Map<string, Map<string, string>>()  //destination,itemcode,price
            // const destinationsDataQry = `select distinct(business_unit) from trim_orders`;
            // const destinationsData = await this.dataSource.query(destinationsDataQry)
            // console.log(destinationsData,'bbbb')

            const priceListQry = `select sample_code as sampleCode,business,fob_local_currency as fobLocalCurrency,currency from price_list where business in(select distinct(business_unit) from trim_orders)`;
            const priceListData = await this.dataSource.query(priceListQry)
            let salesPrice;
            let currency: string;
            for (const record of priceListData) {
                if (!(priceMap.has(record.business))) {
                    priceMap.set(record.business, new Map<string, string>)
                    if (!(priceMap.get(record.business).has(record.sampleCode))) {
                        priceMap.get(record.business).set(record.sampleCode, record.fobLocalCurrency)
                    } else {
                        if (!(priceMap.get(record.business).has(record.sampleCode))) {
                            priceMap.get(record.business).set(record.sampleCode, record.fobLocalCurrency)
                        }
                    }
                } else {
                    if (!(priceMap.get(record.business).has(record.sampleCode))) {
                        priceMap.get(record.business).set(record.sampleCode, record.fobLocalCurrency)
                    }
                }
            }
            const data = await this.trimOrderRepo.find({ where: { orderNo: req.orderNumber } })
            let destinationMap = new Map<string, Destinations>()
            if (data) {
                let colorMap = new Map<string, Colors>()
                for (const rec of data) {
                    if (rec.businessUnit == 'UQIN') {
                        currency = 'INR'
                    } else {
                        currency = 'USD'
                    }
                    if (!destinationMap.has(rec.businessUnit)) {
                        destinationMap.set(rec.businessUnit, new Destinations(rec.businessUnit, []))
                    }
                    if (!colorMap.has(rec.color)) {
                        colorMap.set(rec.color, new Colors(`${rec.colorCode} ${rec.color}`, []))
                    }
                    salesPrice = Number(priceMap.get(rec.businessUnit).get(rec.sampleCode.slice(2)));
                    colorMap.get(rec.color).sizes.push(new Sizes(rec.size, rec.orderQtyPcs, Number(priceMap.get(rec.businessUnit).get(rec.sampleCode.slice(2)))))
                }
                const destinations: Destinations[] = []
                destinationMap.forEach((rec) => {
                    colorMap.forEach((e) => {
                        destinationMap.get(rec.name).colors.push(new Colors(e.name, e.sizes))
                    })
                    destinations.push(rec)
                })
                const info = new CoLineFormatModel(data[0].orderNo, data[0].trimItemNo, salesPrice, currency, data[0].contractedETD, destinations)
                return new CommonResponseModel(true, 1, 'Data retrieved successfully', info)
            } else {
                return new CommonResponseModel(false, 0, 'No data found')
            }
        } catch (err) {
            throw err
        }
    }

    @Cron('10 7,15 * * *')
    async trimOrdersReadCell(): Promise<CommonResponseModel> {
        try {
            let filesArray = []
            const fs = require('fs');
            const files = fs.readdirSync('F:/Trim-Orders');
            const uplodedFiles = await this.getUplodedFilesInfo()
            const difference = files.filter((element) => !uplodedFiles.data.includes(element))
            if (difference.length == 0) {
                // filesArray.push(new ordersMailFileStatusArrayReq(files,'Failed','Files with same name already exists!','-'))
                return new CommonResponseModel(false, 0, 'No new files identified in the folder')
            } else {
                for (const filerec of difference) {
                    const filename = filerec
                    const filepath = 'F:/Trim-Orders/' + filerec
                    const promiseA = () => new Promise((resolve, reject) => {
                        xlsxFile(filepath, { getSheets: true }).then((sheets: any[]) => {
                            resolve(sheets)
                        });
                    })
                    const sheets: any = await promiseA()
                    const promise = () => new Promise((resolve, reject) => {
                        if (filename.split('.').pop() == 'csv') {
                            resolve(null)
                        } else if (filename.split('.').pop() == 'xlsx') {
                            let finalSheetName = ''
                            for (const sheetname of sheets) {
                                if (sheetname.name == 'ExcelOut(Trim)') {
                                    finalSheetName = sheetname.name
                                    break
                                } else {
                                    continue
                                }
                            }
                            if (finalSheetName) {
                                xlsxFile(filepath, { sheet: finalSheetName }, {
                                    transformData(data) {
                                        // console.log(data)
                                        // data.slice(0,3)
                                        return data
                                    }
                                }).then((rows) => {
                                    let columnNames
                                    const dataArray = []
                                    while (rows.length) {
                                        columnNames = rows.shift(); // Separate first row with column names
                                        if (columnNames[0] != null && columnNames[0] == 'Order No.') {
                                            break;
                                        }
                                    }
                                    rows.map((row) => { // Map the rest of the rows into objects
                                        const obj = {}; // Create object literal for current row
                                        row.forEach((cell, i) => {
                                            obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
                                        });
                                        //   console.log(obj)
                                        dataArray.push(Object(obj));
                                        resolve(dataArray)
                                        //   console.log(objs); // Display the array of objects on the console
                                        //   return obj;
                                    });
                                });
                            } else {
                                const saveFilePath = this.updatePath(filepath, filename, null, FileTypesEnum.TRIM_ORDERS, 'Email', 'Sheet Name Does Not Match')
                                filesArray.push(new ordersMailFileStatusArrayReq(filename, 'Failed', `Sheet name doesn't match`, '-'))
                                resolve(null)
                            }
                        } else {

                        }
                    })
                    const dataArray = await promise();

                    if (dataArray) {

                        const saveFilePath = await this.updatePath(filepath, filename, null, FileTypesEnum.TRIM_ORDERS, 'Email')
                        if (saveFilePath.status) {
                            const saveTrimOrders = await this.saveTrimOrdersData(dataArray, saveFilePath.data.id, 9)
                            let req = new FileStatusReq();
                            req.fileId = saveFilePath.data.id;
                            req.userName = 'Bidhun'
                            if (saveTrimOrders.status) {
                                req.status = 'Success';
                            } else {
                                req.failedReason = saveTrimOrders.internalMessage
                                if (saveTrimOrders?.data) {
                                    // console.log(saveProjOrders.data,'hhhhh')
                                    req.columns = saveTrimOrders.data
                                    // const resData = saveProjOrders.data
                                } else {
                                    req.columns = ''
                                }
                                req.status = 'Failed';
                            }
                            // console.log(req,'valuuuuu')
                            const updateFileStatus = await this.updateFileStatus(req)
                            filesArray.push(new ordersMailFileStatusArrayReq(filename, req.status, req.status === 'Failed' ? req.failedReason : '', req.status === 'Failed' ? req.columns : ''))
                        } else {
                            // return false
                            filesArray.push(new ordersMailFileStatusArrayReq(filename, 'Failed', saveFilePath.internalMessage, '-'))
                        }
                        // return dataArray
                    } else {
                        // return dataArray
                    }
                }

                const sendMail = this.sendMail('karthikeyan.nallamuthu@shahi.co.in', 'Trim Order Uploded Files Status', filesArray)
                if (sendMail) {
                    return new CommonResponseModel(true, 1, '', filesArray)
                } else {
                    return new CommonResponseModel(true, 1, 'Something went wrong in sending mail', filesArray)
                }
            }
            return
        } catch (err) {
            throw err
        }
    }

    @Cron('0 7,15 * * *')
    async uniqloTrimOrdersBot(): Promise<any> {
        // var capabilities = Capabilities.chrome();

        // capabilities.set('chromeOptions', {

        //     'args': ['--headless', '--no-sandbox', 'window-size=1024,768', '--disable-gpu', '--disable-popup-blocking']

        // })
        // const chromeOptions = new chrome.Options();
        // chromeOptions.addArguments('--auto-select-certificate-for-urls=https://spl.fastretailing.com');
        // chromeOptions.addArguments('--disable-popup-blocking')
        const today = new Date();

        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = today.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}/${month}/${day}`
        // chromeOptions.setUserPreferences({ 'profile.default_content_setting_values.notifications': 2 });
        // const driver = await new Builder().forBrowser('chrome').withCapabilities(capabilities).build();
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--ignore--certificate-errors');
        chromeOptions.addArguments('user-data-dir=C:/Users/Standby.it/AppData/Local/Google/Chrome/User Data')
        chromeOptions.addArguments('profile-directory=Default')

        const capabilities = {
            browserName: 'chrome', acceptInsecureCerts: true
        }
        const driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).withCapabilities(capabilities).build();
        // const driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
        try {
            await driver.get('https://spl.fastretailing.com/app/spl/login');
            await driver.sleep(5000)
            await driver.findElement(By.id('a-textfield-0')).sendKeys('SwathiG');
            await driver.findElement(By.id('a-textfield-1')).sendKeys('beyIMjX#');
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-login/form/div/div[2]/div[1]/button')).click();
            await driver.sleep(5000)
            await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/o-main/app-portal/div/o-header/o-menu/div/div')));
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-portal/div/o-header/o-menu/div/div')).click();
            await driver.sleep(5000)
            await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/o-main/app-portal/div/o-header/o-menu/div/form/table/tbody[2]/tr[1]/td[2]/a')));
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-portal/div/o-header/o-menu/div/form/table/tbody[2]/tr[1]/td[2]/a')).click();
            await driver.sleep(5000)
            await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[1]/div[2]/div/a')));
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[1]/div[2]/div/a')).click();
            await driver.sleep(5000)
            await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/o-section[2]/m-formgroup[1]/div/m-selectbox[3]')));
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/o-section[2]/m-formgroup[1]/div/m-selectbox[3]')).click();
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/o-section[2]/m-formgroup[1]/div/m-selectbox[4]')).click();
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/o-section[2]/m-formgroup[2]/div/m-selectbox[1]')).click();
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/o-section[2]/m-formgroup[2]/div/m-selectbox[2]')).click();
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/o-section[2]/m-formgroup[2]/div/m-selectbox[3]')).click();
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/o-section[2]/m-formgroup[3]/div/m-selectbox[1]')).click();
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/o-section[2]/m-formgroup[3]/div/m-selectbox[2]')).click();
            await driver.findElement(By.xpath('//*[@id="a-textfield-12"]')).sendKeys('2023/11/15');
            await driver.findElement(By.xpath('//*[@id="a-textfield-13"]')).sendKeys(formattedDate);
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/form/div[2]/div/div/m-buttongroup/button[2]')).click();
            await driver.sleep(10000)
            await driver.findElement(By.xpath('//*[@id="borderLayout_eGridPanel"]/div[1]/div/div[1]/div[1]/div[2]/div[1]/span/span[2]')).click();
            await driver.findElement(By.xpath('/html/body/app-root/o-main/app-materialpo/app-materialpo-index/o-article/m-floatingarea/div[2]/div[1]/button[2]')).click();
            await driver.wait(until.elementLocated(By.xpath('/html/body/o-component-host/o-dialog/div[2]/button[2]')));
            await driver.findElement(By.xpath('/html/body/o-component-host/o-dialog/div[2]/button[2]')).click();
            await driver.sleep(5000)
            await driver.wait(until.elementLocated(By.xpath('/html/body/o-component-host/o-dialog/div[3]/button')));
            await driver.findElement(By.xpath('/html/body/o-component-host/o-dialog/div[3]/button')).click();
            await driver.sleep(5000)
            return new CommonResponseModel(true, 1, 'Trim Orders Downloaded Successfully')
        } catch (err) {
            return new CommonResponseModel(false, 0, err)
        } finally {
            await driver.quit();
        }
    }



    async seasonWiseReportData(req?: SeasonWiseRequest): Promise<CommonResponseModel> {

        console.log(req,"==ser=")
       try{
        let qtyLocationDate
        if(req.qtyLocation == 'exf'){
            qtyLocationDate='exf_date'
        }
        if(req.qtyLocation == 'wh'){
            qtyLocationDate='wh_date'
        }
       
        let query=' SELECT  planning_sum AS itemName,planning_ssn AS plannedSeason,YEAR,CONCAT(MONTHNAME('+qtyLocationDate+'),"-",YEAR('+qtyLocationDate+')) AS MONTHNAME,SUM(REPLACE(order_plan_qty,","," ")) AS totalQuantity FROM orders WHERE file_id = (SELECT MAX(file_id) FROM orders) AND YEAR="'+req.year+'" and  planning_ssn ="'+req.season+'"'
        
        if(req.itemName){
            query += ' AND  planning_sum  ="'+req.itemName+'"'
        }

        query += ' GROUP BY MONTH('+qtyLocationDate+'),YEAR('+qtyLocationDate+'),planning_sum order by YEAR('+qtyLocationDate+'),MONTH('+qtyLocationDate+')';

            const data = await this.dataSource.query(query)

            const sizeDataMap = new Map<string, sesaonWisereportModel>();
            for (const rec of data) {
                if (!sizeDataMap.has(rec.itemName)) {
                    sizeDataMap.set(rec.itemName, new sesaonWisereportModel(rec.itemName, rec.YEAR, rec.plannedSeason, []))
                }
                const monthData = sizeDataMap.get(rec.itemName).MonthItemData
                if (rec.itemName != null) {
                    monthData.push(new MonthItemData(rec.MONTHNAME, rec.totalQuantity))
                }
            }
            const detailedarray: sesaonWisereportModel[] = Array.from(sizeDataMap.values());

            if (detailedarray) {
                return new CommonResponseModel(true, 1, 'data retrived sucessfully', detailedarray)
            } else {
                return new CommonResponseModel(true, 1, 'data retrived sucessfully', [])

            }

        } catch (err) {
            throw err
        }

    }


  

    async coLineCreationReq(req: any): Promise<CommonResponseModel> {
        // const data = this.coLineRepository.findOne({ where: { buyerPo: req.purchaseOrderNumber, lineItemNo: req.poLineItemNumber } })
        // if (data) {
        //     return new CommonResponseModel(false, 1, 'CO-Line request created already')
        // }
        if (req.itemNo == undefined || null) {
            return new CommonResponseModel(false, 1, 'Please enter Item No')
        }
        const entity = new COLineEntity()
        entity.buyer = req.buyer ? req.buyer : 'Nike-U12'
        entity.buyerPo = req.purchaseOrderNumber;
        entity.lineItemNo = req.poLineItemNumber;
        entity.itemNo = req.itemNo
        entity.status = 'Open';
        entity.createdUser = 'Admin';
        const save = await this.colineRepo.save(entity);
        if (save) {
            return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
        } else {
            return new CommonResponseModel(false, 1, 'CO-Line request failed')
        }
    }

    async createCOline(req: any): Promise<CommonResponseModel> {
        const poDetails = await this.colineRepo.getDataforCOLineCreation();
        if (!poDetails.length) {
            return new CommonResponseModel(false, 0, 'No CO-Line creation requests')
        }
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        try {
            await driver.get('http://intranetn.shahi.co.in:8080/ShahiExportIntranet/subApp?slNo=2447#');

            await driver.findElement(By.id('username')).sendKeys('60566910');
            await driver.findElement(By.id('password')).sendKeys('60566910');
            await driver.findElement(By.css('button.btn-primary')).click();

            await driver.get('http://intranetn.shahi.co.in:8080/ShahiExportIntranet/subApp?slNo=2447')
            const newPAge = await driver.executeScript(
                `javascript:openAccessPage('http://intranet.shahi.co.in:8080/IntraNet/CRMPRDNEW.jsp', 'CRM', '2448', 'R', '60566910', 'N', '20634576', 'null');`
            );
            const windowHandles = await driver.getAllWindowHandles()
            await driver.switchTo().window(windowHandles[1]);
            const frame = await driver.findElement(By.id('mainFrame'));
            await driver.switchTo().frame(frame)
            for (const po of poDetails) {
                const coLine = new CoLineRequest();
                let buyerValue1;
                let buyerValue2;
                let agent;
                let buyerAddress;
                let deliveryAddress;
                let pkgTerms;
                let paymentTerms;
                if (po.buyer === 'Uniqlo-U12') {
                    const req = new TrimDetailsRequest()
                    req.orderNumber = po.buyer_po;
                    const response = await this.getTrimOrderDetails(req);
                    const coData = response.data;
                    coLine.buyerPo = coData.buyerPo;
                    const gacDate = new Date(coData.deliveryDate); // Parse the GAC date
                    // Calculate the date 7 days before the GAC date
                    const sevenDaysBeforeGAC = new Date(gacDate);
                    sevenDaysBeforeGAC.setDate(gacDate.getDate() - 7);
                    // Format the result as 'DD/MM/YYYY'
                    const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBeforeGAC)
                    coLine.deliveryDate = moment(coData.deliveryDate).format('DD/MM/YYYY')
                    coLine.exFactoryDate = exFactoryDate
                    coLine.salesPrice = coData.salesPrice
                    coLine.currency = coData.currency
                    coLine.destinations = coData.destinations
                    const request = { country: coData.destinations[0]?.name }
                    const address = await axios.post(`https://uniqlov2-backend.xpparel.com/api/address/getAddressInfoByCountry`, request);
                    const addressData = address.data.data[0];
                    buyerAddress = addressData?.buyerAddress ? addressData?.buyerAddress : 71;
                    deliveryAddress = addressData?.deliveryAddress
                    buyerValue1 = "UNQ-UNIQLO"
                    buyerValue2 = "UNI0003-UNIQLO CO LTD"
                    agent = "-NA"
                    pkgTerms = "STD-STD PACK"
                    paymentTerms = "048-TT 15 DAYS"
                }
                const apps = await driver.wait(until.elementLocated(By.xpath('//*[@id="mainContainer"]/div[1]')));
                const allApps = await apps.findElements(By.tagName('span'));
                for (const app of allApps) {
                    if ((await app.getAttribute('innerText')).includes('Style Orders')) {
                        await driver.executeScript('arguments[0].click();', app);
                        break;
                    }
                }
                await driver.wait(until.elementLocated(By.id('styleid2H')))
                await driver.findElement(By.id('styleid2H')).sendKeys(po.item_no);
                await driver.sleep(10000)
                await driver.wait(until.elementLocated(By.id('bgpset1')));
                const dropdownElement1 = await driver.findElement(By.id('bgpset1'));
                const dropdown1 = await driver.wait(until.elementIsVisible(dropdownElement1)).then(element => new Select(element))
                await dropdown1.selectByValue(buyerValue1)
                // await driver.executeScript(`arguments[0].value = '${buyerValue1}';`, buyerDropDown1)
                await driver.sleep(10000)
                await driver.wait(until.elementLocated(By.id('byr')));
                const dropdownElement2 = await driver.findElement(By.id('byr'));
                const dropdown2 = await driver.wait(until.elementIsVisible(dropdownElement2)).then(element => new Select(element))
                await dropdown2.selectByValue(buyerValue2)
                // await driver.executeScript(`arguments[0].value = '${buyerValue2}';`, dropdownElement2)
                await driver.sleep(5000)
                await driver.wait(until.elementLocated(By.id('CreateOrderID')))
                await driver.sleep(3000)
                await driver.findElement(By.id('CreateOrderID')).click();
                await driver.wait(until.elementLocated(By.id('bpo')))
                await driver.findElement(By.id('bpo')).clear();
                await driver.findElement(By.id('bpo')).sendKeys(coLine.buyerPo);
                await driver.wait(until.elementLocated(By.id('agnt')));
                const agentDropDown = await driver.findElement(By.id('agnt'));
                await driver.executeScript(`arguments[0].value = '${agent}';`, agentDropDown)
                await driver.wait(until.elementLocated(By.name('dojo.EXFACTORYDATE')));
                await driver.findElement(By.name('dojo.EXFACTORYDATE')).clear();
                await driver.findElement(By.name('dojo.EXFACTORYDATE')).sendKeys(coLine.exFactoryDate);
                await driver.wait(until.elementLocated(By.name('dojo.delydt')));
                await driver.findElement(By.name('dojo.delydt')).clear();
                await driver.findElement(By.name('dojo.delydt')).sendKeys(coLine.deliveryDate);
                await driver.wait(until.elementLocated(By.name('byd')));
                const dropdown = await driver.findElement(By.name('byd'));
                const options = await dropdown.findElements(By.tagName('option'));
                const optionValues = [];
                for (const option of options) {
                    const value = await option.getAttribute('value');
                    optionValues.push(value);
                }
                const number = optionValues.find(value => value.includes(buyerAddress)); // give the dynamic value here
                await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="cur"]')));
                const curDropdown = await driver.findElement(By.xpath('//*[@id="cur"]'));
                const cur = coLine.currency; // give the dynamic value here
                await driver.executeScript(`arguments[0].value = '${cur}';`, curDropdown);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="price"]')));
                await driver.findElement(By.xpath('//*[@id="price"]')).clear();
                await driver.findElement(By.xpath('//*[@id="price"]')).sendKeys(coLine.salesPrice);

                await driver.wait(until.elementLocated(By.id('packtrm')));
                const pkgTermsDropDown = await driver.findElement(By.id('packtrm'));
                await driver.executeScript(`arguments[0].value = '${pkgTerms}';`, pkgTermsDropDown)
                await driver.wait(until.elementLocated(By.id('ptr')));
                const ptrDropDown = await driver.findElement(By.id('ptr'));
                await driver.executeScript(`arguments[0].value = '${paymentTerms}';`, ptrDropDown)
                await driver.sleep(10000)
                for (let dest of coLine.destinations) {
                    const colorsContainer = await driver.wait(until.elementLocated(By.xpath('//*[@id="COContainer"]')));
                    const colorsTabs = await colorsContainer.findElements(By.tagName('span'));
                    for (const tab of colorsTabs) {
                        if ((await tab.getAttribute('innerText')) == dest.name) {
                            await driver.executeScript('arguments[0].click();', tab);
                            for (let [colorIndex, color] of dest.colors.entries()) {
                                for (let [sizeIndex, size] of color.sizes.entries()) {
                                    if (colorIndex === 0) {
                                        // Find all the labels in the second row.
                                        await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
                                        let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
                                        const fileteredElements: any[] = [];
                                        for (const labelElement of labelElements) {
                                            const ele = (await labelElement.getText())?.trim();
                                            ele.length > 0 ? fileteredElements.push(labelElement) : '';
                                        }
                                        const destToTabIndexMapping = {
                                            'UQAU': 4,
                                            'UQEU': 5,
                                            'UQJP': 2,
                                            'UQIN': 6,  // common case for 'UQIN' in the original conditions
                                            'UQMY': 3,
                                            'UQSG': 2
                                            // Add more mappings as needed
                                        };
                                        let tabIndex = destToTabIndexMapping[dest.name] || 1; // Default to 1 if no match
                                        // Additional conditions for 'UQIN' with specific item numbers
                                        if ((po.item_no === '691M' || po.item_no === '694M') && dest.name === 'UQIN') {
                                            tabIndex = 4;
                                        }
                                        if (po.item_no === '102P' && dest.name === 'UQIN') {
                                            tabIndex = 3;
                                        }
                                        const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
                                        const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
                                        await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
                                        const dropdown = await driver.findElement(By.id(`bydline/${string}`));
                                        const options = await dropdown.findElements(By.tagName('option'));
                                        const optionValues = [];
                                        for (const option of options) {
                                            const value = await option.getAttribute('value');
                                            optionValues.push(value);
                                        }
                                        const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
                                        await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
                                        // Find all the input fields in the first row.
                                        const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
                                        // Create a map of size labels to input fields.
                                        const sizeToInputMap = {};
                                        for (let i = 0; i < fileteredElements.length; i++) {
                                            const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
                                            if (label.length)
                                                sizeToInputMap[label] = inputElements[i];
                                        }
                                        const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
                                        if (inputField) {
                                            // Clear the existing value (if any) and fill it with the new price.
                                            await inputField.clear();
                                            await inputField.sendKeys(size.price);
                                        }
                                    }
                                    const inputId = `${size.name}:${color.name}:${dest.name}`.replace(/\*/g, '');
                                    const input = await driver.wait(until.elementLocated(By.id(inputId)))
                                    await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
                                }
                            }
                        }
                    }
                }
                await driver.sleep(10000)
                const element = await driver.findElement(By.id('OrderCreateID')).click();
                await driver.wait(until.alertIsPresent(), 10000);
                // Switch to the alert and accept it (click "OK")
                const alert = await driver.switchTo().alert();
                await alert.accept();
                if (await this.isAlertPresent(driver)) {
                    const alert = await driver.switchTo().alert();
                    const alertText = await alert.getText();
                    const update = await this.colineRepo.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Failed', errorMsg: alertText });
                    await alert.accept();
                    await driver.sleep(5000)
                    await driver.navigate().refresh();
                    await driver.quit();
                } else {
                    if (po.buyer == 'Uniqlo-U12') {
                        await driver.sleep(10000)
                        await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
                        const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
                        const coNo = await coNoElement.getAttribute('value');
                        await driver.sleep(5000)
                        const currentDate = new Date();
                        const day = currentDate.getDate().toString().padStart(2, '0');
                        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
                        const year = currentDate.getFullYear().toString().slice(-2);
                        const currentDateFormatted = `${day}-${month}-${year}`;
                        if (coNo) {
                            const update = await this.colineRepo.update({ buyerPo: po.buyer_po }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
                            // await driver.navigate().refresh();
                            await driver.sleep(10000)
                        } else {
                            const update = await this.colineRepo.update({ buyerPo: po.buyer_po }, { status: 'Failed' });
                            // await driver.navigate().refresh();
                            await driver.sleep(10000)
                        }
                    } else {
                        await driver.wait(until.elementLocated(By.xpath('//*[@id="form2"]/table/tbody/tr[2]/td/div/table/thead/tr/th[7]')), 10000);
                        const coNoElement = await driver.findElement(By.xpath('//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[14]/td[7]'));
                        const coNo = await coNoElement.getAttribute('innerText');
                        const currentDate = new Date();
                        const day = currentDate.getDate().toString().padStart(2, '0');
                        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
                        const year = currentDate.getFullYear().toString().slice(-2);
                        const currentDateFormatted = `${day}-${month}-${year}`;
                        if (coNo) {
                            const update = await this.colineRepo.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
                            // await driver.navigate().refresh();
                            await driver.sleep(10000)
                        } else {
                            const update = await this.colineRepo.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Failed' });
                            // await driver.navigate().refresh();
                            await driver.sleep(10000)
                        }
                    }
                }
            }
            return new CommonResponseModel(true, 1, `COline created successfully`)
        } catch (err) {
            console.log(err, 'error');
            return new CommonResponseModel(false, 0, err)
        }
        // finally {
        //     driver.quit()
        // }
    }

    async isAlertPresent(driver) {
        try {
            await driver.switchTo().alert();
            return true;
        } catch (e) {
            return false;
        }
    }

    async getPhaseMonthExcelDataNew(req: YearReq): Promise<CommonResponseModel>{
        const data1 = await this.ordersRepository.getData1New(req)
        const data2 = await this.ordersRepository.getFinalNewData(req)
        const dataMap = new Map<string, PhaseWiseReq >();
        const dataMap2 = new Map<string, PhaseWiseReq >();

        for(const rec of data2){
            if(!dataMap.has(rec.prod_plan_type)){
                dataMap.set(rec.prod_plan_type, new PhaseWiseReq(rec.prod_plan_type,[]))
            }
            const item=dataMap.get(rec.prod_plan_type).itemData
            if(rec.prod_plan_type != null){
                if(req.tabName == 'ExFactory'){
                    item.push(new itemData(rec.exfMonth,rec.exfPcs,rec.exfCoeff))
                }
                if(req.tabName === 'WareHouse' ){
                    item.push(new itemData(rec.whMonth,rec.whPcs,rec.whCoeff))
                }
            }
        }
        const detailedarray: PhaseWiseReq[] = Array.from(dataMap.values())
        // for(const rec of data1){
        //     if(!dataMap2.has(rec.prod_plan_type)){
        //         dataMap2.set(rec.prod_plan_type, new PhaseWiseReq(rec.prod_plan_type,[]))
        //     }
        //     const item=dataMap2.get(rec.prod_plan_type).itemData
        //     if(rec.prod_plan_type != null){
        //         if(req.tabName == 'ExFactory'){
        //             item.push(new itemData(rec.exfMonth,rec.exfper,rec.exfcoefper))
        //         }
        //         if(req.tabName === 'WareHouse' ){
        //             item.push(new itemData(rec.whMonth,rec.whper,rec.whcoefper))
        //         }
        //     }
        // }

        // console.log(detailedarray,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        const detaledArray2:PhaseWiseReq[] = Array.from(dataMap2.values())
        console.log(detaledArray2,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

        const finalArray =[...detailedarray,...detaledArray2]
        return new CommonResponseModel(true,1,'Data Retrived Sucessfully',detailedarray)
    }


}

