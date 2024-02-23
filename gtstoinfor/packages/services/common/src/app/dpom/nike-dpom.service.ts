import { Injectable } from '@nestjs/common';
import { DpomRepository } from './repositories/dpom.repository';
import axios from 'axios';
import { DpomEntity } from './entites/dpom.entity';
import { DpomSaveDto } from './dto/dpom-save.dto';
import { DpomAdapter } from './dto/dpom.adapter';
import { DpomApproveReq } from './dto/dpom-approve.req';
import { ChangePoandLineModel, CoLineRequest, Colors, CommonResponseModel, Destinations, DivertModel, FactoryReportModel, FactoryReportSizeModel, FileStatusReq, FileTypeEnum, FobPriceDiffRequest, MarketingReportModel, MarketingReportSizeModel, OrderChangePoModel, PoChangeSizeModel, PoData, PoDataResDto, PpmDateFilterRequest, ReportType, Sizes, TotalQuantityChangeModel, coLineRequest, dpomOrderColumnsName, nikeFilterRequest } from '@project-management-system/shared-models';
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
import { PoAndQtyReq } from './dto/po-qty.req';
import { PoQty } from './dto/poqty.req';
import { FactoryUpdate } from './dto/factory-update.req';
import { PDFFileInfoEntity } from './entites/pdf-file-info.entity';
import { COLineRepository } from './repositories/co-line.repository';
import puppeteer from 'puppeteer';
import { COLineEntity } from './entites/co-line.entity';
const fs = require('fs');
const path = require('path')
const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');
const qs = require('querystring');
import * as nodemailer from 'nodemailer';
import * as winston from 'winston';
import { AddressService } from '../address/address.service';
import { DestinationReq } from '../address/destination-req.dto';
import * as Excel from 'exceljs';
import { diff_match_patch } from 'diff-match-patch'
import { ItemNoDtos } from './dto/co-item-no.dto';
import { DivertEntity } from './entites/divert.entity';
import { DivertRepository } from './repositories/divert.repository';


@Injectable()
export class DpomService {
    private transporter: nodemailer.Transporter;
    constructor(
        private dpomRepository: DpomRepository,
        private dpomChildRepo: DpomChildRepository,
        private dpomDiffRepo: DpomDifferenceRepository,
        private dpomAdapter: DpomAdapter,
        private dpomChildAdapter: DpomChildAdapter,
        private fileUploadRepo: NikeFileUploadRepository,
        private coLineRepository: COLineRepository,
        private divertRepository: DivertRepository,
        private addressService: AddressService,
        @InjectDataSource()
        private dataSource: DataSource,
    ) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'saiprakash.katiki@gmail.com',
                pass: 'lvau qrhe mhzd ysnj',
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

