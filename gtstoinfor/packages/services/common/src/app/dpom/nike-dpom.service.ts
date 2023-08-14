import { Injectable } from '@nestjs/common';
import { DpomRepository } from './repositories/dpom.repository';
import axios, { Axios } from 'axios';
import { DpomEntity } from './entites/dpom.entity';
import { DpomSaveDto } from './dto/dpom-save.dto';
import { DpomAdapter } from './dto/dpom.adapter';
import { DpomApproveReq } from './dto/dpom-approve.req';
import { CommonResponseModel, dpomOrderColumnsName } from '@project-management-system/shared-models';
import { DpomChildRepository } from './repositories/dpom-child.repository';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DpomChildEntity } from './entites/dpom-child.entity';
import { DpomDifferenceEntity } from './entites/dpom-difference.entity';
import { DpomChildAdapter } from './dto/dpom-child.adapter';
const moment = require('moment');
const qs = require('querystring');

@Injectable()
export class DpomService {
    constructor(
        private dpomRepository: DpomRepository,
        private dpomChildRepo: DpomChildRepository,
        private dpomAdapter: DpomAdapter,
        private dpomChildAdapter: DpomChildAdapter,
        @InjectDataSource()
        private dataSource: DataSource,
    ) { }

    async getOctaToken() {
        const payload = { 'grant_type': 'password', 'scope': 'iam.okta.factoryaffiliations.read iam.okta.factorygroups.read openid legacy_username email', 'username': 'aranganathan.muthukrishnan@shahi.co.in', 'password': 'Swath@123' }
        const headers = {
            'Authorization': 'Basic TklLRS5HU00uREgtQVBJOnVyNjNiZjR1cEIya1FKdUkxaEV6bEdYa3Z5Rjg1WHNFVE0zR0lZY3ROSDVYeVM1YU9KVDJpNVNkaWNyTUk1Nk0=', 'Cookie': 'JSESSIONID=09FD9CE633210E9561E3E8583203D2CD', 'Cache-Control': 'no-cache', 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*', 'Connection': 'keep-alive', 'Accept-Encoding': 'gzip, deflate, br'
        }
        const authConfig = {
            username: 'NIKE.GSM.DH-API',
            password: 'ur63bf4upB2kQJuI1hEzlGXkvyF85XsETM3GIYctNH5XyS5aOJT2i5SdicrMI56M'
        };
        const config = {
            headers: headers,
            auth: authConfig
        }
        const octaTokenUrl = 'https://nike.okta.com/oauth2/aus27z7p76as9Dz0H1t7/v1/token'
        const response = await axios.post(octaTokenUrl, qs.stringify(payload), config)
        if (response.status === 200) {
            return { status: true, accessToken: response.data.access_token };
        } else {
            return { status: false, error: response.statusText }
        }
    }

