import { Injectable } from "@nestjs/common";
import { HbOrdersRepository } from "./repositories/hb-orders.repo";
import { HbPdfRepo } from "./repositories/hb-pdf.repo";
import { CoLineRequest, CommonResponseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel } from "@project-management-system/shared-models";
import { HbOrdersEntity } from "./entity/hb-orders.entity";
import { HbPdfFileInfoEntity } from "./entity/hb-pdf.entity";
const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');

@Injectable()
export class HbService {

  constructor(
    private HbOrdersRepo: HbOrdersRepository,
    private HbPdfRepo: HbPdfRepo,

  ) { }

  
  async saveHbOrdersData(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqqqqqqqqqqqqq")
    // const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      // await transactionManager.startTransaction()
      for (const item of req.HbpoItemDetails) {
        const match = item.style.match(/\d+/);
        console.log(match, "match");
        // Check if a match is found and convert it to an integer
        // const style = match ? parseInt(match[0], 10) : null;
        const style = match

        console.log(style, "style")
        for (const variant of item.HbpoItemVariantDetails) {
          const orderData = await this.HbOrdersRepo.findOne({ where: { custPo: req.custPo, style: style, size: variant.size } })
          console.log(orderData, "orderData")
          const entity = new HbOrdersEntity();
          entity.custPo = req.custPo
          entity.exitFactoryDate = req.exitFactoryDate
          entity.shipToAdd = req.shipToAdd


          entity.style = item.style
          entity.color = item.color

          entity.size = variant.size
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice


        //   const fileData = {
        //     poNumber: entity.poNumber,
        //     poDate: entity.poDate,
        //     shipment: entity.shipment,
        //     season: entity.season,
        //     portOfExport: entity.portOfExport,
        //     portOfEntry: entity.portOfEntry,
        //     Refrence: entity.Refrence,
        //     paymentTermDescription: entity.paymentTermDescription,
        //     specialInstructions: entity.specialInstructions,
        //     division: entity.division,
        //     incoterm: entity.incoterm,
        //     shipToAdd: entity.shipToAdd,
        //     manufacture: entity.manufacture,
        //     buyerAddress: entity.buyerAddress,
        
        //     CentricpoItemDetails: [{
        //         poLine: item.poLine,
        //         material: item.material,
        //         color: item.color,
        //         gender: item.gender,
        //         shortDescription: item.shortDescription,
        //         packMethod: item.packMethod,
        //         vendorBookingFlag: item.vendorBookingFlag,
        //         currency: item.currency,
        //         totalQuantity: item.totalQuantity,
        //         CentricpoItemVariantDetails: item.CentricpoItemVariantDetails.map(variant => ({
        //             size: variant.size,
        //             upc: variant.upc,
        //             label: variant.label,
        //             unitPrice: variant.unitPrice,
        //             quantity: variant.quantity,
        //             exFactory: variant.exFactory,
        //             exPort: variant.exPort,
        //             deliveryDate: variant.deliveryDate,
        //             retialPrice: variant.retialPrice,
        //         }))
        //     }]
        // };
        
        // entity.fileData = JSON.stringify(fileData);
        // console.log(entity.fileData, "dfdfdfdfdfdfffffff");

          if (orderData) {
            const update = await this.HbOrdersRepo.update({ custPo: req.custPo, style: style, size: variant.size }, {})
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.HbOrdersRepo.save(entity)
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

  async updatePath(req: any, poNumber: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
    console.log(poNumber, "pppppioooooo");
    console.log(req, "reqqqqqqqqq");

    // const poNumberFromFileName = filename.replace(/\D/g, "");
    const poNumberFromFileName = filename.replace(/\(+.+/g, "").replace(/\D/g, "");
    const entity = new HbPdfFileInfoEntity();
    entity.custPo = poNumberFromFileName;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = req;
    console.log(entity.fileData, "fileData")

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
      const data = await this.HbPdfRepo.find()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
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
        if (!sizeDateMap.has(`${rec.style},${rec.cust_po}`)) {
          sizeDateMap.set(
            `${rec.style},${rec.cust_po}`,
            new HbOrderDataModel(rec.id, rec.cust_po,rec.style,rec.color,rec.size,rec.exit_factory_date,rec.ship_to_add,[],rec.quantity,rec.unit_price)
          );

          // console.log(sizeDateMap,)
        }
        const sizeWiseData = sizeDateMap.get(`${rec.style},${rec.cust_po}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new HbSizeWiseModel(rec.size, rec.unit_price, rec.quantity,));
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

  // async isAlertPresent(driver) {
  //   try {
  //     await driver.switchTo().alert();
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }


  // async createCOline(req: any): Promise<CommonResponseModel> {
  //   const poDetails = await this.coLineRepo.getDataforCOLineCreation();
  //   if (!poDetails.length) {
  //     return new CommonResponseModel(false, 0, 'No CO-Line creation requests')
  //   }
  //   let driver = await new Builder().forBrowser(Browser.CHROME).build();
  //   try {
  //     await driver.get('http://intranetn.shahi.co.in:8080/ShahiExportIntranet/subApp?slNo=2447#');
  //     await driver.findElement(By.id('username')).sendKeys('99901347');
  //     await driver.findElement(By.id('password')).sendKeys('99901347');
  //     await driver.findElement(By.css('button.btn-primary')).click();
  //     await driver.get('http://intranetn.shahi.co.in:8080/ShahiExportIntranet/subApp?slNo=2447')
  //     const newPAge = await driver.executeScript(
  //       `javascript:openAccessPage('http://intranet.shahi.co.in:8080/IntraNet/CRMPRDNEW.jsp', 'CRM', '2448', 'R', '99901347', 'N', '20634576', 'null');`
  //     );
  //     const windowHandles = await driver.getAllWindowHandles()
  //     await driver.switchTo().window(windowHandles[1]);
  //     const frame = await driver.findElement(By.id('mainFrame'));
  //     await driver.switchTo().frame(frame)
  //     for (const po of poDetails) {
  //       const coLine = new CoLineRequest();
  //       let buyerValue1;
  //       let buyerValue2;
  //       let agent;
  //       let buyerAddress;
  //       let deliveryAddress;
  //       let pkgTerms;
  //       let paymentTerms;
  //       if (po.buyer === 'Centric') {
  //         const response = await this.getOrderdataForCOline({ poNumber: po.buyer_po })
  //         console.log(response.data[0])
  //         const coData = response.data[0];
  //         coLine.buyerPo = coData.buyerPo;
  //         const inputDate = new Date(coData.deliveryDate)
  //         // Calculate the date 7 days before the GAC date
  //         const sevenDaysBefore = new Date(inputDate);
  //         sevenDaysBefore.setDate(inputDate.getDate() - 7);
  //         const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBefore);
  //         coLine.deliveryDate = moment(coData.deliveryDate).format("DD/MM/YYYY")
  //         coLine.exFactoryDate = exFactoryDate
  //         coLine.salesPrice = coData.salesPrice
  //         coLine.currency = coData.currency
  //         coLine.destinations = coData.destinations
  //         const request = coData.destinations[0]?.name;
  //         const address = await this.addressService.getAddressInfoByCountry({ country: request });
  //         const addressData = address.data[0];
  //         console.log(addressData)
  //         buyerAddress = addressData?.buyerCode ? addressData?.buyerCode : 12;
  //         deliveryAddress = addressData?.deliveryCode
  //         buyerValue1 = "FIN-FINISHED GOODS - KY"
  //         buyerValue2 = "CEN00002-CENTRIC BRANDS LLC"
  //         agent = "NA-DIRECT CUSTOMER"
  //         pkgTerms = "BOX-BOXES"
  //         paymentTerms = "081-TT 90 DAYS"
  //       }
  //       const apps = await driver.wait(until.elementLocated(By.xpath('//*[@id="mainContainer"]/div[1]')));
  //       const allApps = await apps.findElements(By.tagName('span'));
  //       for (const app of allApps) {
  //         if ((await app.getAttribute('innerText')).includes('Style Orders')) {
  //           await driver.executeScript('arguments[0].click();', app);
  //           break;
  //         }
  //       }
  //       await driver.wait(until.elementLocated(By.id('styleid2H')))
  //       await driver.findElement(By.id('styleid2H')).sendKeys(po.item_no);
  //       await driver.sleep(10000)
  //       await driver.wait(until.elementLocated(By.id('bgpset1')));
  //       const dropdownElement1 = await driver.findElement(By.id('bgpset1'));
  //       const dropdown1 = await driver.wait(until.elementIsVisible(dropdownElement1)).then(element => new Select(element))
  //       await dropdown1.selectByValue(buyerValue1)
  //       await driver.sleep(10000)
  //       await driver.wait(until.elementLocated(By.id('byr')));
  //       const dropdownElement2 = await driver.findElement(By.id('byr'));
  //       const dropdown2 = await driver.wait(until.elementIsVisible(dropdownElement2)).then(element => new Select(element))
  //       await dropdown2.selectByValue(buyerValue2)
  //       await driver.sleep(5000)
  //       await driver.wait(until.elementLocated(By.id('CreateOrderID')))
  //       await driver.sleep(3000)
  //       await driver.findElement(By.id('CreateOrderID')).click();
  //       await driver.wait(until.elementLocated(By.id('bpo')))
  //       await driver.findElement(By.id('bpo')).clear();
  //       await driver.findElement(By.id('bpo')).sendKeys(coLine.buyerPo);
  //       await driver.wait(until.elementLocated(By.id('agnt')));
  //       const agentDropDown = await driver.findElement(By.id('agnt'));
  //       await driver.executeScript(`arguments[0].value = '${agent}';`, agentDropDown)
  //       await driver.wait(until.elementLocated(By.name('dojo.EXFACTORYDATE')));
  //       await driver.findElement(By.name('dojo.EXFACTORYDATE')).clear();
  //       await driver.findElement(By.name('dojo.EXFACTORYDATE')).sendKeys(coLine.exFactoryDate);
  //       await driver.wait(until.elementLocated(By.name('dojo.delydt')));
  //       await driver.findElement(By.name('dojo.delydt')).clear();
  //       await driver.findElement(By.name('dojo.delydt')).sendKeys(coLine.deliveryDate);
  //       await driver.wait(until.elementLocated(By.name('byd')));
  //       const dropdown = await driver.findElement(By.name('byd'));
  //       const options = await dropdown.findElements(By.tagName('option'));
  //       const optionValues = [];
  //       for (const option of options) {
  //         const value = await option.getAttribute('value');
  //         optionValues.push(value);
  //       }
  //       const number = optionValues.find(value => value.includes(buyerAddress)); // give the dynamic value here
  //       await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);

  //       await driver.wait(until.elementLocated(By.xpath('//*[@id="cur"]')));
  //       const curDropdown = await driver.findElement(By.xpath('//*[@id="cur"]'));
  //       const cur = coLine.currency; // give the dynamic value here
  //       await driver.executeScript(`arguments[0].value = '${cur}';`, curDropdown);

  //       await driver.wait(until.elementLocated(By.xpath('//*[@id="price"]')));
  //       await driver.findElement(By.xpath('//*[@id="price"]')).clear();
  //       await driver.findElement(By.xpath('//*[@id="price"]')).sendKeys(coLine.salesPrice);

  //       await driver.wait(until.elementLocated(By.id('packtrm')));
  //       const pkgTermsDropDown = await driver.findElement(By.id('packtrm'));
  //       await driver.executeScript(`arguments[0].value = '${pkgTerms}';`, pkgTermsDropDown)
  //       await driver.wait(until.elementLocated(By.id('ptr')));
  //       const ptrDropDown = await driver.findElement(By.id('ptr'));
  //       await driver.executeScript(`arguments[0].value = '${paymentTerms}';`, ptrDropDown)
  //       await driver.sleep(10000)
  //       for (let dest of coLine.destinations) {
  //         const colorsContainer = await driver.wait(until.elementLocated(By.xpath('//*[@id="COContainer"]')));
  //         const colorsTabs = await colorsContainer.findElements(By.tagName('span'));
  //         for (const tab of colorsTabs) {
  //           if ((await tab.getAttribute('innerText')) == dest.name) {
  //             await driver.executeScript('arguments[0].click();', tab);
  //             for (let [colorIndex, color] of dest.colors.entries()) {
  //               for (let [sizeIndex, size] of color.sizes.entries()) {
  //                 if (colorIndex === 0) {
  //                   // Find all the labels in the second row.
  //                   await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
  //                   let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
  //                   const fileteredElements: any[] = [];
  //                   for (const labelElement of labelElements) {
  //                     const ele = (await labelElement.getText())?.trim();
  //                     ele.length > 0 ? fileteredElements.push(labelElement) : '';
  //                   }
  //                   let tabIndex = 1; // Default to 1 if no match
  //                   const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
  //                   const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
  //                   await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
  //                   const dropdown = await driver.findElement(By.id(`bydline/${string}`));
  //                   const options = await dropdown.findElements(By.tagName('option'));
  //                   const optionValues = [];
  //                   for (const option of options) {
  //                     const value = await option.getAttribute('value');
  //                     optionValues.push(value);
  //                   }
  //                   const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
  //                   await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
  //                   // Find all the input fields in the first row.
  //                   const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
  //                   // Create a map of size labels to input fields.
  //                   const sizeToInputMap = {};
  //                   for (let i = 0; i < fileteredElements.length; i++) {
  //                     const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
  //                     if (label.length)
  //                       sizeToInputMap[label] = inputElements[i];
  //                   }
  //                   const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
  //                   if (inputField) {
  //                     // Clear the existing value (if any) and fill it with the new price.
  //                     await inputField.clear();
  //                     await inputField.sendKeys(size.price);
  //                   }
  //                 }
  //                 const inputId = `${size.name}:${color.name}:${dest.name}`.replace(/\*/g, '');
  //                 const input = await driver.wait(until.elementLocated(By.id(inputId)))
  //                 await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
  //               }
  //             }
  //           } else if ((await tab.getAttribute('innerText')) == 'US') {
  //             await driver.executeScript('arguments[0].click();', tab);
  //             for (let [colorIndex, color] of dest.colors.entries()) {
  //               for (let [sizeIndex, size] of color.sizes.entries()) {
  //                 if (colorIndex === 0) {
  //                   // Find all the labels in the second row.
  //                   await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
  //                   let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
  //                   const fileteredElements: any[] = [];
  //                   for (const labelElement of labelElements) {
  //                     const ele = (await labelElement.getText())?.trim();
  //                     ele.length > 0 ? fileteredElements.push(labelElement) : '';
  //                   }
  //                   let tabIndex = 1; // Default to 1 if no match
  //                   const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
  //                   const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
  //                   await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
  //                   const dropdown = await driver.findElement(By.id(`bydline/${string}`));
  //                   const options = await dropdown.findElements(By.tagName('option'));
  //                   const optionValues = [];
  //                   for (const option of options) {
  //                     const value = await option.getAttribute('value');
  //                     optionValues.push(value);
  //                   }
  //                   const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
  //                   await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
  //                   // Find all the input fields in the first row.
  //                   const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
  //                   // Create a map of size labels to input fields.
  //                   const sizeToInputMap = {};
  //                   for (let i = 0; i < fileteredElements.length; i++) {
  //                     const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
  //                     if (label.length)
  //                       sizeToInputMap[label] = inputElements[i];
  //                   }
  //                   const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
  //                   if (inputField) {
  //                     // Clear the existing value (if any) and fill it with the new price.
  //                     await inputField.clear();
  //                     await inputField.sendKeys(size.price);
  //                   }
  //                 }
  //                 const inputId = `${size.name}:${color.name}:US`.replace(/\*/g, '');
  //                 const input = await driver.wait(until.elementLocated(By.id(inputId)))
  //                 await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
  //               }
  //             }
  //           }
  //         }
  //       }
  //       await driver.sleep(10000)
  //       const element = await driver.findElement(By.id('OrderCreateID')).click();
  //       await driver.wait(until.alertIsPresent(), 10000);
  //       // Switch to the alert and accept it (click "OK")
  //       const alert = await driver.switchTo().alert();
  //       await alert.accept();
  //       if (await this.isAlertPresent(driver)) {
  //         const alert = await driver.switchTo().alert();
  //         const alertText = await alert.getText();
  //         const update = await this.coLineRepo.update({ poNumber: po.buyer_po, poLine: po.line_item_no }, { status: 'Failed', errorMsg: alertText });
  //         await alert.accept();
  //         await driver.sleep(5000)
  //         await driver.navigate().refresh();
  //         await driver.quit();
  //       } else {
  //         await driver.wait(until.elementLocated(By.xpath('//*[@id="form2"]/table/tbody/tr[2]/td/div/table/thead/tr/th[7]')), 10000);
  //         const coNoElement = await driver.findElement(By.xpath(`//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[last()]/td[7]`));
  //         const coNo = await coNoElement.getAttribute('innerText');
  //         const currentDate = new Date();
  //         const day = currentDate.getDate().toString().padStart(2, '0');
  //         const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
  //         const year = currentDate.getFullYear().toString().slice(-2);
  //         const currentDateFormatted = `${day}-${month}-${year}`;
  //         if (coNo) {
  //           const update = await this.coLineRepo.update({ poNumber: po.buyer_po, poLine: po.line_item_no }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted });
  //           // await driver.navigate().refresh();
  //           await driver.sleep(10000)
  //         } else {
  //           const update = await this.coLineRepo.update({ poNumber: po.buyer_po, poLine: po.line_item_no }, { status: 'Failed' });
  //           // await driver.navigate().refresh();
  //           await driver.sleep(10000)
  //         }
  //       }
  //     }
  //     return new CommonResponseModel(true, 1, `COline created successfully`)
  //   } catch (err) {
  //     console.log(err, 'error');
  //     return new CommonResponseModel(false, 0, err)
  //   }
  //   finally {
  //     driver.quit()
  //   }
  // }


}