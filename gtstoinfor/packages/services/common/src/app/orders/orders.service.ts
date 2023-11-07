import { Injectable } from '@nestjs/common';
import { CoeffDataDto, COLineRequest, CommonResponseModel, FileStatusReq, FileTypeDto, FileTypesEnum, ItemDataDto, MonthAndQtyModel, MonthWiseDataModel, MonthWiseDto, MonthWiseExcelDataModel, PcsDataDto, PhaseAndQtyModel, PhaseWiseDataModel, PhaseWiseExcelDataModel, VersionAndQtyModel, VersionDataModel, YearReq, orderColumnValues, ProductionOrderColumns, TrimOrderColumns, SeasonWiseRequest, CompareOrdersFilterReq, orders, CoLineStatusReq, TrimOrdersReq, ordersPlanNo, RequiredColumns, ordersMailFileStatusArrayReq } from '@project-management-system/shared-models';
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
import { find } from 'rxjs';
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
import {readSheetNames} from 'read-excel-file'
const csv = require('csv-parser');
const Excel = require('exceljs');
import { CoLine } from './entities/co-line.entity';
import { CoLineRepository } from './repository/co-line-repo';
let moment = require('moment');
moment().format();
import * as nodemailer from 'nodemailer';

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
        

    ) { 
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'uma.boddeda@schemaxtech.com',
              pass: 'nizt qqgq lech eoyj',
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
            if(difference.length > 0){
                await transactionManager.releaseTransaction()
                return new CommonResponseModel(false,1110,'Please Upload Correct Excel')
            }
            for (const data of convertedData) {
                let dtoData
                if(data.Order_No != null){
                    dtoData = new TrimOrderDto(null,data.Order_No,data.Year,data.Revision_No,data.Planning_Ssn,data.Global_Business_Unit,data.Business_Unit,data.Item_Brand,data.Department,moment(data.Revised_Date).format('YYYY-MM-DD'),data.Document_Status,data.Answered_Status,data.Vendor_Person_in_Charge,moment(data.Decision_Date).format('YYYY-MM-DD'),data.Payment_Terms,moment(data.Contracted_ETD).format('YYYY-MM-DD'),moment(data.ETA_WH).format('YYYY-MM-DD'),data.Approver,moment(data.Approval_Date).format('YYYY-MM-DD'),data.Order_Conditions,data.Remark,data.Raw_Material_CodeFR,data.Supplier_Raw_Material_Code,data.Supplier_Raw_Material,data.Vendor_Code,data.Vendor,data.Management_Factory_Code,data.Management_Factory,data.Branch_Factory_Code,data.Branch_Factory,data.Order_Plan_Number,data.Item_Code,data.Item,data.Representative_Sample_Code,data.Sample_Code,data.Color_Code,data.Color,data.Pattern_Dimension_Code,data.Size_Code,data.Size,(data.Order_Qtypcs).toString().replace(/,/g,''),data.Arrangement_By,data.Trim_Description,data.Trim_Item_No,data.Trim_Supplier,'bidhun',null,null,null,null,id,month)
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

    async getOrdersData(req: orders): Promise<CommonResponseModel> {
        // console.log(req,'req')
        const details = await this.ordersRepository.getOrdersData(req)
        if (details)
            return new CommonResponseModel(true, 1, 'data retrived', details)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getQtyChangeData(req:CompareOrdersFilterReq): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getQtyChangeData(req)
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getQtyDifChangeData(req:CompareOrdersFilterReq): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getItemWiseQtyChangeData(req)
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
                    year:dtoData.year,planningSsn:dtoData.planningSsn,biz:dtoData.biz,coreCategory:dtoData.coreCategory,planningSum:dtoData.planningSum,coeff:dtoData.coeff,publishFlagForFactory:dtoData.publishFlagForFactory,orderPlanQty:dtoData.orderPlanQty,orderPlanQtyCoeff:dtoData.orderPlanQtyCoeff,prodPlanType:dtoData.prodPlanType,wh:dtoData.wh,exfEtd:dtoData.exfEtd,etdWh:dtoData.etdWh,sample:dtoData.sample,version:dtoData.version,fileId: dtoData.fileId,updatedUser:dtoData.createdUser
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

    async updatePath(filePath: string, filename: string, month: number,fileType:string,uploadType:string): Promise<CommonResponseModel> {
        const entity = new FileUploadEntity()
        entity.fileName = filename;
        entity.filePath = filePath;
        entity.month = 9;
        entity.fileType = fileType;
        entity.uploadType = uploadType
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
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status, isActive: false, createdUser: req.userName,failedReason:req.failedReason,columns:req.columns });
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

    async getVersionWiseData(req:VersionDataModel): Promise<CommonResponseModel> {
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
    
    async getTrimOrdersData(req:TrimOrdersReq): Promise<CommonResponseModel> {
        const data = await this.trimOrderRepo.getTrimOders(req)
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
    async getMonthWiseReportData(req:YearReq): Promise<CommonResponseModel> {

        const data = await this.ordersRepository.getMonthWiseReportData(req);
        
        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found');
        }
    
        const DateMap = new Map<string, ItemDataDto>();  
        const monthWiseInstances: MonthWiseDto[] = [];      
        for (const rec of data) {
            
                if(req.tabName === 'ExFactory'){
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
               { name: 'In Pcs',
                janPcs: rec.janPcsExf,
                febPcs: rec.febPcsExf,
                marPcs: rec.marPcsExf,
                aprPcs: rec.aprPcsExf,
                mayPcs: rec.mayPcsExf,
                junPcs: rec.julPcsExf,
                julPcs: rec.julPcsExf,
                augPcs: rec.augPcsExf,
                sepPcs: rec.sepPcsExf,
                octPcs: rec.octPcsExf,
                novPcs: rec.novPcsExf,
                decPcs: rec.decPcsExf,}
            )
              coeff.push({
                name: 'In Coeff',
                janCoeff: rec.janCoeffExf,
                febCoeff: rec.febCoeffExf,
                marCoeff: rec.marCoeffExf,
                aprCoeff: rec.aprCoeffExf,
                mayCoeff: rec.mayCoeffExf,
                junCoeff: rec.julCoeffExf,
                julCoeff: rec.julCoeffExf,
                augCoeff: rec.augCoeffExf,
                sepCoeff: rec.sepCoeffExf,
                octCoeff: rec.octCoeffExf,
                novCoeff: rec.novCoeffExf,
                decCoeff: rec.decCoeffExf,
              })
        const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff,rec.ExfPcsTotal,rec.ExfCoeffTotal);
                monthData.push(monthWiseInstance); 
            }
            if(req.tabName === 'WareHouse'){
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
                  { name: 'In Pcs',
                   janPcs: rec.janPcsWh,
                   febPcs: rec.febPcsWh,
                   marPcs: rec.marPcsWh,
                   aprPcs: rec.aprPcsWh,
                   mayPcs: rec.mayPcsWh,
                   junPcs: rec.julPcsWh,
                   julPcs: rec.julPcsWh,
                   augPcs: rec.augPcsWh,
                   sepPcs: rec.sepPcsWh,
                   octPcs: rec.octPcsWh,
                   novPcs: rec.novPcsWh,
                   decPcs: rec.decPcsWh,}
               )
                 coeff.push({
                   name: 'In Coeff',
                   janCoeff: rec.janCoeffWh,
                   febCoeff: rec.febCoeffWh,
                   marCoeff: rec.marCoeffWh,
                   aprCoeff: rec.aprCoeffWh,
                   mayCoeff: rec.mayCoeffWh,
                   junCoeff: rec.julCoeffWh,
                   julCoeff: rec.julCoeffWh,
                   augCoeff: rec.augCoeffWh,
                   sepCoeff: rec.sepCoeffWh,
                   octCoeff: rec.octCoeffWh,
                   novCoeff: rec.novCoeffWh,
                   decCoeff: rec.decCoeffWh,
                 })
                  const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff,rec.WhPcsTotal,rec.WhCoeffTotal);
                   monthData.push(monthWiseInstance); 
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
        let query = `SELECT planning_ssn as plannedSeason,year,planning_sum as itemName,SUM(january) AS january,SUM(february) AS february,SUM(march) AS march,SUM(april) AS april,SUM(may) AS may,SUM(june) AS june,SUM(july) AS july,SUM(august) AS august,SUM(september) AS september,SUM(october) AS october,SUM(november) AS november,SUM(december) AS december,SUM(exfJan) AS exfJan,SUM(exfFeb) AS exfFeb,SUM(exfMarch) AS exfMarch,SUM(exfApril) AS exfApril,SUM(exfMay) AS exfMay,SUM(exfJune) AS exfJune,SUM(exfJuly) AS exfJuly,SUM(exfAug) AS exfAug,SUM(exfSep) AS exfSep,SUM(exfOct) AS exfOct,SUM(exfNov) AS exfNov,SUM(exfDec) AS exfDec,
        SUM(january + february + march + april + may + june + july + august + september + october + november + december) AS whTotal,
        SUM(exfJan + exfFeb + exfMarch + exfApril + exfMay + exfJune + exfJuly + exfAug + exfSep + exfOct + exfNov + exfDec) AS exfTotal
      FROM (
        SELECT planning_ssn, year, planning_sum,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 1 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 1 OR MONTH(wh)= 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS january,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 2 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 2 OR MONTH(wh)= 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS february,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 3 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 3 OR MONTH(wh)= 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS march,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 4 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 4 OR MONTH(wh)= 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS april,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 5 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 5 OR MONTH(wh)= 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS may,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 6 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 6 OR MONTH(wh)= 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS june,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 7 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 7 OR MONTH(wh)= 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS july,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 8 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 8 OR MONTH(wh)= 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS august,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 9 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 9 OR MONTH(wh)= 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS september,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 10 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 10 OR MONTH(wh)= 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS october,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 11 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 11 OR MONTH(wh)= 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS november,
        SUM(CASE WHEN MONTH(STR_TO_DATE(wh, '%m/%d')) = 12 OR MONTH(STR_TO_DATE(wh, '%m-%d')) = 12 OR MONTH(wh)= 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS december,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 1 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 1 OR MONTH(exf)= 1 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfJan,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 2 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 2 OR MONTH(exf)= 2 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfFeb,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 3 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 3 OR MONTH(exf)= 3 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfMarch,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 4 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 4 OR MONTH(exf)= 4 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfApril,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 5 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 5 OR MONTH(exf)= 5 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfMay,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 6 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 6 OR MONTH(exf)= 6 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfJune,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 7 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 7 OR MONTH(exf)= 7 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfJuly,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 8 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 8 OR MONTH(exf)= 8 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfAug,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 9 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 9 OR MONTH(exf)= 9 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfSep,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 10 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 10 OR MONTH(exf)= 10 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfOct,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 11 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 11 OR MONTH(exf)= 11 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfNov,
        SUM(CASE WHEN MONTH(STR_TO_DATE(exf, '%m/%d')) = 12 OR MONTH(STR_TO_DATE(exf, '%m-%d')) = 12 OR MONTH(exf)= 12 THEN REPLACE(order_plan_qty,',','') ELSE 0 END) AS exfDec
        FROM orders
        GROUP BY planning_ssn, planning_sum
      ) AS subquery
      WHERE 1 = 1`
    // if (req.itemCode) {
    //     query = query + ` AND item_cd = "${req.itemCode}"`
    //     }
    if (req.itemName) {
        query = query + ` AND planning_sum = "${req.itemName}"`;
    }
    query = query + ` GROUP BY planning_ssn, planning_sum ORDER BY planning_sum`;
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
        const orderQty = rec.order_plan_qty.replace(/,/g, '')
            const coeffQty = rec.order_plan_qty_coeff.replace(/,/g,'')
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
    janPcs: rec.whMonth === 1 ? Number(orderQty) :Number(0),
    febPcs: rec.whMonth === 2 ? Number(orderQty) :Number(0),
    marPcs: rec.whMonth === 3 ? Number(orderQty) :Number(0),
    aprPcs: rec.whMonth === 4 ? Number(orderQty) :Number(0),
    mayPcs: rec.whMonth === 5 ? Number(orderQty) :Number(0),
    junPcs: rec.whMonth === 6 ? Number(orderQty) :Number(0),
    julPcs: rec.whMonth === 7 ? Number(orderQty) :Number(0),
    augPcs: rec.whMonth === 8 ? Number(orderQty) :Number(0),
    sepPcs: rec.whMonth === 9 ? Number(orderQty) :Number(0),
    octPcs: rec.whMonth === 10 ? Number(orderQty) :Number(0),
    novPcs: rec.whMonth === 11 ? Number(orderQty) :Number(0),
    decPcs: rec.whMonth === 12 ? Number(orderQty) :Number(0),}
        )
        coeff.push({
            name: 'In Coeff',
            janCoeff: rec.whMonth === 1 ? Number(coeffQty) :Number(0),
            febCoeff: rec.whMonth === 2 ? Number(coeffQty) :Number(0),
            marCoeff: rec.whMonth === 3 ? Number(coeffQty) :Number(0),
            aprCoeff: rec.whMonth === 4 ? Number(coeffQty) :Number(0),
            mayCoeff: rec.whMonth === 5 ? Number(coeffQty) :Number(0),
            junCoeff: rec.whMonth === 6 ? Number(coeffQty) :Number(0),
            julCoeff: rec.whMonth === 7 ? Number(coeffQty) :Number(0),
            augCoeff: rec.whMonth === 8 ? Number(coeffQty) :Number(0),
            sepCoeff: rec.whMonth === 9 ? Number(coeffQty) :Number(0),
            octCoeff: rec.whMonth === 10 ? Number(coeffQty) :Number(0),
            novCoeff: rec.whMonth === 11 ? Number(coeffQty) :Number(0),
            decCoeff: rec.whMonth === 12 ? Number(coeffQty) :Number(0),
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
    const data = await this.ordersRepository.getMonthWiseReportData(req);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }

    return new CommonResponseModel(true, 1, 'data retrieved', data);
}

async getExfactoryComparisionExcelData(req:YearReq): Promise<CommonResponseModel> {
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

//cron job to fetch mails autmatically once per a day
async processEmails():Promise<CommonResponseModel> {
    const promiseA = () =>  new Promise((resolve, reject) => {
    // Set the environment variable to allow TLS
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    let filesArray = []

    const dns = require('dns');
    dns.lookup('zimbra.xmission.com', (err, addresses) => {
        console.log(addresses,'---')
      if (err) {
        console.error(`DNS lookup error: ${err}`);
      } else {
        console.log(`Resolved addresses: ${addresses}`);
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
        const searchCriteria = [['SUBJECT', 'UNIQLO ORDER MANAGEMENT'],['FROM', 'karthikeyan.nallamuthu@shahi.co.in']];
        // const searchCriteria = [['SUBJECT', 'testing mail'],['FROM', 'uma.boddeda@schemaxtech.com']];

        imap.search(searchCriteria,(err, results) => {
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

              attachments.forEach(async(attachment) => {
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
      console.log();
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
    console.log(testt,'ooooo')


    // console.log(filesArray)
            // this.readCell(savePath + filename,filename)
        })
        const getAttachments:any = await promiseA()
        return new CommonResponseModel(true,2,'',getAttachments)

  }

//   async getFiles 
  async readCell(filepath,filename):Promise<CommonResponseModel> {
    try{
        let filesArray = []
        // console.log(req,'filesdataaaa')
        const fs = require('fs');
        const files = fs.readdirSync('./upload-files/');
        // console.log(files,'filesssss')
        // const req = [{filePath:'./upload-files/pro_orders_1.xlsx',fileName:'pro_orders_1.xlsx'},{filePath:'./upload-files/projection_orders_1.xlsx',fileName:'projection_orders_1.xlsx'}]
       const uplodedFiles = await this.getUplodedFilesInfo()
       const difference = files.filter((element) => !uplodedFiles.data.includes(element))
       console.log(difference,'****')
       if(difference.length == 0){
            // filesArray.push(new ordersMailFileStatusArrayReq(files,'Failed','Files with same name already exists!','-'))
            return new CommonResponseModel(false,0,'No new files are added')
        } else{
                    for(const filerec of difference){
                        const filename = filerec
                        const filepath = './upload-files/'+filerec
                
                        // // filename = 'pro_order_sep3.xlsx';
                            // console.log(filename.split('.').pop(),'extension')
                            // console.log(filename,'filename')
                            const promiseA = () => new Promise((resolve, reject) => {
                                xlsxFile(filepath, { getSheets: true }).then((sheets:any[])=>{
                                    resolve(sheets)
                                });
                            })
                            const sheets:any = await promiseA()
                
                
                
                            const promise = () => new Promise((resolve, reject) => {
                                if(filename.split('.').pop() == 'csv'){
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
                                }else if(filename.split('.').pop() == 'xlsx'){ 
                                    // xlsxFile(filepath, { getSheets: true }).then((sheets)=>{
                                    //     resolve(sheets)
                                    // });
                                    // const sheets = await promise()
                                    // console.log('hhhhhoo',sheets)
                                    let finalSheetName = ''
                                     for(const sheetname of sheets){
                                        if(sheetname.name == 'Production Plan Rawdata Export' || sheetname.name =='RawData' || sheetname.name =='Rawdata'){
                                            finalSheetName = sheetname.name
                                            break
                                        } else{
                                            continue
                                        }
                                    }
                                    if(finalSheetName){
                
                                        xlsxFile(filepath,{sheet:finalSheetName},{transformData(data){
                                            // console.log(data)
                                            // data.slice(0,3)
                                            console.log(data,'-----------data')
                                            return data
                                        }})
                                        
                                          .then((rows) => {
                                            let columnNames
                                            const dataArray = []
                                            while(rows.length){
                                                columnNames = rows.shift(); // Separate first row with column names
                                                if(columnNames[0] != null){
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
                                    }else{
                                        filesArray.push(new ordersMailFileStatusArrayReq(filename,'Failed',`Sheet name doesn't match`,'-'))
                                       resolve(null)
                                    }
                                }else{
                                    
                                }
                            })
                            const dataArray = await promise();
                        
                            if(dataArray){
                                
                                const saveFilePath = await this.updatePath(filepath,filename,null,FileTypesEnum.PROJECTION_ORDERS,'Email')
                                // console.log(filepath,'jjjjj')
                                // console.log(filename,'jjjjj')
                                if(saveFilePath.status){
                                    // console.log(dataArray,'------------------------------------')
                                    const saveProjOrders = await this.saveOrdersData(dataArray,saveFilePath.data.id,9)
                                    // console.log(saveProjOrders,'saveProjOrders')
                                    let req = new FileStatusReq();
                                    req.fileId = saveFilePath.data.id;
                                    req.userName = 'Bidhun'
                                    if(saveProjOrders.status){
                                        req.status = 'Success';
                                    }else{
                                        req.failedReason = saveProjOrders.internalMessage
                                        if(saveProjOrders?.data){
                                            // console.log(saveProjOrders.data,'hhhhh')
                                            req.columns = saveProjOrders.data
                                            // const resData = saveProjOrders.data
                                        }else{
                                            req.columns = ''
                                        }
                                        req.status = 'Failed';
                                    }
                                    // console.log(req,'valuuuuu')
                                    const updateFileStatus = await this.updateFileStatus(req)
                                    filesArray.push(new ordersMailFileStatusArrayReq(filename,req.status,req.status === 'Failed' ? req.failedReason : '' , req.status === 'Failed' ? req.columns : ''))
                                }else{
                                    // return false
                                    filesArray.push(new ordersMailFileStatusArrayReq(filename,'Failed',saveFilePath.internalMessage,'-'))
                                }
                                // return dataArray
                            }else{
                                // return dataArray
                            }
                    }
                
                    const sendMail = this.sendMail('karthikeyan.nallamuthu@shahi.co.in','Uploded Files Status',filesArray)
                    if(sendMail){
                        return new CommonResponseModel(true,1,'',filesArray)
                    } else{
                        return new CommonResponseModel(true,1,'Something went wrong in sending mail',filesArray)
                    }
                }

    } catch(err){
        throw err
    }
 
    
    }


async getMonthlyComparisionData(req:YearReq): Promise<CommonResponseModel> {
    // console.log(req,'-------')
    const data = await this.ordersChildRepo.getMonthlyComparisionData(req);
    
    if (data.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
    }

    const DateMap = new Map<string, ItemDataDto>();  
    for (const rec of data) {
        
            if(req.tabName === 'ExFactory'){
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
           { name: 'In Previous',
            janPcs: rec.janExfPre,
            febPcs: rec.febExfPre,
            marPcs: rec.marExfPre,
            aprPcs: rec.aprExfPre,
            mayPcs: rec.mayExfPre,
            junPcs: rec.julExfPre,
            julPcs: rec.julExfPre,
            augPcs: rec.augExfPre,
            sepPcs: rec.sepExfPre,
            octPcs: rec.octExfPre,
            novPcs: rec.novExfPre,
            decPcs: rec.decExfPre,}
        )
          coeff.push({
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
          })
        
    const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff,rec.totalExfPre,rec.totalExfLat,rec.order_plan_number);
            monthData.push(monthWiseInstance); 
        }
        if(req.tabName === 'WareHouse'){
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
              { name: 'In Previous',
               janPcs: rec.janWhPre,
               febPcs: rec.febWhPre,
               marPcs: rec.marWhPre,
               aprPcs: rec.aprWhPre,
               mayPcs: rec.mayWhPre,
               junPcs: rec.julWhPre,
               julPcs: rec.julWhPre,
               augPcs: rec.augWhPre,
               sepPcs: rec.sepWhPre,
               octPcs: rec.octWhPre,
               novPcs: rec.novWhPre,
               decPcs: rec.decWhPre,}
           )
             coeff.push({
               name: 'In Latest',
               janCoeff: rec.janWhLat,
               febCoeff: rec.febWhLat,
               marCoeff: rec.marWhLat,
               aprCoeff: rec.aprWhLat,
               mayCoeff: rec.mayWhLat,
               junCoeff: rec.julWhLat,
               julCoeff: rec.julWhLat,
               augCoeff: rec.augWhLat,
               sepCoeff: rec.sepWhLat,
               octCoeff: rec.octWhLat,
               novCoeff: rec.novWhLat,
               decCoeff: rec.decWhLat,
             })
              const monthWiseInstance = new MonthWiseDto(rec.prod_plan_type, pcs, coeff,rec.totalWhPre,rec.totalWhLat,rec.order_plan_number);
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
async getOrderNumberDropDownInCompare():Promise<CommonResponseModel>{
    try{
        const data = await this.ordersChildRepo.getOrderNumbers()
        if(data){
            return new CommonResponseModel(true,1,'Data retrieved',data)
        } else{
            return new CommonResponseModel(false,1,'No data found')
        }

    } catch(err){
        throw err
    }
}
async getMonthlyComparisionDate(req:YearReq):Promise<CommonResponseModel>{
    try{
        const data = await this.ordersChildRepo.getMonthlyComparisionDate(req)
        if(data){
            return new CommonResponseModel(true,1,'Data retrieved',data)
        } else{
            return new CommonResponseModel(false,1,'No data found')
        }

    } catch(err){
        throw err
    }
}

async createCOLineInternal(req:COLineRequest):Promise<CommonResponseModel>{
    try{
        const entity = new CoLine()
        entity.itemNumber = req.itemNumber;
        entity.orderNumber = req.orderNumber;
        entity.colorCode = req.colorCode;
        entity.color = req.color;
        entity.sizeCode = req.sizeCode;
        entity.size = req.size;
        entity.itemCode = req.itemCode;
        entity.item = req.item;
        entity.destination = req.destination;
        entity.company_CONO = req.company_CONO;
        entity.temporaryOrderNumber_ORNO = req.temporaryOrderNumber_ORNO;
        entity.itemNumber_ITNO = req.itemNumber_ITNO;
        entity.orderedQuantity_ORQT = req.orderedQuantity_ORQT;
        entity.warehouse_WHLO = req.warehouse_WHLO;
        entity.requestedDeliveryDate_DWDT = req.requestedDeliveryDate_DWDT;
        entity.jointDeliveryDate_JDCD = req.jointDeliveryDate_JDCD;
        entity.customersOrderNumber_CUPO = req.customersOrderNumber_CUPO;
        entity.salesPrice_SAPR = req.salesPrice_SAPR;
        entity.discountAmount1_DIA1 = req.discountAmount1_DIA1;
        entity.discountAmount2_DIA2 = req.discountAmount2_DIA2;
        entity.discountAmount3_DIA3 = req.discountAmount3_DIA3;
        entity.discountAmount4_DIA4 = req.discountAmount4_DIA4;
        entity.discountAmount5_DIA5 = req.discountAmount5_DIA5;
        entity.discountAmount6_DIA6 = req.discountAmount6_DIA6;
        entity.deliverySpecification_DLSP = req.deliverySpecification_DLSP;
        entity.deliverySpecificationText_DLSX = req.deliverySpecificationText_DLSX;
        entity.oldCFIN_CFXX = req.oldCFIN_CFXX;
        entity.simulationsNumber_ECVS = req.simulationsNumber_ECVS;
        entity.alternateUM_ALUN = req.alternateUM_ALUN;
        entity.confirmedDateOfDelivery_CODT = req.confirmedDateOfDelivery_CODT;
        entity.itemDescription_ITDS = req.itemDescription_ITDS;
        entity.discountPercent1_DIP1 = req.discountPercent1_DIP1;
        entity.discountPercent2_DIP2 = req.discountPercent2_DIP2;
        entity.discountPercent3_DIP3 = req.discountPercent3_DIP3;
        entity.discountPercent4_DIP4 = req.discountPercent4_DIP4;
        entity.discountPercent5_DIP5 = req.discountPercent5_DIP5;
        entity.discountPercent6_DIP6 = req.discountPercent6_DIP6;
        entity.aliasQualifier_ALWT = req.aliasQualifier_ALWT;
        entity.blanketAgreementNumber_AGNO = req.blanketAgreementNumber_AGNO;
        entity.container_CAMU = req.container_CAMU;
        entity.projectNumber_PROJ = req.projectNumber_PROJ;
        entity.projectElement_ELON = req.projectElement_ELON;
        entity.customerOrderNumber_CUOR = req.customerOrderNumber_CUOR;
        entity.customersPackagingIdentity_CUPA = req.customersPackagingIdentity_CUPA;
        entity.requestedDeliveryTime_DWHM = req.requestedDeliveryTime_DWHM;
        entity.standardQuantity_D1QT = req.standardQuantity_D1QT;
        entity.packaging_PACT = req.packaging_PACT;
        entity.aliasNumber_POPN = req.aliasNumber_POPN;
        entity.salesPriceQuantity_SACD = req.salesPriceQuantity_SACD;
        entity.saledPriceUOM_SPUN = req.saledPriceUOM_SPUN;
        entity.packagingTerms_TEPA = req.packagingTerms_TEPA;
        entity.EDIFACTPrice_EDFP = req.EDIFACTPrice_EDFP;
        entity.requestedDeliveryDate_DWDZ = req.requestedDeliveryDate_DWDZ;
        entity.requestedDeliveryTime_DWHZ = req.requestedDeliveryTime_DWHZ;
        entity.confirmedDeliveryTime_COHM = req.confirmedDeliveryTime_COHM;
        entity.confirmedDeliveryDate_CODZ = req.confirmedDeliveryDate_CODZ;
        entity.confirmedDeliveryTime_COHZ = req.confirmedDeliveryTime_COHZ;
        entity.mainProduct_HDPR = req.mainProduct_HDPR;
        entity.addressNumber_ADID = req.addressNumber_ADID;
        entity.lineSuffix_CUSX = req.lineSuffix_CUSX;
        entity.statusDiscount_DICI = req.statusDiscount_DICI;
        entity.trimOrderId = req.trimOrderId;
        const save = await this.colineRepo.save(entity)
        if(save){
            return new CommonResponseModel(true,1,'Created Successfully',save)
        } else{
            return new CommonResponseModel(false,0,'Something went wrong')
        }

    } catch(err){
        throw err
    }
}

async updateStatusAfterCoLineCreationInM3(req:CoLineStatusReq):Promise<CommonResponseModel>{
    try{
        const statusUpdate = await this.colineRepo.update({coLineId : req.coLineId},{status:req.status})
        if(statusUpdate.affected){
            return new CommonResponseModel(true,1,'Status Updated')
        } else{
            return new CommonResponseModel(false,0,'Something went erong in status update')
        }

    } catch(err){
        throw(err)
    }
}
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
    if(req.tabName === 'ExFactory'){
    
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
    if(req.tabName ==='WareHouse'){
    
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
async getComparisionphaseData(req:YearReq):Promise<CommonResponseModel>{
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
        
if(req.tabName === 'ExFactory'){
   
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
if(req.tabName ==='WareHouse'){
   
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
async getPhaseMonthExcelData(req:YearReq):Promise<CommonResponseModel>{
    try{
        const data = await this.ordersRepository.getdata(req);
        const data1 = await this.ordersRepository.getdata1(req);
        if (data && data1) {
           
            const mergedData = [...data, ...data1];

              

            // Log the merged data for debugging
            // console.log('Merged Data:', mergedData);

            return new CommonResponseModel(true, 1, 'Data retrieved', mergedData);
        } else {
            return new CommonResponseModel(false, 1, 'No data found');
        }
    } catch(err){
        throw err
    }
}
async getComparisionphaseExcelData(req: YearReq): Promise<CommonResponseModel> {
    try {
        const data = await this.ordersChildRepo.getComparisionphaseData(req);
        const data1 = await this.ordersChildRepo.getComparisionphaseData1(req);
    if (data && data1) {
            const mergedData = [...data1, ...data];
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
async getversion(req:ordersPlanNo):Promise<CommonResponseModel>{
// console.log(req,'serviceeeeeeeeeeeeeee');

    try{
        const data = await this.orderDiffRepo.getversions(req)
        if(data){
            return new CommonResponseModel(true,1,'Data retrieved',data)
        } else{
            return new CommonResponseModel(false,1,'No data found')
        }

    } catch(err){
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

async getYearDropdown():Promise<CommonResponseModel>{
    try{
        const info = await this.ordersRepository.getYearDropdown()
        if(info.length >0){
            return new CommonResponseModel(true,1,'Data retrieved',info)
        } else{
            return new CommonResponseModel(false,0,'No dat found')
        }

    }catch(err){
        throw err
    }
}

async getLatestPreviousFilesData():Promise<CommonResponseModel>{
    try{
        const info = await this.fileUploadRepo.getLatestPreviousFilesData()
        if(info.length >0){
            return new CommonResponseModel(true,1,'Data retrieved',info)
        } else{
            return new CommonResponseModel(false,0,'No dat found')
        }

    } catch(err){
        throw err
    }
}

async sendMail(to: string, subject: string, message : any[]) {
    let content = message.reduce(function(a, b) {
        return a + '<tr bgcolor="#ffffff"><td>' + b.fileName + '</a></td><td>' + b.status + '</td><td>' + b.reason + '</td><td>' + b.columns + '</td></tr>';
    }, '');
    const sendMail = await this.transporter.sendMail({
      from: 'uma.boddeda@schemaxtech.com',
      to,
      subject,
      text:'',
      html: '<div><table cellspacing="3" bgcolor="#000000"><thead><tr bgcolor="#ffffff"><th>File Name</th><th width="25%">Status</th><th>Reason</th><th>Columns</th></tr></thead><tbody>' + 
      content + '</tbody></table></div>',
    context:{

    }
    });
    console.log(sendMail,'---------------sendmail')
    return sendMail
  }

  async saveOrdersData(formData: any, id: number, months: number):Promise<CommonResponseModel>{
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try{
            await transactionManager.startTransaction()
            const flag = new Set()
            const dtoArray:SaveOrderDto[]=[]
            for(const obj of formData){
                const columnArray = [];
                const updatedObj:any = {};
                for (const key in obj) {
                    const newKey = key.replace(/\s/g, '_').replace(/[\(\)]/g, '').replace(/-/g, '_').replace(/:/g,'_').replace(/[*]/g,'_').replace(/=/g,'_').replace(/”/g,'').replace(/~/g,'').replace(/[/]/g,'').replace(/“/g,'').replace(/�/g,'').replace(/'/g,'')
                    const newKey1 = newKey.replace(/__/g,'_');
                    columnArray.push(newKey1)
                    const value = obj[key];
                    if (value === "") {
                        updatedObj[newKey1] = null;
                    } else {
                        updatedObj[newKey1] = value;                        
                    }
                }
                const missedColumns = new Set<string>();
                for(const requiredKey of RequiredColumns){
                    if(!(columnArray.includes(requiredKey))){
                        missedColumns.add(requiredKey)
                    }
                }
                if((missedColumns.size !==0 )){
                    await transactionManager.releaseTransaction()
                    return new CommonResponseModel(false,24,'Required Columns missed',Array.from(missedColumns));
                }
                let dtoData: SaveOrderDto;
                if(updatedObj.Order_Plan_Number !== null){
                    dtoData = new SaveOrderDto(null,updatedObj.Year,updatedObj.Planning_Ssn,updatedObj.Biz,updatedObj.Core_Category,updatedObj.Planning_Sum,updatedObj.Coeff,updatedObj.Publish_Flag_for_Factory,updatedObj.Order_Plan_Number,(updatedObj.Order_Plan_Qty).toString().replace(/,/g,''),(updatedObj.Order_Plan_QtyCoeff)?.toString().replace(/,/g,''),updatedObj.Prod_Plan_Type,updatedObj.WH ? moment(updatedObj.WH).format('MM-DD') : null,updatedObj.EXF_ETD,updatedObj.ETD_WH,updatedObj.Sample,updatedObj.EXF ? moment(updatedObj.EXF).format('MM-DD'): null,id,null,'bidhun')
                    let newDate
                    if(dtoData.exf == null && dtoData.publishFlagForFactory !== 'NotPub'){
                    let inputDate = dtoData.wh ? moment(dtoData.wh).format('MM-DD') : null;
                    if(inputDate === null){
                        await transactionManager.releaseTransaction()
                        return new CommonResponseModel(false,101,'Null value in WH column')
                    } else{

                        let parts = inputDate.split('-');
                        let months = parseInt(parts[0], 10);
                        let day = parseInt(parts[1], 10);
                        let numberOfDays = Number(dtoData.exfEtd);
                        let dateObject = new Date(2023, months - 1, day);
                        dateObject.setDate(dateObject.getDate() - numberOfDays);
                        newDate = moment(dateObject).format('MM-DD');
                        dtoData.exf=newDate;
                    }
                    }
                } else{
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
                    if(details){
                        const updateOrder = await transactionManager.getRepository(OrdersEntity).update({ orderPlanNumber: dtoData.orderPlanNumber },{
                            year:dtoData.year,planningSsn:dtoData.planningSsn,biz:dtoData.biz,coreCategory:dtoData.coreCategory,planningSum:dtoData.planningSum,coeff:dtoData.coeff,publishFlagForFactory:dtoData.publishFlagForFactory,orderPlanQty:dtoData.orderPlanQty,orderPlanQtyCoeff:dtoData.orderPlanQtyCoeff,prodPlanType:dtoData.prodPlanType,wh:dtoData.wh,exfEtd:dtoData.exfEtd,etdWh:dtoData.etdWh,sample:dtoData.sample,version:dtoData.version,fileId: dtoData.fileId,updatedUser:dtoData.createdUser
                        })
                        if (!updateOrder.affected) {
                            await transactionManager.releaseTransaction();
                            return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                        } else{
                            flag.add(true)
                        }
                        const convertedExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData,id,details.productionPlanId,10,dtoData.exf);
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
                                     if(monthOrderDtoKeys.includes(existingDataKey)){
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
                                                return new CommonResponseModel(false,0,'Error while saving projection orders difference')
                                            } else{
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
                                                return new CommonResponseModel(false,0,'Error while saving projection orders difference')
                                            } else{
                                                flag.add(true)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else{
                        dtoData.version = 1
                    if(dtoData.publishFlagForFactory !== 'NotPub'){
    
                        const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(dtoData, id, 10,dtoData.exf);
                        const saveExcelEntity: OrdersEntity = await transactionManager.getRepository(OrdersEntity).save(convertedExcelEntity);
                        const convertedChildExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData,id,saveExcelEntity.productionPlanId,10,dtoData.exf);
                        const saveChildExcelEntity: OrdersChildEntity = await transactionManager.getRepository(OrdersChildEntity).save(convertedChildExcelEntity);
                        if (!saveExcelEntity || !saveChildExcelEntity) {
                            await transactionManager.releaseTransaction()
                            return new CommonResponseModel(false,0,'Error while saving projection orders')
                        } else{
                            flag.add(true)
                        }
                    } 
                    }
                }

            }
            if(!(flag.has(false))){
                await transactionManager.completeTransaction()
                return new CommonResponseModel(true,1,'Created Successfully')
            } else{
                await transactionManager.completeTransaction()
                return new CommonResponseModel(false,0,'Something went wrong in uploading')
            }
        }catch(err){
            await transactionManager.releaseTransaction()
            return new CommonResponseModel(false, 0, err);

        }
  }

  async getUplodedFilesInfo():Promise<CommonResponseModel>{
    try{
        const data = await this.fileUploadRepo.find()
        let filesArray = []
        if(data){
            for(const rec of data){
                filesArray.push(rec.fileName)
            }
            return new CommonResponseModel(true,1,'Data retreived',filesArray)
        } else{
            return new CommonResponseModel(false,0,'No data found')
        }

    } catch(err){
        throw err
    }
  }


}
  
