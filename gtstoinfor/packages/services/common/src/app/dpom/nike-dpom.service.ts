import { Injectable } from '@nestjs/common';
import { DpomRepository } from './repositories/dpom.repository';
import axios, { Axios } from 'axios';
import { DpomEntity } from './entites/dpom.entity';
import { DpomSaveDto } from './dto/dpom-save.dto';
import { DpomAdapter } from './dto/dpom.adapter';
import { DpomApproveReq } from './dto/dpom-approve.req';
import { CommonResponseModel, DivertModel, FactoryReportModel, FactoryReportSizeModel, FileStatusReq, MarketingModel, NewDivertModel, OldDivertModel, PoData, PoDataResDto, PpmDateFilterRequest, ReportType, dpomOrderColumnsName } from '@project-management-system/shared-models';
import { DpomChildRepository } from './repositories/dpom-child.repository';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { InjectDataSource } from '@nestjs/typeorm';
import { Between, DataSource } from 'typeorm';
import { DpomChildEntity } from './entites/dpom-child.entity';
import { DpomDifferenceEntity } from './entites/dpom-difference.entity';
import { DpomChildAdapter } from './dto/dpom-child.adapter';
import { DpomDifferenceRepository } from './repositories/dpom-difference.repository';
import { NikeFileUploadRepository } from './repositories/upload.repository';
import { FileIdReq } from '../orders/models/file-id.req';
import { NikeFileUploadEntity } from './entites/upload-file.entity';
import { Cron } from '@nestjs/schedule';
import { DiaPDFDto } from './dto/diaPDF.dto';
const { diff_match_patch: DiffMatchPatch } = require('diff-match-patch');
import { PoAndQtyReq } from './dto/po-qty.req';
import { PoQty } from './dto/poqty.req';
import { Console } from 'console';
import { FactoryUpdate } from './dto/factory-update.req';
const moment = require('moment');
const qs = require('querystring');

