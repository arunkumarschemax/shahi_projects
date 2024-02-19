import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { LevisOrdersRepository } from "./repositories/levis-orders.repo";
import { LevisPdfRepo } from "./repositories/levis-pdf.repo";
import { LevisOrdersEntity } from "./entities/levis-orders.entity";
import { LevisPdfInfoEntity } from "./entities/levis-pdf.entity";
import { CoLineRequest, CommonResponseModel, LevisCoLinereqModel, LevisColorModel, LevisDestinationModel, LevisOrderFilter, LevisSizeModel, LevisSizeWiseModel, SizeModel, StatusEnum, levisOrderDataModel } from "@project-management-system/shared-models";
import { LevisCOLineEntity } from "./entities/levis-co-line.entity";
import { LevisCOLineRepository } from "./repositories/levis-co-line.repository";
import { ItemNoDtos } from "../sanmar/dto/sanmar-item-no.dto";
import { OrderDetailsReq } from "../ralph-lauren/dto/order-details-req";
import { ColorRepository } from "../Entites@Shahi/color/color-repo";
import { SizeRepository } from "../Entites@Shahi/size/size-repo";
import { AddressRepository } from "../Entites@Shahi/address/address.repo";
import { AddressService } from "../Entites@Shahi/address/address-service";


const { Builder, Browser, By, Select, until } = require('selenium-webdriver');
const moment = require('moment');



@Injectable()
export class LevisService {


