import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CoLineRequest, CommonResponseModel, EddieCoLinereqModels, EddieColorModel, EddieDestinationModel, EddieOrderFilter, EddieSizeModel, EddieSizeWiseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarCoLinereqModels, SanmarColorModel, SanmarCompareModel, SanmarDestinationModel, SanmarOrderFilter, SanmarSizeModel, SanmarSizeWiseModel, StatusEnum, eddieOrderDataModel, sanmarOrderDataModel } from "@project-management-system/shared-models";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { EddieOrdersRepository } from "./repositories/eddie-orders.repo";
import { EddieOrdersEntity } from "./entities/eddie-orders.entity";
import { EddiePdfInfoEntity } from "./entities/eddie-pdf.entity";
import { EddiePdfRepo } from "./repositories/eddie-pdf.repo";
import { EddieCOLineEntity } from "./entities/eddie-co-line.entity";
import { EddieCOLineRepository } from "./repositories/eddie-co-line.repository";
import { ItemNoDtos } from "../sanmar/dto/sanmar-item-no.dto";
import { EddieDetailsReq } from "./dto/eddie-order-details-req";
import { EddieOrdersChildRepository } from "./repositories/eddie-orders-child.repo";
import { EddieChildEntity } from "./entities/eddie-orders-child-entity";

const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');



@Injectable()
export class EddieService {


