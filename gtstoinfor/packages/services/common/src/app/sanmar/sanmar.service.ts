import { Injectable } from "@nestjs/common";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource } from "typeorm";
import { SanmarOrdersRepository } from "./repositories/sanmar-orders.repo";
import { CommonResponseModel, HbOrderDataModel, HbPoOrderFilter, HbSizeWiseModel, SanmarOrderFilter, SanmarSizeWiseModel, sanmarOrderDataModel } from "@project-management-system/shared-models";
import { SanmarOrdersEntity } from "./entity/sanmar-orders.entity";
import { SanmarPdfInfoEntity } from "./entity/sanmar-pdf.entity";
import { SanmarPdfRepo } from "./repositories/sanmar-pdf.repo";

@Injectable()
export class SanmarService {


  constructor(
    private dataSource: DataSource,
    private SanOrdersRepo: SanmarOrdersRepository,
    private pdfRepo: SanmarPdfRepo


  ) { }


  // async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
  //   console.log(req, "reqqqqqqqqqqqqq")
  //   try {
  //     let saved
  //     for (const item of req.SanmarpoItemDetails) {
  //       const match = item.poStyle.match(/\d+/);
  //       console.log(match, "match");
  //       const poStyle = match

  //       console.log(poStyle, "poLine")
  //       for (const variant of item.SanmarpoItemVariantDetails) {
  //         const orderData = await this.SanOrdersRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size } })
  //         console.log(orderData, "orderData")
  //         const entity = new SanmarOrdersEntity();
  //         entity.buyerPo = req.buyerPo
  //         entity.poDate = req.poDate
  //         entity.buyerAddress = req.buyerAddress
  //         entity.shipToAdd = req.shipToAdd
  //         entity.poStyle = item.poStyle
  //         entity.deliveryDate = item.deliveryDate
  //         entity.size = variant.size
  //         entity.color = variant.color
  //         entity.quantity = variant.quantity
  //         entity.unitPrice = variant.unitPrice

  //         if (orderData) {
  //           const update = await this.SanOrdersRepo.update({ buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size },
  //             { poDate: req.poDate, buyerAddress: req.buyerAddress, shipToAdd: req.shipToAdd, deliveryDate: item.deliveryDate, poStyle: variant.poStyle, quantity: variant.quantity, unitPrice: variant.unitPrice })
  //           if (!update.affected) {
  //             throw new Error('Update failed');
  //           }
  //         } else {
  //           saved = await this.SanOrdersRepo.save(entity)
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

  async saveSanmarOrdersData(req: any): Promise<CommonResponseModel> {
    // console.log(req, "reqqqqqqqqqqqqq")
    const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      const pdfData = [];
      await transactionManager.startTransaction()
      for (const item of req.SanmarpoItemDetails) {
        const match = item.poStyle.match(/\w+\d+/);
        // console.log(match, "match");
        // console.log(item, "item");
        const poStyle = match

        console.log(poStyle, "poStyle")
        for (const variant of item.SanmarpoItemVariantDetails) {
          const orderData = await this.SanOrdersRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size } })
          // const order = await this.HbOrdersChildRepo.findOne({ where: { custPo: req.custPo, color: item.color, size: variant.size }, order: { poVersion: 'DESC' } })
          // console.log(orderData, "orderData")
          // console.log(variant, "variant");
          // console.log(order, "order");

          const entity = new SanmarOrdersEntity();
          entity.buyerPo = req.buyerPo
          entity.poDate = req.poDate
          entity.buyerAddress = req.buyerAddress
          entity.shipToAdd = req.shipToAdd
          entity.poStyle = item.poStyle
          entity.deliveryDate = item.deliveryDate
          entity.size = variant.size
          entity.color = variant.color
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice
          pdfData.push(entity)


