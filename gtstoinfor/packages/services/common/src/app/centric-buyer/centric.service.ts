import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CentricEntity } from "./entity/centric.entity";
import { CentricDto } from "./dto/centric.dto";
import { CentricOrderDataModel, CentricSizeWiseModel, CommonResponseModel, PoOrderFilter, StatusEnum, centricCoLineRequest } from "@project-management-system/shared-models";
import { Repository } from "typeorm/repository/Repository";
import { CentricRepository } from "./repositories/centric.repo";
import { DataSource } from "typeorm/data-source/DataSource";
import { PdfFileUploadRepository } from "../ralph-lauren/repositories/pdf-file.repo";
import { PdfFileUploadEntity } from "../ralph-lauren/entities/pdf-file-upload.entity";
import { CentricPdfFileUploadEntity } from "./entity/centric-pdf-file.entity";
import { CentricPdfRepository } from "./repositories/pdf-repo";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { CentricCOLineEntity } from "./entity/centric-co-line.entity";
import { CentricCOLineRepository } from "./repositories/centric-co-line.repository";


import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { Interval } from "@nestjs/schedule";


@Injectable()
export class CentricService {

  //   constructor(
  //     @InjectRepository(CentricEntity)
  //     private repository: Repository<CentricEntity>,

  //   ) { }

  constructor(
    private Repo: CentricRepository,
    private dataSource: DataSource,
    private pdfRepo: CentricPdfRepository,
    private coLineRepo: CentricCOLineRepository

  ) { }

  // async saveCentricOrder(req: CentricDto): Promise<CommonResponseModel> {
  //   console.log(req,"req")

  //   const entity = new CentricEntity(); 
  //   entity.poNumber = req.poNumber
  //         entity.shipment = req.shipment
  //         entity.season = req.season
  //         entity.portOfExport = req.portOfExport
  //         entity.portOfEntry = req.portOfEntry
  //         entity.Refrence = req.Refrence
  //         entity.paymentTermDescription = req.paymentTermDescription
  //         entity.specialInstructions = req.specialInstructions

  //         entity.poLine = req.poLine
  //         entity.material =req.material
  //         entity.color = req.color
  //         entity.gender = req.gender

  //         entity.size = req.size
  //         entity.upc = req.upc
  //         entity.label = req.label
  //         entity.quantity = req.quantity
  //         entity.unitPrice = req.unitPrice
  //         entity.exFactory = req.exFactory
  //         entity.exPort = req.exPort
  //         entity.deliveryDate = req.deliveryDate
  //         entity.retialPrice = req.retialPrice

  //   await this.Repo.save(entity);

  //   const internalMessage: string = req.poLine
  //     ? "Created Successfully"
  //     : "Created Successfully";

  //   return new CommonResponseModel(true, 48896, internalMessage);
  // }

