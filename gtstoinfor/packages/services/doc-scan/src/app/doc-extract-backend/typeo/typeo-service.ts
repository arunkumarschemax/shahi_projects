import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonResponseModel, GlobalResponseObject, ScanResponseModel, VendorNameEnum } from "@xpparel/shared-models";
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
import { find } from "rxjs";



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
    // console.log(req, "88888888888")
    const adapterData = this.adapter.convertDtoToEntity(req);
    // console.log(adapterData, '*******')
    await this.repository.save(adapterData)
    const internalMessage: string = req.gstNumber
      ? "Created Successfully"
      : "Created Successfully";
    return new ScanResponseModel(true, 48896, internalMessage);
  }

  
  async getdata(req: filterDto): Promise<CommonResponseModel> {
    // console.log(req, "services")

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
             await this.emailAttachmentsRepo.save({ filePath: writeStream.path as string, fileType: attachment.subtype, uniqueId: attachment.id.slice(1, -1), fileName: attachment.params.name, vendorNames:attachment.params.name.replace(/.pdf|.PDF/g,"") })
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



  async automatic() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
      const page = await browser.newPage();
      await page.setViewport({ width: 1580, height: 900 });
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


      const directoryPath = 'C:/Users/User1/Desktop/docsmanage/gts-to-infor/gtstoinfor/invoicepdfs/';
      const sourceDirectory = 'C:/Users/User1/Desktop/docsmanage/gts-to-infor/gtstoinfor/invoicepdfs/';
      const destinationDirectory = 'C:/Users/User1/Documents/readinvoices/';
      // http://localhost:4200/#/doc-extract-form?pcid =4685fth546541
      const files = fs.readdirSync(directoryPath);
      console.log(files, "files");
      for (const file of files) {
        console.log(file, "file");

        const fileNames = file.split(".pdf")[0].split(".PDF")[0];
        console.log(fileNames, "fileNames");

        const findRecord = await this.emailAttachmentsRepo.findOne({ select:['vendorNames'], where: { fileName:fileNames} })
        console.log(findRecord,"find");

        await page.goto('http://localhost:4200/#/doc-extract-form/', {
          timeout: 10000,
          waitUntil: 'networkidle0',
        });

        await page.click('#vendors');

        await page.waitForSelector('.ant-select-item-option-content');

        const options = await page.$$('.ant-select-item-option-content');
        
        const availableOptions = [];
        for (const option of options) {
          const optionText = await page.evaluate(el => el.textContent.trim(), option);
          availableOptions.push(optionText);
        }
        console.log('Available Options:', availableOptions);
  
        let optionFound = false;
        for (const option of options) {
          const optionText = await page.evaluate(el => el.textContent.trim(), option);
          if (optionText === fileNames) {
            await option.click();
            optionFound = true;
            break;
          }
        }
        
        if (!optionFound) {
          console.log(`Option for file ${fileNames} not found.`);
        }


        await page.waitForSelector('input[type="file"]');
        const fileInput = await page.$('input[type="file"]');
        const filePath = path.join(directoryPath, file);
        await fileInput.uploadFile(filePath);
        await page.waitForTimeout(5000);
        
        await page.waitForSelector('button[type="submit"]');
        await page.click('button[type="submit"]');

        const sourceFilePath = path.join(sourceDirectory, file);
        const destinationFilePath = path.join(destinationDirectory, file);
        fs.rename(sourceFilePath, destinationFilePath, (err) => {
          if (err) {
            return new CommonResponseModel(false, 0, '');
          }
        });
      }
      return new CommonResponseModel(true, 1, 'All PDFs submittedd successfully')
    } catch (error) {
      return new CommonResponseModel(false, 0, error)
    }
    //     let i = 0
    //     const fileNames=['OIA.PDF', 'TEXTILES COMMITEE.pdf']
    //     for (const file of fileNames) {
    //       await page.goto('http://localhost:4200/#/doc-extract-form/', {
    //         timeout: 10000,
    //         waitUntil: 'networkidle0',
    //       })
    //       await page.click('#vendors');
    //       i += 1
    //       console.log(file, "fileeeeeeeeeeeeeeeeee")
    //       console.log(i, 'staringlopp inmdexxxxxxxxxxxxxxxxxxxxxxxx')
    //       await this.filesData(file, page, directoryPath, sourceDirectory, destinationDirectory, i)
    //     }
    //     return { message: 'Navigated to doc-extract-form page after login' };
    //   } catch (error) {
    //     console.error('Error:', error);
    //     return { error: 'Error performing operation' };
    //   }
    // }


    // async filesData(file, page, directoryPath, sourceDirectory, destinationDirectory, i) {
    //   const value = file.split(".PDF"||".pdf")[0];
    //   console.log(value,"vallllllllllllllue")
    //   console.log(file, "file");
    //   const findRecords = await this.emailAttachmentsRepo.find({ where: { fileName: value } }).then(values => { return values })
    //   console.log(findRecords, "find")

    //   console.log(value, "value");
    //   console.log(i, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    //   if (findRecords.length) {

    //     await page.waitForSelector('.ant-select-item-option-content');
    //     const options = await page.$$('.ant-select-item-option-content');

    //     for (const option of options) {
    //       console.log(option,"opyttuionssssssssssss")
    //       const text = await page.evaluate(option => option.textContent, option);
    //       console.log(text ,"texxxxxxxxxxxxxxt")
    //       if (text.trim() === value) {
    //         await option.click();
    //       }
    //        break; 
    //     }

    //     await page.waitForSelector('input[type="file"]');
    //     const fileInput = await page.$('input[type="file"]');

    //     const filePath = path.join(directoryPath, file);

    //     await fileInput.uploadFile(filePath);

    //     await page.waitForTimeout(5000)

    //     await page.waitForSelector('button[type="submit"]');
    //     await page.click('button[type="submit"]');


    //       await page.goto('http://localhost:4200/#/scan-document/', {
    //       timeout: 10000,
    //       waitUntil: 'networkidle0',
    //     })

    //     //  await page.goto('http://localhost:4200/#/doc-extract-form/', {
    //     //   timeout: 10000,
    //     //   waitUntil: 'networkidle0',
    //     // })

    //     const sourceFilePath = path.join(sourceDirectory, file);
    //     const destinationFilePath = path.join(destinationDirectory, file);
    //     fs.rename(sourceFilePath, destinationFilePath, (err) => {
    //       if (err) {
    //         return new CommonResponseModel(false, 0, '')
    //       }
    //     });
    //     // }
    //     // await page.goto('http://localhost:4200/#/doc-extract-form/', {
    //     //   timeout: 10000,
    //     //   waitUntil: 'networkidle0',
    //     // })
    //     // await page.click('#vendors');
    //   }
    // }




  }
}


   // await page.waitForSelector('.ant-select-item-option-content');
        // await page.click('.ant-select-item-option-content');
        // await page.waitForSelector('.ant-select-item-option-content');

        // const options = await page.$$('.ant-select-item-option-content');
        
        // let optionFound = false;
        // for (const option of options) {
        //   const optionText = await page.evaluate(el => el.textContent, option);
        //   if (optionText.trim() === fileNames) {
        //     await option.click();
        //     optionFound = true;
        //     break;
        //   }
        // }
        
        // if (!optionFound) {
        //   console.log(`Option for file ${fileNames} not found.`);
        //   // Handle if the option is not found for this file
        // }

        // await page.waitForSelector(`.ant-select-item-option[title="${fileNames}"]`);
        // const selectDropdown = await page.$(`.ant-select-item-option[title="${fileNames}"]`)[0];
        // await page.select(selectDropdown);

        // await page.click('.ant-select-item-option-content[]');

        // // Wait for the specific option to appear and then click it
        // await page.waitForSelector(vendorOptionSelector);
        // await page.click(vendorOptionSelector);

// console.log(vendorName, "vendorNamevendorName")
// const findRecords = await this.emailAttachmentsRepo.find().then(values => { return values })
// for (const rec of findRecords) {
//   console.log(rec.fileName)
// }

// const filePath = 'C:/Users/saipr/Downloads/PDF PO & DIA/PDF PO & DIA/Nike-PDF PO/3503368108.pdf';


// const optionText = value;
// await page.waitForSelector('.ant-select-item-option-content');

// for (const rec of Object.keys(VendorNameEnum)) {
// const value = VendorNameEnum[rec];

// await page.evaluate((text) => {
//   const options = Array.from(document.querySelectorAll('.ant-select-item-option-content'));
//   const option = options.find(opt => opt.textContent.includes(text));
//   if (option) {
//     option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
//     option.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
//     option.dispatchEvent(new MouseEvent('click', { bubbles: true }));
//   }
// }, optionText);

// await page.waitForSelector('button.ant-btn-primary')
// await page.click('button.ant-btn-primary');
// await page.goto('http://localhost:4200/#/scan-document', {
//   timeout: 10000,
//   waitUntil: 'networkidle0',
// })
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
