import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { LevisOrdersRepository } from "./repositories/levis-orders.repo";
import { LevisPdfRepo } from "./repositories/levis-pdf.repo";
import { LevisPdfInfoEntity } from "./entities/levis-pdf.entity";
import { CoLineRequest, CommonResponseModel, LevisCoLinereqModel, LevisColorModel, LevisCompareModel, LevisDestinationModel, LevisOrderFilter, LevisSizeModel, LevisSizeWiseModel, LevisSizeWiseReportModel, LevisSplitCompareModel, SizeModel, StatusEnum, levisOrderDataModel, levisOrderReportDataModel } from "@project-management-system/shared-models";
import { LevisCOLineEntity } from "./entities/levis-co-line.entity";
import { LevisCOLineRepository } from "./repositories/levis-co-line.repository";
import { ItemNoDtos } from "../sanmar/dto/sanmar-item-no.dto";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";
import { ColorRepository } from "../Entites@Shahi/color/color-repo";
import { SizeRepository } from "../Entites@Shahi/size/size-repo";
import { AddressRepository } from "../Entites@Shahi/address/address.repo";
import { AddressService } from "../Entites@Shahi/address/address-service";
import { LevisOrdersChildRepository } from "./repositories/levis-orders-child.repo";
import { LevisOrderschildEntity } from "./entities/levis-orders-child-entity";


const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');
import * as puppeteer from 'puppeteer';
import { Cron } from "@nestjs/schedule";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { LevisOrdersEntity } from "./entities/levis-orders.entity";
import { EditLevisCOLineEntity } from "./entities/edit-levis-co-line.entity";
import { EditLevisCOLineRepository } from "./repositories/edit-levis-co-line.repository";




@Injectable()
export class LevisService {


  constructor(
    private dataSource: DataSource,
    private LevisOrdersRepo: LevisOrdersRepository,
    private pdfRepo: LevisPdfRepo,
    private levisCoLineRepo: LevisCOLineRepository,
    private colorRepo: ColorRepository,
    private sizeRepo: SizeRepository,
    private AddressRepo: AddressRepository,
    private AddressService: AddressService,
    private LevisOrdersChildRepo: LevisOrdersChildRepository,
    private EditRepo: EditLevisCOLineRepository



  ) { }

  // async saveLevisOrder(req: any): Promise<CommonResponseModel> {
  //   console.log(req, "reqqqqqqqqqqqqq")
  //   // const transactionManager = new GenericTransactionManager(this.dataSource)
  //   try {
  //     let saved
  //     // await transactionManager.startTransaction()
  //     for (const item of req.LevispoItemDetails) {
  //       const match = item.poLine.match(/\d+/);
  //       console.log(match, "match");
  //       // Check if a match is found and convert it to an integer
  //       // const poLine = match ? parseInt(match[0], 10) : null;
  //       const poLine = match

  //       console.log(poLine, "poLine")
  //       for (const variant of item.LevispoItemVariantDetails) {
  //         const orderData = await this.LevisOrdersRepo.findOne({ where: { poNumber: req.poNumber, poLine: poLine, size: variant.size } })
  //         const order = await this.LevisOrdersChildRepo.findOne({ where: { poNumber: req.PoNumber, poLine: poLine, size: variant.size }, order: { poVersion: 'DESC' } })
  //         console.log(orderData, "orderData")
  //         console.log(order, "order")
  //         const entity = new LevisOrdersEntity();
  //         entity.poNumber = req.poNumber
  //         entity.deliveryAddress = req.deliveryAddress
  //         // entity.transMode = req.transMode
  //         entity.currency = req.currency

  //         entity.poLine = item.poLine
  //         entity.material = item.material
  //         // entity.totalUnitPrice = item.totalUnitPrice
  //         // entity.originalDate = item.originalDate
  //         entity.transMode = item.transMode
  //         entity.plannedExFactoryDate = item.plannedExFactoryDate
  //         entity.exFactoryDate = item.exFactoryDate

  //         entity.itemNo = variant.itemNo
  //         // entity.product = variant.product
  //         entity.size = variant.size
  //         entity.upc = variant.upc
  //         // entity.plannedExFactoryDate = variant.plannedExFactoryDate
  //         // entity.exFactoryDate = variant.exFactoryDate
  //         entity.quantity = variant.quantity
  //         entity.unitPrice = variant.unitPrice
  //         entity.scheduledDate = variant.scheduledDate

  //         if (orderData) {
  //           const update = await this.LevisOrdersRepo.update({ poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, {
  //             deliveryAddress:req.deliveryAddress,currency:req.currency,material:item.material,transMode:item.transMode,
  //             size:item.size,upc:variant.upc,quantity:variant.quantity,unitPrice:variant.unitPrice,scheduledDate:variant.scheduledDate
  //           })
  //           let po = parseInt(order?.poVersion) + 1
  //           const entitys= new LevisOrderschildEntity();
  //           entitys.poNumber = req.poNumber
  //           entitys.deliveryAddress = req.deliveryAddress
  //           // entitys.transMode = req.transMode
  //           entitys.currency = req.currency

  //           entitys.poLine = item.poLine
  //           entitys.material = item.material
  //           // entitys.totalUnitPrice = item.totalUnitPrice
  //           // entitys.originalDate = item.originalDate
  //           entitys.transMode = item.transMode
  //           entitys.plannedExFactoryDate = item.plannedExFactoryDate
  //           entitys.exFactoryDate = item.exFactoryDate

  //           entitys.itemNo = variant.itemNo
  //           // entitys.product = variant.product
  //           entitys.size = variant.size
  //           entitys.upc = variant.upc
  //           // entitys.plannedExFactoryDate = variant.plannedExFactoryDate
  //           // entitys.exFactoryDate = variant.exFactoryDate
  //           entitys.quantity = variant.quantity
  //           entitys.unitPrice = variant.unitPrice
  //           entitys.scheduledDate = variant.scheduledDate
  //           entitys.orderId=orderData.id

  //           entitys.poVersion = po.toString()

  //           const savedChild = await this.LevisOrdersChildRepo.save(entitys)
  //           if (!update.affected) {
  //             throw new Error('Update failed');
  //           }
  //         } else {
  //           saved = await this.LevisOrdersRepo.save(entity)
  //           const entitys= new LevisOrderschildEntity();
  //           entitys.poNumber = req.poNumber
  //           entitys.deliveryAddress = req.deliveryAddress
  //           // entitys.transMode = req.transMode
  //           entitys.currency = req.currency

  //           entitys.poLine = item.poLine
  //           entitys.material = item.material
  //           // entitys.totalUnitPrice = item.totalUnitPrice
  //           // entitys.originalDate = item.originalDate
  //           entitys.transMode = item.transMode
  //           entitys.plannedExFactoryDate = item.plannedExFactoryDate
  //           entitys.exFactoryDate = item.exFactoryDate