  constructor(
    private dataSource: DataSource,
    private EddieOrdersRepo: EddieOrdersRepository,
    private pdfRepo: EddiePdfRepo,
    private eddieCoLineRepo: EddieCOLineRepository,
    private eddieOrdersChildRepository: EddieOrdersChildRepository


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
          const order = await this.eddieOrdersChildRepository.findOne({ where: { poNumber: req.PoNumber, poLine: poLine, size: variant.size }, order: { poVersion: 'DESC' } })
          console.log(orderData, "orderData")
          const entity = new EddieOrdersEntity();
          entity.poNumber = req.poNumber
          // entity.poDate = req.poDate
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
            const update = await this.EddieOrdersRepo.update({ poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, {
              deliveryDate: req.deliveryDate, exFactoryDate: req.exFactoryDate, buyerAddress: req.buyerAddress, deliveryAddress: req.deliveryAddress,
              currency: req.currency, buyerItem: item.buyerItem, color: item.color,
              sizeCode: variant.sizeCode,
              upc: variant.upc,
              sku: variant.sku,
              quantityPerInnerPack: variant.quantityPerInnerPack,
              retailPrice: variant.retailPrice,
              quantity: variant.quantity,
              unit: variant.unit,
              unitCost: variant.unitCost,
              cost: variant.cost,

            })
            let po = parseInt(order?.poVersion) + 1
            const entitys = new EddieChildEntity()

            entitys.poNumber = req.poNumber
            entitys.deliveryDate = req.deliveryDate
            entitys.exFactoryDate = req.exFactoryDate
            entitys.buyerAddress = req.buyerAddress
            entitys.deliveryAddress = req.deliveryAddress
            entitys.currency = req.currency

            entitys.poLine = item.poLine
            entitys.buyerItem = item.buyerItem
            entitys.color = item.color

            entitys.sizeCode = variant.sizeCode
            entitys.size = variant.size
            entitys.upc = variant.upc
            entitys.sku = variant.sku
            entitys.quantityPerInnerPack = variant.quantityPerInnerPack
            entitys.retailPrice = variant.retailPrice
            entitys.quantity = variant.quantity
            entitys.unit = variant.unit
            entitys.unitCost = variant.unitCost
            entitys.cost = variant.cost

            entitys.poVersion = po.toString()
            const savedChild = await this.eddieOrdersChildRepository.save(entitys)

            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.EddieOrdersRepo.save(entity)
            const entitys = new EddieChildEntity()

            entitys.poNumber = req.poNumber
            entitys.deliveryDate = req.deliveryDate
            entitys.exFactoryDate = req.exFactoryDate
            entitys.buyerAddress = req.buyerAddress
            entitys.deliveryAddress = req.deliveryAddress
            entitys.currency = req.currency

            entitys.poLine = item.poLine
            entitys.buyerItem = item.buyerItem
            entitys.color = item.color

            entitys.sizeCode = variant.sizeCode
            entitys.size = variant.size
            entitys.upc = variant.upc
            entitys.sku = variant.sku
            entitys.quantityPerInnerPack = variant.quantityPerInnerPack
            entitys.retailPrice = variant.retailPrice
            entitys.quantity = variant.quantity
            entitys.unit = variant.unit
            entitys.unitCost = variant.unitCost
            entitys.cost = variant.cost

            const savedChild = await this.eddieOrdersChildRepository.save(entitys)

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


  // async saveCentricOrder(req: any): Promise<CommonResponseModel> {
  //   // const transactionManager = new GenericTransactionManager(this.dataSource)
  //   try {
  //     let saved
  //     // await transactionManager.startTransaction()
  //     for (const item of req.CentricpoItemDetails) {
  //       const match = item.poLine.match(/\d+/);
  //       // Check if a match is found and convert it to an integer
  //       // const poLine = match ? parseInt(match[0], 10) : null;
  //       const poLine = match


  //       for (const variant of item.CentricpoItemVariantDetails) {
  //         const orderData = await this.Repo.findOne({ where: { poNumber: req.poNumber, poLine: poLine, size: variant.size } })
  //         const order = await this.childrepo.findOne({ where: { poNumber: req.PoNumber, poLine: poLine, size: variant.size }, order: { poVersion: 'DESC' } })
  //         // console.log(order,'NNNNNNNNNN')
  //         const entity = new CentricEntity();
  //         entity.poNumber = req.poNumber
  //         entity.shipment = req.shipment
  //         entity.season = req.season
  //         entity.portOfExport = req.portOfExport
  //         entity.portOfEntry = req.portOfEntry
  //         entity.Refrence = req.Refrence
  //         entity.paymentTermDescription = req.paymentTermDescription
  //         entity.specialInstructions = req.specialInstructions
  //         entity.division = req.division
  //         entity.incoterm = req.incoterm
  //         entity.shipToAdd = req.shipToAdd
  //         entity.manufacture = req.manufacture
  //         entity.poDate = req.poDate
  //         entity.buyerAddress = req.buyerAddress


  //         entity.poLine = item.poLine
  //         entity.material = item.material
  //         entity.color = item.color
  //         entity.gender = item.gender
  //         entity.shortDescription = item.shortDescription
  //         entity.packMethod = item.packMethod
  //         entity.vendorBookingFlag = item.vendorBookingFlag
  //         entity.ppkupc = item.ppkupc
  //         entity.currency = item.currency
  //         entity.totalQuantity = item.totalQuantity
  //         entity.style = item.style
  //         entity.poType = item.poType

  //         entity.size = variant.size
  //         entity.upc = variant.upc
  //         entity.label = variant.label
  //         entity.quantity = variant.quantity
  //         entity.unitPrice = variant.unitPrice
  //         entity.exFactory = variant.exFactory
  //         entity.exPort = variant.exPort
  //         entity.deliveryDate = variant.deliveryDate
  //         entity.retialPrice = variant.retialPrice
  //         entity.comptMaterial = variant.comptMaterial
  //         entity.ratio = variant.ratio
  //         entity.eachPerCarton = variant.eachPerCarton


  //         if (orderData) {

  //           const update = await this.Repo.update({ poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, {

  //             shipment: req.shipment,
  //             season: req.season,
  //             portOfExport: req.portOfExport,
  //             portOfEntry: req.portOfEntry,
  //             Refrence: req.Refrence,
  //             paymentTermDescription: req.paymentTermDescription,
  //             specialInstructions: req.specialInstructions,
  //             division: req.division,
  //             incoterm: req.incoterm,
  //             shipToAdd: req.shipToAdd,
  //             manufacture: req.manufacture,
  //             poDate: req.poDate,
  //             buyerAddress: req.buyerAddress,


  //             material: item.material,
  //             color: item.color,
  //             gender: item.gender,
  //             shortDescription: item.shortDescription,
  //             packMethod: item.packMethod,
  //             vendorBookingFlag: item.vendorBookingFlag,
  //             ppkupc: item.ppkupc,
  //             currency: item.currency,
  //             totalQuantity: item.totalQuantity,
  //             style: item.style,

  //             upc: variant.upc,
  //             label: variant.label,
  //             quantity: variant.quantity,
  //             unitPrice: variant.unitPrice,
  //             exFactory: variant.exFactory,
  //             exPort: variant.exPort,
  //             deliveryDate: variant.deliveryDate,
  //             retialPrice: variant.retialPrice,
  //             comptMaterial: variant.comptMaterial,
  //             ratio: variant.ratio,
  //             eachPerCarton: variant.eachPerCarton,

  //           })
  //           let po = parseInt(order?.poVersion) + 1

  //           // console.log(po,',,,,,,')
  //           const entitys = new CentricChildEntity();
  //           entitys.poNumber = req.poNumber
  //           entitys.shipment = req.shipment
  //           entitys.season = req.season
  //           entitys.portOfExport = req.portOfExport
  //           entitys.portOfEntry = req.portOfEntry
  //           entitys.Refrence = req.Refrence
  //           entitys.paymentTermDescription = req.paymentTermDescription
  //           entitys.specialInstructions = req.specialInstructions
  //           entitys.division = req.division
  //           entitys.incoterm = req.incoterm
  //           entitys.shipToAdd = req.shipToAdd
  //           entitys.manufacture = req.manufacture
  //           entitys.poDate = req.poDate
  //           entitys.buyerAddress = req.buyerAddress


  //           entitys.poLine = item.poLine
  //           entitys.material = item.material
  //           entitys.color = item.color
  //           entitys.gender = item.gender
  //           entitys.shortDescription = item.shortDescription
  //           entitys.packMethod = item.packMethod
  //           entitys.vendorBookingFlag = item.vendorBookingFlag
  //           entitys.ppkupc = item.ppkupc
  //           entitys.currency = item.currency
  //           entitys.totalQuantity = item.totalQuantity
  //           entitys.style = item.style
  //           entitys.poType = item.poType

  //           entitys.size = variant.size
  //           entitys.upc = variant.upc
  //           entitys.label = variant.label
  //           entitys.quantity = variant.quantity
  //           entitys.unitPrice = variant.unitPrice
  //           entitys.exFactory = variant.exFactory
  //           entitys.exPort = variant.exPort
  //           entitys.deliveryDate = variant.deliveryDate
  //           entitys.retialPrice = variant.retialPrice
  //           entitys.comptMaterial = variant.comptMaterial
  //           entitys.ratio = variant.ratio
  //           entitys.eachPerCarton = variant.eachPerCarton
  //           entitys.orderId = orderData.id

  //           entitys.poVersion = po.toString()
  //           const savedChild = await this.childrepo.save(entitys)

  //           if (!update.affected) {
  //             throw new Error('Update failed');
  //           }
  //         } else {
  //           saved = await this.Repo.save(entity)
  //           const entitys = new CentricChildEntity();
  //           entitys.poNumber = req.poNumber
  //           entitys.shipment = req.shipment
  //           entitys.season = req.season
  //           entitys.portOfExport = req.portOfExport
  //           entitys.portOfEntry = req.portOfEntry
  //           entitys.Refrence = req.Refrence
  //           entitys.paymentTermDescription = req.paymentTermDescription
  //           entitys.specialInstructions = req.specialInstructions
  //           entitys.division = req.division
  //           entitys.incoterm = req.incoterm
  //           entitys.shipToAdd = req.shipToAdd
  //           entitys.manufacture = req.manufacture
  //           entitys.poDate = req.poDate
  //           entitys.buyerAddress = req.buyerAddress


  //           entitys.poLine = item.poLine
  //           entitys.material = item.material
  //           entitys.color = item.color
  //           entitys.gender = item.gender
  //           entitys.shortDescription = item.shortDescription
  //           entitys.packMethod = item.packMethod
  //           entitys.vendorBookingFlag = item.vendorBookingFlag
  //           entitys.ppkupc = item.ppkupc
  //           entitys.currency = item.currency
  //           entitys.totalQuantity = item.totalQuantity
  //           entitys.style = item.style
  //           entitys.poType = item.poType

  //           entitys.size = variant.size
  //           entitys.upc = variant.upc
  //           entitys.label = variant.label
  //           entitys.quantity = variant.quantity
  //           entitys.unitPrice = variant.unitPrice
  //           entitys.exFactory = variant.exFactory
  //           entitys.exPort = variant.exPort
  //           entitys.deliveryDate = variant.deliveryDate
  //           entitys.retialPrice = variant.retialPrice
  //           entitys.comptMaterial = variant.comptMaterial
  //           entitys.ratio = variant.ratio
  //           entitys.eachPerCarton = variant.eachPerCarton
  //           entitys.orderId = entity.id
  //           const savedChild = await this.childrepo.save(entitys)


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
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`,
            new eddieOrderDataModel(rec.id, rec.po_number, rec.incoterm, rec.color, rec.delivery_date, rec.delivery_address, rec.buyer_address, rec.manufacture, rec.shipment_mode, rec.payment_terms, rec.po_line, rec.buyer_item, rec.short_description, rec.currency, rec.retail_price, rec.status, rec.ex_factory_date, [])
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.retailPrice === rec.retail_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new EddieSizeWiseModel(rec.size_code, rec.size, rec.upc, rec.sku, rec.quantity_per_inner_pack, rec.retail_price, rec.quantity, rec.unit_cost, rec.cost, rec.unit));
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
      const records = await this.EddieOrdersRepo.find({ where: { poNumber: req.poNumber, deliveryDate: req.deliveryDate } });
      const uniquePoLines = [...new Set(records.map((rec) => rec.poLine))];
      const empty = [];

      //console.log(rec,'reccccccccc')
      const entity = new EddieCOLineEntity()
      entity.poLine = uniquePoLines.join(',');
      entity.buyer = req.buyer
      entity.poNumber = req.poNumber;
      // entity.style = req.style;
      entity.itemNo = req?.itemNo;
      entity.status = 'Open';
      entity.deliveryDate = req.deliveryDate;
      entity.createdUser = 'admin';
      empty.push(entity)

      // console.log(empty,'emptyyyyy')
      const save = await this.eddieCoLineRepo.save(empty);



      if (save) {
        const update = await this.EddieOrdersRepo.update(
          { poNumber: req.poNumber, deliveryDate: req.deliveryDate }, // Conditions for updating
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

  async getCoLineData(req?: EddieOrderFilter): Promise<CommonResponseModel> {
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

  async getordersDataInfo(req?: EddieOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.EddieOrdersRepo.getordersDataInfo(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, eddieOrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number}`,
            new eddieOrderDataModel(rec.id, rec.po_number, rec.incoterm, rec.color, rec.delivery_date, rec.delivery_address, rec.buyer_address, rec.manufacture, rec.shipment_mode, rec.payment_terms, rec.po_line, rec.buyer_item, rec.short_description, rec.currency, rec.retail_price, rec.status, rec.ex_factory_date, [])
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.retailPrice === rec.retail_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new EddieSizeWiseModel(rec.size_code, rec.size, rec.upc, rec.sku, rec.quantity_per_inner_pack, rec.retail_price, rec.quantity, rec.unit_cost, rec.cost, rec.unit));
        }
      }
      const dataModelArray: eddieOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }

  async updateItemNo(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const update = await this.eddieCoLineRepo.update(
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
      const deletedItem = await this.eddieCoLineRepo.delete({ id: Number(req.id) });

      if (deletedItem && deletedItem.affected) {
        return new CommonResponseModel(true, 1, "ItemNo Deleted Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Item No: Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
    }
  }



  async getOrderdataForCOline(req: EddieDetailsReq): Promise<CommonResponseModel> {
    try {
      const data = await this.EddieOrdersRepo.find({ where: { poNumber: req.PoNumber, poLine: req.PoLine } })
      // po -> destination -> color -> sizes
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, EddieOrdersEntity>();
      data.forEach(rec => {
        poMap.set(`${rec.poLine},${rec.poNumber}`, rec)

        const dest = rec.deliveryAddress;

        if (!destinationColSizesMap.has(`${rec.poLine},${rec.poNumber}`)) {
          destinationColSizesMap.set(`${rec.poLine},${rec.poNumber}`, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).has(dest)) {
          destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).set(dest, new Map<string, []>());
        }
        if (!destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).get(dest).has(rec.color)) {
          destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).get(dest).set(rec.color, []);
        }
        destinationColSizesMap.get(`${rec.poLine},${rec.poNumber}`).get(dest).get(rec.color).push({ size: rec.size, quantity: rec.quantity, price: rec.unitCost });
      });
      const coData = []
      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = []
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = []
          colorSizes.forEach((sizes, color) => {
            const sizeArray = []
            sizes.forEach((size) => {
              const sizeObj = new EddieSizeModel(size.size, size.quantity, size.price);
              sizeArray.push(sizeObj)
            })
            const col = new EddieColorModel(color, sizeArray);
            ColArray.push(col)
          });
          const des = new EddieDestinationModel(dest, ColArray);
          desArray.push(des)
        });
        const poInfo = poMap.get(poNumber)
        const co = new EddieCoLinereqModels(poInfo.poNumber, poInfo.poLine, poInfo.unitCost, poInfo.deliveryDate, poInfo.currency, desArray);
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