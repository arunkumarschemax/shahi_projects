import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CoLineRequest,CommonResponseModel, EddieOrderFilter, EddieSizeWiseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarCoLinereqModels, SanmarColorModel, SanmarCompareModel, SanmarDestinationModel, SanmarOrderFilter, SanmarSizeModel, SanmarSizeWiseModel, StatusEnum, eddieOrderDataModel, sanmarOrderDataModel } from "@project-management-system/shared-models";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { EddieOrdersRepository } from "./repositories/eddie-orders.repo";
import { EddieOrdersEntity } from "./entities/eddie-orders.entity";
import { EddiePdfInfoEntity } from "./entities/eddie-pdf.entity";
import { EddiePdfRepo } from "./repositories/eddie-pdf.repo";
import { EddieCOLineEntity } from "./entities/eddie-co-line.entity";
import { EddieCOLineRepository } from "./repositories/eddie-co-line.repository";

const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');



@Injectable()
export class EddieService {


  constructor(
    private dataSource: DataSource,
    private EddieOrdersRepo: EddieOrdersRepository,
    private pdfRepo: EddiePdfRepo,
    private eddieCoLineRepo:EddieCOLineRepository
   

  ) { }

  async saveEddieOrder(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqqqqqqqqqqqqq")
    // const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      // await transactionManager.startTransaction()
      for (const item of req.EddiepoItemDetails) {
        const match = item.poLine.match(/\d+/);
        console.log(match, "match");
        // Check if a match is found and convert it to an integer
        // const poLine = match ? parseInt(match[0], 10) : null;
        const poLine = match

        console.log(poLine, "poLine")
        for (const variant of item.EddiepoItemVariantDetails) {
          const orderData = await this.EddieOrdersRepo.findOne({ where: { poNumber: req.poNumber, poLine: poLine, size: variant.size } })
          console.log(orderData, "orderData")
          const entity = new EddieOrdersEntity();
          entity.poNumber = req.poNumber
          entity.poDate = req.poDate
          entity.deliveryDate = req.deliveryDate
          entity.exFactoryDate = req.exFactoryDate
          // entity.incoterm = req.incoterm
          // entity.shipToAdd = req.shipToAdd
          // entity.manufacture = req.manufacture
          entity.buyerAddress = req.buyerAddress
          entity.deliveryAddress = req.deliveryAddress
          entity.currency = req.currency
          // entity.paymentTerms = req.paymentTerms
          // entity.shipmentMode = req.shipmentMode


          entity.poLine = item.poLine
          entity.buyerItem = item.buyerItem
          // entity.shortDescription = item.shortDescription
          entity.color = item.color
          // entity.currency = item.currency

          entity.sizeCode = variant.sizeCode
          entity.size = variant.size
          entity.upc = variant.upc
          entity.sku = variant.sku
          entity.quantityPerInnerPack = variant.quantityPerInnerPack
          entity.retailPrice = variant.retailPrice
          entity.quantity = variant.quantity
          entity.unit = variant.unit
          entity.unitCost = variant.unitCost
          entity.cost = variant.cost


          if (orderData) {
            const update = await this.EddieOrdersRepo.update({ poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, {})
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.EddieOrdersRepo.save(entity)
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
    const entity = new EddiePdfInfoEntity();
    entity.poNumber = poNumber;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = req;
    entity.uploadStatus = "SUCCESS";
    // console.log(entity.fileData, "fileData")

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

  async getorderacceptanceData(req?: EddieOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")
    try {
      const details = await this.EddieOrdersRepo.getorderacceptanceData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, eddieOrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(`${rec.po_line},${rec.style},${rec.po_number},${rec.delivery_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.style},${rec.po_number},${rec.delivery_date},${rec.color}`,
            new eddieOrderDataModel(rec.id, rec.po_number, rec.po_date,rec.incoterm, rec.po_style, rec.color, rec.delivery_date, rec.ship_to_add, rec.buyer_address,rec.manufacture,rec.shipment_mode,rec.payment_terms,rec.po_line,rec.buyer_item,rec.short_description,rec.currency,rec.retail_price,rec.status,[])
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.style},${rec.po_number},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.retailPrice === rec.retail_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new EddieSizeWiseModel(rec.size_code,rec.size,rec.upc,rec.sku,rec.quantity_per_inner_pack,rec.retail_price,rec.quantity,rec.unit_cost,rec.cost,rec.unit));
        }
      }
      const dataModelArray: eddieOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }

  async getPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.EddieOrdersRepo.getPoNumber()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async EddieBot() {
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
      await page.type('#login-form_username', 'eddiebauer@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'eddiebauer');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      setTimeout(async () => {
        await page.goto('http://localhost:4200/#/eddiebauer/eddiebauer-pdf-upload/', {
          timeout: 100000,
          waitUntil: 'networkidle0'
        })
      }, 1000);

      const directoryPath = 'D:/eddie-unread/';
      const destinationDirectory = 'D:/eddie-read/';

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
        await page.waitForTimeout(15000)

        setTimeout(async () => {
          await page.goto('http://localhost:4200/#/eddiebauer/eddiebauer-pdf-upload/', {
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


  async coLineCreationReq(req: any): Promise<CommonResponseModel> {
    try {
      // console.log(req,'req')
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      const records = await this.EddieOrdersRepo.find({ where: { poNumber: req.poNumber} });
      const empty = [];

      //console.log(rec,'reccccccccc')
      const entity = new EddieCOLineEntity()
      entity.buyer = req.buyer
      entity.poNumber = req.poNumber;
      // entity.style = req.style;
      entity.itemNo = req?.itemNo;
      entity.status = 'Open';
      // entity.deliveryDate = req.deliveryDate;
      entity.createdUser = 'admin';
      empty.push(entity)

      // console.log(empty,'emptyyyyy')
      const save = await this.eddieCoLineRepo.save(empty);



      if (save) {
        const update = await this.EddieOrdersRepo.update(
          { poNumber: req.poNumber}, // Conditions for updating
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

  async getCoLineData(req?:EddieOrderFilter ): Promise<CommonResponseModel> {
    const data = await this.eddieCoLineRepo.getCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getCoPoNumber(): Promise<CommonResponseModel> {
    const data = await this.eddieCoLineRepo.getCoPoNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getItem(): Promise<CommonResponseModel> {
    try {
      const data = await this.eddieCoLineRepo.getItem()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }
}