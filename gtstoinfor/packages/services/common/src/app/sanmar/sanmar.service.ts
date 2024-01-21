import { Injectable } from "@nestjs/common";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource } from "typeorm";
import { SanmarOrdersRepository } from "./repositories/sanmar-orders.repo";
import { CommonResponseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarCoLinereqModels, SanmarColorModel, SanmarDestinationModel, SanmarOrderFilter, SanmarSizeModel, SanmarSizeWiseModel, StatusEnum, sanmarOrderDataModel } from "@project-management-system/shared-models";
import { SanmarOrdersEntity } from "./entity/sanmar-orders.entity";
import { SanmarPdfInfoEntity } from "./entity/sanmar-pdf.entity";
import { SanmarPdfRepo } from "./repositories/sanmar-pdf.repo";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { SanmarCOLineEntity } from "./entity/sanmar-co-line.entity";
import { SanmarCOLineRepository } from "./repositories/sanmar-co-line.repository";
import { SanmarOrderDetailsReq } from "./dto/sanmar-order-details-req";

@Injectable()
export class SanmarService {


  constructor(
    private dataSource: DataSource,
    private SanOrdersRepo: SanmarOrdersRepository,
    private pdfRepo: SanmarPdfRepo,
    private sanmarCoLineRepo: SanmarCOLineRepository


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
  
              if (!update.affected) {
                throw new Error('Update failed');
              }
            }
          } else {
            // Only save if the record doesn't exist
            saved = await transactionManager.getRepository(SanmarOrdersEntity).save(entity);
  
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



  async getPdfFileInfo(): Promise<CommonResponseModel> {
    try {
      const data = await this.pdfRepo.getPDFInfo()
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
  } async getOrderdataForCOline(req: SanmarOrderDetailsReq): Promise<CommonResponseModel> {
    try {
      const data = await this.SanOrdersRepo.find({ where: { buyerPo: req.buyerPo } })
      let destinationMap = new Map<string, SanmarDestinationModel>();
      // po -> destination -> color -> sizes
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, SanmarOrdersEntity>();
      data.forEach(rec => {
        poMap.set(`${rec.buyerPo},${rec.poStyle},${rec.color}, ${rec.deliveryDate}`, rec)
        const dest = rec.shipToAdd
        // console.log(destCountry,"hirrrrrrrrrrrrrrrrrr")

        // const parts = rec.shipToAdd.split(',')
        // const destAdd = parts[2].trim();
        // const dest = destAdd;

        // const destCountry = rec.shipToAddress.slice(-2).trim();
        // const parts = rec.shipToAddress.split(',')
        // const destAdd = parts[0].trim();
        // const dest = destAdd + ',' + destCountry;

        if (!destinationColSizesMap.has(`${rec.buyerPo},${rec.poStyle},${rec.color}, ${rec.deliveryDate}`)) {
          destinationColSizesMap.set(`${rec.buyerPo},${rec.poStyle},${rec.color}, ${rec.deliveryDate}`, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle},${rec.color}, ${rec.deliveryDate}`).has(dest)) {
          destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle},${rec.color}, ${rec.deliveryDate}`).set(dest, new Map<string, []>());
        }
        if (!destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle},${rec.color}, ${rec.deliveryDate}`).get(dest).has(rec.color)) {
          destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle},${rec.color}, ${rec.deliveryDate}`).get(dest).set(rec.color, []);
        }
        destinationColSizesMap.get(`${rec.buyerPo},${rec.poStyle},${rec.color}, ${rec.deliveryDate}`).get(dest).get(rec.color).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
      });
      const coData = []
      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = []
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = []
          colorSizes.forEach((sizes, color) => {
            const sizeArray = []
            sizes.forEach((size) => {
              const sizeObj = new SanmarSizeModel(size.size, size.quantity, size.price);
              sizeArray.push(sizeObj)
            })
            const col = new SanmarColorModel(color, sizeArray);
            ColArray.push(col)
          });
          const des = new SanmarDestinationModel(dest, ColArray);
          desArray.push(des)
        });
        const poInfo = poMap.get(poNumber)
        const co = new SanmarCoLinereqModels(poInfo.buyerPo, poInfo.poStyle, poInfo.unitPrice, poInfo.deliveryDate, poInfo.currency, desArray);
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