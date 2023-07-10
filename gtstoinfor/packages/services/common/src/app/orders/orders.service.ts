import { Injectable } from '@nestjs/common';
import { CommonResponseModel, orderColumnValues } from '@project-management-system/shared-models';
import { SaveOrderDto } from './models/save-order-dto';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersEntity } from './orders.entity';
import { OrdersAdapter } from './adapters/orders.adapter';
import { OrdersChildRepository } from './repository/orders-child.repository';
import { OrdersChildEntity } from './orders-child.entity';
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

    async saveOrdersData(dto: SaveOrderDto[]): Promise<CommonResponseModel> {
        const flag = new Set()
        for (const data of dto) {
            const details = await this.ordersRepository.findOne({ where: { productionPlanId: data.productionPlanId } })
            console.log(details)
            if (details) {

                const versionDetails = await this.ordersChildRepo.getVersion(data.productionPlanId)
                let version;
                if (versionDetails.length > 0) {
                    version = Number(versionDetails.length) + 1
                } else {
                    version = 1
                }
                data.version = version
                const updatedData = this.ordersAdapter.convertDtoToEntity(data);
                const updateOrder = await this.ordersRepository.update({ productionPlanId: data.productionPlanId }, {
                    year: data.year, planningSeason: data.planningSeason, season: data.season, itemBrand: data.itemBrand, businessUnit: data.businessUnit,
                    itemCode: data.itemCode, itemName: data.itemName, mainSampleCode: data.mainSampleCode, mainSampleName: data.mainSampleName,
                    supplierRMCode: data.supplierRMCode, supplierRMName: data.supplierRMName, vendorCode: data.vendorCode, vendorName: data.vendorName,
                    managementFactoryCode: data.managementFactoryCode, managementFactoryName: data.managementFactoryName, branchFactoryCode: data.branchFactoryCode,
                    branchFactoryName: data.branchFactoryName, rmSupplierCode: data.rmSupplierCode, rmSupplierName: data.rmSupplierName, sewingDifficulty: data.sewingDifficulty,
                    departmentCode: data.departmentCode, departmentName: data.departmentName, class1Code: data.class1Code, Class1Name: data.Class1Name,
                    productionPlanTypeName: data.productionPlanTypeName, monthWeekFlag: data.monthWeekFlag, lastUpdateDate: data.lastUpdateDate,
                    requestedWhDate: data.requestedWhDate, contractedDate: data.contractedDate, transportMethodName: data.transportMethodName,
                    logisticsTypeName: data.logisticsTypeName, orderQtyPcs: data.orderQtyPcs, yarnOrderAcceptance: data.yarnOrderAcceptance,
                    yarnOrderRequestDate: data.yarnOrderRequestDate, yarnOrderAnswerDate: data.yarnOrderActualDate, yarnOrderActualDate: data.yarnOrderActualDate,
                    yarnOrderNO: data.yarnOrderNO, yarnActualOrderQtyPcs: data.yarnActualOrderQtyPcs, yarnUpdateDate: data.yarnUpdateDate, fabricOrderAcceptance: data.fabricOrderAcceptance,
                    fabricOrderRequestDate: data.fabricOrderRequestDate, fabricOrderAnswerDate: data.fabricOrderAnswerDate, fabricOrderActualDate: data.fabricOrderActualDate,
                    fabricOrderNO: data.fabricOrderNO, fabricActualOrderQtyPcs: data.fabricActualOrderQtyPcs, fabricUpdateDate: data.fabricUpdateDate,
                    colorOrderAcceptance: data.colorOrderAcceptance, colorOrderRequestDate: data.colorOrderRequestDate, colorOrderAnswerDate: data.colorOrderAnswerDate,
                    colorOrderActualDate: data.colorOrderActualDate, colorOrderNO: data.colorOrderNO, colorActualOrderQtyPcs: data.colorActualOrderQtyPcs,
                    colorUpdateDate: data.colorUpdateDate, trimOrderAcceptance: data.trimOrderAcceptance, trimOrderRequestDate: data.trimOrderRequestDate,
                    trimOrderAnswerDate: data.trimOrderAnswerDate, trimOrderActualDate: data.trimOrderActualDate, trimOrderNO: data.trimOrderNO, trimActualOrderQtyPcs: data.trimActualOrderQtyPcs,
                    trimUpdateDate: data.trimUpdateDate, POOrderAcceptance: data.POOrderAcceptance, POOrderRequestDate: data.POOrderRequestDate, POOrderAnswerDate: data.POOrderAnswerDate,
                    POOrderActualDate: data.POOrderActualDate, POOrderNO: data.POOrderNO, POActualOrderQtyPcs: data.POActualOrderQtyPcs, POUpdateDate: data.POUpdateDate,
                    orderQtyPcsOld: data.orderQtyPcsOld, transportMethodNameOld: data.transportMethodNameOld, logisticsTypeNameOld: data.logisticsTypeNameOld,
                    yarnOrderRequestDateOld: data.yarnOrderRequestDateOld, fabricOrderRequestDateOld: data.fabricOrderRequestDateOld, colorOrderRequestDateOld: data.colorOrderRequestDateOld,
                    trimOrderRequestDateOld: data.trimOrderRequestDateOld, POOrderRequestDateOld: data.POOrderRequestDateOld, status: data.status, displayMonthWK: data.displayMonthWK,
                    displayMonthWKColumn: data.displayMonthWKColumn, groupCd: data.groupCd, showColorFlag: data.showColorFlag, orderQtyCoeff: data.orderQtyCoeff, factoryComment: data.factoryComment,
                    factoryCommentUpdateDate: data.factoryCommentUpdateDate, FRFabricCode: data.FRFabricCode, FRFabricName: data.FRFabricName, Ph1FirstDiscriminationFlagOld: data.Ph1FirstDiscriminationFlagOld,
                    Ph1FirstDiscriminationFlag: data.Ph1FirstDiscriminationFlag, orderTimingDisplayValueOld: data.orderTimingDisplayValueOld, orderTimingDisplayValue: data.orderTimingDisplayValue, expressLineFlagOld: data.expressLineFlagOld,
                    expressLineFlag: data.expressLineFlag, manualLockFlagOld: data.manualLockFlagOld, manualLockFlag: data.manualLockFlag, Ph1FirstDiscriminationFlagNow: data.Ph1FirstDiscriminationFlagNow, orderTimingDisplayValueNow: data.orderTimingDisplayValueNow,
                    expressLineFlagNow: data.expressLineFlagNow, ManualLockFlagNow: data.ManualLockFlagNow, requestedWhDateOld: data.requestedWhDateOld, EXF: data.EXF, colorRecommend: data.colorRecommend, trimRecommend: data.trimRecommend,
                    PORecommend: data.PORecommend, BD_EXF_DLSettingLTBeforeCal: data.BD_EXF_DLSettingLTBeforeCal, PO_EXF_DLSettingLTBeforeCal: data.PO_EXF_DLSettingLTBeforeCal, materialSupplierHolidayExcluding: data.materialSupplierHolidayExcluding,
                    sewingFTYHolidayExcluding: data.sewingFTYHolidayExcluding, BD_EXF_DLSettingLT: data.BD_EXF_DLSettingLT, PO_EXF_DLSettingLT: data.PO_EXF_DLSettingLT, BD_EXFRegisteredLT: data.BD_EXFRegisteredLT, PO_EXFRegisteredLT: data.PO_EXFRegisteredLT,
                    BD_EXFtotalAbnormalLT: data.BD_EXFtotalAbnormalLT, PO_EXFtotalAbnormalLT: data.PO_EXFtotalAbnormalLT, abnormalLTReasonBD1: data.abnormalLTReasonBD1, abnormalLTReasonBD2: data.abnormalLTReasonBD2, abnormalLTReasonBD3: data.abnormalLTReasonBD3,
                    abnormalLTReasonBD4: data.abnormalLTReasonBD4, abnormalLTReasonBD5: data.abnormalLTReasonBD5, abnormalLTBD1: data.abnormalLTBD1, abnormalLTBD2: data.abnormalLTBD2, abnormalLTBD3: data.abnormalLTBD3, abnormalLTBD4: data.abnormalLTBD4, abnormalLTBD5: data.abnormalLTBD5,
                    abnormalLTReasonPO1: data.abnormalLTReasonPO1, abnormalLTReasonPO2: data.abnormalLTReasonPO2, abnormalLTReasonPO3: data.abnormalLTReasonPO3, abnormalLTReasonPO4: data.abnormalLTReasonPO4, abnormalLTReasonPO5: data.abnormalLTReasonPO5, abnormalLTPO1: data.abnormalLTPO1,
                    abnormalLTPO2: data.abnormalLTPO2, abnormalLTPO3: data.abnormalLTPO3, abnormalLTPO4: data.abnormalLTPO4, abnormalLTPO5: data.abnormalLTPO5, version: data.version
                })
                if (!updateOrder.affected) {
                    return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                }
                const convertedExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(data);
                const saveExcelEntity: OrdersChildEntity = await this.ordersChildRepo.save(convertedExcelEntity);
                const saveExcelDto = this.ordersChildAdapter.convertEntityToDto(saveExcelEntity);
                if (!saveExcelDto) {
                    flag.add(false)
                }
                if (saveExcelDto) {
                    //difference insertion to order diff table
                    const existingDataKeys = Object.keys(details)
                    const currentDataKeys = Object.keys(dto)
                    for (const existingDataKey of existingDataKeys) {
                        if (details[existingDataKey] != data[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'version') {
                            console.log(existingDataKey, 'existingDataKey')
                            console.log(data[existingDataKey], 'dataujiu')
                            console.log(details[existingDataKey], 'ppppppp')
                            console.log(details[existingDataKey], 'ppppppp')
                            const orderDiffObj = new OrdersDifferenceEntity();
                            orderDiffObj.columnName = orderColumnValues[existingDataKey]
                            orderDiffObj.oldValue = details[existingDataKey]
                            orderDiffObj.newValue = data[existingDataKey]
                            orderDiffObj.displayName = existingDataKey
                            orderDiffObj.productionPlanId = data.productionPlanId
                            const orderDiffSave = await this.orderDiffRepo.save(orderDiffObj);
                        }
                    }
                }
            } else {
                const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(data);
                const saveExcelEntity: OrdersEntity = await this.ordersRepository.save(convertedExcelEntity);
                const saveExcelDto = this.ordersAdapter.convertEntityToDto(saveExcelEntity);
                data.version = 1
                const convertedChildExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(data);
                const saveChildExcelEntity: OrdersChildEntity = await this.ordersChildRepo.save(convertedChildExcelEntity);
                const saveChildExcelDto = this.ordersChildAdapter.convertEntityToDto(saveChildExcelEntity);
                if (!saveExcelDto) {
                    flag.add(false)
                }
            }
        }
        if (!flag.has(false)) {
            return new CommonResponseModel(true, 1, 'Data saved sucessfully')
        } else {
            return new CommonResponseModel(false, 0, 'Something went wrong')
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
}