@Injectable()
export class DpomService {
    constructor(
        private dpomRepository: DpomRepository,
        private dpomChildRepo: DpomChildRepository,
        private dpomDiffRepo: DpomDifferenceRepository,
        private dpomAdapter: DpomAdapter,
        private dpomChildAdapter: DpomChildAdapter,
        private fileUploadRepo: NikeFileUploadRepository,
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
                        "sizes.sizePo.sizeDescription",
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

    @Cron('0 8 * * *')
    async saveDPOMApiDataToDataBase(): Promise<CommonResponseModel> {
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
                itemVasPDF: '',
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
                coPrice: null,
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
            const entity = new NikeFileUploadEntity()
            entity.fileName = 'DPOM Api';
            entity.filePath = 'DPOM Api';
            entity.status = 'Success';
            entity.createdUser = 'API sync'
            const save = await transactionManager.getRepository(NikeFileUploadEntity).save(entity);
            for (const orderDetail of orderDetails.data) {
                // Parse dates using moment
                const date3 = moment(orderDetail.sizes.sizePo.goodsAtConsolidatorDate, 'MM/DD/YYYY');
                const date4 = moment(orderDetail.poHeader.documentDate, 'MM/DD/YYYY');

                // Calculate the difference in days
                const daysDifference = date4.diff(date3, 'days');

                const text = "HANGING IS REQUIRED: Each garment must be hung on a GS1 black style hanger HCLR12. The carton contents should be placed in at least one GOH polybag and polybag(s) placed in a GOH shipping carton. A per unit upcharge has been added to this PO for garment on hanger. CROWN SIZER REQUIRED: A Crown Sizer must be placed on all hangers for this Purchase Order. Purchase order is to be packed by sku(one style / color / size) per carton. Total units per carton should be 012 units per carton."
                //orderDetail.poLine.itemVas.valueAddedServiceInstructions;
                const searchText = "HANGING IS REQUIRED";
                let hanger: string;
                if (text.includes(searchText)) {
                    const hanger = 'YES'
                } else {
                    hanger = 'NO';
                }

                // Diverted PO's
                const itemText = orderDetail.poLine.itemTextDetail.textDetails;
                const pattern = /diverted to.*?Purchase Order (\d+ \/ \d+)/g;
                const matches = [];

                let match;
                if (itemText !== null) {
                    while ((match = pattern.exec(itemText)) !== null) {
                        matches.push(match[1]);
                    }
                }

                const dtoData = new DpomSaveDto(orderDetail.poHeader.documentDate, orderDetail.poHeader.poNumber, orderDetail.poLine.itemNumber, orderDetail.sizes.scheduleLineItemNumber, orderDetail.product.categoryCode, orderDetail.product.categoryDescription, orderDetail.poHeader.vendorCode, orderDetail.product.globalCategoryCoreFocusCode, orderDetail.product.globalCategoryCoreFocusDescription, orderDetail.product.genderAgeCode, orderDetail.product.genderAgeDescription, orderDetail.product.styleNumber,
                    orderDetail.poLine.productCode, orderDetail.product.colorDescription, orderDetail.poLine.destinationCountryCode, orderDetail.poLine.destinationCountryName, orderDetail.poLine.plantCode, orderDetail.poLine.plantName, orderDetail.poHeader.trcoPoNumber, orderDetail.sizes.sizeProduct.upc, orderDetail.poLine.directshipSalesOrderNumber, orderDetail.poLine.directshipSalesOrderItemNumber, orderDetail.salesOrder.customerPo, orderDetail.salesOrder.customerShipTo, null,
                    orderDetail.poLine.seasonCode, orderDetail.poLine.seasonYear, orderDetail.poHeader.poDocTypeCode, orderDetail.poHeader.poDocTypeDescription, orderDetail.planning.mrgacDate, orderDetail.poLine.originalGoodsAtConsolidatorDate, orderDetail.sizes.sizePo.goodsAtConsolidatorDate, orderDetail.sizes.sizeLogisticsOR.originReceiptActualDate, orderDetail.manufacturing.factoryDeliveryActualDate, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonCode, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonDescription,
                    orderDetail.poLine.shippingType, orderDetail.planning.planningPriorityCode, orderDetail.planning.planningPriorityDescription, orderDetail.product.launchCode, orderDetail.poLine.dpomItemStatus, orderDetail.sizes.sizePo.transportationModeCode, orderDetail.poHeader.incoTerms, null, orderDetail.poHeader.purchaseGroupCode, orderDetail.poHeader.purchaseGroupName, orderDetail.poLine.itemQuantity, orderDetail.sizes.sizeLogisticsOR.originReceiptQuantity,
                    orderDetail.sizes.sizeVas.valueAddedServiceInstructions, orderDetail.poLine.itemVas.valueAddedServiceInstructions, orderDetail.poLine.itemTextDetail.textDetails, orderDetail.sizes.sizePo.sizePricing.fob.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.fob.crpoCurrencyCode, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoCurrencyCode,
                    orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoCurrencyCode, orderDetail.sizes.sizePo.sizeQuantity, orderDetail.sizes.sizePo.sizeDescription, pdfData.shipToAddressLegalPO, pdfData.quantity, pdfData.price, pdfData.itemVasPDF, pdfData.shipToAddressDIA, pdfData.CABCode, crmData.item, crmData.factory, crmData.customerOrder, crmData.coFinalApprovalDate,
                    crmData.planNo, crmData.truckOutDate, crmData.actualShippedQty, crmData.coPrice, crmData.shipToAddress, crmData.paymentTerm, crmData.styleDesc, crmData.fabricContent, crmData.fabricSource, crmData.commission, crmData.PCD, hanger, orderDetail.poHeader.poNumber + '-' + orderDetail.poLine.itemNumber, todayDate, (daysDifference).toLocaleString(), todayDate, matches, 'username')
                const details = await this.dpomRepository.findOne({ where: { purchaseOrderNumber: dtoData.purchaseOrderNumber, poLineItemNumber: dtoData.poLineItemNumber, scheduleLineItemNumber: dtoData.scheduleLineItemNumber } })
                const versionDetails = await this.dpomChildRepo.getVersion(dtoData.purchaseOrderNumber, dtoData.poLineItemNumber, dtoData.scheduleLineItemNumber)
                let version = 1;
                if (versionDetails.length > 0) {
                    version = Number(versionDetails.length) + 1
                }
                dtoData.odVersion = version
                if (details) {
                    const updateOrder = await transactionManager.getRepository(DpomEntity).update({ purchaseOrderNumber: dtoData.purchaseOrderNumber, poLineItemNumber: dtoData.poLineItemNumber, scheduleLineItemNumber: dtoData.scheduleLineItemNumber }, {
                        documentDate: dtoData.documentDate, categoryCode: dtoData.categoryCode, categoryDesc: dtoData.categoryDesc, vendorCode: dtoData.vendorCode, gccFocusCode: dtoData.gccFocusCode, gccFocusDesc: dtoData.gccFocusDesc, genderAgeCode: dtoData.genderAgeCode, genderAgeDesc: dtoData.genderAgeDesc, styleNumber: dtoData.styleNumber, productCode: dtoData.productCode, colorDesc: dtoData.colorDesc, destinationCountryCode: dtoData.destinationCountryCode, destinationCountry: dtoData.destinationCountry, plant: dtoData.plant, plantName: dtoData.plantName, tradingCoPoNumber: dtoData.tradingCoPoNumber, UPC: dtoData.UPC, directShipSONumber: dtoData.directShipSONumber, directShipSOItemNumber: dtoData.directShipSOItemNumber, customerPO: dtoData.customerPO, shipToCustomerNumber: dtoData.shipToCustomerNumber, shipToCustomerName: dtoData.shipToCustomerName, planningSeasonCode: dtoData.planningSeasonCode, planningSeasonYear: dtoData.planningSeasonYear, docTypeCode: dtoData.docTypeCode, docTypeDesc: dtoData.docTypeDesc, MRGAC: dtoData.MRGAC, OGAC: dtoData.OGAC, GAC: dtoData.GAC, originReceiptDate: dtoData.originReceiptDate, factoryDeliveryActDate: dtoData.factoryDeliveryActDate, GACReasonCode: dtoData.GACReasonCode, GACReasonDesc: dtoData.GACReasonDesc, shippingType: dtoData.shippingType, planningPriorityCode: dtoData.planningPriorityCode, planningPriorityDesc: dtoData.planningPriorityDesc, launchCode: dtoData.launchCode, DPOMLineItemStatus: dtoData.DPOMLineItemStatus, modeOfTransportationCode: dtoData.modeOfTransportationCode, inCoTerms: dtoData.inCoTerms, inventorySegmentCode: dtoData.inventorySegmentCode, purchaseGroupCode: dtoData.purchaseGroupCode, purchaseGroupName: dtoData.purchaseGroupName, totalItemQty: dtoData.totalItemQty, originReceiptQty: dtoData.originReceiptQty, VASSize: dtoData.VASSize, itemVasText: dtoData.itemVasText, itemText: dtoData.itemText, grossPriceFOB: dtoData.grossPriceFOB, FOBCurrencyCode: dtoData.FOBCurrencyCode, netIncludingDisc: dtoData.netIncludingDisc, netIncludingDiscCurrencyCode: dtoData.netIncludingDiscCurrencyCode, trCoNetIncludingDisc: dtoData.trCoNetIncludingDisc, trCoNetIncludingDiscCurrencyCode: dtoData.trCoNetIncludingDiscCurrencyCode, sizeQuantity: dtoData.sizeQuantity, sizeDescription: dtoData.sizeDescription, shipToAddressLegalPO: pdfData.shipToAddressLegalPO, quantity: pdfData.quantity, price: pdfData.price, itemVasPDF: pdfData.itemVasPDF, shipToAddressDIA: pdfData.shipToAddressDIA, CABCode: pdfData.CABCode, item: crmData.item, factory: crmData.factory, customerOrder: crmData.customerOrder, coFinalApprovalDate: crmData.coFinalApprovalDate, planNo: crmData.planNo, truckOutDate: crmData.truckOutDate, actualShippedQty: crmData.actualShippedQty, coPrice: crmData.coPrice, shipToAddress: crmData.shipToAddress, paymentTerm: crmData.paymentTerm, styleDesc: crmData.styleDesc, fabricContent: crmData.fabricContent, fabricSource: crmData.fabricSource, commission: crmData.commission, PCD: crmData.PCD, odVersion: dtoData.odVersion, divertedToPos: dtoData.divertedToPos.join(',')
                    })
                    if (!updateOrder.affected) {
                        await transactionManager.releaseTransaction();
                        return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                    }
                    const convertedExcelEntity: Partial<DpomChildEntity> = this.dpomChildAdapter.convertDtoToEntity(dtoData, details.id);
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
                                dpomDiffObj.fileId = save.id
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
                    const convertedChildExcelEntity: Partial<DpomChildEntity> = this.dpomChildAdapter.convertDtoToEntity(dtoData, saveExcelEntity.id);
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

    async saveDPOMExcelData(formData: any, id: number): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const flag = new Set()
            const pdfData = {
                shipToAddressLegalPO: '',
                quantity: 0,
                price: 0,
                itemVasPDF: '',
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
                coPrice: null,
                shipToAddress: '',
                paymentTerm: '',
                styleDesc: '',
                fabricContent: '',
                fabricSource: '',
                commission: '',
                PCD: ''
            }
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

            const date = new Date();
            const todayDate = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate()
            for (const orderDetail of convertedData) {
                const date3 = moment(orderDetail.sizes.sizePo.goodsAtConsolidatorDate);
                const date4 = moment(orderDetail.poHeader.documentDate);
                const days = date4.diff(date3, 'days')
                const daysDifference = days;
                let version = 1;
                const text = orderDetail.poLine.itemVas.valueAddedServiceInstructions;
                const searchText = "HANGING IS REQUIRED";
                let hanger: string;
                if (text.includes(searchText)) {
                    hanger = 'YES'
                } else {
                    hanger = 'NO';
                }

                // Diverted PO's
                const itemText = orderDetail.poLine.itemTextDetail.textDetails;
                const pattern = /diverted to.*?Purchase Order (\d+ \/ \d+)/g;
                const matches = [];

                let match;
                if (itemText !== null) {
                    while ((match = pattern.exec(itemText)) !== null) {
                        matches.push(match[1]);
                    }
                }

                const dtoData = new DpomSaveDto(orderDetail.poHeader.documentDate, orderDetail.poHeader.poNumber, orderDetail.poLine.itemNumber, orderDetail.sizes.scheduleLineItemNumber, orderDetail.product.categoryCode, orderDetail.product.categoryDescription, orderDetail.poHeader.vendorCode, orderDetail.product.globalCategoryCoreFocusCode, orderDetail.product.globalCategoryCoreFocusDescription, orderDetail.product.genderAgeCode, orderDetail.product.genderAgeDescription, orderDetail.product.styleNumber,
                    orderDetail.poLine.productCode, orderDetail.product.colorDescription, orderDetail.poLine.destinationCountryCode, orderDetail.poLine.destinationCountryName, orderDetail.poLine.plantCode, orderDetail.poLine.plantName, orderDetail.poHeader.trcoPoNumber, orderDetail.sizes.sizeProduct.upc, orderDetail.poLine.directshipSalesOrderNumber, orderDetail.poLine.directshipSalesOrderItemNumber, orderDetail.salesOrder.customerPo, orderDetail.salesOrder.customerShipTo, null,
                    orderDetail.poLine.seasonCode, orderDetail.poLine.seasonYear, orderDetail.poHeader.poDocTypeCode, orderDetail.poHeader.poDocTypeDescription, orderDetail.planning.mrgacDate, orderDetail.poLine.originalGoodsAtConsolidatorDate, orderDetail.sizes.sizePo.goodsAtConsolidatorDate, orderDetail.sizes.sizeLogisticsOR.originReceiptActualDate, orderDetail.manufacturing.factoryDeliveryActualDate, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonCode, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonDescription,
                    orderDetail.poLine.shippingType, orderDetail.planning.planningPriorityCode, orderDetail.planning.planningPriorityDescription, orderDetail.product.launchCode, orderDetail.poLine.dpomItemStatus, orderDetail.sizes.sizePo.transportationModeCode, orderDetail.poHeader.incoTerms, null, orderDetail.poHeader.purchaseGroupCode, orderDetail.poHeader.purchaseGroupName, orderDetail.poLine.itemQuantity, orderDetail.sizes.sizeLogisticsOR.originReceiptQuantity,
                    orderDetail.sizes.sizeVas.valueAddedServiceInstructions, orderDetail.poLine.itemVas.valueAddedServiceInstructions, orderDetail.poLine.itemTextDetail.textDetails, orderDetail.sizes.sizePo.sizePricing.fob.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.fob.crpoCurrencyCode, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoCurrencyCode,
                    orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoCurrencyCode, orderDetail.sizes.sizePo.sizeQuantity, orderDetail.sizes.sizePo.sizeDescription, pdfData.shipToAddressLegalPO, pdfData.quantity, pdfData.price, pdfData.itemVasPDF, pdfData.shipToAddressDIA, pdfData.CABCode, crmData.item, crmData.factory, crmData.customerOrder, crmData.coFinalApprovalDate,
                    crmData.planNo, crmData.truckOutDate, crmData.actualShippedQty, crmData.coPrice, crmData.shipToAddress, crmData.paymentTerm, crmData.styleDesc, crmData.fabricContent, crmData.fabricSource, crmData.commission, crmData.PCD, hanger, orderDetail.poHeader.poNumber + '-' + orderDetail.poLine.itemNumber, todayDate, (daysDifference).toLocaleString(), todayDate, matches, 'username', version)
                if (dtoData.purchaseOrderNumber != null) {
                    const details = await this.dpomRepository.findOne({ where: { purchaseOrderNumber: dtoData.purchaseOrderNumber, poLineItemNumber: dtoData.poLineItemNumber, scheduleLineItemNumber: dtoData.scheduleLineItemNumber } })
                    const versionDetails = await this.dpomChildRepo.getVersion(dtoData.purchaseOrderNumber, dtoData.poLineItemNumber, dtoData.scheduleLineItemNumber)
                    if (versionDetails.length > 0) {
                        version = Number(versionDetails.length) + 1
                    }
                    dtoData.odVersion = version
                    if (details) {
                        // const updatedData = this.ordersAdapter.convertDtoToEntity(data);
                        const updateOrder = await transactionManager.getRepository(DpomEntity).update({ purchaseOrderNumber: dtoData.purchaseOrderNumber, poLineItemNumber: dtoData.poLineItemNumber, scheduleLineItemNumber: dtoData.scheduleLineItemNumber }, {
                            documentDate: dtoData.documentDate, categoryCode: dtoData.categoryCode, categoryDesc: dtoData.categoryDesc, vendorCode: dtoData.vendorCode, gccFocusCode: dtoData.gccFocusCode, gccFocusDesc: dtoData.gccFocusDesc, genderAgeCode: dtoData.genderAgeCode, genderAgeDesc: dtoData.genderAgeDesc, styleNumber: dtoData.styleNumber, productCode: dtoData.productCode, colorDesc: dtoData.colorDesc, destinationCountryCode: dtoData.destinationCountryCode, destinationCountry: dtoData.destinationCountry, plant: dtoData.plant, plantName: dtoData.plantName, tradingCoPoNumber: dtoData.tradingCoPoNumber, UPC: dtoData.UPC, directShipSONumber: dtoData.directShipSONumber, directShipSOItemNumber: dtoData.directShipSOItemNumber, customerPO: dtoData.customerPO, shipToCustomerNumber: dtoData.shipToCustomerNumber, shipToCustomerName: dtoData.shipToCustomerName, planningSeasonCode: dtoData.planningSeasonCode, planningSeasonYear: dtoData.planningSeasonYear, docTypeCode: dtoData.docTypeCode, docTypeDesc: dtoData.docTypeDesc, MRGAC: dtoData.MRGAC, OGAC: dtoData.OGAC, GAC: dtoData.GAC, originReceiptDate: dtoData.originReceiptDate, factoryDeliveryActDate: dtoData.factoryDeliveryActDate, GACReasonCode: dtoData.GACReasonCode, GACReasonDesc: dtoData.GACReasonDesc, shippingType: dtoData.shippingType, planningPriorityCode: dtoData.planningPriorityCode, planningPriorityDesc: dtoData.planningPriorityDesc, launchCode: dtoData.launchCode, DPOMLineItemStatus: dtoData.DPOMLineItemStatus, modeOfTransportationCode: dtoData.modeOfTransportationCode, inCoTerms: dtoData.inCoTerms, inventorySegmentCode: dtoData.inventorySegmentCode, purchaseGroupCode: dtoData.purchaseGroupCode, purchaseGroupName: dtoData.purchaseGroupName, totalItemQty: dtoData.totalItemQty, originReceiptQty: dtoData.originReceiptQty, VASSize: dtoData.VASSize, itemVasText: dtoData.itemVasText, itemText: dtoData.itemText, grossPriceFOB: dtoData.grossPriceFOB, FOBCurrencyCode: dtoData.FOBCurrencyCode, netIncludingDisc: dtoData.netIncludingDisc, netIncludingDiscCurrencyCode: dtoData.netIncludingDiscCurrencyCode, trCoNetIncludingDisc: dtoData.trCoNetIncludingDisc, trCoNetIncludingDiscCurrencyCode: dtoData.trCoNetIncludingDiscCurrencyCode, sizeQuantity: dtoData.sizeQuantity, sizeDescription: dtoData.sizeDescription, shipToAddressLegalPO: pdfData.shipToAddressLegalPO, quantity: pdfData.quantity, price: pdfData.price, itemVasPDF: pdfData.itemVasPDF, shipToAddressDIA: pdfData.shipToAddressDIA, CABCode: pdfData.CABCode, item: crmData.item, factory: crmData.factory, customerOrder: crmData.customerOrder, coFinalApprovalDate: crmData.coFinalApprovalDate, planNo: crmData.planNo, truckOutDate: crmData.truckOutDate, actualShippedQty: crmData.actualShippedQty, coPrice: crmData.coPrice, shipToAddress: crmData.shipToAddress, paymentTerm: crmData.paymentTerm, styleDesc: crmData.styleDesc, fabricContent: crmData.fabricContent, fabricSource: crmData.fabricSource, commission: crmData.commission, PCD: crmData.PCD, odVersion: dtoData.odVersion, divertedToPos: dtoData.divertedToPos.join(',')
                        })
                        if (!updateOrder.affected) {
                            await transactionManager.releaseTransaction();
                            return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                        }
                        const convertedExcelEntity: Partial<DpomChildEntity> = this.dpomChildAdapter.convertDtoToEntity(dtoData, details.id);
                        const saveExcelEntity: DpomChildEntity = await transactionManager.getRepository(DpomChildEntity).save(convertedExcelEntity);
                        if (saveExcelEntity) {
                            //difference insertion to order diff table
                            const existingDataKeys = Object.keys(details)
                            const currentDataKeys = Object.keys(dtoData)
                            for (const existingDataKey of existingDataKeys) {
                                if (details[existingDataKey] != orderDetail[existingDataKey] && existingDataKey != 'createdAt' && existingDataKey != 'updatedAt' && existingDataKey != 'version' && existingDataKey != '' && existingDataKey != 'orderStatus' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser' && existingDataKey != 'fileId') {
                                    const dpomDiffObj = new DpomDifferenceEntity();
                                    dpomDiffObj.oldValue = details[existingDataKey]
                                    dpomDiffObj.newValue = dtoData[existingDataKey]
                                    dpomDiffObj.columnName = dpomOrderColumnsName[existingDataKey]
                                    dpomDiffObj.displayName = existingDataKey
                                    dpomDiffObj.purchaseOrderNumber = dtoData.purchaseOrderNumber
                                    dpomDiffObj.poLineItemNumber = dtoData.poLineItemNumber
                                    dpomDiffObj.scheduleLineItemNumber = dtoData.scheduleLineItemNumber
                                    dpomDiffObj.odVersion = dtoData.odVersion
                                    dpomDiffObj.fileId = id
                                    if (dpomDiffObj.oldValue != dpomDiffObj.newValue) {
                                        const orderDiffSave = await transactionManager.getRepository(DpomDifferenceEntity).save(dpomDiffObj);
                                        if (!orderDiffSave) {
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
                        const convertedChildExcelEntity: Partial<DpomChildEntity> = this.dpomChildAdapter.convertDtoToEntity(dtoData, saveExcelEntity.id);
                        const saveChildExcelEntity: DpomChildEntity = await transactionManager.getRepository(DpomChildEntity).save(convertedChildExcelEntity);
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

    async revertFileData(req: FileIdReq): Promise<CommonResponseModel> {
        if (req) {
            const latestFileId = await this.fileUploadRepo.update({ id: req.fileId }, { isActive: false })
        }
        if (req) {
            const deleteChildData = await this.dpomChildRepo.deleteChildData(req)
        }
        if (req) {
            const deleteDiffData = await this.dpomDiffRepo.deleteDiffData(req)
        }
        if (req) {
            const deleteOrdersData = await this.dpomRepository.deleteData(req)
        }
        const updatedData = await this.dpomChildRepo.getUpdatedData()
        const data = await this.dpomChildRepo.find({
            where: { fileId: updatedData[0]?.fileId },
            relations: ['orders']
        })
        const flag = new Set()
        for (const dtoData of data) {
            const entity = new DpomEntity();
            entity.purchaseOrderNumber = dtoData.purchaseOrderNumber
            const updateOrder = await this.dpomRepository.update({ purchaseOrderNumber: dtoData.purchaseOrderNumber, poLineItemNumber: dtoData.poLineItemNumber, scheduleLineItemNumber: dtoData.scheduleLineItemNumber }, {
                documentDate: dtoData.documentDate, categoryCode: dtoData.categoryCode, categoryDesc: dtoData.categoryDesc, vendorCode: dtoData.vendorCode, gccFocusCode: dtoData.gccFocusCode, gccFocusDesc: dtoData.gccFocusDesc, genderAgeCode: dtoData.genderAgeCode, genderAgeDesc: dtoData.genderAgeDesc, styleNumber: dtoData.styleNumber, productCode: dtoData.productCode, colorDesc: dtoData.colorDesc, destinationCountryCode: dtoData.destinationCountryCode, destinationCountry: dtoData.destinationCountry, plant: dtoData.plant, plantName: dtoData.plantName, tradingCoPoNumber: dtoData.tradingCoPoNumber, UPC: dtoData.UPC, directShipSONumber: dtoData.directShipSONumber, directShipSOItemNumber: dtoData.directShipSOItemNumber, customerPO: dtoData.customerPO, shipToCustomerNumber: dtoData.shipToCustomerNumber, shipToCustomerName: dtoData.shipToCustomerName, planningSeasonCode: dtoData.planningSeasonCode, planningSeasonYear: dtoData.planningSeasonYear, docTypeCode: dtoData.docTypeCode, docTypeDesc: dtoData.docTypeDesc, MRGAC: dtoData.MRGAC, OGAC: dtoData.OGAC, GAC: dtoData.GAC, originReceiptDate: dtoData.originReceiptDate, factoryDeliveryActDate: dtoData.factoryDeliveryActDate, GACReasonCode: dtoData.GACReasonCode, GACReasonDesc: dtoData.GACReasonDesc, shippingType: dtoData.shippingType, planningPriorityCode: dtoData.planningPriorityCode, planningPriorityDesc: dtoData.planningPriorityDesc, launchCode: dtoData.launchCode, DPOMLineItemStatus: dtoData.DPOMLineItemStatus, modeOfTransportationCode: dtoData.modeOfTransportationCode, inCoTerms: dtoData.inCoTerms, inventorySegmentCode: dtoData.inventorySegmentCode, purchaseGroupCode: dtoData.purchaseGroupCode, purchaseGroupName: dtoData.purchaseGroupName, totalItemQty: dtoData.totalItemQty, originReceiptQty: dtoData.originReceiptQty, VASSize: dtoData.VASSize, itemVasText: dtoData.itemVasText, itemText: dtoData.itemText, grossPriceFOB: dtoData.grossPriceFOB, FOBCurrencyCode: dtoData.FOBCurrencyCode, netIncludingDisc: dtoData.netIncludingDisc, netIncludingDiscCurrencyCode: dtoData.netIncludingDiscCurrencyCode, trCoNetIncludingDisc: dtoData.trCoNetIncludingDisc, trCoNetIncludingDiscCurrencyCode: dtoData.trCoNetIncludingDiscCurrencyCode, sizeQuantity: dtoData.sizeQuantity, sizeDescription: dtoData.sizeDescription, shipToAddressLegalPO: dtoData.shipToAddressLegalPO, quantity: dtoData.quantity, price: dtoData.price, itemVasPDF: dtoData.itemVasPDF, shipToAddressDIA: dtoData.shipToAddressDIA, CABCode: dtoData.CABCode, item: dtoData.item, factory: dtoData.factory, customerOrder: dtoData.customerOrder, coFinalApprovalDate: dtoData.coFinalApprovalDate, planNo: dtoData.planNo, truckOutDate: dtoData.truckOutDate, actualShippedQty: dtoData.actualShippedQty, coPrice: dtoData.coPrice, shipToAddress: dtoData.shipToAddress, paymentTerm: dtoData.paymentTerm, styleDesc: dtoData.styleDesc, fabricContent: dtoData.fabricContent, fabricSource: dtoData.fabricSource, commission: dtoData.commission, PCD: dtoData.PCD, odVersion: dtoData.odVersion
            })
            if (!updateOrder.affected) {
                return new CommonResponseModel(false, 0, 'Something went wrong in order update', updateOrder)
            }
            if (!updateOrder.affected) {
                flag.add(false)
            } else {
                flag.add(true)
            }
        }
        if (flag.has(true)) {
            return new CommonResponseModel(true, 1, 'File Reverted Successfully')
        } else {
            return new CommonResponseModel(false, 0, 'failed to revert file data')
        }
    }

    async updatePath(filePath: string, filename: string): Promise<CommonResponseModel> {
        const entity = new NikeFileUploadEntity()
        entity.fileName = filename;
        entity.filePath = filePath;
        entity.status = 'uploading';
        const file = await this.fileUploadRepo.findOne({ where: { fileName: filename } })
        if (file) {
            return new CommonResponseModel(false, 0, 'File with same name already uploaded');
        } else {
            const save = await this.fileUploadRepo.save(entity)
            if (save) {
                return new CommonResponseModel(true, 1, 'uploaded successfully', save);
            }
            else {
                return new CommonResponseModel(false, 0, 'uploaded failed');
            }
        }
    }

    async updateFileStatus(req: FileStatusReq): Promise<CommonResponseModel> {
        let update
        if (req.status === 'Failed') {
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status, isActive: false });
        } else {
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status })
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
            return new CommonResponseModel(false, 0, 'No data found');
        }
    }

    async getByFactoryStatus(req: DpomSaveDto) {
        const record = await this.dpomRepository.find({
            where: { DPOMLineItemStatus: req.DPOMLineItemStatus },
        });
        if (record.length > 0) {
            return new CommonResponseModel(true, 1, 'data retrived', record);
        } else {
            return new CommonResponseModel(false, 0, 'data not found');
        }
    }

    async getShipmentTrackerReport(): Promise<CommonResponseModel> {
        const details = await this.dpomRepository.find();
        if (details.length > 0) {
            return new CommonResponseModel(true, 1, 'data retrived', details)
        } else {
            return new CommonResponseModel(false, 0, 'data not found')
        }
    }

    async getCountForDivertReport(): Promise<CommonResponseModel> {
        const details = await this.dpomRepository.getCountForDivertReport();
        if (details.length > 0) {
            return new CommonResponseModel(true, 1, 'data retrived', details)
        } else {
            return new CommonResponseModel(false, 0, 'data not found')
        }
    }
    async getFabricTrackerReport(): Promise<CommonResponseModel> {
        const details = await this.dpomRepository.find();
        if (details.length > 0) {
            return new CommonResponseModel(true, 1, 'data retrived', details)
        } else {
            return new CommonResponseModel(false, 0, 'data not found', undefined)
        }
    }

    async getPlantWisePoOrders(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPlantCount()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getStatusWiseItems(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getStatusWiseItemCount()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getCategoryWiseItemQty(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getCategoriesWiseItemQty()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getShipmentWiseData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getShipmentWiseItems()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPlanShipmentWiseData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPlanningShipment()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getOrderAcceptanceData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.find()
        if (data.length > 0) {
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
        if (updateStatus.affected) {
            return new CommonResponseModel(true, 1, 'Status Updated')
        } else {
            return new CommonResponseModel(false, 0, 'Something went wrong');
        }
    }

    async getTotalItemQtyChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getTotalItemQtyChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async poLineItemStatusChange(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.poLineItemStatusChange()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getShipmentPlaningChart(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.shipmentChart()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async saveDiaPDFFields(data: DiaPDFDto): Promise<CommonResponseModel> {
        const updateData = await this.dpomRepository.update({ purchaseOrderNumber: data.poNumber, poLineItemNumber: data.lineNo }, { CABCode: data.cabCode, shipToAddressDIA: data.shipToAddress })
        if (updateData.affected) {
            return new CommonResponseModel(true, 1111, "DIA Data updated sucessfully")
        } else {
            return new CommonResponseModel(false, 1010, "The  PO Number of the uploaded document not exist")
        }
    }

    async getItemChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getItemChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getUnitChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getUnitChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getFOBPriceChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getFOBPriceChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getNetInclDiscChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getNetInclDiscChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getTradingNetInclDiscChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getTradingNetInclDiscChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getModeOfTransportChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getModeOfTransportChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getGACChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getGACChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getMRGACChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getMRGACChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPlantCodeChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPlantCodeChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getShippingTypeChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getShippingTypeChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getVasTextChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getVasTextChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getShipToCustomerChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getShipToCustomerChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getInventorySegmentCodeChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getInventorySegmentCodeChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getDirectShipSoNoChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getDirectShipSoNoChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getDestinationCountryChangeData(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getDestinationCountryChangeData()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    // async getDivertReportData(): Promise<CommonResponseModel> {
    //     const report = await this.dpomRepository.getDivertReport();
    //     if (report.length > 0) {
    //         return new CommonResponseModel(true, 1, 'Data Retrived Successfully', report);
    //     } else {
    //         return new CommonResponseModel(false, 0, 'No Data Found', []);
    //     }
    // }
    async getDestinationWisePo(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getDestinationPo()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getSeasonWisePo(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getSeasonPo()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'Data retrieved', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getFactoryReportData(req?:PpmDateFilterRequest): Promise<CommonResponseModel> {
        try {
            
            const allDetails = await this.dpomRepository.getFactoryPpmData( req );

            const filteredDetails = allDetails.filter(record => record.doc_type_code !== 'ZP26')
            const details = filteredDetails.filter(record => record.dpom_item_line_status !== 'Cancelled')
            if (details.length === 0) {
                return new CommonResponseModel(false, 0, 'data not found');
            }
            const sizeDateMap = new Map<string, FactoryReportModel>();
            for (const rec of details) {
                if (!sizeDateMap.has(rec.po_and_line)) {
                    sizeDateMap.set(
                        rec.po_and_line,
                        new FactoryReportModel(rec.last_modified_date, rec.item, rec.factory, rec.document_date, rec.po_number, rec.po_line_item_number, rec.po_and_line, rec.dpom_item_line_status, rec.style_number, rec.product_code, rec.color_desc, rec.customer_order, rec.po_final_approval_date, rec.plan_no, rec.lead_time, rec.category_code, rec.category_desc, rec.vendor_code, rec.gcc_focus_code, rec.gcc_focus_desc, rec.gender_age_code, rec.gender_age_desc, rec.destination_country_code, rec.destination_country, rec.plant, rec.plant_name, rec.trading_co_po_no, rec.upc, rec.direct_ship_so_no, rec.direct_ship_so_item_no, rec.customer_po, rec.ship_to_customer_no, rec.ship_to_customer_name, rec.planning_season_code, rec.planning_season_year, rec.doc_type_code, rec.doc_type_desc, rec.mrgac, rec.ogac, rec.gac, rec.truck_out_date, rec.origin_receipt_date, rec.factory_delivery_date, rec.gac_reason_code, rec.gac_reason_desc, rec.shipping_type, rec.planning_priority_code, rec.planning_priority_desc, rec.launch_code, rec.mode_of_transport_code, rec.inco_terms, rec.inventory_segment_code, rec.purchase_group_code, rec.purchase_group_name, rec.total_item_qty, rec.actual_shipped_qty, rec.vas_size, rec.item_vas_text, rec.item_text,rec.price,rec.co_price,rec.pcd,rec.ship_to_address_legal_po,rec.ship_to_address_dia,rec.cab_code,rec.gross_price_fob,rec.ne_inc_disc,rec.trading_net_inc_disc,rec.displayName,rec.actual_unit,rec.allocated_quantity,[])
                    );
                }
                
                const sizeWiseData = sizeDateMap.get(rec.po_and_line).sizeWiseData;

                if (rec.size_description !== null) {
                    sizeWiseData.push(new FactoryReportSizeModel(rec.size_description, rec.size_qty, rec.price, rec.co_price));
                }
            }
            const dataModelArray: FactoryReportModel[] = Array.from(sizeDateMap.values());
            return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
        } catch (e) {
            return new CommonResponseModel(false, 0, 'failed', e);
        }
    }

    async getDifferentialData(): Promise<any> {

        const oldText = `HANGING IS REQUIRED:
        Each garment must be hung on a GS1 black style hanger HCLR12.
        
        The carton contents should be placed in at least one GOH polybag and polybag(s) placed in a GOH shipping carton.
        A per unit upcharge has been added to this PO for garment on hanger.

        CROWN SIZER REQUIRED:
        A Crown Sizer must be placed on all hangers for this Purchase Order.
        `;

        const newText = `HANGING IS REQUIRED:
        Each garment must be hung on a GS1 black style hanger HCLR12.
        The carton contents should be placed in at least one GOH polybag and
        polybag(s) placed in a GOH shipping carton.
        A per unit upcharge has been added to this PO for garment on hanger.`;

        const lines1 = oldText.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
        const text1 = lines1.join('');

        const lines2 = newText.trim().split(/\n\s*\n/).slice(0, 5); // Split text into lines and take the first 5
        const text2 = lines2.join('');

        const dmp = new DiffMatchPatch();
        const diff = dmp.diff_main(text1, text2);
        dmp.diff_cleanupSemantic(diff);

        let output = '';
        for (const [op, text] of diff) {
            if (op === DiffMatchPatch.DIFF_INSERT) {
                if (text.trim() !== '') {
                    output += `${text} `;
                }
            } else if (op === DiffMatchPatch.DIFF_DELETE) {
                if (text.trim() !== '') {
                    output += `${text} `;
                }
            }
        }
        return output.trim();
    }
    async getPPMData(req?:PpmDateFilterRequest): Promise<CommonResponseModel> {
        
        const alldata = await this.dpomRepository.getMarketingPpmData(req);
        const details = alldata.filter(record => record.doc_type_code !== 'ZP26')
        if (details.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found')
        }
        const sizeDateMap = new Map<string, MarketingModel>();
        for (const rec of details) {
            if (!sizeDateMap.has(rec.po_and_line)) {
                sizeDateMap.set(
                    rec.po_and_line,
                   new FactoryReportModel(rec.last_modified_date, rec.item, rec.factory, rec.document_date, rec.po_number, rec.po_line_item_number, rec.po_and_line, rec.dpom_item_line_status, rec.style_number, rec.product_code, rec.color_desc, rec.customer_order, rec.po_final_approval_date, rec.plan_no, rec.lead_time, rec.category_code, rec.category_desc, rec.vendor_code, rec.gcc_focus_code, rec.gcc_focus_desc, rec.gender_age_code, rec.gender_age_desc, rec.destination_country_code, rec.destination_country, rec.plant, rec.plant_name, rec.trading_co_po_no, rec.upc, rec.direct_ship_so_no, rec.direct_ship_so_item_no, rec.customer_po, rec.ship_to_customer_no, rec.ship_to_customer_name, rec.planning_season_code, rec.planning_season_year, rec.doc_type_code, rec.doc_type_desc, rec.mrgac, rec.ogac, rec.gac, rec.truck_out_date, rec.origin_receipt_date, rec.factory_delivery_date, rec.gac_reason_code, rec.gac_reason_desc, rec.shipping_type, rec.planning_priority_code, rec.planning_priority_desc, rec.launch_code, rec.mode_of_transport_code, rec.inco_terms, rec.inventory_segment_code, rec.purchase_group_code, rec.purchase_group_name, rec.total_item_qty, rec.actual_shipped_qty, rec.vas_size, rec.item_vas_text, rec.item_text,rec.price,rec.co_price,rec.pcd,rec.ship_to_address_legal_po,rec.ship_to_address_dia,rec.cab_code,rec.gross_price_fob,rec.ne_inc_disc,rec.trading_net_inc_disc,rec.displayName,rec.actual_unit,rec.allocated_quantity,[])
                );
                console.log(rec.allocatedQuantity,rec.actualUnit,"please show data ")
            }
            const sizeWiseData = sizeDateMap.get(rec.po_and_line).sizeWiseData;
            if (rec.size_description !== null) {
                sizeWiseData.push(new FactoryReportSizeModel(rec.size_description, rec.size_qty, rec.price, rec.co_price));
            }
        }
        const dataModelArray: MarketingModel[] = Array.from(sizeDateMap.values());
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }
    catch(e) {
        return new CommonResponseModel(false, 0, 'failed', e);
    }

    async getPoAndQtyDashboard(req: PoAndQtyReq): Promise<CommonResponseModel> {
        try {
            let query = '';
            let monthNo = 0;
            if (!req.month) {
                const dateData = new Date();
                monthNo = dateData.getMonth();
            } else {
                monthNo = req.month;
            }
            let yearNo = 0;
            if (!req.year) {
                const dateData = new Date();
                yearNo = dateData.getFullYear();
            } else {
                yearNo = req.year;
            }
            const names = [];
            const namesData = []; let quarterName;
            const qunarterCount = { 1: 'quarter1', 2: 'quarter1', 3: 'quarter1', 4: 'quarter2', 5: 'quarter2', 6: 'quarter2', 7: 'quarter3', 8: 'quarter3', 9: 'quarter3', 10: 'quarter4', 11: 'quarter4', 12: 'quarter4' };
            const monthData = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };
            let mapKey;
            let querySelect;

            let queryWhere;
            let queryGroup;
            const monthInfo = monthNo - 1;
            let allNames;

            if (req.reportType == ReportType.DAYWISE) {
                /** Assigning all dateData */
                const date = new Date(yearNo, monthInfo, 1);
                while (date.getMonth() === monthInfo) {
                    names.push(moment(new Date(date)).format('YYYY-MM-DD'));
                    date.setDate(date.getDate() + 1);
                }
                /**Day QueryFilter */
                querySelect = 'DATE(created_at) AS reportedDate';
                queryGroup = 'DATE(created_at)';
                queryWhere = 'MONTH(created_at)=' + monthNo + '';
                allNames = names;
            } else if (req.reportType == ReportType.WEEKWISE) {
                let month;
                if (monthNo < 10)
                    month = "0" + monthNo;
                const date = "01." + month + "." + yearNo;
                const first = moment(date, 'dd.MM.yyyy').startOf('month').week();
                const last = moment(date, 'dd.MM.yyyy').endOf('month').week();
                for (let i = first; i < last; i++) {
                    namesData.push(i);
                    names.push(i + " " + monthData[monthNo]);
                }
                /** Month QueryFilter */
                querySelect = 'WEEK(created_at) AS reportedDate';
                queryGroup = 'WEEK(created_at)';
                queryWhere = 'MONTH(created_at)=' + monthNo + '';
                allNames = namesData;
            } else {
                const quarterNames = ['Jan - Mar', 'Apr - Jun', 'Jul - Sep', 'Oct - Dec'];
                const quarterData = ['quarter1', 'quarter2', 'quarter3', 'quarter4'];
                for (const quanrter of quarterNames) {
                    names.push(quanrter + " " + yearNo);
                }
                /** Year QueryFilter */
                querySelect = 'MONTH(created_at) AS reportedDate';
                queryGroup = 'MONTH(created_at)';
                queryWhere = 'YEAR(created_at)=' + yearNo + '';
                allNames = quarterData;
            }

            query = `SELECT po_number AS poNumber, sum(total_item_qty) AS totalItemQuantity,created_at AS createdAt,` + querySelect + `
         FROM dpom WHERE total_item_qty >0 AND `+ queryWhere + ``;
            query += ` group by ` + queryGroup + ``;

            const data = await this.dpomRepository.query(query)
            if (data.length < 1) {
                return new CommonResponseModel(false, 0, 'No Records Found', [])
            }

            const poMap = new Map<string, PoQty>();
            for (const poData of data) {
                const totalQty = parseFloat(poData.totalItemQuantity);
                if (req.reportType == ReportType.DAYWISE) {
                    const mapKey = moment(poData.reportedDate).format('YYYY-MM-DD');
                    if (!poMap.has(mapKey)) {
                        const poObj = new PoQty();
                        poObj.totalItemQuantity = poData.totalItemQuantity;
                        poMap.set(mapKey, poObj);
                    } else {
                        poMap.get(mapKey).totalItemQuantity += poData.totalItemQuantity;
                    }
                } else if (req.reportType == ReportType.WEEKWISE) {
                    const mapKey = poData.reportedDate;
                    if (!poMap.has(mapKey)) {
                        const poObj = new PoQty();
                        poObj.totalItemQuantity = totalQty;
                        poMap.set(mapKey, poObj);
                    } else {
                        poMap.get(mapKey).totalItemQuantity += totalQty;
                    }
                } else {
                    quarterName = qunarterCount[poData.reportedDate];
                    if (!poMap.has(quarterName)) {
                        const poObj = new PoQty();
                        poObj.totalItemQuantity = totalQty;
                        poMap.set(quarterName, poObj);
                    } else {
                        poMap.get(quarterName).totalItemQuantity += totalQty;
                    }
                }
            }

            const dashboardPoGrnData = new PoData();
            dashboardPoGrnData.poQty = [];
            allNames.forEach(eachName => {
                const PoGrnForQty = poMap.get(eachName);
                const totalQty = PoGrnForQty ? PoGrnForQty.totalItemQuantity : 0;
                dashboardPoGrnData.poQty.push(totalQty);
            });

            // const dashboardPoGrnData = new PoData();
            // dashboardPoGrnData.poQty = [];           
            // allNames.forEach(eachName => {
            //     const PoGrnForQty = poMap.get(eachName); 
            //     dashboardPoGrnData.poQty.push(PoGrnForQty? PoGrnForQty.poQty : 0); 
            // })

            const dashboardData = new PoDataResDto(names, dashboardPoGrnData);
            return new CommonResponseModel(true, 10000, 'Data Retrieved Successfully.', dashboardData);
        } catch (error) {
            return new CommonResponseModel(false, 0, 'failed', error);
        }
    }

    

async getDivertReportData(): Promise<CommonResponseModel> {
    const reports = await this.dpomRepository.getDivertReport();
   // let model:OldDivertModel[];
   let divertedPos=[]
let divertModelData: DivertModel[] = [];
  let po ;
  let line;
  let divertModel =[]
  for(const report of reports){
    divertedPos = report.diverted_to_pos.split (',');
         

   if(report.diverted_to_pos ){
    for(const Po of divertedPos){
       const [po, line] = Po.split('/');
      const newPoData = await this.dpomRepository.getDivertWithNewDataReport([po,line])

      for (const newpoDivert of newPoData){
       const  model  = new DivertModel(report,newpoDivert)
        divertModel.push(model)
    }
    }
 
   }
    }

    if (reports.length > 0) {
        return new CommonResponseModel(true, 1, 'Data Retrived Successfully', divertModel);
    } else {
        return new CommonResponseModel(false, 0, 'No Data Found', []);
    }
}
///////////////////--------------------------------------------------------------------------------factory
async getPpmPoLineForFactory(): Promise<CommonResponseModel> {
    const data = await this.dpomRepository.getPoLineforfactory()
    if (data.length > 0)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
} 

    async getPpmItemForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getItemforfactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmFactoryForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getFactoryForfactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmPlantForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPlantForfactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmProductCodeForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getProductCodeForfactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmColorDescForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getColorDescForfactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmCategoryDescForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getCategoryDescForfactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmDestinationCountryForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getDestinationCountryForfactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }


    //-----------------------------------------------------------------------------marketing
    async getPpmPoLineForMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPoLineforMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmItemForMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getItemforMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

async getPpmFactoryForMarketing(): Promise<CommonResponseModel> {
    const data = await this.dpomRepository.getFactoryforMarketing()
    if (data.length > 0)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
}


async updateFactoryStatusColumns(req: FactoryUpdate): Promise<CommonResponseModel> {
        try {
            console.log(req,"1111111111111111111111111111")

             const docDetails = await this.dpomRepository.getFactoryDataById(req.poAndLine)
            const updateRecord = await this.dpomRepository.update({ poAndLine: docDetails[0].poline }, {  actualUnit: req.actualUnit, allocatedQuantity: req.allocatedQuantity})
          
            if (updateRecord.affected) {
                return new CommonResponseModel(true, 1, 'Data updated Successfully', true)
            } else {
                return new CommonResponseModel(false, 0, 'Error', false)
            }
        } catch (err) {
            throw err
        }
    }

    async getPriceDifferenceReport(): Promise<CommonResponseModel> {
        // const query = `SELECT d.po_number as poNumber,d.po_line_item_number as poLineItemNumber,d.style_number as styleNumber,d.size_description as sizeDescription,d.gross_price_fob as grossPriceFob,d.fob_currency_code as fobCurrencyCode,f.shahi_confirmed_gross_price as shahiConfirmedgrossPrice,f.shahi_confirmed_gross_price_currency_code as shahiCurrencyCode,d.gross_price_fob-f.shahi_confirmed_gross_price AS difference FROM dpom d
        //  LEFT JOIN fob_master f ON f.style_number = d.style_number AND f.size_description = d.size_description
        //  WHERE d.gross_price_fob-f.shahi_confirmed_gross_price <> 0 ORDER BY d.gross_price_fob-f.shahi_confirmed_gross_price DESC`;
        const query = `SELECT d.po_number as poNumber,d.po_line_item_number as poLineItemNumber,d.style_number as styleNumber,d.size_description as sizeDescription,d.gross_price_fob as grossPriceFob,d.fob_currency_code as fobCurrencyCode,f.shahi_confirmed_gross_price as shahiConfirmedgrossPrice,f.shahi_confirmed_gross_price_currency_code as shahiCurrencyCode FROM dpom d
        LEFT JOIN fob_master f ON f.style_number = d.style_number AND f.size_description = d.size_description
        WHERE f.shahi_confirmed_gross_price IS NOT NULL
        GROUP BY d.po_number,d.style_number,d.size_description`;

           const data = await this.dpomRepository.query(query)
        if (data.length) {
            return new CommonResponseModel(true, 1, 'data retrived', data)
        } else {
            return new CommonResponseModel(false, 0, 'error')
        }
    }

async getPpmPlantForMarketing(): Promise<CommonResponseModel> {
    const data = await this.dpomRepository.getPpmPlantForMarketing()
    if (data.length > 0)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
}
async getPpmProductCodeForMarketing(): Promise<CommonResponseModel> {
    const data = await this.dpomRepository.getPpmProductCodeForMarketing()
    if (data.length > 0)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
}
async getPpmColorDescForMarketing(): Promise<CommonResponseModel> {
    const data = await this.dpomRepository.getPpmColorDescForMarketing()
    if (data.length > 0)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
}
async getPpmCategoryDescForMarketing(): Promise<CommonResponseModel> {
    const data = await this.dpomRepository.getPpmCategoryDescForMarketing()
    if (data.length > 0)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
}
async getPpmDestinationCountryForMarketing(): Promise<CommonResponseModel> {
    const data = await this.dpomRepository.getPpmDestinationCountryForMarketing()
    if (data.length > 0)
        return new CommonResponseModel(true, 1, 'data retrived', data)
    else
        return new CommonResponseModel(false, 0, 'No data found');
}

}




