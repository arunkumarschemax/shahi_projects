import { Injectable } from '@nestjs/common';
import { DpomRepository } from './repositories/dpom.repository';
import axios, { Axios } from 'axios';
import { DpomEntity } from './entites/dpom.entity';
import { DpomSaveDto } from './dto/dpom-save.dto';
import { DpomAdapter } from './dto/dpom.adapter';
import { CommonResponseModel } from '@project-management-system/shared-models';
const qs = require('querystring');

@Injectable()
export class DpomService {
    constructor(
        private dpomRepository: DpomRepository,
        private dpomAdapter: DpomAdapter
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
        const orderDetails = await this.getDPOMOrderDetails();
        if (!orderDetails.status) return new CommonResponseModel(false, 0, orderDetails.error)
        const flag = new Set();
        for (const orderDetail of orderDetails.data) {
            const saveDto = new DpomSaveDto(orderDetail.poHeader.documentDate, orderDetail.poHeader.poNumber, orderDetail.poLine.itemNumber, orderDetail.product.categoryCode, orderDetail.product.categoryDescription, orderDetail.poHeader.vendorCode, orderDetail.product.globalCategoryCoreFocusCode, orderDetail.product.globalCategoryCoreFocusDescription, orderDetail.product.genderAgeCode, orderDetail.product.styleNumber, orderDetail.poLine.productCode, orderDetail.product.colorDescription, orderDetail.poLine.destinationCountryCode, orderDetail.poLine.destinationCountryName, orderDetail.poLine.plantCode, orderDetail.poLine.plantName, orderDetail.poHeader.trcoPoNumber, orderDetail.sizes.sizeProduct.upc, orderDetail.poLine.directshipSalesOrderNumber, orderDetail.poLine.directshipSalesOrderItemNumber, orderDetail.salesOrder.customerPo, orderDetail.salesOrder.customerShipTo, null, orderDetail.poLine.seasonCode, orderDetail.poLine.seasonYear, orderDetail.poHeader.poDocTypeCode, orderDetail.poHeader.poDocTypeDescription, orderDetail.planning.mrgacDate, orderDetail.poLine.originalGoodsAtConsolidatorDate, orderDetail.sizes.sizePo.goodsAtConsolidatorDate, orderDetail.sizes.sizeLogisticsOR.originReceiptActualDate, orderDetail.manufacturing.factoryDeliveryActualDate, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonCode, orderDetail.poLine.shippingType, orderDetail.planning.planningPriorityCode, orderDetail.planning.planningPriorityDescription, orderDetail.product.launchCode, orderDetail.poLine.dpomItemStatus, orderDetail.sizes.sizePo.transportationModeCode, orderDetail.poHeader.incoTerms, null, orderDetail.poHeader.purchaseGroupCode, orderDetail.poHeader.purchaseGroupName, orderDetail.poLine.itemQuantity, orderDetail.sizes.sizeLogisticsOR.originReceiptQuantity, orderDetail.sizes.sizeVas.valueAddedServiceInstructions, orderDetail.poLine.itemVas.valueAddedServiceInstructions, orderDetail.poLine.itemTextDetail.textDetails, orderDetail.sizes.sizePo.sizePricing.fob.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.fob.crpoCurrencyCode, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoCurrencyCode, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoCurrencyCode)

            const entity = this.dpomAdapter.convertDtoToEntity(saveDto)
            const savedEntity = this.dpomRepository.save(entity);
            if (!savedEntity) {
                flag.add(false)
            } else {
                flag.add(true)
            }
        }
        if (flag.has(false)) {
            return new CommonResponseModel(false, 0, 'something went wrong')
        } else {
            return new CommonResponseModel(true, 1, 'Data retrived successfully')
        }
    }

    async getFactoryReportData(): Promise<CommonResponseModel> {
        // let query ='SELECT po_number , po_line_item_number ,  product_code FROM `dpom`';

        const details = await this.dpomRepository.find();
       // console.log(details)
        return new CommonResponseModel(true, 1, 'data retrived', details)
   
    }

    async getByFactoryStatus(req:DpomSaveDto){
        const record=await this.dpomRepository.find({
            where:{DPOMLineItemStatus:req.DPOMLineItemStatus},
        });
        if(record){
            return record;
        }else{
            return 'no data found';
        }
    }
   
    async getDivertReportData(): Promise<CommonResponseModel> {
        const report = await this.dpomRepository.getDivertReport();
      
        const acceptedArray = report.filter(item => item.lineStatus.toLowerCase() === 'accepted',);
        const unacceptedArray = report.filter(item => item.lineStatus.toLowerCase() === 'unaccepted');      
        if (acceptedArray.length > 0 || unacceptedArray.length > 0) {
          const response = new CommonResponseModel(true, report.length, 'data retrieved', {
            accepted: acceptedArray,
            unaccepted: unacceptedArray
          });
          console.log(unacceptedArray, "Unaccepted Array Content");
          return response;
        } else {
          return new CommonResponseModel(false, 0, 'Unable To Fetch Data', []);
        }
      }
      
      
   
}