  async saveCentricOrder(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqqqqqqqqqqqqq")
    // const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      // await transactionManager.startTransaction()
      for (const item of req.CentricpoItemDetails) {
        const match = item.poLine.match(/\d+/);
        console.log(match, "match");
        // Check if a match is found and convert it to an integer
        // const poLine = match ? parseInt(match[0], 10) : null;
         const poLine = match

        console.log(poLine,"poLine")
        for (const variant of item.CentricpoItemVariantDetails) {
          const orderData = await this.Repo.findOne({ where: { poNumber: req.poNumber, poLine: poLine, size: variant.size } })
          console.log(orderData, "orderData")
          const entity = new CentricEntity();
          entity.poNumber = req.poNumber
          entity.shipment = req.shipment
          entity.season = req.season
          entity.portOfExport = req.portOfExport
          entity.portOfEntry = req.portOfEntry
          entity.Refrence = req.Refrence
          entity.paymentTermDescription = req.paymentTermDescription
          entity.specialInstructions = req.specialInstructions
          entity.division = req.division
          entity.incoterm = req.incoterm
          entity.shipToAdd = req.shipToAdd
          entity.manufacture = req.manufacture
          entity.poDate = req.poDate


          entity.poLine = item.poLine
          entity.material = item.material
          entity.color = item.color
          entity.gender = item.gender
          entity.shortDescription = item.shortDescription
          entity.packMethod = item.packMethod
          entity.vendorBookingFlag = item.vendorBookingFlag
          entity.ppkupc = item.ppkupc


          entity.size = variant.size
          entity.upc = variant.upc
          entity.label = variant.label
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice
          entity.exFactory = variant.exFactory
          entity.exPort = variant.exPort
          entity.deliveryDate = variant.deliveryDate
          entity.retialPrice = variant.retialPrice
          entity.comptMaterial = variant.comptMaterial
          entity.ratio = variant.ratio

          if (orderData) {
            const update = await this.Repo.update({ poNumber: req.poNumber, poLine: item.poLine, size: variant.size }, {})
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.Repo.save(entity)
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


  async updatePath(filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {

    const entity = new CentricPdfFileUploadEntity()
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype
    const file = await this.pdfRepo.findOne({ where: { pdfFileName: filePath } })
    if (file) {
      return new CommonResponseModel(false, 0, 'File with same name already uploaded');
    } else {
      const save = await this.pdfRepo.save(entity)
      if (save) {
        return new CommonResponseModel(true, 1, 'uploaded successfully', save);
      }
      else {
        return new CommonResponseModel(false, 0, 'uploaded failed');
      }
    }
  }

  async getPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.Repo.getDistinctPoNumbers()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }


  async getorderData(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.Repo.getorderData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
      }
      const sizeDateMap = new Map<string, CentricOrderDataModel>();
      for (const rec of details) {
        // console.log(rec,"rrrrrrrrr")
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number}`,
            new CentricOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc)
          );

          // console.log(sizeDateMap,)
        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new CentricSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.special_instructions, rec.upc, rec.retial_price, rec.color, rec.ratio, rec.ppk_upc, rec.label, rec.exfactory, rec.export, rec.delivery_date));
        }
      }
      const dataModelArray: CentricOrderDataModel[] = Array.from(sizeDateMap.values());
      // console.log(dataModelArray,"kkkk")
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
      // return new CommonResponseModel(true, 1, 'data retrieved', details);


    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async getPdfFileInfo(): Promise<CommonResponseModel> {
    try {
      const data = await this.pdfRepo.find()
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
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      
      
      const records = await this.Repo.find({ where: { poNumber: req.poNumber } });
      const empty = [];
      for (const rec of records) {
        const entity = new CentricCOLineEntity()
        entity.buyer = req.buyer
        entity.poNumber = req.poNumber;
        entity.poLine = rec.poLine;
        entity.itemNo = req.itemNo
        entity.status = 'Open';
        entity.createdUser = 'Admin';
        empty.push(entity)
      }
      const save = await this.coLineRepo.save(empty);
      

      if (save) {
        const update = await this.Repo.update(
          { poNumber: req.poNumber }, // Conditions for updating
          { status: StatusEnum.ACCEPTED } // Data to update
        );
        return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
      } else {
        return new CommonResponseModel(false, 0, 'CO-Line request failed')
      }
    } catch (err) {
      return new CommonResponseModel(false, 0, 'CO-Line request failed', err)
    }
  }

  async getCentricCoLine(req?: centricCoLineRequest): Promise<CommonResponseModel> {
    const data = await this.coLineRepo.getCentricCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }


  async getCentricorderData(req?: PoOrderFilter): Promise<CommonResponseModel> {
    try {
      const details = await this.Repo.getCentricorderData(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'data not found');
      }
      const sizeDateMap = new Map<string, CentricOrderDataModel>();
      for (const rec of details) {
        // console.log(rec,"rrrrrrrrr")
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number}`,
            new CentricOrderDataModel(rec.id, rec.po_number, rec.shipment, rec.season, rec.division, rec.manufacture, rec.port_of_export, rec.port_of_entry, rec.refrence, rec.pack_method, rec.payment_term_description, rec.incoterm, rec.special_instructions, rec.po_line, rec.material, rec.compt_material, rec.color, rec.gender, rec.short_description, rec.size, rec.upc, rec.retial_price, rec.unit_price, rec.label, rec.quantity, rec.vendor_booking_flag, rec.exfactory, rec.export, rec.delivery_date, rec.retial_price, rec.po_date, rec.ship_to_add, [], null, rec.ppk_upc,rec.status)
          );

          // console.log(sizeDateMap,)
        }
        const sizeWiseData = sizeDateMap.get(`${rec.po_line},${rec.po_number}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new CentricSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.special_instructions, rec.upc, rec.retial_price, rec.color, rec.ratio, rec.ppk_upc, rec.label, rec.exfactory, rec.export, rec.delivery_date));
        }
      }
      const dataModelArray: CentricOrderDataModel[] = Array.from(sizeDateMap.values());
      // console.log(dataModelArray,"kkkk")
      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);
      // return new CommonResponseModel(true, 1, 'data retrieved', details);


    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  //  @Interval(20000)
  // async handleAutomaticCron() {
  //   try {
  //     await this.centricBot();
  //   } catch (error) {
  //     console.error('Error', error);
  //   }
  // }

  async centricBot() {
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
      await page.type('#login-form_username', 'RLadmin@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'RLadmin');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      const directoryPath = 'F:/centric-buyers-unread-files/';
      const destinationDirectory = 'F:/centric-buyers-read-files/';

      const files = fs.readdirSync(directoryPath);
      if (files.length === 0) {
       return new CommonResponseModel(false,0,"No Files Found")
      }
      for (const file of files) {
          await page.waitForSelector('input[type="file"]');
          const fileInput = await page.$('input[type="file"]');
          const filePath = path.join(directoryPath, file);
          await fileInput.uploadFile(filePath);
          await page.waitForTimeout(2000);

          await page.waitForSelector('button.ant-btn-primary')
          await page.click('button.ant-btn-primary');
          await page.waitForTimeout(6000)

        const sourceFilePath = path.join(directoryPath, file);
        const destinationFilePath = path.join(destinationDirectory, file);
        fs.rename(sourceFilePath, destinationFilePath, async(err) => {
          if (err) {
            return new CommonResponseModel(false, 0, '');
        }})
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
  }
  async getItem(): Promise<CommonResponseModel> {
    try {
      const data = await this.coLineRepo.getItem()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async getCoPoNumber(): Promise<CommonResponseModel> {
    const data = await this.coLineRepo.getCoPoNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }


}