
import { Injectable } from "@nestjs/common";
import { RLOrdersRepository } from "./repositories/rl-orders.repo";
import { CoLineModel, Color, CoLineRequest, Destination, Colors, CommonResponseModel, Destinations, OrderDataModel, OrderSizeWiseModel, PoOrderFilter, Sizes, coLineRequest, Size, ItemStatusEnum, StatusTypeEnum } from "@project-management-system/shared-models";
import { DataSource } from "typeorm";
import { PdfFileUploadRepository } from "./repositories/pdf-file.repo";
import { OrderDetailsReq } from "./dto/order-details-req";
import { RLOrdersEntity } from "./entities/rl-orders.entity";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { COLineEntity } from "./entities/co-line.entity";
import { COLineRepository } from "./repositories/co-line.repository";
const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
import { PdfFileUploadEntity } from "./entities/pdf-file-upload.entity";
import { AddressService } from "../Entites@Shahi/address/address-service";
import puppeteer from "puppeteer";
import * as AdmZip from 'adm-zip';
import { RLOrderschildEntity } from "./entities/rl-orders-child.entity";
import { RLOrdersChildRepository } from "./repositories/rl-orders-child.repo";
import { StatusDto } from "./dto/pdf-file-status.dto";
const fs = require('fs');
const path = require('path')

@Injectable()
export class RLOrdersService {
  constructor(
    private rlOrdersRepo: RLOrdersRepository,
    private pdfrepo: PdfFileUploadRepository,
    private coLineRepo: COLineRepository,
    private dataSource: DataSource,
    private addressService: AddressService,
    private orderChildRepo: RLOrdersChildRepository


  ) { }

