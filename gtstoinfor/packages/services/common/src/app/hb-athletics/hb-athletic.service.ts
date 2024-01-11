import { Injectable } from "@nestjs/common";
import { HbOrdersRepository } from "./repositories/hb-orders.repo";
import { HbPdfRepo } from "./repositories/hb-pdf.repo";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { HbOrdersEntity } from "./entity/hb-orders.entity";
import { HbPdfFileInfoEntity } from "./entity/hb-pdf.entity";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HbService {

  constructor(
    private HbOrdersRepo: HbOrdersRepository,
    private HbPdfRepo: HbPdfRepo,

  ) { }

  
  async saveHbOrdersData(req: any): Promise<CommonResponseModel> {
    console.log(req, "reqqqqqqqqqqqqq")
    // const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      // await transactionManager.startTransaction()
      for (const item of req.HbpoItemDetails) {
        const match = item.style.match(/\d+/);
        console.log(match, "match");
        console.log(item, "item");
        // Check if a match is found and convert it to an integer
        // const style = match ? parseInt(match[0], 10) : null;
        const style = match

        console.log(style, "style")
        for (const variant of item.HbpoItemVariantDetails) {
          const orderData = await this.HbOrdersRepo.findOne({ where: { custPo: req.custPo, style: item.style, size: variant.size } })
          console.log(orderData, "orderData")
          console.log(variant, "variant");
          const entity = new HbOrdersEntity();
          entity.custPo = req.custPo
          entity.exitFactoryDate = req.exitFactoryDate
          entity.shipToAdd = req.shipToAdd


          entity.style = item.style
          entity.color = item.color

          entity.size = variant.size
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice

          if (orderData) {
            const update = await this.HbOrdersRepo.update({ custPo: req.custPo, style: item.style, size: variant.size }, {exitFactoryDate:req.exitFactoryDate,shipToAdd:req.shipToAdd,color:item.color,quantity:variant.quantity,unitPrice:variant.unitPrice})
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await this.HbOrdersRepo.save(entity)
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

  // async saveHbOrdersData(req: any): Promise<CommonResponseModel> {
  //   console.log(req, "reqqqqqqqqqqqqq")
  //   // const transactionManager = new GenericTransactionManager(this.dataSource)
  //   try {
  //     let saved
  //     // await transactionManager.startTransaction()
  //     for (const item of req.HbpoItemDetails) {
  //       const match = item.style.match(/\d+/);
  //       console.log(match, "match");
  //       const style = match

  //       console.log(style, "poLine")
  //       for (const variant of item.HbpoItemVariantDetails) {
  //         const orderData = await this.HbOrdersRepo.findOne({ where: { custPo: req.custPo, style: item.style, size: variant.size } })
  //         console.log(orderData, "orderData")
  //         const entity = new HbOrdersEntity();
  //         entity.custPo = req.custPo
  //         entity.exitFactoryDate = req.exitFactoryDate
  //         entity.shipToAdd = req.shipToAdd


  //         entity.style = item.style
  //         entity.color = item.color

  //         entity.size = variant.size
  //         entity.quantity = variant.quantity
  //         entity.unitPrice = variant.unitPrice


  //         if (orderData) {
  //           const update = await this.HbOrdersRepo.update({ custPo: req.custPo, style: item.style, size: variant.size }, {})
  //           if (!update.affected) {
  //             throw new Error('Update failed');
  //           }
  //         } else {
  //           saved = await this.HbOrdersRepo.save(entity)
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


  async updatePath(req: any, custPo: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
    console.log(custPo, "pppppioooooo");
    console.log(req, "reqqqqqqqqq");

    // const custPoFromFileName = filename.replace(/\D/g, "");
    const custPoFromFileName = filename.replace(/\s+W+\'+s.+/g, "");
    const entity = new HbPdfFileInfoEntity();
    entity.custPo = custPoFromFileName;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = req;
    console.log(entity.fileData, "fileData")

    const file = await this.HbPdfRepo.findOne({ where: { pdfFileName: filePath } });
    if (file) {
      return new CommonResponseModel(false, 0, 'File with the same name already uploaded');
    } else {
      const save = await this.HbPdfRepo.save(entity);
      if (save) {
        return new CommonResponseModel(true, 1, 'Uploaded successfully', save);
      } else {
        return new CommonResponseModel(false, 0, 'Uploaded failed');
      }
    }
  }

  async getPdfFileInfo(): Promise<CommonResponseModel> {
    try {
      const data = await this.HbPdfRepo.find()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }

  async hbAthleticBot() {
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
      await page.type('#login-form_username', 'HBAthletic@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'HBAthletic');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      setTimeout(async () => {
        await page.goto('http://localhost:4200/#/hb-athletics/hb-pdf-upload/', {
          timeout: 100000,
          waitUntil: 'networkidle0'
        })
      }, 1000);

      const directoryPath = 'D:/hb-unread/';
      const destinationDirectory = 'D:/hb-read/';

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





}