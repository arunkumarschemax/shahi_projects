import { Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { CoLineRequest, CommonResponseModel, CompareModel, EddieCoLinereqModels, EddieColorModel, EddieDestinationModel, EddieOrderFilter, EddieSizeModel, EddieSizeWiseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarCoLinereqModels, SanmarColorModel, SanmarCompareModel, SanmarDestinationModel, SanmarOrderFilter, SanmarSizeModel, SanmarSizeWiseModel, StatusEnum, eddieOrderDataModel, sanmarOrderDataModel } from "@project-management-system/shared-models";
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
import { EddieItemNoDtos } from "./dto/eddie-item-no.dto";
import { AddressRepository } from "../Entites@Shahi/address/address.repo";
import { AddressService } from "../Entites@Shahi/address/address-service";
import { Cron } from "@nestjs/schedule";
import { ColorRepository } from "../Entites@Shahi/color/color-repo";

const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');



@Injectable()
export class EddieService {


  constructor(
    private dataSource: DataSource,
    private EddieOrdersRepo: EddieOrdersRepository,
    private pdfRepo: EddiePdfRepo,
    private eddieCoLineRepo: EddieCOLineRepository,
    private eddieOrdersChildRepository: EddieOrdersChildRepository,
    private addressRepo: AddressRepository,
    private addressService: AddressService,
    private colorRepo:ColorRepository


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
          entity.shortDescription = item.shortDescription
          entity.color = item.color
          entity.buyerStyle = item.buyerStyle
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
              deliveryDate: req.deliveryDate, 
              exFactoryDate: req.exFactoryDate,
               buyerAddress: req.buyerAddress, 
               deliveryAddress: req.deliveryAddress,
              currency: req.currency,
              buyerItem: item.buyerItem,
              color: item.color,
              shortDescription: item.shortDescription,
              buyerStyle: item.buyerStyle,
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
            entitys.buyerStyle = item.buyerStyle,
            entitys.shortDescription = item.shortDescription

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
            entitys.orderId = orderData.id

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
            entitys.buyerStyle = item.buyerStyle
            entitys.shortDescription = item.shortDescription

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
            entitys.orderId = saved.id

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

  // async updatePath(req: any, poNumber: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
  //   console.log(poNumber, "pppppioooooo");
  //   console.log(req, "reqqqqqqqqq");
  //   const entity = new EddiePdfInfoEntity();
  //   entity.poNumber = poNumber;
  //   entity.pdfFileName = filename;
  //   entity.filePath = filePath;
  //   entity.fileType = mimetype;
  //   entity.fileData = req;
  //   entity.uploadStatus = "SUCCESS";
  //   // console.log(entity.fileData, "fileData")

  //   const file = await this.pdfRepo.findOne({ where: { pdfFileName: filePath } });
  //   if (file) {
  //     return new CommonResponseModel(false, 0, 'File with the same name already uploaded');
  //   } else {
  //     const save = await this.pdfRepo.save(entity);
  //     if (save) {
  //       return new CommonResponseModel(true, 1, 'Uploaded successfully', save);
  //     } else {
  //       return new CommonResponseModel(false, 0, 'Uploaded failed');
  //     }
  //   }
  // }

  async updatePath(req: any, jsonData: any,poNumber:any): Promise<CommonResponseModel> {
    try {

      let flag = true;
      const entities=[]
      for (const res of req) {
        const entity = new EddiePdfInfoEntity();
        entity.pdfFileName = res.filename
        entity.filePath = res.path
        entity.poNumber = poNumber
        entity.fileData = jsonData
        entity.fileType = res.mimetype
        entity.createdUser = "admin"
        entity.uploadStatus = "SUCCESS";
        entities.push(entity);
      }
      const uploadDoc = await this.pdfRepo.save(entities);
      if (!uploadDoc) {
        flag = false;
      }
      if (flag) {
        return new CommonResponseModel(true, 11, 'uploaded successfully', req);
      }
      else {
        return new CommonResponseModel(false, 11, 'uploaded failed', req);
      }
    }
    catch (error) {
      console.log(error);
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
            new eddieOrderDataModel(rec.id, rec.po_number, rec.incoterm, rec.color, rec.delivery_date, rec.delivery_address, rec.buyer_address, rec.manufacture, rec.shipment_mode, rec.payment_terms, rec.po_line, rec.buyer_item, rec.short_description, rec.currency, rec.retail_price, rec.status, rec.ex_factory_date, [], rec.buyer_style)
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
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });

    try {

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
    } finally {
      browser.close()
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
      entity.buyerStyle = req.buyerStyle;
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

  async updateItemNo(req: EddieItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const update = await this.eddieCoLineRepo.update(
        { id: Number(req.id) },
        { itemNo: req.itemNo }
      );

      if (update) {
        return new CommonResponseModel(true, 1, "Update Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while updating ItemNo", error);
    }
  }


  async deleteCoLine(req: EddieItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const deletedItem = await this.eddieCoLineRepo.delete({ id: Number(req.id) });

      if (deletedItem && deletedItem.affected) {
        return new CommonResponseModel(true, 1, "Deleted Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Something Went Wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
    }
  }



  // async getOrderdataForCOline(req: EddieDetailsReq): Promise<CommonResponseModel> {
  //   try {
  //     const poLineValues = req.poLine.split(',')
  //     const data = await this.EddieOrdersRepo.find({ where: { poNumber: req.poNumber, poLine: In(poLineValues) } })
  //     // po -> destination -> color -> sizes
  //     const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
  //     const poMap = new Map<string, EddieOrdersEntity>();
  //     for (const rec of data) {
  //       poMap.set(`${rec.poNumber}`, rec)


  //       const parts = rec.deliveryAddress.split(',')
  //       const destAdd = parts[2].trim();
  //       // console.log(destAdd,"tetetete")
  //       const dest = destAdd;

  //       if (!destinationColSizesMap.has(`${rec.poNumber}`)) {
  //         destinationColSizesMap.set(`${rec.poNumber}`, new Map<string, Map<string, []>>());
  //       }
  //       if (!destinationColSizesMap.get(`${rec.poNumber}`).has(dest)) {
  //         destinationColSizesMap.get(`${rec.poNumber}`).set(dest, new Map<string, []>());      
  //       }
          
  //       console.log(rec.color,"color........")
  //       const check = await this.colorRepo.findOne({
  //         where: {
  //           pdfColor: rec.color
  //         }
  //       });

  //       console.log(check,"check color")
  //       const Color= check.crmColor
  //       if(!check ){
  //         if (!destinationColSizesMap.get(rec.poNumber).get(dest).has(Color)) {
  //           destinationColSizesMap.get(rec.poNumber).get(dest).set(Color, []);
  //         } else {
  //           if (!destinationColSizesMap.get(`${rec.poNumber}`).get(dest).has(rec.color)) {
  //             destinationColSizesMap.get(`${rec.poNumber}`).get(dest).set(rec.color, []);
  //           }
  //         }
  //       }

  //       // destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(rec.color).push({ size: rec.size, quantity: rec.quantity, price: rec.unitCost });
  //       const sizesMap = destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(rec.color)

  //       // Check if the color and size already exist
  //       const existingSize = sizesMap.find((sizeObj) => sizeObj.size === rec.size);

  //       if (existingSize) {
  //         // If the color and size exist, update the quantity
  //         existingSize.quantity = (parseInt(existingSize.quantity.replace(/,/g, '')) + parseInt(rec.quantity.replace(/,/g, ''))).toString();
  //       } else {
  //         // If the color exists but not the size, add a new size
  //         sizesMap.push({ size: rec.size, quantity: rec.quantity, price: rec.unitCost });
  //       }

  //     };
  //     const coData = []
  //     // let totalUnitPrice = 0;
  //     // let totalSizeCount = 0;
  //     // const sizeSet = new Set<string>();

  //     destinationColSizesMap.forEach((destColorSize, poNumber) => {
  //       const desArray = []
  //       destColorSize.forEach((colorSizes, dest) => {
  //         const ColArray = []
  //         colorSizes.forEach((sizes, color) => {
  //           const sizeArray = []
  //           sizes.forEach((size) => {
  //             const sizeObj = new EddieSizeModel(size.size, size.quantity, size.price);
  //             sizeArray.push(sizeObj)
  //           })

  //           //
  //           //  sizes.forEach((size) => {
  //           //     const sizeKey = `${size.size}-${color}`; // Create a unique key based on size and color

  //           //     // Check if the size is unique, then calculate totalUnitPrice
  //           //     if (!sizeSet.has(sizeKey)) {
  //           //       console.log(sizeKey, "pppoiiiii")

  //           //       totalUnitPrice += parseFloat(size.price);
  //           //       sizeSet.add(sizeKey); // Add the unique size to the set
  //           //       totalSizeCount += 1;  // for total size count for Avg of unit price

  //           //     }

  //           //   });


  //           const col = new EddieColorModel(color, sizeArray);
  //           ColArray.push(col)
  //           // sizeSet.clear();
  //         });
  //         const des = new EddieDestinationModel(dest, ColArray);
  //         desArray.push(des)
  //       });


  //       const poInfo = poMap.get(poNumber)
  //       // console.log(totalSizeCount, "count")
  //       // console.log(totalUnitPrice, "totalUnitPrice")
  //       // const averageUnitPrice = totalSizeCount > 0 ? totalUnitPrice / totalSizeCount : 0;  // calculation of Avg unit price
  //       // console.log(averageUnitPrice,"avg price")

  //       const co = new EddieCoLinereqModels(poInfo.poNumber, poInfo.poLine, poInfo.unitCost, poInfo.deliveryDate, poInfo.exFactoryDate, poInfo.currency, poInfo.buyerStyle, desArray);
  //       coData.push(co)
  //     });
  //     if (coData) {
  //       return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', coData);
  //     } else {
  //       return new CommonResponseModel(false, 0, 'No data found');
  //     }
  //   } catch (err) {
  //     throw err
  //   }
  // }
  async getOrderdataForCOline(req: EddieDetailsReq): Promise<CommonResponseModel> {
    try {
      const poLineValues = req.poLine.split(',');
      const ordersData = await this.EddieOrdersRepo.find({ where: { poNumber: req.poNumber, poLine: In(poLineValues) } });
  
      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, EddieOrdersEntity>();
  
      for (const order of ordersData) {
        poMap.set(`${order.poNumber}`, order);
  
        const parts = order.deliveryAddress.split(',');
        const dest = parts[2].trim();
  
        if (!destinationColSizesMap.has(`${order.poNumber}`)) {
          destinationColSizesMap.set(`${order.poNumber}`, new Map<string, Map<string, { size: string, quantity: string, price: string }[]>>());
        }
  
        if (!destinationColSizesMap.get(`${order.poNumber}`).has(dest)) {
          destinationColSizesMap.get(`${order.poNumber}`).set(dest, new Map<string, { size: string, quantity: string, price: string }[]>());
        }
  
        const check = await this.colorRepo.findOne({ where: { pdfColor: order.color } });
        const color = check ? check.crmColor : order.color;
  
        if (!destinationColSizesMap.get(order.poNumber).get(dest).has(color)) {
          destinationColSizesMap.get(order.poNumber).get(dest).set(color, []);
        }
  
        const sizesMap = destinationColSizesMap.get(order.poNumber).get(dest).get(color);
        const existingSize = sizesMap.find((sizeObj) => sizeObj.size === order.size);
  
        if (existingSize) {
          existingSize.quantity = (parseInt(existingSize.quantity.replace(/,/g, '')) + parseInt(order.quantity.replace(/,/g, ''))).toString();
        } else {
          sizesMap.push({ size: order.size, quantity: order.quantity, price: order.unitCost });
        }
      }
  
      const coData = [];
  
      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = [];
  
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = [];
  
          colorSizes.forEach((sizes, color) => {
            const sizeArray = sizes.map(size => new EddieSizeModel(size.size, size.quantity, size.price));
            const col = new EddieColorModel(color, sizeArray);
            ColArray.push(col);
          });
  
          const des = new EddieDestinationModel(dest, ColArray);
          desArray.push(des);
        });
  
        const poInfo = poMap.get(poNumber);
        const co = new EddieCoLinereqModels(poInfo.poNumber, poInfo.poLine, poInfo.unitCost, poInfo.deliveryDate, poInfo.exFactoryDate, poInfo.currency, poInfo.buyerStyle, desArray);
        coData.push(co);
      });
  
      if (coData.length > 0) {
        return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', coData);
      } else {
        return new CommonResponseModel(false, 0, 'No data found');
      }
    } catch (err) {
      // Handle error appropriately, maybe log it
      console.error(err);
      throw new Error('Error retrieving data');
    }
  }
  

  async getordercomparationData(req?: any): Promise<CommonResponseModel> {
    try {
      const Originaldata = await this.EddieOrdersRepo.getordercomparationData(req)
      const compareModel: CompareModel[] = []

      for (const rec of Originaldata) {
        const childData = await this.eddieOrdersChildRepository.find({
          where: {
            poNumber: rec.po_number, poLine: rec.po_line, size: rec.size
          }, order: { ordersChildId: 'DESC' }, take: 1, skip: 1
        })
        if (childData.length > 0) {
          const oldData = childData[0];
          // Check for changes in values
          if (
            oldData.unitCost !== rec.unit_cost ||
            oldData.deliveryDate !== rec.delivery_date ||
            oldData.quantity !== rec.quantity
          ) {
            // Only push if there are changes
            compareModel.push(new
              CompareModel(
                rec.po_number,
                rec.po_line,
                rec.size,
                oldData.unitCost,
                rec.unit_cost,
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


  async updateStatusInOrder(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const update = await this.EddieOrdersRepo.update(
        { poNumber: req.poNumber },
        { status: StatusEnum.OPEN }
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

  // async createCOline(req: any): Promise<CommonResponseModel> {
  //   const poDetails = await this.eddieCoLineRepo.getDataforCOLineCreation();
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
  //       console.log(po,'pooooo')
  //       const coLine = new CoLineRequest();
  //       let buyerValue1;
  //       let buyerValue2;
  //       let agent;
  //       let buyerAddress;
  //       let deliveryAddress;
  //       let pkgTerms;
  //       let paymentTerms;
  //       if (po.buyer === 'Eddie Bauer LLC') {
  //         const response = await this.getOrderdataForCOline({ poNumber: po.po_number,poLine:po.po_line})
  //         console.log(response.data[0],"test")
  //         const coData = response.data[0];
  //         coLine.buyerPo = coData.poNumber;
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
  //         console.log(request,"request")
  //         const address = await this.addressService.getAddressInfoByCountry({ country: request });
  //         console.log(address,"addd")
  //         const addressData = address.data[0];
  //         console.log(addressData,"uuuuuuuuuuuuuu")
  //         buyerAddress = 10;
  //         deliveryAddress =  11
  //         buyerValue1 = "SGC-SHAHI GROUP OF COMPANIES"
  //         buyerValue2 = "SEPLB200-Shahi Exports Pvt Ltd Unit 12"
  //         agent = "-NA"
  //         pkgTerms = "FP1-WITHOUT HANGER"
  //         paymentTerms = "031-Trde Card45 Day"


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
  //       console.log(coLine.exFactoryDate,"ex faccccccccccccc")

  //       await driver.findElement(By.name('dojo.EXFACTORYDATE')).sendKeys(coLine.exFactoryDate);
  //       await driver.wait(until.elementLocated(By.name('dojo.delydt')));
  //       await driver.findElement(By.name('dojo.delydt')).clear();
  //       console.log(coLine.deliveryDate,"deliverydatejjjjjjjjjj")
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
  //                 console.log(inputId,"pppid")
  //                 const input = await driver.wait(until.elementLocated(By.id(inputId)))
  //                 await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
  //               }
  //             }
  //           } else if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
  //             console.log("Hai")
  //             console.log(dest.colors,'kuuuuuu')
  //             console.log(dest.colors[0].sizes,'kuuuuuusizes')

  //             await driver.executeScript('arguments[0].click();', tab);
  //             // console.log(dest.colors,'kuuuuuu')
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
  //                   console.log(po.item_no,"iii")
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
  //                   console.log(sizeToInputMap,"sizeToInputMap")
  //                   const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
  //                   console.log(inputField,"inputfield")
  //                   if (inputField) {
  //                     // Clear the existing value (if any) and fill it with the new price.
  //                     await inputField.clear();
  //                     await inputField.sendKeys(size.price);
  //                   } else {
  //                     // update added for if sizes mismatch
  //                     const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number,poLine:po.po_line}, { status: 'Failed', errorMsg: 'NO matching Size found' });
  //                     await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED})
  //                     console.log("sizes")

  //                     return new CommonResponseModel(false, 0, 'NO matching Size found')
  //                   }
  //                 }
  //                 const inputId = `${size.name}:${color.name}:ASSORTED`.replace(/\*/g, '');
  //                 const input = await driver.wait(until.elementLocated(By.id(inputId)), 10000)
  //                 await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
  //               }
  //             }
  //           }
  //         }
  //       }
  //       await driver.sleep(10000)
  //       // const element = await driver.findElement(By.id('OrderCreateID')).click();
  //       await driver.wait(until.alertIsPresent(), 10000);
  //       // Switch to the alert and accept it (click "OK")
  //       const alert = await driver.switchTo().alert();
  //       await alert.accept();
  //       if (await this.isAlertPresent(driver)) {
  //         const alert = await driver.switchTo().alert();
  //         const alertText = await alert.getText();
  //         const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number,poLine:po.po_line}, { status: 'Failed', errorMsg: alertText });
  //         await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED})
  //         await alert.accept();
  //         await driver.sleep(5000)
  //         await driver.navigate().refresh();
  //         await driver.quit();
  //       } else {
  //         await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
  //         const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
  //         const coNo = await coNoElement.getAttribute('value');
  //         const currentDate = new Date();
  //         const day = currentDate.getDate().toString().padStart(2, '0');
  //         const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
  //         const year = currentDate.getFullYear().toString().slice(-2);
  //         const currentDateFormatted = `${day}-${month}-${year}`;
  //         if (coNo) {
  //           const update = await this.eddieCoLineRepo.update({  poNumber: po.po_number,poLine:po.po_line }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted, errorMsg: "-" });
  //           await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.SUCCESS})
  //           // await driver.navigate().refresh();
  //           await driver.sleep(10000)
  //         } else {
  //           const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number,poLine:po.po_line}, { status: 'Failed' });
  //            await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED})
  //           // await driver.navigate().refresh();
  //           await driver.sleep(10000)
  //         }
  //       }
  //     }
  //     return new CommonResponseModel(true, 1, `COline created successfully`)
  //   } catch (error) {
  //     console.log(error, 'error');
  //     if (error.name === 'TimeoutError') {
  //       const update = await this.eddieCoLineRepo.update({  poNumber: poDetails[0].po_number, poLine:poDetails[0].po_line}, { status: 'Failed', errorMsg: 'NO matching Color found' });
  //        await this.updateCOLineStatus({poNumber: poDetails[0].buyer_po, poLine:poDetails[0].po_line,  status: StatusEnum.FAILED})
  //       driver.quit()
  //       return new CommonResponseModel(false, 0, 'Matching Color not found')
  //     } else {
  //       // Handle other types of errors
  //       return new CommonResponseModel(false, 0, error)
  //     }
  //   }
  //   finally {
  //     driver.quit()
  //   }
  // }

  //  async createCOline(req: any): Promise<CommonResponseModel> {
  //   const [po] = await this.eddieCoLineRepo.getDataforCOLineCreation();
  //   if (!po) {
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
  //     // for (const po of poDetails) {
  //     console.log(po,"test......")
  //     const coLine = new CoLineRequest();
  //     let buyerValue1;
  //     let buyerValue2;
  //     let agent;
  //     let buyerAddress;
  //     let deliveryAddress;
  //     let pkgTerms;
  //     let paymentTerms;
  //     let styleNo;
  //     if (po.buyer === 'Eddie Bauer LLC') {
  //       const response = await this.getOrderdataForCOline({ poNumber: po.po_number, poLine: po.po_line })
  //       console.log(response.data[0])
  //       const coData = response.data[0];
  //       coLine.buyerPo = coData.poNumber;
  //       const inputDate = new Date(coData.deliveryDate)
  //       // Calculate the date 7 days before the GAC date
  //       const sevenDaysBefore = new Date(inputDate);
  //       sevenDaysBefore.setDate(inputDate.getDate() - 7);
  //       const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBefore);
  //       coLine.deliveryDate = moment(coData.deliveryDate).format("DD/MM/YYYY")
  //       coLine.exFactoryDate = exFactoryDate
  //       coLine.salesPrice = coData.salesPrice
  //       coLine.currency = coData.currency
  //       coLine.destinations = coData.destinations
  //       const request = coData.destinations[0]?.name;
  //       console.log(request, "request")
  //       const address = await this.addressService.getAddressInfoByCountry({ country: request });
  //       const addressData = address.data[0];
  //       console.log(addressData, "address")
  //         styleNo = coData.style
  //       //  buyerAddress = addressData?.buyerCode ? addressData?.buyerCode : 12;
  //       //  deliveryAddress = addressData?.deliveryCode
  //       // buyerValue1 = "FIN-FINISHED GOODS - KY"
  //       // buyerValue2 = "CEN00002-CENTRIC BRANDS LLC"
  //       // agent = "NA-DIRECT CUSTOMER"
  //       // pkgTerms = "BOX-BOXES"
  //       // paymentTerms = "081-TT  90 Days"
  //         buyerAddress = addressData?.buyerCode 
  //         deliveryAddress = addressData?.deliveryCode
  //         // buyerAddress = 10;
  //         // deliveryAddress =  11
  //         buyerValue1 = "EB-EDDIE BAUER"
  //         buyerValue2 = "EDDIE001-EDDIE BAUER LLC"
  //         agent = "-NA"
  //         pkgTerms = "FP1-WITHOUT HANGER"
  //         paymentTerms = "031-Trde Card45 Day"
  //     }
  //     const apps = await driver.wait(until.elementLocated(By.xpath('//*[@id="mainContainer"]/div[1]')));
  //     const allApps = await apps.findElements(By.tagName('span'));
  //     for (const app of allApps) {
  //       if ((await app.getAttribute('innerText')).includes('Style Orders')) {
  //         await driver.executeScript('arguments[0].click();', app);
  //         break;
  //       }
  //     }
  //     await driver.wait(until.elementLocated(By.id('styleid2H')))
  //     await driver.findElement(By.id('styleid2H')).sendKeys(po.item_no);
  //     await driver.sleep(10000)
  //     await driver.wait(until.elementLocated(By.id('bgpset1')));
  //     const dropdownElement1 = await driver.findElement(By.id('bgpset1'));
  //     const dropdown1 = await driver.wait(until.elementIsVisible(dropdownElement1)).then(element => new Select(element))
  //     await dropdown1.selectByValue(buyerValue1)
  //     await driver.sleep(10000)
  //     await driver.wait(until.elementLocated(By.id('byr')));
  //     const dropdownElement2 = await driver.findElement(By.id('byr'));
  //     const dropdown2 = await driver.wait(until.elementIsVisible(dropdownElement2)).then(element => new Select(element))
  //     await dropdown2.selectByValue(buyerValue2)
  //     await driver.sleep(5000)
  //     await driver.wait(until.elementLocated(By.id('CreateOrderID')))
  //     console.log("hhh")
  //     await driver.sleep(3000)
  //     await driver.findElement(By.id('CreateOrderID')).click();
  //     await driver.wait(until.elementLocated(By.id('bpo')))
  //     await driver.findElement(By.id('bpo')).clear();
  //     console.log(coLine.buyerPo,"buyerpo")
  //     await driver.findElement(By.id('bpo')).sendKeys(coLine.buyerPo);
  //     await driver.wait(until.elementLocated(By.id('bus')))
  //     await driver.findElement(By.id('bus')).clear();

  //      await driver.findElement(By.id('bus')).sendKeys(styleNo);
  //     await driver.wait(until.elementLocated(By.id('agnt')));
  //     const agentDropDown = await driver.findElement(By.id('agnt'));
  //     await driver.executeScript(`arguments[0].value = '${agent}';`, agentDropDown)
  //     await driver.wait(until.elementLocated(By.name('dojo.EXFACTORYDATE')));
  //     await driver.findElement(By.name('dojo.EXFACTORYDATE')).clear();
  //     await driver.findElement(By.name('dojo.EXFACTORYDATE')).sendKeys(coLine.exFactoryDate);
  //     await driver.wait(until.elementLocated(By.name('dojo.delydt')));
  //     await driver.findElement(By.name('dojo.delydt')).clear();
  //     await driver.findElement(By.name('dojo.delydt')).sendKeys(coLine.deliveryDate);
  //     await driver.wait(until.elementLocated(By.name('byd')));
  //     const dropdown = await driver.findElement(By.name('byd'));
  //     const options = await dropdown.findElements(By.tagName('option'));
  //     const optionValues = [];
  //     for (const option of options) {
  //       const value = await option.getAttribute('value');
  //       optionValues.push(value);
  //     }
  //     const number = optionValues.find(value => value.includes(buyerAddress)); // give the dynamic value here
  //      console.log(buyerAddress,"buyerAddress")
  //     await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);

  //     await driver.wait(until.elementLocated(By.xpath('//*[@id="cur"]')));
  //     const curDropdown = await driver.findElement(By.xpath('//*[@id="cur"]'));
  //     const cur = coLine.currency; // give the dynamic value here
  //     await driver.executeScript(`arguments[0].value = '${cur}';`, curDropdown);

  //     await driver.wait(until.elementLocated(By.xpath('//*[@id="price"]')));
  //     await driver.findElement(By.xpath('//*[@id="price"]')).clear();
  //     await driver.findElement(By.xpath('//*[@id="price"]')).sendKeys(coLine.salesPrice);

  //     await driver.wait(until.elementLocated(By.id('packtrm')));
  //     const pkgTermsDropDown = await driver.findElement(By.id('packtrm'));
  //     await driver.executeScript(`arguments[0].value = '${pkgTerms}';`, pkgTermsDropDown)
  //     await driver.wait(until.elementLocated(By.id('ptr')));
  //     const ptrDropDown = await driver.findElement(By.id('ptr'));
  //     await driver.executeScript(`arguments[0].value = '${paymentTerms}';`, ptrDropDown)
  //     await driver.sleep(10000)
  //     for (let dest of coLine.destinations) {
  //       const colorsContainer = await driver.wait(until.elementLocated(By.xpath('//*[@id="COContainer"]')));
  //       const colorsTabs = await colorsContainer.findElements(By.tagName('span'));
  //       for (const tab of colorsTabs) {
  //         if ((await tab.getAttribute('innerText')) == dest.name) {
  //           await driver.executeScript('arguments[0].click();', tab);
  //           for (let [colorIndex, color] of dest.colors.entries()) {
  //             for (let [sizeIndex, size] of color.sizes.entries()) {
  //               if (colorIndex === 0) {
  //                 // Find all the labels in the second row.
  //                 await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
  //                 let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
  //                 const fileteredElements: any[] = [];
  //                 for (const labelElement of labelElements) {
  //                   const ele = (await labelElement.getText())?.trim();
  //                   ele.length > 0 ? fileteredElements.push(labelElement) : '';
  //                 }
  //                 let tabIndex = 1; // Default to 1 if no match
  //                 const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
  //                 const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
  //                 await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
  //                 const dropdown = await driver.findElement(By.id(`bydline/${string}`));
  //                 const options = await dropdown.findElements(By.tagName('option'));
  //                 const optionValues = [];
  //                 for (const option of options) {
  //                   const value = await option.getAttribute('value');
  //                   optionValues.push(value);
  //                 }
  //                 const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
  //                 console.log(deliveryAddress,"deliveryAddress")
  //                 await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
  //                 // Find all the input fields in the first row.
  //                 const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
  //                 // Create a map of size labels to input fields.
  //                 const sizeToInputMap = {};
  //                 for (let i = 0; i < fileteredElements.length; i++) {
  //                   const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
  //                   if (label.length)
  //                     sizeToInputMap[label] = inputElements[i];
  //                 }
  //                 const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
  //                 if (inputField) {
  //                   // Clear the existing value (if any) and fill it with the new price.
  //                   await inputField.clear();
  //                   await inputField.sendKeys(size.price);
  //                 }
  //               }
  //               const inputId = `${size.name}:${color.name}:${dest.name}`.replace(/\*/g, '');
  //               console.log(inputId,"inputId")
  //               const input = await driver.wait(until.elementLocated(By.id(inputId)))
  //               console.log(input,"input")

  //               await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
  //             }
  //           }
  //         } else if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
  //           console.log(dest.colors,"color")
  //           console.log(dest.colors[0].sizes[0],"sizes")

  //           await driver.executeScript('arguments[0].click();', tab);
  //           for (let [colorIndex, color] of dest.colors.entries()) {
  //             for (let [sizeIndex, size] of color.sizes.entries()) {
  //               if (colorIndex === 0) {
  //                 // Find all the labels in the second row.
  //                 await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
  //                 let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
  //                 const fileteredElements: any[] = [];
  //                 for (const labelElement of labelElements) {
  //                   const ele = (await labelElement.getText())?.trim();
  //                   ele.length > 0 ? fileteredElements.push(labelElement) : '';
  //                 }
  //                 let tabIndex = 1; // Default to 1 if no match
  //                 // if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
  //                 //   tabIndex = 2
  //                 // }
  //                 const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
  //                 const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
  //                 await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
  //                 const dropdown = await driver.findElement(By.id(`bydline/${string}`));
  //                 const options = await dropdown.findElements(By.tagName('option'));
  //                 const optionValues = [];
  //                 for (const option of options) {
  //                   const value = await option.getAttribute('value');
  //                   optionValues.push(value);
  //                 }
  //                 const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
  //                 await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
  //                 // Find all the input fields in the first row.
  //                 const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
  //                 // Create a map of size labels to input fields.
  //                 const sizeToInputMap = {};
  //                 for (let i = 0; i < fileteredElements.length; i++) {
  //                   const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
  //                   if (label.length)
  //                     sizeToInputMap[label] = inputElements[i];
  //                 }
  //                 const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
  //                 if (inputField) {
  //                   // Clear the existing value (if any) and fill it with the new price.
  //                   await inputField.clear();
  //                   await inputField.sendKeys(size.price);
  //                 } else {
  //                   const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Size found',isActive:false });
  //                  await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})

  //                   return new CommonResponseModel(false, 0, 'NO matching Size found')
  //                 }
  //               }
  //               const inputId = `${size.name}:${color.name}:ASSORTED`.replace(/\*/g, '');
  //               const input = await driver.wait(until.elementLocated(By.id(inputId)), 10000)
  //               await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
  //             }
  //           }
  //         }
  //       }
  //     }
  //     await driver.sleep(10000)
  //      const element = await driver.findElement(By.id('OrderCreateID')).click();
  //     await driver.wait(until.alertIsPresent(), 10000);
  //     // Switch to the alert and accept it (click "OK")
  //     const alert = await driver.switchTo().alert();
  //     await alert.accept();
  //     if (await this.isAlertPresent(driver)) {
  //       const alert = await driver.switchTo().alert();
  //       const alertText = await alert.getText();
  //       const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: alertText , isActive:false });

  //       await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})

  //       await alert.accept();
  //       await driver.sleep(5000)
  //       await driver.navigate().refresh();
  //       await driver.quit();
  //       return new CommonResponseModel(false, 0, alertText)

  //     } else {
  //       await driver.sleep(10000)
  //       console.log("test..........")
  //       await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
  //       const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
  //       const coNo = await coNoElement.getAttribute('value');
  //       const currentDate = new Date();
  //       const day = currentDate.getDate().toString().padStart(2, '0');
  //       const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
  //       const year = currentDate.getFullYear().toString().slice(-2);
  //       const currentDateFormatted = `${day}-${month}-${year}`;
  //       // await driver.wait(until.elementLocated(By.xpath('//*[@id="form2"]/table/tbody/tr[2]/td/div/table/thead/tr/th[7]')), 10000);
  //       // const coNoElement = await driver.findElement(By.xpath(`//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[last()]/td[7]`));
  //       // const coNo = await coNoElement.getAttribute('innerText');
  //       // const currentDate = new Date();
  //       // const day = currentDate.getDate().toString().padStart(2, '0');
  //       // const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
  //       // const year = currentDate.getFullYear().toString().slice(-2);
  //       // const currentDateFormatted = `${day}-${month}-${year}`;

  //       if (coNo) {


  //         const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted,errorMsg:"-" });
  //         await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.SUCCESS})


  //         // await driver.navigate().refresh();
  //         await driver.sleep(10000)
  //       } else {


  //         const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed',isActive:false });
  //         await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})

  //         // await driver.navigate().refresh();
  //         await driver.sleep(10000)
  //       }
  //     }
  //     // }
  //     return new CommonResponseModel(true, 1, `COline created successfully`)
  //   } catch (error) {

  //     console.log(error, 'error');
  //     if (error.name === 'TimeoutError') {
  //       const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Color found',isActive:false });
  //       await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})
  //       driver.quit()
  //       return new CommonResponseModel(false, 0, 'Matching Color not found')
  //     } else {
  //       // Handle other types of errors
  //       return new CommonResponseModel(false, 0, error)
  //     }
  //   }
  //   finally {
  //     driver.quit()
  //   }
  // }

  //  @Cron('*/5 * * * *')
  async createCOline(req: any): Promise<CommonResponseModel> {
    const [po] = await this.eddieCoLineRepo.getDataforCOLineCreation();
    if (!po) {
      return new CommonResponseModel(false, 0, 'No CO-Line creation requests')
    }
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
      // driver.addA(2400,2400);
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
      console.log(po, "test......")
      const coLine = new CoLineRequest();
      let buyerValue1;
      let buyerValue2;
      let agent;
      let buyerAddress;
      let deliveryAddress;
      let pkgTerms;
      let paymentTerms;
      let styleNo;
      if (po.buyer === 'Eddie Bauer LLC') {
        const response = await this.getOrderdataForCOline({ poNumber: po.po_number, poLine: po.po_line })
        console.log(response.data[0],"data.......")
        const coData = response.data[0];
        coLine.buyerPo = coData.poNumber;
        // const inputDate = new Date(coData.deliveryDate)
        // Calculate the date 7 days before the GAC date
        // const sevenDaysBefore = new Date(inputDate);
        // sevenDaysBefore.setDate(inputDate.getDate() - 7);
        const exFactoryDate = moment(coData.exfactoryDate).format("DD/MM/YYYY")
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
        styleNo = coData.style

        buyerAddress = addressData?.buyerCode
        deliveryAddress = addressData?.deliveryCode

        buyerValue1 = "EB-EDDIE BAUER"
        buyerValue2 = "EDDIE001-EDDIE BAUER LLC"
        agent = "-NA"
        pkgTerms = "FP1-WITHOUT HANGER"
        paymentTerms = "031-Trde Card45 Day"
      }
      console.log(coLine.exFactoryDate,"exFactoryDate")

      console.log("----------------start----------------")
      const today = new Date();
      const exFactoryDateParts = coLine.exFactoryDate.split('/'); // Split the date string by '/'
      const exFactoryDay = parseInt(exFactoryDateParts[0], 10); // Convert day to number
      const exFactoryMonth = parseInt(exFactoryDateParts[1], 10) - 1; // Convert month to number and subtract 1
      const exFactoryYear = parseInt(exFactoryDateParts[2], 10); // Convert year to number
      const exFactoryDate = new Date(exFactoryYear, exFactoryMonth, exFactoryDay); // Create a new Date object
      
      const isExFactoryDatePastToday = exFactoryDate <= today;
      
      console.log(isExFactoryDatePastToday, "kkkk");

          if (isExFactoryDatePastToday) {
          const update = await this.eddieCoLineRepo.update(
            { poNumber: po.po_number, poLine: po.po_line },
            { status: "Failed", errorMsg: "Past Exfactory Date found", isActive: false }
          );
          await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED });
          return new CommonResponseModel(false, 0, "Past Exfactory Date found");
          } 

      console.log("----------------end----------------") 

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
      console.log("hhh")
      await driver.sleep(3000)
      await driver.findElement(By.id('CreateOrderID')).click();
      await driver.wait(until.elementLocated(By.id('bpo')))
      await driver.findElement(By.id('bpo')).clear();
      console.log(coLine.buyerPo, "buyerpo")
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
      console.log(buyerAddress, "buyerAddress")
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
                  console.log(deliveryAddress, "deliveryAddress")
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
                console.log(inputId, "inputId")
                const input = await driver.wait(until.elementLocated(By.id(inputId)))
                console.log(input, "input")

                await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
              }
            }
          } else if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
            console.log(dest.colors, "color")
            console.log(dest.colors[0].sizes[0], "sizes")
        
            await driver.executeScript('arguments[0].click();', tab);
            // get the div and increASE THE Width
            // await driver.wait(until.elementLocated(By.xpath("//div[@id='359QZD001']/div[1]")));
            // const fixedDiv = await driver.findElements(By.xpath("//div[@id='359QZD001']/div[1]"));
            // await driver.executeScript(`arguments[0].setAttribute('style', 'background: yellow')`, fixedDiv);
            // await driver.executeScript('document.getElementById("359QZD001").style.width = "3000px" ');
            // await driver.executeScript('document.getElementById("359QZD001").getElementsByTagName("div")[1].style.color = "red" ');
            // await driver.executeScript('document.getElementById("359QZD001").getElementsByTagName("div")[1].style.width = "2400px" ');
            // await driver.sleep(5000);

            // await driver.sleep(5000);

            const sizesDivElementId = `nameDiv1${po.item_no}ZD001`;
            const colorsDivElementId = `nameDiv3${po.item_no}ZD001`;


            // parent div ids
            /**
             * to read sizes : nameDiv1359QZD001
             * to read colors : nameDiv3359QZD001   nameDiv3744QZD001
             * to read input fields: percentageDiv1359QZD001
             * 
             */
            const allSizes = [];
            console.log('---------------------------------------------------------------');
            await driver.wait(until.elementLocated(By.xpath(`//div[@id='${sizesDivElementId}']/table/tbody/tr[2]/td/div`)));
            console.log("Read");


            // -----------------------   SIZES Reading from UI logic start ---------------
            // read all the sizes from the DOM
            let labelElements: any[] = await driver.findElements(By.xpath(`//div[@id='${sizesDivElementId}']/table/tbody/tr[2]/td/div`));
            const totalElements = labelElements?.length;
            console.log('Total elements : ' + totalElements);
            labelElements.forEach(async r => {
              const label = (await r.getText()).trim().toUpperCase().toString();
              allSizes.push(label);
            });
            // Now iterate a random iteration of 10 loops to cover all sizes in the UI by doing a horizontal scroll
            let i = 1;
            while (i <= 10) {
              // Try to jump to right hand side of the div by 8 units. (Dont try more than that. Test and change this value if needed)
              const toJump = Math.min(i * 8, totalElements);
              const rightEle = driver.findElement(By.xpath(`//div[@id='${sizesDivElementId}']/table/tbody/tr[2]/td[${toJump}]`));
              // scroll the pointer to right side
              driver.executeScript("arguments[0].scrollIntoView()", rightEle);
              driver.sleep(1000);
              // read all the visible sizes from the DOM
              let currentUserVisbileElements: any[] = await driver.findElements(By.xpath(`//div[@id='${sizesDivElementId}']/table/tbody/tr[2]/td/div`));
              // At some nth iteration, we can set all the sizes to the array once it is visible on the scope of selenium reader
              // console.log("Iteration " + i + " : " + toJump + " --- " + currentUserVisbileElements.length);
              currentUserVisbileElements.forEach(async (r, index) => {
                if (allSizes[index] == '') {
                  // console.log(index,"index");
                  const label = (await r.getText()).trim().toUpperCase().toString();
                  allSizes[index] = label;
                }
              });
              console.log(allSizes);
              i++;
            }
            // construct a reverse mapping of size => column location for easy scrolling during qty input
            const sizeToDisplayRowColumnIndex = [];
            allSizes.forEach((size, i) => {
              sizeToDisplayRowColumnIndex[size] = i;
            })
            // -----------------------   SIZES Reading from UI logic END ---------------


            // ---------------------- COLOR GETTING LOGIC START -------------------------
            const colorsInTable = [];
            const colorsToDisplayRowColumnIndex = [];
            // get the total colors for the current PO from the UI
            const totalColorElements: any[] = await driver.findElements(By.xpath(`//div[@id='${colorsDivElementId}']/table/tbody/tr`));
            console.log('total colors : ' + totalColorElements.length);
            let cc = 0;
            for (const r of totalColorElements) {
              // scroll to the specific location in the screen to read the color 
              const bottomEle = await driver.findElement(By.xpath(`//div[@id='${colorsDivElementId}']/table/tbody/tr[${cc + 1}]`));
              // execute the scroll command
              await driver.executeScript("arguments[0].scrollIntoView()", bottomEle);
              await driver.sleep(500);
              // now after scrolling, read the element from the DOM again. This time the selenium can read the value present in the DOM
              const sepcificRowColorEle = await driver.findElements(By.xpath(`//div[@id='${colorsDivElementId}']/table/tbody/tr[${cc + 1}]/td`));
              // console.log(sepcificRowColorEle);
              const displayingColor = (await sepcificRowColorEle[0]?.getText());
              // push the color to an array
              colorsInTable.push(displayingColor);
              cc++;
            }

            // now reverse map the color -> exact row index in the DOM
            colorsInTable.forEach((color, index) => {
              colorsToDisplayRowColumnIndex[color] = index;
            });
            // ---------------------- COLOR GETTING LOGIC END -------------------------


       
            // after reading all sizes data and colors date, get the scroll bar to the left again
            for (let [colorIndex, color] of dest.colors.entries()) {
              // for this specific color, scroll the window to the specific row where the color is visible
              const exactColorRowScrollLocation = colorsToDisplayRowColumnIndex[color.name] + 1;
              if (colorsToDisplayRowColumnIndex[color.name] == undefined || colorsToDisplayRowColumnIndex[color.name] == null) {
                break;
              }
              const bottomEle = await driver.findElement(By.xpath(`//div[@id='${colorsDivElementId}']/table/tbody/tr[${exactColorRowScrollLocation}]`));
              driver.executeScript("arguments[0].scrollIntoView()", bottomEle);
              driver.sleep(500);
              for (let [sizeIndex, size] of color.sizes.entries()) {
                const exactSizeColumnScrollLocation = sizeToDisplayRowColumnIndex[size.name] + 1;
                if (!exactSizeColumnScrollLocation){
                   
                  // const str = `NO matching Size found for color : ${color.name} and size :  ${size.name} `;
                  const str = `NO matching Size found`;

                  const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Size found', isActive: false });
                  await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })

                  return new CommonResponseModel(false, 0, 'NO matching Size found')
                }
                // console.log(`size: ${size.name} and ${exactSizeColumnScrollLocation}`);

                // Now for this specific size, scroll to the exact location in the interface where the size is visible
                const rightEle = await driver.findElement(By.xpath(`//div[@id='${sizesDivElementId}']/table/tbody/tr[2]/td[${exactSizeColumnScrollLocation}]`));
                driver.executeScript("arguments[0].scrollIntoView()", rightEle);
                driver.sleep(300);

                let tabIndex = 1; // Default to 1 if no match

                // const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[${currentWorkingRow}]/td/div/table/tbody/tr[${currentWorkingRow}]/td/div/input[@name='salespsizes']`;
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
                allSizes.forEach((s, index) => {
                  sizeToInputMap[s] = inputElements[index];
                });
                // console.log('----------------------Size map done --------------------------');
                const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
                // console.log(inputField);


                if (inputField) {
                  // Clear the existing value (if any) and fill it with the new price.
                  await inputField.clear();
                  await inputField.sendKeys(size.price);
                } else {
                  const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Size found', isActive: false });
                  await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })

                  return new CommonResponseModel(false, 0, 'NO matching Size found')
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
        const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: alertText, isActive: false });

        await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })

        await alert.accept();
        await driver.sleep(5000)
        await driver.navigate().refresh();
        await driver.quit();
        return new CommonResponseModel(false, 0, alertText)

      } else {
        await driver.sleep(10000)
        console.log("test..........")
        await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
        const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
        const coNo = await coNoElement.getAttribute('value');
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
        const year = currentDate.getFullYear().toString().slice(-2);
        const currentDateFormatted = `${day}-${month}-${year}`;
        // await driver.wait(until.elementLocated(By.xpath('//*[@id="form2"]/table/tbody/tr[2]/td/div/table/thead/tr/th[7]')), 10000);
        // const coNoElement = await driver.findElement(By.xpath(`//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[last()]/td[7]`));
        // const coNo = await coNoElement.getAttribute('innerText');
        // const currentDate = new Date();
        // const day = currentDate.getDate().toString().padStart(2, '0');
        // const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
        // const year = currentDate.getFullYear().toString().slice(-2);
        // const currentDateFormatted = `${day}-${month}-${year}`;

        if (coNo) {


          const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted, errorMsg: "-" });
          await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.SUCCESS })


          // await driver.navigate().refresh();
          await driver.sleep(10000)
        } else {


          const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', isActive: false });
          await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })

          // await driver.navigate().refresh();
          await driver.sleep(10000)
        }
      }
      // }
      return new CommonResponseModel(true, 1, `COline created successfully`)
    } catch (error) {

      console.log(error, 'error');
      if (error.name === 'TimeoutError') {
        const update = await this.eddieCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Color found', isActive: false });
        await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })
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

  async isAlertPresent(driver) {
    try {
      await driver.switchTo().alert();
      return true;
    } catch (e) {
      return false;
    }
  }



  async updateCOLineStatus(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqqqqqqqponumnbbb");
    try {
      const poLines = req.poLine.split(","); // Split poLine string into an array

      // Iterate over each poLine and update its status
      for (const poLine of poLines) {
        await this.EddieOrdersRepo.update(
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