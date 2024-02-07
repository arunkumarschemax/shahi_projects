import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CentricEntity } from "./entity/centric.entity";
import { CentricDto } from "./dto/centric.dto";
import { CentricOrderDataModel, CentricSizeWiseModel, CoLineRequest, CoLinereqModel, Color, CommonResponseModel, CompareModel, DestinationModel, PoOrderFilter, SizeModel, StatusEnum, centricCoLineRequest } from "@project-management-system/shared-models";
import { Repository } from "typeorm/repository/Repository";
import { CentricRepository } from "./repositories/centric.repo";
import { DataSource } from "typeorm/data-source/DataSource";
import { PdfFileUploadRepository } from "../ralph-lauren/repositories/pdf-file.repo";
import { PdfFileUploadEntity } from "../ralph-lauren/entities/pdf-file-upload.entity";
import { CentricPdfFileUploadEntity } from "./entity/centric-pdf-file.entity";
import { CentricPdfRepository } from "./repositories/pdf-repo";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { CentricCOLineEntity } from "./entity/centric-co-line.entity";
import { CentricCOLineRepository } from "./repositories/centric-co-line.repository";
const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
const moment = require('moment');
import { Cron, CronExpression, Interval } from "@nestjs/schedule";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";
import { AddressService } from "../Entites@Shahi/address/address-service";
import { In } from "typeorm";
import { CentricChildEntity } from "./entity/centric-child.entity";
import { CentricOrdersChildRepository } from "./repositories/centric-child.repo";
import { ItemNoDtos } from "./dto/co-item.dto";


@Injectable()
export class CentricService {

  constructor(
    private Repo: CentricRepository,
    private dataSource: DataSource,
    private pdfRepo: CentricPdfRepository,
    private coLineRepo: CentricCOLineRepository,
    private addressService: AddressService,
    private childrepo: CentricOrdersChildRepository

  ) { }

