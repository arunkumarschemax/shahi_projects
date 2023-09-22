import { Injectable } from '@nestjs/common';
import { CommonResponseModel, FileStatusReq, FileTypesEnum, MonthAndQtyModel, MonthWiseDataModel, MonthWiseExcelDataModel, PhaseAndQtyModel, PhaseWiseDataModel, PhaseWiseExcelDataModel, SeasonWiseQtyModel, VersionAndQtyModel, VersionDataModel, orderColumnValues } from '@project-management-system/shared-models';
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
        @InjectEntityManager() private readonly entityManager: EntityManager

    ) { }

    async saveOrdersData(formData: any, id: number, month: number): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const flag = new Set()
            const updatedArray = formData.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    const newKey = key.replace(/\s/g, '_').replace(/[\(\)]/g, '').replace(/-/g, '_');
                    updatedObj[newKey] = obj[key];
                }
                return updatedObj;
            });

            const convertedData = updatedArray.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    const value = obj[key];
                    if (value === "") {
                        updatedObj[key] = null;
                    } else {
                        // updatedObj[key] = value;
                        var regexPattern = /[^A-Za-z0-9 -;:/.,()[]&_']/g;
                        updatedObj[key] = value.replace(regexPattern, null);
                        updatedObj[key] = Buffer.from(value, 'utf-8').toString()
                    }
                }
                return updatedObj;
            });

            for (const data of convertedData) {
                // const dtoData = new SaveOrderDto(data.Production_Plan_ID, data.Year, data.Planning_Season, data.Season, data.Item_Brand, data.Business_Unit, data.Item_Code, data.Item_Name, data.Main_Sample_Code, data.Main_Sample_Name, data.Supplier_Raw_Material_Code, data.Supplier_Raw_Material_Name, data.Vendor_Code, data.Vendor_Name, data.Management_Factory_Code, data.Management_Factory_Name, data.Branch_Factory_Code, data.Branch_Factory_Name, data.Raw_Material_Supplier_Code, data.Raw_Material_Supplier_Name, Number(data.Sewing_Difficulty), data.Department_Code, data.Department_Name, data.Class1_Code, data.Class1_Name, data.Production_Plan_Type_Name, data.Month_Week_Flag, data.Last_Update_Date, data.Requested_Wh_Date, data.Contracted_Date, data.Transport_Method_Name, data.Logistics_Type_Name, Number(data.Order_Qty_Pcs), data.Yarn_Order_Acceptance, data.Yarn_Order_Request_Date, data.Yarn_Order_Answer_Date, data.Yarn_Order_Actual_Date, data.Yarn_Order_NO, Number(data.Yarn_Actual_Order_Qty_Pcs), data.Yarn_Update_Date, data.Fabric_Order_Acceptance, data.Fabric_Order_Request_Date, data.Fabric_Order_Answer_Date, data.Fabric_Order_Actual_Date, data.Fabric_Order_NO, Number(data.Fabric_Actual_Order_Qty_Pcs), data.Fabric_Update_Date, data.Color_Order_Acceptance, data.Color_Order_Request_Date, data.Color_Order_Answer_Date, data.Color_Order_Actual_Date, data.Color_Order_NO, Number(data.Color_Actual_Order_Qty_Pcs), data.Color_Update_Date, data.Trim_Order_Acceptance, data.Trim_Order_Request_Date, data.Trim_Order_Answer_Date, data.Trim_Order_Actual_Date, data.Trim_Order_NO, Number(data.Trim_Actual_Order_Qty_Pcs), data.Trim_Update_Date, data.PO_Order_Acceptance, data.PO_Order_Request_Date, data.PO_Order_Answer_Date, data.PO_Order_Actual_Date, data.PO_Order_NO, Number(data.PO_Actual_Order_Qty_Pcs), data.PO_Update_Date, Number(data.Order_Qty_Pcs_Old), data.Transport_Method_Name_Old, data.Logistics_Type_Name_Old, data.Yarn_Order_Request_Date_Old, data.Fabric_Order_Request_Date_Old, data.Color_Order_Request_Date_Old, data.Trim_Order_Request_Date_Old, data.PO_Order_Request_Date_Old, data.Status, data.Display_Month_WK, Number(data.Display_Month_WK_Column), data.Group_Cd, Number(data.Show_Color_Flag), Number(data.Order_Qty_Coeff), data.Factory_Comment, data.Factory_Comment_Update_Date, data.FR_Fabric_Code, data.FR_Fabric_Name, data.Ph1_First_Discrimination_Flag_Old, data.Ph1_First_Discrimination_Flag, data.Order_Timing_Display_Value_Old, data.Order_Timing_Display_Value, data.Express_Line_Flag_Old, data.Express_Line_Flag, data.Manual_Lock_Flag_Old, data.Manual_Lock_Flag, data.Ph1_First_Discrimination_Flag_Now, data.Order_Timing_Display_Value_Now, data.Express_Line_Flag_Now, data.Manual_Lock_Flag_Now, data.Requested_Wh_DateOld, data.EXF, data.Color_Recommend, data.Trim_Recommend, data.PORecommend, Number(data.BD_EXF_DL_Setting_LTBefore_Cal), Number(data.PO_EXF_DL_Setting_LTBefore_Cal), Number(data.Material_Supplier_Holiday_Excluding), Number(data.Sewing_FTY_Holiday_Excluding), Number(data.BD_EXF_DL_Setting_LT), Number(data.PO_EXF_DL_Setting_LT), Number(data.BD_EXF_Registered_LT), Number(data.PO_EXF_Registered_LT), Number(data.BD_EXFtotal_Abnormal_LT), Number(data.PO_EXFtotal_Abnormal_LT), Number(data.Abnormal_LT_Reason_BD1), Number(data.Abnormal_LT_Reason_BD2), Number(data.Abnormal_LT_Reason_BD3), Number(data.Abnormal_LT_Reason_BD4), Number(data.Abnormal_LT_Reason_BD5), Number(data.Abnormal_LT_BD1), Number(data.Abnormal_LT_BD2), Number(data.Abnormal_LT_BD3), Number(data.Abnormal_LT_BD4), Number(data.Abnormal_LT_BD5), Number(data.Abnormal_LT_Reason_PO1), Number(data.Abnormal_LT_Reason_PO2), Number(data.Abnormal_LT_Reason_PO3), Number(data.Abnormal_LT_Reason_PO4), Number(data.Abnormal_LT_Reason_PO5), Number(data.Abnormal_LT_PO1), Number(data.Abnormal_LT_PO2), Number(data.Abnormal_LT_PO3), Number(data.Abnormal_LT_PO4), Number(data.Abnormal_LT_PO5), 'Bidhun', 1, id, month)

const dtoData = new SaveOrderDto(Number(data.production_plan_id),data.year,data.planning_ssn_cd,data.planning_ssn,data.tgt_ssn_cd,data.tgt_ssn,data.bizCd,data.biz,data.planning_region_code,data.planning_region_name,data.channel_code,data.channel_Name,data.department,data.dept_cd,data.cls1_cd,data.cls2_cd,data.g_dept,data.sub_category1,data.core_category,data.sub_category2,data.sub_category3,data.production_category_fabric,data.production_category_fabric_processing,data.production_category_sewing,data.production_category_sewing_Processing,data.planning_sum_code,data.planning_sum,data.local_name_ghq,data.item_cd,data.item,data.orig_price,data.mainproduction_category_sewing_sample_code,data.fr_fabric_code,data.fr_fabric,data.supplier_raw_material_code,data.supplier_raw_material,data.raw_material_supplier_code,data.raw_material_supplier,data.vendor_code,data.vendor,data.sewing_factory_code,data.sewing_factory,data.branch_factory_code,data.branchFactory,data.coeff,data.item_branch_number,data.Official_plan_std_qty,data.Official_plan_fab_prp_pln_qty,data.Official_plan_po_pr_sls_qty,data.offical_plan_co_qty,data.offical_plan_stock_qty,data.sls_start_dy,data.publish_flag_for_factory,data.publish_date,data.allc_end_dy,data.sls_end_dy,data.gwh,data.order_plan_number,data.order_timing,data.swng_prd_month,data.swng_prd_week,data.order_plan_qty,data.order_plan_qty_coeff,data.trnsp_mthd,data.prod_plan_type,data.ph1_1st,data.wh,data.wh_act,data.wh_auto,data.yarn_dl_requested,data.yarn_dl_answered,data.yarn_dl_auto,data.yarn_production_due_date_auto,data.yarn_auto_reflection_date,data.yarn_act_dy,data.yarn_act_qty,data.yarn_order_number,data.yarn_order_status,data.yarn_delivery_date,data.fbrc_dl_requested,data.fbrc_dl_answered,data.fbrc_dl_auto,data.fbrc_production_due_date_auto,data.fbrc_auto_reflection_date,data.factory_comment_update_date,data.fbrc_act_dy,data.fbrc_act_qty,data.fbrc_order_number,data.fbrc_order_status,data.fbrc_delivery_date,data.color_dl_requested,data.color_dl_answered,data.color_dl_auto,data.color_production_due_date_auto,data.color_auto_reflection_date,data.color_act_dy,data.color_act_qty,data.color_order_number,data.color_order_status,data.color_delivery_date,data.trim_dl_requested,data.trim_dl_answered,data.trim_dl_auto,data.trim_production_due_date_auto,data.trim_auto_reflection_date,data.trim_act_dy,data.trim_act_qty,data.trim_order_number,data.trim_order_status,data.trim_delivery_date,data.po_dl_requested,data.po_dl_answered,data.po_dl_auto,data.po_exf_total_abnormal_lt,data.po_production_due_date_auto,data.po_auto_reflection_date,data.po_act_dy,data.po_act_qty,data.po_order_number,data.po_order_status,data.assort1,data.assort2,data.nx_assort,data.solid,data.order_plan_qty_stop,data.fix_flag,data.alternative_flag,data.express_line_flag,data.factory_comment,data.planned_exf,data.exf_etd,data.exf_wh,data.sweing_country_region,data.rew_material_original,data.item_drop,data.file_id,data.count_y,data.sample,data.exf,data.bddl,data.bddl_past,data.lt_bd_exf,data.new_bddl,data.new_lt_bd_exf,data.lt_po_exf,data.qty_lt__bd_exf,data.qty_lt__po_exf,data.country2_y,data.phase ,'bidhun',null,null,null,undefined,data.id,null,undefined,null,null)

                if (dtoData.productionPlanId != null) {
                    const details = await this.ordersRepository.findOne({ where: { productionPlanId: dtoData.productionPlanId } })
                    const versionDetails = await this.ordersChildRepo.getVersion(dtoData.productionPlanId)
                    let version = 1;
                    if (versionDetails.length > 0) {
                        version = Number(versionDetails.length) + 1
                    }
                    dtoData.version = version
                    if (details) {
                        // const updatedData = this.ordersAdapter.convertDtoToEntity(data);
                        const updateOrder = await transactionManager.getRepository(OrdersEntity).update({ productionPlanId: dtoData.productionPlanId }, {
                            // year: dtoData.year, planningSeason: dtoData.planningSeason, season: dtoData.season, itemBrand: dtoData.itemBrand, businessUnit: dtoData.businessUnit, itemCode: dtoData.itemCode, itemName: dtoData.itemName, mainSampleCode: dtoData.mainSampleCode, mainSampleName: dtoData.mainSampleName, supplierRMCode: dtoData.supplierRMCode, supplierRMName: dtoData.supplierRMName, vendorCode: dtoData.vendorCode, vendorName: dtoData.vendorName, managementFactoryCode: dtoData.managementFactoryCode, managementFactoryName: dtoData.managementFactoryName, branchFactoryCode: dtoData.branchFactoryCode,
                            // branchFactoryName: dtoData.branchFactoryName, rmSupplierCode: dtoData.rmSupplierCode, rmSupplierName: dtoData.rmSupplierName, sewingDifficulty: dtoData.sewingDifficulty, departmentCode: dtoData.departmentCode, departmentName: dtoData.departmentName, class1Code: dtoData.class1Code, Class1Name: dtoData.Class1Name, productionPlanTypeName: dtoData.productionPlanTypeName, monthWeekFlag: dtoData.monthWeekFlag, lastUpdateDate: dtoData.lastUpdateDate, requestedWhDate: dtoData.requestedWhDate, contractedDate: dtoData.contractedDate, transportMethodName: dtoData.transportMethodName,
                            // logisticsTypeName: dtoData.logisticsTypeName, orderQtyPcs: dtoData.orderQtyPcs, yarnOrderAcceptance: dtoData.yarnOrderAcceptance, yarnOrderRequestDate: dtoData.yarnOrderRequestDate, yarnOrderAnswerDate: dtoData.yarnOrderActualDate, yarnOrderActualDate: dtoData.yarnOrderActualDate, yarnOrderNO: dtoData.yarnOrderNO, yarnActualOrderQtyPcs: dtoData.yarnActualOrderQtyPcs, yarnUpdateDate: dtoData.yarnUpdateDate, fabricOrderAcceptance: dtoData.fabricOrderAcceptance, fabricOrderRequestDate: dtoData.fabricOrderRequestDate, fabricOrderAnswerDate: dtoData.fabricOrderAnswerDate,
                            // fabricOrderActualDate: dtoData.fabricOrderActualDate, fabricOrderNO: dtoData.fabricOrderNO, fabricActualOrderQtyPcs: dtoData.fabricActualOrderQtyPcs, fabricUpdateDate: dtoData.fabricUpdateDate, colorOrderAcceptance: dtoData.colorOrderAcceptance, colorOrderRequestDate: dtoData.colorOrderRequestDate, colorOrderAnswerDate: dtoData.colorOrderAnswerDate, colorOrderActualDate: dtoData.colorOrderActualDate, colorOrderNO: dtoData.colorOrderNO, colorActualOrderQtyPcs: dtoData.colorActualOrderQtyPcs, colorUpdateDate: dtoData.colorUpdateDate, trimOrderAcceptance: dtoData.trimOrderAcceptance,
                            // trimOrderRequestDate: dtoData.trimOrderRequestDate, trimOrderAnswerDate: dtoData.trimOrderAnswerDate, trimOrderActualDate: dtoData.trimOrderActualDate, trimOrderNO: dtoData.trimOrderNO, trimActualOrderQtyPcs: dtoData.trimActualOrderQtyPcs, trimUpdateDate: dtoData.trimUpdateDate, POOrderAcceptance: dtoData.POOrderAcceptance, POOrderRequestDate: dtoData.POOrderRequestDate, POOrderAnswerDate: dtoData.POOrderAnswerDate, POOrderActualDate: dtoData.POOrderActualDate, POOrderNO: dtoData.POOrderNO, POActualOrderQtyPcs: dtoData.POActualOrderQtyPcs, POUpdateDate: dtoData.POUpdateDate,
                            // orderQtyPcsOld: dtoData.orderQtyPcsOld, transportMethodNameOld: dtoData.transportMethodNameOld, logisticsTypeNameOld: dtoData.logisticsTypeNameOld, yarnOrderRequestDateOld: dtoData.yarnOrderRequestDateOld, fabricOrderRequestDateOld: dtoData.fabricOrderRequestDateOld, colorOrderRequestDateOld: dtoData.colorOrderRequestDateOld, trimOrderRequestDateOld: dtoData.trimOrderRequestDateOld, POOrderRequestDateOld: dtoData.POOrderRequestDateOld, status: dtoData.status, displayMonthWK: dtoData.displayMonthWK, displayMonthWKColumn: dtoData.displayMonthWKColumn, groupCd: dtoData.groupCd,
                            // showColorFlag: dtoData.showColorFlag, orderQtyCoeff: dtoData.orderQtyCoeff, factoryComment: dtoData.factoryComment, factoryCommentUpdateDate: dtoData.factoryCommentUpdateDate, FRFabricCode: dtoData.FRFabricCode, FRFabricName: dtoData.FRFabricName, Ph1FirstDiscriminationFlagOld: dtoData.Ph1FirstDiscriminationFlagOld, Ph1FirstDiscriminationFlag: dtoData.Ph1FirstDiscriminationFlag, orderTimingDisplayValueOld: dtoData.orderTimingDisplayValueOld, orderTimingDisplayValue: dtoData.orderTimingDisplayValue, expressLineFlagOld: dtoData.expressLineFlagOld, expressLineFlag: dtoData.expressLineFlag,
                            // manualLockFlagOld: dtoData.manualLockFlagOld, manualLockFlag: dtoData.manualLockFlag, Ph1FirstDiscriminationFlagNow: dtoData.Ph1FirstDiscriminationFlagNow, orderTimingDisplayValueNow: dtoData.orderTimingDisplayValueNow, expressLineFlagNow: dtoData.expressLineFlagNow, ManualLockFlagNow: dtoData.ManualLockFlagNow, requestedWhDateOld: dtoData.requestedWhDateOld, EXF: dtoData.EXF, colorRecommend: dtoData.colorRecommend, trimRecommend: dtoData.trimRecommend, PORecommend: dtoData.PORecommend, BD_EXF_DLSettingLTBeforeCal: dtoData.BD_EXF_DLSettingLTBeforeCal,
                            // PO_EXF_DLSettingLTBeforeCal: dtoData.PO_EXF_DLSettingLTBeforeCal, materialSupplierHolidayExcluding: dtoData.materialSupplierHolidayExcluding, sewingFTYHolidayExcluding: dtoData.sewingFTYHolidayExcluding, BD_EXF_DLSettingLT: dtoData.BD_EXF_DLSettingLT, PO_EXF_DLSettingLT: dtoData.PO_EXF_DLSettingLT, BD_EXFRegisteredLT: dtoData.BD_EXFRegisteredLT, PO_EXFRegisteredLT: dtoData.PO_EXFRegisteredLT, BD_EXFtotalAbnormalLT: dtoData.BD_EXFtotalAbnormalLT, PO_EXFtotalAbnormalLT: dtoData.PO_EXFtotalAbnormalLT, abnormalLTReasonBD1: dtoData.abnormalLTReasonBD1,
                            // abnormalLTReasonBD2: dtoData.abnormalLTReasonBD2, abnormalLTReasonBD3: dtoData.abnormalLTReasonBD3, abnormalLTReasonBD4: dtoData.abnormalLTReasonBD4, abnormalLTReasonBD5: dtoData.abnormalLTReasonBD5, abnormalLTBD1: dtoData.abnormalLTBD1, abnormalLTBD2: dtoData.abnormalLTBD2, abnormalLTBD3: dtoData.abnormalLTBD3, abnormalLTBD4: dtoData.abnormalLTBD4, abnormalLTBD5: dtoData.abnormalLTBD5, abnormalLTReasonPO1: dtoData.abnormalLTReasonPO1, abnormalLTReasonPO2: dtoData.abnormalLTReasonPO2, abnormalLTReasonPO3: dtoData.abnormalLTReasonPO3, abnormalLTReasonPO4: dtoData.abnormalLTReasonPO4,
                            // abnormalLTReasonPO5: dtoData.abnormalLTReasonPO5, abnormalLTPO1: dtoData.abnormalLTPO1, abnormalLTPO2: dtoData.abnormalLTPO2, abnormalLTPO3: dtoData.abnormalLTPO3, abnormalLTPO4: dtoData.abnormalLTPO4, abnormalLTPO5: dtoData.abnormalLTPO5, version: dtoData.version, updatedUser: dtoData.userName, orderStatus: 'UNACCEPTED', fileId: id, month: month

year:dtoData.year,planningSsnCd:dtoData.planningSsnCd,planningSsn:dtoData.planningSsn,tgtSsnCd:dtoData.tgtSsnCd,tgtSsn:dtoData.tgtSsn,bizCd:dtoData.bizCd,biz:dtoData.biz,planningRegionCode:dtoData.planningRegionCode,planningRegionName:dtoData.planningRegionName,channelCode:dtoData.channelCode,channelName:dtoData.channelName,department:dtoData.department,deptCd:dtoData.deptCd,Cls1_cd:dtoData.Cls1_cd,Cls2_cd:dtoData.Cls2_cd,gDept:dtoData.gDept,subCategory1:dtoData.subCategory1,coreCategory:dtoData.coreCategory,subCategory2:dtoData.subCategory2,subCategory3:dtoData.subCategory3,productionCategoryFabric:dtoData.productionCategoryFabric,productionCategoryFabricProcessing:dtoData.productionCategoryFabricProcessing,productionCategorySewing:dtoData.productionCategorySewing,productionCategorySewingProcessing:dtoData.productionCategorySewingProcessing,planningSumCode:dtoData.planningSumCode,planningSum:dtoData.planningSum,localNameGhq:dtoData.localNameGhq,itemCd:dtoData.itemCd,item:dtoData.item,origPrice:dtoData.origPrice,mainSampleCode:dtoData.mainSampleCode,frFabricCode:dtoData.frFabricCode,frFabric:dtoData.frFabric,supplierRawMaterialCode:dtoData.supplierRawMaterialCode,supplierRawMaterial:dtoData.supplierRawMaterial,rawMaterialSupplierCode:dtoData.rawMaterialSupplierCode,rawMaterialSupplier:dtoData.rawMaterialSupplier,vendorCoode:dtoData.vendorCoode,vendor:dtoData.vendor,sewingFactoryCode:dtoData.sewingFactoryCode,sewingFactory:dtoData.sewingFactory,branchFactoryCode:dtoData.branchFactoryCode,branchFactory:dtoData.branchFactory,coeff:dtoData.coeff,itemBranchNumber:dtoData.itemBranchNumber,officialPlanStdQty:dtoData.officialPlanStdQty,OfficialPlanFabPrpPlnQty:dtoData.OfficialPlanFabPrpPlnQty,OfficialPlanPoPrSlsQty:dtoData.OfficialPlanPoPrSlsQty,officalPlanCoQty:dtoData.officalPlanCoQty,officalPlanStockQty:dtoData.officalPlanStockQty,slsStartDy:dtoData.slsStartDy,publishFlagForFactory:dtoData.publishFlagForFactory,publishDate:dtoData.publishDate,allcEndDy:dtoData.allcEndDy,slsEndDy:dtoData.slsEndDy,GWH:dtoData.GWH,orderPlanNumber:dtoData.orderPlanNumber,orderTiming:dtoData.orderTiming,swngPrdMonth:dtoData.swngPrdMonth,swngPrdWeek:dtoData.swngPrdWeek,orderPlanQty:dtoData.orderPlanQty,orderPlanQtyCoeff:dtoData.orderPlanQtyCoeff,trnspMthd:dtoData.trnspMthd,prodPlanType:dtoData.prodPlanType,ph1St:dtoData.ph1St,wh:dtoData.wh,whAct:dtoData.whAct,whAuto:dtoData.whAuto,yarnDlRequested:dtoData.yarnDlRequested,yarnDlAnswered:dtoData.yarnDlAnswered,yarnDlAuto:dtoData.yarnDlAuto,yarnProductionDueDateAuto:dtoData.yarnProductionDueDateAuto,yarnAutoReflectionDate:dtoData.yarnAutoReflectionDate,yarnActDy:dtoData.yarnActDy,yarnActQty:dtoData.yarnActQty,yarnOrderNumber:dtoData.yarnOrderNumber,yarnOrderStatus:dtoData.yarnOrderStatus,yarnDeliveryDate:dtoData.yarnDeliveryDate,fbrcDlRequested:dtoData.fbrcDlRequested,fbrcDlAnswered:dtoData.fbrcDlAnswered,fbrcDlAuto:dtoData.fbrcDlAuto,fbrcProductionDueDateAuto:dtoData.fbrcProductionDueDateAuto,fbrcAutoReflectionDate:dtoData.fbrcAutoReflectionDate,factoryCommentUpdateDate:dtoData.factoryCommentUpdateDate,fbrcActDy:dtoData.fbrcActDy,fbrcActQty:dtoData.fbrcActQty,fbrcOrderNumber:dtoData.fbrcOrderNumber,fbrcOrderStatus:dtoData.fbrcOrderStatus,fbrcDeliveryDate:dtoData.fbrcDeliveryDate,colorDlRequested:dtoData.colorDlRequested,colorDlAnswered:dtoData.colorDlAnswered,colorDlAuto:dtoData.colorDlAuto,colorProductionDueDateAuto:dtoData.colorProductionDueDateAuto,colorAutoReflectionDate:dtoData.colorAutoReflectionDate,colorActDy:dtoData.colorActDy,colorActQty:dtoData.colorActQty,colorOrderNumber:dtoData.colorOrderNumber,colorOrderStatus:dtoData.colorOrderStatus,colorDeliveryDate:dtoData.colorDeliveryDate,trimDlRequested:dtoData.trimDlRequested,trimDlAnswered:dtoData.trimDlAnswered,trimDlAuto:dtoData.trimDlAuto,trimProductionDueDateAuto:dtoData.trimProductionDueDateAuto,trimAutoReflectionDate:dtoData.trimAutoReflectionDate,trimActDy:dtoData.trimActDy,trimActQty:dtoData.trimActQty,trimOrderNumber:dtoData.trimOrderNumber,trimOrderStatus:dtoData.trimOrderStatus,trimDeliveryDate:dtoData.trimDeliveryDate,poDlRequested:dtoData.poDlRequested,poDlAnswered:dtoData.poDlAnswered,poDlAuto:dtoData.poDlAuto,poProductionDueDateAuto:dtoData.poProductionDueDateAuto,poAutoReflectionDate:dtoData.poAutoReflectionDate,poActDy:dtoData.poActDy,poActQty:dtoData.poActQty,poOrderNumber:dtoData.poOrderNumber,poOrderStatus:dtoData.poOrderStatus,assort1:dtoData.assort1,assort2:dtoData.assort2,nxAssort:dtoData.nxAssort,solid:dtoData.solid,orderPlanQtyStop:dtoData.orderPlanQtyStop,fixFlag:dtoData.fixFlag,alternativeFlag:dtoData.alternativeFlag,expressLineFlag:dtoData.expressLineFlag,factoryComment:dtoData.factoryComment,plannedEXF:dtoData.plannedEXF,exfEtd:dtoData.exfEtd,exfWh:dtoData.exfWh,sweingCountryRegion:dtoData.sweingCountryRegion,rewMaterialOriginal:dtoData.rewMaterialOriginal,itemDrop:dtoData.itemDrop,fileId:dtoData.fileId,countY:dtoData.countY,sample:dtoData.sample,exf:dtoData.exf,bddl:dtoData.bddl,bddlPast:dtoData.bddlPast,ltBdExf:dtoData.ltBdExf,newBddl:dtoData.newBddl,newLtBdExf:dtoData.newLtBdExf,ltPoExf:dtoData.ltPoExf,qtyLtBdExf:dtoData.qtyLtBdExf,qtyLtPoExf:dtoData.qtyLtPoExf,country2Y:dtoData.country2Y,phase:dtoData.phase

                        })
                        if (!updateOrder.affected) {
                            await transactionManager.releaseTransaction();
                            return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                        }
                        const convertedExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData, id, month);
                        const saveExcelEntity: OrdersChildEntity = await transactionManager.getRepository(OrdersChildEntity).save(convertedExcelEntity);
                        if (saveExcelEntity) {
                            //difference insertion to order diff table
                            const existingDataKeys = Object.keys(details)
                            const currentDataKeys = Object.keys(dtoData)
                            for (const existingDataKey of existingDataKeys) {
                                if (details[existingDataKey] != data[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'version' && existingDataKey != '' && existingDataKey != 'orderStatus' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser' && existingDataKey != 'fileId' && existingDataKey != 'month') {
                                    const orderDiffObj = new OrdersDifferenceEntity();
                                    if (existingDataKey === 'lastUpdateDate' || existingDataKey === 'requestedWhDate' || existingDataKey === 'contractedDate' || existingDataKey === 'EXF') {
                                        const oldValue = moment(details[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY']).format('YYYY-MM-DD');
                                        const newValue = moment(dtoData[existingDataKey], ['DD-MM-YYYY', 'MM/DD/YYYY']).format('YYYY-MM-DD');
                                        orderDiffObj.oldValue = details[existingDataKey]
                                        orderDiffObj.newValue = dtoData[existingDataKey]
                                        orderDiffObj.columnName = orderColumnValues[existingDataKey]
                                        orderDiffObj.displayName = existingDataKey
                                        orderDiffObj.productionPlanId = dtoData.productionPlanId
                                        orderDiffObj.version = dtoData.version
                                        orderDiffObj.fileId = id
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
                                        orderDiffObj.productionPlanId = dtoData.productionPlanId
                                        orderDiffObj.version = dtoData.version
                                        orderDiffObj.fileId = id
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
                        const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(dtoData, id, month);
                        const saveExcelEntity: OrdersEntity = await transactionManager.getRepository(OrdersEntity).save(convertedExcelEntity);
                        const convertedChildExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData, id, month);
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
    async saveTrimOrdersData(formData: any, id: number, month: number): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const flag = new Set()
            const updatedArray = formData.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    const newKey = key.replace(/\s/g, '_').replace(/[\(\)\.]/g, '').replace(/-/g, '_');
                    updatedObj[newKey] = obj[key];
                }
                return updatedObj;
            });

            const convertedData = updatedArray.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    const value = obj[key];
                    if (value === "") {
                        updatedObj[key] = null;
                    } else {
                        // updatedObj[key] = value;
                        var regexPattern = /[^A-Za-z0-9 -;:/.,()[]&_']/g;
                        updatedObj[key] = value.replace(regexPattern, null);
                        updatedObj[key] = Buffer.from(value, 'utf-8').toString()
                    }
                }
                return updatedObj;
            });

            for (const data of convertedData) {
                let dtoData
                if(data.Order_No != null){
                    dtoData = new TrimOrderDto(null,data.Order_No,data.Year,data.Revision_No,data.Planning_Ssn,data.Global_Business_Unit,data.Business_Unit,data.Item_Brand,data.Department,data.Revised_Date,data.Document_Status,data.Answered_Status,data.Vendor_Person_in_Charge,data.Decision_Date,data.Payment_Terms,data.Contracted_ETD,data.ETA_WH,data.Approver,data.Approval_Date,data.Order_Conditions,data.Remark,data.Raw_Material_CodeFR,data.Supplier_Raw_Material_Code,data.Supplier_Raw_Material,data.Vendor_Code,data.Vendor,data.Management_Factory_Code,data.Management_Factory,data.Branch_Factory_Code,data.Branch_Factory,data.Order_Plan_Number,data.Item_Code,data.Item,data.Representative_Sample_Code,data.Sample_Code,data.Color_Code,data.Color,data.Pattern_Dimension_Code,data.Size_Code,data.Size,Number(data.Order_Qtypcs.replace(/,/g,'')),data.Arrangement_By,data.Trim_Description,data.Trim_Item_No,data.Trim_Supplier,'bidhun',null,null,null,null,id,month)
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

    // async revertFileData(req: FileIdReq): Promise<CommonResponseModel> {
    //     if (req) {
    //         const latestFileId = await this.fileUploadRepo.update({ id: req.fileId }, { isActive: false })
    //     }
    //     if (req) {
    //         const deleteChildData = await this.ordersChildRepo.deleteChildData(req)
    //     }
    //     if (req) {
    //         const deleteDiffData = await this.orderDiffRepo.deleteDiffData(req)
    //     }
    //     if (req) {
    //         const deleteOrdersData = await this.ordersRepository.deleteData(req)
    //     }
    //     const updatedData = await this.ordersChildRepo.getUpdatedData()
    //     const data = await this.ordersChildRepo.find({
    //         where: { fileId: updatedData[0]?.fileId },
    //         relations: ['orders']
    //     })
    //     const flag = new Set()
    //     for (const dtoData of data) {
    //         const prodPlanId = new OrdersEntity();
    //         prodPlanId.productionPlanId = dtoData.orders.productionPlanId
    //         const updateOrder = await this.ordersRepository.update({ productionPlanId: prodPlanId.productionPlanId }, {
    //             year: dtoData.year, planningSeason: dtoData.planningSeason, season: dtoData.season, itemBrand: dtoData.itemBrand, businessUnit: dtoData.businessUnit, itemCode: dtoData.itemCode, itemName: dtoData.itemName, mainSampleCode: dtoData.mainSampleCode, mainSampleName: dtoData.mainSampleName, supplierRMCode: dtoData.supplierRMCode, supplierRMName: dtoData.supplierRMName, vendorCode: dtoData.vendorCode, vendorName: dtoData.vendorName, managementFactoryCode: dtoData.managementFactoryCode, managementFactoryName: dtoData.managementFactoryName, branchFactoryCode: dtoData.branchFactoryCode,
    //             branchFactoryName: dtoData.branchFactoryName, rmSupplierCode: dtoData.rmSupplierCode, rmSupplierName: dtoData.rmSupplierName, sewingDifficulty: dtoData.sewingDifficulty, departmentCode: dtoData.departmentCode, departmentName: dtoData.departmentName, class1Code: dtoData.class1Code, Class1Name: dtoData.Class1Name, productionPlanTypeName: dtoData.productionPlanTypeName, monthWeekFlag: dtoData.monthWeekFlag, lastUpdateDate: dtoData.lastUpdateDate, requestedWhDate: dtoData.requestedWhDate, contractedDate: dtoData.contractedDate, transportMethodName: dtoData.transportMethodName,
    //             logisticsTypeName: dtoData.logisticsTypeName, orderQtyPcs: dtoData.orderQtyPcs, yarnOrderAcceptance: dtoData.yarnOrderAcceptance, yarnOrderRequestDate: dtoData.yarnOrderRequestDate, yarnOrderAnswerDate: dtoData.yarnOrderActualDate, yarnOrderActualDate: dtoData.yarnOrderActualDate, yarnOrderNO: dtoData.yarnOrderNO, yarnActualOrderQtyPcs: dtoData.yarnActualOrderQtyPcs, yarnUpdateDate: dtoData.yarnUpdateDate, fabricOrderAcceptance: dtoData.fabricOrderAcceptance, fabricOrderRequestDate: dtoData.fabricOrderRequestDate, fabricOrderAnswerDate: dtoData.fabricOrderAnswerDate,
    //             fabricOrderActualDate: dtoData.fabricOrderActualDate, fabricOrderNO: dtoData.fabricOrderNO, fabricActualOrderQtyPcs: dtoData.fabricActualOrderQtyPcs, fabricUpdateDate: dtoData.fabricUpdateDate, colorOrderAcceptance: dtoData.colorOrderAcceptance, colorOrderRequestDate: dtoData.colorOrderRequestDate, colorOrderAnswerDate: dtoData.colorOrderAnswerDate, colorOrderActualDate: dtoData.colorOrderActualDate, colorOrderNO: dtoData.colorOrderNO, colorActualOrderQtyPcs: dtoData.colorActualOrderQtyPcs, colorUpdateDate: dtoData.colorUpdateDate, trimOrderAcceptance: dtoData.trimOrderAcceptance,
    //             trimOrderRequestDate: dtoData.trimOrderRequestDate, trimOrderAnswerDate: dtoData.trimOrderAnswerDate, trimOrderActualDate: dtoData.trimOrderActualDate, trimOrderNO: dtoData.trimOrderNO, trimActualOrderQtyPcs: dtoData.trimActualOrderQtyPcs, trimUpdateDate: dtoData.trimUpdateDate, POOrderAcceptance: dtoData.POOrderAcceptance, POOrderRequestDate: dtoData.POOrderRequestDate, POOrderAnswerDate: dtoData.POOrderAnswerDate, POOrderActualDate: dtoData.POOrderActualDate, POOrderNO: dtoData.POOrderNO, POActualOrderQtyPcs: dtoData.POActualOrderQtyPcs, POUpdateDate: dtoData.POUpdateDate,
    //             orderQtyPcsOld: dtoData.orderQtyPcsOld, transportMethodNameOld: dtoData.transportMethodNameOld, logisticsTypeNameOld: dtoData.logisticsTypeNameOld, yarnOrderRequestDateOld: dtoData.yarnOrderRequestDateOld, fabricOrderRequestDateOld: dtoData.fabricOrderRequestDateOld, colorOrderRequestDateOld: dtoData.colorOrderRequestDateOld, trimOrderRequestDateOld: dtoData.trimOrderRequestDateOld, POOrderRequestDateOld: dtoData.POOrderRequestDateOld, status: dtoData.status, displayMonthWK: dtoData.displayMonthWK, displayMonthWKColumn: dtoData.displayMonthWKColumn, groupCd: dtoData.groupCd,
    //             showColorFlag: dtoData.showColorFlag, orderQtyCoeff: dtoData.orderQtyCoeff, factoryComment: dtoData.factoryComment, factoryCommentUpdateDate: dtoData.factoryCommentUpdateDate, FRFabricCode: dtoData.FRFabricCode, FRFabricName: dtoData.FRFabricName, Ph1FirstDiscriminationFlagOld: dtoData.Ph1FirstDiscriminationFlagOld, Ph1FirstDiscriminationFlag: dtoData.Ph1FirstDiscriminationFlag, orderTimingDisplayValueOld: dtoData.orderTimingDisplayValueOld, orderTimingDisplayValue: dtoData.orderTimingDisplayValue, expressLineFlagOld: dtoData.expressLineFlagOld, expressLineFlag: dtoData.expressLineFlag,
    //             manualLockFlagOld: dtoData.manualLockFlagOld, manualLockFlag: dtoData.manualLockFlag, Ph1FirstDiscriminationFlagNow: dtoData.Ph1FirstDiscriminationFlagNow, orderTimingDisplayValueNow: dtoData.orderTimingDisplayValueNow, expressLineFlagNow: dtoData.expressLineFlagNow, ManualLockFlagNow: dtoData.ManualLockFlagNow, requestedWhDateOld: dtoData.requestedWhDateOld, EXF: dtoData.EXF, colorRecommend: dtoData.colorRecommend, trimRecommend: dtoData.trimRecommend, PORecommend: dtoData.PORecommend, BD_EXF_DLSettingLTBeforeCal: dtoData.BD_EXF_DLSettingLTBeforeCal,
    //             PO_EXF_DLSettingLTBeforeCal: dtoData.PO_EXF_DLSettingLTBeforeCal, materialSupplierHolidayExcluding: dtoData.materialSupplierHolidayExcluding, sewingFTYHolidayExcluding: dtoData.sewingFTYHolidayExcluding, BD_EXF_DLSettingLT: dtoData.BD_EXF_DLSettingLT, PO_EXF_DLSettingLT: dtoData.PO_EXF_DLSettingLT, BD_EXFRegisteredLT: dtoData.BD_EXFRegisteredLT, PO_EXFRegisteredLT: dtoData.PO_EXFRegisteredLT, BD_EXFtotalAbnormalLT: dtoData.BD_EXFtotalAbnormalLT, PO_EXFtotalAbnormalLT: dtoData.PO_EXFtotalAbnormalLT, abnormalLTReasonBD1: dtoData.abnormalLTReasonBD1,
    //             abnormalLTReasonBD2: dtoData.abnormalLTReasonBD2, abnormalLTReasonBD3: dtoData.abnormalLTReasonBD3, abnormalLTReasonBD4: dtoData.abnormalLTReasonBD4, abnormalLTReasonBD5: dtoData.abnormalLTReasonBD5, abnormalLTBD1: dtoData.abnormalLTBD1, abnormalLTBD2: dtoData.abnormalLTBD2, abnormalLTBD3: dtoData.abnormalLTBD3, abnormalLTBD4: dtoData.abnormalLTBD4, abnormalLTBD5: dtoData.abnormalLTBD5, abnormalLTReasonPO1: dtoData.abnormalLTReasonPO1, abnormalLTReasonPO2: dtoData.abnormalLTReasonPO2, abnormalLTReasonPO3: dtoData.abnormalLTReasonPO3, abnormalLTReasonPO4: dtoData.abnormalLTReasonPO4,
    //             abnormalLTReasonPO5: dtoData.abnormalLTReasonPO5, abnormalLTPO1: dtoData.abnormalLTPO1, abnormalLTPO2: dtoData.abnormalLTPO2, abnormalLTPO3: dtoData.abnormalLTPO3, abnormalLTPO4: dtoData.abnormalLTPO4, abnormalLTPO5: dtoData.abnormalLTPO5, version: dtoData.version, updatedUser: dtoData.updatedUser, orderStatus: 'UNACCEPTED', fileId: dtoData.fileId
    //         })
    //         if (!updateOrder.affected) {
    //             return new CommonResponseModel(false, 0, 'Something went wrong in order update', updateOrder)
    //         }
    //         if (!updateOrder.affected) {
    //             flag.add(false)
    //         } else {
    //             flag.add(true)
    //         }
    //     }
    //     if (flag.has(true)) {
    //         return new CommonResponseModel(true, 1, 'File Reverted Successfully')
    //     } else {
    //         return new CommonResponseModel(false, 0, 'failed to revert file data')
    //     }
    // }

    async revertTrimFileData(req: FileIdReq): Promise<CommonResponseModel> {
        const manager = new GenericTransactionManager(this.dataSource)
        await manager.startTransaction()

        console.log(req,'requestfff')
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
        const updatedData = await manager.getRepository(TrimOrdersChildEntity).findOne({select:['fileId'],
        order: { id: 'DESC' }
        })
        console.log(updatedData.fileId,'fileiddddd')
        const data = await this.trimordersChildRepo.find({
            where: { fileId: updatedData?.fileId },
            // relations: ['orders']
        })
        const flag = new Set()
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

    async getUploadFilesData(): Promise<CommonResponseModel> {
        const data = await this.fileUploadRepo.getFilesData()
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
        console.log(fileIdsByMonth)
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
        console.log(fileIdsByMonth)
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

    async seasonWiseReport(): Promise<CommonResponseModel> {
        try {
            const reportData = await this.ordersRepository.seasonWiseReport();
            let season23SSWH = [];
            let season23SSEXF = [];
            let season23FWWH = [];
            let season23FWEXF = [];
            let season24SSWH = [];
            let season24SSEXF = [];
            for (const data of reportData) {
                if (data.year === "2023") {
                    if (data.plannedSeason === "SS") {
                        season23SSWH.push(data) && season23SSEXF.push(data);
                    } else if (data.plannedSeason === "FW") {
                        season23FWWH.push(data) && season23FWEXF.push(data);
                    }
                } else if (data.year === "2024" && data.plannedSeason === "SS") {
                    season24SSWH.push(data) && season24SSEXF.push(data);
                }
            }
            const season = [season23SSWH,season23SSEXF,season23FWWH,season23FWEXF,season24SSWH,season24SSEXF];
            console.log(season, 'coming');
            if (reportData.length) {
                return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', season);
            } else {
                return new CommonResponseModel(false, 0, 'No Data Found', {});
            }
        } catch (error) {
            throw error;
        }
    }
    
    
}