import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonResponseModel, GlobalResponseObject, ScanResponseModel } from "@xpparel/shared-models";
import * as base64 from 'base64-stream';
import * as fs from 'fs';
import * as Imap from 'imap';

import { Repository } from "typeorm";
import * as winston from 'winston';
import { ScanAdapter } from "../adapters/scan-adapters";
import { filterDto } from "../dtos/filter.dto";
import { ScanDto } from "../dtos/typeo.dto";
import { EmailAttachments } from "../entity/mails-entity";
import { ScanEntity } from "../entity/typeo-entity";
import * as puppeteer from 'puppeteer';

import * as path from 'path';



@Injectable()
export class ScanService {

  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'email-service.log' }),
    ],
  });

  constructor(
    private adapter: ScanAdapter,
    @InjectRepository(ScanEntity)
    private repository: Repository<ScanEntity>,
    @InjectRepository(EmailAttachments)
    private emailAttachmentsRepo: Repository<EmailAttachments>,

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
      return new GlobalResponseObject(false, 65645, "Data not Found");
    }
    return new CommonResponseModel(true, 111111, "Data Retrieved Successfully", records);
  }
 
  async processEmails(): Promise<any> {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const k = []

    console.log(k, "empty,,,,,,,,,,,,,,,,,")

    const imap = new Imap({
      user: 'naveenmaddula86@gmail.com',
      password: 'lhts ifyg bzxo elxe',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
    });

    const allowedExtensions = ['.pdf'];
    const savePath = './invoicePdfs/';

    function toUpper(thing) {
      return thing && thing.toUpperCase ? thing.toUpperCase() : thing;
    }

    const buildAttMessageFunction = (attachment) => {
      if (!attachment || !attachment.params || !attachment.params.name) {
        const logMessage = 'No valid attachment found.';
        this.logger.warn(logMessage);
        return;
      }
      const filename = attachment.params.name;
      const encoding = attachment.encoding;
      const fileName = attachment.disposition.params.filename;

      return (msg, seqno) => {
        const prefix = `(Message #${seqno}) `;
        msg.on('body', (stream, info) => {
          const logMessage = `${prefix}Streaming attachment to file: ${filename}, ${info}`;
          this.logger.info(logMessage);

          const writeStream = fs.createWriteStream(savePath + filename);
          console.log(writeStream.path, "writeStream")
          writeStream.on('finish', async () => {
            const finishLogMessage = `${prefix}Done writing to file: ${filename}`;
            const findRecord =await this.emailAttachmentsRepo.findOne({ where: { filePath: writeStream.path as string } }).then(values=>{return values})
            
            if (!findRecord) {
             await this.emailAttachmentsRepo.save({ filePath: writeStream.path as string, fileType: attachment.subtype, uniqueId: attachment.id.slice(1, -1), fileName: attachment.params.name })
            }  
            this.logger.info(finishLogMessage);
            console.log(finishLogMessage);

          });
          if (toUpper(encoding) === 'BASE64') {
            stream.pipe(new base64.Base64Decode()).pipe(writeStream);
          } else {
            stream.pipe(writeStream);
          }
        });
      };
    };

    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err, box) => {
        if (err) throw err;
        const searchCriteria = [['SUBJECT', 'New invoices']];
        imap.search(searchCriteria, (err, results) => {
          if (err) throw err;
          const fetch = imap.fetch(results, { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'], struct: true, });
          fetch.on('message', (msg, seqno) => {
            const prefix = `(Message #${seqno}) `;
            msg.once('attributes', (attrs) => {
              const attachments = findAttachmentParts(attrs.struct);
              const logMessage = `${prefix}Has attachments: ${attachments.length}`;
              this.logger.info(logMessage);
              attachments.forEach((attachment) => {
                // k.push(attachment, "attachmentattachmentattachmentattachmentattachmentattachment")
                if (attachment.params && attachment.params.name) {
                  const logMessage = `${prefix}Fetching attachment: ${attachment.params.name}`;
                  this.logger.info(logMessage);
                  const f = imap.fetch(attrs.uid, { bodies: [attachment.partID], });
                  k.push(attachment)
                  f.on('message', buildAttMessageFunction(attachment));

                }

              });
            });
            msg.once('end', () => {
              const logMessage = `${prefix}Finished email`;
              this.logger.info(logMessage);
            });
          });
          fetch.once('error', (err) => {
            const logMessage = `Fetch error: ${err}`;
            this.logger.error(logMessage);
            console.error(logMessage);
          });
          fetch.once('end', () => {
            const logMessage = 'Done fetching all messages!';
            this.logger.info(logMessage);
            imap.end();
          });
        });
      });
    });

    imap.once('error', (err) => {
      const logMessage = `IMAP error: ${err}`;
      this.logger.error(logMessage);
      console.error(logMessage);
    });

    imap.once('end', () => {
      const logMessage = 'IMAP Connection ended';
      this.logger.info(logMessage);
    });
    imap.connect();
    const findAttachmentParts = (struct, attachments = []) => {
      for (let i = 0; i < struct.length; ++i) {
        if (Array.isArray(struct[i])) {
          findAttachmentParts(struct[i], attachments);
        } else {
          if (
            struct[i].disposition &&
            ['INLINE', 'ATTACHMENT'].indexOf(toUpper(struct[i].disposition.type)) > -1 &&
            struct[i].params &&
            struct[i].params.name &&
            struct[i].params.name.startsWith('')
          ) {
            const filename = struct[i].params.name;
            const fileExtension = filename.split('.').pop().toLowerCase();
            if (allowedExtensions.includes('.' + fileExtension)) {
              attachments.push(struct[i]);
            }
          }
        };
      };
      return attachments;
    };
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