  async saveCentricOrder(req: any): Promise<CommonResponseModel> {
    // const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      // await transactionManager.startTransaction()
      for (const item of req.CentricpoItemDetails) {
        const match = item.poLine.match(/\d+/);
        // Check if a match is found and convert it to an integer
        // const poLine = match ? parseInt(match[0], 10) : null;
        const poLine = match


        for (const variant of item.CentricpoItemVariantDetails) {
          const orderData = await this.Repo.findOne({ where: { poNumber: req.poNumber, poLine: poLine, size: variant.size } })
          const order = await this.childrepo.findOne({ where: { poNumber: req.PoNumber, poLine: poLine, size: variant.size }, order: { poVersion: 'DESC' } })
          // console.log(order,'NNNNNNNNNN')
          const entity = new CentricEntity();
          entity.poNumber = req.poNumber
          entity.shipment = req.shipment
          entity.season = req.season
          entity.portOfExport = req.portOfExport
          entity.portOfEntry = req.portOfEntry
          entity.Refrence = req.Refrence
          entity.paymentTermDescription = req.paymentTermDescription
          entity.specialInstructions = req.specialInstructions
          entity.division = req.division
          entity.incoterm = req.incoterm
          entity.shipToAdd = req.shipToAdd
          entity.manufacture = req.manufacture
          entity.poDate = req.poDate
          entity.buyerAddress = req.buyerAddress


          entity.poLine = item.poLine
          entity.material = item.material
          entity.color = item.color
          entity.gender = item.gender
          entity.shortDescription = item.shortDescription
          entity.packMethod = item.packMethod
          entity.vendorBookingFlag = item.vendorBookingFlag
          entity.ppkupc = item.ppkupc
          entity.currency = item.currency
          entity.totalQuantity = item.totalQuantity
          entity.style = item.style
          entity.poType = item.poType

          entity.size = variant.size
          entity.upc = variant.upc
          entity.label = variant.label
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice
          entity.exFactory = variant.exFactory
          entity.exPort = variant.exPort
          entity.deliveryDate = variant.deliveryDate
          entity.retialPrice = variant.retialPrice
          entity.comptMaterial = variant.comptMaterial
          entity.ratio = variant.ratio
          entity.eachPerCarton = variant.eachPerCarton

          const fileData = {
            poNumber: entity.poNumber,
            poDate: entity.poDate,
            shipment: entity.shipment,
            season: entity.season,
            portOfExport: entity.portOfExport,
            portOfEntry: entity.portOfEntry,
            Refrence: entity.Refrence,
            paymentTermDescription: entity.paymentTermDescription,
            specialInstructions: entity.specialInstructions,
            division: entity.division,
            incoterm: entity.incoterm,
            shipToAdd: entity.shipToAdd,
            manufacture: entity.manufacture,
            buyerAddress: entity.buyerAddress,

            CentricpoItemDetails: [{
              poLine: item.poLine,
              material: item.material,
              color: item.color,
              gender: item.gender,
              shortDescription: item.shortDescription,
              packMethod: item.packMethod,
              vendorBookingFlag: item.vendorBookingFlag,
              currency: item.currency,
              totalQuantity: item.totalQuantity,
              CentricpoItemVariantDetails: item.CentricpoItemVariantDetails.map(variant => ({
                size: variant.size,
                upc: variant.upc,
                label: variant.label,
                unitPrice: variant.unitPrice,
                quantity: variant.quantity,
                exFactory: variant.exFactory,
                exPort: variant.exPort,
                deliveryDate: variant.deliveryDate,
                retialPrice: variant.retialPrice,
              }))
            }]
          };

          // entity.fileData = JSON.stringify(fileData);

          if (orderData) {
            // console.log('mmmmmmmm',orderData)

            const update = await this.Repo.update({ poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, {

              shipment: req.shipment,
              season: req.season,
              portOfExport: req.portOfExport,
              portOfEntry: req.portOfEntry,
              Refrence: req.Refrence,
              paymentTermDescription: req.paymentTermDescription,
              specialInstructions: req.specialInstructions,
              division: req.division,
              incoterm: req.incoterm,
              shipToAdd: req.shipToAdd,
              manufacture: req.manufacture,
              poDate: req.poDate,
              buyerAddress: req.buyerAddress,


              material: item.material,
              color: item.color,
              gender: item.gender,
              shortDescription: item.shortDescription,
              packMethod: item.packMethod,
              vendorBookingFlag: item.vendorBookingFlag,
              ppkupc: item.ppkupc,
              currency: item.currency,
              totalQuantity: item.totalQuantity,
              style: item.style,

              upc: variant.upc,
              label: variant.label,
              quantity: variant.quantity,
              unitPrice: variant.unitPrice,
              exFactory: variant.exFactory,
              exPort: variant.exPort,
              deliveryDate: variant.deliveryDate,
              retialPrice: variant.retialPrice,
              comptMaterial: variant.comptMaterial,
              ratio: variant.ratio,
              eachPerCarton: variant.eachPerCarton,

            })
            let po = parseInt(order?.poVersion) + 1

            // console.log(po,',,,,,,')
            const entitys = new CentricChildEntity();
            entitys.poNumber = req.poNumber
            entitys.shipment = req.shipment
            entitys.season = req.season
            entitys.portOfExport = req.portOfExport
            entitys.portOfEntry = req.portOfEntry
            entitys.Refrence = req.Refrence
            entitys.paymentTermDescription = req.paymentTermDescription
            entitys.specialInstructions = req.specialInstructions
            entitys.division = req.division
            entitys.incoterm = req.incoterm
            entitys.shipToAdd = req.shipToAdd
            entitys.manufacture = req.manufacture
            entitys.poDate = req.poDate
            entitys.buyerAddress = req.buyerAddress


            entitys.poLine = item.poLine
            entitys.material = item.material
            entitys.color = item.color
            entitys.gender = item.gender
            entitys.shortDescription = item.shortDescription
            entitys.packMethod = item.packMethod
            entitys.vendorBookingFlag = item.vendorBookingFlag
            entitys.ppkupc = item.ppkupc
            entitys.currency = item.currency
            entitys.totalQuantity = item.totalQuantity
            entitys.style = item.style
            entitys.poType = item.poType

            entitys.size = variant.size
            entitys.upc = variant.upc
            entitys.label = variant.label
            entitys.quantity = variant.quantity
            entitys.unitPrice = variant.unitPrice
            entitys.exFactory = variant.exFactory
            entitys.exPort = variant.exPort
            entitys.deliveryDate = variant.deliveryDate
            entitys.retialPrice = variant.retialPrice
            entitys.comptMaterial = variant.comptMaterial
            entitys.ratio = variant.ratio
            entitys.eachPerCarton = variant.eachPerCarton
            entitys.orderId = orderData.id

            entitys.poVersion = po.toString()
            const savedChild = await this.childrepo.save(entitys)

            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.Repo.save(entity)
            const entitys = new CentricChildEntity();
            entitys.poNumber = req.poNumber
            entitys.shipment = req.shipment
            entitys.season = req.season
            entitys.portOfExport = req.portOfExport
            entitys.portOfEntry = req.portOfEntry
            entitys.Refrence = req.Refrence
            entitys.paymentTermDescription = req.paymentTermDescription
            entitys.specialInstructions = req.specialInstructions
            entitys.division = req.division
            entitys.incoterm = req.incoterm
            entitys.shipToAdd = req.shipToAdd
            entitys.manufacture = req.manufacture
            entitys.poDate = req.poDate
            entitys.buyerAddress = req.buyerAddress


            entitys.poLine = item.poLine
            entitys.material = item.material
            entitys.color = item.color
            entitys.gender = item.gender
            entitys.shortDescription = item.shortDescription
            entitys.packMethod = item.packMethod
            entitys.vendorBookingFlag = item.vendorBookingFlag
            entitys.ppkupc = item.ppkupc
            entitys.currency = item.currency
            entitys.totalQuantity = item.totalQuantity
            entitys.style = item.style
            entitys.poType = item.poType

            entitys.size = variant.size
            entitys.upc = variant.upc
            entitys.label = variant.label
            entitys.quantity = variant.quantity
            entitys.unitPrice = variant.unitPrice
            entitys.exFactory = variant.exFactory
            entitys.exPort = variant.exPort
            entitys.deliveryDate = variant.deliveryDate
            entitys.retialPrice = variant.retialPrice
            entitys.comptMaterial = variant.comptMaterial
            entitys.ratio = variant.ratio
            entitys.eachPerCarton = variant.eachPerCarton
            entitys.orderId = entity.id
            const savedChild = await this.childrepo.save(entitys)


            if (!saved) {
              throw new Error('Save failed')
            }
          }
        }
      }
      // await transactionManager.completeTransaction()
      return new CommonResponseModel(true, 1, 'Data saved successfully', saved)
    } catch (err) {
      return new CommonResponseModel(false, 0, 'Failed', err)
    }
  }

