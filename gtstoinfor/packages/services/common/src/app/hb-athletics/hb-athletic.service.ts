import { Injectable } from "@nestjs/common";
import { HbOrdersRepository } from "./repositories/hb-orders.repo";
import { HbPdfRepo } from "./repositories/hb-pdf.repo";
import { CoLineRequest, CoLinereqModel, Color, CommonResponseModel, DestinationModel, HBCoLinereqModels, HBDestinationModel, HBSizeModel, HbCompareModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SizeModel, StatusEnum, hbCoLineRequest } from "@project-management-system/shared-models";
import { HbOrdersEntity } from "./entity/hb-orders.entity";
import { HbPdfFileInfoEntity } from "./entity/hb-pdf.entity";
import { HbCOLineEntity } from "./entity/hb-co-line.entity";
import { HbCOLineRepository } from "./repositories/hb-co-line.repository";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { AddressService } from "../Entites@Shahi/address/address-service";
const moment = require('moment');
const { Builder, Browser, By, Select, until } = require('selenium-webdriver');

import { HbOrdersChildRepository } from "./repositories/hb-order-child.repo";
import { HbOrdersChildEntity } from "./entity/hb-orders-child.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource } from "typeorm";

@Injectable()
export class HbService {


  constructor(
    private HbOrdersRepo: HbOrdersRepository,
    private HbPdfRepo: HbPdfRepo,
    private hbCoLineRepo: HbCOLineRepository,
    private addressService: AddressService,
    private HbOrdersChildRepo: HbOrdersChildRepository,
    private dataSource: DataSource


  ) { }