  async saveOrdersDataFromPDF(req: any): Promise<CommonResponseModel> {
    const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      await transactionManager.startTransaction()
      for (const item of req.poItemDetails) {
        const match = item.poItem.match(/\d+/);
        // Check if a match is found and convert it to an integer
        const poItem = match ? parseInt(match[0], 10) : null;
        for (const variant of item.poItemVariantDetails) {
          const orderData = await this.rlOrdersRepo.findOne({ where: { poNumber: req.poNumber, poItem: poItem, size: variant.size } })
          const order = await this.orderChildRepo.findOne({ where: { poNumber: req.poNumber }, order: { poVersion: 'DESC' } })
          //  console.log(order,"test")
          //  const lastPoVersionObject = order.slice(-1);

          // Now 'lastPoVersionObject' contains the last object of the 'poVersion' array.
          //  console.log(lastPoVersionObject[0].poVersion,"7777777777");

          const entity = new RLOrdersEntity()
          entity.agent = req.agent
          entity.amount = variant.amount
          entity.boardCode = item.board
          entity.buyer = 'RL'
          entity.color = item.colorDescription
          entity.currency = variant.currency
          entity.materialNo = item.materialNo
          entity.poItem = poItem
          entity.poNumber = req.poNumber
          entity.poUploadDate = req.poIssue
          entity.price = variant.unitPrice
          entity.purchaseGroup = req.purchaseGroup
          entity.quantity = variant.quantity
          entity.revisionNo = req.revisionNo
          entity.seasonCode = item.season
          entity.handoverDate = item.handoverDate
          entity.shipToAddress = req.shipToAddress
          entity.billToAddress = req.buyerAddress
          entity.size = variant.size
          entity.status = 'Revised'
          entity.upcEan = variant.upc
          if (orderData) {
            // console.log("uuuuuuu")
            const update = await transactionManager.getRepository(RLOrdersEntity).update({ poNumber: req.poNumber, poItem: poItem, size: variant.size }, { revisionNo: req.revisionNo, agent: req.agent, amount: variant.amount, price: variant.unitPrice, currency: variant.currency, materialNo: item.materialNo, shipToAddress: req.shipToAddress })



            let po = parseInt(order?.poVersion) + 1


            const entitys = new RLOrderschildEntity()

            entitys.agent = req.agent
            entitys.amount = variant.amount
            entitys.boardCode = item.board
            entitys.buyer = 'RL'
            entitys.color = item.colorDescription
            entitys.currency = variant.currency
            entitys.materialNo = item.materialNo
            entitys.poItem = poItem
            entitys.poNumber = req.poNumber
            entitys.poUploadDate = req.poIssue
            entitys.price = variant.unitPrice
            entitys.purchaseGroup = req.purchaseGroup
            entitys.quantity = variant.quantity
            entitys.revisionNo = req.revisionNo
            entitys.seasonCode = item.season
            entitys.handoverDate = item.handoverDate
            entitys.shipToAddress = req.shipToAddress
            entitys.billToAddress = req.buyerAddress
            entitys.size = variant.size
            entitys.status = 'Revised'
            entitys.upcEan = variant.upc
            entitys.poVersion = po.toString()
            entitys.orderId = orderData.id

            const savedChild = await transactionManager.getRepository(RLOrderschildEntity).save(entitys)


            if (!update.affected
              // && !updated.affected 
            ) {
              throw new Error('Update failed');
            }


          } else {
            saved = await transactionManager.getRepository(RLOrdersEntity).save(entity)

            const entitys = new RLOrderschildEntity()
            entitys.agent = req.agent
            entitys.amount = variant.amount
            entitys.boardCode = item.board
            entitys.buyer = 'RL'
            entitys.color = item.colorDescription
            entitys.currency = variant.currency
            entitys.materialNo = item.materialNo
            entitys.poItem = poItem
            entitys.poNumber = req.poNumber
            entitys.poUploadDate = req.poIssue
            entitys.price = variant.unitPrice
            entitys.purchaseGroup = req.purchaseGroup
            entitys.quantity = variant.quantity
            entitys.revisionNo = req.revisionNo
            entitys.seasonCode = item.season
            entitys.handoverDate = item.handoverDate
            entitys.shipToAddress = req.shipToAddress
            entitys.billToAddress = req.buyerAddress
            entitys.size = variant.size
            entitys.status = 'Revised'
            entitys.upcEan = variant.upc
            entitys.orderId = saved.id

            const savedChild = await transactionManager.getRepository(RLOrderschildEntity).save(entitys)



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


  async getPdfFileInfo(): Promise<CommonResponseModel> {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await this.pdfrepo.find()
      // const data = await this.pdfrepo.find({ where: { status: StatusTypeEnum.NOT_CANCELLED } });
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrieved Successfully', data);
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', []);
      }
    } catch (err) {
      throw err;
    }
  }

  async getorderData(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.rlOrdersRepo.getorderData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
      }
      const sizeDateMap = new Map<string, OrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(rec.po_number)) {
          sizeDateMap.set(
            rec.po_number,
            new OrderDataModel(rec.id, rec.po_number, rec.po_item, rec.ship_to_address, rec.agent, rec.purchase_group, rec.supplier, rec.revision_no, rec.po_upload_date, rec.status, rec.division, rec.ship_to, rec.season_code, rec.board_code, rec.style, rec.material_no, rec.rl_style_no, rec.color, rec.size, rec.total_qty, rec.ship_date, rec.ship_mode, rec.msrp_price, rec.msrp_currency, rec.c_s_price, rec.c_s_currency, rec.amount, rec.total_amount, rec.price, rec.currency, rec.quantity, rec.upc_ean, [], rec.item_status)
          );
        }
        const sizeWiseData = sizeDateMap.get(rec.po_number).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new OrderSizeWiseModel(rec.size, rec.total_qty, rec.msrp_price, rec.msrp_currency, rec.c_s_price, rec.c_s_currency, rec.amount, rec.total_amount, rec.price, rec.currency, rec.quantity, rec.upc_ean));
        }
      }
      const dataModelArray: OrderDataModel[] = Array.from(sizeDateMap.values());
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    } catch (e) {
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }

  async getorderDataforAcceptance(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.rlOrdersRepo.getorderDataforAcceptance(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
      }
      const sizeDateMap = new Map<string, OrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(rec.po_number)) {
          sizeDateMap.set(
            rec.po_number,
            new OrderDataModel(rec.id, rec.po_number, rec.po_item, rec.ship_to_address, rec.agent, rec.purchase_group, rec.supplier, rec.revision_no, rec.po_upload_date, rec.status, rec.division, rec.ship_to, rec.season_code, rec.board_code, rec.style, rec.material_no, rec.rl_style_no, rec.color, rec.size, rec.total_qty, rec.ship_date, rec.ship_mode, rec.msrp_price, rec.msrp_currency, rec.c_s_price, rec.c_s_currency, rec.amount, rec.total_amount, rec.price, rec.currency, rec.quantity, rec.upc_ean, [], rec.item_status)
          );
        }
        const sizeWiseData = sizeDateMap.get(rec.po_number).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new OrderSizeWiseModel(rec.size, rec.total_qty, rec.msrp_price, rec.msrp_currency, rec.c_s_price, rec.c_s_currency, rec.amount, rec.total_amount, rec.price, rec.currency, rec.quantity, rec.upc_ean));
        }
      }
      const dataModelArray: OrderDataModel[] = Array.from(sizeDateMap.values());
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
    } catch (e) {
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }

  async getorderDataByPoNumber(req: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const data = await this.rlOrdersRepo.getorderDataByPoNumber(req)
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async getOrderDetails(req: OrderDetailsReq): Promise<CommonResponseModel> {
    try {
      const data = await this.rlOrdersRepo.find({ where: { poNumber: req.poNumber } })
      //  const data = await this.repo.find()
      let destinationMap = new Map<string, Destination>();
      // po -> destination -> color -> sizes
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: number, price: string }[]>>>();
      const poMap = new Map<string, RLOrdersEntity>();
      data.forEach(rec => {
        poMap.set(rec.poNumber, rec)
        const destCountry = rec.shipToAddress.slice(-2).trim();
        const parts = rec.shipToAddress.split(',')
        const destAdd = parts[0].trim();
        const dest = destAdd + ',' + destCountry;
        if (!destinationColSizesMap.has(rec.poNumber)) {
          destinationColSizesMap.set(rec.poNumber, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(rec.poNumber).has(dest)) {
          destinationColSizesMap.get(rec.poNumber).set(dest, new Map<string, []>());
        }
        if (!destinationColSizesMap.get(rec.poNumber).get(dest).has(rec.color)) {
          destinationColSizesMap.get(rec.poNumber).get(dest).set(rec.color, []);
        }
        destinationColSizesMap.get(rec.poNumber).get(dest).get(rec.color).push({ size: rec.size, quantity: rec.quantity, price: rec.price });
      });
      const coData = []
      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = []
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = []
          colorSizes.forEach((sizes, color) => {
            const sizeArray = []
            sizes.forEach((size) => {
              const sizeObj = new Size(size.size, size.quantity, size.price);
              sizeArray.push(sizeObj)
            })
            const col = new Color(color, sizeArray);
            ColArray.push(col)
          });
          const des = new Destination(dest, ColArray);
          desArray.push(des)
        });
        const poInfo = poMap.get(poNumber)
        const co = new CoLineModel(poInfo.poNumber, poInfo.poItem, poInfo.price, poInfo.currency, poInfo.handoverDate, poInfo.materialNo, desArray);
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

  async coLineCreationReq(req: any): Promise<CommonResponseModel> {
    try {
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      }
      const entity = new COLineEntity()
      entity.buyer = req.buyer
      entity.buyerPo = req.purchaseOrderNumber;
      entity.lineItemNo = req.poLineItemNumber;
      entity.itemNo = req.itemNo
      entity.status = 'Open';
      entity.createdUser = req.createdUser;
      const save = await this.coLineRepo.save(entity);
      if (save) {
        const update = await this.rlOrdersRepo.update({
          poNumber: req.purchaseOrderNumber
        }, { itemStatus: ItemStatusEnum.ACCEPTED })
        return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
      } else {
        return new CommonResponseModel(false, 0, 'CO-Line request failed')
      }
    } catch (err) {
      return new CommonResponseModel(false, 0, 'CO-Line request failed', err)
    }
  }

  async getTradeLinkPdf(): Promise<CommonResponseModel> {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
      await driver.get('https://www.tradelinkone.com/')
      await driver.wait(until.elementLocated(By.id('wt-cli-accept-all-btn')))
      const acceptButton = await driver.findElement(By.id('wt-cli-accept-all-btn'));
      await acceptButton.click();
      await driver.wait(until.elementLocated(By.id('forminator-field-text-1')))
      await driver.findElement(By.id('forminator-field-text-1')).sendKeys('sounder.kumar@shahi.co.in');
      await driver.wait(until.elementLocated(By.id('forminator-field-password-1')))
      await driver.findElement(By.id('forminator-field-password-1')).sendKeys('6A09CD34C2');
      await driver.wait(until.elementLocated(By.xpath('//*[@id="forminator-module-3303"]/div[4]/div/div/button')))
      await driver.findElement(By.xpath('//*[@id="forminator-module-3303"]/div[4]/div/div/button')).click();
      await driver.wait(until.elementLocated(By.xpath('//*[@id="ui-id-10"]/div[1]/a')))
      await driver.findElement(By.xpath('//*[@id="ui-id-10"]/div[1]/a')).click();
      await driver.sleep(10000)
      await driver.wait(until.elementLocated(By.xpath('//*[@id="tab1"]/div[1]/div[1]/div[2]')))
      await driver.findElement(By.xpath('//*[@id="tab1"]/div[1]/div[1]/div[2]')).click();
      await driver.wait(until.elementLocated(By.id('linkButton3D_256')));
      await driver.findElement(By.id('linkButton3D_256')).click();
      await driver.wait(until.elementLocated(By.xpath('//*[@id="ui-id-4"]/div[3]/div/div[1]/span/a')))
      await driver.findElement(By.xpath('//*[@id="ui-id-4"]/div[3]/div/div[1]/span/a')).click();
      await driver.wait(until.elementLocated(By.xpath('//*[@id="ui-id-14"]/div[4]/div[4]/button')))
      await driver.findElement(By.xpath('//*[@id="ui-id-14"]/div[4]/div[4]/button')).click();
      await driver.wait(until.elementLocated(By.xpath('//*[@id="frmMasterInt"]/div[1]/div[2]/div[2]/div[2]/div[3]')))
      await driver.findElement(By.xpath('//*[@id="frmMasterInt"]/div[1]/div[2]/div[2]/div[2]/div[3]')).click();

    } catch (err) {
      console.log(err, 'error');
      return new CommonResponseModel(false, 0, err)
    }
  }

  // async getTradeLinkButtonBot() {
  //   try {
  //     const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
  //     const page = await browser.newPage();
  //     await page.setViewport({ width: 1580, height: 900 });

  //     await page.goto('http://localhost:9002/api#/default/RLOrdersController_getTradeLinkPdf', {
  //       timeout: 100000,
  //       waitUntil: 'networkidle0',
  //     });

  //     await page.waitForSelector('.opblock-section .try-out__btn', { visible: true });
  //     await page.click('.opblock-section .try-out__btn');

  //     await page.waitForSelector('.btn.execute.opblock-control__btn', { visible: true });
  //     await page.click('.btn.execute.opblock-control__btn');

  //   } catch (error) {
  //     return new CommonResponseModel(false, 0, error);
  //   }
  // }

  async readPOPdfBot() {
    try {
      const extractToPath = 'D:/extractPath';
      const zipFilePath = 'D:/Ralph Lauren PO Report (PDF) (1).zip';
      const zip = new AdmZip(zipFilePath);
      zip.extractAllTo(extractToPath, true);

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
      await page.type('#login-form_username', 'RLadmin@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'RLadmin');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      const directoryPath = 'D:/extractPath';
      const sourceDirectory = 'D:/extractPath';
      const destinationDirectory = 'D:/rl-read-files';

      const files = fs.readdirSync(directoryPath);
      if (files.length === 0) {
        return new CommonResponseModel(false, 0, "No Files Found");
      }

      setTimeout(async () => {
        await page.goto('http://localhost:4200/#/ralph-lauren/pdf-upload/', {
          timeout: 10000,
          waitUntil: 'networkidle0',
        })
      })
      for (const file of files) {
        await page.waitForSelector('input[type="file"]');
        const fileInput = await page.$('input[type="file"]');
        const filePath = path.join(directoryPath, file);
        await fileInput.uploadFile(filePath);
        await page.waitForTimeout(5000);

        await page.waitForSelector('button.ant-btn-primary')
        await page.click('button.ant-btn-primary');
        await page.waitForTimeout(6000)

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

  // @Cron('*/5 * * * *')
  async createCOline(req: any): Promise<CommonResponseModel> {
    const poDetails = await this.coLineRepo.getDataforCOLineCreation();
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
        let styleNo;
        if (po.buyer === 'RL-U12') {
          const response = await this.getOrderDetails({ poNumber: po.buyer_po })
          const coData = response.data[0];
          console.log(coData)
          coLine.buyerPo = coData.buyerPo;
          const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          const [day, monthAbbrev, year] = coData.deliveryDate.split('-');
          const month = (months.indexOf(monthAbbrev) + 1).toString().padStart(2, '0');
          coLine.deliveryDate = `${day}/${month}/${year}`
          // Create a Date object using the extracted components
          const inputDate = new Date(year, Number(month) - 1, day)
          // Calculate the date 7 days before the GAC date
          const sevenDaysBefore = new Date(inputDate);
          sevenDaysBefore.setDate(inputDate.getDate() - 7);
          const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBefore)
          coLine.exFactoryDate = exFactoryDate
          coLine.salesPrice = coData.salesPrice
          coLine.currency = coData.currency
          coLine.destinations = coData.destinations
          const parts = coData.destinations[0]?.name.split(',');
          const request = { country: parts[1].trim() }
          const address = await this.addressService.getAddressInfoByCountry(request);
          const addressData = address.data[0];
          styleNo = coData.styleNo
          buyerAddress = addressData?.buyerCode ? addressData?.buyerCode : 25;
          deliveryAddress = addressData?.deliveryCode
          buyerValue1 = "RAL-RALPH LAUREN"
          buyerValue2 = "RAL00001-RALPH LAUREN CORPORATION"
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
        //*[@id="form1"]/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table/tbody/tr[5]/td[5]
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
          const update = await this.coLineRepo.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Failed', errorMsg: alertText });
          await alert.accept();
          await driver.sleep(5000)
          await driver.navigate().refresh();
          await driver.quit();
        } else {
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
            const update = await this.coLineRepo.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
            // await driver.navigate().refresh();
            await driver.sleep(10000)
          } else {
            const update = await this.coLineRepo.update({ buyerPo: po.buyer_po, lineItemNo: po.line_item_no }, { status: 'Failed' });
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
    // finally {
    //     driver.quit()
    // }
  }

  async isAlertPresent(driver) {
    try {
      await driver.switchTo().alert();
      return true;
    } catch (e) {
      return false;
    }
  }

  async getCoLine(req?: coLineRequest): Promise<CommonResponseModel> {
    const data = await this.coLineRepo.getCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getBuyerPo(): Promise<CommonResponseModel> {
    const data = await this.coLineRepo.getBuyerPo()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getColineItem(): Promise<CommonResponseModel> {
    const data = await this.coLineRepo.getItem()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getColineOrderNo(): Promise<CommonResponseModel> {
    const data = await this.coLineRepo.getOrderNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async updatePath(req: any, poNumber: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
    const entity = new PdfFileUploadEntity();
    const match = filename.match(/(\d+)_v/);
    const poNumberFromFileName = match ? match[1] : null;
    entity.poNumber = poNumberFromFileName;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = JSON.stringify(req)
    entity.fileData = req;
    console.log(entity.fileData, "fileData")

    const file = await this.pdfrepo.findOne({ where: { pdfFileName: filePath } })
    if (file) {
      return new CommonResponseModel(false, 0, 'File with same name already uploaded');
    } else {
      const save = await this.pdfrepo.save(entity)
      if (save) {
        return new CommonResponseModel(true, 1, 'uploaded successfully', save);
      }
      else {
        return new CommonResponseModel(false, 0, 'uploaded failed');
      }
    }
  }

  // async updateDownloadStatus(
  //   req: StatusDto
  // ): Promise<CommonResponseModel> {
  //   try {
  //     const update = await this.pdfrepo.update(
  //       { id: req.id }, 
  //       { status: req.status }
  //     );
  //     if (update.affected > 0) {
  //       return new CommonResponseModel(
  //         true,
  //         1,
  //         "Status Updated SuccessFully"
  //       );
  //     } else {
  //       return new CommonResponseModel(
  //         false,
  //         0,
  //         "Something went wrong",
  //         []
  //       );
  //     }   } catch (error) {
  //       return error;
  //     }
  //   }

  async getordercomparationData(): Promise<CommonResponseModel> {
    try {
      const data = await this.rlOrdersRepo.find()
      
     
      
      
      if (data) {
        return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', data);
      } else {
        return new CommonResponseModel(false, 0, 'No data found');
      }
    } catch (err) {
      throw err
    }
  }




}







