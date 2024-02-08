import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { LevisOrdersRepository } from "./repositories/levis-orders.repo";
import { LevisPdfRepo } from "./repositories/levis-pdf.repo";
import { CommonResponseModel, LevisOrderFilter, LevisSizeWiseModel, levisOrderDataModel } from "@project-management-system/shared-models";


const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');



@Injectable()
export class LevisService {


  constructor(
    private dataSource: DataSource,
    private LevisOrdersRepo: LevisOrdersRepository,
    private pdfRepo: LevisPdfRepo,


  ) { }

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
            new levisOrderDataModel(rec.id,rec.po_number,rec.delivery_address,rec.transmode,rec.currency,rec.po_line,rec.material,rec.total_unit_price,rec.original_date,[])
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