    async getDPOMOrderDetails(): Promise<any> {
        try {
            const tokenResponse = await this.getOctaToken();
            if (!tokenResponse.status) throw new Error(tokenResponse.error)
            const dpomItemStatusValues = ["Accepted", "Unaccepted", "Closed", "Cancelled"];
            const results = [];
            for (const status of dpomItemStatusValues) {
                const payload = {
                    "fields": [
                        "poHeader.documentDate",
                        "poHeader.poNumber",
                        "poLine.itemNumber",
                        "sizes.scheduleLineItemNumber",
                        "product.categoryCode",
                        "product.categoryDescription",
                        "poHeader.vendorCode",
                        "product.globalCategoryCoreFocusCode",
                        "product.globalCategoryCoreFocusDescription",
                        "product.genderAgeCode",
                        "product.genderAgeDescription",
                        "product.styleNumber",
                        "poLine.productCode",
                        "product.colorDescription",
                        "poLine.destinationCountryCode",
                        "poLine.destinationCountryName",
                        "poLine.plantCode",
                        "poLine.plantName",
                        "poHeader.trcoPoNumber",
                        "sizes.sizeProduct.upc",
                        "poLine.directshipSalesOrderNumber",
                        "poLine.directshipSalesOrderItemNumber",
                        "salesOrder.customerPo",
                        "salesOrder.customerShipTo",
                        "poLine.seasonCode",
                        "poLine.seasonYear",
                        "poHeader.poDocTypeCode",
                        "poHeader.poDocTypeDescription",
                        "planning.mrgacDate",
                        "poLine.originalGoodsAtConsolidatorDate",
                        "sizes.sizePo.goodsAtConsolidatorDate",
                        "sizes.sizeLogisticsOR.originReceiptActualDate",
                        "manufacturing.factoryDeliveryActualDate",
                        "sizes.sizePo.goodsAtConsolidatorReasonCode",
                        "sizes.sizePo.goodsAtConsolidatorReasonDescription",
                        "poLine.shippingType",
                        "planning.planningPriorityCode",
                        "planning.planningPriorityDescription",
                        "product.launchCode",
                        "poLine.dpomItemStatus",
                        "sizes.sizePo.transportationModeCode",
                        "poHeader.incoTerms",
                        "poHeader.purchaseGroupCode",
                        "poHeader.purchaseGroupName",
                        "poLine.itemQuantity",
                        "sizes.sizeLogisticsOR.originReceiptQuantity",
                        "sizes.sizeVas.valueAddedServiceInstructions",
                        "poLine.itemVas.valueAddedServiceInstructions",
                        "poLine.itemTextDetail.textDetails",
                        "sizes.sizePo.sizePricing.fob.crpoRateUnitValue",
                        "sizes.sizePo.sizePricing.fob.crpoCurrencyCode",
                        "sizes.sizePo.sizePricing.netIncludingDiscounts.trcoRateUnitValue",
                        "sizes.sizePo.sizePricing.netIncludingDiscounts.trcoCurrencyCode",
                        "sizes.sizePo.sizeQuantity",
                        "sizes.sizePo.sizeDescription"
                    ],
                    "search": [
                        {
                            "fieldName": "poHeader.vendorCode",
                            "operator": "=",
                            "fieldValue": "SHK"
                        },
                        {
                            "fieldName": "poLine.dpomItemStatus",
                            "operator": "=",
                            "fieldValue": status
                        }
                    ],
                    "filter": [
                        {
                            "fieldName": "product.sizeMismatchIndicator",
                            "operator": "=",
                            "fieldValue": [
                                "NO"
                            ]
                        }
                    ],
                    "offset": "0",
                    "count": 300,
                    "savedSearchID": "2e81ddd3-a131-4deb-9356-2528196ab342"
                }
                const headers = {
                    'Cache-Control': 'no-cache', 'Content-Type': 'application/json', 'Accept': '*/*', 'Connection': 'keep-alive', 'Accept-Encoding': 'gzip, deflate, br', 'Ocp-Apim-Subscription-Key': '7033b5d3725246599ab84f0946f0a2f3', 'bearer-jwt': tokenResponse.accessToken
                }
                const config = {
                    headers: headers
                }
                const octaTokenUrl = 'https://dpomservice-prod.partner.nike-cloud.com/dpom_purchaseorder/purchaseorder/v0'
                const response = await axios.post(octaTokenUrl, payload, config)
                if (response.status === 200) {
                    results.push(...response.data.objects);
                }
            }
            if (results.length > 0) {
                return { status: true, data: results };
            } else {
                return { status: false, error: 'No results found' };
            }
        } catch (error) {
            return { status: false, error: error.message };
        }
    }

    async saveDPOMDataToDataBase(): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const orderDetails = await this.getDPOMOrderDetails();
            if (!orderDetails.status) return new CommonResponseModel(false, 0, orderDetails.error)
            const flag = new Set();
            const pdfData = {
                shipToAddressLegalPO: '',
                quantity: 0,
                price: 0,
                itemVas: '',
                shipToAddressDIA: '',
                CABCode: ''
            }

