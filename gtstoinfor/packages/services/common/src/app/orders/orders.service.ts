import { Injectable } from '@nestjs/common';
import { CommonResponseModel, orderColumnValues } from '@project-management-system/shared-models';
import { SaveOrderDto } from './models/save-order-dto';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersEntity } from './entities/orders.entity';
import { OrdersAdapter } from './adapters/orders.adapter';
import { OrdersChildRepository } from './repository/orders-child.repository';
import { OrdersChildEntity } from './entities/orders-child.entity';
import { OrdersChildAdapter } from './adapters/orders-child.adapter';
import { OrdersDifferenceEntity } from './orders-difference-info.entity';
import { OrderDifferenceRepository } from './repository/order-difference.repository';

@Injectable()
export class OrdersService {
    ordersChildRepository: any;

    constructor(
        private ordersAdapter: OrdersAdapter,
        private ordersRepository: OrdersRepository,
        private ordersChildRepo: OrdersChildRepository,
        private ordersChildAdapter: OrdersChildAdapter,
        private orderDiffRepo: OrderDifferenceRepository
    ) { }

    async saveOrdersData(formData: any): Promise<CommonResponseModel> {
        try {
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
                        updatedObj[key] = value;
                    }
                }
                return updatedObj;
            });

            for (const data of convertedData) {
                const dtoData = new SaveOrderDto(data.Production_Plan_ID, data.Year, data.Planning_Season, data.Season, data.Item_Brand, data.Business_Unit, data.Item_Code, data.Item_Name, data.Main_Sample_Code, data.Main_Sample_Name, data.Supplier_Raw_Material_Code, data.Supplier_Raw_Material_Name, data.Vendor_Code, data.Vendor_Name, data.Management_Factory_Code, data.Management_Factory_Name, data.Branch_Factory_Code, data.Branch_Factory_Name, data.Raw_Material_Supplier_Code, data.Raw_Material_Supplier_Name, Number(data.Sewing_Difficulty), data.Department_Code, data.Department_Name, data.Class1_Code, data.Class1_Name, data.Production_Plan_Type_Name, data.Month_Week_Flag, data.Last_Update_Date, data.Requested_Wh_Date, data.Contracted_Date, data.Transport_Method_Name, data.Logistics_Type_Name, Number(data.Order_Qty_Pcs), data.Yarn_Order_Acceptance, data.Yarn_Order_Request_Date, data.Yarn_Order_Answer_Date, data.Yarn_Order_Actual_Date, data.Yarn_Order_NO, Number(data.Yarn_Actual_Order_Qty_Pcs), data.Yarn_Update_Date, data.Fabric_Order_Acceptance, data.Fabric_Order_Request_Date, data.Fabric_Order_Answer_Date, data.Fabric_Order_Actual_Date, data.Fabric_Order_NO, Number(data.Fabric_Actual_Order_Qty_Pcs), data.Fabric_Update_Date, data.Color_Order_Acceptance, data.Color_Order_Request_Date, data.Color_Order_Answer_Date, data.Color_Order_Actual_Date, data.Color_Order_NO, Number(data.Color_Actual_Order_Qty_Pcs), data.Color_Update_Date, data.Trim_Order_Acceptance, data.Trim_Order_Request_Date, data.Trim_Order_Answer_Date, data.Trim_Order_Actual_Date, data.Trim_Order_NO, Number(data.Trim_Actual_Order_Qty_Pcs), data.Trim_Update_Date, data.PO_Order_Acceptance, data.PO_Order_Request_Date, data.PO_Order_Answer_Date, data.PO_Order_Actual_Date, data.PO_Order_NO, Number(data.PO_Actual_Order_Qty_Pcs), data.PO_Update_Date, Number(data.Order_Qty_Pcs_Old), data.Transport_Method_Name_Old, data.Logistics_Type_Name_Old, data.Yarn_Order_Request_Date_Old, data.Fabric_Order_Request_Date_Old, data.Color_Order_Request_Date_Old, data.Trim_Order_Request_Date_Old, data.PO_Order_Request_Date_Old, data.Status, data.Display_Month_WK, Number(data.Display_Month_WK_Column), data.Group_Cd, Number(data.Show_Color_Flag), Number(data.Order_Qty_Coeff), data.Factory_Comment, data.Factory_Comment_Update_Date, data.FR_Fabric_Code, data.FR_Fabric_Name, data.Ph1_First_Discrimination_Flag_Old, data.Ph1_First_Discrimination_Flag, data.Order_Timing_Display_Value_Old, data.Order_Timing_Display_Value, data.Express_Line_Flag_Old, data.Express_Line_Flag, data.Manual_Lock_Flag_Old, data.Manual_Lock_Flag, data.Ph1_First_Discrimination_Flag_Now, data.Order_Timing_Display_Value_Now, data.Express_Line_Flag_Now, data.Manual_Lock_Flag_Now, data.Requested_Wh_DateOld, data.EXF, data.Color_Recommend, data.Trim_Recommend, data.PORecommend, Number(data.BD_EXF_DL_Setting_LTBefore_Cal), Number(data.PO_EXF_DL_Setting_LTBefore_Cal), Number(data.Material_Supplier_Holiday_Excluding), Number(data.Sewing_FTY_Holiday_Excluding), Number(data.BD_EXF_DL_Setting_LT), Number(data.PO_EXF_DL_Setting_LT), Number(data.BD_EXF_Registered_LT), Number(data.PO_EXF_Registered_LT), Number(data.BD_EXFtotal_Abnormal_LT), Number(data.PO_EXFtotal_Abnormal_LT), Number(data.Abnormal_LT_Reason_BD1), Number(data.Abnormal_LT_Reason_BD2), Number(data.Abnormal_LT_Reason_BD3), Number(data.Abnormal_LT_Reason_BD4), Number(data.Abnormal_LT_Reason_BD5), Number(data.Abnormal_LT_BD1), Number(data.Abnormal_LT_BD2), Number(data.Abnormal_LT_BD3), Number(data.Abnormal_LT_BD4), Number(data.Abnormal_LT_BD5), Number(data.Abnormal_LT_Reason_PO1), Number(data.Abnormal_LT_Reason_PO2), Number(data.Abnormal_LT_Reason_PO3), Number(data.Abnormal_LT_Reason_PO4), Number(data.Abnormal_LT_Reason_PO5), Number(data.Abnormal_LT_PO1), Number(data.Abnormal_LT_PO2), Number(data.Abnormal_LT_PO3), Number(data.Abnormal_LT_PO4), Number(data.Abnormal_LT_PO5), 'Bidhun', 1)

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
                        const updateOrder = await this.ordersRepository.update({ productionPlanId: dtoData.productionPlanId }, {
                            year: dtoData.year, planningSeason: dtoData.planningSeason, season: dtoData.season, itemBrand: dtoData.itemBrand, businessUnit: dtoData.businessUnit, itemCode: dtoData.itemCode, itemName: dtoData.itemName, mainSampleCode: dtoData.mainSampleCode, mainSampleName: dtoData.mainSampleName, supplierRMCode: dtoData.supplierRMCode, supplierRMName: dtoData.supplierRMName, vendorCode: dtoData.vendorCode, vendorName: dtoData.vendorName, managementFactoryCode: dtoData.managementFactoryCode, managementFactoryName: dtoData.managementFactoryName, branchFactoryCode: dtoData.branchFactoryCode,
                            branchFactoryName: dtoData.branchFactoryName, rmSupplierCode: dtoData.rmSupplierCode, rmSupplierName: dtoData.rmSupplierName, sewingDifficulty: dtoData.sewingDifficulty, departmentCode: dtoData.departmentCode, departmentName: dtoData.departmentName, class1Code: dtoData.class1Code, Class1Name: dtoData.Class1Name, productionPlanTypeName: dtoData.productionPlanTypeName, monthWeekFlag: dtoData.monthWeekFlag, lastUpdateDate: dtoData.lastUpdateDate, requestedWhDate: dtoData.requestedWhDate, contractedDate: dtoData.contractedDate, transportMethodName: dtoData.transportMethodName,
                            logisticsTypeName: dtoData.logisticsTypeName, orderQtyPcs: dtoData.orderQtyPcs, yarnOrderAcceptance: dtoData.yarnOrderAcceptance, yarnOrderRequestDate: dtoData.yarnOrderRequestDate, yarnOrderAnswerDate: dtoData.yarnOrderActualDate, yarnOrderActualDate: dtoData.yarnOrderActualDate, yarnOrderNO: dtoData.yarnOrderNO, yarnActualOrderQtyPcs: dtoData.yarnActualOrderQtyPcs, yarnUpdateDate: dtoData.yarnUpdateDate, fabricOrderAcceptance: dtoData.fabricOrderAcceptance, fabricOrderRequestDate: dtoData.fabricOrderRequestDate, fabricOrderAnswerDate: dtoData.fabricOrderAnswerDate,
                            fabricOrderActualDate: dtoData.fabricOrderActualDate, fabricOrderNO: dtoData.fabricOrderNO, fabricActualOrderQtyPcs: dtoData.fabricActualOrderQtyPcs, fabricUpdateDate: dtoData.fabricUpdateDate, colorOrderAcceptance: dtoData.colorOrderAcceptance, colorOrderRequestDate: dtoData.colorOrderRequestDate, colorOrderAnswerDate: dtoData.colorOrderAnswerDate, colorOrderActualDate: dtoData.colorOrderActualDate, colorOrderNO: dtoData.colorOrderNO, colorActualOrderQtyPcs: dtoData.colorActualOrderQtyPcs, colorUpdateDate: dtoData.colorUpdateDate, trimOrderAcceptance: dtoData.trimOrderAcceptance,
                            trimOrderRequestDate: dtoData.trimOrderRequestDate, trimOrderAnswerDate: dtoData.trimOrderAnswerDate, trimOrderActualDate: dtoData.trimOrderActualDate, trimOrderNO: dtoData.trimOrderNO, trimActualOrderQtyPcs: dtoData.trimActualOrderQtyPcs, trimUpdateDate: dtoData.trimUpdateDate, POOrderAcceptance: dtoData.POOrderAcceptance, POOrderRequestDate: dtoData.POOrderRequestDate, POOrderAnswerDate: dtoData.POOrderAnswerDate, POOrderActualDate: dtoData.POOrderActualDate, POOrderNO: dtoData.POOrderNO, POActualOrderQtyPcs: dtoData.POActualOrderQtyPcs, POUpdateDate: dtoData.POUpdateDate,
                            orderQtyPcsOld: dtoData.orderQtyPcsOld, transportMethodNameOld: dtoData.transportMethodNameOld, logisticsTypeNameOld: dtoData.logisticsTypeNameOld, yarnOrderRequestDateOld: dtoData.yarnOrderRequestDateOld, fabricOrderRequestDateOld: dtoData.fabricOrderRequestDateOld, colorOrderRequestDateOld: dtoData.colorOrderRequestDateOld, trimOrderRequestDateOld: dtoData.trimOrderRequestDateOld, POOrderRequestDateOld: dtoData.POOrderRequestDateOld, status: dtoData.status, displayMonthWK: dtoData.displayMonthWK, displayMonthWKColumn: dtoData.displayMonthWKColumn, groupCd: dtoData.groupCd,
                            showColorFlag: dtoData.showColorFlag, orderQtyCoeff: dtoData.orderQtyCoeff, factoryComment: dtoData.factoryComment, factoryCommentUpdateDate: dtoData.factoryCommentUpdateDate, FRFabricCode: dtoData.FRFabricCode, FRFabricName: dtoData.FRFabricName, Ph1FirstDiscriminationFlagOld: dtoData.Ph1FirstDiscriminationFlagOld, Ph1FirstDiscriminationFlag: dtoData.Ph1FirstDiscriminationFlag, orderTimingDisplayValueOld: dtoData.orderTimingDisplayValueOld, orderTimingDisplayValue: dtoData.orderTimingDisplayValue, expressLineFlagOld: dtoData.expressLineFlagOld, expressLineFlag: dtoData.expressLineFlag,
                            manualLockFlagOld: dtoData.manualLockFlagOld, manualLockFlag: dtoData.manualLockFlag, Ph1FirstDiscriminationFlagNow: dtoData.Ph1FirstDiscriminationFlagNow, orderTimingDisplayValueNow: dtoData.orderTimingDisplayValueNow, expressLineFlagNow: dtoData.expressLineFlagNow, ManualLockFlagNow: dtoData.ManualLockFlagNow, requestedWhDateOld: dtoData.requestedWhDateOld, EXF: dtoData.EXF, colorRecommend: dtoData.colorRecommend, trimRecommend: dtoData.trimRecommend, PORecommend: dtoData.PORecommend, BD_EXF_DLSettingLTBeforeCal: dtoData.BD_EXF_DLSettingLTBeforeCal,
                            PO_EXF_DLSettingLTBeforeCal: dtoData.PO_EXF_DLSettingLTBeforeCal, materialSupplierHolidayExcluding: dtoData.materialSupplierHolidayExcluding, sewingFTYHolidayExcluding: dtoData.sewingFTYHolidayExcluding, BD_EXF_DLSettingLT: dtoData.BD_EXF_DLSettingLT, PO_EXF_DLSettingLT: dtoData.PO_EXF_DLSettingLT, BD_EXFRegisteredLT: dtoData.BD_EXFRegisteredLT, PO_EXFRegisteredLT: dtoData.PO_EXFRegisteredLT, BD_EXFtotalAbnormalLT: dtoData.BD_EXFtotalAbnormalLT, PO_EXFtotalAbnormalLT: dtoData.PO_EXFtotalAbnormalLT, abnormalLTReasonBD1: dtoData.abnormalLTReasonBD1,
                            abnormalLTReasonBD2: dtoData.abnormalLTReasonBD2, abnormalLTReasonBD3: dtoData.abnormalLTReasonBD3, abnormalLTReasonBD4: dtoData.abnormalLTReasonBD4, abnormalLTReasonBD5: dtoData.abnormalLTReasonBD5, abnormalLTBD1: dtoData.abnormalLTBD1, abnormalLTBD2: dtoData.abnormalLTBD2, abnormalLTBD3: dtoData.abnormalLTBD3, abnormalLTBD4: dtoData.abnormalLTBD4, abnormalLTBD5: dtoData.abnormalLTBD5, abnormalLTReasonPO1: dtoData.abnormalLTReasonPO1, abnormalLTReasonPO2: dtoData.abnormalLTReasonPO2, abnormalLTReasonPO3: dtoData.abnormalLTReasonPO3, abnormalLTReasonPO4: dtoData.abnormalLTReasonPO4,
                            abnormalLTReasonPO5: dtoData.abnormalLTReasonPO5, abnormalLTPO1: dtoData.abnormalLTPO1, abnormalLTPO2: dtoData.abnormalLTPO2, abnormalLTPO3: dtoData.abnormalLTPO3, abnormalLTPO4: dtoData.abnormalLTPO4, abnormalLTPO5: dtoData.abnormalLTPO5, version: dtoData.version, updatedUser: dtoData.userName, orderStatus: 'UNACCEPTED'
                        })
                        if (!updateOrder.affected) {
                            return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                        }
                        const convertedExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData);
                        const saveExcelEntity: OrdersChildEntity = await this.ordersChildRepo.save(convertedExcelEntity);
                        if (saveExcelEntity) {
                            //difference insertion to order diff table
                            const existingDataKeys = Object.keys(details)
                            const currentDataKeys = Object.keys(dtoData)
                            for (const existingDataKey of existingDataKeys) {
                                if (details[existingDataKey] != data[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'version' && existingDataKey != '' && existingDataKey != 'orderStatus' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser') {
                                    const orderDiffObj = new OrdersDifferenceEntity();
                                    orderDiffObj.columnName = orderColumnValues[existingDataKey]
                                    orderDiffObj.oldValue = details[existingDataKey]
                                    orderDiffObj.newValue = dtoData[existingDataKey]
                                    orderDiffObj.displayName = existingDataKey
                                    orderDiffObj.productionPlanId = dtoData.productionPlanId
                                    orderDiffObj.version = dtoData.version
                                    if (orderDiffObj.oldValue != orderDiffObj.newValue) {
                                        const orderDiffSave = await this.orderDiffRepo.save(orderDiffObj);
                                    }
                                }
                            }
                        }
                    } else {
                        dtoData.version = 1
                        const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(dtoData);
                        const saveExcelEntity: OrdersEntity = await this.ordersRepository.save(convertedExcelEntity);
                        const convertedChildExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(dtoData);
                        const saveChildExcelEntity: OrdersChildEntity = await this.ordersChildRepo.save(convertedChildExcelEntity);
                        // const saveChildExcelDto = this.ordersChildAdapter.convertEntityToDto(saveChildExcelEntity);
                        if (!saveChildExcelEntity) {
                            flag.add(false)
                        }
                    }
                }
            }
            if (!flag.has(false)) {
                return new CommonResponseModel(true, 1, 'Data saved sucessfully')
            } else {
                return new CommonResponseModel(false, 0, 'Something went wrong')
            }
        } catch (error) {
            return new CommonResponseModel(false, 0, error)
        }
    }

    async getOrdersData(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.getOrdersData()
        return new CommonResponseModel(true, 1, 'data retrived', details)
    }

    async getQtyChangeData(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getQtyChangeData()
        return new CommonResponseModel(true, 1, 'data retrived', data)
    }

    async getContractDateChangeData(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getContractDateChangeData()
        return new CommonResponseModel(true, 1, 'data retrived', data)
    }

    async getWharehouseDateChangeData(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getWharehouseDateChangeData()
        return new CommonResponseModel(true, 1, 'data retrived', data)
    }

    async getUnitWiseOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getUnitCount()
        return new CommonResponseModel(true, 222, 'data retrieved', data)
    }

    async getDivisionWiseOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getDivisionCount()
        return new CommonResponseModel(true, 222, 'data retrieved', data)
    }

    async getMaximumChangedOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersChildRepo.getNoOfChangedItem()
        return new CommonResponseModel(true, 22, 'data retrieved', data)
    }

    async revertFileData(): Promise<CommonResponseModel>{
        const latestData = await this.ordersChildRepo.getLatestRecord()
        return new CommonResponseModel(true, 22, 'data retrieved', latestData)
    }

    async updatePath(filePath: string, filename: string, id: number): Promise<CommonResponseModel> {
        console.log('upload service id---------------', id)
        try {
            // const filePathUpdate = await this.projRepo.update(
            //     { id: id },
            //     { filePath: filePath, fileName: filename },
            // );
            // const result = await this.projRepo.findOne({ where: { id: id } })
            // console.log('************result************', result)
            // if (filePathUpdate.affected > 0) {
            //     return new CommonResponseModel(true, 11, 'uploaded successfully', filePath);
            // }
            // else {
            //     return new CommonResponseModel(false, 11, 'uploaded failed', filePath);
            // }
            return
        }
        catch (error) {
            console.log(error);
        }
    }
}