  constructor(
    private dataSource: DataSource,
    private LevisOrdersRepo: LevisOrdersRepository,
    private pdfRepo: LevisPdfRepo,
    private levisCoLineRepo:LevisCOLineRepository,
    private colorRepo:ColorRepository,
    private sizeRepo:SizeRepository,
    private AddressRepo:AddressRepository,
    private AddressService: AddressService



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
          // entity.transMode = req.transMode
          entity.currency = req.currency

          entity.poLine = item.poLine
          entity.material = item.material
          entity.totalUnitPrice = item.totalUnitPrice
          entity.originalDate = item.originalDate
          entity.transMode = item.transMode
          entity.plannedExFactoryDate = item.plannedExFactoryDate
          entity.exFactoryDate = item.exFactoryDate

          entity.itemNo = variant.itemNo
          entity.product = variant.product
          entity.size = variant.size
          entity.upc = variant.upc
          // entity.plannedExFactoryDate = variant.plannedExFactoryDate
          // entity.exFactoryDate = variant.exFactoryDate
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice
          entity.scheduledDate = variant.scheduledDate

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
            new levisOrderDataModel(rec.id,rec.po_number,rec.delivery_address,rec.transmode,rec.currency,rec.po_line,rec.material,rec.total_unit_price,rec.original_date,rec.status,[])
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


  async getPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.LevisOrdersRepo.getPoNumber()
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
      // console.log(req,'req')
      if (req.itemNo == undefined || null) {
        return new CommonResponseModel(false, 0, 'Please enter Item No')
      };
      // const update= await this.Repo.update({ where:{ poNumber: req.poNumber ,status:StatusEnum.ACCEPTED}})
      const records = await this.LevisOrdersRepo.find({ where: { poNumber: req.poNumber} });
      // const uniquePoLines = [...new Set(records.map((rec) => rec.poLine))];
      const empty = [];

      //console.log(rec,'reccccccccc')
      const entity = new LevisCOLineEntity()
      // entity.poLine = uniquePoLines.join(',');
      entity.buyer = req.buyer
      entity.poNumber = req.poNumber;
      // entity.style = req.style;
      entity.itemNo = req?.itemNo;
      entity.status = 'Open';
      // entity.deliveryDate = req.deliveryDate;
      entity.createdUser = 'admin';
      empty.push(entity)

      // console.log(empty,'emptyyyyy')
      const save = await this.levisCoLineRepo.save(empty);



      if (save) {
        const update = await this.LevisOrdersRepo.update(
          { poNumber: req.poNumber}, // Conditions for updating
          { status: StatusEnum.INPROGRESS }
        );
        return new CommonResponseModel(true, 1, 'CO-Line request created successfully', save)
      } else {
        return new CommonResponseModel(false, 0, 'CO-Line request failed')
      }
    } catch (err) {
      //  console.log(err,',,,,,,,,,,,,,,,')
      return new CommonResponseModel(false, 0, 'CO-Line request failed', err)
    }
  }


  async getCoLineData(req?: LevisOrderFilter): Promise<CommonResponseModel> {
    const data = await this.levisCoLineRepo.getCoLineData(req)
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getCoPoNumber(): Promise<CommonResponseModel> {
    const data = await this.levisCoLineRepo.getCoPoNumber()
    if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
    else
      return new CommonResponseModel(false, 0, 'No data found');
  }

  async getItem(): Promise<CommonResponseModel> {
    try {
      const data = await this.levisCoLineRepo.getItem()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }


  async updateItemNo(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const update = await this.levisCoLineRepo.update(
        { id: Number(req.id) },
        { itemNo: req.itemNo }
      );

      if (update) {
        return new CommonResponseModel(true, 1, "ItemNo Update Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Item No: Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while updating ItemNo", error);
    }
  }


  async deleteCoLine(req: ItemNoDtos): Promise<CommonResponseModel> {
    console.log(req, "reqq");
    try {
      const deletedItem = await this.levisCoLineRepo.delete({ id: Number(req.id) });

      if (deletedItem && deletedItem.affected) {
        return new CommonResponseModel(true, 1, "ItemNo Deleted Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Item No: Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
    }
  }


  async getorderDataForInfo(req?: LevisOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")
    try {
      const details = await this.LevisOrdersRepo.getorderDataForInfo(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, levisOrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(`${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.po_line},${rec.po_number},${rec.delivery_date},${rec.color}`,
            new levisOrderDataModel(rec.id,rec.po_number,rec.delivery_address,rec.transmode,rec.currency,rec.po_line,rec.material,rec.total_unit_price,rec.original_date,rec.status,[])
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


  async updateStatusInOrder(req: any): Promise<CommonResponseModel> {
    console.log(req,"reqOpenStatus")
    try {
      const update = await this.LevisOrdersRepo.update(
        { poNumber:req.poNumber},
        { status:StatusEnum.OPEN }
      );
      if (update) {
        return new CommonResponseModel(true, 1, "Updated Successfully");
      } else {
        return new CommonResponseModel(false, 0, "Something went wrong", []);
      }
    } catch (error) {
      return new CommonResponseModel(false, 0, "Error occurred while deleting ItemNo", error);
    }
  }

  async getPdfFileInfo(): Promise<CommonResponseModel> {
    try {
      const data = await this.pdfRepo.getPDFInfo()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }
  
  // async getOrderdataForCOline(req: OrderDetailsReq): Promise<CommonResponseModel> {
  //   try {
  //     const data = await this.LevisOrdersRepo.find({ where: { poNumber: req.poNumber } })
  
  //     // po -> destination -> color -> sizes
  //     const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
  //     const poMap = new Map<string, LevisOrdersEntity>();
  //     data.forEach(rec => {
  //       poMap.set(`${rec.poNumber}`, rec)
  //       // const destCountry = rec.shipToAdd.slice(-13).trim();
  //       // console.log(destCountry,"hirrrrrrrrrrrrrrrrrr")

  //       // const parts = rec.deliveryAddress.split(',')
  //       // const destAdd = parts[2].trim();
  //       // const dest = destAdd;
  //       const dest = rec.deliveryAddress;


  //       if (!destinationColSizesMap.has(`${rec.poNumber}`)) {
  //         destinationColSizesMap.set(`${rec.poNumber}`, new Map<string, Map<string, []>>());
  //       }
  //       if (!destinationColSizesMap.get(`${rec.poNumber}`).has(dest)) {
  //         destinationColSizesMap.get(`${rec.poNumber}`).set(dest, new Map<string, []>());
  //       }

  //       const check = await this.colorRepo.find({
  //         where: {
  //           colorCode: rec.product
  //         }
  //       });

  //       if (!destinationColSizesMap.get(`${rec.poNumber}`).get(dest).has(rec.product)) {
  //         destinationColSizesMap.get(`${rec.poNumber}`).get(dest).set(rec.product, []);
  //       }
  //       destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(rec.product).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
  //     });
  //     const coData = []
  //     destinationColSizesMap.forEach((destColorSize, poNumber) => {
  //       const desArray = []
  //       destColorSize.forEach((colorSizes, dest) => {
  //         const ColArray = []
  //         colorSizes.forEach((sizes, color) => {
  //           const sizeArray = []
  //           sizes.forEach((size) => {
  //             const sizeObj = new LevisSizeModel(size.size, size.quantity, size.price);
  //             sizeArray.push(sizeObj)
  //           })
  //           const col = new LevisColorModel(color, sizeArray);
  //           ColArray.push(col)
  //         });
  //         const des = new LevisDestinationModel(dest, ColArray);
  //         desArray.push(des)
  //       });
  //       const poInfo = poMap.get(poNumber)
  //       const co = new LevisCoLinereqModel(poInfo.poNumber, poInfo.unitPrice, poInfo.currency, poInfo.plannedExFactoryDate, desArray);
  //       coData.push(co)
  //     });
  //     if (coData) {
  //       return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', coData);
  //     } else {
  //       return new CommonResponseModel(false, 0, 'No data found');
  //     }
  //   } catch (err) {
  //     throw err
  //   }
  // }

  async getOrderdataForCOline(req: OrderDetailsReq): Promise<CommonResponseModel> {
    try {
        const data = await this.LevisOrdersRepo.find({ where: { poNumber: req.poNumber } });

        const inputDate = new Date(data[0].exFactoryDate)
        // Calculate the date 7 days before the GAC date
        const FourteenDaysafter = new Date(inputDate);
        FourteenDaysafter.setDate(inputDate.getDate() + 14);
        const DeliveryDate = new Intl.DateTimeFormat('en-GB').format(FourteenDaysafter);
        console.log(DeliveryDate,"dd")


        // po -> destination -> color -> sizes
        const destinationColSizesMap = new Map<string, Map<string, Map<string, { size: string, quantity: string, price: string }[]>>>();
        const poMap = new Map<string, LevisOrdersEntity>();

        for (const rec of data) {
            poMap.set(`${rec.poNumber}`, rec);
            // const dest = rec.deliveryAddress;
              const parts = rec.deliveryAddress.split(',')
           const destAdd = parts[0].trim();
            const dest = destAdd;

            
            if (!destinationColSizesMap.has(`${rec.poNumber}`)) {
                destinationColSizesMap.set(`${rec.poNumber}`, new Map<string, Map<string, []>>());
            }
            if (!destinationColSizesMap.get(`${rec.poNumber}`).has(dest)) {
                destinationColSizesMap.get(`${rec.poNumber}`).set(dest, new Map<string, []>());
            }
            console.log(rec.product,"product")
            const colorcheck = await this.colorRepo.findOne({
                where: {
                    colorCode: rec.product
                }
            });

            console.log(colorcheck,"color")
            if (colorcheck){
              if (!destinationColSizesMap.get(`${rec.poNumber}`).get(dest).has(colorcheck.colorName)) {
                destinationColSizesMap.get(`${rec.poNumber}`).get(dest).set(colorcheck.colorName, []);
            }

            } 

            const sizecheck = await this.sizeRepo.findOne({
              where: {
                  poSize: rec.size
              }
          });
           
          if (sizecheck){
           
            destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(colorcheck.colorName).push({ size: sizecheck.crmSize, quantity: rec.quantity, price: rec.unitPrice });

          } else {

            destinationColSizesMap.get(`${rec.poNumber}`).get(dest).get(colorcheck.colorName).push({ size: rec.size, quantity: rec.quantity, price: rec.unitPrice });
          }     
            
        }

        const coData = [];
        destinationColSizesMap.forEach((destColorSize, poNumber) => {
            const desArray = [];
            destColorSize.forEach((colorSizes, dest) => {
                const ColArray = [];
                colorSizes.forEach((sizes, color) => {
                    const sizeArray = [];
                    sizes.forEach((size) => {
                        const sizeObj = new LevisSizeModel(size.size, size.quantity, size.price);
                        sizeArray.push(sizeObj);
                    });
                    const col = new LevisColorModel(color, sizeArray);
                    ColArray.push(col);
                });
                const des = new LevisDestinationModel(dest, ColArray);
                desArray.push(des);
            });
            const poInfo = poMap.get(poNumber);
            const co = new LevisCoLinereqModel(poInfo.poNumber, poInfo.unitPrice, poInfo.currency, DeliveryDate,moment(poInfo.exFactoryDate).format("DD/MM/YYYY"),desArray);
            coData.push(co);
        });

        if (coData.length > 0) {
            return new CommonResponseModel(true, 1, 'Data Retrieved Successfully', coData);
        } else {
            return new CommonResponseModel(false, 0, 'No data found');
        }
    } catch (err) {
        throw err;
    }
}



  // async getordercomparationData(req?: any): Promise<CommonResponseModel> {
  //   try {
  //     const Originaldata = await this.LevisOrdersRepo.getordercomparationData(req)
  //     const compareModel: LevisCompareModel[] = []

  //     for (const rec of Originaldata) {
  //       const childData = await this.eddieOrdersChildRepository.find({
  //         where: {
  //           poNumber: rec.po_number, poLine: rec.po_line, size: rec.size
  //         }, order: { ordersChildId: 'DESC' }, take: 1, skip: 1
  //       })
  //       if (childData.length > 0) {
  //         const oldData = childData[0];
  //         // Check for changes in values
  //         if (
  //           oldData.unitCost !== rec.unit_cost ||
  //           oldData.deliveryDate !== rec.delivery_date ||
  //           oldData.quantity !== rec.quantity
  //         ) 
  //         {
  //           // Only push if there are changes
  //           compareModel.push(new
  //             LevisCompareModel(
  //               rec.po_number,
  //               rec.po_line,
  //               rec.size,
  //               oldData.unitCost,
  //               rec.unit_cost,
  //               oldData.deliveryDate,
  //               rec.delivery_date,
  //               oldData.quantity,
  //               rec.quantity
  //             ));
  //         }
  //       }
  //     }
  //     if (compareModel) {

  //       return new CommonResponseModel(true, 1, 'Data Retrived Sucessfully', compareModel);
  //     } else {
  //       return new CommonResponseModel(false, 0, 'No data found');
  //     }
  //   } catch (err) {
  //     throw err
  //   }
  // }

  async createCOline(req: any): Promise<CommonResponseModel> {
    const [po] = await this.levisCoLineRepo.getDataforCOLineCreation();
    if (!po) {
      return new CommonResponseModel(false, 0, 'No CO-Line creation requests')
    }
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
      await driver.get('http://intranetn.shahi.co.in:8080/ShahiExportIntranet/subApp?slNo=2447#');
      await driver.findElement(By.id('username')).sendKeys('99901347');
      await driver.findElement(By.id('password')).sendKeys('99901347');
      await driver.findElement(By.css('button.btn-primary')).click();
      await driver.get('http://intranetn.shahi.co.in:8080/ShahiExportIntranet/subApp?slNo=2447')
      const newPAge = await driver.executeScript(
        `javascript:openAccessPage('http://intranet.shahi.co.in:8080/IntraNet/CRMPRDNEW.jsp', 'CRM', '2448', 'R', '99901347', 'N', '20634576', 'null');`
      );
      const windowHandles = await driver.getAllWindowHandles()
      await driver.switchTo().window(windowHandles[1]);
      const frame = await driver.findElement(By.id('mainFrame'));
      await driver.switchTo().frame(frame)
      // for (const po of poDetails) {
      console.log(po)
      const coLine = new CoLineRequest();
      let buyerValue1;
      let buyerValue2;
      let agent;
      let buyerAddress;
      let deliveryAddress;
      let pkgTerms;
      let paymentTerms;
      let styleNo;
      if (po.buyer === 'LEVIS') {
        const response = await this.getOrderdataForCOline({ poNumber: po.po_number })
        console.log(response.data[0])
        const coData = response.data[0];
        coLine.buyerPo = coData.buyerPo;
        const inputDate = new Date(coData.deliveryDate)
        // Calculate the date 7 days before the GAC date
        // const sevenDaysBefore = new Date(inputDate);
        // sevenDaysBefore.setDate(inputDate.getDate() - 7);
        // const exFactoryDate = new Intl.DateTimeFormat('en-GB').format(sevenDaysBefore);
        coLine.deliveryDate = moment(coData.deliveryDate).format("DD/MM/YYYY")
        // coLine.exFactoryDate = exFactoryDate
        coLine.salesPrice = coData.salesPrice
        coLine.currency = coData.currency
        coLine.destinations = coData.destinations
        coLine.exFactoryDate = moment(coData.exfactoryDate).format("DD/MM/YYYY")

        console.log(coLine.exFactoryDate,"exFactoryDate")
        console.log(coLine.deliveryDate,"deliveryDate")

        const request = coData.destinations[0]?.name;
        console.log(request, "request")
        const address = await this.AddressService.getAddressInfoByCountry({ country: request });
        const addressData = address.data[0];
        console.log(addressData, "address")
        styleNo = coData.styleNo
        buyerAddress = addressData?.buyerCode ? addressData?.buyerCode : 12;
        deliveryAddress = addressData?.deliveryCode
        buyerValue1 = "LIV-LIVS"
        buyerValue2 = "LEV00002-LEVI STRAUSS GLOBAL TRADING CO LTD"
        agent = "-NA"
        pkgTerms = "STD-STD PACK"
        paymentTerms = "063-TT  70 Days"
      }
      const apps = await driver.wait(until.elementLocated(By.xpath('//*[@id="mainContainer"]/div[1]')));
      const allApps = await apps.findElements(By.tagName('span'));
      for (const app of allApps) {
        if ((await app.getAttribute('innerText')).includes('Style Orders')) {
          await driver.executeScript('arguments[0].click();', app);
          break;
        }
      }
      await driver.wait(until.elementLocated(By.id('styleid2H')))
      await driver.findElement(By.id('styleid2H')).sendKeys(po.item_no);
      await driver.sleep(10000)
      await driver.wait(until.elementLocated(By.id('bgpset1')));
      const dropdownElement1 = await driver.findElement(By.id('bgpset1'));
      const dropdown1 = await driver.wait(until.elementIsVisible(dropdownElement1)).then(element => new Select(element))
      await dropdown1.selectByValue(buyerValue1)
      await driver.sleep(10000)
      await driver.wait(until.elementLocated(By.id('byr')));
      const dropdownElement2 = await driver.findElement(By.id('byr'));
      const dropdown2 = await driver.wait(until.elementIsVisible(dropdownElement2)).then(element => new Select(element))
      await dropdown2.selectByValue(buyerValue2)
      await driver.sleep(5000)
      await driver.wait(until.elementLocated(By.id('CreateOrderID')))
      await driver.sleep(3000)
      await driver.findElement(By.id('CreateOrderID')).click();
      await driver.wait(until.elementLocated(By.id('bpo')))
      await driver.findElement(By.id('bpo')).clear();
      await driver.findElement(By.id('bpo')).sendKeys(coLine.buyerPo);
      await driver.wait(until.elementLocated(By.id('bus')))
      await driver.findElement(By.id('bus')).clear();
      await driver.findElement(By.id('bus')).sendKeys(styleNo);
      await driver.wait(until.elementLocated(By.id('agnt')));
      const agentDropDown = await driver.findElement(By.id('agnt'));
      await driver.executeScript(`arguments[0].value = '${agent}';`, agentDropDown)
      await driver.wait(until.elementLocated(By.name('dojo.EXFACTORYDATE')));
      await driver.findElement(By.name('dojo.EXFACTORYDATE')).clear();
      await driver.findElement(By.name('dojo.EXFACTORYDATE')).sendKeys(coLine.exFactoryDate);
      await driver.wait(until.elementLocated(By.name('dojo.delydt')));
      await driver.findElement(By.name('dojo.delydt')).clear();
      await driver.findElement(By.name('dojo.delydt')).sendKeys(coLine.deliveryDate);
      await driver.wait(until.elementLocated(By.name('byd')));
      const dropdown = await driver.findElement(By.name('byd'));
      const options = await dropdown.findElements(By.tagName('option'));
      const optionValues = [];
      for (const option of options) {
        const value = await option.getAttribute('value');
        optionValues.push(value);
      }
      const number = optionValues.find(value => value.includes(buyerAddress)); // give the dynamic value here
      await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);

      await driver.wait(until.elementLocated(By.xpath('//*[@id="cur"]')));
      const curDropdown = await driver.findElement(By.xpath('//*[@id="cur"]'));
      const cur = coLine.currency; // give the dynamic value here
      await driver.executeScript(`arguments[0].value = '${cur}';`, curDropdown);

      await driver.wait(until.elementLocated(By.xpath('//*[@id="price"]')));
      await driver.findElement(By.xpath('//*[@id="price"]')).clear();
      await driver.findElement(By.xpath('//*[@id="price"]')).sendKeys(coLine.salesPrice);

      await driver.wait(until.elementLocated(By.id('packtrm')));
      const pkgTermsDropDown = await driver.findElement(By.id('packtrm'));
      await driver.executeScript(`arguments[0].value = '${pkgTerms}';`, pkgTermsDropDown)
      await driver.wait(until.elementLocated(By.id('ptr')));
      const ptrDropDown = await driver.findElement(By.id('ptr'));
      await driver.executeScript(`arguments[0].value = '${paymentTerms}';`, ptrDropDown)
      await driver.sleep(10000)
      for (let dest of coLine.destinations) {
        const colorsContainer = await driver.wait(until.elementLocated(By.xpath('//*[@id="COContainer"]')));
        const colorsTabs = await colorsContainer.findElements(By.tagName('span'));
        for (const tab of colorsTabs) {
          if ((await tab.getAttribute('innerText')) == dest.name) {
            await driver.executeScript('arguments[0].click();', tab);
            for (let [colorIndex, color] of dest.colors.entries()) {
              for (let [sizeIndex, size] of color.sizes.entries()) {
                if (colorIndex === 0) {
                  // Find all the labels in the second row.
                  await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
                  let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
                  const fileteredElements: any[] = [];
                  for (const labelElement of labelElements) {
                    const ele = (await labelElement.getText())?.trim();
                    ele.length > 0 ? fileteredElements.push(labelElement) : '';
                  }
                  let tabIndex = 1; // Default to 1 if no match
                  const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
                  const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
                  await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
                  const dropdown = await driver.findElement(By.id(`bydline/${string}`));
                  const options = await dropdown.findElements(By.tagName('option'));
                  const optionValues = [];
                  for (const option of options) {
                    const value = await option.getAttribute('value');
                    optionValues.push(value);
                  }
                  const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
                  await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
                  // Find all the input fields in the first row.
                  const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
                  // Create a map of size labels to input fields.
                  const sizeToInputMap = {};
                  for (let i = 0; i < fileteredElements.length; i++) {
                    const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
                    if (label.length)
                      sizeToInputMap[label] = inputElements[i];
                  }
                  const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
                  if (inputField) {
                    // Clear the existing value (if any) and fill it with the new price.
                    await inputField.clear();
                    await inputField.sendKeys(size.price);
                  }
                }
                const inputId = `${size.name}:${color.name}:${dest.name}`.replace(/\*/g, '');
                const input = await driver.wait(until.elementLocated(By.id(inputId)))
                await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
              }
            }
          } else if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
            await driver.executeScript('arguments[0].click();', tab);
            for (let [colorIndex, color] of dest.colors.entries()) {
              for (let [sizeIndex, size] of color.sizes.entries()) {
                if (colorIndex === 0) {
                  // Find all the labels in the second row.
                  await driver.wait(until.elementLocated(By.xpath("//tbody/tr[2]/td/div")))
                  let labelElements: any[] = await driver.findElements(By.xpath("//tbody/tr[2]/td/div"));
                  const fileteredElements: any[] = [];
                  for (const labelElement of labelElements) {
                    const ele = (await labelElement.getText())?.trim();
                    ele.length > 0 ? fileteredElements.push(labelElement) : '';
                  }
                  let tabIndex = 1; // Default to 1 if no match
                  if ((await tab.getAttribute('innerText')) == 'ASSORTED') {
                    tabIndex = 2
                  }
                  const inputElementsXPath = `/html/body/div[2]/div[2]/table/tbody/tr/td/div[6]/form/table/tbody/tr/td/table/tbody/tr[5]/td/div/div[2]/div[${tabIndex}]/div/table/tbody/tr/td[2]/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td/div/input[@name='salespsizes']`;
                  const string = `${po.item_no}ZD${tabIndex.toString().padStart(3, '0')}`
                  await driver.wait(until.elementLocated(By.id(`bydline/${string}`)));
                  const dropdown = await driver.findElement(By.id(`bydline/${string}`));
                  const options = await dropdown.findElements(By.tagName('option'));
                  const optionValues = [];
                  for (const option of options) {
                    const value = await option.getAttribute('value');
                    optionValues.push(value);
                  }
                  const number = optionValues.find(value => value.includes(deliveryAddress)); // give the dynamic value here
                  await driver.executeScript(`arguments[0].value = '${number}';`, dropdown);
                  // Find all the input fields in the first row.
                  const inputElements = await driver.findElements(By.xpath(inputElementsXPath));
                  // Create a map of size labels to input fields.
                  const sizeToInputMap = {};
                  for (let i = 0; i < fileteredElements.length; i++) {
                    const label = (await fileteredElements[i].getText()).trim().toUpperCase().toString(); // Remove leading/trailing spaces
                    if (label.length)
                      sizeToInputMap[label] = inputElements[i];
                  }
                  const inputField = await sizeToInputMap[size.name.trim().toUpperCase().toString()];
                  if (inputField) {
                    // Clear the existing value (if any) and fill it with the new price.
                    await inputField.clear();
                    await inputField.sendKeys(size.price);
                  } else {
                    // const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Size found',isActive:false });
                    // await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})
                    // return new CommonResponseModel(false, 0, 'NO matching Size found')
                  }
                }
                const inputId = `${size.name}:${color.name}:ASSORTED`.replace(/\*/g, '');
                console.log(inputId,"ppppp")
                const input = await driver.wait(until.elementLocated(By.id(inputId)), 10000)
                await driver.findElement(By.id(inputId)).sendKeys(`${size.qty}`);
              }
            }
          }
        }
      }
      await driver.sleep(10000)
      const element = await driver.findElement(By.id('OrderCreateID')).click();
      await driver.wait(until.alertIsPresent(), 10000);
      // Switch to the alert and accept it (click "OK")
      const alert = await driver.switchTo().alert();
      await alert.accept();
      if (await this.isAlertPresent(driver)) {
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        // const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: alertText ,isActive:false });
    
        // await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})

        await alert.accept();
        await driver.sleep(5000)
        await driver.navigate().refresh();
        await driver.quit();
        return new CommonResponseModel(false, 0, alertText)

      } else {
        await driver.sleep(10000)
        await driver.wait(until.elementLocated(By.xpath('//*[@id="orno"]')), 10000);
        const coNoElement = await driver.findElement(By.xpath('//*[@id="orno"]'));
        const coNo = await coNoElement.getAttribute('value');
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
        const year = currentDate.getFullYear().toString().slice(-2);
        const currentDateFormatted = `${day}-${month}-${year}`;
        if (coNo) {
     

          // const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { coNumber: coNo, status: 'Success', coDate: currentDateFormatted,errorMsg:"-" });
          // await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.SUCCESS})

       
          // await driver.navigate().refresh();
          await driver.sleep(10000)
        } else {
     

          // const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed',isActive:false });
          // await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})

          // await driver.navigate().refresh();
          await driver.sleep(10000)
        }
      }
      // }
      return new CommonResponseModel(true, 1, `COline created successfully`)
    } catch (error) {
      
      console.log(error, 'error');
      if (error.name === 'TimeoutError') {
        // const update = await this.coLineRepo.update({ poNumber: po.po_number, poLine: po.po_line }, { status: 'Failed', errorMsg: 'NO matching Color found', isActive:false });
        // await this.updateCOLineStatus({poNumber: po.po_number, poLine: po.po_line , status: StatusEnum.FAILED})
        driver.quit()
        return new CommonResponseModel(false, 0, 'Matching Color not found')
      } else {
        // Handle other types of errors
        return new CommonResponseModel(false, 0, error)
      }
    }
    finally {
      driver.quit()
    }
  }

  async isAlertPresent(driver) {
    try {
      await driver.switchTo().alert();
      return true;
    } catch (e) {
      return false;
    }
  }





}