          if (orderData) {


            const update = await transactionManager.getRepository(SanmarOrdersEntity).update({ buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size },
              { poDate: req.poDate, buyerAddress: req.buyerAddress, shipToAdd: req.shipToAdd, deliveryDate: item.deliveryDate, color:variant.color, quantity: variant.quantity, unitPrice: variant.unitPrice })
            // let po = (order?.poVersion) + 1

            // const entitys = new HbOrdersChildEntity()
            // entitys.custPo = req.custPo
            // entitys.exitFactoryDate = req.exitFactoryDate
            // entitys.shipToAdd = req.shipToAdd
            // entitys.style = item.style
            // entitys.color = item.color
            // entitys.size = variant.size
            // entitys.quantity = variant.quantity
            // entitys.unitPrice = variant.unitPrice
            // entitys.poVersion = po
            // entitys.orderId = orderData.id

            // const savedChild = await transactionManager.getRepository(HbOrdersChildEntity).save(entitys)
            if (!update.affected) {
              throw new Error('Update failed');
            }
          } else {
            saved = await transactionManager.getRepository(SanmarOrdersEntity).save(pdfData)

            // const entitys = new HbOrdersChildEntity()
            // entitys.custPo = req.custPo
            // entitys.exitFactoryDate = req.exitFactoryDate
            // entitys.shipToAdd = req.shipToAdd
            // entitys.style = item.style
            // entitys.color = item.color
            // entitys.size = variant.size
            // entitys.quantity = variant.quantity
            // entitys.unitPrice = variant.unitPrice
            // entitys.orderId = entity.id



            // const savedChild = await await transactionManager.getRepository(HbOrdersChildEntity).save(entitys)
            if (!saved) {
              throw new Error('Save failed')
            }
          }
        }
      }
      await transactionManager.completeTransaction()
      return new CommonResponseModel(true, 1, 'Data saved successfully', saved)
    } catch (err) {
      await transactionManager.releaseTransaction()
      return new CommonResponseModel(false, 0, 'Failed', err)
    }
  }

  async updatePath(req: any, buyerPo: string, filePath: string, filename: string, mimetype: string): Promise<CommonResponseModel> {
    console.log(buyerPo, "pppppioooooo");
    console.log(req, "reqqqqqqqqq");

    const entity = new SanmarPdfInfoEntity();
    entity.buyerPo = buyerPo;
    entity.pdfFileName = filename;
    entity.filePath = filePath;
    entity.fileType = mimetype;
    entity.fileData = req;
    entity.status = "SUCCESS";

    const file = await this.pdfRepo.findOne({ where: { pdfFileName: filePath } });
    if (file) {
      return new CommonResponseModel(false, 0, 'File with the same name already uploaded');
    } else {
      const save = await this.SanOrdersRepo.save(entity);
      if (save) {
        return new CommonResponseModel(true, 1, 'Uploaded successfully', save);
      } else {
        return new CommonResponseModel(false, 0, 'Uploaded failed');
      }
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

  async getorderDataForInfo(req?: SanmarOrderFilter): Promise<CommonResponseModel> {
    console.log(req, "servvv")
    try {
      const details = await this.SanOrdersRepo.getorderDataForInfo(req);
      if (details.length === 0) {
        return new CommonResponseModel(false, 0, 'No data Found');
      }
      const sizeDateMap = new Map<string, sanmarOrderDataModel>();
      for (const rec of details) {
        if (!sizeDateMap.has(`${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`)) {
          sizeDateMap.set(
            `${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`,
            new sanmarOrderDataModel(rec.id, rec.buyer_po, rec.po_date, rec.po_style, rec.color, rec.size, rec.delivery_date, rec.ship_to_address, rec.buyer_address, [], rec.quantity, rec.unit_price)
          );

        }
        const sizeWiseData = sizeDateMap.get(`${rec.style},${rec.buyer_po},${rec.delivery_date},${rec.color}`).sizeWiseData;
        if (rec.size !== null) {
          sizeWiseData.push(new SanmarSizeWiseModel(rec.size, rec.unit_price, rec.quantity, rec.color));
        }
      }
      const dataModelArray: sanmarOrderDataModel[] = Array.from(sizeDateMap.values());

      return new CommonResponseModel(true, 1, 'data retrieved', dataModelArray);



    } catch (e) {
      console.log(e, "errrrrrrrrr")
      return new CommonResponseModel(false, 0, 'failed', e);
    }
  }


  async getCustomerPoNumber(): Promise<CommonResponseModel> {
    try {
      const data = await this.SanOrdersRepo.getCustomerPoNumber()
      if (data) {
        return new CommonResponseModel(true, 1, 'data retrived Successfully', data)
      } else {
        return new CommonResponseModel(false, 0, 'No Data Found', [])
      }
    } catch (err) {
      throw err
    }
  }


}