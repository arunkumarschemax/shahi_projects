import { Injectable } from "@nestjs/common";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource } from "typeorm";
import { SanmarOrdersRepository } from "./repositories/sanmar-orders.repo";
import { CommonResponseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarOrderFilter, SanmarSizeWiseModel, StatusEnum, sanmarOrderDataModel } from "@project-management-system/shared-models";
import { SanmarOrdersEntity } from "./entity/sanmar-orders.entity";
import { SanmarPdfInfoEntity } from "./entity/sanmar-pdf.entity";
import { SanmarPdfRepo } from "./repositories/sanmar-pdf.repo";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { SanmarCOLineEntity } from "./entity/sanmar-co-line.entity";
import { SanmarCOLineRepository } from "./repositories/sanmar-co-line.repository";

@Injectable()
export class SanmarService {


  constructor(
    private dataSource: DataSource,
    private SanOrdersRepo: SanmarOrdersRepository,
    private pdfRepo: SanmarPdfRepo,
    private sanmarCoLineRepo:SanmarCOLineRepository


  ) { }


  // async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
  //   console.log(req, "reqqqqqqqqqqqqq")
  //   try {
  //     let saved
  //     for (const item of req.SanmarpoItemDetails) {
  //       const match = item.poStyle.match(/\d+/);
  //       console.log(match, "match");
  //       const poStyle = match

  //       console.log(poStyle, "poLine")
  //       for (const variant of item.SanmarpoItemVariantDetails) {
  //         const orderData = await this.SanOrdersRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size } })
  //         console.log(orderData, "orderData")
  //         const entity = new SanmarOrdersEntity();
  //         entity.buyerPo = req.buyerPo
  //         entity.poDate = req.poDate
  //         entity.buyerAddress = req.buyerAddress
  //         entity.shipToAdd = req.shipToAdd
  //         entity.poStyle = item.poStyle
  //         entity.deliveryDate = item.deliveryDate
  //         entity.size = variant.size
  //         entity.color = variant.color
  //         entity.quantity = variant.quantity
  //         entity.unitPrice = variant.unitPrice

  //         if (orderData) {
  //           const update = await this.SanOrdersRepo.update({ buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size },
  //             { poDate: req.poDate, buyerAddress: req.buyerAddress, shipToAdd: req.shipToAdd, deliveryDate: item.deliveryDate, poStyle: variant.poStyle, quantity: variant.quantity, unitPrice: variant.unitPrice })
  //           if (!update.affected) {
  //             throw new Error('Update failed');
  //           }
  //         } else {
  //           saved = await this.SanOrdersRepo.save(entity)
  //           // const savedChild = await transactionManager.getRepository(RLOrdersEntity).save(entity)
  //           if (!saved) {
  //             throw new Error('Save failed')
  //           }
  //         }
  //       }
  //     }
  //     // await transactionManager.completeTransaction()
  //     return new CommonResponseModel(true, 1, 'Data saved successfully', saved)
  //   } catch (err) {
  //     return new CommonResponseModel(false, 0, 'Failed', err)
  //   }
  // }

  async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
    // console.log(req, "reqqqqqqqqqqqqq")
    const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      const pdfData = [];
      await transactionManager.startTransaction()
      for (const item of req.SanmarpoItemDetails) {
        const match = item.poStyle.match(/\d+/);
        // console.log(match, "match");
        // console.log(item, "item");
        const poStyle = match

        console.log(poStyle, "poStyle")
        for (const variant of item.SanmarpoItemVariantDetails) {
          const orderData = await this.SanOrdersRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size } })
          // const order = await this.HbOrdersChildRepo.findOne({ where: { custPo: req.custPo, color: item.color, size: variant.size }, order: { poVersion: 'DESC' } })
          // console.log(orderData, "orderData")
          // console.log(variant, "variant");
          // console.log(order, "order");

          const entity = new SanmarOrdersEntity();
          entity.buyerPo = req.buyerPo
          entity.poDate = req.poDate
          entity.buyerAddress = req.buyerAddress
          entity.shipToAdd = req.shipToAdd
          entity.poStyle = item.poStyle
          entity.deliveryDate = item.deliveryDate
          entity.currency = item.currency
          entity.size = variant.size
          entity.color = variant.color
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice
          entity.unit = variant.unit
          pdfData.push(entity)


          if (orderData) {


            const update = await transactionManager.getRepository(SanmarOrdersEntity).update({ buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size },
              { poDate: req.poDate, buyerAddress: req.buyerAddress, shipToAdd: req.shipToAdd, deliveryDate: item.deliveryDate,currency:item.currency,color:variant.color, quantity: variant.quantity, unitPrice: variant.unitPrice,unit:variant.unit })
            // let po = (order?.poVersion) + 1

            // const entitys = new HbOrdersChildEntity()
            // entitys.custPo = req.custPo
            // entitys.exitFactoryDate = req.exitFactoryDate
            // entitys.shipToAdd = req.shipToAdd
            // entitys.style = item.style
            // entitys.color = item.color
            // entitys.size = variant.size
            // entitys.quantity = variant.quantity
            // entitys.unitPrice = variant.unitPrice
            // entitys.poVersion = po
            // entitys.orderId = orderData.id

            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await transactionManager.getRepository(SanmarOrdersEntity).save(pdfData)

            // const entitys = new HbOrdersChildEntity()
            // entitys.custPo = req.custPo
            // entitys.exitFactoryDate = req.exitFactoryDate
            // entitys.shipToAdd = req.shipToAdd
            // entitys.style = item.style
            // entitys.color = item.color
            // entitys.size = variant.size
            // entitys.quantity = variant.quantity
            // entitys.unitPrice = variant.unitPrice
            // entitys.orderId = entity.id



            // const savedChild = await await transactionManager.getRepository(HbOrdersChildEntity).save(entitys)
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
          sizeWiseData.push(new SanmarSizeWiseModel(rec.size, rec.unit_price, rec.quantity,null,rec.unit,rec.currency));
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
            new sanmarOrderDataModel(rec.id, rec.buyer_po, rec.po_date, rec.po_style, rec.color, rec.size, rec.delivery_date, rec.ship_to_address, rec.buyer_address, [],null,null,rec.status)
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.unitPrice === rec.unit_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new SanmarSizeWiseModel(rec.size, rec.unit_price, rec.quantity,null,rec.unit));
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
        entity.itemNo =  req?.itemNo;
        entity.status = 'Open';
        entity.deliveryDate=req.deliveryDate;
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

}