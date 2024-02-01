import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CoLineRequest,CommonResponseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarCoLinereqModels, SanmarColorModel, SanmarCompareModel, SanmarDestinationModel, SanmarOrderFilter, SanmarSizeModel, SanmarSizeWiseModel, StatusEnum, sanmarOrderDataModel } from "@project-management-system/shared-models";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { EddieOrdersRepository } from "./repositories/eddie-orders.repo";
import { EddieOrdersEntity } from "./entities/eddie-orders.entity";
import { EddiePdfInfoEntity } from "./entities/eddie-pdf.entity";
import { EddiePdfRepo } from "./repositories/eddie-pdf.repo";

const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');



@Injectable()
export class EddieService {


  constructor(
    private dataSource: DataSource,
    private EddieOrdersRepo: EddieOrdersRepository,
    private pdfRepo: EddiePdfRepo,
   

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
          entity.incoterm = req.incoterm
          entity.shipToAdd = req.shipToAdd
          entity.manufacture = req.manufacture
          entity.buyerAddress = req.buyerAddress
          entity.paymentTerms = req.paymentTerms
          entity.shipmentMode = req.shipmentMode


          entity.poLine = item.poLine
          entity.buyerItem = item.buyerItem
          entity.shortDescription = item.shortDescription
          entity.currency = item.currency

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
    console.log(entity.fileData, "fileData")

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