  //           entitys.itemNo = variant.itemNo
  //           // entitys.product = variant.product
  //           entitys.size = variant.size
  //           entitys.upc = variant.upc
  //           // entitys.plannedExFactoryDate = variant.plannedExFactoryDate
  //           // entitys.exFactoryDate = variant.exFactoryDate
  //           entitys.quantity = variant.quantity
  //           entitys.unitPrice = variant.unitPrice
  //           entitys.scheduledDate = variant.scheduledDate
  //           entitys.orderId=entity.id
  //           const savedChild = await this.LevisOrdersChildRepo.save(entitys)
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


  async saveLevisOrder(req: any): Promise<CommonResponseModel> {
    const transactionManager = new GenericTransactionManager(this.dataSource);

    try {
      let saved;
      const pdfData = [];

      await transactionManager.startTransaction();

      for (const item of req.LevispoItemDetails) {
        for (const variant of item.LevispoItemVariantDetails) {
          const orderData = await this.LevisOrdersRepo.findOne({ where: { poNumber: req.poNumber, poLine: item.poLine, size: variant.size } });
          const order = await this.LevisOrdersChildRepo.findOne({ where: { poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, order: { poVersion: 'DESC' } })

          const entity = new LevisOrdersEntity();
          entity.poNumber = req.poNumber
          entity.deliveryAddress = req.deliveryAddress
          entity.currency = req.currency
          entity.poRemarks = req.poRemarks
          entity.splitPo = req.splitPo
          entity.totalQuantity = req.totalQuantity
          entity.splitPoTotalQuantity = req.splitPoTotalQuantity

          entity.poLine = item.poLine
          entity.material = item.material
          entity.transMode = item.transMode
          entity.plannedExFactoryDate = item.plannedExFactoryDate
          entity.exFactoryDate = item.exFactoryDate

          entity.itemNo = variant.itemNo
          entity.size = variant.size
          entity.upc = variant.upc
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice
          entity.scheduledDate = variant.scheduledDate
          pdfData.push(entity);

          // if (orderData) {
          //   // Check if any of the fields have changed
          //   const fieldsChanged = Object.keys(entity).some(key => orderData[key] !== entity[key]);

          //   console.log("update")

          if (orderData) {
            const update = await transactionManager.getRepository(LevisOrdersEntity).update(
              { poNumber: req.poNumber, poLine: item.poLine, size: variant.size },
              {
                deliveryAddress: req.deliveryAddress, currency: req.currency, poRemarks: req.poRemarks, splitPo: req.splitPo, totalQuantity: req.totalQuantity,
                splitPoTotalQuantity:req.splitPoTotalQuantity,
                material: item.material, transMode: item.transMode, plannedExFactoryDate: item.plannedExFactoryDate, exFactoryDate: item.exFactoryDate,
                itemNo: variant.itemNo, upc: variant.upc, quantity: variant.quantity, unitPrice: variant.unitPrice, scheduledDate: variant.scheduledDate
              }
            );
            console.log("update", update)

            let po = parseInt(order?.poVersion) + 1
            const entitys = new LevisOrderschildEntity()

            entitys.poNumber = req.poNumber
            entitys.deliveryAddress = req.deliveryAddress
            entitys.currency = req.currency
            entitys.poRemarks = req.poRemarks
            entitys.splitPo = req.splitPo
            entitys.totalQuantity = req.totalQuantity
            entitys.splitPoTotalQuantity = req.splitPoTotalQuantity

            entitys.poLine = item.poLine
            entitys.material = item.material
            entitys.transMode = item.transMode
            entitys.plannedExFactoryDate = item.plannedExFactoryDate
            entitys.exFactoryDate = item.exFactoryDate

            entitys.itemNo = variant.itemNo
            entitys.size = variant.size
            entitys.upc = variant.upc
            entitys.quantity = variant.quantity
            entitys.unitPrice = variant.unitPrice
            entitys.scheduledDate = variant.scheduledDate
            entitys.poVersion = po.toString()
            entitys.orderId = orderData.id

            const savedChild = await transactionManager.getRepository(LevisOrderschildEntity).save(entitys)


            if (!update.affected) {
              throw new Error('Update failed');
            }
          }
          // } 
          else {
            // Only save if the record doesn't exist
            saved = await transactionManager.getRepository(LevisOrdersEntity).save(entity);
            const entitys = new LevisOrderschildEntity()

            entitys.poNumber = req.poNumber
            entitys.deliveryAddress = req.deliveryAddress
            entitys.currency = req.currency
            entitys.poRemarks = req.poRemarks
            entitys.splitPo = req.splitPo
            entitys.totalQuantity = req.totalQuantity
            entitys.splitPoTotalQuantity = req.splitPoTotalQuantity

            entitys.poLine = item.poLine
            entitys.material = item.material
            entitys.transMode = item.transMode
            entitys.plannedExFactoryDate = item.plannedExFactoryDate
            entitys.exFactoryDate = item.exFactoryDate

            entitys.itemNo = variant.itemNo
            entitys.size = variant.size
            entitys.upc = variant.upc
            entitys.quantity = variant.quantity
            entitys.unitPrice = variant.unitPrice
            entitys.scheduledDate = variant.scheduledDate
            entitys.orderId = entity.id

            const savedChild = await await transactionManager.getRepository(LevisOrderschildEntity).save(entitys)


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



  // async updatePath(req: any, poNumber: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
  //   console.log(poNumber, "pppppioooooo");
  //   const entity = new LevisPdfInfoEntity();
  //   entity.poNumber = poNumber;
  //   entity.pdfFileName = filename;
  //   entity.filePath = filePath;
  //   entity.fileType = mimetype;
  //   entity.fileData = req;
  //   entity.uploadStatus = "SUCCESS";

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

  async updatePath(req: any, jsonData: any, poNumber: any): Promise<CommonResponseModel> {
    try {

      let flag = true;
      const entities = []
      for (const res of req) {
        const entity = new LevisPdfInfoEntity();
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






  async getorderacceptanceData(req?: LevisOrderFilter): Promise<CommonResponseModel> {
   // console.log(req, "servvv")
    try {
      const details = await this.LevisOrdersRepo.getorderacceptanceData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, levisOrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`,
            new levisOrderDataModel(rec.id, rec.po_number, rec.delivery_address, rec.transmode, rec.currency, rec.po_line, rec.material, rec.total_unit_price, rec.original_date, rec.status, [], rec.ex_factory_date)
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.unitPrice === rec.unit_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new LevisSizeWiseModel(rec.product, rec.size, rec.upc, rec.planned_ex_factory_date, rec.ex_factory_date, rec.quantity, rec.unit_price, rec.item_no));
        }
      }
      const dataModelArray: levisOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
     // console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async getPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.LevisOrdersRepo.getPoNumber()
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
      const records = await this.LevisOrdersRepo.find({ where: { poNumber: req.poNumber } });
      const uniquePoLines = [...new Set(records.map((rec) => rec.poLine))];
      const empty = [];

      //console.log(rec,'reccccccccc')
      const entity = new LevisCOLineEntity()
      entity.poLine = uniquePoLines.join(',');
      entity.buyer = req.buyer
      entity.poNumber = req.poNumber;
      entity.material = req.material;
      entity.itemNo = req?.itemNo;
      entity.status = 'Open';
      // entity.deliveryDate = req.deliveryDate;
      entity.createdUser = 'admin';
      empty.push(entity)

      // console.log(empty,'emptyyyyy')
      const save = await this.levisCoLineRepo.save(empty);



      if (save) {
        const update = await this.LevisOrdersRepo.update(
          { poNumber: req.poNumber }, // Conditions for updating
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


  async getCoLineData(req?: LevisOrderFilter): Promise<CommonResponseModel> {
    const data = await this.levisCoLineRepo.getCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getCoPoNumber(): Promise<CommonResponseModel> {
    const data = await this.levisCoLineRepo.getCoPoNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getItem(): Promise<CommonResponseModel> {
    try {
      const data = await this.levisCoLineRepo.getItem()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }


  async updateItemNo(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const update = await this.levisCoLineRepo.update(
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
      const deletedItem = await this.levisCoLineRepo.delete({ id: Number(req.id) });

      if (deletedItem && deletedItem.affected) {
        return new CommonResponseModel(true, 1, "ItemNo Deleted Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Item No: Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
    }
  }


  async getorderDataForInfo(req?: LevisOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")
    try {
      const details = await this.LevisOrdersRepo.getorderDataForInfo(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, levisOrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`,
            new levisOrderDataModel(rec.id, rec.po_number, rec.delivery_address, rec.transmode, rec.currency, rec.po_line, rec.material, rec.total_unit_price, rec.original_date, rec.status, [], rec.ex_factory_date)
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.unitPrice === rec.unit_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new LevisSizeWiseModel(rec.product, rec.size, rec.upc, rec.planned_ex_factory_date, rec.ex_factory_date, rec.quantity, rec.unit_price, rec.item_no));
        }
      }
      const dataModelArray: levisOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async updateStatusInOrder(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqOpenStatus")
    try {
      const update = await this.LevisOrdersRepo.update(
        { poNumber: req.poNumber },
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

  async getPdfFileInfo(req:any): Promise<CommonResponseModel> {
    console.log(req,'reqqqqqqqq')
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

  // async getOrderdataForCOline(req: OrderDetailsReq): Promise<CommonResponseModel> {
  //   try {
  //     const data = await this.LevisOrdersRepo.find({ where: { poNumber: req.poNumber } })

  //     // po -> destination -> color -> sizes
  //     const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
  //     const poMap = new Map<string, LevisOrdersEntity>();
  //     data.forEach(rec => {
  //       poMap.set(`${rec.poNumber}`, rec)
  //       // const destCountry = rec.shipToAdd.slice(-13).trim();
  //       // console.log(destCountry,"hirrrrrrrrrrrrrrrrrr")

  //       // const parts = rec.deliveryAddress.split(',')
  //       // const destAdd = parts[2].trim();
  //       // const dest = destAdd;
  //       const dest = rec.deliveryAddress;


  //       if (!destinationColSizesMap.has(`${rec.poNumber}`)) {
  //         destinationColSizesMap.set(`${rec.poNumber}`, new Map<string, Map<string, []>>());
  //       }
  //       if (!destinationColSizesMap.get(`${rec.poNumber}`).has(dest)) {
  //         destinationColSizesMap.get(`${rec.poNumber}`).set(dest, new Map<string, []>());
  //       }

  //       const check = await this.colorRepo.find({
  //         where: {
  //           colorCode: rec.product
  //         }
  //       });

  //       if (!destinationColSizesMap.get(`${rec.poNumber}`).get(dest).has(rec.product)) {
  //         destinationColSizesMap.get(`${rec.poNumber}`).get(dest).set(rec.product, []);
  //       }
  //       destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(rec.product).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
  //     });
  //     const coData = []
  //     destinationColSizesMap.forEach((destColorSize, poNumber) => {
  //       const desArray = []
  //       destColorSize.forEach((colorSizes, dest) => {
  //         const ColArray = []
  //         colorSizes.forEach((sizes, color) => {
  //           const sizeArray = []
  //           sizes.forEach((size) => {
  //             const sizeObj = new LevisSizeModel(size.size, size.quantity, size.price);
  //             sizeArray.push(sizeObj)
  //           })
  //           const col = new LevisColorModel(color, sizeArray);
  //           ColArray.push(col)
  //         });
  //         const des = new LevisDestinationModel(dest, ColArray);
  //         desArray.push(des)
  //       });
  //       const poInfo = poMap.get(poNumber)
  //       const co = new LevisCoLinereqModel(poInfo.poNumber, poInfo.unitPrice, poInfo.currency, poInfo.plannedExFactoryDate, desArray);
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

  // async getOrderdataForCOline(req: OrderDetailsReq): Promise<CommonResponseModel> {
  //   try {
  //     // const poLineValues = req.poLine.split(',')
  //     const poLineValues = req?.poLine
  //     const data = await this.LevisOrdersRepo.find({ where: { poNumber: req.poNumber, poLine: poLineValues } });
  //     // const exfacDate = data[0]?.exFactoryDate
  //     // console.log(exfacDate,"exfacDate")


  //     // const [day, month, year] = exfacDate?.split('.');
  //     // const inputDate = new Date(`${year}-${month}-${day}`);


  //     // const FourteenDaysafter = new Date(inputDate);
  //     // FourteenDaysafter.setDate(inputDate.getDate() + 14);
  //     // const DeliveryDate = new Intl.DateTimeFormat('en-GB').format(FourteenDaysafter);
  //     // console.log(DeliveryDate,"DeliveryDate")


  //     // po -> destination -> color -> sizes
  //     const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
  //     const poMap = new Map<string, LevisOrdersEntity>();

  //     for (const rec of data) {
  //       poMap.set(`${rec.poNumber}`, rec);
  //       // const dest = rec.deliveryAddress;
  //       const parts = rec.deliveryAddress.split(',')
  //       const destAdd = parts[0].trim();
  //       const dest = destAdd;


  //       if (!destinationColSizesMap.has(`${rec.poNumber}`)) {
  //         destinationColSizesMap.set(`${rec.poNumber}`, new Map<string, Map<string, []>>());
  //       }
  //       if (!destinationColSizesMap.get(`${rec.poNumber}`).has(dest)) {
  //         destinationColSizesMap.get(`${rec.poNumber}`).set(dest, new Map<string, []>());
  //       }
  //       console.log(rec.material, "material")
  //       const colorcheck = await this.colorRepo.findOne({
  //         where: {
  //           colorCode: rec.material
  //         }
  //       });

  //       console.log(colorcheck, "color")
  //       if (colorcheck) {
  //         if (!destinationColSizesMap.get(`${rec.poNumber}`).get(dest).has(colorcheck.colorName)) {
  //           destinationColSizesMap.get(`${rec.poNumber}`).get(dest).set(colorcheck.colorName, []);
  //         }

  //       }

  //       const sizecheck = await this.sizeRepo.findOne({
  //         where: {
  //           poSize: rec.size
  //         }
  //       });

  //       if (sizecheck) {

  //         destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(colorcheck.colorName).push({ size: sizecheck.crmSize, quantity: rec.quantity, price: rec.unitPrice });

  //       } else {

  //         destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(colorcheck.colorName).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
  //       }

  //     }

  //     const coData = [];
  //     destinationColSizesMap.forEach((destColorSize, poNumber) => {
  //       const desArray = [];
  //       destColorSize.forEach((colorSizes, dest) => {
  //         const ColArray = [];
  //         colorSizes.forEach((sizes, color) => {
  //           const sizeArray = [];
  //           sizes.forEach((size) => {
  //             const sizeObj = new LevisSizeModel(size.size, size.quantity, size.price);
  //             sizeArray.push(sizeObj);
  //           });
  //           const col = new LevisColorModel(color, sizeArray);
  //           ColArray.push(col);
  //         });
  //         const des = new LevisDestinationModel(dest, ColArray);
  //         desArray.push(des);
  //       });
  //       const poInfo = poMap.get(poNumber);

  //       const parsedDate = moment(poInfo?.exFactoryDate, "DD.MM.YYYY");
  //       let formattedExFactDate = parsedDate.format("DD/MM/YYYY");

  //       if (parsedDate.isSameOrBefore(moment(), 'day')) {
  //         formattedExFactDate = '';
  //       }



  //       const co = new LevisCoLinereqModel(poInfo.poNumber, poInfo.unitPrice, poInfo.currency, formattedExFactDate, formattedExFactDate, poInfo.material, desArray);
  //       coData.push(co);
  //     });

  //     if (coData.length > 0) {
  //       return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', coData);
  //     } else {
  //       return new CommonResponseModel(false, 0, 'No data found');
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async getOrderdataForCOline(req: OrderDetailsReq): Promise<CommonResponseModel> {
    try {
      const poLineValues = req?.poLine;
      const data = await this.LevisOrdersRepo.find({ where: { poNumber: req.poNumber, poLine: poLineValues } });

      const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
      const poMap = new Map<string, LevisOrdersEntity>();

      for (const rec of data) {
        poMap.set(`${rec.poNumber}`, rec);
        const parts = rec.deliveryAddress.split(',');
        const destAdd = parts[0].trim();
        const dest = destAdd;

        if (!destinationColSizesMap.has(`${rec.poNumber}`)) {
          destinationColSizesMap.set(`${rec.poNumber}`, new Map<string, Map<string, []>>());
        }
        if (!destinationColSizesMap.get(`${rec.poNumber}`).has(dest)) {
          destinationColSizesMap.get(`${rec.poNumber}`).set(dest, new Map<string, []>());
        }

        const colorcheck = await this.colorRepo.findOne({
          where: {
            colorCode: rec.material
          }
        });

        const colorName = colorcheck ? colorcheck.colorName : '';
        if (!destinationColSizesMap.get(`${rec.poNumber}`).get(dest).has(colorName)) {
          destinationColSizesMap.get(`${rec.poNumber}`).get(dest).set(colorName, []);
        }

        const sizecheck = await this.sizeRepo.findOne({
          where: {
            poSize: rec.size
          }
        });

        if (sizecheck) {
          destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(colorName).push({ size: sizecheck.crmSize, quantity: rec.quantity, price: rec.unitPrice });
        } else {
          destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(colorName).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
        }
      }

      const coData = [];
      destinationColSizesMap.forEach((destColorSize, poNumber) => {
        const desArray = [];
        destColorSize.forEach((colorSizes, dest) => {
          const ColArray = [];
          colorSizes.forEach((sizes, color) => {
            const sizeArray = [];
            sizes.forEach((size) => {
              const sizeObj = new LevisSizeModel(size.size, size.quantity, size.price);
              sizeArray.push(sizeObj);
            });
            const col = new LevisColorModel(color, sizeArray);
            ColArray.push(col);
          });
          const des = new LevisDestinationModel(dest, ColArray);
          desArray.push(des);
        });
        const poInfo = poMap.get(poNumber);

        const parsedDate = moment(poInfo?.exFactoryDate, "DD.MM.YYYY");
        let formattedExFactDate = parsedDate.format("DD/MM/YYYY");

        if (parsedDate.isSameOrBefore(moment(), 'day')) {
          formattedExFactDate = '';
        }

        const co = new LevisCoLinereqModel(poInfo.poNumber, poInfo.unitPrice, poInfo.currency, formattedExFactDate, formattedExFactDate, poInfo.material, desArray);
        coData.push(co);
      });

      if (coData.length > 0) {
        return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', coData);
      } else {
        return new CommonResponseModel(false, 0, 'No data found');
      }
    } catch (err) {
      throw err;
    }
  }



  async getordercomparationData(req?: any): Promise<CommonResponseModel> {
    try {
      const Originaldata = await this.LevisOrdersRepo.getordercomparationData(req)
      const compareModel: LevisCompareModel[] = []

      for (const rec of Originaldata) {
        //console.log(rec, "rec")
        const itemNumber = await this.LevisOrdersRepo.getItemsNo(rec.po_number)
        const coNumber = await this.LevisOrdersRepo.getItemsNo(rec.po_number)
        const coDate = await this.LevisOrdersRepo.getItemsNo(rec.po_number)
        // console.log(itemNumber, 'kkkkkkkkkkkkkkkk')
        // console.log(coNumber, 'lllllllllll')
        // console.log(coDate, 'mmmmmmmm')
        const childData = await this.LevisOrdersChildRepo.find({
          where: {
            poNumber: rec.po_number, poLine: rec.po_line, size: rec.size
          }, order: { id: 'DESC' }, take: 1, skip: 1
        })
        if (childData.length > 0) {
          const oldData = childData[0];
          // Check for changes in values
          if (
            oldData.unitPrice !== rec.unit_price ||
            oldData.exFactoryDate !== rec.ex_factory_date ||
            oldData.quantity !== rec.quantity ||
            oldData.transMode !== rec.transmode ||
            oldData.deliveryAddress !== rec.delivery_address
          ) {
            // Only push if there are changes
            compareModel.push(new
              LevisCompareModel(
                rec.po_number,
                rec.po_line,
                rec.size,
                oldData.unitPrice,
                rec.unit_price,
                oldData.exFactoryDate,
                rec.ex_factory_date,
                oldData.quantity,
                rec.quantity,
                oldData.transMode,
                rec.transmode,
                oldData.deliveryAddress,
                rec.delivery_address,
                oldData.status,
                itemNumber?.item_no ? itemNumber?.item_no : "-",
                coNumber?.co_number,
                coDate?.co_date,
                rec.material

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

  async createCOline(req: any): Promise<CommonResponseModel> {
    const [po] = await this.levisCoLineRepo.getDataforCOLineCreation();
    if (!po) {
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
      // for (const po of poDetails) {
      console.log(po)
      const coLine = new CoLineRequest();
      let buyerValue1;
      let buyerValue2;
      let agent;
      let buyerAddress;
      let deliveryAddress;
      let pkgTerms;
      let paymentTerms;
      let styleNo;
      if (po.buyer === 'LEVIS') {
        const response = await this.getOrderdataForCOline({ poNumber: po.po_number, poLine: po.po_line })
        console.log(response.data[0], "response")
        const coData = response.data[0];
        coLine.buyerPo = coData.poNumber
        // const inputDate = new Date(coData.deliveryDate)
        // Calculate the date 7 days before the GAC date
        // const sevenDaysBefore = new Date(inputDate);
        // sevenDaysBefore.setDate(inputDate.getDate() - 7);
        // const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBefore);

        coLine.deliveryDate = coData.deliveryDate
        coLine.salesPrice = coData.salesPrice
        coLine.currency = coData.currency
        coLine.destinations = coData.destinations
        coLine.exFactoryDate = coData.exfactoryDate

        console.log(coLine.exFactoryDate, "exFactoryDate")
        console.log(coLine.deliveryDate, "deliveryDate")

        const request = coData.destinations[0]?.name;
        console.log(request, "request")
        const address = await this.AddressService.getAddressInfoByCountry({ country: request });
        const addressData = address.data[0];
        console.log("----------------start----------------")

        if (!addressData) {
          const update = await this.levisCoLineRepo.update(
            { poNumber: po.po_number, poLine: po.po_line },
            { status: "Failed", errorMsg: "Address not matching", isActive: false }
          );
          await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED });
          return new CommonResponseModel(false, 0, "Address not matching");
        }

        console.log("----------------end----------------")

        console.log(addressData, "address")
        styleNo = coData.style
        buyerAddress = addressData?.buyerAddressCode
        deliveryAddress = addressData?.deliveryAddressCode
        buyerValue1 = "LIV-LIVIS"
        buyerValue2 = "LEV00002-LEVI STRAUSS GLOBAL TRADING CO LTD"
        agent = "-NA"
        pkgTerms = "STD-STD PACK"
        paymentTerms = "063-TT  75 Days"
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
      const number = optionValues.find(value => {
        return Number(value.split('-')[0].trim()) == Number(buyerAddress)
      });
      // const number = optionValues.find(value => value.includes(buyerAddress)); // give the dynamic value here
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
          } else if ((await tab.getAttribute('innerText')) == 'ASORTED') {
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
                  // if ((await tab.getAttribute('innerText')) == 'ASORTED') {
                  //   tabIndex = 2
                  // }
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
                  const number = optionValues.find(value => {
                    return Number(value.split('-')[0].trim()) == Number(deliveryAddress)
                  });
                  console.log(number, "nummmm")
                  // const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
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
                    const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Size found', isActive: false });
                    await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })
                    return new CommonResponseModel(false, 0, 'NO matching Size found')
                  }
                }
                const inputId = `${size.name}:${color.name}:ASORTED`.replace(/\*/g, '');
                console.log(inputId, "ppppp")
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
        const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: alertText, isActive: false });

        await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })

        await alert.accept();
        await driver.sleep(5000)
        await driver.navigate().refresh();
        await driver.quit();
        return new CommonResponseModel(false, 0, alertText)

      } else {
        await driver.sleep(10000)
        await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
        const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
        const coNo = await coNoElement.getAttribute('value');
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
        const year = currentDate.getFullYear().toString().slice(-2);
        const currentDateFormatted = `${day}-${month}-${year}`;
        if (coNo) {


          const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted, errorMsg: "-" });
          await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.SUCCESS })


          // await driver.navigate().refresh();
          await driver.sleep(10000)
        } else {


          const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', isActive: false });
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
        const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Color found', isActive: false });
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
        await this.LevisOrdersRepo.update(
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

  // @Cron('1 * * * *')
  async levisBot() {
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
      await page.type('#login-form_username', 'levis@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'levis');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      setTimeout(async () => {
        await page.goto('http://localhost:4200/#/levis/levis-pdf-upload/', {
          timeout: 100000,
          waitUntil: 'networkidle0'
        })
      }, 1000);



      //live directory paths:
      const directoryPath = 'D:/levis-unread/';
      const destinationDirectory = 'D:/levis-read/';

      const files = fs.readdirSync(directoryPath);
      // if (files.length === 0) {
      //   page.close()
      //   return new CommonResponseModel(false, 0, "No Files Found")
      // }
      for (const file of files) {
        await page.waitForSelector('input[type="file"]');
        const fileInput = await page.$('input[type="file"]');
        const filePath = path.join(directoryPath, file);
        await fileInput.uploadFile(filePath);
        await page.waitForTimeout(5000);

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

  async editCOline(req: any): Promise<CommonResponseModel> {
    const po = await this.EditRepo.getDataforCOLineEdit();
    if (!po) {
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
      // for (const po of poDetails) {
      console.log(po)
      const coLine = new CoLineRequest();
      let buyerValue1;
      let buyerValue2;
      let agent;
      let buyerAddress;
      let deliveryAddress;
      let pkgTerms;
      let paymentTerms;
      let styleNo;
      let coNumber
      if (po.buyer === 'LEVIS') {
        const response = await this.getOrderdataForCOline({ poNumber: po.po_number, poLine: po.po_line })
        console.log(response.data[0], "response")
        const coData = response.data[0];
        coLine.buyerPo = coData.poNumber
        // const inputDate = new Date(coData.deliveryDate)
        // Calculate the date 7 days before the GAC date
        // const sevenDaysBefore = new Date(inputDate);
        // sevenDaysBefore.setDate(inputDate.getDate() - 7);
        // const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBefore);

        coLine.deliveryDate = coData.deliveryDate
        coLine.salesPrice = coData.salesPrice
        coLine.currency = coData.currency
        coLine.destinations = coData.destinations
        coLine.exFactoryDate = coData.exfactoryDate
        coLine.coNumber = po.co_number

        console.log(coLine.exFactoryDate, "exFactoryDate")
        console.log(coLine.deliveryDate, "deliveryDate")

        const request = coData.destinations[0]?.name;
        console.log(request, "request")
        const address = await this.AddressService.getAddressInfoByCountry({ country: request });
        const addressData = address.data[0];
        console.log("----------------start----------------")

        if (!addressData) {
          const update = await this.levisCoLineRepo.update(
            { poNumber: po.po_number, poLine: po.po_line },
            { status: "Failed", errorMsg: "Address not matching", isActive: false }
          );
          await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED });
          return new CommonResponseModel(false, 0, "Address not matching");
        }

        console.log("----------------end----------------")

        console.log(addressData, "address")
        styleNo = coData.style
        buyerAddress = addressData?.buyerAddressCode
        deliveryAddress = addressData?.deliveryAddressCode
        buyerValue1 = "LIV-LIVIS"
        buyerValue2 = "LEV00002-LEVI STRAUSS GLOBAL TRADING CO LTD"
        agent = "-NA"
        pkgTerms = "STD-STD PACK"
        paymentTerms = "063-TT  75 Days"
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
      await driver.sleep(10000)

      await driver.wait(until.elementLocated(By.id('ViewOrderID')))
      await driver.findElement(By.id('ViewOrderID')).click();
        //   await driver.executeScript("document.body.style.zoom = '80%'");
        // console.log("Screen zoomed out by 80%");
     
      await driver.sleep(50000)
      console.log("startLoop")
     

      let j;
      for (let i = 1; i <= 1000; i++) {
        const buyerpoPath = `//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[${i}]/td[4]`;
        const coNumberPath = `//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[${i}]/td[7]`;

        console.log(buyerpoPath, "buyerpoPath")
        console.log(coNumberPath, "coNumberPath")



        console.log("----------------------------------")
        const BuyerPoelementContainingNumber = await driver.findElement(By.xpath(buyerpoPath));
        const coNumberelementContaining = await driver.findElement(By.xpath(coNumberPath));

        console.log("==============================")
        console.log(BuyerPoelementContainingNumber, "elementContainingNumber")

        console.log("hiiiiiiiiiii")
        const textContainingBuyerPo = await BuyerPoelementContainingNumber.getText();
        console.log("uuuuuuuuuuuuuuu")
         
        const textContainingCoNumber = await coNumberelementContaining.getText();
        console.log(`Element containing the number in row ${i}:`, textContainingBuyerPo);
        console.log(coLine.coNumber, "coLine.coNumber")
        if (textContainingBuyerPo === coLine.buyerPo && textContainingCoNumber === coLine.coNumber) {
          j = i
          console.log(`Found the desired text in row ${i}!`);
          break;
        }
      }
       console.log("janiii")
       
      const viewButtonPo = await driver.findElement(By.xpath(`//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[${j}]/td[21]/div`));
      await viewButtonPo.click();
      console.log(`//*[@id="form2"]/table/tbody/tr[2]/td/div/table/tbody/tr[31]/td[21]/div`, "kkkkkkkk")
      console.log(viewButtonPo,"viewButtonPo")

      console.log("ExfactroyDate starts")
      await driver.wait(until.elementLocated(By.name('dojo.EXFACTORYDATE')));
      await driver.findElement(By.name('dojo.EXFACTORYDATE')).clear();
      await driver.findElement(By.name('dojo.EXFACTORYDATE')).sendKeys(coLine.exFactoryDate);
      console.log("ExfactroyDate end")

      console.log("DeliveryDate starts")
      await driver.wait(until.elementLocated(By.name('dojo.delydt')));
      await driver.findElement(By.name('dojo.delydt')).clear();
      await driver.findElement(By.name('dojo.delydt')).sendKeys(coLine.deliveryDate);
      console.log("DeliveryDate end")

      // await driver.sleep(50000)







      // await driver.findElement(By.id('CreateOrderID')).click();

      // await driver.wait(until.elementLocated(By.id('CreateOrderID')))
      // await driver.sleep(3000)
      // await driver.findElement(By.id('CreateOrderID')).click();
      // await driver.wait(until.elementLocated(By.id('bpo')))
      // await driver.findElement(By.id('bpo')).clear();
      // await driver.findElement(By.id('bpo')).sendKeys(coLine.buyerPo);
      // await driver.wait(until.elementLocated(By.id('bus')))
      // await driver.findElement(By.id('bus')).clear();
      // await driver.findElement(By.id('bus')).sendKeys(styleNo);
      // await driver.wait(until.elementLocated(By.id('agnt')));
      // const agentDropDown = await driver.findElement(By.id('agnt'));
      // await driver.executeScript(`arguments[0].value = '${agent}';`, agentDropDown)
      // await driver.wait(until.elementLocated(By.name('dojo.EXFACTORYDATE')));
      // await driver.findElement(By.name('dojo.EXFACTORYDATE')).clear();
      // await driver.findElement(By.name('dojo.EXFACTORYDATE')).sendKeys(coLine.exFactoryDate);
      // await driver.wait(until.elementLocated(By.name('dojo.delydt')));
      // await driver.findElement(By.name('dojo.delydt')).clear();
      // await driver.findElement(By.name('dojo.delydt')).sendKeys(coLine.deliveryDate);
      await driver.wait(until.elementLocated(By.name('byd')));
      const dropdown = await driver.findElement(By.name('byd'));
      const options = await dropdown.findElements(By.tagName('option'));
      const optionValues = [];
      for (const option of options) {
        const value = await option.getAttribute('value');
        optionValues.push(value);
      }
      const number = optionValues.find(value => {
        return Number(value.split('-')[0].trim()) == Number(buyerAddress)
      });
      // const number = optionValues.find(value => value.includes(buyerAddress)); // give the dynamic value here
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



      // for (let dest of coLine.destinations) {
      //   const colorsContainer = await driver.wait(until.elementLocated(By.xpath('//*[@id="COContainer"]')));
      //   const colorsTabs = await colorsContainer.findElements(By.tagName('span'));
      //   for (const tab of colorsTabs) {
      //     if ((await tab.getAttribute('innerText')) == dest.name) {
      //       await driver.executeScript('arguments[0].click();', tab);
      //       for (let [colorIndex, color] of dest.colors.entries()) {
      //         for (let [sizeIndex, size] of color.sizes.entries()) {
      //           if (colorIndex === 0) {
      //             // Find all the labels in the second row.
      //             await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
      //             let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
      //             const fileteredElements: any[] = [];
      //             for (const labelElement of labelElements) {
      //               const ele = (await labelElement.getText())?.trim();
      //               ele.length > 0 ? fileteredElements.push(labelElement) : '';
      //             }
      //             let tabIndex = 1; // Default to 1 if no match
      //             const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
      //             const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
      //             await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
      //             const dropdown = await driver.findElement(By.id(`bydline/${string}`));
      //             const options = await dropdown.findElements(By.tagName('option'));
      //             const optionValues = [];
      //             for (const option of options) {
      //               const value = await option.getAttribute('value');
      //               optionValues.push(value);
      //             }
      //             const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
      //             await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
      //             // Find all the input fields in the first row.
      //             const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
      //             // Create a map of size labels to input fields.
      //             const sizeToInputMap = {};
      //             for (let i = 0; i < fileteredElements.length; i++) {
      //               const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
      //               if (label.length)
      //                 sizeToInputMap[label] = inputElements[i];
      //             }
      //             const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
      //             if (inputField) {
      //               // Clear the existing value (if any) and fill it with the new price.
      //               await inputField.clear();
      //               await inputField.sendKeys(size.price);
      //             }
      //           }
      //           const inputId = `${size.name}:${color.name}:${dest.name}`.replace(/\*/g, '');
      //           const input = await driver.wait(until.elementLocated(By.id(inputId)))
      //           await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
      //         }
      //       }
      //     } else if ((await tab.getAttribute('innerText')) == 'ASORTED') {
      //       await driver.executeScript('arguments[0].click();', tab);
      //       for (let [colorIndex, color] of dest.colors.entries()) {
      //         for (let [sizeIndex, size] of color.sizes.entries()) {
      //           if (colorIndex === 0) {
      //             // Find all the labels in the second row.
      //             await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
      //             let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
      //             const fileteredElements: any[] = [];
      //             for (const labelElement of labelElements) {
      //               const ele = (await labelElement.getText())?.trim();
      //               ele.length > 0 ? fileteredElements.push(labelElement) : '';
      //             }
      //             let tabIndex = 1; // Default to 1 if no match
      //             // if ((await tab.getAttribute('innerText')) == 'ASORTED') {
      //             //   tabIndex = 2
      //             // }
      //             const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
      //             const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
      //             await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
      //             const dropdown = await driver.findElement(By.id(`bydline/${string}`));
      //             const options = await dropdown.findElements(By.tagName('option'));
      //             const optionValues = [];
      //             for (const option of options) {
      //               const value = await option.getAttribute('value');
      //               optionValues.push(value);
      //             }
      //             const number = optionValues.find(value => {
      //               return Number(value.split('-')[0].trim()) == Number(deliveryAddress)
      //             });
      //             console.log(number, "nummmm")
      //             // const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
      //             await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
      //             // Find all the input fields in the first row.
      //             const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
      //             // Create a map of size labels to input fields.
      //             const sizeToInputMap = {};
      //             for (let i = 0; i < fileteredElements.length; i++) {
      //               const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
      //               if (label.length)
      //                 sizeToInputMap[label] = inputElements[i];
      //             }
      //             const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
      //             if (inputField) {
      //               // Clear the existing value (if any) and fill it with the new price.
      //               await inputField.clear();
      //               await inputField.sendKeys(size.price);
      //             } else {
      //               const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Size found', isActive: false });
      //               await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })
      //               return new CommonResponseModel(false, 0, 'NO matching Size found')
      //             }
      //           }
      //           const inputId = `${size.name}:${color.name}:ASORTED`.replace(/\*/g, '');
      //           console.log(inputId, "ppppp")
      //           const input = await driver.wait(until.elementLocated(By.id(inputId)), 10000)
      //           await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
      //         }
      //       }
      //     }
      //   }
      // }

      await driver.sleep(10000)
      // const element = await driver.findElement(By.id('createorder')).click();
      // await driver.wait(until.alertIsPresent(), 10000);
      // Switch to the alert and accept it (click "OK")
      const alert = await driver.switchTo().alert();
      await alert.accept();
      if (await this.isAlertPresent(driver)) {
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: alertText, isActive: false });

        await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })

        await alert.accept();
        await driver.sleep(5000)
        await driver.navigate().refresh();
        await driver.quit();
        return new CommonResponseModel(false, 0, alertText)

      } else {
        await driver.sleep(10000)
        await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
        const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
        const coNo = await coNoElement.getAttribute('value');
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
        const year = currentDate.getFullYear().toString().slice(-2);
        const currentDateFormatted = `${day}-${month}-${year}`;
        if (coNo) {


          const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted, errorMsg: "-" });
          await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.SUCCESS })


          // await driver.navigate().refresh();
          await driver.sleep(10000)
        } else {


          const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', isActive: false });
          await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })

          // await driver.navigate().refresh();
          await driver.sleep(10000)
        }
      }
      // }
      return new CommonResponseModel(true, 1, `COline created successfully`)
    }
    catch (error) {

      console.log(error, 'error');
      // if (error.name === 'TimeoutError') {
      //   const update = await this.levisCoLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Color found', isActive: false });
      //   await this.updateCOLineStatus({ poNumber: po.po_number, poLine: po.po_line, status: StatusEnum.FAILED })
      //   driver.quit()
      //   return new CommonResponseModel(false, 0, 'Matching Color not found')
      // } else {
      //   // Handle other types of errors
      //   return new CommonResponseModel(false, 0, error)
      // }
      return new CommonResponseModel(false, 0, error)

    }
    finally {
      driver.quit()
    }
  }