  async updatePath(req: any, poNumber: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
    // const poNumberFromFileName = filename.match(/[0-9]{10}/);
    const entity = new CentricPdfFileUploadEntity();
    // entity.poNumber = poNumberFromFileName ? poNumberFromFileName[0] : '';
    entity.poNumber = poNumber;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = req;

    const save = await this.pdfRepo.save(entity);
    if (save) {
      return new CommonResponseModel(true, 1, 'Uploaded successfully', save);
    } else {
      return new CommonResponseModel(false, 0, 'Uploaded failed');
    }
  }


  // async updatePath(poNumber:string,filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
  //   console.log(poNumber,"pppppioooooo")
  //   const entity = new CentricPdfFileUploadEntity()
  //   entity.poNumber=poNumber;
  //   entity.pdfFileName = filename;
  //   entity.filePath = filePath;
  //   entity.fileType = mimetype
  //   const file = await this.pdfRepo.findOne({ where: { pdfFileName: filePath } })
  //   if (file) {
  //     return new CommonResponseModel(false, 0, 'File with same name already uploaded');
  //   } else {
  //     const save = await this.pdfRepo.save(entity)
  //     if (save) {
  //       return new CommonResponseModel(true, 1, 'uploaded successfully', save);
  //     }
  //     else {
  //       return new CommonResponseModel(false, 0, 'uploaded failed');
  //     }
  //   }
  // }

