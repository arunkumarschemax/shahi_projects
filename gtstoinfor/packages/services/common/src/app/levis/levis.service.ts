import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { LevisOrdersRepository } from "./repositories/levis-orders.repo";
import { LevisPdfRepo } from "./repositories/levis-pdf.repo";
import { LevisOrdersEntity } from "./entities/levis-orders.entity";
import { LevisPdfInfoEntity } from "./entities/levis-pdf.entity";
import { CommonResponseModel, LevisOrderFilter, LevisSizeWiseModel, StatusEnum, levisOrderDataModel } from "@project-management-system/shared-models";
import { LevisCOLineEntity } from "./entities/levis-co-line.entity";
import { LevisCOLineRepository } from "./repositories/levis-co-line.repository";
import { ItemNoDtos } from "../sanmar/dto/sanmar-item-no.dto";


const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');



@Injectable()
export class LevisService {


  constructor(
    private dataSource: DataSource,
    private LevisOrdersRepo: LevisOrdersRepository,
    private pdfRepo: LevisPdfRepo,
    private levisCoLineRepo:LevisCOLineRepository,


  ) { }

  async saveLevisOrder(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqqqqqqqqqqqqq")
    // const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      // await transactionManager.startTransaction()
      for (const item of req.LevispoItemDetails) {
        const match = item.poLine.match(/\d+/);
        console.log(match, "match");
        // Check if a match is found and convert it to an integer
        // const poLine = match ? parseInt(match[0], 10) : null;
        const poLine = match

        console.log(poLine, "poLine")
        for (const variant of item.LevispoItemVariantDetails) {
          const orderData = await this.LevisOrdersRepo.findOne({ where: { poNumber: req.poNumber, poLine: poLine, size: variant.size } })
          console.log(orderData, "orderData")
          const entity = new LevisOrdersEntity();
          entity.poNumber = req.poNumber
          entity.deliveryAddress = req.deliveryAddress
          entity.transMode = req.transMode
          entity.currency = req.currency

          entity.poLine = item.poLine
          entity.material = item.material
          entity.totalUnitPrice = item.totalUnitPrice
          entity.originalDate = item.originalDate

          entity.product = variant.product
          entity.size = variant.size
          entity.upc = variant.upc
          entity.plannedExFactoryDate = variant.plannedExFactoryDate
          entity.exFactoryDate = variant.exFactoryDate
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice

          if (orderData) {
            const update = await this.LevisOrdersRepo.update({ poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, {})
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.LevisOrdersRepo.save(entity)
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
    const entity = new LevisPdfInfoEntity();
    entity.poNumber = poNumber;
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





  async getorderacceptanceData(req?: LevisOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")
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
            new levisOrderDataModel(rec.id,rec.po_number,rec.delivery_address,rec.transmode,rec.currency,rec.po_line,rec.material,rec.total_unit_price,rec.original_date,rec.status,[])
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.unitPrice === rec.unit_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new LevisSizeWiseModel(rec.product,rec.size,rec.upc,rec.planned_ex_factory_date,rec.ex_factory_date,rec.quantity,rec.unit_price));
        }
      }
      const dataModelArray: levisOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
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
      const records = await this.LevisOrdersRepo.find({ where: { poNumber: req.poNumber} });
      // const uniquePoLines = [...new Set(records.map((rec) => rec.poLine))];
      const empty = [];

      //console.log(rec,'reccccccccc')
      const entity = new LevisCOLineEntity()
      // entity.poLine = uniquePoLines.join(',');
      entity.buyer = req.buyer
      entity.poNumber = req.poNumber;
      // entity.style = req.style;
      entity.itemNo = req?.itemNo;
      entity.status = 'Open';
      // entity.deliveryDate = req.deliveryDate;
      entity.createdUser = 'admin';
      empty.push(entity)

      // console.log(empty,'emptyyyyy')
      const save = await this.levisCoLineRepo.save(empty);



      if (save) {
        const update = await this.LevisOrdersRepo.update(
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
            new levisOrderDataModel(rec.id,rec.po_number,rec.delivery_address,rec.transmode,rec.currency,rec.po_line,rec.material,rec.total_unit_price,rec.original_date,rec.status,[])
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`).sizeWiseData;
        const existingSizeData = sizeWiseData.find(item => item.size === rec.size && item.quantity === rec.quantity && item.unitPrice === rec.unit_price);
        if (!existingSizeData && rec.size !== null) {
          sizeWiseData.push(new LevisSizeWiseModel(rec.product,rec.size,rec.upc,rec.planned_ex_factory_date,rec.ex_factory_date,rec.quantity,rec.unit_price));
        }
      }
      const dataModelArray: levisOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }
  

}