  async saveHbOrdersData(req: any): Promise<CommonResponseModel> {
    // console.log(req, "reqqqqqqqqqqqqq")
    const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      const pdfData = [];
      await transactionManager.startTransaction()
      for (const item of req.HbpoItemDetails) {
        const match = item.color.match(/\d+/);
        // console.log(match, "match");
        // console.log(item, "item");
        const color = match

        console.log(color, "color")
        for (const variant of item.HbpoItemVariantDetails) {
          const orderData = await this.HbOrdersRepo.findOne({ where: { custPo: req.custPo, color: item.color, size: variant.size } })
          const order = await this.HbOrdersChildRepo.findOne({ where: { custPo: req.custPo, color: item.color, size: variant.size }, order: { poVersion: 'DESC' } })
          // console.log(orderData, "orderData")
          // console.log(variant, "variant");
          // console.log(order, "order");

          const entity = new HbOrdersEntity();
          entity.custPo = req.custPo
          entity.exitFactoryDate = req.exitFactoryDate
          entity.shipToAdd = req.shipToAdd
          entity.style = item.style
          entity.color = item.color
          entity.size = variant.size
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice

          pdfData.push(entity)


          if (orderData) {


            const update = await transactionManager.getRepository(HbOrdersEntity).update({ custPo: req.custPo, color: item.color, size: variant.size }, { exitFactoryDate: req.exitFactoryDate, shipToAdd: req.shipToAdd, style: item.style, quantity: variant.quantity, unitPrice: variant.unitPrice })

            let po = (order?.poVersion) + 1

            const entitys = new HbOrdersChildEntity()
            entitys.custPo = req.custPo
            entitys.exitFactoryDate = req.exitFactoryDate
            entitys.shipToAdd = req.shipToAdd
            entitys.style = item.style
            entitys.color = item.color
            entitys.size = variant.size
            entitys.quantity = variant.quantity
            entitys.unitPrice = variant.unitPrice
            entitys.poVersion = po
            entitys.orderId = orderData.id

            const savedChild = await transactionManager.getRepository(HbOrdersChildEntity).save(entitys)
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await transactionManager.getRepository(HbOrdersEntity).save(pdfData)

            const entitys = new HbOrdersChildEntity()
            entitys.custPo = req.custPo
            entitys.exitFactoryDate = req.exitFactoryDate
            entitys.shipToAdd = req.shipToAdd
            entitys.style = item.style
            entitys.color = item.color
            entitys.size = variant.size
            entitys.quantity = variant.quantity
            entitys.unitPrice = variant.unitPrice
            entitys.orderId = entity.id



            const savedChild = await await transactionManager.getRepository(HbOrdersChildEntity).save(entitys)
            if (!saved) {
              throw new Error('Save failed')
            }
          }
        }
      }
      await transactionManager.completeTransaction()
      return new CommonResponseModel(true, 1, 'Data saved successfully', saved)
    } catch (err) {
      await transactionManager.releaseTransaction()
      return new CommonResponseModel(false, 0, 'Failed', err)
    }
  }



  async updatePath(req: any, custPo: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
    console.log(custPo, "pppppioooooo");
    console.log(req, "reqqqqqqqqq");

    const entity = new HbPdfFileInfoEntity();
    entity.custPo = custPo;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = req;
    entity.status = "SUCCESS";

    const file = await this.HbPdfRepo.findOne({ where: { pdfFileName: filePath } });
    if (file) {
      return new CommonResponseModel(false, 0, 'File with the same name already uploaded');
    } else {
      const save = await this.HbPdfRepo.save(entity);
      if (save) {
        return new CommonResponseModel(true, 1, 'Uploaded successfully', save);
      } else {
        return new CommonResponseModel(false, 0, 'Uploaded failed');
      }
    }
  }


  async getPdfFileInfo(): Promise<CommonResponseModel> {
    try {
      const data = await this.HbPdfRepo.getPDFInfo()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async hbAthleticBot() {
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
      await page.type('#login-form_username', 'HBAthletic@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'HBAthletic');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      setTimeout(async () => {
        await page.goto('http://localhost:4200/#/hb-athletics/hb-pdf-upload/', {
          timeout: 100000,
          waitUntil: 'networkidle0'
        })
      }, 1000);

      const directoryPath = 'D:/hb-unread/';
      const destinationDirectory = 'D:/hb-read/';

      const files = fs.readdirSync(directoryPath);
      if (files.length === 0) {

        return new CommonResponseModel(false, 0, "No Files Found")
      }
      for (const file of files) {
        await page.waitForSelector('input[type="file"]');
        const fileInput = await page.$('input[type="file"]');
        const filePath = path.join(directoryPath, file);
        await fileInput.uploadFile(filePath);
        await page.waitForTimeout(2000);

        await page.waitForSelector('button.ant-btn-primary')
        await page.click('button.ant-btn-primary');
        await page.waitForTimeout(10000)

           setTimeout(async () => {
        await page.goto('http://localhost:4200/#/hb-athletics/hb-pdf-upload/', {
          timeout: 100000,
          waitUntil: 'networkidle0'
        })
      }, 1000);

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


  async getHborderData(req?: HbPoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.HbOrdersRepo.getHborderData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
      }
      const sizeDateMap = new Map<string, HbOrderDataModel>();
      for (const rec of details) {
        // console.log(rec,"rrrrrrrrr")
        if (!sizeDateMap.has(`${rec.style},${rec.cust_po},${rec.color},${rec.exit_factory_date}`)) {
          sizeDateMap.set(
            `${rec.style},${rec.cust_po},${rec.color},${rec.exit_factory_date}`,
            new HbOrderDataModel(rec.id, rec.cust_po, rec.style, rec.color, rec.size, rec.exit_factory_date, rec.ship_to_add, [], rec.quantity, rec.unit_price, rec.status)
          );

          // console.log(sizeDateMap,)
        }
        const sizeWiseData = sizeDateMap.get(`${rec.style},${rec.cust_po},${rec.color},${rec.exit_factory_date}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new HbSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.color));
        }
      }
      const dataModelArray: HbOrderDataModel[] = Array.from(sizeDateMap.values());
      // console.log(dataModelArray,"kkkk")
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
      // return new CommonResponseModel(true, 1, 'data retrieved', details);


    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async getOrderdataForCOline(req: OrderDetailsReq): Promise<CommonResponseModel> {
    try {
      const data = await this.HbOrdersRepo.find({ where: { custPo: req.poNumber } })
      let destinationMap = new Map<string, HBDestinationModel>();
      // po -> destination -> color -> sizes
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, HbOrdersEntity>();
      data.forEach(rec => {
        poMap.set(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`, rec)
        const dest = rec.shipToAdd
        // console.log(destCountry,"hirrrrrrrrrrrrrrrrrr")

        // const parts = rec.shipToAdd.split(',')
        // const destAdd = parts[2].trim();
        // const dest = destAdd;

        // const destCountry = rec.shipToAddress.slice(-2).trim();
        // const parts = rec.shipToAddress.split(',')
        // const destAdd = parts[0].trim();
        // const dest = destAdd + ',' + destCountry;

        if (!destinationColSizesMap.has(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`)) {
          destinationColSizesMap.set(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).has(dest)) {
          destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).set(dest, new Map<string, []>());
        }
        if (!destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).get(dest).has(rec.color)) {
          destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).get(dest).set(rec.color, []);
        }
        destinationColSizesMap.get(`${rec.custPo},${rec.style},${rec.color}, ${rec.exitFactoryDate}`).get(dest).get(rec.color).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
      });
      const coData = []
      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = []
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = []
          colorSizes.forEach((sizes, color) => {
            const sizeArray = []
            sizes.forEach((size) => {
              const sizeObj = new HBSizeModel(size.size, size.quantity, size.price);
              sizeArray.push(sizeObj)
            })
            const col = new Color(color, sizeArray);
            ColArray.push(col)
          });
          const des = new HBDestinationModel(dest, ColArray);
          desArray.push(des)
        });
        const poInfo = poMap.get(poNumber)
        const co = new HBCoLinereqModels(poInfo.custPo, poInfo.style, poInfo.unitPrice, poInfo.exitFactoryDate, desArray);
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


  async getHbPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.HbOrdersRepo.getDistinctHBPoNumbers()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async hbCoLineCreationReq(req: any): Promise<CommonResponseModel> {
    try {
      // console.log(req,'req')
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      const records = await this.HbOrdersRepo.find({ where: { custPo: req.custPo, exitFactoryDate: req.exitFactoryDate } });
      const empty = [];
      for (const rec of records) {
        //console.log(rec,'reccccccccc')
        const entity = new HbCOLineEntity()
        entity.buyer = req.buyer
        entity.custPo = req.custPo;
        entity.style = rec.style;
        entity.itemNo = req?.itemNo;
        entity.status = 'Open';
        entity.exitFactoryDate = rec.exitFactoryDate;
        entity.createdUser = 'admin';
        empty.push(entity)
      }
      // console.log(empty,'emptyyyyy')
      const save = await this.hbCoLineRepo.save(empty);



      if (save) {
        const update = await this.HbOrdersRepo.update(
          { custPo: req.custPo, exitFactoryDate: req.exitFactoryDate }, // Conditions for updating
          { status: StatusEnum.INPROGRESS }
        );
        return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
      } else {
        return new CommonResponseModel(false, 0, 'CO-Line request failed')
      }
    } catch (err) {
      //  console.log(err,',,,,,,,,,,,,,,,')
      return new CommonResponseModel(false, 0, 'CO-Line request failed', err)
    }
  }

  async getHborderDataForInfo(req?: HbPoOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")
    try {
      const details = await this.HbOrdersRepo.getHborderDataForInfo(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, HbOrderDataModel>();
      for (const rec of details) {
        // console.log(rec,"rrrrrrrrr")
        if (!sizeDateMap.has(`${rec.style},${rec.cust_po},${rec.exit_factory_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.style},${rec.cust_po},${rec.exit_factory_date},${rec.color}`,
            new HbOrderDataModel(rec.id, rec.cust_po, rec.style, rec.color, rec.size, rec.exit_factory_date, rec.ship_to_add, [], rec.quantity, rec.unit_price)
          );

          // console.log(sizeDateMap,)
        }
        const sizeWiseData = sizeDateMap.get(`${rec.style},${rec.cust_po},${rec.exit_factory_date},${rec.color}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new HbSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.color));
        }
      }
      const dataModelArray: HbOrderDataModel[] = Array.from(sizeDateMap.values());
      // console.log(dataModelArray,"kkkk")
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
      // return new CommonResponseModel(true, 1, 'data retrieved', details);


    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async getHbCoLineData(req?: hbCoLineRequest): Promise<CommonResponseModel> {
    const data = await this.hbCoLineRepo.getHbCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getItem(): Promise<CommonResponseModel> {
    try {
      const data = await this.hbCoLineRepo.getItem()
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
    const data = await this.hbCoLineRepo.getCoPoNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }


  async isAlertPresent(driver) {
    try {
      await driver.switchTo().alert();
      return true;
    } catch (e) {
      return false;
    }
  }


  async createCOline(req: any): Promise<CommonResponseModel> {
    const poDetails = await this.hbCoLineRepo.getDataforCOLineCreation();
    if (!poDetails.length) {
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
      for (const po of poDetails) {
        const coLine = new CoLineRequest();
        let buyerValue1;
        let buyerValue2;
        let agent;
        let buyerAddress;
        let deliveryAddress;
        let pkgTerms;
        let paymentTerms;
        if (po.buyer === 'HB ATHLETIC') {
          const response = await this.getOrderdataForCOline({ poNumber: po.buyer_po })
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
          const address = await this.addressService.getAddressInfoByCountry({ country: request });
          const addressData = address.data[0];
          console.log(addressData)
          buyerAddress = addressData?.buyerCode ? addressData?.buyerCode : 11;
          deliveryAddress = addressData?.deliveryCode
          buyerValue1 = "DIB-DICK'S BRAND"
          buyerValue2 = "HBA00001-HB ATHLETIC INC"
          agent = "0"
          pkgTerms = "BOX-BOXES"
          paymentTerms = "081-TT 90 DAYS"
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
            } else if ((await tab.getAttribute('innerText')) == 'US') {
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
                  const inputId = `${size.name}:${color.name}:US`.replace(/\*/g, '');
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
          const update = await this.hbCoLineRepo.update({ custPo: po.buyer_po }, { status: 'Failed', errorMsg: alertText });
          await alert.accept();
          await driver.sleep(5000)
          await driver.navigate().refresh();
          await driver.quit();
        } else {
          await driver.wait(until.elementLocated(By.xpath('//*[@id="form2"]/table/tbody/tr[2]/td/div/table/thead/tr/th[7]')), 10000);
          const coNoElement = await driver.findElement(By.xpath(`//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[last()]/td[7]`));
          const coNo = await coNoElement.getAttribute('innerText');
          const currentDate = new Date();
          const day = currentDate.getDate().toString().padStart(2, '0');
          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
          const year = currentDate.getFullYear().toString().slice(-2);
          const currentDateFormatted = `${day}-${month}-${year}`;
          if (coNo) {
            const update = await this.hbCoLineRepo.update({ custPo: po.buyer_po }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
            // await driver.navigate().refresh();
            await driver.sleep(10000)
          } else {
            const update = await this.hbCoLineRepo.update({ custPo: po.buyer_po }, { status: 'Failed' });
            // await driver.navigate().refresh();
            await driver.sleep(10000)
          }
        }
      }
      return new CommonResponseModel(true, 1, `COline created successfully`)
    } catch (err) {
      console.log(err, 'error');
      return new CommonResponseModel(false, 0, err)
    }
    finally {
      driver.quit()
    }
  }


  // async getordercomparationData(req?: HbPoOrderFilter): Promise<CommonResponseModel> {
  //   console.log(req,"servvv")
  //   try {
  //     const details = await this.HbOrdersRepo.getordercomparationData(req);
  //     if (details.length === 0) {
  //       return new CommonResponseModel(false, 0, 'data not found');
  //     }else {
  //       return new CommonResponseModel(true, 0, 'sucesss',details);

  //     }


  //   } catch (e) {
  //     return new CommonResponseModel(false, 0, 'failed', e);
  //   }
  // }
  async getordercomparationData(req?: HbPoOrderFilter): Promise<CommonResponseModel> {
    try {
      const Originaldata = await this.HbOrdersRepo.getordercomparationData(req)
      if (Originaldata.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const compareModel: HbCompareModel[] = []
      for (const rec of Originaldata) {
        const childData = await this.HbOrdersChildRepo.find({
          where: {
            custPo: rec.cust_po, style: rec.style, color: rec.color
          }, order: { id: 'DESC' }, take: 1, skip: 1
        })
        if (childData.length > 0) {
          const oldData = childData[0];

          // if (
          //   oldData.unitPrice !== rec.unit_price ||
          //   oldData.exitFactoryDate !== rec.exit_factory_date ||
          //   oldData.quantity !== rec.quantity
          // ) {

          compareModel.push(new HbCompareModel(rec.cust_po, rec.style, rec.color, rec.size, oldData.unitPrice, rec.unit_price, oldData.exitFactoryDate, rec.exit_factory_date, oldData.quantity, rec.quantity));
        }
        // }
      }
      if (compareModel) {
        return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', compareModel);
      }
      else {
        return new CommonResponseModel(false, 0, 'No data found');
      }
    } catch (err) {
      throw err
    }
  }





}