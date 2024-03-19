import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');
import * as puppeteer from 'puppeteer';
import { Cron } from "@nestjs/schedule";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { PVHOrdersRepository } from "./repositories/pvh-orders.repo";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { PvhOrdersChildRepository } from "./repositories/pvh-orders-child.repo";
import { PvhOrderschildEntity } from "./entities/pvh-orders-child.entity";
import { PVHOrdersEntity } from "./entities/pvh-orders.entity";
import { PvhPdfInfoEntity } from "./entities/pvh-pdf.entity";


@Injectable()
export class PVHService {
  constructor(
    private dataSource: DataSource,
    private PvhOrdersRepo: PVHOrdersRepository,
    private PvhOrdersChildRepo: PvhOrdersChildRepository,


  ) { }

  // async savePvhOrder(req: any): Promise<CommonResponseModel> {
  //   const transactionManager = new GenericTransactionManager(this.dataSource);

  //   try {
  //     let saved;
  //     const pdfData = [];

  //     await transactionManager.startTransaction();

  //     const orderData = await this.PvhOrdersRepo.findOne({ where: { poNumber: req.poNumber } });

  //     const entity = new PVHOrdersEntity();
  //     entity.poNumber = req.poNumber

  //     pdfData.push(entity);

  //     const savedChild = await transactionManager.getRepository(PVHOrdersEntity).save(entity)


  //     if (!savedChild) {
  //       throw new Error('Update failed');
  //     }

  //     if (!saved) {
  //       throw new Error('Save failed');
  //     }
  async savePvhOrder(req: any): Promise<CommonResponseModel> {
    const transactionManager = new GenericTransactionManager(this.dataSource);

    try {
      let saved;
      const pdfData = [];

      await transactionManager.startTransaction();

      for (const item of req.PvhpoItemDetails) {
        for (const variant of item.PvhpoItemVariantDetails) {
          const orderData = await this.PvhOrdersRepo.findOne({ where: { poNumber: req.poNumber, poLine: item.poLine, size: variant.size } });
          const order = await this.PvhOrdersChildRepo.findOne({ where: { poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, order: { poVersion: 'DESC' } })

          const entity = new PVHOrdersEntity();
          entity.poNumber = req.poNumber
          entity.currency = req.currency
          entity.buyerName = req.buyerName

          entity.poLine = item.poLine
          entity.deliveryDate = item.deliveryDate
     

          entity.size = variant.size
          entity.color = variant.color
          entity.upc = variant.upc
          entity.quantity = variant.quantity

          pdfData.push(entity);

          if (orderData) {
            const update = await transactionManager.getRepository(PVHOrdersEntity).update(
              { poNumber: req.poNumber, poLine: item.poLine, size: variant.size },
              {
                currency :req.currency,
                buyerName :req.buyerName,
                deliveryDate:item.deliveryDate,
                color : variant.color,
                 upc: variant.upc,
                quantity : variant.quantity

              }
            );
            console.log("update", update)

            let po = parseInt(order?.poVersion) + 1
            const entitys = new PvhOrderschildEntity()

            entitys.poNumber = req.poNumber
            entitys.currency = req.currency
            entitys.buyerName = req.buyerName
  
            entitys.poLine = item.poLine
            entitys.deliveryDate = item.deliveryDate
       
  
            entitys.size = variant.size
            entitys.color = variant.color
            entitys.upc = variant.upc
            entity.quantity = variant.quantity

            entitys.poVersion = po.toString()
            entitys.orderId = orderData.id

            const savedChild = await transactionManager.getRepository(PvhOrderschildEntity).save(entitys)


            if (!update.affected) {
              throw new Error('Update failed');
            }
          }
          else {
            saved = await transactionManager.getRepository(PVHOrdersEntity).save(entity);
            const entitys = new PvhOrderschildEntity()

             entitys.poNumber = req.poNumber
            entitys.currency = req.currency
            entitys.buyerName = req.buyerName
  
            entitys.poLine = item.poLine
            entitys.deliveryDate = item.deliveryDate
       
  
            entitys.size = variant.size
            entitys.color = variant.color
            entitys.upc = variant.upc
            entity.quantity = variant.quantity

            entitys.orderId = entity.id

            const savedChild = await await transactionManager.getRepository(PvhOrderschildEntity).save(entitys)


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


  async updatePath(req: any, jsonData: any, poNumber: any): Promise<CommonResponseModel> {
    try {

      let flag = true;
      const entities = []
      for (const res of req) {
        const entity = new PvhPdfInfoEntity();
        entity.pdfFileName = res.filename
        entity.filePath = res.path
        entity.poNumber = poNumber
        entity.fileData = jsonData
        entity.fileType = res.mimetype
        entity.createdUser = "admin"
        entity.uploadStatus = "SUCCESS";
        entities.push(entity);
      }
      const uploadDoc = await this.PvhOrdersRepo.save(entities);
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









}