            const crmData = {

                item: '012A',
                factory: '',
                customerOrder: '',
                coFinalApprovalDate: '',
                planNo: '',
                truckOutDate: '',
                actualShippedQty: '',
                coPrice: '',
                shipToAddress: '',
                paymentTerm: '',
                styleDesc: '',
                fabricContent: '',
                fabricSource: '',
                commission: '',
                PCD: ''
            }
            const date = new Date();
            const todayDate = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate()
            for (const orderDetail of orderDetails.data) {
                // Parse dates using moment
                const date3 = moment(orderDetail.sizes.sizePo.goodsAtConsolidatorDate, 'MM/DD/YYYY');
                const date4 = moment(orderDetail.poHeader.documentDate, 'MM/DD/YYYY');

                // Calculate the difference in days
                const daysDifference = date4.diff(date3, 'days');
                console.log(daysDifference, 'days')
                const dtoData = new DpomSaveDto(orderDetail.poHeader.documentDate, orderDetail.poHeader.poNumber, orderDetail.poLine.itemNumber, orderDetail.sizes.scheduleLineItemNumber, orderDetail.product.categoryCode, orderDetail.product.categoryDescription, orderDetail.poHeader.vendorCode, orderDetail.product.globalCategoryCoreFocusCode, orderDetail.product.globalCategoryCoreFocusDescription, orderDetail.product.genderAgeCode, orderDetail.product.styleNumber, orderDetail.poLine.productCode, orderDetail.product.colorDescription, orderDetail.poLine.destinationCountryCode, orderDetail.poLine.destinationCountryName, orderDetail.poLine.plantCode, orderDetail.poLine.plantName, orderDetail.poHeader.trcoPoNumber, orderDetail.sizes.sizeProduct.upc, orderDetail.poLine.directshipSalesOrderNumber, orderDetail.poLine.directshipSalesOrderItemNumber, orderDetail.salesOrder.customerPo, orderDetail.salesOrder.customerShipTo, null, orderDetail.poLine.seasonCode, orderDetail.poLine.seasonYear, orderDetail.poHeader.poDocTypeCode, orderDetail.poHeader.poDocTypeDescription, orderDetail.planning.mrgacDate, orderDetail.poLine.originalGoodsAtConsolidatorDate, orderDetail.sizes.sizePo.goodsAtConsolidatorDate, orderDetail.sizes.sizeLogisticsOR.originReceiptActualDate, orderDetail.manufacturing.factoryDeliveryActualDate, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonCode, orderDetail.poLine.shippingType, orderDetail.planning.planningPriorityCode, orderDetail.planning.planningPriorityDescription, orderDetail.product.launchCode, orderDetail.poLine.dpomItemStatus, orderDetail.sizes.sizePo.transportationModeCode, orderDetail.poHeader.incoTerms, null, orderDetail.poHeader.purchaseGroupCode, orderDetail.poHeader.purchaseGroupName, orderDetail.poLine.itemQuantity, orderDetail.sizes.sizeLogisticsOR.originReceiptQuantity, orderDetail.sizes.sizeVas.valueAddedServiceInstructions, orderDetail.poLine.itemVas.valueAddedServiceInstructions, orderDetail.poLine.itemTextDetail.textDetails, orderDetail.sizes.sizePo.sizePricing.fob.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.fob.crpoCurrencyCode, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoCurrencyCode, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoCurrencyCode, pdfData.shipToAddressLegalPO, pdfData.quantity, pdfData.price, pdfData.itemVas, pdfData.shipToAddressDIA, pdfData.CABCode, crmData.item, crmData.factory, crmData.customerOrder, crmData.coFinalApprovalDate, crmData.planNo, crmData.truckOutDate, crmData.actualShippedQty, crmData.coPrice, crmData.shipToAddress, crmData.paymentTerm, crmData.styleDesc, crmData.fabricContent, crmData.fabricSource, crmData.commission, crmData.PCD, 'hanger', orderDetail.poHeader.poNumber + '-' + orderDetail.poLine.itemNumber, todayDate, (daysDifference).toLocaleString(), todayDate, 'username')

                const details = await this.dpomRepository.findOne({ where: { purchaseOrderNumber: dtoData.purchaseOrderNumber, poLineItemNumber: dtoData.poLineItemNumber, scheduleLineItemNumber: dtoData.scheduleLineItemNumber } })
                // const versionDetails = await this.dpomChildRepo.getVersion(dtoData.purchaseOrderNumber)
                let version = 1;
                // if (versionDetails.length > 0) {
                //     version = Number(versionDetails.length) + 1
                // }
                dtoData.odVersion = version
                if (details) {
                    const updateOrder = await transactionManager.getRepository(DpomEntity).update({ purchaseOrderNumber: dtoData.purchaseOrderNumber, poLineItemNumber: dtoData.poLineItemNumber, scheduleLineItemNumber: dtoData.scheduleLineItemNumber }, {
                        documentDate: dtoData.documentDate, categoryCode: dtoData.categoryCode, categoryDesc: dtoData.categoryDesc, vendorCode: dtoData.vendorCode, gccFocusCode: dtoData.gccFocusCode, gccFocusDesc: dtoData.gccFocusDesc, genderAgeCode: dtoData.genderAgeCode, styleNumber: dtoData.styleNumber, productCode: dtoData.productCode, colorDesc: dtoData.colorDesc, destinationCountryCode: dtoData.destinationCountryCode, destinationCountry: dtoData.destinationCountry, plant: dtoData.plant, plantName: dtoData.plantName, tradingCoPoNumber: dtoData.tradingCoPoNumber, UPC: dtoData.UPC, directShipSONumber: dtoData.directShipSONumber, directShipSOItemNumber: dtoData.directShipSOItemNumber, customerPO: dtoData.customerPO, shipToCustomerNumber: dtoData.shipToCustomerNumber, shipToCustomerName: dtoData.shipToCustomerName, planningSeasonCode: dtoData.planningSeasonCode, planningSeasonYear: dtoData.planningSeasonYear, docTypeCode: dtoData.docTypeCode, docTypeDesc: dtoData.docTypeDesc, MRGAC: dtoData.MRGAC, OGAC: dtoData.OGAC, GAC: dtoData.GAC, originReceiptDate: dtoData.originReceiptDate, factoryDeliveryActDate: dtoData.factoryDeliveryActDate, GACReasonCode: dtoData.GACReasonCode, shippingType: dtoData.shippingType, planningPriorityCode: dtoData.planningPriorityCode, planningPriorityDesc: dtoData.planningPriorityDesc, launchCode: dtoData.launchCode, DPOMLineItemStatus: dtoData.DPOMLineItemStatus, modeOfTransportationCode: dtoData.modeOfTransportationCode, inCoTerms: dtoData.inCoTerms, inventorySegmentCode: dtoData.inventorySegmentCode, purchaseGroupCode: dtoData.purchaseGroupCode, purchaseGroupName: dtoData.purchaseGroupName, totalItemQty: dtoData.totalItemQty, originReceiptQty: dtoData.originReceiptQty, VASSize: dtoData.VASSize, itemVasText: dtoData.itemVasText, itemText: dtoData.itemText, grossPriceFOB: dtoData.grossPriceFOB, FOBCurrencyCode: dtoData.FOBCurrencyCode, netIncludingDisc: dtoData.netIncludingDisc, netIncludingDiscCurrencyCode: dtoData.netIncludingDiscCurrencyCode, trCoNetIncludingDisc: dtoData.trCoNetIncludingDisc, trCoNetIncludingDiscCurrencyCode: dtoData.trCoNetIncludingDiscCurrencyCode, shipToAddressLegalPO: pdfData.shipToAddressLegalPO, quantity: pdfData.quantity, price: pdfData.price, itemVas: pdfData.itemVas, shipToAddressDIA: pdfData.shipToAddressDIA, CABCode: pdfData.CABCode, item: crmData.item, factory: crmData.factory, customerOrder: crmData.customerOrder, coFinalApprovalDate: crmData.coFinalApprovalDate, planNo: crmData.planNo, truckOutDate: crmData.truckOutDate, actualShippedQty: crmData.actualShippedQty, coPrice: crmData.coPrice, shipToAddress: crmData.shipToAddress, paymentTerm: crmData.paymentTerm, styleDesc: crmData.styleDesc, fabricContent: crmData.fabricContent, fabricSource: crmData.fabricSource, commission: crmData.commission, PCD: crmData.PCD, odVersion: dtoData.odVersion
                    })
                    if (!updateOrder.affected) {
                        await transactionManager.releaseTransaction();
                        return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                    }
                    const convertedExcelEntity: Partial<DpomChildEntity> = this.dpomChildAdapter.convertDtoToEntity(dtoData);
                    const saveExcelEntity: DpomChildEntity = await transactionManager.getRepository(DpomChildEntity).save(convertedExcelEntity);
                    if (saveExcelEntity) {
                        //difference insertion to order diff table
                        const existingDataKeys = Object.keys(details)
                        const currentDataKeys = Object.keys(dtoData)
                        for (const existingDataKey of existingDataKeys) {
                            if (details[existingDataKey] != orderDetail[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'odVersion' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser' && existingDataKey != 'versionFlag' && existingDataKey != 'isActive' && existingDataKey != 'recordDate' && existingDataKey != 'lastModifiedDate' && existingDataKey != 'id') {
                                const dpomDiffObj = new DpomDifferenceEntity();
                                dpomDiffObj.oldValue = details[existingDataKey]
                                dpomDiffObj.newValue = dtoData[existingDataKey]
                                dpomDiffObj.columnName = dpomOrderColumnsName[existingDataKey]
                                dpomDiffObj.displayName = existingDataKey
                                dpomDiffObj.purchaseOrderNumber = dtoData.purchaseOrderNumber
                                dpomDiffObj.poLineItemNumber = dtoData.poLineItemNumber
                                dpomDiffObj.scheduleLineItemNumber = dtoData.scheduleLineItemNumber
                                dpomDiffObj.odVersion = dtoData.odVersion
                                if (dpomDiffObj.oldValue != dpomDiffObj.newValue) {
                                    const dpomDiffSave = await transactionManager.getRepository(DpomDifferenceEntity).save(dpomDiffObj);
                                    if (!dpomDiffSave) {
                                        flag.add(false)
                                        await transactionManager.releaseTransaction();
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    dtoData.odVersion = 1
                    const convertedExcelEntity: Partial<DpomEntity> = this.dpomAdapter.convertDtoToEntity(dtoData);
                    const saveExcelEntity: DpomEntity = await transactionManager.getRepository(DpomEntity).save(convertedExcelEntity);
                    const convertedChildExcelEntity: Partial<DpomChildEntity> = this.dpomChildAdapter.convertDtoToEntity(dtoData);
                    const saveChildExcelEntity: DpomChildEntity = await transactionManager.getRepository(DpomChildEntity).save(convertedChildExcelEntity);
                    // const saveChildExcelDto = this.ordersChildAdapter.convertEntityToDto(saveChildExcelEntity);
                    if (!saveExcelEntity || !saveChildExcelEntity) {
                        flag.add(false)
                        await transactionManager.releaseTransaction();
                        break;
                    }
                }
            }
            if (flag.has(false)) {
                await transactionManager.releaseTransaction()
                return new CommonResponseModel(false, 0, 'something went wrong')
            } else {
                await transactionManager.completeTransaction()
                return new CommonResponseModel(true, 1, 'Data retrived successfully')
            }
        } catch (error) {
            await transactionManager.releaseTransaction()
            return new CommonResponseModel(false, 0, error)
        }
    }

    async getFactoryReportData(): Promise<CommonResponseModel> {
        const details = await this.dpomRepository.find();
        return new CommonResponseModel(true, 1, 'data retrived', details)

    }

    async getByFactoryStatus(req: DpomSaveDto) {
        const record = await this.dpomRepository.find({
            where: { DPOMLineItemStatus: req.DPOMLineItemStatus },
        });
        if (record) {
            return record;
        } else {
            return 'no data found';
        }
    }

    async getPlantWisePoOrders(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPlantCount()
        if (data)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getStatusWiseItems(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getStatusWiseItemCount()
        if (data)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getOrderAcceptanceData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.find()
        console.log(data)
        if (data) {
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        } else {
            return new CommonResponseModel(false, 0, 'No data found');
        }
    }

    async approveDpomLineItemStatus(req: DpomApproveReq): Promise<CommonResponseModel> {
        const purchaseOrderNumber = req.purchaseOrderNumber
        const poLineItemNumber = req.poLineItemNumber
        const scheduleLineItemNumber = req.scheduleLineItemNumber
        const updateStatus = await this.dpomRepository.update({ purchaseOrderNumber: purchaseOrderNumber, poLineItemNumber: poLineItemNumber, scheduleLineItemNumber: scheduleLineItemNumber }, { DPOMLineItemStatus: 'Accepted' })
        if (updateStatus) {
            return new CommonResponseModel(true, 1, 'Status Updated')
        } else {
            return new CommonResponseModel(false, 0, 'Something went wrong');
        }
    }
}
