import { Injectable } from "@nestjs/common";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource } from "typeorm";
import { SanmarOrdersRepository } from "./repositories/sanmar-orders.repo";
import { CoLineRequest, CommonResponseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarCoLinereqModels, SanmarColorModel, SanmarCompareModel, SanmarDestinationModel, SanmarOrderFilter, SanmarSizeModel, SanmarSizeWiseModel, StatusEnum, sanmarOrderDataModel } from "@project-management-system/shared-models";
import { SanmarOrdersEntity } from "./entity/sanmar-orders.entity";
import { SanmarPdfInfoEntity } from "./entity/sanmar-pdf.entity";
import { SanmarPdfRepo } from "./repositories/sanmar-pdf.repo";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { SanmarCOLineEntity } from "./entity/sanmar-co-line.entity";
import { SanmarCOLineRepository } from "./repositories/sanmar-co-line.repository";
import { SanmarOrderDetailsReq } from "./dto/sanmar-order-details-req";
import { ItemNoDtos } from "./dto/sanmar-item-no.dto";
import { AddressService } from "../Entites@Shahi/address/address-service";
const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');

import { SanmarOrderschildEntity } from "./entity/sanmar-orders-child";
import { SanmarOrdersChildRepository } from "./repositories/sanmar-orders-child.repo";

@Injectable()
export class SanmarService {


  constructor(
    private dataSource: DataSource,
    private SanOrdersRepo: SanmarOrdersRepository,
    private pdfRepo: SanmarPdfRepo,
    private sanmarCoLineRepo: SanmarCOLineRepository,
    private addressService: AddressService,
    private SanOrdersChildRepo: SanmarOrdersChildRepository



  ) { }


  // async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
  //   // console.log(req, "reqqqqqqqqqqqqq")
  //   const transactionManager = new GenericTransactionManager(this.dataSource)
  //   try {
  //     let saved
  //     const pdfData = [];
  //     await transactionManager.startTransaction()
  //     for (const item of req.SanmarpoItemDetails) {

  //       for (const variant of item.SanmarpoItemVariantDetails) {
  //         const orderData = await this.SanOrdersRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, line: variant.line } })

  //         const entity = new SanmarOrdersEntity();
  //         entity.buyerPo = req.buyerPo
  //         entity.poDate = req.poDate
  //         entity.buyerAddress = req.buyerAddress
  //         entity.shipToAdd = req.shipToAdd
  //         entity.poStyle = item.poStyle
  //         entity.deliveryDate = item.deliveryDate
  //         entity.currency = item.currency
  //         entity.line = variant.line
  //         entity.size = variant.size
  //         entity.color = variant.color
  //         entity.quantity = variant.quantity
  //         entity.unitPrice = variant.unitPrice
  //         entity.unit = variant.unit
  //         pdfData.push(entity)

  //         if (orderData) {
  //           const update = await transactionManager.getRepository(SanmarOrdersEntity).update({ buyerPo: req.buyerPo, poStyle: item.poStyle, line:variant.line },
  //             { poDate: req.poDate, buyerAddress: req.buyerAddress, shipToAdd: req.shipToAdd, deliveryDate: item.deliveryDate,currency:item.currency,size:variant.size,color:variant.color, quantity: variant.quantity, unitPrice: variant.unitPrice,unit:variant.unit })


  //           if (!update.affected) {
  //             throw new Error('Update failed');
  //           }
  //         } else {
  //           saved = await transactionManager.getRepository(SanmarOrdersEntity).save(pdfData)

  //           if (!saved) {
  //             throw new Error('Save failed')
  //           }
  //         }

  //       }
  //     }
  //     await transactionManager.completeTransaction()
  //     return new CommonResponseModel(true, 1, 'Data saved successfully', saved)
  //   } catch (err) {
  //     await transactionManager.releaseTransaction()
  //     return new CommonResponseModel(false, 0, 'Failed', err)
  //   }
  // }

  async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
    const transactionManager = new GenericTransactionManager(this.dataSource);

    try {
      let saved;
      const pdfData = [];

      await transactionManager.startTransaction();

      for (const item of req.SanmarpoItemDetails) {
        for (const variant of item.SanmarpoItemVariantDetails) {
          const orderData = await this.SanOrdersRepo.findOne({
            where: { buyerPo: req.buyerPo, poStyle: item.poStyle, line: variant.line }
          });

          const order = await this.SanOrdersChildRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, line: variant.line }, order: { poVersion: 'DESC' } })


