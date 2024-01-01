import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CentricEntity } from "./entity/centric.entity";
import { CentricDto } from "./dto/centric.dto";
import { CentricOrderDataModel, CentricSizeWiseModel, CoLineRequest, CoLinereqModel, Color, CommonResponseModel, DestinationModel, PoOrderFilter, SizeModel, StatusEnum, centricCoLineRequest } from "@project-management-system/shared-models";
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
import { Cron, CronExpression, Interval } from "@nestjs/schedule";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";
import { AddressService } from "../Entites@Shahi/address/address-service";


@Injectable()
export class CentricService {

  //   constructor(
  //     @InjectRepository(CentricEntity)
  //     private repository: Repository<CentricEntity>,

  //   ) { }

  constructor(
    private Repo: CentricRepository,
    private dataSource: DataSource,
    private pdfRepo: CentricPdfRepository,
    private coLineRepo: CentricCOLineRepository,
    private addressService: AddressService

  ) { }

  // async saveCentricOrder(req: CentricDto): Promise<CommonResponseModel> {
  //   console.log(req,"req")

  //   const entity = new CentricEntity(); 
  //   entity.poNumber = req.poNumber
  //         entity.shipment = req.shipment
  //         entity.season = req.season
  //         entity.portOfExport = req.portOfExport
  //         entity.portOfEntry = req.portOfEntry
  //         entity.Refrence = req.Refrence
  //         entity.paymentTermDescription = req.paymentTermDescription
  //         entity.specialInstructions = req.specialInstructions

  //         entity.poLine = req.poLine
  //         entity.material =req.material
  //         entity.color = req.color
  //         entity.gender = req.gender

  //         entity.size = req.size
  //         entity.upc = req.upc
  //         entity.label = req.label
  //         entity.quantity = req.quantity
  //         entity.unitPrice = req.unitPrice
  //         entity.exFactory = req.exFactory
  //         entity.exPort = req.exPort
  //         entity.deliveryDate = req.deliveryDate
  //         entity.retialPrice = req.retialPrice

  //   await this.Repo.save(entity);

  //   const internalMessage: string = req.poLine
  //     ? "Created Successfully"
  //     : "Created Successfully";

  //   return new CommonResponseModel(true, 48896, internalMessage);
  // }

  async saveCentricOrder(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqqqqqqqqqqqqq")
    // const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      // await transactionManager.startTransaction()
      for (const item of req.CentricpoItemDetails) {
        const match = item.poLine.match(/\d+/);
        console.log(match, "match");
        // Check if a match is found and convert it to an integer
        // const poLine = match ? parseInt(match[0], 10) : null;
        const poLine = match

        console.log(poLine, "poLine")
        for (const variant of item.CentricpoItemVariantDetails) {
          const orderData = await this.Repo.findOne({ where: { poNumber: req.poNumber, poLine: poLine, size: variant.size } })
          console.log(orderData, "orderData")
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

          if (orderData) {
            const update = await this.Repo.update({ poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, {})
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.Repo.save(entity)
            // const savedChild = await transactionManager.getRepository(RLOrdersEntity).save(entity)
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


  async updatePath(filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {

    const entity = new CentricPdfFileUploadEntity()
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype
    const file = await this.pdfRepo.findOne({ where: { pdfFileName: filePath } })
    if (file) {
      return new CommonResponseModel(false, 0, 'File with same name already uploaded');
    } else {
      const save = await this.pdfRepo.save(entity)
      if (save) {
        return new CommonResponseModel(true, 1, 'uploaded successfully', save);
      }
      else {
        return new CommonResponseModel(false, 0, 'uploaded failed');
      }
    }
  }

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


  async getorderData(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.Repo.getorderData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
      }
      const sizeDateMap = new Map<string, CentricOrderDataModel>();
      for (const rec of details) {
        // console.log(rec,"rrrrrrrrr")
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number}`,
            new CentricOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc, rec.status, rec.currency)
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
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async getPdfFileInfo(): Promise<CommonResponseModel> {
    try {
      const data = await this.pdfRepo.find()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async coLineCreationReq(req: any): Promise<CommonResponseModel> {
    try {
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      const records = await this.Repo.find({ where: { poNumber: req.poNumber } });
      const empty = [];
      for (const rec of records) {
        const entity = new CentricCOLineEntity()
        entity.buyer = req.buyer
        entity.poNumber = req.poNumber;
        entity.poLine = rec.poLine;
        entity.itemNo = req.itemNo
        entity.status = 'Open';
        entity.createdUser = 'Admin';
        empty.push(entity)
      }
      const save = await this.coLineRepo.save(empty);


      if (save) {
        const update = await this.Repo.update(
          { poNumber: req.poNumber }, // Conditions for updating
          { status: StatusEnum.ACCEPTED } // Data to update
        );
        return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
      } else {
        return new CommonResponseModel(false, 0, 'CO-Line request failed')
      }
    } catch (err) {
      return new CommonResponseModel(false, 0, 'CO-Line request failed', err)
    }
  }

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
        if (po.buyer === 'Centric') {
          const response = await this.getOrderdataForCOline({ poNumber: po.buyer_po })
          console.log(response.data[0])
          const coData = response.data[0];
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
          buyerAddress = addressData?.buyerCode ? addressData?.buyerCode : 25;
          deliveryAddress = addressData?.deliveryCode
          buyerValue1 = "FIN-FINISHED GOODS - KY"
          buyerValue2 = "CEN00002-CENTRIC BRANDS LLC"
          agent = "NA-DIRECT CUSTOMER"
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
          const update = await this.coLineRepo.update({ poNumber: po.buyer_po, poLine: po.line_item_no }, { status: 'Failed', errorMsg: alertText });
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
            const update = await this.coLineRepo.update({ poNumber: po.buyer_po, poLine: po.line_item_no }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
            // await driver.navigate().refresh();
            await driver.sleep(10000)
          } else {
            const update = await this.coLineRepo.update({ poNumber: po.buyer_po, poLine: po.line_item_no }, { status: 'Failed' });
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
            new CentricOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc, rec.status)
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
      await page.type('#login-form_username', 'RLadmin@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'RLadmin');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

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
        await page.waitForTimeout(2000);

        await page.waitForSelector('button.ant-btn-primary')
        await page.click('button.ant-btn-primary');
        await page.waitForTimeout(10000)

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
      const data = await this.Repo.find({ where: { poNumber: req.poNumber } })
      let destinationMap = new Map<string, DestinationModel>();
      // po -> destination -> color -> sizes
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, CentricEntity>();
      data.forEach(rec => {
        poMap.set(`${rec.poLine},${rec.poNumber}`, rec)
        // const destCountry = rec.shipToAdd.slice(-13).trim();
        // console.log(destCountry,"hirrrrrrrrrrrrrrrrrr")

        const parts = rec.shipToAdd.split(',')
        const destAdd = parts[2].trim();
        const dest = destAdd;

        if (!destinationColSizesMap.has(`${rec.poLine},${rec.poNumber}`)) {
          destinationColSizesMap.set(`${rec.poLine},${rec.poNumber}`, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).has(dest)) {
          destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).set(dest, new Map<string, []>());
        }
        if (!destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).get(dest).has(rec.color)) {
          destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).get(dest).set(rec.color, []);
        }
        destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).get(dest).get(rec.color).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
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
        const co = new CoLinereqModel(poInfo.poNumber, poInfo.poLine, poInfo.unitPrice, poInfo.currency, poInfo.deliveryDate, desArray);
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




}