    async getOctaToken() {
        const payload = { 'grant_type': 'password', 'scope': 'iam.okta.factoryaffiliations.read iam.okta.factorygroups.read openid legacy_username email', 'username': 'prakash.iyengar@shahi.co.in', 'password': 'January@123' }
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
            // const dpomItemStatusValues = ["Accepted", "Unaccepted", "Closed", "Cancelled"];
            const offsets = ["0", "5000", "10000", "15000", "20000", "25000", "30000", "35000", "40000", "45000", "50000", "55000", "60000", "65000", "70000", "75000", "80000", "85000", "90000", "95000", "100000", "105000", "110000"]
            const currentDate = new Date();
            // Calculate 1.5 years (18 months) ago
            currentDate.setMonth(currentDate.getMonth() - 18);
            // Format the result as "YYYY-MM-DD"
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const results = [];
            for (const offset of offsets) {
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
                        "poLine.productName",
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
                        "poLine.customerShipToNumber",
                        "poLine.seasonCode",
                        "poLine.seasonYear",
                        "poHeader.poDocTypeCode",
                        "poHeader.poDocTypeDescription",
                        "planning.mrgacDate",
                        "poLine.originalGoodsAtConsolidatorDate",
                        "poLine.customerShipToName",
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
                        "poLine.changedOnDate",
                        "sizes.sizePo.transportationModeCode",
                        "poHeader.incoTerms",
                        "poHeader.purchaseGroupCode",
                        "poHeader.purchaseGroupName",
                        "poLine.itemQuantity",
                        "sizes.sizeLogisticsOR.originReceiptQuantity",
                        "sizes.sizeVas.valueAddedServiceInstructions",
                        "poLine.itemVas.valueAddedServiceInstructions",
                        "poLine.itemVas",
                        "poLine.itemTextDetail",
                        "poLine.itemVasDetail",
                        "sizes.sizePo.sizePricing.fob.crpoRateUnitValue",
                        "sizes.sizePo.sizePricing.fob.crpoCurrencyCode",
                        "sizes.sizePo.sizePricing.netIncludingDiscounts.trcoRateUnitValue",
                        "sizes.sizePo.sizePricing.netIncludingDiscounts.trcoCurrencyCode",
                        "sizes.sizePo.sizeQuantity",
                        "sizes.sizePo.sizeDescription",
                        "poLine.geographyCode",
                        "sizes.sizePo.inventorySegmentCode"
                    ],
                    "search": [
                        {
                            "fieldName": "sizes.sizePo.filterInDPOM",
                            "function": "NOT IS_DEFINED"
                        },
                        {
                            "fieldName": "poHeader.vendorCode",
                            "operator": "=",
                            "fieldValue": "SHK"
                        },
                        {
                            "fieldName": "poHeader.documentDate",
                            "operator": ">",
                            "fieldValue": formattedDate
                        }
                    ],
                    "offset": offset,
                    "count": 5000,
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
                if (response.status === 200 && response.data.objects.length > 0) {
                    results.push(...response.data.objects);
                    continue;
                } else {
                    break;
                }
            }
            // }
            if (results.length > 0) {
                return { status: true, data: results };
            } else {
                return { status: false, error: 'No results found' };
            }
        } catch (error) {
            return { status: false, error: error.message };
        }
    }

    async getCRMOrderDetails1(buyerPO: string): Promise<any> {
        const headers = { 'Cache-Control': 'no-cache', 'Accept': '*/*', 'Connection': 'keep-alive', 'Accept-Encoding': 'gzip, deflate, br', 'AUTH_API_KEY': '$2a$10$UzaZDcs2ih0MpW12ozjvi.KgUrJyhdxR.Z64oVIwGbz8WmBL.JhDy' }
        try {
            const response = await axios.get(`https://paperless.shahi.co.in:8443/ShahiApi/api/nikeCo/getNikeCoDetails?poNo=${buyerPO}`, { headers });
            // Extract the relevant data from the response and return it
            const responseData = response.data;
            if (responseData.length > 0) {
                return { status: true, data: responseData };
            } else {
                return { status: false, error: 'No results found' };
            }
        } catch (error) {
            // Handle any errors that may occur during the HTTP request
            // console.error('Error:', error);
            throw error; // You can choose to re-throw the error or handle it differently
        }
    }

    async getCRMOrderDetails2(coNumber: string): Promise<any> {
        const headers = { 'Cache-Control': 'no-cache', 'Accept': '*/*', 'Connection': 'keep-alive', 'Accept-Encoding': 'gzip, deflate, br', 'AUTH_API_KEY': '$2a$10$UzaZDcs2ih0MpW12ozjvi.KgUrJyhdxR.Z64oVIwGbz8WmBL.JhDy' }
        try {
            const response = await axios.get(`https://paperless.shahi.co.in:8443/ShahiApi/api/nikeCo/getNikeInvDetails?coNo=${coNumber}`, { headers });

            // Extract the relevant data from the response and return it
            const responseData = response.data;
            if (responseData.length > 0) {
                return { status: true, data: responseData };
            } else {
                return { status: false, error: 'No results found' };
            }
        } catch (error) {
            // Handle any errors that may occur during the HTTP request
            // console.error('Error:', error);
            throw error; // You can choose to re-throw the error or handle it differently
        }
    }

    async getCRMOrderDetails3(styleCode: string): Promise<any> {
        const headers = { 'Cache-Control': 'no-cache', 'Accept': '*/*', 'Connection': 'keep-alive', 'Accept-Encoding': 'gzip, deflate, br', 'AUTH_API_KEY': '$2a$10$UzaZDcs2ih0MpW12ozjvi.KgUrJyhdxR.Z64oVIwGbz8WmBL.JhDy' }
        try {
            const response = await axios.get(`https://paperless.shahi.co.in:8443/ShahiApi/api/nikeCo/getNikeFabricDetails?styleCode=${styleCode}`, { headers });

            // Extract the relevant data from the response and return it
            const responseData = response.data;
            if (responseData.length > 0) {
                return { status: true, data: responseData };
            } else {
                return { status: false, error: 'No results found' };
            }
        } catch (error) {
            // Handle any errors that may occur during the HTTP request
            // console.error('Error:', error);
            throw error; // You can choose to re-throw the error or handle it differently
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
        const save = await this.coLineRepository.save(entity);
        if (save) {
            await this.updateCOLineStatus({ poNumber: req.purchaseOrderNumber, poLineItemNumber: req.poLineItemNumber, status: 'Open' })
            return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
        } else {
            return new CommonResponseModel(false, 1, 'CO-Line request failed')
        }
    }

    // @Cron('*/2 * * * *')
    async createCOline(req: any): Promise<CommonResponseModel> {
        const po = await this.coLineRepository.getDataforCOLineCreation();
        if (!po) {
            return new CommonResponseModel(false, 0, 'No CO-Line creation requests')
        }
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        try {
            await driver.get('http://intranetn.shahi.co.in:8080/ShahiExportIntranet/subApp?slNo=2447#');

            await driver.findElement(By.id('username')).sendKeys('99901347');
            await driver.findElement(By.id('password')).sendKeys('99901347');
            await driver.findElement(By.css('button.btn-primary')).click();

            await driver.get('http://intranetn.shahi.co.in:8080/ShahiExportIntranet/subApp?slNo=2447')
            const newPAge = await driver.executeScript(
                `javascript:openAccessPage('http://intranet.shahi.co.in:8080/IntraNet/CRMPRDNEW.jsp', 'CRM', '2448', 'R', '99901347', 'N', '20634576', 'null');`
            );
            const windowHandles = await driver.getAllWindowHandles()
            await driver.switchTo().window(windowHandles[1]);
            const frame = await driver.findElement(By.id('mainFrame'));
            await driver.switchTo().frame(frame)
            const coLine = new CoLineRequest();
            let buyerValue1;
            let buyerValue2;
            let agent;
            let buyerAddress;
            let deliveryAddress;
            let pkgTerms;
            let paymentTerms;
            let styleNo;
            if (po.buyer === 'Nike-U12') {
                const update = await this.coLineRepository.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Inprogress' });
                const data = await this.dpomRepository.getDataForColine({ poNumber: po.buyer_po, lineNumber: po.line_item_no })
                const result = data[0].color_desc.split('/')[0]
                const firstTenChars = result.substring(0, 10);
                const lastFourDigits = data[0].style_number.slice(-4)
                const gacDate = new Date(data[0].gac); // Parse the GAC date
                // Calculate the date 7 days before the GAC date
                const sevenDaysBeforeGAC = new Date(gacDate);
                sevenDaysBeforeGAC.setDate(gacDate.getDate() - 7);
                // Format the result as 'DD/MM/YYYY'
                const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBeforeGAC)
                coLine.buyerPo = data[0].po_number + '-' + data[0].po_line_item_number
                coLine.exFactoryDate = exFactoryDate
                coLine.salesPrice = data[0].salesPrice ? data[0].salesPrice : data[0].gross_price_fob
                coLine.currency = data[0].currency ? data[0].currency : 'USD'
                coLine.deliveryDate = moment(data[0].gac).format("DD/MM/YYYY")
                styleNo = data[0].style_number
                const destinationsArr: Destinations[] = []
                const destinations = new Destinations()
                destinations.name = data[0].destination_country
                const colorsArr: Colors[] = []
                const colors = new Colors()
                colors.name = firstTenChars + ' ' + lastFourDigits
                const sizesArr: Sizes[] = []

                for (let item of data) {
                    const sizes = new Sizes()
                    sizes.name = item.size_description
                    sizes.qty = item.size_qty
                    sizes.price = item.gross_price_fob
                    sizesArr.push(sizes)
                }
                colors.sizes = sizesArr
                colorsArr.push(colors)
                destinations.colors = colorsArr
                destinationsArr.push(destinations)
                coLine.destinations = destinationsArr
                const req = new DestinationReq()
                req.destination = data[0].destination_country
                const addressResponse = await this.addressService.getAddressInfoByDestination(req);
                const addressData = addressResponse.data[0]
                buyerValue1 = "NKE-NIKE"
                buyerValue2 = "NIK00003-NIKE USA INC"
                agent = "NA-DIRECT CUSTOMER"
                buyerAddress = addressData ? addressData.buyerCode : 19
                deliveryAddress = addressData ? addressData.deliveryCode : 10
                pkgTerms = "BOX-BOXES"
                paymentTerms = "031-Trde Card45 Day"
            } else if (po.buyer === 'Uniqlo-U12') {
                const req = { orderNumber: po.buyer_po }
                const response = await axios.post(`https://uniqlov2-backend.xpparel.com/api/orders/getTrimOrderDetails`, req);
                const coData = response.data.data;
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
            // // await driver.executeScript(`arguments[0].value = '${buyerValue1}';`, buyerDropDown1)
            await driver.sleep(5000)
            await driver.wait(until.elementLocated(By.id('byr')));
            const dropdownElement2 = await driver.findElement(By.id('byr'));
            const dropdown2 = await driver.wait(until.elementIsVisible(dropdownElement2)).then(element => new Select(element))
            await dropdown2.selectByValue(buyerValue2)
            // // await driver.executeScript(`arguments[0].value = '${buyerValue2}';`, dropdownElement2)
            await driver.sleep(5000)
            await driver.wait(until.elementLocated(By.id('CreateOrderID')))
            await driver.findElement(By.id('CreateOrderID')).click();
            await driver.wait(until.elementLocated(By.id('bpo')))
            await driver.findElement(By.id('bpo')).clear();
            await driver.findElement(By.id('bpo')).sendKeys(coLine.buyerPo);
            await driver.wait(until.elementLocated(By.id('bus')))
            await driver.findElement(By.id('bus')).clear();
            await driver.findElement(By.id('bus')).sendKeys(styleNo);
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
            const number = optionValues.find(value => {
                return Number(value.split('-')[0].trim()) == Number(buyerAddress)
            });
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
                                        'UQSG': 2,
                                        'FRPH': 4
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
                                    if (po.item_no === '891O' && dest.name === 'UQAU') {
                                        tabIndex = 5;
                                    }
                                    if (po.item_no === '891O' && dest.name === 'UQEU') {
                                        tabIndex = 4;
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
                    } else if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
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
                                    let tabIndex = 1;
                                    // const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
                                    const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
                                    await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
                                    const dropdown = await driver.findElement(By.id(`bydline/${string}`));
                                    const options = await dropdown.findElements(By.tagName('option'));
                                    const optionValues = [];
                                    for (const option of options) {
                                        const value = await option.getAttribute('value');
                                        optionValues.push(value);
                                    }
                                    const number = optionValues.find(value => {
                                        return Number(value.split('-')[0].trim()) == Number(deliveryAddress)
                                    });
                                    await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
                                    // Find all the input fields in the first row.
                                    const inputElements = await driver.findElements(By.xpath("//tbody/tr[1]/td/div/input[@name='salespsizes']"));
                                    // Create a map of size labels to input fields.
                                    const sizeToInputMap = {};
                                    for (let i = 0; i < fileteredElements.length; i++) {
                                        const label = (await fileteredElements[i].getText()).trim().toUpperCase(); // Remove leading/trailing spaces
                                        if (label.length)
                                            sizeToInputMap[label] = inputElements[i];
                                    }
                                    const inputField = sizeToInputMap[size.name.trim().toUpperCase()];
                                    if (inputField) {
                                        // Clear the existing value (if any) and fill it with the new price.
                                        await inputField.clear();
                                        await inputField.sendKeys(size.price);
                                    }
                                }
                                const inputId = `${size.name}:${color.name}:ASSORTED`.replace(/\*/g, '');
                                console.log(inputId)
                                const input = await driver.wait(until.elementLocated(By.id(inputId)))
                                if (!input) {
                                    const update = await this.coLineRepository.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Failed', errorMsg: 'NO matching Size/Color found' });
                                    return new CommonResponseModel(false, 0, 'NO matching Size/Color found')
                                }
                                await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
                            }
                        }
                    }
                }
            }
            await driver.sleep(5000)
            const element = await driver.findElement(By.id('OrderCreateID')).click();
            await driver.wait(until.alertIsPresent(), 10000);
            // Switch to the alert and accept it (click "OK")
            const alert = await driver.switchTo().alert();
            await alert.accept();
            if (await this.isAlertPresent(driver)) {
                const alert = await driver.switchTo().alert();
                const alertText = await alert.getText();
                const update = await this.coLineRepository.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Failed', errorMsg: alertText, isActive: false });
                await this.updateCOLineStatus({ poNumber: po.buyer_po, poLineItemNumber: po.line_item_no, status: 'Failed' })
                return new CommonResponseModel(false, 0, alertText)
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
                        const update = await this.coLineRepository.update({ buyerPo: po.buyer_po }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
                        const req = { orderNumber: po.buyer_po, itemNumber: po.item_no }
                        const response = await axios.post(`https://uniqlov2-backend.xpparel.com/api/orders/updateOrderApprovalStatus`, req);
                        // await driver.navigate().refresh();
                        await driver.sleep(10000)
                    } else {
                        const update = await this.coLineRepository.update({ buyerPo: po.buyer_po }, { status: 'Failed' });
                        // await driver.navigate().refresh();
                        await driver.sleep(10000)
                    }
                } else {
                    await driver.sleep(10000)
                    await driver.wait(until.elementLocated(By.xpath('//*[@id="form2"]/table/tbody/tr[2]/td/div/table/thead/tr/th[4]')));
                    const coNoElement = await driver.findElement(By.xpath(`//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[last()]/td[7]`));
                    const coNo = await coNoElement.getAttribute('innerText');
                    const currentDate = new Date();
                    const day = currentDate.getDate().toString().padStart(2, '0');
                    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
                    const year = currentDate.getFullYear().toString().slice(-2);
                    const currentDateFormatted = `${day}-${month}-${year}`;
                    if (coNo) {
                        const update = await this.coLineRepository.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
                        await this.updateCOLineStatus({ poNumber: po.buyer_po, poLineItemNumber: po.line_item_no, status: 'Success' })
                        // await driver.wait(until.elementLocated(By.xpath('//*[@id="widget_1935820440"]')))
                        // await driver.findElement(By.xpath('//*[@id="widget_1935820440"]')).click()
                        await driver.sleep(2000)
                        // driver.quit()
                    } else {
                        const update = await this.coLineRepository.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Failed', isActive: false });
                        await this.updateCOLineStatus({ poNumber: po.buyer_po, poLineItemNumber: po.line_item_no, status: 'Failed' })
                        // await driver.wait(until.elementLocated(By.xpath('//*[@id="widget_1935820440"]')))
                        // await driver.findElement(By.xpath('//*[@id="widget_1935820440"]')).click()
                        await driver.sleep(2000)
                        // driver.quit()
                    }
                }
            }
            return new CommonResponseModel(true, 1, `COline created successfully`)
        } catch (err) {
            console.log(err, 'error');
            const update = await this.coLineRepository.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Failed', isActive: false });
            return new CommonResponseModel(false, 0, err)
        }
        finally {
            driver.quit()
        }
    }

    async isAlertPresent(driver) {
        try {
            await driver.switchTo().alert();
            return true;
        } catch (e) {
            return false;
        }
    }

    async sendMail(to: string, subject: string, message: any[]) {
        let content = message.reduce(function (a, b) {
            return a + '<tr bgcolor="#ffffff"><td>' + b.fileName + '</a></td><td>' + b.status + '</td><td>' + b.reason + '</td><td>' + b.columns + '</td></tr>';
        }, '');
        const sendMail = await this.transporter.sendMail({
            from: 'saiprakash.katiki@gmail.com',
            to,
            subject,
            text: '',
            html: '<div><table cellspacing="3" bgcolor="#000000"><thead><tr bgcolor="#ffffff"><th>File Name</th><th width="25%">Status</th><th>Reason</th><th>Columns</th></tr></thead><tbody>' +
                content + '</tbody></table></div>',
            context: {

            }
        });
        return sendMail
    }

    @Cron('0 4 * * *')
    async saveDPOMApiDataToDataBase(): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource);
        try {
            await transactionManager.startTransaction();
            const orderDetails = await this.getDPOMOrderDetails();
            if (!orderDetails.status) {
                return new CommonResponseModel(false, 0, orderDetails.error);
            }
            const date = new Date();
            const todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const entity = new NikeFileUploadEntity();
            entity.fileName = 'DPOM Api';
            entity.filePath = 'DPOM Api';
            entity.dpomStatus = 'Success';
            entity.createdUser = 'API sync';
            const save = await transactionManager.getRepository(NikeFileUploadEntity).save(entity);
            // Process orders in parallel
            for (const orderDetail of orderDetails.data) {
                // ... (Extract and process relevant data from orderDetail)
                const crmData = {
                    item: null, factory: null, customerOrder: null, coFinalApprovalDate: null, planNo: null, truckOutDate: null, actualShippedQty: null, coQty: null, coPrice: null, shipToAddress: null, paymentTerm: null, styleDesc: null, fabricContent: null, fabricSource: null, commission: null, PCD: null
                }
                // Parse dates using moment
                const date3 = moment(orderDetail.sizes.sizePo.goodsAtConsolidatorDate, 'YYYY-MM-DD');
                const date4 = moment(orderDetail.poHeader.documentDate, 'YYYY-MM-DD');
                // Calculate the difference in days
                const daysDifference = date4.diff(date3, 'days');
                let combinedInstructions: string;
                let hanger: string;
                if (orderDetail.poLine.itemVasDetail) {
                    // Extract valueAddedServiceInstructions from each object in the array
                    const instructionsArray = orderDetail.poLine.itemVasDetail?.map(vas => vas.textDetails);
                    // Flatten the array of instruction arrays into a single array
                    const flattenedInstructionsArray = [].concat(...instructionsArray);
                    // Combine the instructions into a single string
                    combinedInstructions = flattenedInstructionsArray.join('.');
                    const text = combinedInstructions;
                    const searchText = 'HANGING IS REQUIRED';
                    const isPresent = text?.includes(searchText)
                    if (isPresent) {
                        hanger = 'YES'
                    } else {
                        hanger = 'NO';
                    }
                }
                // Diverted PO's
                const itemText = orderDetail.poLine.itemTextDetail ? orderDetail.poLine.itemTextDetail[0]?.textDetails.join(',') : null;
                const search = 'diverted to'
                const present = itemText?.includes(search)
                const present2 = itemText?.includes('moved to Line')
                const matches = [];
                let match;
                if (present) {
                    const pattern = /diverted to.*?Purchase Order (\d+ \/ \d+)/g;
                    if (itemText !== null) {
                        while ((match = pattern.exec(itemText)) !== null) {
                            matches.push(match[1]);
                        }
                    }
                } else if (present2) {
                    const pattern = /moved to Line (\d+)/g;
                    if (itemText !== null) {
                        while ((match = pattern.exec(itemText)) !== null) {
                            const poAndLine = orderDetail.poHeader.poNumber + ' / ' + match[1]
                            matches.push(poAndLine);
                        }
                    }
                }
                const dtoData = new DpomSaveDto(orderDetail.poHeader.documentDate, orderDetail.poHeader.poNumber, orderDetail.poLine.itemNumber, orderDetail.sizes.scheduleLineItemNumber, orderDetail.product.categoryCode, orderDetail.product.categoryDescription, orderDetail.poHeader.vendorCode, orderDetail.product.globalCategoryCoreFocusCode, orderDetail.product.globalCategoryCoreFocusDescription, orderDetail.product.genderAgeCode, orderDetail.product.genderAgeDescription, orderDetail.product.styleNumber,
                    orderDetail.poLine.productCode, orderDetail.poLine.productName, orderDetail.product.colorDescription, orderDetail.poLine.destinationCountryCode, orderDetail.poLine.destinationCountryName, orderDetail.poLine.plantCode, orderDetail.poLine.plantName, orderDetail.poHeader.trcoPoNumber, orderDetail.sizes.sizeProduct.upc, orderDetail.poLine.directshipSalesOrderNumber, orderDetail.poLine.directshipSalesOrderItemNumber, orderDetail.salesOrder.customerPo, orderDetail.poLine.customerShipToNumber, orderDetail.poLine.customerShipToName,
                    orderDetail.poLine.seasonCode, orderDetail.poLine.seasonYear, orderDetail.poHeader.poDocTypeCode, orderDetail.poHeader.poDocTypeDescription, orderDetail.planning.mrgacDate, orderDetail.poLine.originalGoodsAtConsolidatorDate, orderDetail.sizes.sizePo.goodsAtConsolidatorDate, orderDetail.sizes.sizeLogisticsOR.originReceiptActualDate, orderDetail.manufacturing.factoryDeliveryActualDate, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonCode, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonDescription,
                    orderDetail.poLine.shippingType, orderDetail.planning.planningPriorityCode, orderDetail.planning.planningPriorityDescription, orderDetail.product.launchCode, orderDetail.poLine.geographyCode, orderDetail.poLine.dpomItemStatus, orderDetail.sizes.sizePo.transportationModeCode, orderDetail.poHeader.incoTerms, orderDetail.sizes.sizePo.inventorySegmentCode, orderDetail.poHeader.purchaseGroupCode, orderDetail.poHeader.purchaseGroupName, orderDetail.poLine.itemQuantity, orderDetail.sizes.sizeLogisticsOR.originReceiptQuantity,
                    orderDetail.sizes.sizeVas.valueAddedServiceInstructions, orderDetail.poLine.itemVasDetail ? combinedInstructions : null, orderDetail.poLine.itemTextDetail ? orderDetail.poLine.itemTextDetail[0]?.textDetails.join(',') : null, orderDetail.sizes.sizePo.sizePricing.fob.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.fob.crpoCurrencyCode, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoCurrencyCode,
                    orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoCurrencyCode, orderDetail.sizes.sizePo.sizeQuantity, orderDetail.sizes.sizePo.sizeDescription, null, null, null, null, null, null, crmData.item, crmData.factory, crmData.customerOrder, crmData.coFinalApprovalDate,
                    crmData.planNo, crmData.truckOutDate, crmData.actualShippedQty, crmData.coPrice, crmData.shipToAddress, crmData.paymentTerm, crmData.styleDesc, crmData.fabricContent, crmData.fabricSource, crmData.commission, crmData.PCD, hanger, orderDetail.poHeader.poNumber + '-' + orderDetail.poLine.itemNumber, orderDetail.poLine.changedOnDate, (daysDifference).toLocaleString(), todayDate, matches.length ? matches : null, 'username')

                const details: any = await this.dpomRepository.findOne({
                    where: {
                        purchaseOrderNumber: dtoData.purchaseOrderNumber,
                        poLineItemNumber: dtoData.poLineItemNumber,
                        scheduleLineItemNumber: dtoData.scheduleLineItemNumber,
                    },
                });
                const versionDetails = await this.dpomChildRepo.getVersion(dtoData.purchaseOrderNumber, dtoData.poLineItemNumber, dtoData.scheduleLineItemNumber);
                let version = 1;
                if (versionDetails.length > 0) {
                    version = Number(versionDetails.length) + 1;
                }
                dtoData.odVersion = version;
                if (details) {
                    // Bulk update operation
                    await transactionManager.getRepository(DpomEntity).update(
                        {
                            purchaseOrderNumber: dtoData.purchaseOrderNumber,
                            poLineItemNumber: dtoData.poLineItemNumber,
                            scheduleLineItemNumber: dtoData.scheduleLineItemNumber,
                        },
                        {
                            documentDate: dtoData.documentDate, categoryCode: dtoData.categoryCode, categoryDesc: dtoData.categoryDesc, vendorCode: dtoData.vendorCode, gccFocusCode: dtoData.gccFocusCode, gccFocusDesc: dtoData.gccFocusDesc, genderAgeCode: dtoData.genderAgeCode, genderAgeDesc: dtoData.genderAgeDesc, styleNumber: dtoData.styleNumber, productCode: dtoData.productCode, productName: dtoData.productName, colorDesc: dtoData.colorDesc, destinationCountryCode: dtoData.destinationCountryCode, destinationCountry: dtoData.destinationCountry, plant: dtoData.plant, plantName: dtoData.plantName, tradingCoPoNumber: dtoData.tradingCoPoNumber, UPC: dtoData.UPC, directShipSONumber: dtoData.directShipSONumber, directShipSOItemNumber: dtoData.directShipSOItemNumber, customerPO: dtoData.customerPO, shipToCustomerNumber: dtoData.shipToCustomerNumber, shipToCustomerName: dtoData.shipToCustomerName, planningSeasonCode: dtoData.planningSeasonCode, planningSeasonYear: dtoData.planningSeasonYear, docTypeCode: dtoData.docTypeCode, docTypeDesc: dtoData.docTypeDesc, MRGAC: dtoData.MRGAC, OGAC: dtoData.OGAC, GAC: dtoData.GAC, originReceiptDate: dtoData.originReceiptDate, factoryDeliveryActDate: dtoData.factoryDeliveryActDate, GACReasonCode: dtoData.GACReasonCode, GACReasonDesc: dtoData.GACReasonDesc, shippingType: dtoData.shippingType, planningPriorityCode: dtoData.planningPriorityCode, planningPriorityDesc: dtoData.planningPriorityDesc, launchCode: dtoData.launchCode, geoCode: dtoData.geoCode, DPOMLineItemStatus: dtoData.DPOMLineItemStatus, modeOfTransportationCode: dtoData.modeOfTransportationCode, inCoTerms: dtoData.inCoTerms, inventorySegmentCode: dtoData.inventorySegmentCode, purchaseGroupCode: dtoData.purchaseGroupCode, purchaseGroupName: dtoData.purchaseGroupName, totalItemQty: dtoData.DPOMLineItemStatus == 'Cancelled' ? dtoData.totalItemQty ? dtoData.totalItemQty : '0' : dtoData.totalItemQty, originReceiptQty: dtoData.originReceiptQty, VASSize: dtoData.VASSize, itemVasText: dtoData.itemVasText, itemText: dtoData.itemText, grossPriceFOB: dtoData.grossPriceFOB, FOBCurrencyCode: dtoData.FOBCurrencyCode, netIncludingDisc: dtoData.netIncludingDisc, netIncludingDiscCurrencyCode: dtoData.netIncludingDiscCurrencyCode, trCoNetIncludingDisc: dtoData.trCoNetIncludingDisc, trCoNetIncludingDiscCurrencyCode: dtoData.trCoNetIncludingDiscCurrencyCode, lastModifiedDate: dtoData.lastModifiedDate, hanger: dtoData.hanger, sizeQuantity: dtoData.sizeQuantity, sizeDescription: dtoData.sizeDescription, odVersion: dtoData.odVersion, divertedToPos: dtoData.divertedToPos?.join(',')
                        },
                    );
                    const convertedExcelEntity: Partial<DpomChildEntity> = this.dpomChildAdapter.convertDtoToEntity(dtoData, details.id);
                    await transactionManager.getRepository(DpomChildEntity).save(convertedExcelEntity);
                    // Bulk insert differences
                    const existingDataKeys = Object.keys(details);
                    const currentDataKeys = Object.keys(dtoData);
                    const dpomDiffObjects = [];
                    for (const existingDataKey of existingDataKeys) {
                        if (
                            details[existingDataKey] !== orderDetail[existingDataKey] &&
                            existingDataKey !== 'createdAt' && existingDataKey !== 'updatedAt' &&
                            existingDataKey != 'odVersion' && existingDataKey != 'createdUser' && existingDataKey != 'updatedUser' && existingDataKey != 'versionFlag' && existingDataKey != 'isActive' && existingDataKey != 'recordDate' && existingDataKey != 'lastModifiedDate' && existingDataKey != 'id' && existingDataKey != 'divertedToPos' && existingDataKey != 'item' && existingDataKey != 'factory' && existingDataKey != 'paymentTerm' && existingDataKey != 'crmCoQty' && existingDataKey != 'coPrice' && existingDataKey != 'coPriceCurrency' && existingDataKey != 'styleDesc' && existingDataKey != 'PCD' && existingDataKey != 'planNo' && existingDataKey != 'coFinalApprovalDate' && existingDataKey != 'customerOrder'
                        ) {
                            const dpomDiffObj = new DpomDifferenceEntity();
                            dpomDiffObj.oldValue = details[existingDataKey];
                            dpomDiffObj.newValue = dtoData[existingDataKey];
                            dpomDiffObj.columnName = dpomOrderColumnsName[existingDataKey];
                            dpomDiffObj.displayName = existingDataKey;
                            dpomDiffObj.purchaseOrderNumber = dtoData.purchaseOrderNumber;
                            dpomDiffObj.poLineItemNumber = dtoData.poLineItemNumber;
                            dpomDiffObj.scheduleLineItemNumber = dtoData.scheduleLineItemNumber;
                            dpomDiffObj.odVersion = dtoData.odVersion;
                            dpomDiffObj.fileId = save.id;

                            if (dpomDiffObj.oldValue != dpomDiffObj.newValue) {
                                dpomDiffObjects.push(dpomDiffObj);
                            }
                        }
                    };
                    // Bulk insert differences
                    if (dpomDiffObjects.length > 0) {
                        await transactionManager.getRepository(DpomDifferenceEntity).save(dpomDiffObjects);
                    }
                } else {
                    // Bulk insert operation
                    dtoData.odVersion = 1;
                    const convertedExcelEntity: Partial<DpomEntity> = this.dpomAdapter.convertDtoToEntity(dtoData);
                    const saveExcelEntity: DpomEntity = await transactionManager.getRepository(DpomEntity).save(convertedExcelEntity);
                    const convertedChildExcelEntity: Partial<DpomChildEntity> = this.dpomChildAdapter.convertDtoToEntity(dtoData, saveExcelEntity.id);
                    await transactionManager.getRepository(DpomChildEntity).save(convertedChildExcelEntity);
                }
            }
            await transactionManager.completeTransaction();
            return new CommonResponseModel(true, 1, 'Data retrieved and saved successfully');
        } catch (error) {
            await transactionManager.releaseTransaction();
            return new CommonResponseModel(false, 0, error.message || 'Something went wrong');
        }
    }

    @Cron('0 7 * * *')
    async syncCRMData(): Promise<CommonResponseModel> {
        // const transactionManager = new GenericTransactionManager(this.dataSource)
        const getBuyerPOs = await this.dpomRepository.getBuyerPOs()
        try {
            // await transactionManager.startTransaction()
            for (const buyerPo of getBuyerPOs) {
                const CRMData1 = await this.getCRMOrderDetails1(buyerPo.po_and_line);
                if (CRMData1.status) {
                    const orderNo = CRMData1?.data[0]?.ordno
                    // const styleNo = (CRMData1?.data[0]?.itemno).substring(0, 4)
                    const CRMData2 = await this.getCRMOrderDetails2(orderNo);
                    // const CRMData3 = await this.getCRMOrderDetails3(styleNo);
                    if (CRMData2.status) {
                        for (const data1 of CRMData1.data) {
                            let ocrStatus
                            if (data1.auditdate != null && data1.auditdate != undefined) {
                                const dateString = data1.auditdate;
                                const inputDate = new Date(dateString);
                                const currentDate = new Date();
                                if (inputDate < currentDate) {
                                    ocrStatus = 'Closed'
                                } else {
                                    ocrStatus = null
                                }
                            } else {
                                ocrStatus = null
                            }
                            const updateOrder = await this.dpomRepository.update({ purchaseOrderNumber: buyerPo.po_number, poLineItemNumber: buyerPo.po_line_item_number, sizeQuantity: data1.ord_QTY }, { item: data1.itemno, factory: data1.unit, customerOrder: data1.ordno, coFinalApprovalDate: data1.co_FINAL_APP_DATE, planNo: CRMData2?.data[0].plan_NUMB, coPrice: data1.price, coPriceCurrency: data1.currency, paymentTerm: CRMData2?.data[0].pay_TERM_DESC, styleDesc: '', commission: data1.commission, PCD: data1.pcd, crmCoQty: data1.ord_QTY, actualShippedQty: data1.inv_QTY != 0 ? data1.inv_QTY : data1.del_QTY, ocrAuditDate: data1.auditdate, ocrStatus: ocrStatus })
                            if (updateOrder.affected) {
                                continue;
                            } else {
                                await this.dpomRepository.update({ purchaseOrderNumber: buyerPo.po_number, poLineItemNumber: buyerPo.po_line_item_number }, { item: data1.itemno, factory: data1.unit, customerOrder: data1.ordno, coFinalApprovalDate: data1.co_FINAL_APP_DATE, planNo: CRMData2?.data[0].plan_NUMB, coPrice: data1.price, coPriceCurrency: data1.currency, paymentTerm: CRMData2?.data[0].pay_TERM_DESC, styleDesc: '', commission: data1.commission, PCD: data1.pcd, ocrAuditDate: data1.auditdate, ocrStatus: ocrStatus })
                                continue;
                                // await transactionManager.releaseTransaction()
                                // return new CommonResponseModel(false, 0, 'CRM data sync failed')
                            }
                        }
                    } else {
                        for (const data1 of CRMData1.data) {
                            let ocrStatus
                            if (data1.auditdate != null && data1.auditdate != undefined) {
                                const dateString = data1.auditdate;
                                const inputDate = new Date(dateString);
                                const currentDate = new Date();
                                if (inputDate < currentDate) {
                                    ocrStatus = 'Closed'
                                } else {
                                    ocrStatus = null
                                }
                            } else {
                                ocrStatus = null
                            }
                            const updateOrder = await this.dpomRepository.update({ purchaseOrderNumber: buyerPo.po_number, poLineItemNumber: buyerPo.po_line_item_number, sizeQuantity: data1.ord_QTY }, { item: data1.itemno, factory: data1.unit, customerOrder: data1.ordno, coFinalApprovalDate: data1.co_FINAL_APP_DATE, coPrice: data1.price, coPriceCurrency: data1.currency, styleDesc: '', commission: data1.commission, PCD: data1.pcd, crmCoQty: data1.ord_QTY, actualShippedQty: data1.inv_QTY != 0 ? data1.inv_QTY : data1.del_QTY, ocrAuditDate: data1.auditdate, ocrStatus: ocrStatus })
                            if (updateOrder.affected) {
                                continue;
                            } else {
                                await this.dpomRepository.update({ purchaseOrderNumber: buyerPo.po_number, poLineItemNumber: buyerPo.po_line_item_number }, { item: data1.itemno, factory: data1.unit, customerOrder: data1.ordno, coFinalApprovalDate: data1.co_FINAL_APP_DATE, coPrice: data1.price, coPriceCurrency: data1.currency, styleDesc: '', commission: data1.commission, PCD: data1.pcd, ocrAuditDate: data1.auditdate, ocrStatus: ocrStatus })
                                continue;
                                // await transactionManager.releaseTransaction()
                                // return new CommonResponseModel(false, 0, 'CRM data sync failed')
                            }
                        }
                    }
                } else {
                    await this.dpomRepository.findOne({ where: {} })
                    continue;
                }
            }
            // await transactionManager.completeTransaction()
            return new CommonResponseModel(true, 1, 'CRM data sync success')
        } catch (error) {
            // await transactionManager.releaseTransaction()
            return new CommonResponseModel(false, 0, error)
        }
    }

    async saveDIAPDFData(req: DiaPDFDto): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const orderDetails = await this.dpomRepository.find({ where: { purchaseOrderNumber: req.poNumber, poLineItemNumber: req.lineNo } })
            if (orderDetails.length > 0) {
                for (const detail of orderDetails) {
                    const updateOrder = await transactionManager.getRepository(DpomEntity).update({ purchaseOrderNumber: detail.purchaseOrderNumber, poLineItemNumber: detail.poLineItemNumber, scheduleLineItemNumber: detail.scheduleLineItemNumber }, {
                        shipToAddressDIA: req.shipToAddress, CABCode: req.cabCode, finalDestination: req.finalDestination
                    })
                    if (!updateOrder.affected) {
                        await transactionManager.releaseTransaction();
                        return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                    }
                }
                const entity = new PDFFileInfoEntity();
                entity.fileType = FileTypeEnum.DIA;
                entity.fileData = JSON.stringify(req);
                entity.pdfFileName = req.poNumber + '.pdf';
                entity.poNumber = req.poNumber;
                const fileDetails = await transactionManager.getRepository(PDFFileInfoEntity).save(entity);
                if (!fileDetails) {
                    await transactionManager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'file save failed')
                }
                await transactionManager.completeTransaction()
                return new CommonResponseModel(true, 1, 'PDF data saved successfully')
            } else {
                await transactionManager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'No POs found')
            }
        } catch (error) {
            await transactionManager.releaseTransaction()
            return new CommonResponseModel(false, 0, error)
        }
    }

    async saveLegalPOPDFData(req: any): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            req.poNumber = req.poNumber.replace(/\s+/g, "");
            await transactionManager.startTransaction()
            const orderDetails = await this.dpomRepository.find({ where: { purchaseOrderNumber: req.poNumber } })
            if (orderDetails) {
                for (const item of req.poItemDetails) {
                    const itemText = item.itemVasText ? item.itemVasText : null;
                    const matches = [];
                    let hanger = '-';
                    if (itemText != null) {
                        const pattern = /diverted to.*?Purchase Order (\d+ \/ \d+)/g;

                        let match;
                        if (itemText !== null) {
                            while ((match = pattern.exec(itemText)) !== null) {
                                matches.push(match[1]);
                            }
                        }

                        const searchText = "HANGING IS REQUIRED";
                        if (itemText.includes(searchText)) {
                            hanger = 'YES'
                        } else {
                            hanger = 'NO';
                        }
                    }

                    let price
                    for (const size of item.poItemVariantDetails) {
                        const cleanedValue = size.unitPrice.replace(/[^\d.]/g, '');
                        const numericValue = parseFloat(cleanedValue)
                        if (!isNaN(numericValue)) {
                            price = numericValue;
                        } else {
                            price = 0;
                        }
                        let shipToAddress;
                        if (req.shipToAddress == 'See Detail Below,') {
                            shipToAddress = item.shipToAddress
                        } else {
                            shipToAddress = req.shipToAddress
                        }
                        const poDetails = await this.dpomRepository.findOne({ where: { purchaseOrderNumber: req.poNumber, poLineItemNumber: parseInt(item.itemNo, 10), sizeDescription: size.size } })
                        if (poDetails) {
                            const updateOrder = await transactionManager.getRepository(DpomEntity).update({ purchaseOrderNumber: req.poNumber, poLineItemNumber: parseInt(item.itemNo, 10), sizeDescription: size.size }, {
                                shipToAddressLegalPO: shipToAddress, legalPoQty: Number(size.qunatity), legalPoPrice: price, legalPoCurrency: req.currency, itemVasPDF: itemText, divertedToPos: matches.join(',')
                            })
                            if (!updateOrder.affected) {
                                await transactionManager.releaseTransaction();
                                return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                            }
                        } else {
                            await transactionManager.releaseTransaction();
                            return new CommonResponseModel(false, 0, `No details found with PO '${req.poNumber}' and line item '${item.itemNo}'`)
                        }
                    }
                }
                const entity = new PDFFileInfoEntity();
                entity.fileType = FileTypeEnum.LEGAL_PO;
                entity.fileData = JSON.stringify(req);
                entity.pdfFileName = req.poNumber + '.pdf';
                entity.poNumber = req.poNumber;
                const fileDetails = await transactionManager.getRepository(PDFFileInfoEntity).save(entity);
                if (!fileDetails) {
                    await transactionManager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'file save failed')
                }
                await transactionManager.completeTransaction()
                return new CommonResponseModel(true, 1, 'PDF data saved successfully')
            } else {
                await transactionManager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'No POs data found relavent to PDF uploaded')
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
                actualShippedQty: 0,
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
                const searchText = 'HANGING IS REQUIRED';
                let hanger;
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
                    orderDetail.poLine.productCode, orderDetail.poLine.productName, orderDetail.product.colorDescription, orderDetail.poLine.destinationCountryCode, orderDetail.poLine.destinationCountryName, orderDetail.poLine.plantCode, orderDetail.poLine.plantName, orderDetail.poHeader.trcoPoNumber, orderDetail.sizes.sizeProduct.upc, orderDetail.poLine.directshipSalesOrderNumber, orderDetail.poLine.directshipSalesOrderItemNumber, orderDetail.salesOrder.customerPo, orderDetail.salesOrder.customerShipTo, orderDetail.poLine.customerShipToName,
                    orderDetail.poLine.seasonCode, orderDetail.poLine.seasonYear, orderDetail.poHeader.poDocTypeCode, orderDetail.poHeader.poDocTypeDescription, orderDetail.planning.mrgacDate, orderDetail.poLine.originalGoodsAtConsolidatorDate, orderDetail.sizes.sizePo.goodsAtConsolidatorDate, orderDetail.sizes.sizeLogisticsOR.originReceiptActualDate, orderDetail.manufacturing.factoryDeliveryActualDate, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonCode, orderDetail.sizes.sizePo.goodsAtConsolidatorReasonDescription,
                    orderDetail.poLine.shippingType, orderDetail.planning.planningPriorityCode, orderDetail.planning.planningPriorityDescription, orderDetail.product.launchCode, orderDetail.poLine.dpomItemStatus, orderDetail.sizes.sizePo.transportationModeCode, orderDetail.poHeader.incoTerms, null, orderDetail.poHeader.purchaseGroupCode, orderDetail.poHeader.purchaseGroupName, orderDetail.poLine.itemQuantity, orderDetail.sizes.sizeLogisticsOR.originReceiptQuantity,
                    orderDetail.sizes.sizeVas.valueAddedServiceInstructions, orderDetail.poLine.itemVas.valueAddedServiceInstructions, orderDetail.poLine.itemTextDetail.textDetails, orderDetail.sizes.sizePo.sizePricing.fob.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.fob.crpoCurrencyCode, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.crpoCurrencyCode,
                    orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoRateUnitValue, orderDetail.sizes.sizePo.sizePricing.netIncludingDiscounts.trcoCurrencyCode, orderDetail.sizes.sizePo.sizeQuantity, orderDetail.sizes.sizePo.sizeDescription, pdfData.shipToAddressLegalPO, orderDetail.poLine.geographyCode, pdfData.quantity, pdfData.price, pdfData.itemVasPDF, pdfData.shipToAddressDIA, pdfData.CABCode, crmData.item, crmData.factory, crmData.customerOrder, crmData.coFinalApprovalDate,
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
                            documentDate: dtoData.documentDate, categoryCode: dtoData.categoryCode, categoryDesc: dtoData.categoryDesc, vendorCode: dtoData.vendorCode, gccFocusCode: dtoData.gccFocusCode, gccFocusDesc: dtoData.gccFocusDesc, genderAgeCode: dtoData.genderAgeCode, genderAgeDesc: dtoData.genderAgeDesc, styleNumber: dtoData.styleNumber, productCode: dtoData.productCode, productName: dtoData.productName, colorDesc: dtoData.colorDesc, destinationCountryCode: dtoData.destinationCountryCode, destinationCountry: dtoData.destinationCountry, plant: dtoData.plant, plantName: dtoData.plantName, tradingCoPoNumber: dtoData.tradingCoPoNumber, UPC: dtoData.UPC, directShipSONumber: dtoData.directShipSONumber, directShipSOItemNumber: dtoData.directShipSOItemNumber, customerPO: dtoData.customerPO, shipToCustomerNumber: dtoData.shipToCustomerNumber, shipToCustomerName: dtoData.shipToCustomerName, planningSeasonCode: dtoData.planningSeasonCode, planningSeasonYear: dtoData.planningSeasonYear, docTypeCode: dtoData.docTypeCode, docTypeDesc: dtoData.docTypeDesc, MRGAC: dtoData.MRGAC, OGAC: dtoData.OGAC, GAC: dtoData.GAC, originReceiptDate: dtoData.originReceiptDate, factoryDeliveryActDate: dtoData.factoryDeliveryActDate, GACReasonCode: dtoData.GACReasonCode, GACReasonDesc: dtoData.GACReasonDesc, shippingType: dtoData.shippingType, planningPriorityCode: dtoData.planningPriorityCode, planningPriorityDesc: dtoData.planningPriorityDesc, launchCode: dtoData.launchCode, geoCode: dtoData.geoCode, DPOMLineItemStatus: dtoData.DPOMLineItemStatus, modeOfTransportationCode: dtoData.modeOfTransportationCode, inCoTerms: dtoData.inCoTerms, inventorySegmentCode: dtoData.inventorySegmentCode, purchaseGroupCode: dtoData.purchaseGroupCode, purchaseGroupName: dtoData.purchaseGroupName, totalItemQty: dtoData.totalItemQty, originReceiptQty: dtoData.originReceiptQty, VASSize: dtoData.VASSize, itemVasText: dtoData.itemVasText, itemText: dtoData.itemText, grossPriceFOB: dtoData.grossPriceFOB, FOBCurrencyCode: dtoData.FOBCurrencyCode, netIncludingDisc: dtoData.netIncludingDisc, netIncludingDiscCurrencyCode: dtoData.netIncludingDiscCurrencyCode, trCoNetIncludingDisc: dtoData.trCoNetIncludingDisc, trCoNetIncludingDiscCurrencyCode: dtoData.trCoNetIncludingDiscCurrencyCode, sizeQuantity: dtoData.sizeQuantity, sizeDescription: dtoData.sizeDescription, shipToAddressLegalPO: pdfData.shipToAddressLegalPO, legalPoQty: pdfData.quantity, legalPoPrice: pdfData.price, itemVasPDF: pdfData.itemVasPDF, shipToAddressDIA: pdfData.shipToAddressDIA, CABCode: pdfData.CABCode, item: crmData.item, factory: crmData.factory, customerOrder: crmData.customerOrder, coFinalApprovalDate: crmData.coFinalApprovalDate, planNo: crmData.planNo, truckOutDate: crmData.truckOutDate, actualShippedQty: crmData.actualShippedQty, coPrice: crmData.coPrice, shipToAddress: crmData.shipToAddress, paymentTerm: crmData.paymentTerm, styleDesc: crmData.styleDesc, fabricContent: crmData.fabricContent, fabricSource: crmData.fabricSource, commission: crmData.commission, PCD: crmData.PCD, odVersion: dtoData.odVersion, divertedToPos: dtoData.divertedToPos.join(',')
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
                documentDate: dtoData.documentDate, categoryCode: dtoData.categoryCode, categoryDesc: dtoData.categoryDesc, vendorCode: dtoData.vendorCode, gccFocusCode: dtoData.gccFocusCode, gccFocusDesc: dtoData.gccFocusDesc, genderAgeCode: dtoData.genderAgeCode, genderAgeDesc: dtoData.genderAgeDesc, styleNumber: dtoData.styleNumber, productCode: dtoData.productCode, colorDesc: dtoData.colorDesc, destinationCountryCode: dtoData.destinationCountryCode, destinationCountry: dtoData.destinationCountry, plant: dtoData.plant, plantName: dtoData.plantName, tradingCoPoNumber: dtoData.tradingCoPoNumber, UPC: dtoData.UPC, directShipSONumber: dtoData.directShipSONumber, directShipSOItemNumber: dtoData.directShipSOItemNumber, customerPO: dtoData.customerPO, shipToCustomerNumber: dtoData.shipToCustomerNumber, shipToCustomerName: dtoData.shipToCustomerName, planningSeasonCode: dtoData.planningSeasonCode, planningSeasonYear: dtoData.planningSeasonYear, docTypeCode: dtoData.docTypeCode, docTypeDesc: dtoData.docTypeDesc, MRGAC: dtoData.MRGAC, OGAC: dtoData.OGAC, GAC: dtoData.GAC, originReceiptDate: dtoData.originReceiptDate, factoryDeliveryActDate: dtoData.factoryDeliveryActDate, GACReasonCode: dtoData.GACReasonCode, GACReasonDesc: dtoData.GACReasonDesc, shippingType: dtoData.shippingType, planningPriorityCode: dtoData.planningPriorityCode, planningPriorityDesc: dtoData.planningPriorityDesc, launchCode: dtoData.launchCode, DPOMLineItemStatus: dtoData.DPOMLineItemStatus, modeOfTransportationCode: dtoData.modeOfTransportationCode, inCoTerms: dtoData.inCoTerms, inventorySegmentCode: dtoData.inventorySegmentCode, purchaseGroupCode: dtoData.purchaseGroupCode, purchaseGroupName: dtoData.purchaseGroupName, totalItemQty: dtoData.totalItemQty, originReceiptQty: dtoData.originReceiptQty, VASSize: dtoData.VASSize, itemVasText: dtoData.itemVasText, itemText: dtoData.itemText, grossPriceFOB: dtoData.grossPriceFOB, FOBCurrencyCode: dtoData.FOBCurrencyCode, netIncludingDisc: dtoData.netIncludingDisc, netIncludingDiscCurrencyCode: dtoData.netIncludingDiscCurrencyCode, trCoNetIncludingDisc: dtoData.trCoNetIncludingDisc, trCoNetIncludingDiscCurrencyCode: dtoData.trCoNetIncludingDiscCurrencyCode, sizeQuantity: dtoData.sizeQuantity, sizeDescription: dtoData.sizeDescription, shipToAddressLegalPO: dtoData.shipToAddressLegalPO, legalPoQty: dtoData.legalPoQty, legalPoPrice: dtoData.legalPoPrice, itemVasPDF: dtoData.itemVasPDF, shipToAddressDIA: dtoData.shipToAddressDIA, CABCode: dtoData.CABCode, item: dtoData.item, factory: dtoData.factory, customerOrder: dtoData.customerOrder, coFinalApprovalDate: dtoData.coFinalApprovalDate, planNo: dtoData.planNo, truckOutDate: dtoData.truckOutDate, actualShippedQty: dtoData.actualShippedQty, coPrice: dtoData.coPrice, shipToAddress: dtoData.shipToAddress, paymentTerm: dtoData.paymentTerm, styleDesc: dtoData.styleDesc, fabricContent: dtoData.fabricContent, fabricSource: dtoData.fabricSource, commission: dtoData.commission, PCD: dtoData.PCD, odVersion: dtoData.odVersion
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
        entity.dpomStatus = 'uploading';
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
            update = await this.fileUploadRepo.update({ id: req.fileId }, { dpomStatus: req.status, isActive: false });
        } else {
            update = await this.fileUploadRepo.update({ id: req.fileId }, { dpomStatus: req.status })
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

    async getFabricTrackerReport(req?: PpmDateFilterRequest): Promise<CommonResponseModel> {
        try {
            const data = await this.dpomRepository.getFabricTrackerReport(req);
            // console.log(data,"data")
            if (data.length > 0) {
                return new CommonResponseModel(true, 1, 'Data retrieved', data);
            } else {
                return new CommonResponseModel(false, 0, 'No data found');
            }
        } catch (error) {
            // Handle errors, log them, and return an error response if needed
            return new CommonResponseModel(false, 0, 'An error occurred', error);
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

    async getOrderAcceptanceData(req?: PpmDateFilterRequest): Promise<CommonResponseModel> {
        try {
            const details = await this.dpomRepository.getOrderAcceptanceData(req);
            if (details.length === 0) {
                return new CommonResponseModel(false, 0, 'data not found');
            }
            const sizeDateMap = new Map<string, FactoryReportModel>();
            for (const rec of details) {
                if (!sizeDateMap.has(rec.po_and_line)) {
                    sizeDateMap.set(
                        rec.po_and_line,
                        new FactoryReportModel(rec.last_modified_date, rec.item, rec.factory, rec.document_date, rec.po_number, rec.po_line_item_number, rec.po_and_line, rec.dpom_item_line_status, rec.style_number, rec.product_code, rec.color_desc, rec.customer_order, rec.po_final_approval_date, rec.plan_no, rec.lead_time, rec.category_code, rec.category_desc, rec.vendor_code, rec.gcc_focus_code, rec.gcc_focus_desc, rec.gender_age_code, rec.gender_age_desc, rec.destination_country_code, rec.destination_country, rec.plant, rec.plant_name, rec.trading_co_po_no, rec.upc, rec.direct_ship_so_no, rec.direct_ship_so_item_no, rec.customer_po, rec.ship_to_customer_no, rec.ship_to_customer_name, rec.planning_season_code, rec.planning_season_year, rec.doc_type_code, rec.doc_type_desc, rec.mrgac, rec.ogac, rec.gac, rec.truck_out_date, rec.origin_receipt_date, rec.factory_delivery_date, rec.gac_reason_code, rec.gac_reason_desc, rec.shipping_type, rec.planning_priority_code, rec.planning_priority_desc, rec.launch_code, rec.mode_of_transport_code, rec.inco_terms, rec.inventory_segment_code, rec.purchase_group_code, rec.purchase_group_name, rec.total_item_qty, rec.actual_shipped_qty, rec.vas_size, rec.item_vas_text, rec.item_text, rec.legal_po_price, rec.co_price, rec.pcd, rec.ship_to_address_legal_po, rec.ship_to_address_dia, rec.cab_code, rec.gross_price_fob, rec.ne_inc_disc, rec.trading_net_inc_disc, rec.displayName, rec.actual_unit, rec.allocated_quantity, rec.pcd, rec.fobCurrCode, rec.netIncDisCurrency, rec.tradingNetCurrencyCode, rec.hanger, rec.quantity, rec.geo_code, [], rec.co_line_status)
                    );
                }
                const sizeWiseData = sizeDateMap.get(rec.po_and_line).sizeWiseData;
                if (rec.size_description !== null) {
                    sizeWiseData.push(new FactoryReportSizeModel(rec.size_description, rec.size_qty, rec.legal_po_price, rec.co_price));
                }
            }
            const dataModelArray: FactoryReportModel[] = Array.from(sizeDateMap.values());
            return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
        } catch (err) {
            return new CommonResponseModel(false, 0, 'failed', err);
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

    async getVasTextChangeData(req: any): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getVasTextChangeData(req)
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

    async getFactoryReportData(req?: PpmDateFilterRequest): Promise<CommonResponseModel> {
        try {
            const allDetails = await this.dpomRepository.getFactoryPpmData(req);
            const filteredDetails = allDetails.filter(record => record.doc_type_code !== 'ZP26')
            const details = filteredDetails.filter(record => record.dpom_item_line_status !== 'Cancelled')
            if (details.length === 0) {
                return new CommonResponseModel(false, 0, 'data not found');
            }
            const sizeDateMap = new Map<string, FactoryReportModel>();
            for (const rec of details) {
                let itemVasText;
                let hanger;
                const instructions = rec.item_vas_text;
                const searchString = 'SPECIAL VAS PACKING INSTRUCTIONS';
                const search2 = 'HANGING IS REQUIRED'
                const isPresent = instructions?.includes(searchString);
                const isPresent2 = instructions?.includes(search2);
                if (isPresent) {
                    itemVasText = instructions?.replace(/"/g, '')
                } else {
                    itemVasText = instructions
                }
                if (isPresent2) {
                    hanger = 'YES'
                } else {
                    hanger = 'NO'
                }
                if (!sizeDateMap.has(rec.po_and_line)) {
                    sizeDateMap.set(
                        rec.po_and_line,
                        new FactoryReportModel(rec.last_modified_date, rec.item, rec.factory, rec.document_date, rec.po_number, rec.po_line_item_number, rec.po_and_line, rec.dpom_item_line_status, rec.style_number, rec.product_code, rec.color_desc, rec.customer_order, rec.po_final_approval_date, rec.plan_no, rec.lead_time, rec.category_code, rec.category_desc, rec.vendor_code, rec.gcc_focus_code, rec.gcc_focus_desc, rec.gender_age_code, rec.gender_age_desc, rec.destination_country_code, rec.destination_country, rec.plant, rec.plant_name, rec.trading_co_po_no, rec.upc, rec.direct_ship_so_no, rec.direct_ship_so_item_no, rec.customer_po, rec.ship_to_customer_no, rec.ship_to_customer_name, rec.planning_season_code, rec.planning_season_year, rec.doc_type_code, rec.doc_type_desc, rec.mrgac, rec.ogac, rec.gac, rec.truck_out_date, rec.origin_receipt_date, rec.factory_delivery_date, rec.gac_reason_code, rec.gac_reason_desc, rec.shipping_type, rec.planning_priority_code, rec.planning_priority_desc, rec.launch_code, rec.mode_of_transport_code, rec.inco_terms, rec.inventory_segment_code, rec.purchase_group_code, rec.purchase_group_name, rec.total_item_qty, rec.actual_shipped_qty, rec.vas_size, itemVasText, rec.item_text, rec.legal_po_price, rec.co_price, rec.pcd, rec.ship_to_address_legal_po, rec.ship_to_address_dia, rec.cab_code, rec.gross_price_fob, rec.ne_inc_disc, rec.trading_net_inc_disc, rec.displayName, rec.actual_unit, rec.allocated_quantity, rec.pcd, rec.fobCurrCode, rec.netIncDisCurrency, rec.tradingNetCurrencyCode, hanger, rec.quantity, rec.geo_code, [])
                    );
                }
                const sizeWiseData = sizeDateMap.get(rec.po_and_line).sizeWiseData;
                if (rec.size_description !== null) {
                    sizeWiseData.push(new FactoryReportSizeModel(rec.size_description, rec.size_qty, rec.legal_po_price, rec.co_price));
                }
            }
            const dataModelArray: FactoryReportModel[] = Array.from(sizeDateMap.values());
            return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
        } catch (err) {
            return new CommonResponseModel(false, 0, 'failed', err);
        }
    }

    async getDifferentialData(req: any): Promise<string> {
        const oldText = req.oldText;
        const newText = req.newText;

        const lines1 = oldText?.trim().split(/\n\s*\n/).slice(0, 5);
        const text1 = lines1?.join('').toLowerCase().replace(/\d+/g, '');

        const lines2 = newText?.trim().split(/\n\s*\n/).slice(0, 5);
        const text2 = lines2?.join('').toLowerCase().replace(/\d+/g, '');

        const dmp = new diff_match_patch();
        const diff = dmp.diff_main(text1, text2);
        dmp.diff_cleanupSemantic(diff);

        let output = '';
        let commonContext = ''; // To store common context around differences
        for (const [op, text] of diff) {
            if (op === diff_match_patch.DIFF_INSERT) {
                if (text.trim() !== '') {
                    output += `${text} `;
                    commonContext = ''; // Reset common context after inserting difference
                }
            } else if (op === diff_match_patch.DIFF_DELETE) {
                if (text.trim() !== '') {
                    output += `${text}`; // Include space in common context
                    commonContext = ''; // Reset common context after deleting difference
                }
            } else {
                commonContext += `${text} `;
            }
        }
        return output ? output.replace(/"/g, '').trim() : '-';
    }

    async getPPMData(req?: PpmDateFilterRequest): Promise<CommonResponseModel> {
        const details = await this.dpomRepository.getMarketingPpmData(req);
        if (details.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found')
        }
        const sizeDateMap = new Map<string, MarketingReportModel>();
        for (const rec of details) {
            let coFinalAppDate;
            if (rec.po_final_approval_date != 0 && rec.po_final_approval_date != null) {
                coFinalAppDate = moment(rec.po_final_approval_date).format('MM/DD/YYYY')
            } else {
                coFinalAppDate = '-'
            }
            let formattedPCD;
            if (rec.pcd != null && rec.pcd != 0) {
                const year = parseInt(rec.pcd.slice(0, 4), 10);
                const month = parseInt(rec.pcd.slice(4, 6), 10);
                const day = parseInt(rec.pcd.slice(6, 8), 10);
                if (isNaN(year) || isNaN(month) || isNaN(day)) {
                    formattedPCD = null
                }
                const date = new Date(year, month - 1, day);
                if (isNaN(date.getTime())) {
                    formattedPCD = null
                }
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                const yyyy = date.getFullYear();
                formattedPCD = `${mm}/${dd}/${yyyy}`;
            }
            let itemVasText;
            let itemVasPDF;
            let hanger;
            const instructions = rec.item_vas_text;
            const instructions2 = rec.item_vas_pdf;
            const searchString = 'SPECIAL VAS PACKING INSTRUCTIONS';
            const search2 = 'HANGING IS REQUIRED'
            const isPresent = instructions?.includes(searchString);
            const isPresent2 = instructions?.includes(search2);
            const isPresent3 = instructions2?.includes(searchString)
            if (isPresent) {
                itemVasText = instructions?.replace(/"/g, '')
            } else {
                itemVasText = instructions
            }
            if (isPresent2) {
                hanger = 'YES'
            } else {
                hanger = 'NO'
            }
            if (isPresent3) {
                itemVasPDF = instructions2?.replace(/"/g, '')
            } else {
                itemVasPDF = instructions2
            }
            let diffOfShipToAdd
            if (rec.ship_to_address_legal_po && rec.ship_to_address_dia) {
                diffOfShipToAdd = await this.getDifferentialData({ oldText: rec.ship_to_address_legal_po, newText: rec.ship_to_address_dia })
            } else if (rec.ship_to_address_legal_po) {
                diffOfShipToAdd = rec.ship_to_address_legal_po?.replace(/"/g, '')
            } else if (rec.ship_to_address_dia) {
                diffOfShipToAdd = rec.ship_to_address_dia?.replace(/"/g, '')
            }
            if (!sizeDateMap.has(rec.po_and_line)) {
                sizeDateMap.set(
                    rec.po_and_line, new MarketingReportModel(rec.last_modified_date ? moment(rec.last_modified_date).format('MM/DD/YYYY') : '-', rec.item ? (rec.item).substring(0, 4) : null, rec.factory, moment(rec.document_date).format('MM/DD/YYYY'), rec.po_number, rec.po_line_item_number, rec.po_and_line, rec.dpom_item_line_status, rec.style_number, rec.product_code, rec.product_name, rec.color_desc, rec.customer_order, coFinalAppDate, rec.plan_no, rec.lead_time, rec.category_code, rec.category_desc, rec.vendor_code, rec.gcc_focus_code, rec.gcc_focus_desc, rec.gender_age_code, rec.gender_age_desc, rec.destination_country_code, rec.destination_country, rec.plant, rec.plant_name, rec.trading_co_po_no, rec.upc, rec.direct_ship_so_no, rec.direct_ship_so_item_no, rec.customer_po, rec.ship_to_customer_no, rec.ship_to_customer_name, rec.planning_season_code, rec.planning_season_year, rec.doc_type_code, rec.doc_type_desc, rec.mrgac ? moment(rec.mrgac, 'YYYY-MM-DD').format('MM/DD/YYYY') : '-', rec.ogac ? moment(rec.ogac).format('MM/DD/YYYY') : '-', rec.gac ? moment(rec.gac).format('MM/DD/YYYY') : '-', rec.truck_out_date ? moment(rec.truck_out_date).format('MM/DD/YYYY') : '-', rec.origin_receipt_date ? moment(rec.origin_receipt_date).format('MM/DD/YYYY') : '-', rec.factory_delivery_date ? moment(rec.factory_delivery_date).format('MM/DD/YYYY') : '-', rec.gac_reason_code, rec.gac_reason_desc, rec.shipping_type, rec.planning_priority_code, rec.planning_priority_desc, rec.launch_code, rec.geo_code, rec.mode_of_transport_code, rec.inco_terms, rec.inventory_segment_code, rec.purchase_group_code, rec.purchase_group_name, rec.total_item_qty, rec.actual_shipped_qty, rec.vas_size, itemVasText, itemVasPDF, rec.item_text, formattedPCD, rec.ship_to_address_legal_po?.replace(/"/g, ''), rec.ship_to_address_dia?.replace(/"/g, ''), diffOfShipToAdd, rec.cab_code, rec.displayName, rec.actual_unit, rec.allocated_quantity, hanger, rec.fabric_content, rec.final_destination, [])
                )
            }
            let fobPriceDiff;
            if (isNaN(rec.gross_price_fob) || isNaN(rec.shahi_confirmed_gross_price)) {
                fobPriceDiff = null
            } else {
                fobPriceDiff = (Number(rec.gross_price_fob) - Number(rec.shahi_confirmed_gross_price)).toFixed(2)
            }
            let fobCurrencyDiff;
            if (rec.fob_currency_code == rec.shahi_confirmed_gross_price_currency_code) {
                fobCurrencyDiff = 'Same'
            } else {
                fobCurrencyDiff = 'Different'
            }
            let diffOfLegalPOCOPrice;
            if (isNaN(rec.legal_po_price) || isNaN(rec.co_price)) {
                diffOfLegalPOCOPrice = null
            } else {
                diffOfLegalPOCOPrice = (Number(rec.legal_po_price) - Number(rec.co_price)).toFixed(2)
            }
            let diffOfLegalPOCOCurrency;
            if (rec.legal_po_currency && rec.co_price_currency) {
                if (rec.legal_po_currency && rec.co_price_currency) {
                    diffOfLegalPOCOCurrency = 'Same'
                } else {
                    diffOfLegalPOCOCurrency = 'Different'
                }
            } else {
                diffOfLegalPOCOCurrency = null
            }
            let diffOfQty;
            if (isNaN(rec.crm_co_qty) || isNaN(rec.legal_po_qty)) {
                diffOfQty = null
            } else {
                diffOfQty = Number(rec.crm_co_qty) - Number(rec.legal_po_qty)
            }
            let allowedExcessShipQty;
            if (rec.shippingType === 'DIRECT') {
                allowedExcessShipQty = 0;
            } else {
                const result = 0.03 * Number(rec.size_qty);
                allowedExcessShipQty = parseInt(String(result))
            }
            let actualShipPer;
            if (rec.actual_shipped_qty) {
                const div = Number(rec.actual_shipped_qty) / Number(rec.size_qty);
                actualShipPer = Number(div * 100).toFixed(0) + ' ' + '%';
            } else {
                actualShipPer = 0 + ' ' + '%';
            }
            sizeDateMap.get(rec.po_and_line).sizeWiseData.push(new MarketingReportSizeModel(rec.size_description, rec.size_qty, rec.gross_price_fob, rec.fob_currency_code, rec.shahi_confirmed_gross_price, rec.shahi_confirmed_gross_price_currency_code, fobPriceDiff, fobCurrencyDiff, rec.ne_inc_disc, rec.net_inc_disc_currency_code, rec.trading_net_inc_disc, rec.trading_net_currency_code, rec.legal_po_price, rec.legal_po_currency, rec.co_price, rec.co_price_currency, diffOfLegalPOCOPrice, diffOfLegalPOCOCurrency, rec.crm_co_qty, rec.legal_po_qty, diffOfQty, allowedExcessShipQty, rec.actual_shipped_qty, actualShipPer));
        }
        const dataModelArray: MarketingReportModel[] = [];
        sizeDateMap.forEach(sizeData => dataModelArray.push(sizeData));
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
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

            const dashboardData = new PoDataResDto(names, dashboardPoGrnData);
            return new CommonResponseModel(true, 10000, 'Data Retrieved Successfully.', dashboardData);
        } catch (error) {
            return new CommonResponseModel(false, 0, 'failed', error);
        }
    }

    async saveDivertData(req: any): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource);
        try {
            await transactionManager.startTransaction();
            const divertArr: DivertEntity[] = []
            for (const data of req) {
                const divertData = await this.divertRepository.findOne({ where: { oPurchaseOrderNumber: data.oldPo[0].poNumber, oPoLineItemNumber: data.oldPo[0].poLine, nPurchaseOrderNumber: data.newpo[0].npoNumber, nPoLineItemNumber: data.newpo[0].npoLine } })
                if (divertData) {
                    continue;
                } else {
                    const entity = new DivertEntity()
                    entity.orequestDate = data.newpo[0].orequestDate != '-' ? moment(data.newpo[0].orequestDate, 'MM/DD/YYYY').format('YYYY-MM-DD') : null
                    entity.oItem = data.oldPo[0].item
                    entity.oFactory = data.oldPo[0].factory
                    entity.oPlant = data.oldPo[0].Plant
                    entity.oProductCode = data.oldPo[0].productCode
                    entity.oLineItemStatus = data.oldPo[0].LineStatus
                    entity.oDocumentDate = moment(data.oldPo[0].DocumentDate).format('YYYY-MM-DD')
                    entity.oPurchaseOrderNumber = data.oldPo[0].poNumber
                    entity.oPoLineItemNumber = data.oldPo[0].poLine
                    entity.oldVal = data.oldPo[0].oldVal
                    entity.oTotalItemQty = data.oldPo[0].Quantity
                    entity.oDestination = data.oldPo[0].destination
                    entity.oShipmentType = data.oldPo[0].shipmentType
                    entity.oOGAC = data.oldPo[0].ogac
                    entity.oGAC = data.oldPo[0].gac
                    entity.oInventorySegmentCode = data.oldPo[0].inventorySegmentCode
                    entity.oItemVasText = data.oldPo[0].itemVasText
                    entity.oFOBPrice = data.oldPo[0].gross_price_fob
                    entity.oTradingCoNetIncDis = data.oldPo[0].trading_net_inc_disc
                    entity.nOGAC = data.newpo[0].nogac
                    entity.nGAC = data.newpo[0].ngac
                    entity.nItem = data.newpo[0].item
                    entity.nFactory = data.newpo[0].factory
                    entity.nPlant = data.newpo[0].nPlant
                    entity.nProductCode = data.newpo[0].nproductCode
                    entity.nLineItemStatus = data.newpo[0].nLineStatus
                    entity.nDocumentDate = moment(data.newpo[0].nDocumentDate).format('YYYY-MM-DD')
                    entity.nPurchaseOrderNumber = data.newpo[0].npoNumber
                    entity.nPoLineItemNumber = data.newpo[0].npoLine
                    entity.nTotalItemQty = data.newpo[0].nQuantity
                    entity.nDestination = data.newpo[0].ndestination
                    entity.nInventorySegmentCode = data.newpo[0].ninventorySegmentCode
                    entity.nItemVasText = data.newpo[0].nitemVasText
                    entity.nShipmentType = data.newpo[0].nshipmentType
                    entity.nFOBPrice = data.newpo[0].gross_price_fob
                    entity.nTradingCoNetIncDis = data.newpo[0].trading_net_inc_disc
                    divertArr.push(entity)
                }
            }
            const save = await transactionManager.getRepository(DivertEntity).save(divertArr);
            if (save) {
                await transactionManager.completeTransaction();
                return new CommonResponseModel(true, 1, 'Data retrieved and saved successfully');
            } else {
                await transactionManager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Something went wrong');
            }
        } catch (error) {
            await transactionManager.releaseTransaction();
            return new CommonResponseModel(false, 0, error.message || 'Something went wrong');
        }
    }

    async updateDivertData(req: any): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource);
        try {
            await transactionManager.startTransaction();
            const divertData = await this.divertRepository.findOne({ where: { oPurchaseOrderNumber: req.oldPoNumber, oPoLineItemNumber: req.oldPoLineItemNo, nPurchaseOrderNumber: req.newPoNumber, nPoLineItemNumber: req.newPoLineItemNo } })
            if (divertData) {
                const update = await this.divertRepository.update({ oPurchaseOrderNumber: req.oldPoNumber, oPoLineItemNumber: req.oldPoLineItemNo, nPurchaseOrderNumber: req.newPoNumber, nPoLineItemNumber: req.newPoLineItemNo }, {
                    orequestDate: req.requestDate, oldVal: req.oldQty, oTotalItemQty: req.totalQty
                })
                if (update.affected) {
                    await transactionManager.completeTransaction();
                    return new CommonResponseModel(true, 1, 'Data updated successfully');
                } else {
                    await transactionManager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'Something went wrong');
                }
            } else {
                const oldData = await this.dpomRepository.findOne({ where: { purchaseOrderNumber: req.oldPoNumber, poLineItemNumber: req.oldPoLineItemNo } })
                const newData = await this.dpomRepository.findOne({ where: { purchaseOrderNumber: req.newPoNumber, poLineItemNumber: req.newPoLineItemNo } })
                const entity = new DivertEntity()
                entity.orequestDate = moment(req.requestDate).format('MM/DD/YYYY')
                entity.oItem = oldData.item ? oldData.item : '-'
                entity.oFactory = oldData.factory ? oldData.factory : '-'
                entity.oPlant = oldData.plant
                entity.oProductCode = oldData.productCode
                entity.oLineItemStatus = oldData.DPOMLineItemStatus
                entity.oDocumentDate = moment(oldData.documentDate).format('YYYY-MM-DD')
                entity.oPurchaseOrderNumber = req.oldPoNumber
                entity.oPoLineItemNumber = req.oldPoLineItemNo
                entity.oldVal = req.oldQty
                entity.oTotalItemQty = req.balQty
                entity.oDestination = oldData.destinationCountry
                entity.oShipmentType = oldData.shippingType
                entity.oOGAC = oldData.OGAC
                entity.oGAC = oldData.GAC
                entity.oInventorySegmentCode = oldData.inventorySegmentCode
                entity.oItemVasText = oldData.itemVasText
                entity.oFOBPrice = oldData.grossPriceFOB
                entity.oTradingCoNetIncDis = oldData.trCoNetIncludingDisc
                entity.nOGAC = newData.OGAC
                entity.nGAC = newData.GAC
                entity.nItem = newData.item ? newData.item : '-'
                entity.nFactory = newData.factory ? newData.factory : '-'
                entity.nPlant = newData.plant
                entity.nProductCode = newData.productCode
                entity.nLineItemStatus = newData.DPOMLineItemStatus
                entity.nDocumentDate = moment(newData.documentDate).format('YYYY-MM-DD')
                entity.nPurchaseOrderNumber = req.newPoNumber
                entity.nPoLineItemNumber = req.newPoLineItemNo
                entity.nTotalItemQty = newData.totalItemQty
                entity.nDestination = newData.destinationCountry
                entity.nInventorySegmentCode = newData.inventorySegmentCode
                entity.nItemVasText = newData.itemVasText
                entity.nShipmentType = newData.shippingType
                entity.nFOBPrice = newData.grossPriceFOB
                entity.nTradingCoNetIncDis = newData.trCoNetIncludingDisc
                const save = await transactionManager.getRepository(DivertEntity).save(entity);
                if (save) {
                    await transactionManager.completeTransaction();
                    return new CommonResponseModel(true, 1, 'Data retrieved and saved successfully');
                } else {
                    await transactionManager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'Something went wrong');
                }
            }
        } catch (error) {
            await transactionManager.releaseTransaction();
            return new CommonResponseModel(false, 0, error.message || 'Something went wrong');
        }
    }

    async updateDivertDataValues(req: any): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource);
        try {
            await transactionManager.startTransaction();
            const divertData = await this.divertRepository.findOne({ where: { id: req.id } })
            if (divertData) {
                const update = await this.divertRepository.update({ id: req.id }, {
                    trimsChange: req.trimsChange, surcharge: req.surcharge
                })
                if (update.affected) {
                    await transactionManager.completeTransaction();
                    return new CommonResponseModel(true, 1, 'Data updated successfully');
                } else {
                    await transactionManager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'Something went wrong');
                }
            } else {
                await transactionManager.releaseTransaction();
                return new CommonResponseModel(false, 0, 'Record not found');
            }
        } catch (error) {
            await transactionManager.releaseTransaction();
            return new CommonResponseModel(false, 0, error.message || 'Something went wrong');
        }
    }

    async getDivertReportData(): Promise<CommonResponseModel> {
        try {
            const reports = await this.dpomRepository.getDivertReport();
            const divertModelData: DivertModel[] = [];
            const processedPoLineSet = new Set<string>();
            for (const report of reports) {
                const divertedPos = report.diverted_to_pos.split(',');
                if (report.diverted_to_pos) {
                    for (const PoLine of divertedPos) {
                        const [po, line] = PoLine.split('/');
                        const po1 = po.replace(/\s/g, '')
                        const line1 = line.replace(/\s/g, '')
                        {/* Check if this Po/line combination has already been processed*/ }
                        const newPoData = await this.dpomRepository.getDivertWithNewDataReport([po1, line1]);
                        const model = new DivertModel([report], newPoData);
                        const inputText = report.itemText
                        const regex1 = new RegExp(`${PoLine} at (\\d{2}/\\d{2}/\\d{4})`, 'g');
                        const regex2 = /Divert to PO# (\d+-\d+).+?(\d{1,2}\/\d{1,2}\/\d{2,4})/g;
                        const regex3 = /Quantity (\d+) moved to Line (\d+) on (\d{2}\/\d{2}\/\d{4})/;

                        let match;
                        let dateAfterPattern
                        // Check regex1
                        while ((match = regex1.exec(inputText)) !== null) {
                            if (match[1]) {
                                dateAfterPattern = match[1];
                                break;  // Break out of the loop if a match is found
                            }
                        }
                        // Check regex2 if not found by regex1
                        if (!dateAfterPattern) {
                            while ((match = regex2.exec(inputText)) !== null) {
                                if (match[2]) {
                                    dateAfterPattern = match[2];
                                    break;  // Break out of the loop if a match is found
                                }
                            }
                        }
                        // Check regex3 if not found by regex1 or regex2
                        if (!dateAfterPattern) {
                            while ((match = regex3.exec(inputText)) !== null) {
                                if (match[3]) {
                                    dateAfterPattern = match[3];
                                    break;  // Break out of the loop if a match is found
                                }
                            }
                        }
                        model.newpo[0].orequestDate = dateAfterPattern ? moment(dateAfterPattern, ['MM/DD/YYYY', 'DD.MM.YYYY', 'M/DD/YY']).format('MM/DD/YYYY') : "-"
                        divertModelData.push(model);
                        // Mark this Po/line combination as processed
                        processedPoLineSet.add(PoLine);
                    }
                }
            }
            if (divertModelData.length > 0) {
                const save = await this.saveDivertData(divertModelData)
                if (save.status) {
                    return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', divertModelData);
                } else {
                    return new CommonResponseModel(false, 0, 'Failed to save');
                }
            } else {
                return new CommonResponseModel(false, 0, 'No Data Found', []);
            }
        } catch (error) {
            console.error('Error in getDivertReportData:', error);
            return new CommonResponseModel(false, 0, 'Error retrieving data', []);
        }
    }

    async getDivertReportDataFromDivertTable(): Promise<CommonResponseModel> {
        const data = await this.divertRepository.find({
            order: {
                orequestDate: 'ASC',
            },
        })
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
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
    ///----------------------------------------------------------------------------------------->fabric tracker 
    async getFabricTrackerForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getFabricTrackerForFactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getFabricTrackerForItem(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getFabricTrackerForItem()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getFabricTrackerForProductCode(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getFabricTrackerForProductCode()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getFabricTrackerForStyleNumber(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getFabricTrackerForStyleNumber()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getFabricTrackerForColorDesc(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getFabricTrackerForColorDesc()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    //-----------------------------------------------------------------------------marketing
    async getPpmPoLineForMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmPoLineItemNumberForMarketing()
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
            const docDetails = await this.dpomRepository.getFactoryDataById(req.poAndLine)
            const updateRecord = await this.dpomRepository.update({ poAndLine: docDetails[0].poline }, { actualUnit: req.actualUnit, allocatedQuantity: req.allocatedQuantity })
            if (updateRecord.affected) {
                return new CommonResponseModel(true, 1, 'Data updated Successfully', true)
            } else {
                return new CommonResponseModel(false, 0, 'Error', false)
            }
        } catch (err) {
            throw err
        }
    }

    async getPriceDifferenceReport(req?: FobPriceDiffRequest): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getfobPriceReportData(req)
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'data retrieved', data);
        } else {
            return new CommonResponseModel(false, 0, 'Data not retrived', []);
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

    async getPpmProductCodeForOrderCreation(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmProductCodeForOrderCreation()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmPoLineForOrderCreation(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPoLineforOrderCreation()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmPoLineForNikeOrder(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmPoLineForNikeOrder()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmPoLineForPo(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmPoLineForNikeOrder()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPriceDiffPoLinedd(): Promise<CommonResponseModel> {
        const query = `SELECT DISTINCT d.id,d.po_and_line as poAndLine,f.shahi_confirmed_gross_price_currency_code as shahiCurrencyCode FROM dpom d
        LEFT JOIN fob_master f ON f.style_number = d.style_number AND f.size_description = d.size_description
        WHERE f.shahi_confirmed_gross_price IS NOT NULL  GROUP BY d.po_and_line`;

        const data = await this.dpomRepository.query(query)
        if (data.length) {
            return new CommonResponseModel(true, 1, 'data retrived', data)
        } else {
            return new CommonResponseModel(false, 0, 'error')
        }
    }

    async getPriceDiffStyleNumber(): Promise<CommonResponseModel> {
        const query = `SELECT DISTINCT d.id,d.style_number as styleNumber,f.shahi_confirmed_gross_price_currency_code as shahiCurrencyCode FROM dpom d
        LEFT JOIN fob_master f ON f.style_number = d.style_number AND f.size_description = d.size_description
        WHERE f.shahi_confirmed_gross_price IS NOT NULL  GROUP BY d.style_number`;

        const data = await this.dpomRepository.query(query)
        if (data.length) {
            return new CommonResponseModel(true, 1, 'data retrived', data)
        } else {
            return new CommonResponseModel(false, 0, 'error')
        }
    }

    async getPriceDiffSizeDescription(): Promise<CommonResponseModel> {
        const query = `SELECT DISTINCT d.id,d.size_description AS sizeDescription FROM dpom d
        LEFT JOIN fob_master f ON f.style_number = d.style_number AND f.size_description = d.size_description
        WHERE f.shahi_confirmed_gross_price IS NOT NULL  GROUP BY d.size_description`;

        const data = await this.dpomRepository.query(query)
        if (data.length) {
            return new CommonResponseModel(true, 1, 'data retrived', data)
        } else {
            return new CommonResponseModel(false, 0, 'error')
        }
    }

    async getPdfFileInfo(): Promise<CommonResponseModel> {
        const manager = this.dataSource
        const pdfInfoQry = `select * from pdf_file_data`;
        const pdfInfo = await manager.query(pdfInfoQry)
        if (pdfInfo.length > 0) {
            return new CommonResponseModel(true, 1, 'data retrived', pdfInfo)
        } else {
            return new CommonResponseModel(false, 0, 'No data')
        }
    }

    async getPpmPoNumberForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPoforfactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPppoNumberForMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPoNumberforMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    // ------------------------------------------------------------------------------------------------------
    async getPpmDocTypeMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmDocTypeForMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmPoLineItemNumberMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmPoLineItemNumberForMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmStyleNumberMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmStyleNumberForMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmPlanningSeasonCodeMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmplanningSeasonCodeForMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmPlanningSeasonYearMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmplanningSeasonYearForMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmdesGeoCodeMarketing(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmGeoCodeMarketing()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getDpomSyncDetails(): Promise<CommonResponseModel> {
        const query = 'SELECT COUNT(*) AS totalRecords,(SELECT COUNT(*) FROM dpom WHERE DATE(created_at)=DATE(NOW())) AS todayrecords ,COUNT(*)-(SELECT COUNT(*) FROM `dpom` WHERE DATE(created_at)=DATE(NOW())) AS oldRecords FROM dpom '
        const result = await this.dpomRepository.query(query)
        if (result) {
            return new CommonResponseModel(true, 1, 'data retrived Sucessfully', result)
        } else {
            return new CommonResponseModel(false, 0, 'no data found ', [])
        }
    }

    async getTotalItemQtyChangeData(req?: nikeFilterRequest): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getTotalItemQtyChangeData(req)
        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'data not found')
        }
        const sizeDateMap = new Map<string, TotalQuantityChangeModel>();
        for (const rec of data) {
            if (!sizeDateMap.has(rec.po_number)) {
                sizeDateMap.set(
                    rec.po_number,
                    new TotalQuantityChangeModel(rec.po_number, rec.po_line_item_number, rec.po_and_line, rec.schedule_line_item_number, rec.document_date, rec.created_at, rec.item, rec.factory, rec.styleNumber, rec.productCode, rec.color_desc, rec.OGAC, rec.GAC, rec.desCtry, rec.item_text, rec.total_item_qty, [])
                )
            }
            const sizeWiseData = sizeDateMap.get(rec.po_number).sizeWiseData;
            if (rec.size_description !== null) {
                sizeWiseData.push(new PoChangeSizeModel(rec.size_description, rec.old_val, rec.new_val, rec.Diff))
            }
        }
        const dataModelArray: TotalQuantityChangeModel[] = Array.from(sizeDateMap.values());
        return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    }

    async getChangeComparision(req: any): Promise<CommonResponseModel> {
        const poNumber = req.poNumber;
        const data = await this.dpomRepository.getChangeSData(poNumber);
        if (data.length === 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        }
        const poAndLineMap = new Map<string, ChangePoandLineModel>();
        for (const rec of data) {
            const poAndLine = rec.po_and_line;

            if (!poAndLineMap.has(poAndLine)) {
                poAndLineMap.set(poAndLine, new ChangePoandLineModel(
                    rec.purchaseOrderNumber,
                    poAndLine,
                    [],
                ));
            }
            const sizeData = poAndLineMap.get(poAndLine).sizeWiseData;
            sizeData.push(new OrderChangePoModel(rec.po_number, rec.id, rec.size_description, rec.size_qty, rec.legalPoQty, rec.gross_price_fob, rec.fob_currency_code, rec.legal_po_price, rec.legal_po_currency, poAndLine, rec.qty_difference, rec.price_change,
            ));
        }
        const dataModelArray: ChangePoandLineModel[] = Array.from(poAndLineMap.values());
        return new CommonResponseModel(true, dataModelArray.length, 'Data retrieved', dataModelArray);
    }

    async getCoLine(req?: coLineRequest): Promise<CommonResponseModel> {
        const data = await this.coLineRepository.getCoLineData(req)
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getBuyerPo(): Promise<CommonResponseModel> {
        const data = await this.coLineRepository.getBuyerPo()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getColineItem(): Promise<CommonResponseModel> {
        const data = await this.coLineRepository.getItem()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getColineOrderNo(): Promise<CommonResponseModel> {
        const data = await this.coLineRepository.getOrderNumber()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async legalPOPdfBot() {
        try {
            const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
            const page = await browser.newPage();
            // Set screen size
            await page.setViewport({ width: 1580, height: 1024 });
            // Navigate the page to a URL
            await page.goto('http://localhost:4200/#/login', {
                timeout: 100000,
                waitUntil: 'networkidle0', // Wait until there are no more network connections
            });
            await page.waitForSelector('#login-form_username');
            await page.type('#login-form_username', 'nike@gmail.com');

            await page.waitForSelector('#login-form_password');
            await page.type('#login-form_password', 'nike@shahi')
            await page.click('button.ant-btn-primary');
            // Wait for a while to see the result (you can adjust the wait time)
            setTimeout(async () => {
                await page.goto('http://localhost:4200/#/nike/pdf-upload/', {
                    timeout: 15000,
                    waitUntil: 'networkidle0', // Wait until there are no more network connections
                }).then(async () => {
                    // const filePath = 'C:/Users/saipr/Downloads/PDF PO & DIA/PDF PO & DIA/Nike-PDF PO/3503368108.pdf';
                    const directoryPath = 'D:/Nike PDF/NIKE-PDF PO';
                    console.log(directoryPath)
                    // Specify the source and destination directories
                    const sourceDirectory = 'D:/Nike PDF/NIKE-PDF PO';
                    const destinationDirectory = 'D:/Nike PDF/PO PDF-READ';
                    const files = fs.readdirSync(directoryPath)
                    for (const file of files) {
                        await page.waitForSelector('input[type="file"]');
                        const fileInput = await page.$('input[type="file"]');
                        // Get the full path of the file
                        const filePath = path.join(directoryPath, file);
                        // Set the file path to be uploaded
                        await fileInput.uploadFile(filePath);
                        // await input.uploadFile(filePath);
                        await page.waitForTimeout(5000)
                        // Submit the form if needed
                        await page.waitForSelector('button.ant-btn-primary')
                        await page.click('button.ant-btn-primary');
                        // Check the status after submission
                        // const reset = await page.waitForSelector('//*[@id="root"]/section/section/main/div/div[2]/div/div[2]/div/div/div/button')
                        // if (reset) {
                        //     await page.click('//*[@id="root"]/section/section/main/div/div[2]/div/div[2]/div/div/div/button')
                        // } else {
                        const sourceFilePath = path.join(sourceDirectory, file);
                        const destinationFilePath = path.join(destinationDirectory, file);
                        fs.rename(sourceFilePath, destinationFilePath, (err) => {
                            if (err) {
                                return new CommonResponseModel(false, 0, '')
                            }
                        });
                        // }
                    }
                });
            }, 10000);
            return new CommonResponseModel(true, 1, 'All PDFs submittedd successfully')
        } catch (error) {
            return new CommonResponseModel(false, 0, error)
        }
    }

    async diaPdfBot() {
        try {
            const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
            const page = await browser.newPage();
            // Set screen size
            await page.setViewport({ width: 1580, height: 1024 });
            // Navigate the page to a URL
            await page.goto('http://localhost:4200/#/login', {
                timeout: 100000,
                waitUntil: 'networkidle0', // Wait until there are no more network connections
            });
            await page.waitForSelector('#login-form_username');
            await page.type('#login-form_username', 'nike@gmail.com');

            await page.waitForSelector('#login-form_password');
            await page.type('#login-form_password', 'nike@shahi')
            await page.click('button.ant-btn-primary');
            // Wait for a while to see the result (you can adjust the wait time)
            setTimeout(async () => {
                await page.goto('http://localhost:4200/#/nike/pdf-upload/', {
                    timeout: 10000,
                    waitUntil: 'networkidle0', // Wait until there are no more network connections
                }).then(async () => {
                    // const filePath = 'C:/Users/saipr/Downloads/PDF PO & DIA/PDF PO & DIA/Nike-PDF PO/3503368108.pdf';
                    const directoryPath = 'D:/Nike PDF/Nike-DIA';
                    // Specify the source and destination directories
                    const sourceDirectory = 'D:/Nike PDF/Nike-DIA';
                    const destinationDirectory = 'D:/Nike PDF/DIA-Read';
                    const files = fs.readdirSync(directoryPath)
                    for (const file of files) {
                        await page.waitForSelector('input[type="file"]');
                        const fileInput = await page.$('input[type="file"]');
                        // Get the full path of the file
                        const filePath = path.join(directoryPath, file);
                        // Set the file path to be uploaded
                        await fileInput.uploadFile(filePath);
                        // await input.uploadFile(filePath);
                        await page.waitForTimeout(5000)
                        // Submit the form if needed
                        await page.waitForSelector('button.ant-btn-primary')
                        await page.click('button.ant-btn-primary');
                        // Check the status after submission
                        // const reset = await page.waitForSelector('button.ant-btn-default')
                        // if (reset) {
                        //     await page.click('button.ant-btn-default')
                        // } else {
                        const sourceFilePath = path.join(sourceDirectory, file);
                        const destinationFilePath = path.join(destinationDirectory, file);
                        fs.rename(sourceFilePath, destinationFilePath, (err) => {
                            if (err) {
                                return new CommonResponseModel(false, 0, '')
                            }
                        });
                        // }
                    }
                });
            }, 4000);
            return new CommonResponseModel(true, 1, 'All PDFs submittedd successfully')
        } catch (error) {
            return new CommonResponseModel(false, 0, error)
        }
    }


    async getPpmDocTypeForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmDocTypeForFactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmdesGeoCodeFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmGeoCodeFactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmPoLineNumberForFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmPoLineItemNumberForFactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }
    async getPpmStyleNumberFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmStyleNumberForFactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getStyleNumberForOrderCreation(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getStyleNumberForOrderCreation()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmPlanningSeasonCodeFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmplanningSeasonCodeForFactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getPpmPlanningSeasonYearFactory(): Promise<CommonResponseModel> {
        const data = await this.dpomRepository.getPpmplanningSeasonYearForFactory()
        if (data.length > 0)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async updateCOLineStatus(req: any): Promise<CommonResponseModel> {
        const update = await this.dpomRepository.update({
            purchaseOrderNumber: req.poNumber, poLineItemNumber: req.poLineItemNumber
        }, {
            coLineStatus: req.status
        })
        if (update.affected) {
            return new CommonResponseModel(true, 1, 'Success')
        } else {
            return new CommonResponseModel(false, 0, 'Failed')
        }
    }

    async downloadPPMReportExcel(req?: PpmDateFilterRequest) {
        const res = await this.getPPMData(req)
        const workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet('Sheet1');
        if (res.data.length > 0) {
            // Assuming the keys of the first object represent column headers
            const { data } = res
            const headers = Object.keys(data[0]);

            // Add headers to the worksheet
            sheet.addRow(headers);

            // Add data to the worksheet
            data.forEach(item => {
                const row = [];
                headers.forEach(header => {
                    row.push(item[header] ? item[header] : "");
                });
                sheet.addRow(row);
            });
            const fileName = `data_${Date.now()}.xlsx`;
            const filePath = `./${fileName}`; // Specify your desired file path

            // Write the workbook to a file
            await workbook.xlsx.writeFile(filePath);

            return filePath;

        }

    }


    // async updateItemNo(req: ItemNoDtos): Promise<CommonResponseModel> {
    //     console.log(req,"reqq")
    //     try {
    //         const update=await this.coLineRepository.update({
    //             where:{{id:req.id}{itemNo:req.itemNo}}
    //         })
    //     //   const update = await this.coLineRepository.save(entities);
    //       if (update) {
    //         return new CommonResponseModel(true, 1, "ItemNo Update SucessFully");
    //       } else {
    //         return new CommonResponseModel(false, 0, "Item No Something went wrong", []);
    //       }
    //     } catch (error) {
    //       return error;
    //     }
    //   }

    async updateItemNo(req: ItemNoDtos): Promise<CommonResponseModel> {
        console.log(req, "reqq");
        try {
            const update = await this.coLineRepository.update(
                { id: Number(req.id) },
                { itemNo: req.itemNo }
            );

            if (update) {
                return new CommonResponseModel(true, 1, "ItemNo Update Successfully");
            } else {
                return new CommonResponseModel(false, 0, "Item No: Something went wrong", []);
            }
        } catch (error) {
            return new CommonResponseModel(false, 0, "Error occurred while updating ItemNo", error);
        }
    }


    async deleteCoLine(req: ItemNoDtos): Promise<CommonResponseModel> {
        console.log(req, "reqq");
        try {
            const deletedItem = await this.coLineRepository.delete({ id: Number(req.id) });

            if (deletedItem && deletedItem.affected) {
                return new CommonResponseModel(true, 1, "ItemNo Deleted Successfully");
            } else {
                return new CommonResponseModel(false, 0, "Item No: Something went wrong", []);
            }
        } catch (error) {
            return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
        }
    }


}



