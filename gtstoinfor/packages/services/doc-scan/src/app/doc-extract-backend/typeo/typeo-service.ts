import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ScanAdapter } from "../adapters/scan-adapters";
import { ScanEntity } from "../entity/typeo-entity";
import { ScanDto } from "../dtos/typeo.dto";
import { filterDto } from "../dtos/filter.dto";
import { CommonResponseModel, GlobalResponseObject, ScanResponseModel } from "@xpparel/shared-models";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';



@Injectable()
export class ScanService {


  constructor(
    private adapter: ScanAdapter,
    @InjectRepository(ScanEntity)
    private repository: Repository<ScanEntity>,
    // private repository1: Repository<HSNEntity>
  ) { }

  async postdata(req: ScanDto): Promise<ScanResponseModel> {
    console.log(req, "88888888888")
    const adapterData = this.adapter.convertDtoToEntity(req);
    console.log(adapterData, '*******')
    await this.repository.save(adapterData)
    const internalMessage: string = req.gstNumber
      ? "Created Successfully"
      : "Created Successfully";
    return new ScanResponseModel(true, 48896, internalMessage);

  }

  async getdata(req: filterDto): Promise<CommonResponseModel> {
    console.log(req, "services")

    const records = await this.repository.find({
      where: { venName: req.vendorName },
      relations: ['scanentity']
    });
    if (records.length === 0) {
      return new GlobalResponseObject(false, 65645, "Data not Found")
    }
    return new CommonResponseModel(true, 111111, "Data Retrieved Successfully", records)
  }


  async automatic(): Promise<any> {
    try {
      const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
      const page = await browser.newPage();
      await page.setViewport({ width: 1580, height: 1024 });
      await page.goto('http://localhost:4200/', {
        timeout: 100000,
        waitUntil: 'networkidle0',
      });
      await page.waitForSelector('#login-form_username');
      await page.type('#login-form_username', 'docscanadmin@gmail.com');

      await page.waitForSelector('#login-form_password');
      await page.type('#login-form_password', 'docscan');

      await page.click('button.ant-btn-primary');
      await page.waitForNavigation();

      await page.goto('http://localhost:4200/#/doc-extract-form/', {
        timeout: 100000,
        waitUntil: 'networkidle0',
      });
      await page.click('#vendors')
    //   .then(async () => {
    //     // const filePath = 'C:/Users/saipr/Downloads/PDF PO & DIA/PDF PO & DIA/Nike-PDF PO/3503368108.pdf';
    //     const directoryPath = 'F:/AAA Invoices Folders/4/20CUBE/';
    //     // Specify the source and destination directories
    //     const sourceDirectory = 'F:/AAA Invoices Folders/4/20CUBE/';
    //     const destinationDirectory = 'F:/AAA Invoices Folders/1/OIA';
    //     const files = fs.readdirSync(directoryPath)
    //     for (const file of files) {
    //         await page.waitForSelector('input[type="file"]');
    //         const fileInput = await page.$('input[type="file"]');
    //         // Get the full path of the file
    //         const filePath = path.join(directoryPath, file);
    //         // Set the file path to be uploaded
    //         await fileInput.uploadFile(filePath);
    //         // await input.uploadFile(filePath);
    //         await page.waitForTimeout(5000)
    //         // Submit the form if needed
    //         await page.waitForSelector('button.ant-btn-primary')
    //         await page.click('button.ant-btn-primary');
    //         // Check the status after submission
    //         // const reset = await page.waitForSelector('button.ant-btn-default')
    //         // if (reset) {
    //         //     await page.click('button.ant-btn-default')
    //         // } else {
    //         const sourceFilePath = path.join(sourceDirectory, file);
    //         const destinationFilePath = path.join(destinationDirectory, file);
    //         fs.rename(sourceFilePath, destinationFilePath, (err) => {
    //             if (err) {
    //                 return new CommonResponseModel(false, 0, '')
    //             }
    //         });
    //         // }
    //     }
    // });
      // await page.waitForSelector('.dropdown-content');
      return { message: 'Navigated to doc-extract-form page after login' };
    } catch (error) {
      console.error('Error:', error);
      return { error: 'Error performing operation' };
    }
  }
}

//   async legalPOPdfBot() {
//     try {
//         const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
//         const page = await browser.newPage();
//         // Set screen size
//         await page.setViewport({ width: 1580, height: 1024 });
//         // Navigate the page to a URL
//         await page.goto('http://localhost:4200/#/login', {
//             timeout: 100000,
//             waitUntil: 'networkidle0', // Wait until there are no more network connections
//         });
//         await page.waitForSelector('#login-form_username');
//         await page.type('#login-form_username', 'nike@gmail.com');

//         await page.waitForSelector('#login-form_password');
//         await page.type('#login-form_password', 'nike@shahi')
//         await page.click('button.ant-btn-primary');
//         // Wait for a while to see the result (you can adjust the wait time)
//         setTimeout(async () => {
//             await page.goto('http://localhost:4200/#/nike/pdf-upload/', {
//                 timeout: 10000,
//                 waitUntil: 'networkidle0', // Wait until there are no more network connections
//             }).then(async () => {
//                 // const filePath = 'C:/Users/saipr/Downloads/PDF PO & DIA/PDF PO & DIA/Nike-PDF PO/3503368108.pdf';
//                 const directoryPath = 'D:/Nike PDF/Nike-PDF PO';
//                 // Specify the source and destination directories
//                 const sourceDirectory = 'D:/Nike PDF/Nike-PDF PO';
//                 const destinationDirectory = 'D:/Nike PDF/Read';
//                 const files = fs.readdirSync(directoryPath)
//                 for (const file of files) {
//                     await page.waitForSelector('input[type="file"]');
//                     const fileInput = await page.$('input[type="file"]');
//                     // Get the full path of the file
//                     const filePath = path.join(directoryPath, file);
//                     // Set the file path to be uploaded
//                     await fileInput.uploadFile(filePath);
//                     // await input.uploadFile(filePath);
//                     await page.waitForTimeout(5000)
//                     // Submit the form if needed
//                     await page.waitForSelector('button.ant-btn-primary')
//                     await page.click('button.ant-btn-primary');
//                     // Check the status after submission
//                     // const reset = await page.waitForSelector('button.ant-btn-default')
//                     // if (reset) {
//                     //     await page.click('button.ant-btn-default')
//                     // } else {
//                     const sourceFilePath = path.join(sourceDirectory, file);
//                     const destinationFilePath = path.join(destinationDirectory, file);
//                     fs.rename(sourceFilePath, destinationFilePath, (err) => {
//                         if (err) {
//                             return new CommonResponseModel(false, 0, '')
//                         }
//                     });
//                     // }
//                 }
//             });
//         }, 4000);
//         return new CommonResponseModel(true, 1, 'All PDFs submittedd successfully')
//     } catch (error) {
//         return new CommonResponseModel(false, 0, error)
//     }
// }