  async getPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.Repo.getDistinctPoNumbers()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async getPoLineNumbers(req: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const data = await this.Repo.getPoLineNumbers(req);
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }


  async getorderData(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.Repo.getorderData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No Data found');
      }
      const sizeDateMap = new Map<string, CentricOrderDataModel>();
      for (const rec of details) {
        // console.log(rec,"rrrrrrrrr")
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number}`,
            new CentricOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc, rec.status, rec.currency, "", rec.buyer_address)
          );

          // console.log(sizeDateMap,)
        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new CentricSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.special_instructions, rec.upc, rec.retial_price, rec.color, rec.ratio, rec.ppk_upc, rec.label, rec.exfactory, rec.export, rec.delivery_date, rec.currency));
        }
      }
      const dataModelArray: CentricOrderDataModel[] = Array.from(sizeDateMap.values());
      // console.log(dataModelArray,"kkkk")
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
      // return new CommonResponseModel(true, 1, 'data retrieved', details);
    } catch (e) {
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async getPdfFileInfo(req?: any): Promise<CommonResponseModel> {
    try {
      const data = await this.pdfRepo.getPdfFileInfo(req)
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      return new CommonResponseModel(false, 0, err)
    }
  }

  async coLineCreationReq(req: any): Promise<CommonResponseModel> {
    try {
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      const records = await this.Repo.find({ where: { poNumber: req.poNumber, deliveryDate: req.deliveryDate, style: req.style } });
      const uniquePoLines = [...new Set(records.map((rec) => rec.poLine))];
      const uniqueMaterials = [...new Set(records.map((rec) => rec.material))];
      const empty = [];
      const entity = new CentricCOLineEntity()
      entity.buyer = req.buyer
      entity.poNumber = req.poNumber;
      entity.poLine = uniquePoLines.join(',');
      entity.itemNo = req?.itemNo;
      entity.status = 'Open';
      entity.deliveryDate = req.deliveryDate;
      entity.style = req.style
      entity.material = uniqueMaterials.join(',')
      entity.createdUser = req.createdUser;
      empty.push(entity)
      const save = await this.coLineRepo.save(empty);

      if (save) {
        const update = await this.Repo.update(
          { poNumber: req.poNumber, deliveryDate: req.deliveryDate, style: req.style }, // Conditions for updating
          { status: StatusEnum.INPROGRESS } // Data to update
        );
        return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
      } else {
        return new CommonResponseModel(false, 0, 'CO-Line request failed')
      }
    } catch (err) {
      return new CommonResponseModel(false, 0, 'CO-Line request failed', err)
    }
  }

  // @Cron('*/5 * * * *')
  async createCOline(req: any): Promise<CommonResponseModel> {
    const po = await this.coLineRepo.getDataforCOLineCreation();
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
      // for (const po of poDetails) {
      console.log(po)
      const coLine = new CoLineRequest();
      let buyerValue1;
      let buyerValue2;
      let agent;
      let buyerAddress;
      let deliveryAddress;
      let pkgTerms;
      let paymentTerms;
      let styleNo;
      if (po.buyer === 'Centric') {
        const response = await this.getOrderdataForCOline({ poNumber: po.po_number, poLine: po.po_line })
        console.log(response.data[0])
        const coData = response.data[0];
        coLine.buyerPo = coData.buyerPo;
        const inputDate = new Date(coData.deliveryDate)
        // Calculate the date 7 days before the GAC date
        const sevenDaysBefore = new Date(inputDate);
        sevenDaysBefore.setDate(inputDate.getDate() - 7);
        const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBefore);
        coLine.deliveryDate = moment(coData.deliveryDate).format("DD/MM/YYYY")
        coLine.exFactoryDate = exFactoryDate
        coLine.salesPrice = coData.salesPrice
        coLine.currency = coData.currency
        coLine.destinations = coData.destinations
        const request = coData.destinations[0]?.name;
        console.log(request, "request")
        const address = await this.addressService.getAddressInfoByCountry({ country: request });
        const addressData = address.data[0];
        console.log(addressData, "address")
        styleNo = coData.styleNo
        buyerAddress = addressData?.buyerCode ? addressData?.buyerCode : 12;
        deliveryAddress = addressData?.deliveryCode
        buyerValue1 = "FIN-FINISHED GOODS - KY"
        buyerValue2 = "CEN00002-CENTRIC BRANDS LLC"
        agent = "NA-DIRECT CUSTOMER"
        pkgTerms = "BOX-BOXES"
        paymentTerms = "081-TT  90 Days"
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
      await driver.sleep(10000)
      await driver.wait(until.elementLocated(By.id('byr')));
      const dropdownElement2 = await driver.findElement(By.id('byr'));
      const dropdown2 = await driver.wait(until.elementIsVisible(dropdownElement2)).then(element => new Select(element))
      await dropdown2.selectByValue(buyerValue2)
      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.id('CreateOrderID')))
      await driver.sleep(3000)
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
                  let tabIndex = 1; // Default to 1 if no match
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
                  let tabIndex = 1; // Default to 1 if no match
                  if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
                    tabIndex = 2
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
                  } else {
                    const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Size found' });
                    return new CommonResponseModel(false, 0, 'NO matching Size found')
                  }
                }
                const inputId = `${size.name}:${color.name}:ASSORTED`.replace(/\*/g, '');
                const input = await driver.wait(until.elementLocated(By.id(inputId)), 10000)
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
        const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: alertText });
    
        await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})

        await alert.accept();
        await driver.sleep(5000)
        await driver.navigate().refresh();
        await driver.quit();
        return new CommonResponseModel(false, 0, alertText)

      } else {
        await driver.sleep(10000)
        await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
        const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
        const coNo = await coNoElement.getAttribute('value');
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
        const year = currentDate.getFullYear().toString().slice(-2);
        const currentDateFormatted = `${day}-${month}-${year}`;
        if (coNo) {
     

          const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
          await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.SUCCESS})

       
          // await driver.navigate().refresh();
          await driver.sleep(10000)
        } else {
     

          const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed' });
          await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})

          // await driver.navigate().refresh();
          await driver.sleep(10000)
        }
      }
      // }
      return new CommonResponseModel(true, 1, `COline created successfully`)
    } catch (error) {
      console.log(error, 'error');
      if (error.name === 'TimeoutError') {
        const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Color found' });
        await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})

        return new CommonResponseModel(false, 0, 'Matching Color not found')
      } else {
        // Handle other types of errors
        return new CommonResponseModel(false, 0, error)
      }
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

  async getCentricCoLine(req?: centricCoLineRequest): Promise<CommonResponseModel> {
    const data = await this.coLineRepo.getCentricCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }


  async getCentricorderData(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.Repo.getCentricorderData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
      }
      const sizeDateMap = new Map<string, CentricOrderDataModel>();
      for (const rec of details) {
        // console.log(rec,"rrrrrrrrr")
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number}`,
            new CentricOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc, rec.status, "", rec.style, rec.buyer_address)
          );
          // console.log(sizeDateMap,)
        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new CentricSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.special_instructions, rec.upc, rec.retial_price, rec.color, rec.ratio, rec.ppk_upc, rec.label, rec.exfactory, rec.export, rec.delivery_date));
        }
      }
      const dataModelArray: CentricOrderDataModel[] = Array.from(sizeDateMap.values());
      // console.log(dataModelArray,"kkkk")
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
      // return new CommonResponseModel(true, 1, 'data retrieved', details);


    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  //  @Interval(20000)
  // async handleAutomaticCron() {
  //   try {
  //     await this.centricBot();
  //   } catch (error) {
  //     console.error('Error', error);
  //   }
  // }

  // @Cron(CronExpression.EVERY_10_MINUTES)
  async centricBot() {
    try {
      const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });

      const page = await browser.newPage();
      await page.setViewport({ width: 1580, height: 900 });

      setTimeout(async () => {
        await page.goto('http://localhost:4200/', {
          timeout: 100000,
          waitUntil: 'networkidle0',
        })
      }, 1000);

      await page.waitForSelector('#login-form_username');
      await page.type('#login-form_username', 'centriclzod@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'centriclzod');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      setTimeout(async () => {
        await page.goto('http://localhost:4200/#/centric/centric-pdf-upload/', {
          timeout: 100000,
          waitUntil: 'networkidle0'
        })
      }, 1000);

      const directoryPath = 'F:/centric-buyers-unread-files/';
      const destinationDirectory = 'F:/centric-buyers-read-files/';

      const files = fs.readdirSync(directoryPath);
      if (files.length === 0) {

        return new CommonResponseModel(false, 0, "No Files Found")
      }
      for (const file of files) {
        await page.waitForSelector('input[type="file"]');
        const fileInput = await page.$('input[type="file"]');
        const filePath = path.join(directoryPath, file);
        await fileInput.uploadFile(filePath);
        await page.waitForTimeout(3000);

        await page.waitForSelector('button.ant-btn-primary')
        await page.click('button.ant-btn-primary');
        await page.waitForTimeout(16000)

        const sourceFilePath = path.join(directoryPath, file);
        const destinationFilePath = path.join(destinationDirectory, file);
        fs.rename(sourceFilePath, destinationFilePath, async (err) => {
          if (err) {
            return new CommonResponseModel(false, 0, '');
          }
        })
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }

  async getItem(): Promise<CommonResponseModel> {
    try {
      const data = await this.coLineRepo.getItem()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async getCoPoNumber(): Promise<CommonResponseModel> {
    const data = await this.coLineRepo.getCoPoNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }


  async getOrderdataForCOline(req: OrderDetailsReq): Promise<CommonResponseModel> {
    try {
      const poLineValues = req.poLine.split(',')
      const data = await this.Repo.find({ where: { poNumber: req.poNumber, poLine: In(poLineValues) } })
      let destinationMap = new Map<string, DestinationModel>();
      // po -> destination -> color -> sizes
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, CentricEntity>();
      data.forEach(rec => {
        poMap.set(`${rec.poNumber}`, rec)
        const parts = rec.shipToAdd.split(',')
        const destAdd = parts[2].trim();
        const dest = destAdd;

        if (!destinationColSizesMap.has(`${rec.poNumber}`)) {
          destinationColSizesMap.set(`${rec.poNumber}`, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(`${rec.poNumber}`).has(dest)) {
          destinationColSizesMap.get(`${rec.poNumber}`).set(dest, new Map<string, []>());
        }
        if (!destinationColSizesMap.get(`${rec.poNumber}`).get(dest).has(rec.color)) {
          destinationColSizesMap.get(`${rec.poNumber}`).get(dest).set(rec.color, []);
        }
        const sizesMap = destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(rec.color)

        // Check if the color and size already exist
        const existingSize = sizesMap.find((sizeObj) => sizeObj.size === rec.size);

        if (existingSize) {
          // If the color and size exist, update the quantity
          existingSize.quantity = (parseInt(existingSize.quantity.replace(/,/g, '')) + parseInt(rec.quantity.replace(/,/g, ''))).toString();
        } else {
          // If the color exists but not the size, add a new size
          sizesMap.push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
        }
      });

      const coData = []
      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = []
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = []
          colorSizes.forEach((sizes, color) => {
            const sizeArray = []
            sizes.forEach((size) => {
              const sizeObj = new SizeModel(size.size, size.quantity, size.price);
              sizeArray.push(sizeObj)
            })
            const col = new Color(color, sizeArray);
            ColArray.push(col)
          });
          const des = new DestinationModel(dest, ColArray);
          desArray.push(des)
        });
        const poInfo = poMap.get(poNumber)
        const co = new CoLinereqModel(poInfo.poNumber, null, poInfo.unitPrice, poInfo.currency, poInfo.deliveryDate, poInfo.style, desArray);
        coData.push(co)
      });
      if (coData) {
        return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', coData);
      } else {
        return new CommonResponseModel(false, 0, 'No data found');
      }
    } catch (err) {
      throw err
    }
  }

  async getseasonData(): Promise<CommonResponseModel> {
    try {
      const data = await this.Repo.getDistinctSeasons()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }


  // async getCentricorderDataForPPK(req?: PoOrderFilter): Promise<CommonResponseModel> {
  //   try {
  //     const details = await this.Repo.getCentricorderDataForPPK(req);
  //     if (details.length === 0) {
  //       return new CommonResponseModel(false, 0, 'No Data found');
  //     }
  //     const sizeDateMap = new Map<string, CentricOrderDataModel>();
  //     for (const rec of details) {
  //       // console.log(rec,"rrrrrrrrr")
  //       if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
  //         sizeDateMap.set(
  //           `${rec.po_line},${rec.po_number}`,
  //           new CentricOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc, rec.status, rec.currency)
  //         );

  //         // console.log(sizeDateMap,)
  //       }
  //       const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number}`).sizeWiseData;
  //       if (rec.size !== null) {
  //         sizeWiseData.push(new CentricSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.special_instructions, rec.upc, rec.retial_price, rec.color, rec.ratio, rec.ppk_upc, rec.label, rec.exfactory, rec.export, rec.delivery_date, rec.currency));
  //       }
  //     }
  //     const dataModelArray: CentricOrderDataModel[] = Array.from(sizeDateMap.values());
  //     // console.log(dataModelArray,"kkkk")
  //     return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
  //     // return new CommonResponseModel(true, 1, 'data retrieved', details);
  //   } catch (e) {
  //     return new CommonResponseModel(false, 0, 'failed', e);
  //   }
  // }
  async getCentricorderDataForPPK(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.Repo.getCentricOrderDataForPPK(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No Data found');
      } else {

        return new CommonResponseModel(true, 1, 'data retrieved', details);

      }
    } catch (e) {
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }
  async getCentricorderDataForScanAndPack(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.Repo.getCentricorderDataForScanAndPack(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No Data found');
      } else {
        return new CommonResponseModel(true, 1, 'data retrieved', details);
      }

    } catch (e) {
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }



  // async getCentricorderDataForSolidPO(req?: PoOrderFilter): Promise<CommonResponseModel> {
  //   try {
  //     const details = await this.Repo.getCentricorderDataForSolidPO(req);
  //     if (details.length === 0) {
  //       return new CommonResponseModel(false, 0, 'No Data found');
  //     }
  //     const sizeDateMap = new Map<string, CentricOrderDataModel>();
  //     for (const rec of details) {
  //       // console.log(rec,"rrrrrrrrr")
  //       if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
  //         sizeDateMap.set(
  //           `${rec.po_line},${rec.po_number}`,
  //           new CentricOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc, rec.status, rec.currency)
  //         );

  //         // console.log(sizeDateMap,)
  //       }
  //       const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number}`).sizeWiseData;
  //       if (rec.size !== null) {
  //         sizeWiseData.push(new CentricSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.special_instructions, rec.upc, rec.retial_price, rec.color, rec.ratio, rec.ppk_upc, rec.label, rec.exfactory, rec.export, rec.delivery_date, rec.currency));
  //       }
  //     }
  //     const dataModelArray: CentricOrderDataModel[] = Array.from(sizeDateMap.values());
  //     // console.log(dataModelArray,"kkkk")
  //     return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
  //     // return new CommonResponseModel(true, 1, 'data retrieved', details);
  //   } catch (e) {
  //     return new CommonResponseModel(false, 0, 'failed', e);
  //   }
  // }

  async getCentricorderDataForSolidPO(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.Repo.getCentricOrderDataForSolidPO(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No Data found');
      } else {
        return new CommonResponseModel(true, 1, 'data retrieved', details);
      }

    } catch (e) {
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }

  async getPoNumberforPPKReport(): Promise<CommonResponseModel> {
    try {
      const data = await this.Repo.getPoNumberforPPKReport()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async getPoNumberforSolidReport(): Promise<CommonResponseModel> {
    try {
      const data = await this.Repo.getPoNumberforSolidReport()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async getordercomparationData(req?: any): Promise<CommonResponseModel> {
    try {
      const Originaldata = await this.Repo.getordercomparationData(req)
      const compareModel: CompareModel[] = []

      for (const rec of Originaldata) {
        const childData = await this.childrepo.find({
          where: {
            poNumber: rec.po_number, poLine: rec.po_line, size: rec.size
          }, order: { ordersChildId: 'DESC' }, take: 1, skip: 1
        })
        if (childData.length > 0) {
          const oldData = childData[0];
          // Check for changes in values
          if (
            oldData.unitPrice !== rec.unit_price ||
            oldData.deliveryDate !== rec.delivery_date ||
            oldData.quantity !== rec.quantity
          ) {
            // Only push if there are changes
            compareModel.push(new
              CompareModel(
                rec.po_number,
                rec.po_line,
                rec.size,
                oldData.unitPrice,
                rec.unit_price,
                oldData.deliveryDate,
                rec.delivery_date,
                oldData.quantity,
                rec.quantity
              ));
          }
        }
      }
      if (compareModel) {

        return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', compareModel);
      } else {
        return new CommonResponseModel(false, 0, 'No data found');
      }
    } catch (err) {
      throw err
    }
  }


  async updateItemNo(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const update = await this.coLineRepo.update(
        { id: Number(req.id) },
        { poNumber: req.poNumber, itemNo: req.itemNo }
      );

      if (update) {
        return new CommonResponseModel(true, 1, " Update Successfully");
      } else {
        return new CommonResponseModel(false, 0, " Something Went Wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error Occurred ", error);
    }
  }


  async deleteCoLine(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const deletedItem = await this.coLineRepo.delete({ id: Number(req.id) });

      if (deletedItem && deletedItem.affected) {
        return new CommonResponseModel(true, 1, " Deleted Successfully");
      } else {
        return new CommonResponseModel(false, 0, " Something Went Wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error Occurred", error);
    }
  }


async updateCOLineStatus(req: any): Promise<CommonResponseModel> {
  console.log(req, "reqqqqqqqponumnbbb");
  try {
      const poLines = req.poLine.split(","); // Split poLine string into an array

      // Iterate over each poLine and update its status
      for (const poLine of poLines) {
          await this.Repo.update(
              { poNumber: req.poNumber, poLine: poLine.trim() }, // Trim to remove any extra spaces
              { status: req.status }
          );
      }

      return new CommonResponseModel(true, 1, 'Success'); // Return success response with the number of lines updated
  } catch (error) {
      console.error("Error updating CO line status:", error);
      return new CommonResponseModel(false, 0, 'Failed');
  }
}











}