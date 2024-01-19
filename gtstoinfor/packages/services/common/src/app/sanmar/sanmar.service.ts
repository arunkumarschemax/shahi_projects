import { Injectable } from "@nestjs/common";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { DataSource } from "typeorm";
import { SanmarOrdersRepository } from "./repositories/sanmar-orders.repo";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { SanmarOrdersEntity } from "./entity/sanmar-orders.entity";
import { SanmarPdfInfoEntity } from "./entity/sanmar-pdf.entity";

@Injectable()
export class SanmarService {


  constructor(
    private dataSource: DataSource,
    private SanOrdersRepo: SanmarOrdersRepository,


  ) { }
  async saveHbOrdersData(req: any): Promise<CommonResponseModel> {
    // console.log(req, "reqqqqqqqqqqqqq")
    const transactionManager = new GenericTransactionManager(this.dataSource)
    try {
      let saved
      const pdfData = [];
      await transactionManager.startTransaction()
      for (const item of req.HbpoItemDetails) {
        const match = item.poStyle.match(/\d+/);
        // console.log(match, "match");
        // console.log(item, "item");
        const poStyle = match

        console.log(poStyle, "poStyle")
        for (const variant of item.HbpoItemVariantDetails) {
          const orderData = await this.SanOrdersRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size } })
          // const order = await this.HbOrdersChildRepo.findOne({ where: { buyerPo: req.buyerPo, poStyle: item.poStyle, size: variant.size }, order: { poVersion: 'DESC' } })
          console.log(orderData, "orderData")
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
          entity.poStyle = variant.poStyle
          entity.quantity = variant.quantity
          entity.unitPrice = variant.unitPrice

          pdfData.push(entity)


          // if (orderData) {


          //   const update = await transactionManager.getRepository(SanmarOrdersEntity).update({ custPo: req.custPo, color: item.color, size: variant.size }, { exitFactoryDate: req.exitFactoryDate, shipToAdd: req.shipToAdd, style: item.style, quantity: variant.quantity, unitPrice: variant.unitPrice })

          //   let po = (order?.poVersion) + 1

          //   const entitys = new HbOrdersChildEntity()
          //   entitys.custPo = req.custPo
          //   entitys.exitFactoryDate = req.exitFactoryDate
          //   entitys.shipToAdd = req.shipToAdd
          //   entitys.style = item.style
          //   entitys.color = item.color
          //   entitys.size = variant.size
          //   entitys.quantity = variant.quantity
          //   entitys.unitPrice = variant.unitPrice
          //   entitys.poVersion = po
          //   entitys.orderId = orderData.id

          //   // const savedChild = await transactionManager.getRepository(HbOrdersChildEntity).save(entitys)
          //   if (!update.affected) {
          //     throw new Error('Update failed');
          //   }
          // }
          //  else {
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

    const file = await this.SanOrdersRepo.findOne({ where: { pdfFileName: filePath } });
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




}