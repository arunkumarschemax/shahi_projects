import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { LevisOrdersRepository } from "./repositories/levis-orders.repo";
import { LevisPdfRepo } from "./repositories/levis-pdf.repo";
import { LevisOrdersEntity } from "./entities/levis-orders.entity";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { LevisPdfInfoEntity } from "./entities/levis-pdf.entity";


const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');



@Injectable()
export class LevisService {


  constructor(
    private dataSource: DataSource,
    private LevisOrdersRepo: LevisOrdersRepository,
    private pdfRepo: LevisPdfRepo,


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







}