  // async getOrderReportData(req?: LevisOrderFilter): Promise<CommonResponseModel> {
  //   console.log(req, "servvv")
  //   try {
  //     const details = await this.LevisOrdersRepo.getOrderReportData(req);
  //     if (details.length === 0) {
  //       return new CommonResponseModel(false, 0, 'No data Found');
  //     }
  //     const sizeDateMap = new Map<string, levisOrderReport>();
  //     for (const rec of details) {
  //       if (!sizeDateMap.has(`${rec.po_number}`)) {
  //         sizeDateMap.set(
  //           `${rec.po_number}`,
  //           new levisOrderReport(rec.id,rec.brand,rec.seasonCode,rec.division,rec.merchant,rec.itemNo,rec.factory,rec.region,rec.destinationCode,
  //             rec.destination,rec.styleNo,rec.po_number,rec.unitPrice,rec.fabric,rec.description,rec.process,rec.color,rec.pcd,rec.ftyDiscussion,
  //             rec.originalFty,rec.gtnWeeks,rec.factoryDeliveryDate,rec.shipMode,rec.improvementDeferment,rec.plannedFty,rec.fOneDate,
  //             rec.shippedQuantity,rec.truckDate,rec.cartsClosedDate,rec.shortageExcess,rec.extraShort,rec.shippedQtyValue,
  //             rec.poHeader,rec.remarks,rec.deliveryAddress,rec.quantity,rec.status,[])
  //         );