          const entity = new SanmarOrdersEntity();
          entity.buyerPo = req.buyerPo;
          entity.poDate = req.poDate;
          entity.buyerAddress = req.buyerAddress;
          entity.shipToAdd = req.shipToAdd;
          entity.poStyle = item.poStyle;
          entity.deliveryDate = item.deliveryDate;
          entity.currency = item.currency;
          entity.line = variant.line;
          entity.size = variant.size;
          entity.color = variant.color;
          entity.quantity = variant.quantity;
          entity.unitPrice = variant.unitPrice;
          entity.unit = variant.unit;
          pdfData.push(entity);

          if (orderData) {
            // Check if any of the fields have changed
            const fieldsChanged = Object.keys(entity).some(key => orderData[key] !== entity[key]);

            if (fieldsChanged) {
              const update = await transactionManager.getRepository(SanmarOrdersEntity).update(
                { buyerPo: req.buyerPo, poStyle: item.poStyle, line: variant.line },
                { ...entity }
              );

              let po = (order?.poVersion) + 1
              const entitys = new SanmarOrderschildEntity()


              entitys.buyerPo = req.buyerPo;
              entitys.poDate = req.poDate;
              entitys.buyerAddress = req.buyerAddress;
              entitys.shipToAdd = req.shipToAdd;
              entitys.poStyle = item.poStyle;
              entitys.deliveryDate = item.deliveryDate;
              entitys.currency = item.currency;
              entitys.line = variant.line;
              entitys.size = variant.size;
              entitys.color = variant.color;
              entitys.quantity = variant.quantity;
              entitys.unitPrice = variant.unitPrice;
              entitys.unit = variant.unit;
              entitys.poVersion = po
              entitys.orderId = orderData.id

              const savedChild = await transactionManager.getRepository(SanmarOrderschildEntity).save(entitys)


              if (!update.affected) {
                throw new Error('Update failed');
              }
            }
          } else {
            // Only save if the record doesn't exist
            saved = await transactionManager.getRepository(SanmarOrdersEntity).save(entity);
            const entitys = new SanmarOrderschildEntity()

            entitys.buyerPo = req.buyerPo;
            entitys.poDate = req.poDate;
            entitys.buyerAddress = req.buyerAddress;
            entitys.shipToAdd = req.shipToAdd;
            entitys.poStyle = item.poStyle;
            entitys.deliveryDate = item.deliveryDate;
            entitys.currency = item.currency;
            entitys.line = variant.line;
            entitys.size = variant.size;
            entitys.color = variant.color;
            entitys.quantity = variant.quantity;
            entitys.unitPrice = variant.unitPrice;
            entitys.unit = variant.unit;
            entitys.orderId = entity.id

            const savedChild = await await transactionManager.getRepository(SanmarOrderschildEntity).save(entitys)


            if (!saved) {
              throw new Error('Save failed');
            }
          }
        }
      }

      await transactionManager.completeTransaction();
      return new CommonResponseModel(true, 1, 'Data saved successfully', saved);
    } catch (err) {
      await transactionManager.releaseTransaction();
      return new CommonResponseModel(false, 0, 'Failed', err.message || 'Unknown error');
    }
  }


  // async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
  //   const transactionManager = new GenericTransactionManager(this.dataSource);
  //   try {
  //     await transactionManager.startTransaction();
  //     const pdfData = [];

  //     for (const item of req.SanmarpoItemDetails) {
  //       for (const variant of item.SanmarpoItemVariantDetails) {
  //         const orderData = await this.SanOrdersRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size } })
  //         console.log(orderData, "orderData")
  //         const entity = new SanmarOrdersEntity();
  //         entity.buyerPo = req.buyerPo;
  //         entity.poDate = req.poDate;
  //         entity.buyerAddress = req.buyerAddress;
  //         entity.shipToAdd = req.shipToAdd;
  //         entity.poStyle = item.poStyle;
  //         entity.deliveryDate = item.deliveryDate;
  //         entity.currency = item.currency;
  //         entity.size = variant.size;
  //         entity.color = variant.color;
  //         entity.quantity = variant.quantity;
  //         entity.unitPrice = variant.unitPrice;
  //         entity.unit = variant.unit;

  //         pdfData.push(entity);

  //       }
  //     }

  //     const saved = await transactionManager.getRepository(SanmarOrdersEntity).save(pdfData);
  //     await transactionManager.completeTransaction();

  //     return new CommonResponseModel(true, 1, 'Data saved successfully', saved);
  //   } catch (err) {
  //     await transactionManager.releaseTransaction();
  //     return new CommonResponseModel(false, 0, 'Failed', err);
  //   }
  // }

  async updatePath(req: any, buyerPo: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
    console.log(buyerPo, "pppppioooooo");
    console.log(req, "reqqqqqqqqq");

    const entity = new SanmarPdfInfoEntity();
    entity.buyerPo = buyerPo;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = req;
    entity.uploadStatus = "SUCCESS";

    const file = await this.pdfRepo.findOne({ where: { pdfFileName: filePath } });
    if (file) {
      return new CommonResponseModel(false, 0, 'File with the same name already uploaded');
    } else {
      const save = await this.pdfRepo.save(entity);
      if (save) {
        return new CommonResponseModel(true, 1, 'Uploaded successfully', save);
      } else {
        return new CommonResponseModel(false, 0, 'Uploaded failed');
      }
    }
  }



  async getPdfFileInfo(req: any): Promise<CommonResponseModel> {
    try {
      const data = await this.pdfRepo.getPDFInfo(req)
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async getorderDataForInfo(req?: SanmarOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")
    try {
      const details = await this.SanOrdersRepo.getorderDataForInfo(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, sanmarOrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(`${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`,
            new sanmarOrderDataModel(rec.id, rec.buyer_po, rec.po_date, rec.po_style, rec.color, rec.size, rec.delivery_date, rec.ship_to_address, rec.buyer_address, [])
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.unitPrice === rec.unit_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new SanmarSizeWiseModel(rec.size, rec.unit_price, rec.quantity, null, rec.unit, rec.currency));
        }
      }
      const dataModelArray: sanmarOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async getCustomerPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.SanOrdersRepo.getCustomerPoNumber()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async sanmarBot() {
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
      await page.type('#login-form_username', 'sanmar@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'sanmar');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      setTimeout(async () => {
        await page.goto('http://localhost:4200/#/sanmar/sanmar-pdf-upload/', {
          timeout: 100000,
          waitUntil: 'networkidle0'
        })
      }, 1000);

      const directoryPath = 'D:/sanmar-unread/';
      const destinationDirectory = 'D:/sanmar-read/';

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
          await page.goto('http://localhost:4200/#/sanmar/sanmar-pdf-upload/', {
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


  async getorderacceptanceData(req?: SanmarOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")
    try {
      const details = await this.SanOrdersRepo.getorderacceptanceData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, sanmarOrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(`${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`,
            new sanmarOrderDataModel(rec.id, rec.buyer_po, rec.po_date, rec.po_style, rec.color, rec.size, rec.delivery_date, rec.ship_to_address, rec.buyer_address, [], null, null, rec.status)
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.unitPrice === rec.unit_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new SanmarSizeWiseModel(rec.size, rec.unit_price, rec.quantity, null, rec.unit));
        }
      }
      const dataModelArray: sanmarOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }

  async sanmarCoLineCreationReq(req: any): Promise<CommonResponseModel> {
    try {
      // console.log(req,'req')
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      const records = await this.SanOrdersRepo.find({ where: { buyerPo: req.buyerPo, deliveryDate: req.deliveryDate } });
      const empty = [];

      //console.log(rec,'reccccccccc')
      const entity = new SanmarCOLineEntity()
      entity.buyer = req.buyer
      entity.buyerPo = req.buyerPo;
      entity.style = req.style;
      entity.itemNo = req?.itemNo;
      entity.status = 'Open';
      entity.deliveryDate = req.deliveryDate;
      entity.createdUser = 'admin';
      empty.push(entity)

      // console.log(empty,'emptyyyyy')
      const save = await this.sanmarCoLineRepo.save(empty);



      if (save) {
        const update = await this.SanOrdersRepo.update(
          { buyerPo: req.buyerPo, deliveryDate: req.deliveryDate }, // Conditions for updating
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

  async getSanmarCoLineData(req?: SanmarOrderFilter): Promise<CommonResponseModel> {
    const data = await this.sanmarCoLineRepo.getSanmarCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getItem(): Promise<CommonResponseModel> {
    try {
      const data = await this.sanmarCoLineRepo.getItem()
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
    const data = await this.sanmarCoLineRepo.getCoPoNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }


  async getOrderdataForCOline(req: SanmarOrderDetailsReq): Promise<CommonResponseModel> {
    try {
      const data = await this.SanOrdersRepo.find({ where: { buyerPo: req.buyerPo } })
      // po -> destination -> color -> sizes
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, SanmarOrdersEntity>();
      data.forEach(rec => {
        poMap.set(`${rec.buyerPo},${rec.poStyle}, ${rec.deliveryDate}`, rec)
        const dest = rec.shipToAdd


        if (!destinationColSizesMap.has(`${rec.buyerPo},${rec.poStyle}, ${rec.deliveryDate}`)) {
          destinationColSizesMap.set(`${rec.buyerPo},${rec.poStyle}, ${rec.deliveryDate}`, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle}, ${rec.deliveryDate}`).has(dest)) {
          destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle}, ${rec.deliveryDate}`).set(dest, new Map<string, []>());
        }
        if (!destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle}, ${rec.deliveryDate}`).get(dest).has(rec.color)) {
          destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle}, ${rec.deliveryDate}`).get(dest).set(rec.color, []);
        }
        destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle}, ${rec.deliveryDate}`).get(dest).get(rec.color).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
      });

      const coData = []
      // below Added for total unit price and Size count
      let totalUnitPrice = 0;
      let totalSizeCount = 0;
      const sizeSet = new Set<string>();

      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = []
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = []
          colorSizes.forEach((sizes, color) => {
            const sizeArray = []
            sizes.forEach((size) => {
              const sizeObj = new SanmarSizeModel(size.size, size.quantity, size.price);
              sizeArray.push(sizeObj)

              //  below code is  added for  adding of all unit price which pushed to SanmarSizeModel
              sizes.forEach((size) => {
                const sizeKey = `${size.size}-${color}`; // Create a unique key based on size and color

                // Check if the size is unique, then calculate totalUnitPrice
                if (!sizeSet.has(sizeKey)) {
                  console.log(sizeKey, "pppoiiiii")

                  totalUnitPrice += parseFloat(size.price);
                  sizeSet.add(sizeKey); // Add the unique size to the set
                  totalSizeCount += 1;  // for total size count for Avg of unit price

                }

              });

            })


            const col = new SanmarColorModel(color, sizeArray);
            ColArray.push(col)

            sizeSet.clear();
          });


          const des = new SanmarDestinationModel(dest, ColArray);
          desArray.push(des)
        });
        const poInfo = poMap.get(poNumber)
        console.log(totalSizeCount, "count")
        console.log(totalUnitPrice, "totalUnitPrice")


        const averageUnitPrice = totalSizeCount > 0 ? totalUnitPrice / totalSizeCount : 0;  // calculation of Avg unit price

        const co = new SanmarCoLinereqModels(poInfo.buyerPo, poInfo.poStyle, averageUnitPrice.toFixed(2).toString(), poInfo.deliveryDate, poInfo.currency, desArray);
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

  async updateItemNo(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const update = await this.sanmarCoLineRepo.update(
        { id: Number(req.id) },
        { itemNo: req.itemNo }
      );

      if (update) {
        return new CommonResponseModel(true, 1, "Updated Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Something Went Wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while updating ItemNo", error);
    }
  }


  async deleteCoLine(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const deletedItem = await this.sanmarCoLineRepo.delete({ id: Number(req.id) });

      if (deletedItem && deletedItem.affected) {
        return new CommonResponseModel(true, 1, "Deleted Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Something Went Wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
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

  async createCOline(req: any): Promise<CommonResponseModel> {
    const poDetails = await this.sanmarCoLineRepo.getDataforCOLineCreation();
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
        if (po.buyer === 'SanMar Corporation') {
          const response = await this.getOrderdataForCOline({ buyerPo: po.buyer_po })
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
          buyerAddress = addressData?.buyerCode ? addressData?.buyerCode : 10;
          deliveryAddress = addressData?.deliveryCode ? addressData?.deliveryCode : 11
          buyerValue1 = "SAN-SANMAR CORPORATION"
          buyerValue2 = "SAN00013-SANMAR CORPORATION"
          agent = "-NA"
          pkgTerms = "BOX-BOXES"
          paymentTerms = "030-Trde Card30 Day"
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
            } else if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
              // console.log(dest.colors[1],'kuuuuuu')
              // console.log(dest.colors[1].sizes,'kuuuuuusizes')

              await driver.executeScript('arguments[0].click();', tab);
              // console.log(dest.colors,'kuuuuuu')
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
                    } else {
                      // update added for if sizes mismatch
                      const update = await this.sanmarCoLineRepo.update({ buyerPo: po.buyer_po }, { status: 'Failed', errorMsg: 'NO matching Size found' });
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
          const update = await this.sanmarCoLineRepo.update({ buyerPo: po.buyer_po }, { status: 'Failed', errorMsg: alertText });
          await this.updateCOLineStatus({buyerPo: po.buyerPo, status: StatusEnum.FAILED})
          await alert.accept();
          await driver.sleep(5000)
          await driver.navigate().refresh();
          await driver.quit();
        } else {
          await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
          const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
          const coNo = await coNoElement.getAttribute('value');
          const currentDate = new Date();
          const day = currentDate.getDate().toString().padStart(2, '0');
          const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
          const year = currentDate.getFullYear().toString().slice(-2);
          const currentDateFormatted = `${day}-${month}-${year}`;
          if (coNo) {
            const update = await this.sanmarCoLineRepo.update({ buyerPo: po.buyer_po }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted, errorMsg: "-" });
            await this.updateCOLineStatus({buyerPo: po.buyer_po, status: StatusEnum.SUCCESS})
            // await driver.navigate().refresh();
            await driver.sleep(10000)
          } else {
            const update = await this.sanmarCoLineRepo.update({ buyerPo: po.buyer_po }, { status: 'Failed' });
            await this.updateCOLineStatus({buyerPo: po.buyer_po, status: StatusEnum.FAILED})
            // await driver.navigate().refresh();
            await driver.sleep(10000)
          }
        }
      }
      return new CommonResponseModel(true, 1, `COline created successfully`)
    } catch (error) {
      console.log(error, 'error');
      if (error.name === 'TimeoutError') {
        const update = await this.sanmarCoLineRepo.update({ buyerPo: poDetails[0].buyer_po }, { status: 'Failed', errorMsg: 'NO matching Color found' });
        await this.updateCOLineStatus({buyerPo: poDetails[0].buyer_po, status: StatusEnum.FAILED})
        driver.quit()
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

  async getordercomparationData(req?: SanmarOrderFilter): Promise<CommonResponseModel> {
    try {
      const Originaldata = await this.SanOrdersRepo.getordercomparationData(req)
      if (Originaldata.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const compareModel: SanmarCompareModel[] = []
      for (const rec of Originaldata) {
        const childData = await this.SanOrdersChildRepo.find({
          where: {
            buyerPo: rec.buyer_po, poStyle: rec.po_style, color: rec.color, size: rec.size
          }, order: { id: 'DESC' }, take: 1, skip: 1
        })
        if (childData.length > 0) {
          const oldData = childData[0];
          console.log(childData, "ppppp")

          if (
            oldData.unitPrice !== rec.unit_price ||
            oldData.deliveryDate !== rec.delivery_date ||
            oldData.quantity !== rec.quantity
          ) {

            compareModel.push(new SanmarCompareModel(rec.buyer_po, rec.po_style, rec.color, rec.size, oldData.unitPrice, rec.unit_price, oldData.deliveryDate, rec.delivery_date, oldData.quantity, rec.quantity));
          }
        }
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

  async updateStatusInOrder(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqOpenStatus")
    try {
      const update = await this.SanOrdersRepo.update(
        { buyerPo: req.buyerPo },
        { status: StatusEnum.OPEN }
      );
      if (update) {
        return new CommonResponseModel(true, 1, "Updated Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
    }
  }

  async updateCOLineStatus(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqOpenStatus")
    try {
      const update = await this.SanOrdersRepo.update(
        {buyerPo:req.buyerPo},
        {status:req.status}
      );
      if (update) {
        return new CommonResponseModel(true, 1, "Updated Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
    }
  }



}