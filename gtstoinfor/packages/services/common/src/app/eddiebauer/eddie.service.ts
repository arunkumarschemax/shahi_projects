import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CoLineRequest,CommonResponseModel, EddieSizeWiseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarCoLinereqModels, SanmarColorModel, SanmarCompareModel, SanmarDestinationModel, SanmarOrderFilter, SanmarSizeModel, SanmarSizeWiseModel, StatusEnum, eddieOrderDataModel, sanmarOrderDataModel } from "@project-management-system/shared-models";
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

  async getorderacceptanceData(req?: SanmarOrderFilter): Promise<CommonResponseModel> {
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
            new eddieOrderDataModel(rec.id, rec.po_number, rec.po_date,rec.incoterm, rec.po_style, rec.color, rec.delivery_date, rec.ship_to_address, rec.buyer_address,rec.manufacture,rec.shipment_mode,rec.payment_terms,rec.po_line,rec.buyer_item,rec.short_description,rec.currency,rec.retail_price,rec.status,[])
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


  // async getorderacceptanceData(req?: SanmarOrderFilter): Promise<CommonResponseModel> {
  //   try {
  //     const details = await this.EddieOrdersRepo.getorderacceptanceData(req);
  //     if (details.length === 0) {
  //       return new CommonResponseModel(false, 0, 'data not found');
  //     }
  //     const sizeDateMap = new Map<string, eddieOrderDataModel>();
  //     for (const rec of details) {
  //       // console.log(rec,"rrrrrrrrr")
  //       if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
  //         sizeDateMap.set(
  //           `${rec.po_line},${rec.po_number}`,
  //           new eddieOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc, rec.status)
  //         );

  //         // console.log(sizeDateMap,)
  //       }
  //       const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number}`).sizeWiseData;
  //       if (rec.size !== null) {
  //         sizeWiseData.push(new EddieSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.special_instructions, rec.upc, rec.retial_price, rec.color, rec.ratio, rec.ppk_upc, rec.label, rec.exfactory, rec.export, rec.delivery_date));
  //       }
  //     }
  //     const dataModelArray: eddieOrderDataModel[] = Array.from(sizeDateMap.values());
  //     // console.log(dataModelArray,"kkkk")
  //     return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
  //     // return new CommonResponseModel(true, 1, 'data retrieved', details);


  //   } catch (e) {
  //     console.log(e, "errrrrrrrrr")
  //     return new CommonResponseModel(false, 0, 'failed', e);
  //   }
  // }

}