  //       }
  //       const sizeWiseData = sizeDateMap.get(`${rec.po_number}`).sizeWiseData;
  //       const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.unitPrice === rec.unitPrice);
  //       if (!existingSizeData && rec.size !== null) {
  //         sizeWiseData.push(new LevisSizeWiseReportModel(rec.size,rec.quantity,rec.unitPrice));
  //       }
  //     }
  //     const dataModelArray: levisOrderReport[] = Array.from(sizeDateMap.values());

  //     return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



  //   } catch (e) {
  //     console.log(e, "errrrrrrrrr")
  //     return new CommonResponseModel(false, 0, 'failed', e);
  //   }
  // }



  async getOrderReportData(req?: LevisOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")

    try {
      const details = await this.LevisOrdersRepo.getOrderReportData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, levisOrderReportDataModel>();
      for (const rec of details) {
        const colorcheck = await this.colorRepo.findOne({
          where: {
            colorCode: rec.material
          }
        });

        const color = colorcheck?.colorName

        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number},${rec.delivery_date},${color}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number},${rec.delivery_date},${color}`,
            new levisOrderReportDataModel(rec.id, rec.po_number, rec.unit_price, rec.delivery_address, rec.transmode, rec.currency, rec.po_line, rec.material, rec.total_unit_price, rec.original_date, rec.status, [], rec.ex_factory_date, color)
          );


        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number},${rec.delivery_date},${color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new LevisSizeWiseModel(rec.product, rec.size, rec.upc, rec.planned_ex_factory_date, rec.ex_factory_date, rec.quantity, rec.item_no));
        }
      }
      const dataModelArray: levisOrderReportDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  // async getSplitOrderComparisionData(req?: any): Promise<CommonResponseModel> {
  //   // eslint-disable-next-line no-useless-catch
  //   try {
  //     const Originaldata = await this.LevisOrdersRepo.getSplitOrderComparisionData(req)
  //     const compareModel: LevisSplitCompareModel[] = []

  //     for (const rec of Originaldata) {
  //       const childData = await this.LevisOrdersChildRepo.find({
  //         where: {
  //           poNumber: rec.po_number, splitPo:rec.split_po,poLine: rec.po_line, size: rec.size
  //         }, order: { id: 'DESC' }, take: 1, skip: 1
  //       })
  //       if (childData.length > 0) {
  //         const oldData = childData[0];
  //         if (
  //           oldData.totalQuantity !== rec.totalQuantity||
  //           oldData.splitPoTotalQuantity !== rec.splitPoTotalQuantity
  //         ) {
  //           compareModel.push(new
  //             LevisSplitCompareModel(
  //               rec.po_number,
  //               rec.split_po,
  //               rec.po_line,
  //               rec.size,
  //               parseInt(oldData.totalQuantity),
  //               rec.splitPoTotalQuantity,
  //               // parseInt(oldData.splitPoTotalQuantity),
  //               // rec.splitPoTotalQuantity,
  //             ));
  //         }
  //       }
  //     }
  //     if (compareModel) {

  //       return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', compareModel);
  //     } else {
  //       return new CommonResponseModel(false, 0, 'No data found');
  //     }
  //   } catch (err) {
  //     throw err
  //   }
  // }

  async getSplitOrderComparisionData(req:any): Promise<CommonResponseModel> {
    console.log(req,"req")
    const data = await this.LevisOrdersRepo.getSplitOrderComparisionData(req)
    console.log("data",data)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }


  // async getSplitOrderComparisionData(req?: any): Promise<CommonResponseModel> {
  //   try {
  //     const originalData = await this.LevisOrdersRepo.getSplitOrderComparisionData(req);
  //     const compareModel: LevisSplitCompareModel[] = [];
  
  //     for (const rec of originalData) {
  //       // Find the corresponding child data for each splitPo
  //       const childData = await this.LevisOrdersChildRepo.find({
  //         where: {
  //           poNumber: rec.split_po // Assuming split_po represents poNumber in child data
  //         },
  //         order: { id: 'DESC' },
  //         take: 1
  //       });
  
  //       if (childData.length > 0) {
  //         // Get the totalQuantity from the corresponding child data
  //         const totalQuantity = childData[0].totalQuantity;
  
  //         // Push the comparison model with the splitPo totalQuantity
  //         compareModel.push(new LevisSplitCompareModel(
  //           rec.po_number,
  //           rec.split_po,
  //           rec.po_line,
  //           rec.size,
  //           parseInt(totalQuantity), // Using the totalQuantity from the corresponding child data
  //           parseInt(totalQuantity) // Using the totalQuantity from the corresponding child data as splitPo totalQuantity
  //         ));
  //       }
  //     }
  
  //     if (compareModel.length > 0) {
  //       return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', compareModel);
  //     } else {
  //       return new CommonResponseModel(false, 0, 'No data found');
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  
  




  async editCoLineCreationReq(req: any): Promise<CommonResponseModel> {
    try {
      // console.log(req,'req')
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      const records = await this.LevisOrdersChildRepo.find({ where: { poNumber: req.poNumber } });
      const uniquePoLines = [...new Set(records.map((rec) => rec.poLine))];
      const empty = [];

      //console.log(rec,'reccccccccc')
      const entity = new EditLevisCOLineEntity()
      entity.poLine = uniquePoLines.join(',');
      entity.buyer = req.buyer
      entity.poNumber = req.poNumber;
      entity.material = req.material;
      entity.itemNo = req?.itemNo;
      entity.status = 'Open';
      // entity.deliveryDate = req.deliveryDate;
      entity.createdUser = 'admin';
      entity.coDate = req?.coDate;
      entity.coNumber = req?.coNumber
      empty.push(entity)

      // console.log(empty,'emptyyyyy')
      const save = await this.EditRepo.save(empty);



      if (save) {
        const update = await this.LevisOrdersChildRepo.update(
          { poNumber: req.poNumber }, // Conditions for updating
          { status: StatusEnum.INPROGRESS }
        );
        return new CommonResponseModel(true, 1, 'Edit CO-Line request created successfully', save)
      } else {
        return new CommonResponseModel(false, 0, 'CO-Line request failed')
      }
    } catch (err) {
      //  console.log(err,',,,,,,,,,,,,,,,')
      return new CommonResponseModel(false, 0, 'CO-Line request failed', err)
    }
  }

  async getEditCoLineData(req?: LevisOrderFilter): Promise<CommonResponseModel> {
    const data = await this.EditRepo.getEditCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getEditCoPoNumber(): Promise<CommonResponseModel> {
    const data = await this.EditRepo.getEditCoPoNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getEditItem(): Promise<CommonResponseModel> {
    try {
      const data = await this.EditRepo.getEditItem()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async getHistoryPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.pdfRepo.getHistoryPoNumber()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async deleteEditCoLine(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const deletedItem = await this.EditRepo.delete({ id: Number(req.id) });

      if (deletedItem && deletedItem.affected) {
        return new CommonResponseModel(true, 1, "ItemNo Deleted Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Item No: Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
    }
  }

  async updateStatusInOrderAcceptance(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqOpenStatus")
    try {
      const update = await this.LevisOrdersChildRepo.update(
        { poNumber: req.poNumber },
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
}